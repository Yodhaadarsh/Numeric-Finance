import React, { useState, useRef, useEffect } from "react";
import { Image, User, SendToBackIcon } from "lucide-react";
import "../stylesheets/AiLoader.css";
import socket from "../config/socket";

const AIChatPage = () => {
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Hello! I’m Numeric Finance AI, made by Prince. Ask me anything about your expenses or investments.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef();

  // Setup socket listener once
  useEffect(() => {
    const handleAIMessage = (data) => {
      setMessages((prev) => [...prev, { type: "ai", text: data }]);
      console.log(data);
      setIsTyping(false);
    };

    socket.on("ai-message", handleAIMessage);

    return () => {
      socket.off("ai-message", handleAIMessage);
    };
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { type: "user", text: input }]);

    // Show AI typing loader
    setIsTyping(true);

    // Send message to AI via socket
    socket.emit("user-message", input);

    setInput(""); // Clear input box
  };

  // Scroll to bottom on new messages or typing
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-[80vh] mt-10 bg-gray-900 text-white w-full">
      {/* Header */}
      <div className="p-4 bg-indigo-600 flex items-center justify-between shadow">
        <h1 className="text-xl font-bold">Numeric Finance AI Chat</h1>
      </div>

      {/* Chat Area */}
      <div className="flex-1 px-5 p-4 overflow-y-auto flex flex-col gap-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 max-w-xl ${
              msg.type === "user" ? "self-end flex-row-reverse" : "self-start"
            }`}
          >
            <div className="flex-shrink-0">
              <User
                className={`w-6 h-6 ${
                  msg.type === "user" ? "text-indigo-400" : "text-green-400"
                }`}
              />
            </div>
            <div
              className={`p-3 rounded-xl break-words ${
                msg.type === "user" ? "bg-indigo-600" : "bg-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* AI Typing Loader */}
        {isTyping && (
          <div className="flex items-start gap-2 max-w-xl self-start">
            <User className="w-6 h-6 text-green-400" />
            <div className="p-3 rounded-xl bg-gray-700 flex items-center">
              <div className="dots-loader">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {/* Input Box */}
      <div className="p-4 flex items-center gap-3 bg-gray-800 border-t border-gray-700 rounded-t-xl">
        <label htmlFor="file" className="cursor-pointer">
          <Image className="w-6 h-6 text-gray-400 hover:text-white transition" />
        </label>
        <input type="file" id="file" className="hidden" />
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 bg-gray-700 text-white rounded-xl px-4 py-2 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>
          <SendToBackIcon className="w-6 h-6 text-gray-400 hover:text-white rotate-90 transition" />
        </button>
      </div>
    </div>
  );
};

export default AIChatPage;
