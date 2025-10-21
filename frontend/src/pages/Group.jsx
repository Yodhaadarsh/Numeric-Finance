import React, { useEffect, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import axios from "../config/axios.config";
import {useNavigate} from 'react-router-dom'

const GroupsPage = () => {
  const [groups, setGroups] = useState(null);
  const [search, setSearch] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false); // For create button
  const [fetching, setFetching] = useState(true); // For groups loading

  const handleCreateGroupSubmit = async (e) => {
    e.preventDefault();
    if (!newGroup.name) return;
    setLoading(true);

    try {
      let res = await axios.post("/group/create", newGroup);
      console.log(res.data);

      // Add the newly created group to list
      setGroups((prev) => [...prev, res.data.group]);

      // Reset form and close modal
      setNewGroup({ name: "", description: "" });
      setShowCreateForm(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getAllGroups = async () => {
    try {
      setFetching(true);
      let res = await axios.get("/group/all-groups");
      setGroups(res.data.groups);
      setFetching(false);
    } catch (error) {
      console.log(error);
      setFetching(false);
    }
  };

  useEffect(() => {
    getAllGroups();
  }, [loading]);

  const filteredGroups = groups?.filter((group) =>
    group.name.toLowerCase().includes(search.toLowerCase())
  );


  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/group/${id}`)
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-800 shadow-md">
        <h1 className="text-2xl font-bold">Groups</h1>
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search groups"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Create Group Button */}
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition"
          >
            <Plus className="w-4 h-4" />
            Create Group
          </button>
        </div>
      </div>

      {/* Groups List */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {fetching ? (
          <div className="col-span-full flex justify-center items-center">
            <span className="w-10 h-10 border-4 border-t-transparent mt-24 border-white rounded-full animate-spin"></span>
          </div>
        ) : filteredGroups?.length > 0 ? (
          filteredGroups.map((group) => (
            <div
            onClick={()=>handleNavigate(group._id)}
              key={group.id}
              className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg cursor-pointer transition"
            >
              <h2 className="font-semibold text-lg">{group.name}</h2>
              {group.description && (
                <p className="text-gray-400 text-sm mt-1">
                  {group.description}
                </p>
              )}
              <p className="text-gray-400 text-sm mt-1">
                {group.members?.length || 0} members
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            No groups found
          </p>
        )}
      </div>

      {/* Create Group Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md relative">
            {/* Close button */}
            <X
              className="absolute top-3 right-3 w-6 h-6 cursor-pointer text-gray-400 hover:text-white"
              onClick={() => setShowCreateForm(false)}
            />
            <h2 className="text-xl font-semibold mb-4">Create New Group</h2>
            <form onSubmit={handleCreateGroupSubmit} className="space-y-4">
              <div className="border-b border-gray-600">
                <input
                  type="text"
                  placeholder="Group Name"
                  value={newGroup.name}
                  onChange={(e) =>
                    setNewGroup((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full bg-gray-800 text-white px-1 py-2 focus:outline-none"
                  disabled={loading}
                />
              </div>
              <div className="border-b border-gray-600">
                <input
                  type="text"
                  placeholder="Description"
                  value={newGroup.description}
                  onChange={(e) =>
                    setNewGroup((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full bg-gray-800 text-white px-1 py-2 focus:outline-none"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition flex justify-center items-center"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                ) : (
                  "Create"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupsPage;
