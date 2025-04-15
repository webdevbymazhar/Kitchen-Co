"use client";
import Sidebar from "@/components/Slidebar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4500 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 5500 },
  { month: "Jul", revenue: 7000 },
  { month: "Aug", revenue: 6500 },
  { month: "Sep", revenue: 8000 },
  { month: "Oct", revenue: 7500 },
  { month: "Nov", revenue: 9000 },
  { month: "Dec", revenue: 10000 },
];

export default function Component() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const fetchOrderSummary = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout/admin"); // Adjust the endpoint to return only summary data
      const data = await response.json();

      if (response.ok) {
        setTotalRevenue(data.totalRevenue); // Assuming API response includes total revenue
        setTotalOrders(data.totalOrders); // Assuming API response includes total orders count
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setError("An error occurred while fetching order summary.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderSummary();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      // Filter users whose role is 'customer'
      const customerUsers = data.filter((user) => user.role === "customer");
      setUsers(customerUsers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="h-screen bg-gray-100 overflow-auto">
          <main className="container mx-auto p-6">
            <div className="mb-8 overflow-hidden rounded-lg bg-white shadow-lg">
              <div className="relative h-[40vh] bg-gray-900 sm:h-[50vh] md:h-[60vh]">
                <Image
                  src="/rrr.jpg"
                  alt="Food platter representing Al-Tastehub's culinary offerings"
                  fill
                  className="object-cover opacity-60"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
                <svg
                  className="absolute bottom-0 left-0 w-full text-white"
                  viewBox="0 0 1440 120"
                  fill="currentColor"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
                </svg>
              </div>

              <div className="relative px-6 pb-12 pt-6">
                <div
                  className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-emerald-100/80"
                  aria-hidden="true"
                />

                <div className="relative">
                  <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
                    Kitchen & Co Annual Report 2024
                  </h1>
                  <p className="mb-4 text-sm text-gray-600">
                    A comprehensive overview of our culinary journey, financial
                    performance, and strategic initiatives throughout the year.
                    Discover the numbers behind our success and our vision for
                    the future.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-white p-6  shadow-md hover:shadow-xl">
                <h2 className="mb-2 text-lg font-semibold">Total Revenue</h2>
              
                  <p className="text-2xl font-bold">
                    ${totalRevenue}
                  </p>
               
                <p className="text-sm text-gray-600">+20.1% from last year</p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-md hover:shadow-xl">
                <h2 className="mb-2 text-lg font-semibold">Total Customers</h2>
                <p className="text-2xl font-bold">+{users.length}</p>
                <p className="text-sm text-gray-600">+180.1% from last month</p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-md hover:shadow-xl">
                <h2 className="mb-2 text-lg font-semibold">Orders Served</h2>
                <p className="text-2xl font-bold">{totalOrders}</p>
                <p className="text-sm text-gray-600">+19% from last month</p>
              </div>
            </div>

            <div className="mt-8 rounded-lg bg-white p-6 shadow-md hover:shadow-xl">
              <h2 className="mb-4 text-xl font-semibold">Revenue Overview</h2>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <XAxis
                      dataKey="month"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Bar
                      dataKey="revenue"
                      fill="#4f46e5"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-8 rounded-lg bg-white p-6 shadow-md hover:shadow-xl">
              <h2 className="mb-4 text-xl font-semibold">Key Highlights</h2>
              <ul className="ml-6 list-disc [&>li]:mt-2">
                <li>
                  Launched 5 new signature dishes, increasing menu diversity by
                  15%
                </li>
                <li>
                  Expanded to 3 new locations, growing our presence in key
                  metropolitan areas
                </li>
                <li>
                  Implemented a new customer loyalty program, resulting in a 30%
                  increase in repeat customers
                </li>
                <li>
                  Reduced food waste by 25% through innovative inventory
                  management techniques
                </li>
                <li>
                  Partnered with local farms to source 70% of our ingredients,
                  supporting sustainable agriculture
                </li>
              </ul>
            </div>

            <div className="mt-8 text-center">
              <a
                href="#"
                className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
              >
                View Full Report
              </a>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
