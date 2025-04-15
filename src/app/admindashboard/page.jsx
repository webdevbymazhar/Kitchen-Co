"use client";
import Navbar from "@/components/Navbar";
import ReservationsCard from "@/components/ReservationsCard";
import RevenueChart from "@/components/RevenueChart";
import RatingPage from "../rating/page";
import OrdersOverview from "@/components/OrdersOverveiw";
import Sidebar from "@/components/Slidebar";
import DashBoard from "@/components/DashBoard";
import CustomerFeedbackCard from "@/components/CustomerFeedbackCard";
import FinancialSummaryCard from "@/components/FinancialSummaryCard";
import InventoryOverviewCard from "@/components/InventoryOverviewCard";
import TopSellingItemsCard from "@/components/TopSellingItemsCard";
import { useSession } from "next-auth/react";
const Dashboard = () => {
  const { data: session } = useSession();
  return (
    <div>
      {session?.user?.role === "superadmin" ||
      session?.user?.role === "admin" ? (
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Restaurant Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 h-screen overflow-auto">
              <RevenueChart />
              <OrdersOverview />
              <ReservationsCard />
              <RatingPage />
              <CustomerFeedbackCard />
              <FinancialSummaryCard />
              <InventoryOverviewCard />
              <TopSellingItemsCard />
            </div>
          </div>
        </div>
      ) : (
        <p>You are not a admin</p>
      )}
    </div>
  );
};
export default Dashboard;