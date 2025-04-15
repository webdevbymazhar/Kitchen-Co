import { motion } from "framer-motion";

const OrdersOverview = () => (
  <motion.div
    className="bg-white rounded-lg shadow-lg p-6"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.5 }}
  >
    <h3 className="font-semibold mb-4 text-lg">Orders Overview</h3>
    <div className="space-y-4">
      <div className="flex justify-between">
        <span>Today</span>
        <span className="font-bold text-blue-600">85 Orders</span>
      </div>
      <div className="flex justify-between">
        <span>This Week</span>
        <span className="font-bold text-green-600">560 Orders</span>
      </div>
      <div className="flex justify-between">
        <span>This Month</span>
        <span className="font-bold text-indigo-600">2,300 Orders</span>
      </div>
    </div>
  </motion.div>
);

export default OrdersOverview;
