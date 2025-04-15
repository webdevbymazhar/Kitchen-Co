'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import toast from 'react-hot-toast';

const UserProfile = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.error('User ID is not available');
        return;
      }

      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUser(data);
        setImagePreview(data.profilePicture);
      } catch (err) {
        setError(err.message);
      }
    };

    if (status === 'authenticated') {
      fetchUserData();
    } else {
      console.log('User is not authenticated or session is loading');
    }
  }, [userId, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error('User ID is not defined');
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) throw new Error('Failed to update user data');
      const updatedUser = await response.json();
      setUser(updatedUser);
      setImagePreview(updatedUser.profilePicture);
      toast.success("Profle updated Successfully")
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setUser({ ...user, profilePicture: file });
    }
  };

  if (status === 'loading') {
    return <p>Loading session...</p>;
  }

  if (error) return <div>{error}</div>;

  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center gap-6 p-6 min-h-screen bg-gray-100 mt-24">
      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg transform transition duration-500 ">
        {user ? (
          <div>
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">User Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center mb-4">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-full object-cover border transition duration-500 ease-in-out transform hover:scale-110"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200" />
                )}
                <label className="block mt-4 font-medium cursor-pointer text-indigo-500 hover:text-indigo-600">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  Change Profile Picture
                </label>
              </div>

              <div className="space-y-4">
                {['name','ContactNumber' , 'Country' , 'PostCode' , 'street', 'city', 'state', 'zip'].map((field, index) => (
                  <div key={index} className="relative">
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      placeholder={`Enter ${field}`}
                      value={user[field] || user.address?.[field] || ''}
                      onChange={(e) =>
                        setUser((prevUser) => ({
                          ...prevUser,
                          [field]: field in user ? e.target.value : undefined,
                          address:
                            field in user.address
                              ? { ...prevUser.address, [field]: e.target.value }
                              : prevUser.address,
                        }))
                      }
                      className="w-full px-4 py-3 text-gray-800 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 transition-all duration-300 placeholder-transparent peer"
                      required
                    />
                    <label
                      className="absolute left-4 top-2 text-gray-500 transform -translate-y-6 scale-75 origin-top-left transition-all duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-indigo-500"
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-6 font-semibold text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 transform hover:scale-105"
              >
                Update
              </button>
            </form>
          </div>
        ) : (
          <p className="text-center text-gray-600">User not found.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default UserProfile;
