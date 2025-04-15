// pages/dashboard.js
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sildebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
