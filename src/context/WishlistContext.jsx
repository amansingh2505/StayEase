import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (id) => {
  if (wishlist.includes(id)) {
    toast("Removed from Wishlist", {
      icon: "💔",
    });

    setWishlist((prev) => prev.filter((item) => item !== id));
  } else {
    toast.success("Added to Wishlist ❤️");

    setWishlist((prev) => [...prev, id]);
  }
};

  const isWishlisted = (id) => wishlist.includes(id);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}