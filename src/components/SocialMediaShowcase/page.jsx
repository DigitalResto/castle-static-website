import React from 'react';
import { Instagram, Heart, MessageCircle, Share2 } from 'lucide-react';

const SocialMediaShowcase = () => {
  const posts = [
    {
      id: 1,
      image: '/api/placeholder/600/600',
      likes: '1.2K',
      comments: '84',
      shares: '32',
      caption: 'Experience our signature Mandi platter, perfect for family gatherings! 🍖✨'
    },
    {
      id: 2,
      image: '/api/placeholder/600/600',
      likes: '956',
      comments: '67',
      shares: '28',
      caption: 'New on the menu: Peri Peri Mandi! A fusion of flavors you cant resist 🔥'
    },
    {
      id: 3,
      image: '/api/placeholder/600/600',
      likes: '845',
      comments: '45',
      shares: '19',
      caption: 'Behind the scenes: Our chefs preparing your favorite dishes with love ❤️'
    },
    {
      id: 4,
      image: '/api/placeholder/600/600',
      likes: '1.5K',
      comments: '92',
      shares: '45',
      caption: 'Weekend vibes at Castle Resto! Book your table now 🌟'
    }
  ];

  return (
    <div className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#660050] mb-4">Follow Us on Instagram</h2>
          <div className="w-24 h-1 bg-[#660050] mx-auto mb-6"></div>
          <p className="text-gray-600">@castle.resto</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden group">
              <div className="relative">
                <img 
                  src={post.image}
                  alt="Social Media Post"
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center space-x-6 text-white">
                    <div className="flex items-center">
                      <Heart className="w-6 h-6 mr-2" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-6 h-6 mr-2" />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center">
                      <Share2 className="w-6 h-6 mr-2" />
                      <span>{post.shares}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-700 text-sm">{post.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="#" 
            className="inline-flex items-center space-x-2 text-[#660050] hover:text-[#4a003a] font-medium"
          >
            <Instagram className="w-5 h-5" />
            <span>View More on Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaShowcase;