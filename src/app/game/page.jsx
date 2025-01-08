"use client";
import { useEffect, useState } from "react";

export default function Game() {
    const [FoodHorizontalPosition, setFoodHorizontalPosition] = useState(0);
    const [FoodVerticalPosition, setFoodVerticalPosition] = useState(0);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [trashPosition, setTrashPosition] = useState(windowWidth / 2); // Initial trash bin position in the center
    const [score , setScore] = useState(0);
    // Handle slider change to update trash bin position
    function handleSliderChange(e) {
        const value = parseInt(e.target.value);
        const trashWidth = 40;
        setTrashPosition(Math.min(Math.max(value, 0), windowWidth - trashWidth));
    }

    // Falling animation logic
    useEffect(() => {
        const timer = setInterval(() => {
            setFoodVerticalPosition((prev) => prev + 10);
        }, 100);

        return () => {
            clearInterval(timer);
        };
    }, []);

    // Reset food position and handle collision
    useEffect(() => {
        const trashWidth = 40;  // Width of trash bin
        const trashHeight = 40; // Approx height of trash bin
        const imageWidth = 35;  // Width of falling image
        const imageHeight = 35; // Height of falling image

        // Check if the food has reached the bottom
        if (FoodVerticalPosition >= windowHeight) {
            setFoodVerticalPosition(0);
            setFoodHorizontalPosition(Math.floor(Math.random() * windowWidth));
        }

        // Collision detection logic
        if (
            FoodVerticalPosition + imageHeight >= windowHeight - trashHeight && // Image reaches the trash bin
            FoodHorizontalPosition + imageWidth >= trashPosition &&            // Image overlaps the trash bin horizontally
            FoodHorizontalPosition <= trashPosition + trashWidth               // Image overlaps the trash bin horizontally
        ) {
            console.log("Collision detected!");
            setFoodVerticalPosition(0); // Reset the food position after collision
            setFoodHorizontalPosition(Math.floor(Math.random() * windowWidth));
            setScore(prev=> prev+1);
        }
    }, [FoodVerticalPosition, FoodHorizontalPosition, trashPosition]);

    return (
        <div className="bg-gray-200 h-screen overflow-hidden">
           <div className="flex justify-center">
            <h1 className="text-4xl font-sans font-extrabold">Score: {score}</h1>
           </div>
            {/* Falling food */}
            <div className="screen absolute">
                <img
                    src="peri-peri-mandi.png"
                    width={35}
                    className="relative"
                    style={{
                        position: "relative",
                        top: `${FoodVerticalPosition}px`,
                        left: `${FoodHorizontalPosition}px`,
                    }}
                />
            </div>

            <div className="relative h-screen">
                {/* Trash Bin */}
                <div
                    className="absolute bottom-24"
                    style={{
                        left: `${trashPosition}px`,
                    }}
                >
                    <h1 className="text-2xl">🗑️</h1>
                </div>

                {/* Slider Control */}
                <div
                    className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
                    style={{ width: "80%" }}
                >
                    <input
                        style={{
                            WebkitAppearance: "none",
                            width: "100%",
                            height: "15px",
                            borderRadius: "5px",
                            background: "#d3d3d3",
                            outline: "none",
                            opacity: 0.7,
                            WebkitTransition: "0.2s",
                            transition: "opacity 0.2s",
                        }}
                        onChange={handleSliderChange}
                        type="range"
                        min="0"
                        max={windowWidth}
                        value={trashPosition}
                        className="slider"
                        id="myRange"
                    />
                </div>
            </div>
        </div>
    );
}
