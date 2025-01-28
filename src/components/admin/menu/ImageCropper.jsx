"use client";
import React, { useState, useCallback, useRef } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { Upload, X, RotateCw } from "lucide-react";
import "react-image-crop/dist/ReactCrop.css";

const ASPECT_RATIOS = [
  { label: "Free", value: null },
  { label: "Square (1:1)", value: 1 },
  { label: "Landscape (16:9)", value: 16 / 9 },
  { label: "Portrait (9:16)", value: 9 / 16 },
];

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const ImageCropper = ({ onImageChange, initialImage, disabled }) => {
  const [src, setSrc] = useState(initialImage || null);
  const [crop, setCrop] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [aspect, setAspect] = useState(ASPECT_RATIOS[0].value);
  const [isLoading, setIsLoading] = useState(false);
  const imgRef = useRef(null);

  const onSelectFile = async (e) => {
    if (disabled) return;

    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }

    try {
      setIsLoading(true);
      const imageUrl = URL.createObjectURL(file);
      setSrc(imageUrl);
      onImageChange(file, imageUrl);
    } catch (error) {
      console.error("Error loading image:", error);
      alert("Error loading image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onImageLoad = useCallback(
    (e) => {
      if (aspect) {
        const { width, height } = e.currentTarget;
        setCrop(centerAspectCrop(width, height, aspect));
      }
    },
    [aspect]
  );

  const getCroppedImg = useCallback(async () => {
    if (!completedCrop || !imgRef.current) return null;

    const image = imgRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    // Use high quality image scaling
    ctx.imageSmoothingQuality = "high";

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            return;
          }
          resolve(blob);
        },
        "image/jpeg",
        0.95
      );
    });
  }, [completedCrop]);

  const handleCompleteCrop = useCallback(
    async (crop) => {
      setCompletedCrop(crop);
      if (!crop?.width && !crop?.height && imgRef.current) {
        const fullImageBlob = await new Promise((resolve) => {
          fetch(src)
            .then((res) => res.blob())
            .then((blob) => resolve(blob));
        });
        onImageChange(fullImageBlob, src);
        return;
      }
      if (crop?.width && crop?.height) {
        try {
          const croppedBlob = await getCroppedImg();
          if (croppedBlob) {
            const previewUrl = URL.createObjectURL(croppedBlob);
            onImageChange(croppedBlob, previewUrl);
          }
        } catch (e) {
          console.error("Error generating crop:", e);
        }
      }
    },
    [getCroppedImg, onImageChange, src]
  );

  const resetImage = () => {
    if (disabled) return;
    setSrc(null);
    setCrop(null);
    setCompletedCrop(null);
    onImageChange(null, null);
  };

  return (
    <div className="space-y-4">
      {!src ? (
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
          <div className="space-y-2 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                <span>Upload a file</span>
                <input
                  type="file"
                  className="sr-only"
                  onChange={onSelectFile}
                  accept="image/*"
                  disabled={disabled}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {ASPECT_RATIOS.map((ratio) => (
              <button
                key={ratio.label}
                type="button"
                onClick={() => setAspect(ratio.value)}
                disabled={disabled}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  aspect === ratio.value
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {ratio.label}
              </button>
            ))}
          </div>

          <div className="relative max-h-[600px] overflow-auto">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => handleCompleteCrop(c)}
              aspect={aspect}
              className="max-w-full"
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={src}
                onLoad={onImageLoad}
                className="max-w-full h-auto"
                style={{ maxHeight: "600px" }}
              />
            </ReactCrop>
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                type="button"
                onClick={resetImage}
                disabled={disabled}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-500 text-center">
            Drag to crop the image. Choose an aspect ratio above or freely
            resize.
          </p>
        </div>
      )}

      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
          <RotateCw className="animate-spin h-8 w-8 text-blue-500" />
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
