import React, { useEffect, useState, useRef } from "react";
import {
  UserPlus,
  LogOut,
  Trash2,
  Info,
  Send,
  Users,
  X,
  ShieldCheck,
  MessageCircle,
  UserCheck,
} from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "../config/axios.config";
import socket from "../config/socket";

const ViewGroup = () => {
  const { id } = useParams();
  const chatContainerRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  // Join group via socket
  useEffect(() => {
    socket.emit("joinGroup", id);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("userTyping", (user) => {
      setTypingUsers((prev) => {
        if (!prev.includes(user)) return [...prev, user];
        return prev;
      });
      setTimeout(() => {
        setTypingUsers((prev) => prev.filter((u) => u !== user));
      }, 2000);
    });

    return () => {
      socket.emit("leaveGroup", id);
      socket.off("receiveMessage");
      socket.off("userTyping");
    };
  }, [id]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Fetch group data
  const fetchGroupData = async () => {
    try {
      const res = await axios.get(`/group/group/${id}`);
      setGroup(res.data.group);
      setMembers(res.data.group.members || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch all users for "Add Member"
  const fetchAllUsers = async () => {
    try {
      const res = await axios.get("/auth/users");
      setUsers(res.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  // Load initial messages
  const getAllMessages = async () => {
    try {
      setLoadingMessages(true);
      const res = await axios.get(`/group/chat/${id}`);
      if (res.data && res.data.messages) {
        setMessages(res.data.messages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchGroupData();
    getAllMessages();
  }, []);

  // Send a message
  const sendMessage = () => {
    if (!message.trim()) return;
    const msgData = {
      sender: { name: "You" },
      message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, msgData]);
    socket.emit("sendMessage", { id, message });
    setMessage("");
  };

  // Typing indicator
  const handleTyping = () => {
    socket.emit("typing", { groupId: id, user: "You" });
  };

  // Add member to group
  const addMemberToGroup = async (email) => {
    try {
      await axios.post(`/group/invite/${id}`, { email });
      alert("✅ Member added successfully!");
      fetchGroupData();
      setIsAddMemberOpen(false);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add member");
    }
  };

  return (
    <div className="flex flex-col h-[85vh] w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Header */}
      <div
        onClick={() => setIsDrawerOpen(true)}
        className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900/80 cursor-pointer hover:bg-gray-900/90 transition"
      >
        <div className="flex items-center gap-3">
          <MessageCircle className="text-green-400 w-6 h-6" />
          <div>
            <h1 className="text-xl font-bold text-green-400">
              {group?.name || "Loading..."}
            </h1>
            <p className="text-sm text-gray-400">
              Tap here for group info • {members?.length} Members
            </p>
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-5 space-y-4"
      >
        {loadingMessages ? (
          <div className="flex justify-center items-center h-full">
            <div className="loader border-4 border-green-400 border-t-transparent rounded-full w-10 h-10 animate-spin"></div>
          </div>
        ) : messages.length === 0 ? (
          <p className="text-gray-400 text-center">No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={msg._id || index}
              className={`flex ${
                msg.sender.name === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 max-w-sm rounded-2xl ${
                  msg.sender.name === "You"
                    ? "bg-green-600 text-white"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                <p className="text-sm font-semibold mb-1">{msg.sender.name}</p>
                <p className="text-sm">{msg.message}</p>
              </div>
            </div>
          ))
        )}

        {/* Typing Indicator */}
        {typingUsers.length > 0 && (
          <p className="text-sm text-gray-400 italic">
            {typingUsers.join(", ")} typing...
          </p>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-800 flex items-center gap-2 bg-gray-900/70 backdrop-blur-md">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
            handleTyping();
          }}
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-1 transition"
        >
          <Send size={16} /> Send
        </button>
      </div>

      {/* Drawer for group info */}
      <div
        className={`absolute top-0 right-0 h-full w-80 bg-gray-900 border-l border-gray-800 shadow-2xl transform transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-green-400">
            <Info size={18} /> Group Info
          </h2>
          <X
            className="cursor-pointer text-gray-400 hover:text-white"
            onClick={() => setIsDrawerOpen(false)}
          />
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-4rem)]">
          {/* Group Details */}
          <div className="bg-gray-800 rounded-lg p-3">
            <p className="text-sm text-gray-400 mb-1">Group Name</p>
            <p className="font-semibold text-white">{group?.name}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <p className="text-sm text-gray-400 mb-1">Created By</p>
            <p className="font-semibold text-white">
              {group?.createdBy?.name || "Unknown"}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <p className="text-sm text-gray-400 mb-1">Description</p>
            <p className="text-sm text-gray-300">
              {group?.description ||
                "Manage expenses and AI financial analytics together."}
            </p>
          </div>

          {/* Members */}
          <div>
            <h3 className="font-semibold text-green-400 flex items-center gap-2 mb-2">
              <Users size={18} /> Members
            </h3>
            <ul className="space-y-2">
              {group?.members?.map((member) => (
                <li
                  key={member._id}
                  className="flex items-center justify-between bg-gray-800 p-2 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                    <span className="text-sm">{member?.userId?.name}</span>
                  </div>
                  {member.role === "admin" && (
                    <span className="text-xs text-green-400">Admin</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2 mt-4">
            <button
              onClick={() => {
                fetchAllUsers();
                setIsAddMemberOpen(true);
              }}
              className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <UserPlus size={16} /> Add Member
            </button>
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg flex items-center justify-center gap-2">
              <LogOut size={16} /> Leave Group
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center gap-2">
              <Trash2 size={16} /> Delete Group
            </button>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {isAddMemberOpen && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-gray-900 rounded-2xl w-96 p-5 border border-gray-800 shadow-xl">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2">
                <UserPlus size={18} /> Add Members
              </h3>
              <X
                className="cursor-pointer text-gray-400 hover:text-white"
                onClick={() => setIsAddMemberOpen(false)}
              />
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2">
              {users?.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between bg-gray-800 p-2 rounded-lg"
                >
                  <span className="text-sm text-white">{user.name}</span>
                  <button
                    onClick={() => addMemberToGroup(user?.email)}
                    className="text-xs bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg flex items-center gap-1"
                  >
                    <UserCheck size={14} /> Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewGroup;
