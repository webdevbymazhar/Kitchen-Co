'use client';
import { useState } from 'react';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    jobType: 'rider',
    experience: '',
    message: '',
    
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('Application submitted successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          jobType: 'rider',
          experience: '',
          message: '',
        });
      } else {
        setStatus('Error submitting application.');
      }
    } catch (error) {
      setStatus('Error submitting application.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-8 border border-gray-300 rounded-xl shadow-xl bg-white">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Job Application</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-medium">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 text-sm font-medium">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="jobType" className="block text-gray-700 text-sm font-medium">Job Type</label>
            <select
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="rider">Rider</option>
              <option value="waiter">Waiter</option>
              <option value="chef">Chef</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="experience" className="block text-gray-700 text-sm font-medium">Experience</label>
          <textarea
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 text-sm font-medium">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Submit Application
        </button>
      </form>

      {status && (
        <p className="mt-6 text-center text-lg text-green-600 font-semibold">{status}</p>
      )}
    </div>
  );
};

export default JobApplicationForm;
