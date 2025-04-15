// components/Sidebar.js
import Link from "next/link";
import { FaUtensils, FaReceipt, FaChartLine, FaCalendar, FaUsers } from "react-icons/fa";

const Sidebar = () => (
  <div className="w-64 bg-gray-900 text-white h-screen p-6 flex flex-col">
    <h2 className="text-2xl font-bold mb-8">Restaurant Admin</h2>
    <ul className="space-y-6">
      {[
        { icon: FaChartLine, label: "Dashboard", href: "/admindashboard" },
        { icon: FaUtensils, label: "Menu Management", href: "/menu" },
        { icon: FaReceipt, label: "Orders", href: "/orders" },
        { icon: FaCalendar, label: "Reservations", href: "/reservations" },
        { icon: FaUsers, label: "Customers", href: "/customers" },
      ].map(({ icon: Icon, label, href }, idx) => (
        <li key={idx}>
          
            <Link href={href} className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700 transition duration-200">
              <Icon />
              <span>{label}</span>
            </Link>
          
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;
