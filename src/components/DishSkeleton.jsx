import { motion } from "framer-motion";

const DishSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-wrap justify-center items-center">
      <div className="relative w-[100%] mr-10 bg-gray-200 rounded-lg overflow-hidden animate-pulse">
        
        {/* Main Image Skeleton */}
        <motion.div
          className="w-full h-[50px] rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        />
        
        {/* Bottom Left Dish Skeleton */}
        <motion.div
          className="absolute -left-24 bottom-3 w-[200px] h-[200px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Top Right Flower Skeleton */}
        <motion.div
          className="absolute -right-24 top-3 w-[100px] h-[100px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Top Left Flower Skeleton */}
        <motion.div
          className="absolute -left-24 top-1 w-[100px] h-[100px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Text Skeleton */}
        <div className="mt-4 p-4 space-y-2">
          <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default DishSkeleton;
