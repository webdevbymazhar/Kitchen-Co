"use client";
import Link from "next/link";
import {
  FaUtensils,
  FaReceipt,
  FaChartLine,
  FaCalendar,
  FaUsers,
  FaTruck,
  FaClipboardList,
  FaCog,
  FaBars,
  FaAngleLeft,
} from "react-icons/fa";
import { useState } from "react";
import { ArrowLeft01Icon, ArrowRight01Icon, DashboardCircleSettingsIcon } from "hugeicons-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // State to manage sidebar open/close

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the sidebar state
  };

  return (
    <div
      className={`bg-gray-800  pb-5 relative text-white h-fit flex flex-col transition-all duration-300 ${
        isOpen ? "w-64 px-4" : "w-16 px-1"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className={`flex absolute top-16 rounded-full  right-0 items-center justify-center h-12 rounded-r-lg bg-blue-600 hover:bg-blue-500 transition-colors duration-200 ${
          isOpen ? "mb-4" : "mb-0  py-0"
        }`}
      >
        {isOpen ? (
          <ArrowRight01Icon size={20} color={"#ffffff"} variant={"stroke"} />
        ) : (
          <ArrowLeft01Icon size={20} color={"#ffffff"} variant={"stroke"} />
        )}
      </button>

      <div className="flex items-center gap-2 mt-5">
        <img
          className="w-70  "
          src="/logoo.png"
          alt="Restaurant Logo"
        />
        <Link href="/">
          {" "}
          {/* <h1
            className={`text-2xl text-white  font-bold ${
              isOpen ? "block" : "hidden"
            } `}
          >
            Kitchen & Co
          </h1> */}
        </Link>
      </div>

      <ul className="space-y-6 flex-grow mt-10">
        {[
          { icon: FaChartLine, label: "Dashboard", href: "/admindashboard" },
          { icon: FaUtensils, label: "Menu Management", href: "/addmenu" },
          { icon: FaUtensils, label: "Deals Management", href: "/adddeal" },
          { icon: FaReceipt, label: " Online Orders", href: "/addorder" },
          { icon: FaReceipt, label: "Real Time Orders", href: "/addsimorder" },
          { icon: FaCalendar, label: "Reservations", href: "/addtable" },
          { icon: FaUsers, label: "Customers", href: "/customer" },
          { icon: FaUsers, label: "Staff Management", href: "/staff" }, // New link
          { icon: FaTruck, label: "Drivers", href: "/drivers" }, // New link
          { icon: FaClipboardList, label: "Reports", href: "/reports" }, // New link
          { icon: DashboardCircleSettingsIcon, label: "Settings", href: "/setting" }, // New link
          
        ].map(({ icon: Icon, label, href }, idx) => (
          <li key={idx}>
            <Link
              href={href}
              className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700 transition duration-200"
            >
              <Icon className="text-lg" />
              {isOpen && <span>{label}</span>}{" "}
              {/* Show label only when sidebar is open */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
