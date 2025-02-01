'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserPlus, User, Clock, GlassWater, CastleIcon } from 'lucide-react';
import Header from '@/components/Header/page';

const QueueVisualizer = () => {
  // Sample initial queue data
  const [queue, setQueue] = useState([
    { id: 1, name: 'John Smith', partySize: 4, waitTime: 25, phone: '555-0123' },
    { id: 2, name: 'Sarah Johnson', partySize: 2, waitTime: 20, phone: '555-0124' },
    { id: 3, name: 'Michael Brown', partySize: 6, waitTime: 35, phone: '555-0125' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    partySize: '',
    phone: '',
  });

  const handleAddToQueue = (e) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.partySize || !newCustomer.phone) return;

    const waitTime = 15 + (parseInt(newCustomer.partySize) * 5);
    const newEntry = {
      id: queue.length + 1,
      ...newCustomer,
      partySize: parseInt(newCustomer.partySize),
      waitTime,
    };

    setQueue([...queue, newEntry]);
    setNewCustomer({ name: '', partySize: '', phone: '' });
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#7F0048] to-[#400024] p-4">
        <Header/>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <CastleIcon className="w-12 h-12 text-pink-300 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2 font-serif">
            Welcome to Castle
          </h1>
          <p className="text-pink-200 mb-6 italic">
            Current Waiting List Status
          </p>
          <p className='text-white mb-3'>Refresh the feed to get the latest update</p>
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-pink-100 bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-full flex items-center justify-center mx-auto transition-all duration-300 backdrop-blur-sm border border-pink-200 border-opacity-20"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Join Waiting List
          </button>
        </motion.div>

        {/* Queue Status */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-pink-200 border-opacity-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="w-6 h-6 text-pink-300 mr-3" />
                <span className="text-pink-100 font-medium">Parties Waiting:</span>
                <span className="ml-2 text-white text-lg">{queue.length}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-6 h-6 text-pink-300 mr-3" />
                <span className="text-pink-100 font-medium">Average Wait:</span>
                <span className="ml-2 text-white text-lg">
                  {Math.round(queue.reduce((acc, curr) => acc + curr.waitTime, 0) / queue.length || 0)} min
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Queue List */}
        <div className="space-y-6">
          <AnimatePresence>
            {queue.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative"
              >
                <div 
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#7F0048] to-[#400024] p-0.5
                    ${item.id === 1 ? 'shadow-xl shadow-pink-900/20' : ''}`}
                >
                  <div className="relative bg-black bg-opacity-40 rounded-2xl p-6 backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-300 rounded-full blur-sm opacity-20 group-hover:opacity-30 transition-opacity"></div>
                            <div className="relative bg-gradient-to-r from-pink-500 to-pink-300 p-3 rounded-full">
                              <User className="w-5 h-5 text-white" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="font-serif text-xl text-white group-hover:text-pink-200 transition-colors">
                              {item.name}
                            </h3>
                          </div>
                          <div className="ml-auto flex items-center space-x-4">
                            <div className="px-4 py-1.5 rounded-full bg-pink-900/30 border border-pink-200/20">
                              <span className="text-pink-200 text-sm">
                                Party of {item.partySize}
                              </span>
                            </div>
                            <div className={`text-3xl font-bold font-serif
                              ${index === 0 ? 'text-pink-300' : 'text-pink-400/70'}`}>
                              #{index + 1}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 text-pink-400/70 mr-2" />
                            <span className="text-pink-200">
                              Estimated wait: <span className="text-white font-medium">{item.waitTime} minutes</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {item.id === 1 && (
                      <>
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 via-pink-300 to-transparent opacity-50"></div>
                        <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-pink-500 via-pink-300 to-transparent opacity-50"></div>
                        <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-pink-500 via-pink-300 to-transparent opacity-50"></div>
                        <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-t from-pink-500 via-pink-300 to-transparent opacity-50"></div>
                      </>
                    )}
                  </div>
                </div>
                {index === 0 && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-3 left-4 px-3 py-1 bg-gradient-to-r from-pink-500 to-pink-400 rounded-full text-xs text-white font-medium shadow-lg"
                  >
                    Currently Next
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add to Queue Form Modal */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#7F0048] rounded-2xl shadow-2xl w-full max-w-md border border-pink-200 border-opacity-20"
              >
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-serif font-bold text-white mb-2">Join Waiting List</h2>
                    <p className="text-pink-200 italic">Please provide your details</p>
                  </div>
                  <form onSubmit={handleAddToQueue} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-pink-200 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        value={newCustomer.name}
                        onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 bg-white bg-opacity-10 border border-pink-200 border-opacity-20 rounded-lg text-white placeholder-pink-300 placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-opacity-50 transition-all duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-pink-200 mb-2">
                        Party Size
                      </label>
                      <input
                        type="number"
                        value={newCustomer.partySize}
                        onChange={(e) => setNewCustomer({ ...newCustomer, partySize: e.target.value })}
                        placeholder="Number of people"
                        min="1"
                        className="w-full px-4 py-3 bg-white bg-opacity-10 border border-pink-200 border-opacity-20 rounded-lg text-white placeholder-pink-300 placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-opacity-50 transition-all duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-pink-200 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={newCustomer.phone}
                        onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                        placeholder="Enter phone number"
                        className="w-full px-4 py-3 bg-white bg-opacity-10 border border-pink-200 border-opacity-20 rounded-lg text-white placeholder-pink-300 placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-opacity-50 transition-all duration-200"
                        required
                      />
                    </div>
                    <div className="flex space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="w-1/2 px-6 py-3 border border-pink-200 border-opacity-20 text-pink-200 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-1/2 bg-pink-200 bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-lg flex items-center justify-center transition-all duration-200"
                      >
                        <UserPlus className="w-5 h-5 mr-2" />
                        Join Queue
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QueueVisualizer;