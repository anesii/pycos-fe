'use client'

import { useState } from 'react';

interface Chat {
  id: number;
  user: string;
  message: string;
  likes: number;
  replies: Reply[];
}

interface Reply {
  id: number;
  user: string;
  message: string;
}

const initialChats: Chat[] = [
  {
    id: 1,
    user: 'xyz123',
    message: 'Quodsi habent magnalia inter potentiam et divitias.',
    likes: 0,
    replies: [],
  },
  {
    id: 2,
    user: 'abc456',
    message: 'Aliquam erat volutpat. Sed do eiusmod tempor incididunt.',
    likes: 0,
    replies: [],
  },
  // Add more initial chats as needed
];

export default function CommunityPage() {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddChat = () => {
    if (newMessage.trim()) {
      const newChat: Chat = {
        id: chats.length + 1,
        user: 'currentUser', // Replace with actual user
        message: newMessage,
        likes: 0,
        replies: [],
      };
      setChats([...chats, newChat]);
      setNewMessage('');
    }
  };

  const handleLikeChat = (id: number) => {
    setChats(chats.map(chat => chat.id === id ? { ...chat, likes: chat.likes + 1 } : chat));
  };

  const handleAddReply = (chatId: number) => {
    if (replyMessage.trim()) {
      const newReply: Reply = {
        id: Date.now(),
        user: 'currentUser', // Replace with actual user
        message: replyMessage,
      };
      setChats(chats.map(chat => 
        chat.id === chatId 
          ? { ...chat, replies: [...chat.replies, newReply] } 
          : chat
      ));
      setReplyMessage('');
      setActiveReplyId(null);
    }
  };

  const filteredChats = chats.filter(chat => 
    chat.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Community</h1>

      <input
        type="text"
        placeholder="Search topics..."
        value={searchTerm}
        onChange={handleSearch}
        className="border rounded-lg p-2 mb-4 w-full"
      />

      <div className="space-y-4 mb-6">
        {filteredChats.map(chat => (
          <div key={chat.id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between">
              <span className="font-semibold">{chat.user}</span>
              <button onClick={() => handleLikeChat(chat.id)} className="text-teal-500">
                👍 {chat.likes}
              </button>
            </div>
            <p className="mt-2">{chat.message}</p>
            <button onClick={() => setActiveReplyId(chat.id)} className="text-teal-500 mt-2">
              Reply
            </button>

            {activeReplyId === chat.id && (
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Write a reply..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="border rounded-lg p-2 w-full"
                />
                <button onClick={() => handleAddReply(chat.id)} className="bg-teal-500 text-white px-4 py-2 rounded-lg mt-2">
                  Add Reply
                </button>
              </div>
            )}

            {chat.replies.length > 0 && (
              <div className="mt-4">
                <button className="text-teal-500" onClick={() => setActiveReplyId(activeReplyId === chat.id ? null : chat.id)}>
                  {activeReplyId === chat.id ? 'Hide Replies' : 'Show Replies'}
                </button>
                {activeReplyId === chat.id && (
                  <div className="mt-2">
                    {chat.replies.map(reply => (
                      <div key={reply.id} className="bg-gray-100 p-2 rounded-lg mt-2">
                        <span className="font-semibold">{reply.user}</span>: {reply.message}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Add a New Chat</h2>
        <input
          type="text"
          placeholder="Write your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border rounded-lg p-2 w-full"
        />
        <button onClick={handleAddChat} className="bg-teal-500 text-white px-4 py-2 rounded-lg mt-2">
          Add Comment
        </button>
      </div>
    </div>
  );
}