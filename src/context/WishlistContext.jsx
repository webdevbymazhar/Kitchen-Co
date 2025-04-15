// contexts/WishlistContext.js
import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (dish) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.find((item) => item._id === dish._id)) {
        // Remove from wishlist if already added
        return prevWishlist.filter((item) => item._id !== dish._id);
      } else {
        // Add to wishlist if not already added
        return [...prevWishlist, dish];
      }
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
