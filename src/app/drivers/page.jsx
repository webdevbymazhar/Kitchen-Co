




'use client';

import Sidebar from '@/components/Slidebar';
import { useEffect, useState } from 'react';

const DriverPage = () => {
  const [driverLocation, setDriverLocation] = useState(null);
  const [error, setError] = useState(null);

  // Mock data for multiple drivers
  const [drivers, setDrivers] = useState([
    { id: 1, name: "John Doe", status: "Active", location: "Restaurant" },
    { id: 2, name: "Jane Smith", status: "Active", location: "Delivering" },
    { id: 3, name: "Mike Johnson", status: "Absent", location: "N/A" },
    { id: 4, name: "Sarah Williams", status: "Active", location: "Restaurant" },
    { id: 5, name: "Chris Brown", status: "Active", location: "Delivering" },
  ]);

  // Mock data for current driver
  const currentDriver = {
    name: "John Doe",
    email: "john.doe@example.com",
    status: "Active",
  };

  // Fetch live location of the current driver
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setDriverLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (err) => setError(err.message),
          { enableHighAccuracy: true }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    // Update location every 10 seconds
    getLocation();
    const locationInterval = setInterval(getLocation, 10000);
    return () => clearInterval(locationInterval);
  }, []);

  return (
<>

<div className='flex'>
  <Sidebar/>
    <div className="min-h-screen w-full bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Driver Dashboard</h1>
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">{currentDriver.name}</h2>
              <p className="text-gray-600">{currentDriver.email}</p>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="w-full flex flex-col md:flex-row justify-between items-center bg-gray-50 p-6 rounded-lg shadow-inner">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-500">Current Status:</p>
                <p className="text-green-500 font-bold text-lg">{currentDriver.status}</p>
              </div>
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-300">
                Start Delivery
              </button>
            </div>

            <div className="w-full text-center bg-gray-50 p-6 rounded-lg shadow-inner">
              <p className="text-gray-500 mb-2">Destination:</p>
              <p className="text-gray-800 font-medium text-lg">1234 Food Street, City, State</p>
            </div>

            {/* All Drivers Section */}
            <div className="w-full mt-8">
              <h3 className="text-2xl font-semibold mb-4">All Drivers</h3>
              <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4 text-left font-semibold text-gray-600">Name</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-600">Status</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-600">Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drivers.map((driver) => (
                      <tr key={driver.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4">{driver.name}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            driver.status === 'Active' ? 'bg-green-200 text-green-800' :
                            driver.status === 'Absent' ? 'bg-red-200 text-red-800' :
                            'bg-yellow-200 text-yellow-800'
                          }`}>
                            {driver.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{driver.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-4">Driver Location</h3>
          <iframe 
            className="w-full h-[500px] rounded-md"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d54475.328148096676!2d73.15449349230957!3d31.42216999832215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1729937853597!5m2!1sen!2s" 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Driver Location Map"
          ></iframe>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default DriverPage;
