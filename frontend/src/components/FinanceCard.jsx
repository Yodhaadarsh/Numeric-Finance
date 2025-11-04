import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const AIFinanceAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Hello! I’m Numeric Finance AI 🤖. Ask me anything about your expenses or investments.",
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Fake AI response for demo
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "I'm analyzing your spending... Here's a quick insight: You spent 25% more on entertainment this month 🎬.",
        },
      ]);
    }, 800);
  };

  return (
    <>
      {/* Floating Chat Bubble */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-[#0f172a] dark:bg-[#0f172a] text-gray-100 shadow-2xl rounded-2xl flex flex-col overflow-hidden border border-gray-700 transition-all duration-300">
          {/* Header */}
          <div className="flex justify-between items-center bg-indigo-700/40 px-4 py-3 border-b border-gray-700">
            <h2 className="font-semibold text-lg text-indigo-300">
              Numeric AI Assistant 💡
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-red-400 transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.type === "ai" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                    msg.type === "ai"
                      ? "bg-indigo-800/40 text-gray-100"
                      : "bg-indigo-600 text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Example Prompts */}
          <div className="px-4 py-3 border-t border-gray-700 bg-[#1e293b]/50">
            <p className="text-xs text-gray-400 mb-2">
              Try asking me:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "How can I save more this month?",
                "Compare this month’s expenses with last month.",
                "Rewrite my expenses in short summary.",
              ].map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => setInput(prompt)}
                  className="text-xs bg-indigo-800/40 hover:bg-indigo-700/50 text-gray-300 px-3 py-1 rounded-full transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="flex items-center border-t border-gray-700 bg-[#1e293b]/70 px-3 py-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Numeric AI..."
              className="flex-1 bg-transparent text-sm outline-none text-gray-200 placeholder-gray-500"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-indigo-600 hover:bg-indigo-700 p-2 rounded-full text-white transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIFinanceAssistant;
