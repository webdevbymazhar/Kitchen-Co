import Navbar from "./Navbar";

const OrderSkeleton = () => {
  return (
    <>
      <Navbar />
      <div className="grid mt-24 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gradient-to-br from-gray-100 to-gray-200">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg shadow-xl bg-white p-6 transform transition-all duration-300"
          >
            {/* Skeleton for User Info */}
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>

            {/* Skeleton for Total Price */}
            <div className="animate-pulse mt-6 h-6 bg-gray-300 rounded w-1/2"></div>

            {/* Skeleton for Status Badge */}
            <div className="mt-4 animate-pulse flex items-center">
              <div className="h-5 w-20 bg-gray-300 rounded-full"></div>
            </div>

            {/* Skeleton for Item Details */}
            <h3 className="font-bold mt-6 text-lg mb-3 border-b pb-2">
              Items:
            </h3>
            <div className="space-y-4">
              {[...Array(2)].map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between animate-pulse py-2"
                >
                  <div className="w-20 h-20 bg-gray-300 rounded-md"></div>
                  <div className="flex-grow ml-4 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Skeleton for Feedback Button */}
            <div className="mt-6 text-center">
              <div className="w-1/2 mx-auto h-10 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderSkeleton;
