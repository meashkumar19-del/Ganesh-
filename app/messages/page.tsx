"use client";

import { useState } from "react";
import Image from "next/image";
import { profiles } from "../data/profiles";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

export default function MessagesPage() {
  const [selectedProfileId, setSelectedProfileId] = useState(profiles[0].id);
  const [messageText, setMessageText] = useState("");
  const [conversations, setConversations] = useState<Record<string, Message[]>>({
    [profiles[0].id]: [
      {
        id: "1",
        senderId: profiles[0].id,
        content: "Hello! Thank you for your interest. I'd be happy to discuss your requirements.",
        timestamp: new Date(Date.now() - 3600000),
        isOwn: false,
      },
    ],
  });

  const selectedProfile = profiles.find(p => p.id === selectedProfileId);
  const currentConversation = conversations[selectedProfileId] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "user",
      content: messageText,
      timestamp: new Date(),
      isOwn: true,
    };

    setConversations(prev => ({
      ...prev,
      [selectedProfileId]: [...(prev[selectedProfileId] || []), newMessage],
    }));

    setMessageText("");

    // Simulate response after 2 seconds
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedProfileId,
        content: "Thank you for your message. I'll get back to you shortly with more details.",
        timestamp: new Date(),
        isOwn: false,
      };

      setConversations(prev => ({
        ...prev,
        [selectedProfileId]: [...(prev[selectedProfileId] || []), response],
      }));
    }, 2000);
  };

  return (
    <div className="pt-20 h-screen flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-serif font-bold">
            <span className="text-gradient">Messages</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Secure and private communication with companions
          </p>
        </div>

        {/* Messages Container */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
          {/* Conversations List */}
          <div className="glass-effect rounded-2xl p-4 overflow-y-auto">
            <h2 className="text-xl font-semibold text-white mb-4">Conversations</h2>
            <div className="space-y-2">
              {profiles.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => setSelectedProfileId(profile.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    selectedProfileId === profile.id
                      ? 'bg-purple-600/20 border border-purple-500/50'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={profile.image}
                      alt={profile.name}
                      fill
                      className="object-cover"
                    />
                    {profile.verified && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-black" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-white font-medium">{profile.name}</h3>
                    <p className="text-gray-400 text-sm truncate">
                      {conversations[profile.id]?.[conversations[profile.id].length - 1]?.content || 
                       'Start a conversation'}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2 glass-effect rounded-2xl flex flex-col overflow-hidden">
            {selectedProfile ? (
              <>
                {/* Chat Header */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden">
                      <Image
                        src={selectedProfile.image}
                        alt={selectedProfile.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        {selectedProfile.name}
                        {selectedProfile.verified && (
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </h2>
                      <p className="text-gray-400">{selectedProfile.location}</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                  {currentConversation.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-400">No messages yet. Start the conversation!</p>
                    </div>
                  ) : (
                    currentConversation.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                            message.isOwn
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                              : 'bg-white/5 text-white'
                          }`}
                        >
                          <p>{message.content}</p>
                          <p className={`text-xs mt-1 ${message.isOwn ? 'text-white/70' : 'text-gray-500'}`}>
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-6 border-t border-white/10">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={!messageText.trim()}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    All messages are encrypted and confidential
                  </p>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-400">Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
