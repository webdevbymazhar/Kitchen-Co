"use client";

import { useState } from "react";
import {
  Search,
  MoreVertical,
  Plus,
  Trash2,
  Edit2,
  Mail,
  Phone,
} from "lucide-react";
import Sidebar from "@/components/Slidebar";

const staffMembers = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Manager",
    email: "alice@example.com",
    phone: "+1 234 567 890",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Chef",
    email: "bob@example.com",
    phone: "+1 234 567 891",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Charlie Brown",
    role: "Waiter",
    email: "charlie@example.com",
    phone: "+1 234 567 892",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Diana Ross",
    role: "Bartender",
    email: "diana@example.com",
    phone: "+1 234 567 893",
    image: "/placeholder.svg?height=100&width=100",
  },
];

export default function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);

  const filteredStaff = staffMembers.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6  overflow-auto h-screen ">
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">
              Staff Management
            </h1>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 flex justify-between items-center border-b border-gray-200">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search staff..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search
                    className="absolute left-3 bottom-3 text-gray-400"
                    size={20}
                  />
                </div>
                {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 flex items-center">
              <Plus size={20} className="mr-2" />
              Add New Staff
            </button> */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {filteredStaff.map((staff) => (
                  <div
                    key={staff.id}
                    className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <img
                        src={staff.image}
                        alt={staff.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <button
                        onClick={() =>
                          setSelectedStaff(
                            selectedStaff === staff.id ? null : staff.id
                          )
                        }
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <MoreVertical size={20} />
                      </button>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {staff.name}
                    </h3>
                    <p className="text-gray-600">{staff.role}</p>
                    <div className="mt-4 space-y-2">
                      <a
                        href={`mailto:${staff.email}`}
                        className="flex items-center text-gray-600 hover:text-blue-500"
                      >
                        <Mail size={16} className="mr-2" />
                        {staff.email}
                      </a>
                      <a
                        href={`tel:${staff.phone}`}
                        className="flex items-center text-gray-600 hover:text-blue-500"
                      >
                        <Phone size={16} className="mr-2" />
                        {staff.phone}
                      </a>
                    </div>
                    {selectedStaff === staff.id && (
                      <div className="mt-4 flex justify-end space-x-2">
                        <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
