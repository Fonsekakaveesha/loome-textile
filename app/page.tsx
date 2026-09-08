"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Mail,
  Menu,
  MoveUpRight,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";

const slides = [
  {
    eyebrow: "AUTUMN / WINTER 2026",
    title: "Woven",
    highlight: "with Elegance.",
    description:
      "Discover refined textiles crafted for modern spaces, timeless wardrobes and elevated everyday living.",
    button: "Explore Collection",
    image:
      "https://static.wixstatic.com/media/7abadb_4f783de80c884d68b3b087132c39e3f1~mv2.png/v1/fill/w_752%2Ch_502%2Cal_c%2Cq_90%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/7abadb_4f783de80c884d68b3b087132c39e3f1~mv2.png",
  },
  {
    eyebrow: "THE LINEN EDIT",
    title: "Naturally",
    highlight: "Beautiful.",
    description:
      "Breathable linen textures, soft neutral tones and effortless sophistication.",
    button: "Discover Linen",
    image:
      "https://media.istockphoto.com/id/865393164/photo/interior-of-a-store-selling-womens-clothes-and-accessories.jpg?s=170667a&w=0&k=20&c=cofEOecDlhQsCs4dJ7CbSve0TIkX3tF2FVIeBVW5HZo=",
  },
  {
    eyebrow: "CRAFTED SILK",
    title: "Softness",
    highlight: "meets Luxury.",
    description:
      "A curated collection of beautifully finished fabrics designed to make every detail feel special.",
    button: "Shop Silk",
    image:
      "https://media.istockphoto.com/id/1394033413/photo/luxury-fashion-store-front-in-modern-shopping-mall.jpg?s=612x612&w=0&k=20&c=MSrTLh8EAj7BnqEN-dLgKnBF5NpGgktUrwsYgz-zk6I=",
  },
];

const categories = [
  {
    name: "Linen",
    subtitle: "Natural / Breathable",
    description: "Relaxed textures and timeless natural tones.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhjClYtQzIAw4P8htWgtZZbPXRiPlZFRbWEzu1X3SbfX3S_a-N0i4gkjCX&s=10",
  },
  {
    name: "Cotton",
    subtitle: "Soft / Everyday",
    description: "Comfortable essentials with refined texture.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqQjYxbsH26XjGZNAQxpiMM903gYQqJ61deCyyE1OfX05uvLU3i71p3vdy&s=10",
  },
  {
    name: "Silk",
    subtitle: "Elegant / Fluid",
    description: "Luminous fabrics with a beautifully smooth finish.",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Wool",
    subtitle: "Warm / Textured",
    description: "Rich tactile fabrics for timeless layering.",
    image:
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=1200&q=85",
  },
];

const products = [
  {
    name: "Natural Linen",
    category: "Linen",
    price: "$48 / m",
    badge: "BESTSELLER",
    image:
      "https://akira.lk/wp-content/uploads/2026/09/August-63-300x450.jpg",
    hoverImage:
      "https://akira.lk/wp-content/uploads/2026/08/MAY-287-300x450.jpg",
  },
  {
    name: "Ivory Cotton",
    category: "Cotton",
    price: "$32 / m",
    badge: "NEW",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqhUvWEao9MGzD4QO84Eo8sLHNqax8UqtGMc-g94VvNA&s=10",
    hoverImage:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Champagne Silk",
    category: "Silk",
    price: "$76 / m",
    badge: "SIGNATURE",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=85",
    hoverImage:
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Soft Merino Wool",
    category: "Wool",
    price: "$64 / m",
    badge: "PREMIUM",
    image:
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=1000&q=85",
    hoverImage:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // MOBILE NAVIGATION
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileCategories, setMobileCategories] = useState(false);

  // DESKTOP CATEGORY
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  // WISHLIST
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // CART
  const [cartCount, setCartCount] = useState(0);

  const closeMobileMenu = () => {
    setMobileMenu(false);
    setMobileCategories(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  // ADD / REMOVE WISHLIST
  const toggleLike = (index: number) => {
    setLikedProducts((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  // REMOVE ONLY FROM WISHLIST
  const removeFromWishlist = (index: number) => {
    setLikedProducts((prev) =>
      prev.filter((item) => item !== index)
    );
  };

  // CART
  const addToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#27231f]">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#27231f]/10 bg-[#f7f3ec]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-5 sm:px-10 lg:px-16">

          {/* LOGO */}
          <a
            href="/"
            onClick={closeMobileMenu}
            className="text-[20px] font-semibold tracking-[0.22em] sm:text-[22px]"
          >
            LOOMÉ
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 lg:flex">
            <a
              href="/"
              className="text-[10px] uppercase tracking-[0.18em] underline underline-offset-8"
            >
              Home
            </a>

            {/* PRODUCTS REMOVED */}

            <div
              className="group relative"
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => setCategoriesOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em]"
              >
                Categories

                <ChevronDown
                  size={12}
                  strokeWidth={1.5}
                  className={`transition-transform duration-300 ${
                    categoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {categoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25 }}
                    className="absolute left-1/2 top-full mt-5 w-64 -translate-x-1/2 border border-[#27231f]/10 bg-[#f7f3ec] p-4 shadow-xl"
                  >
                    <p className="px-3 pb-3 text-[8px] uppercase tracking-[0.25em] text-[#27231f]/40">
                      Shop by collection
                    </p>

                    {["Women", "Men", "Kids"].map((item) => (
                      <a
                        key={item}
                        href={`/shop?category=${item}`}
                        className="group/item flex items-center justify-between border-b border-[#27231f]/10 px-3 py-4 text-[10px] uppercase tracking-[0.16em] last:border-0 hover:bg-[#e9e1d5]"
                      >
                        <span>{item}</span>

                        <ArrowRight
                          size={12}
                          className="opacity-0 transition-all duration-300 group-hover/item:translate-x-1 group-hover/item:opacity-60"
                        />
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="/shop"
              className="text-[10px] uppercase tracking-[0.18em] transition-opacity hover:opacity-50"
            >
              Shop
            </a>

            <a
              href="/about"
              className="text-[10px] uppercase tracking-[0.18em] transition-opacity hover:opacity-50"
            >
              About
            </a>

            <a
              href="/contact"
              className="text-[10px] uppercase tracking-[0.18em] transition-opacity hover:opacity-50"
            >
              Contact
            </a>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => {
              setMobileMenu((prev) => !prev);
              setMobileCategories(false);
            }}
            aria-label={mobileMenu ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenu}
            className="order-4 ml-1 flex h-10 w-10 items-center justify-center border border-[#27231f]/15 transition-all duration-300 hover:bg-[#e9e1d5] lg:order-none lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenu ? (
                <motion.div
                  key="close"
                  initial={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.8,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={19} strokeWidth={1.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.8,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={19} strokeWidth={1.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* HEADER ACTIONS */}
          <div className="ml-auto flex items-center gap-2 lg:ml-8">

            {/* WISHLIST BUTTON */}
            <button
              type="button"
              onClick={() =>
                setWishlistOpen((prev) => !prev)
              }
              title="Wishlist"
              aria-label={`Wishlist${
                likedProducts.length
                  ? ` (${likedProducts.length} items)`
                  : ""
              }`}
              aria-expanded={wishlistOpen}
              className={`relative flex h-10 w-10 items-center justify-center border transition-all duration-300 ${
                wishlistOpen
                  ? "border-[#98785a] bg-[#e9e1d5] text-[#98785a]"
                  : "border-[#27231f]/15 hover:bg-[#e9e1d5]"
              }`}
            >
              <Heart
                size={18}
                strokeWidth={1.5}
                fill={
                  likedProducts.length > 0
                    ? "currentColor"
                    : "none"
                }
              />

              {likedProducts.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#98785a] px-1 text-[8px] font-semibold text-white">
                  {likedProducts.length}
                </span>
              )}
            </button>

            {/* WISHLIST DROPDOWN */}
            <AnimatePresence>
              {wishlistOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setWishlistOpen(false)}
                    className="fixed inset-0 z-40 bg-black/10"
                  />

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 12,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: 12,
                      scale: 0.98,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="fixed right-4 top-[88px] z-50 w-[calc(100vw-32px)] max-w-[390px] border border-[#27231f]/10 bg-[#f7f3ec] shadow-2xl sm:right-10 lg:absolute lg:right-16 lg:top-[72px] lg:w-[390px]"
                  >

                    {/* WISHLIST HEADER */}
                    <div className="flex items-center justify-between border-b border-[#27231f]/10 px-5 py-5">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.25em] text-[#98785a]">
                          YOUR COLLECTION
                        </p>

                        <h3 className="mt-1 font-serif text-2xl">
                          Wishlist
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => setWishlistOpen(false)}
                        className="flex h-9 w-9 items-center justify-center border border-[#27231f]/10 transition hover:bg-[#e9e1d5]"
                        aria-label="Close wishlist"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* WISHLIST CONTENT */}
                    {likedProducts.length === 0 ? (
                      <div className="px-6 py-12 text-center">
                        <Heart
                          size={30}
                          strokeWidth={1}
                          className="mx-auto text-[#98785a]"
                        />

                        <h4 className="mt-5 font-serif text-xl">
                          Your wishlist is empty
                        </h4>

                        <p className="mx-auto mt-2 max-w-[260px] text-xs leading-6 text-[#81776d]">
                          Save your favourite textiles here by clicking the
                          heart icon on a product.
                        </p>

                        <button
                          type="button"
                          onClick={() => setWishlistOpen(false)}
                          className="mt-6 inline-flex items-center gap-2 bg-[#27231f] px-6 py-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#403a34]"
                        >
                          Continue Shopping
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="max-h-[420px] overflow-y-auto">
                          {likedProducts.map((productIndex) => {
                            const product = products[productIndex];

                            return (
                              <div
                                key={productIndex}
                                className="flex gap-4 border-b border-[#27231f]/10 p-4"
                              >

                                {/* PRODUCT IMAGE */}
                                <a
                                  href="/product"
                                  onClick={() =>
                                    setWishlistOpen(false)
                                  }
                                  className="h-24 w-20 flex-shrink-0 overflow-hidden bg-[#e9e1d7]"
                                >
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                                  />
                                </a>

                                {/* PRODUCT DETAILS */}
                                <div className="flex min-w-0 flex-1 flex-col justify-between">
                                  <div>
                                    <p className="text-[8px] uppercase tracking-[0.18em] text-[#98785a]">
                                      {product.category}
                                    </p>

                                    <h4 className="mt-1 font-serif text-lg">
                                      {product.name}
                                    </h4>

                                    <p className="mt-1 text-xs text-[#71685f]">
                                      {product.price}
                                    </p>
                                  </div>

                                  <div className="mt-3 flex items-center justify-between">
                                    <a
                                      href="/product"
                                      onClick={() =>
                                        setWishlistOpen(false)
                                      }
                                      className="text-[8px] font-semibold uppercase tracking-[0.16em] underline underline-offset-4"
                                    >
                                      View Product
                                    </a>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        removeFromWishlist(
                                          productIndex
                                        )
                                      }
                                      className="text-[8px] uppercase tracking-[0.16em] text-[#98785a] transition hover:text-[#27231f]"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* WISHLIST FOOTER */}
                        <div className="border-t border-[#27231f]/10 p-5">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] uppercase tracking-[0.18em] text-[#81776d]">
                              {likedProducts.length}{" "}
                              {likedProducts.length === 1
                                ? "Item"
                                : "Items"}
                            </span>

                            <button
                              type="button"
                              onClick={() => setLikedProducts([])}
                              className="text-[8px] uppercase tracking-[0.16em] text-[#98785a] hover:underline"
                            >
                              Clear Wishlist
                            </button>
                          </div>

                          <a
                            href="/shop"
                            onClick={() =>
                              setWishlistOpen(false)
                            }
                            className="mt-4 flex items-center justify-center gap-2 bg-[#27231f] px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#403a34]"
                          >
                            Explore More
                            <ArrowRight size={14} />
                          </a>
                        </div>
                      </>
                    )}
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* ADD TO CART */}
            <a
              href="/shop"
              title="Add to Cart"
              aria-label={`Shopping cart${
                cartCount ? ` (${cartCount} items)` : ""
              }`}
              className="relative flex h-10 w-10 items-center justify-center border border-[#27231f]/15 transition-all duration-300 hover:bg-[#e9e1d5]"
            >
              <ShoppingBag
                size={18}
                strokeWidth={1.5}
              />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#98785a] px-1 text-[8px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </a>

            {/* SHOP - DESKTOP */}
            <a
              href="/shop"
              className="hidden items-center gap-2 border border-[#27231f] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:bg-[#27231f] hover:text-white lg:flex"
            >
              <ShoppingBag
                size={14}
                strokeWidth={1.4}
              />

              Shop
            </a>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="overflow-hidden border-t border-[#27231f]/10 bg-[#f7f3ec] lg:hidden"
            >
              <nav className="mx-auto max-w-[1440px] px-5 py-5 sm:px-10">

                <motion.a
                  href="/"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between border-b border-[#27231f]/10 py-4 text-[11px] uppercase tracking-[0.18em]"
                >
                  Home
                  <ArrowRight
                    size={14}
                    className="text-[#27231f]/40"
                  />
                </motion.a>

                {/* PRODUCTS REMOVED */}

                {/* MOBILE CATEGORIES */}
                <motion.div className="border-b border-[#27231f]/10">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileCategories((prev) => !prev)
                    }
                    className="flex w-full items-center justify-between py-4 text-[11px] uppercase tracking-[0.18em]"
                  >
                    <span>Categories</span>

                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-300 ${
                        mobileCategories
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileCategories && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="overflow-hidden pb-3"
                      >
                        <div className="grid grid-cols-3 gap-2">
                          {["Women", "Men", "Kids"].map(
                            (item) => (
                              <a
                                key={item}
                                href={`/shop?category=${item}`}
                                onClick={closeMobileMenu}
                                className="border border-[#27231f]/10 bg-[#e9e1d5]/60 px-3 py-4 text-center text-[9px] uppercase tracking-[0.14em] transition-all duration-300 hover:bg-[#e9e1d5]"
                              >
                                {item}
                              </a>
                            )
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* MOBILE SHOP */}
                <motion.a
                  href="/shop"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between border-b border-[#27231f]/10 py-4 text-[11px] uppercase tracking-[0.18em]"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag
                      size={15}
                      strokeWidth={1.5}
                    />
                    Shop
                  </span>

                  <ArrowRight
                    size={14}
                    className="text-[#27231f]/40"
                  />
                </motion.a>

                {/* MOBILE WISHLIST */}
                <button
                  type="button"
                  onClick={() => {
                    setWishlistOpen(true);
                    closeMobileMenu();
                  }}
                  className="flex w-full items-center justify-between border-b border-[#27231f]/10 py-4 text-[11px] uppercase tracking-[0.18em]"
                >
                  <span className="flex items-center gap-2">
                    <Heart
                      size={15}
                      strokeWidth={1.5}
                      fill={
                        likedProducts.length > 0
                          ? "currentColor"
                          : "none"
                      }
                    />

                    Wishlist
                  </span>

                  <span className="flex items-center gap-2">
                    {likedProducts.length > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#98785a] px-1 text-[8px] text-white">
                        {likedProducts.length}
                      </span>
                    )}

                    <ArrowRight
                      size={14}
                      className="text-[#27231f]/40"
                    />
                  </span>
                </button>

                {/* MOBILE ADD TO CART */}
                <motion.a
                  href="/shop"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between border-b border-[#27231f]/10 py-4 text-[11px] uppercase tracking-[0.18em]"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag
                      size={15}
                      strokeWidth={1.5}
                    />

                    Add to Cart
                  </span>

                  <span className="flex items-center gap-2">
                    {cartCount > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#98785a] px-1 text-[8px] text-white">
                        {cartCount}
                      </span>
                    )}

                    <ArrowRight
                      size={14}
                      className="text-[#27231f]/40"
                    />
                  </span>
                </motion.a>

                {/* MOBILE ABOUT */}
                <motion.a
                  href="/about"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between border-b border-[#27231f]/10 py-4 text-[11px] uppercase tracking-[0.18em]"
                >
                  About
                  <ArrowRight
                    size={14}
                    className="text-[#27231f]/40"
                  />
                </motion.a>

                {/* MOBILE CONTACT */}
                <motion.a
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between py-4 text-[11px] uppercase tracking-[0.18em]"
                >
                  Contact
                  <ArrowRight
                    size={14}
                    className="text-[#27231f]/40"
                  />
                </motion.a>

                {/* MOBILE SHOP BUTTON */}
                <motion.a
                  href="/shop"
                  onClick={closeMobileMenu}
                  className="mt-4 flex items-center justify-center gap-2 bg-[#27231f] px-5 py-4 text-[9px] uppercase tracking-[0.2em] text-white transition hover:bg-[#403a34]"
                >
                  <ShoppingBag
                    size={14}
                    strokeWidth={1.4}
                  />

                  Shop Collection
                </motion.a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SLIDER */}
      <section className="relative h-[760px] min-h-[680px] overflow-hidden bg-[#302923] md:h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <motion.img
              src={slides[currentSlide].image}
              alt="Premium textile collection"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 6,
                ease: "easeOut",
              }}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/35" />

            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-black/10" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 mx-auto flex h-full max-w-[1500px] items-center px-6 md:px-12 lg:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -25,
              }}
              transition={{
                duration: 0.7,
              }}
              className="max-w-[760px] text-white"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-[#d6b58e]" />

                <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/80">
                  {slides[currentSlide].eyebrow}
                </span>
              </div>

              <h1 className="font-serif text-[62px] leading-[0.92] tracking-[-0.035em] sm:text-[80px] md:text-[100px] lg:text-[120px]">
                {slides[currentSlide].title}
                <br />

                <span className="italic text-[#e2c29b]">
                  {slides[currentSlide].highlight}
                </span>
              </h1>

              <p className="mt-8 max-w-[510px] text-sm leading-7 text-white/75 md:text-base">
                {slides[currentSlide].description}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="/shop"
                  className="group inline-flex items-center gap-4 bg-[#f7f3ec] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#302923] transition hover:bg-[#d6b58e]"
                >
                  {slides[currentSlide].button}

                  <ArrowRight
                    size={15}
                    className="transition group-hover:translate-x-1"
                  />
                </a>

                <a
                  href="/about"
                  className="inline-flex items-center gap-2 border-b border-white/50 pb-1 text-[10px] uppercase tracking-[0.2em] text-white"
                >
                  Our Story
                  <MoveUpRight size={13} />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-10 left-6 right-6 z-20 flex items-end justify-between md:left-12 md:right-12 lg:left-16 lg:right-16">
          <div className="flex items-center gap-4 text-white">
            <span className="font-serif text-2xl">
              0{currentSlide + 1}
            </span>

            <span className="h-px w-10 bg-white/40" />

            <span className="text-[10px] tracking-[0.2em] text-white/60">
              0{slides.length}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={previousSlide}
              className="flex h-12 w-12 items-center justify-center border border-white/30 text-white transition hover:bg-white hover:text-[#302923]"
              aria-label="Previous slide"
            >
              <ChevronLeft size={19} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              className="flex h-12 w-12 items-center justify-center border border-white/30 text-white transition hover:bg-white hover:text-[#302923]"
              aria-label="Next slide"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-20 h-[2px] w-full bg-white/20">
          <motion.div
            key={currentSlide}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 5.5,
              ease: "linear",
            }}
            className="h-full bg-[#d6b58e]"
          />
        </div>
      </section>

      {/* BRAND INTRO */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-16">
        <div className="mx-auto grid max-w-[1250px] gap-12 md:grid-cols-[0.7fr_1.3fr] md:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#98785a]">
              THE LOOMÉ PHILOSOPHY
            </p>

            <div className="mt-5 h-px w-16 bg-[#98785a]" />
          </div>

          <div>
            <h2 className="font-serif text-[42px] leading-[1.05] tracking-[-0.025em] md:text-[62px]">
              Beautiful materials,
              <br />

              <span className="italic text-[#98785a]">
                thoughtfully woven.
              </span>
            </h2>

            <p className="mt-7 max-w-[650px] text-sm leading-7 text-[#71685f]">
              At Loomé, we believe exceptional textiles begin with exceptional
              materials. Every collection is selected for its texture, quality
              and ability to become something timeless.
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORY EDITORIAL */}
      <section className="px-5 pb-24 md:px-10 md:pb-32 lg:px-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#98785a]">
                SHOP BY MATERIAL
              </p>

              <h2 className="mt-3 font-serif text-4xl md:text-5xl">
                The Fabric Edit
              </h2>
            </div>

            <a
              href="/shop"
              className="group flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em]"
            >
              View all fabrics

              <ArrowRight
                size={14}
                className="transition group-hover:translate-x-1"
              />
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <motion.a
                href="/shop"
                key={category.name}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                }}
                className={`group relative overflow-hidden ${
                  index === 0
                    ? "md:col-span-2 lg:col-span-2 lg:row-span-2"
                    : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    index === 0
                      ? "h-[520px] lg:h-[620px]"
                      : "h-[300px] lg:h-[298px]"
                  }`}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition duration-[1000ms] group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/70">
                      {category.subtitle}
                    </p>

                    <h3 className="mt-2 font-serif text-3xl md:text-4xl">
                      {category.name}
                    </h3>

                    <div className="mt-4 flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.2em] opacity-0 transition duration-500 group-hover:opacity-100">
                      Explore
                      <ArrowRight size={13} />
                    </div>
                  </div>

                  <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition group-hover:bg-white group-hover:text-[#302923]">
                    <MoveUpRight size={15} />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="overflow-hidden border-y border-[#ded5c9] bg-[#302923] py-5 text-[#e3c6a5]">
        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max items-center gap-10 whitespace-nowrap"
        >
          {Array.from({ length: 2 }).map((_, group) => (
            <div
              key={group}
              className="flex items-center gap-10"
            >
              <span className="font-serif text-xl italic">
                Naturally Woven
              </span>

              <span>✦</span>

              <span className="font-serif text-xl italic">
                Timeless Texture
              </span>

              <span>✦</span>

              <span className="font-serif text-xl italic">
                Exceptional Materials
              </span>

              <span>✦</span>

              <span className="font-serif text-xl italic">
                Made to Last
              </span>

              <span>✦</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="px-5 py-24 md:px-10 md:py-32 lg:px-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#98785a]">
                CURATED FOR YOU
              </p>

              <h2 className="mt-3 font-serif text-4xl md:text-5xl">
                Featured Textiles
              </h2>
            </div>

            <a
              href="/shop"
              className="group flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em]"
            >
              Shop all

              <ArrowRight
                size={14}
                className="transition group-hover:translate-x-1"
              />
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => {
              const isLiked = likedProducts.includes(index);

              return (
                <motion.article
                  key={product.name}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.6,
                  }}
                  className="group"
                >
                  <div className="relative aspect-[0.78] overflow-hidden bg-[#e9e1d7]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03] group-hover:opacity-0"
                    />

                    <img
                      src={product.hoverImage}
                      alt={`${product.name} detail`}
                      className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
                    />

                    <div className="absolute left-4 top-4 bg-[#f7f3ec] px-3 py-2 text-[8px] font-semibold tracking-[0.18em]">
                      {product.badge}
                    </div>

                    {/* WISHLIST HEART */}
                    <button
                      type="button"
                      onClick={() => toggleLike(index)}
                      className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 backdrop-blur-sm transition hover:scale-105 ${
                        isLiked
                          ? "text-[#98785a]"
                          : "text-[#302923]"
                      }`}
                      aria-label={
                        isLiked
                          ? `Remove ${product.name} from wishlist`
                          : `Add ${product.name} to wishlist`
                      }
                      title={
                        isLiked
                          ? "Remove from Wishlist"
                          : "Add to Wishlist"
                      }
                    >
                      <Heart
                        size={16}
                        fill={
                          isLiked
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                    {/* QUICK VIEW + ADD TO CART */}
                    <div className="absolute bottom-4 left-4 right-4 flex translate-y-3 gap-2 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <a
                        href="/product"
                        className="flex flex-1 items-center justify-center gap-2 bg-[#302923] px-3 py-4 text-[9px] font-semibold uppercase tracking-[0.15em] text-white"
                      >
                        Quick View
                        <ArrowRight size={13} />
                      </a>

                      <button
                        type="button"
                        onClick={addToCart}
                        className="flex h-[48px] w-[48px] items-center justify-center bg-[#d6b58e] text-[#302923] transition hover:bg-[#e2c29b]"
                        aria-label={`Add ${product.name} to cart`}
                        title="Add to Cart"
                      >
                        <ShoppingBag size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-4 pt-5">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-[#9a9085]">
                        {product.category}
                      </p>

                      <h3 className="mt-1 font-serif text-xl">
                        {product.name}
                      </h3>
                    </div>

                    <p className="pt-1 text-sm text-[#6e6256]">
                      {product.price}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* EDITORIAL STORY */}
      <section className="bg-[#ebe3d8] px-5 py-20 md:px-10 md:py-28 lg:px-16">
        <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{
              opacity: 0,
              x: -35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative"
          >
            <div className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=90"
                alt="Loomé textile craftsmanship"
                className="h-[560px] w-full object-cover transition duration-700 hover:scale-[1.02] md:h-[680px]"
              />
            </div>

            <div className="absolute -bottom-5 -right-2 bg-[#302923] px-6 py-5 text-white md:-right-6">
              <p className="font-serif text-3xl">
                01
              </p>

              <p className="mt-1 text-[8px] uppercase tracking-[0.25em] text-white/60">
                Crafted with care
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
            className="max-w-[570px] md:pl-10 lg:pl-16"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#98785a]">
              THE LOOMÉ STORY
            </p>

            <h2 className="mt-5 font-serif text-5xl leading-[1] md:text-6xl">
              Texture tells
              <br />

              <span className="italic text-[#98785a]">
                a story.
              </span>
            </h2>

            <p className="mt-8 text-sm leading-7 text-[#70675e]">
              From the first touch to the final stitch, we celebrate the
              character of natural materials. Our collections are carefully
              selected to bring warmth, depth and personality into every
              project.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#70675e]">
              We work with timeless materials, considered colours and
              beautiful textures to create fabrics that feel as good as they
              look.
            </p>

            <a
              href="/about"
              className="group mt-9 inline-flex items-center gap-3 border-b border-[#302923] pb-2 text-[10px] font-semibold uppercase tracking-[0.2em]"
            >
              Discover our story

              <ArrowRight
                size={14}
                className="transition group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </div>
      </section>

      {/* QUALITY / STATS */}
      <section className="px-6 py-24 md:px-12 md:py-28 lg:px-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14 text-center">
            <Sparkles
              size={20}
              className="mx-auto text-[#98785a]"
              strokeWidth={1.5}
            />

            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#98785a]">
              WHY LOOMÉ
            </p>

            <h2 className="mt-3 font-serif text-4xl md:text-5xl">
              The details matter.
            </h2>
          </div>

          <div className="grid border-y border-[#ded5c9] md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Curated Materials",
                text: "Every textile is selected for quality, texture and character.",
              },
              {
                number: "02",
                title: "Timeless Design",
                text: "Neutral palettes and refined textures designed beyond trends.",
              },
              {
                number: "03",
                title: "Personal Service",
                text: "Thoughtful guidance from selection to your final project.",
              },
            ].map((item, index) => (
              <div
                key={item.number}
                className={`border-[#ded5c9] px-7 py-10 text-center md:py-14 ${
                  index !== 2
                    ? "border-b md:border-b-0 md:border-r"
                    : ""
                }`}
              >
                <span className="font-serif text-3xl italic text-[#98785a]">
                  {item.number}
                </span>

                <h3 className="mt-4 font-serif text-2xl">
                  {item.title}
                </h3>

                <p className="mx-auto mt-3 max-w-[260px] text-sm leading-6 text-[#81776d]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="relative overflow-hidden bg-[#302923] px-6 py-24 text-white md:py-32">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d6b58e]/20" />

        <div className="relative mx-auto max-w-[950px] text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#d6b58e]">
            OUR BELIEF
          </p>

          <blockquote className="mt-7 font-serif text-[38px] leading-[1.1] md:text-[60px]">
            “Good design begins with
            <span className="italic text-[#d6b58e]">
              {" "}beautiful materials.
            </span>
            ”
          </blockquote>

          <div className="mx-auto mt-9 h-px w-12 bg-[#d6b58e]" />
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-10 border border-[#d9cfc3] p-8 md:grid-cols-[1fr_1.2fr] md:p-14 lg:p-16">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#98785a]">
              STAY INSPIRED
            </p>

            <h2 className="mt-4 font-serif text-4xl md:text-5xl">
              Join the Loomé
              <br />
              journal.
            </h2>
          </div>

          <div className="flex flex-col justify-center">
            <p className="max-w-[500px] text-sm leading-7 text-[#746a60]">
              Receive new collection previews, fabric stories and occasional
              inspiration directly in your inbox.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-7 flex border-b border-[#8d8175]"
            >
              <Mail
                size={17}
                className="mb-3 mr-3 text-[#98785a]"
              />

              <input
                type="email"
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-transparent pb-3 text-sm outline-none placeholder:text-[#9a9085]"
              />

              <button
                type="submit"
                className="mb-3 ml-3 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em]"
              >
                Subscribe
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#302923] px-6 py-16 text-white md:px-12 lg:px-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

            <div>
              <div className="font-serif text-3xl tracking-[0.18em]">
                LOOMÉ
              </div>

              <p className="mt-1 text-[8px] tracking-[0.34em] text-white/50">
                TEXTILE ATELIER
              </p>

              <p className="mt-7 max-w-[290px] text-sm leading-7 text-white/55">
                Premium textiles for beautiful spaces, thoughtful wardrobes
                and timeless living.
              </p>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#d6b58e]">
                EXPLORE
              </p>

              <div className="mt-5 space-y-3">
                <a
                  href="/"
                  className="block text-sm text-white/60 transition hover:text-white"
                >
                  Home
                </a>

                <a
                  href="/shop"
                  className="block text-sm text-white/60 transition hover:text-white"
                >
                  Products
                </a>

                <a
                  href="/shop"
                  className="block text-sm text-white/60 transition hover:text-white"
                >
                  Shop
                </a>

                <a
                  href="/about"
                  className="block text-sm text-white/60 transition hover:text-white"
                >
                  About
                </a>

                <a
                  href="/contact"
                  className="block text-sm text-white/60 transition hover:text-white"
                >
                  Contact
                </a>
              </div>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#d6b58e]">
                MATERIALS
              </p>

              <div className="mt-5 space-y-3">
                {categories.map((category) => (
                  <a
                    key={category.name}
                    href="/shop"
                    className="block text-sm text-white/60 transition hover:text-white"
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#d6b58e]">
                CONNECT
              </p>

              <p className="mt-5 text-sm leading-7 text-white/60">
                hello@loome-textile.com
                <br />
                +94 77 000 0000
              </p>

              <div className="mt-6 flex gap-4 text-[10px] uppercase tracking-[0.2em] text-white/60">
                <a
                  href="#"
                  className="transition hover:text-white"
                >
                  Instagram
                </a>

                <a
                  href="#"
                  className="transition hover:text-white"
                >
                  Pinterest
                </a>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-7 text-[9px] uppercase tracking-[0.16em] text-white/35 md:flex-row">
            <p>
              © 2026 Loomé Textile Atelier. All rights reserved.
            </p>

            <p>
              Designed with intention.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}