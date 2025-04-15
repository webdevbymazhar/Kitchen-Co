'use client'
import { useState } from "react";

export default function UpdateRoleForm() {
  const [email, setEmail] = useState("");
  const [newRole, setNewRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("/api/users/updateRole", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newRole }),
      });
  
      let data;
      if (response.ok) {
        data = await response.json();
        alert(data.message); 
      } else {
        data = await response.json().catch(() => null); // Fallback to null if parsing fails
        alert(data?.message || "Failed to update role");
      }
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred while updating the role.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Role:</label>
        <select
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
          <option value="user">User</option>
          {/* Add more roles as needed */}
        </select>
      </div>

      <button type="submit">Update Role</button>
    </form>
  );
}
