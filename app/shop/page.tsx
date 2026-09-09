"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  material: string;
  image: string;
  badge?: string;
};

type CartItem = {
  productId: number;
  quantity: number;
};

const products: Product[] = [
  // =====================================================
  // WOMEN
  // =====================================================
  {
    id: 1,
    name: "Linen Midi Dress",
    category: "Women",
    price: 89,
    material: "100% European Linen",
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: 2,
    name: "Ivory Linen Blouse",
    category: "Women",
    price: 62,
    material: "Premium Linen",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: 3,
    name: "Silk Evening Dress",
    category: "Women",
    price: 120,
    material: "Pure Mulberry Silk",
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: 4,
    name: "Soft Cotton Dress",
    category: "Women",
    price: 74,
    material: "Organic Cotton",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90",
  },

  // =====================================================
  // MEN
  // =====================================================
  {
    id: 5,
    name: "Classic Linen Shirt",
    category: "Men",
    price: 68,
    material: "Washed European Linen",
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: 6,
    name: "Relaxed Cotton Shirt",
    category: "Men",
    price: 54,
    material: "Premium Cotton",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReMLG9hq_fva8SVN-HpzwLe2YmrQhtU6ikDWmPVSzbyA&s",
  },
  {
    id: 7,
    name: "Natural Linen Trousers",
    category: "Men",
    price: 76,
    material: "100% Natural Linen",
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: 8,
    name: "Stone Cotton Overshirt",
    category: "Men",
    price: 72,
    material: "Soft Cotton Blend",
    badge: "Limited",
    image:
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&q=90",
  },

  // =====================================================
  // KIDS
  // =====================================================
  {
    id: 9,
    name: "Little Linen Dress",
    category: "Kids",
    price: 48,
    material: "Soft Natural Linen",
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: 10,
    name: "Kids Cotton Shirt",
    category: "Kids",
    price: 39,
    material: "Organic Cotton",
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: 11,
    name: "Mini Everyday Set",
    category: "Kids",
    price: 52,
    material: "Soft Cotton",
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: 12,
    name: "Soft Summer Outfit",
    category: "Kids",
    price: 45,
    material: "Lightweight Cotton",
    image:
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=1200&q=90",
  },
];

const categories = ["All", "Women", "Men", "Kids"];

export default function ShopPage() {
  const searchParams = useSearchParams();

  // =====================================================
  // CATEGORY FROM HEADER URL
  // =====================================================

  const categoryFromUrl = searchParams.get("category");

  const initialCategory =
    categoryFromUrl && categories.includes(categoryFromUrl)
      ? categoryFromUrl
      : "All";

  const [activeCategory, setActiveCategory] =
    useState(initialCategory);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");

  // =====================================================
  // WISHLIST
  // =====================================================

  const [wishlist, setWishlist] = useState<number[]>([]);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);

  // =====================================================
  // CART
  // =====================================================

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  const [mobileFilter, setMobileFilter] = useState(false);

  // MOBILE NAVIGATION
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileCategories, setMobileCategories] = useState(false);

  // =====================================================
  // WISHLIST LOCAL STORAGE
  // =====================================================

  useEffect(() => {
    const savedWishlist = localStorage.getItem("loome-wishlist");

    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);

        if (Array.isArray(parsedWishlist)) {
          setWishlist(
            parsedWishlist.filter((id) =>
              products.some((product) => product.id === id)
            )
          );
        }
      } catch {
        localStorage.removeItem("loome-wishlist");
      }
    }

    setWishlistLoaded(true);
  }, []);

  useEffect(() => {
    if (!wishlistLoaded) return;

    localStorage.setItem(
      "loome-wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist, wishlistLoaded]);

  // =====================================================
  // CART LOCAL STORAGE
  // =====================================================

  useEffect(() => {
    const savedCart = localStorage.getItem("loome-cart");

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          const validCart = parsedCart.filter(
            (item) =>
              item &&
              typeof item.productId === "number" &&
              typeof item.quantity === "number" &&
              item.quantity > 0 &&
              products.some(
                (product) => product.id === item.productId
              )
          );

          setCart(validCart);
        }
      } catch {
        localStorage.removeItem("loome-cart");
      }
    }

    setCartLoaded(true);
  }, []);

  useEffect(() => {
    if (!cartLoaded) return;

    localStorage.setItem(
      "loome-cart",
      JSON.stringify(cart)
    );
  }, [cart, cartLoaded]);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const addToBag = (productId: number) => {
    setCart((current) => {
      const existingItem = current.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        return current.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...current,
        {
          productId,
          quantity: 1,
        },
      ];
    });
  };

  // =====================================================
  // FILTER + SEARCH + SORT
  // =====================================================

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "All") {
      result = result.filter(
        (product) => product.category === activeCategory
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.material.toLowerCase().includes(query)
      );
    }

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [activeCategory, search, sort]);

  // =====================================================
  // WISHLIST PRODUCTS
  // =====================================================

  const wishlistProducts = useMemo(() => {
    return products.filter((product) =>
      wishlist.includes(product.id)
    );
  }, [wishlist]);

  // =====================================================
  // WISHLIST ADD / REMOVE
  // =====================================================

  const toggleWishlist = (id: number) => {
    setWishlist((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      return [...current, id];
    });
  };

  // =====================================================
  // REMOVE FROM WISHLIST
  // =====================================================

  const removeFromWishlist = (id: number) => {
    setWishlist((current) =>
      current.filter((item) => item !== id)
    );
  };

  // =====================================================
  // CLEAR WISHLIST
  // =====================================================

  const clearWishlist = () => {
    setWishlist([]);
  };

  // =====================================================
  // CATEGORY CHANGE
  // =====================================================

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);

    setTimeout(() => {
      document.getElementById("products")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  // =====================================================
  // MOBILE NAV CLOSE
  // =====================================================

  const closeMobileMenu = () => {
    setMobileMenu(false);
    setMobileCategories(false);
  };

  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#27231f]">

      {/* =====================================================
          HEADER
      ===================================================== */}

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
              className="text-[10px] uppercase tracking-[0.18em] transition-opacity hover:opacity-50"
            >
              Home
            </a>

            {/* PRODUCTS REMOVED ONLY */}

            {/* DESKTOP CATEGORIES DROPDOWN */}

            <div className="group relative">

              <button
                type="button"
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em]"
              >
                Categories

                <ChevronDown
                  size={12}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:rotate-180"
                />
              </button>

              <div className="invisible absolute left-1/2 top-full mt-5 w-64 -translate-x-1/2 translate-y-2 border border-[#27231f]/10 bg-[#f7f3ec] p-4 opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">

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

              </div>

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

          {/* RIGHT SIDE */}

          <div className="flex items-center gap-3">

            {/* DESKTOP BAG */}

            <a
              href="/cart"
              className="hidden items-center gap-2 border border-[#27231f] px-5 py-3 text-[9px] uppercase tracking-[0.18em] transition-all duration-300 hover:bg-[#27231f] hover:text-white sm:flex"
            >
              <ShoppingBag
                size={14}
                strokeWidth={1.4}
              />

              Bag

              {cartCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f7f3ec] px-1.5 text-[8px] text-[#27231f]">
                  {cartCount}
                </span>
              )}
            </a>

            {/* MOBILE BAG ICON */}
            <a
              href="/cart"
              aria-label={`View bag${cartCount > 0 ? `, ${cartCount} item${cartCount === 1 ? "" : "s"}` : ""}`}
              className="relative flex h-10 w-10 items-center justify-center border border-[#27231f]/15 transition-all duration-300 hover:bg-[#e9e1d5] lg:hidden"
            >
              <ShoppingBag size={18} strokeWidth={1.4} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#27231f] px-1 text-[8px] text-white">
                  {cartCount}
                </span>
              )}
            </a>

            {/* MOBILE MENU BUTTON */}

            <button
              type="button"
              onClick={() => {
                setMobileMenu(!mobileMenu);

                if (mobileMenu) {
                  setMobileCategories(false);
                }
              }}
              aria-label={mobileMenu ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenu}
              className="flex h-10 w-10 items-center justify-center border border-[#27231f]/15 transition-all duration-300 hover:bg-[#e9e1d5] lg:hidden"
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
                    transition={{
                      duration: 0.2,
                    }}
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
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <Menu size={19} strokeWidth={1.5} />
                  </motion.div>
                )}

              </AnimatePresence>

            </button>

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

                {/* HOME */}

                <motion.a
                  href="/"
                  onClick={closeMobileMenu}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.03,
                  }}
                  className="flex items-center justify-between border-b border-[#27231f]/10 py-4 text-[11px] uppercase tracking-[0.18em]"
                >
                  <span>Home</span>

                  <ArrowRight
                    size={14}
                    className="text-[#27231f]/40"
                  />
                </motion.a>

                {/* PRODUCTS REMOVED ONLY */}

                {/* MOBILE CATEGORIES */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.09,
                  }}
                  className="border-b border-[#27231f]/10"
                >

                  <button
                    type="button"
                    onClick={() =>
                      setMobileCategories(!mobileCategories)
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

                {/* SHOP */}

                <motion.a
                  href="/shop"
                  onClick={closeMobileMenu}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.12,
                  }}
                  className="flex items-center justify-between border-b border-[#27231f]/10 py-4 text-[11px] uppercase tracking-[0.18em]"
                >
                  <span>Shop</span>

                  <ArrowRight
                    size={14}
                    className="text-[#27231f]/40"
                  />
                </motion.a>

                {/* ABOUT */}

                <motion.a
                  href="/about"
                  onClick={closeMobileMenu}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.15,
                  }}
                  className="flex items-center justify-between border-b border-[#27231f]/10 py-4 text-[11px] uppercase tracking-[0.18em]"
                >
                  <span>About</span>

                  <ArrowRight
                    size={14}
                    className="text-[#27231f]/40"
                  />
                </motion.a>

                {/* CONTACT */}

                <motion.a
                  href="/contact"
                  onClick={closeMobileMenu}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.18,
                  }}
                  className="flex items-center justify-between py-4 text-[11px] uppercase tracking-[0.18em]"
                >
                  <span>Contact</span>

                  <ArrowRight
                    size={14}
                    className="text-[#27231f]/40"
                  />
                </motion.a>

                {/* MOBILE BAG */}

                <motion.a
                  href="/cart"
                  className="mt-4 flex items-center justify-center gap-2 bg-[#27231f] px-5 py-4 text-[9px] uppercase tracking-[0.2em] text-white"
                >

                  <ShoppingBag
                    size={14}
                    strokeWidth={1.4}
                  />

                  View Bag

                </motion.a>

              </nav>

            </motion.div>
          )}

        </AnimatePresence>

      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#e9e1d5]">

        <div className="mx-auto grid min-h-[620px] max-w-[1440px] items-center gap-12 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:px-16 lg:py-24">

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <div className="flex items-center gap-3">

              <Sparkles
                size={15}
                strokeWidth={1.2}
              />

              <p className="text-[9px] uppercase tracking-[0.3em] text-[#27231f]/45">
                The Loomé Collection
              </p>

            </div>

            <h1 className="mt-7 max-w-2xl font-serif text-6xl leading-[0.9] sm:text-7xl lg:text-[92px]">

              Dress in
              <br />

              <span className="italic">
                beautiful texture.
              </span>

            </h1>

            <p className="mt-8 max-w-xl text-sm leading-7 text-[#27231f]/55 sm:text-base">
              Discover carefully selected pieces for women, men and
              little ones — crafted from natural fabrics with timeless
              character.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-6">

              <a
                href="#collection"
                className="group inline-flex items-center gap-3 bg-[#27231f] px-6 py-4 text-[9px] uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#403a34]"
              >
                Explore collection

                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <p className="text-[9px] uppercase tracking-[0.2em] text-[#27231f]/35">
                12 curated pieces
              </p>

            </div>

          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 1.04,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1,
            }}
            className="relative h-[500px] overflow-hidden sm:h-[600px]"
          >

            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=90"
              alt="Loomé fashion collection"
              className="h-full w-full object-cover transition duration-[1200ms] hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/5" />

            <div className="absolute bottom-6 left-6 bg-[#f7f3ec] px-6 py-5">

              <p className="text-[9px] uppercase tracking-[0.25em] text-[#27231f]/40">
                Curated Collection
              </p>

              <p className="mt-2 font-serif text-2xl">
                2026 Edition
              </p>

            </div>

          </motion.div>

        </div>

      </section>

      {/* =====================================================
          COLLECTION
      ===================================================== */}

      <section
        id="collection"
        className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28"
      >

        <div className="mx-auto max-w-[1440px]">

          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <p className="text-[9px] uppercase tracking-[0.3em] text-[#27231f]/40">
                Shop collection
              </p>

              <h2 className="mt-4 font-serif text-4xl sm:text-5xl">

                Find your
                <br />

                <span className="italic">
                  perfect piece.
                </span>

              </h2>

            </div>

            <p className="max-w-md text-sm leading-7 text-[#27231f]/50">
              Explore refined everyday pieces for women, men and kids,
              selected for comfort, quality and timeless appeal.
            </p>

          </div>

          {/* CATEGORY COLLECTION CARDS */}

          <div className="mb-16 grid gap-5 md:grid-cols-3">

            {/* WOMEN */}

            <button
              type="button"
              onClick={() => handleCategoryChange("Women")}
              className="group relative h-[360px] overflow-hidden text-left"
            >

              <img
                src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=90"
                alt="Women collection"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-7 text-white">

                <p className="text-[8px] uppercase tracking-[0.25em] text-white/60">
                  Collection 01
                </p>

                <h3 className="mt-2 font-serif text-4xl">
                  Women
                </h3>

                <div className="mt-4 flex items-center gap-2 text-[9px] uppercase tracking-[0.18em]">

                  Shop collection

                  <ArrowRight
                    size={13}
                    className="transition-transform group-hover:translate-x-1"
                  />

                </div>

              </div>

            </button>

            {/* MEN */}

            <button
              type="button"
              onClick={() => handleCategoryChange("Men")}
              className="group relative h-[360px] overflow-hidden text-left"
            >

              <img
                src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&q=90"
                alt="Men collection"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-7 text-white">

                <p className="text-[8px] uppercase tracking-[0.25em] text-white/60">
                  Collection 02
                </p>

                <h3 className="mt-2 font-serif text-4xl">
                  Men
                </h3>

                <div className="mt-4 flex items-center gap-2 text-[9px] uppercase tracking-[0.18em]">

                  Shop collection

                  <ArrowRight
                    size={13}
                    className="transition-transform group-hover:translate-x-1"
                  />

                </div>

              </div>

            </button>

            {/* KIDS */}

            <button
              type="button"
              onClick={() => handleCategoryChange("Kids")}
              className="group relative h-[360px] overflow-hidden text-left"
            >

              <img
                src="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1200&q=90"
                alt="Kids collection"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-7 text-white">

                <p className="text-[8px] uppercase tracking-[0.25em] text-white/60">
                  Collection 03
                </p>

                <h3 className="mt-2 font-serif text-4xl">
                  Kids
                </h3>

                <div className="mt-4 flex items-center gap-2 text-[9px] uppercase tracking-[0.18em]">

                  Shop collection

                  <ArrowRight
                    size={13}
                    className="transition-transform group-hover:translate-x-1"
                  />

                </div>

              </div>

            </button>

          </div>

          {/* =====================================================
              CONTROLS
          ===================================================== */}

          <div className="border-y border-[#27231f]/10 py-5">

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              {/* CATEGORY BUTTONS */}

              <div className="hidden items-center gap-2 md:flex">

                {categories.map((category) => (

                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-3 text-[10px] uppercase tracking-[0.16em] transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-[#27231f] text-white"
                        : "border border-[#27231f]/15 hover:border-[#27231f] hover:bg-[#e9e1d5]"
                    }`}
                  >
                    {category}
                  </button>

                ))}

              </div>

              {/* MOBILE FILTER */}

              <button
                type="button"
                onClick={() => setMobileFilter(!mobileFilter)}
                className="flex items-center justify-between border border-[#27231f]/15 px-4 py-3 text-[10px] uppercase tracking-[0.16em] md:hidden"
              >

                <span className="flex items-center gap-2">

                  <SlidersHorizontal size={15} />

                  Filter Collection

                </span>

                <ChevronDown
                  size={15}
                  className={`transition-transform ${
                    mobileFilter
                      ? "rotate-180"
                      : ""
                  }`}
                />

              </button>

              {/* SEARCH + SORT */}

              <div className="flex flex-col gap-3 sm:flex-row">

                <div className="flex items-center border border-[#27231f]/15 bg-white px-4">

                  <Search
                    size={16}
                    className="text-[#27231f]/35"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-[#27231f]/30 sm:w-56"
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      aria-label="Clear search"
                      className="text-[#27231f]/50"
                    >
                      <X size={15} />
                    </button>
                  )}

                </div>

                <div className="relative flex items-center border border-[#27231f]/15 bg-white">

                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full appearance-none bg-transparent py-3 pl-4 pr-12 text-[10px] uppercase tracking-[0.12em] outline-none"
                  >

                    <option value="featured">
                      Featured
                    </option>

                    <option value="price-low">
                      Price: Low to High
                    </option>

                    <option value="price-high">
                      Price: High to Low
                    </option>

                    <option value="name">
                      Name A-Z
                    </option>

                  </select>

                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-4"
                  />

                </div>

              </div>

            </div>

            {/* MOBILE CATEGORY MENU */}

            <AnimatePresence>

              {mobileFilter && (

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
                  className="overflow-hidden md:hidden"
                >

                  <div className="flex flex-wrap gap-2 pt-5">

                    {categories.map((category) => (

                      <button
                        key={category}
                        type="button"
                        onClick={() => {
                          setActiveCategory(category);
                          setMobileFilter(false);
                        }}
                        className={`px-4 py-2 text-[10px] uppercase tracking-[0.14em] ${
                          activeCategory === category
                            ? "bg-[#27231f] text-white"
                            : "border border-[#27231f]/15"
                        }`}
                      >
                        {category}
                      </button>

                    ))}

                  </div>

                </motion.div>

              )}

            </AnimatePresence>

          </div>

          {/* =====================================================
              WISHLIST
          ===================================================== */}

          <div className="border-b border-[#27231f]/10">

            <div className="flex items-center justify-between py-6">

              <button
                type="button"
                onClick={() => setShowWishlist(!showWishlist)}
                className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em]"
              >

                <Heart
                  size={17}
                  strokeWidth={1.4}
                  className={
                    wishlist.length > 0
                      ? "fill-[#8a7355] text-[#8a7355]"
                      : ""
                  }
                />

                <span>
                  Wishlist
                </span>

                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#27231f] px-2 text-[8px] text-white">
                  {wishlist.length}
                </span>

              </button>

              {wishlist.length > 0 && (
                <button
                  type="button"
                  onClick={clearWishlist}
                  className="text-[9px] uppercase tracking-[0.18em] text-[#27231f]/50 underline underline-offset-4 transition hover:text-[#27231f]"
                >
                  Clear wishlist
                </button>
              )}

            </div>

            <AnimatePresence>

              {showWishlist && (

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
                  }}
                  className="overflow-hidden"
                >

                  {wishlistProducts.length > 0 ? (

                    <div className="grid gap-5 pb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                      {wishlistProducts.map((product) => (

                        <motion.article
                          layout
                          key={product.id}
                          initial={{
                            opacity: 0,
                            y: 15,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0.95,
                          }}
                          className="group"
                        >

                          <div className="relative aspect-[4/5] overflow-hidden bg-[#ebe5da]">

                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                removeFromWishlist(product.id)
                              }
                              aria-label={`Remove ${product.name} from wishlist`}
                              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f3ec] shadow-sm transition hover:scale-105"
                            >

                              <Heart
                                size={16}
                                strokeWidth={1.4}
                                className="fill-[#8a7355] text-[#8a7355]"
                              />

                            </button>

                          </div>

                          <div className="pt-4">

                            <p className="text-[8px] uppercase tracking-[0.22em] text-[#8a7355]">
                              {product.category}
                            </p>

                            <div className="mt-2 flex items-start justify-between gap-3">

                              <div>

                                <h3 className="font-serif text-lg">
                                  {product.name}
                                </h3>

                                <p className="mt-1 text-xs text-[#27231f]/45">
                                  {product.material}
                                </p>

                              </div>

                              <p className="whitespace-nowrap text-sm">
                                ${product.price}
                              </p>

                            </div>

                          </div>

                        </motion.article>

                      ))}

                    </div>

                  ) : (

                    <div className="pb-8 text-center">

                      <Heart
                        size={28}
                        strokeWidth={1.2}
                        className="mx-auto text-[#27231f]/25"
                      />

                      <p className="mt-4 font-serif text-2xl">
                        Your wishlist is empty
                      </p>

                      <p className="mt-2 text-sm text-[#27231f]/45">
                        Click the heart on any product to save it here.
                      </p>

                    </div>

                  )}

                </motion.div>

              )}

            </AnimatePresence>

          </div>

          {/* =====================================================
              RESULTS
          ===================================================== */}

          <div
            id="products"
            className="scroll-mt-[90px]"
          >

            <div className="flex items-center justify-between py-7">

              <p className="text-[10px] uppercase tracking-[0.18em] text-[#27231f]/40">

                Showing{" "}

                <span className="text-[#27231f]">
                  {filteredProducts.length}
                </span>{" "}

                products

              </p>

              {(activeCategory !== "All" || search) && (

                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory("All");
                    setSearch("");
                  }}
                  className="text-[9px] uppercase tracking-[0.18em] underline underline-offset-4"
                >
                  Clear filters
                </button>

              )}

            </div>

            {/* =====================================================
                PRODUCT GRID
            ===================================================== */}

            {filteredProducts.length > 0 ? (

              <motion.div
                layout
                className="grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >

                <AnimatePresence mode="popLayout">

                  {filteredProducts.map((product, index) => (

                    <motion.article
                      layout
                      key={product.id}
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.96,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.03,
                      }}
                      className="group"
                    >

                      {/* IMAGE */}

                      <div className="relative aspect-[4/5] overflow-hidden bg-[#ebe5da]">

                        <a
                          href="/product"
                          className="absolute inset-0 z-10"
                          aria-label={`View ${product.name}`}
                        />

                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/5" />

                        {/* BADGE */}

                        {product.badge && (

                          <span className="absolute left-4 top-4 z-20 bg-[#f7f3ec] px-3 py-2 text-[8px] uppercase tracking-[0.18em]">
                            {product.badge}
                          </span>

                        )}

                        {/* WISHLIST */}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          aria-label={
                            wishlist.includes(product.id)
                              ? `Remove ${product.name} from wishlist`
                              : `Add ${product.name} to wishlist`
                          }
                          className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f3ec] shadow-sm transition-all duration-300 hover:scale-105"
                        >

                          <Heart
                            size={16}
                            strokeWidth={1.4}
                            className={
                              wishlist.includes(product.id)
                                ? "fill-[#8a7355] text-[#8a7355]"
                                : ""
                            }
                          />

                        </button>

                        {/* ADD TO BAG */}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToBag(product.id);
                          }}
                          className="absolute bottom-4 left-4 right-4 z-30 flex translate-y-0 items-center justify-center gap-2 bg-[#27231f] py-3.5 text-[9px] uppercase tracking-[0.18em] text-white opacity-100 transition-all duration-300 sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 hover:bg-[#403a34]"
                        >

                          <ShoppingBag
                            size={14}
                            strokeWidth={1.4}
                          />

                          Add to Bag

                        </button>

                      </div>

                      {/* PRODUCT INFO */}

                      <div className="pt-5">

                        <div className="flex items-start justify-between gap-4">

                          <div>

                            <p className="text-[8px] uppercase tracking-[0.22em] text-[#8a7355]">
                              {product.category}
                            </p>

                            <h3 className="mt-2 font-serif text-xl">
                              {product.name}
                            </h3>

                            <p className="mt-1 text-xs text-[#27231f]/45">
                              {product.material}
                            </p>

                          </div>

                          <p className="whitespace-nowrap text-sm">

                            ${product.price}

                            <span className="ml-1 text-[10px] text-[#27231f]/35">
                              / item
                            </span>

                          </p>

                        </div>

                        <a
                          href="/product"
                          className="mt-4 inline-flex items-center gap-2 text-[8px] uppercase tracking-[0.18em] opacity-60 transition-all duration-300 hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                        >

                          View details

                          <ArrowRight
                            size={12}
                            className="transition-transform group-hover:translate-x-1"
                          />

                        </a>

                      </div>

                    </motion.article>

                  ))}

                </AnimatePresence>

              </motion.div>

            ) : (

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                className="py-28 text-center"
              >

                <Search
                  size={30}
                  strokeWidth={1.2}
                  className="mx-auto text-[#27231f]/30"
                />

                <h3 className="mt-6 font-serif text-3xl">
                  No products found
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#27231f]/50">
                  Try another search or choose a different collection.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                  className="mt-7 bg-[#27231f] px-7 py-4 text-[9px] uppercase tracking-[0.18em] text-white transition hover:bg-[#403a34]"
                >
                  View all products
                </button>

              </motion.div>

            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          QUALITY BANNER
      ===================================================== */}

      <section className="bg-[#27231f] px-6 py-20 text-white sm:px-10 lg:px-16 lg:py-24">

        <div className="mx-auto max-w-[1440px]">

          <div className="mb-14 max-w-xl">

            <p className="text-[9px] uppercase tracking-[0.3em] text-white/40">
              The Loomé standard
            </p>

            <h2 className="mt-5 font-serif text-4xl sm:text-5xl">

              Chosen for how
              <br />

              <span className="italic">
                it feels.
              </span>

            </h2>

          </div>

          <div className="grid gap-12 border-t border-white/10 pt-12 md:grid-cols-3">

            <div>

              <p className="text-[9px] uppercase tracking-[0.25em] text-[#c7aa82]">
                01
              </p>

              <h3 className="mt-4 font-serif text-2xl">
                Natural Materials
              </h3>

              <p className="mt-3 max-w-sm text-sm leading-7 text-white/50">
                We carefully select natural and premium fibres for
                comfort, durability and timeless beauty.
              </p>

            </div>

            <div>

              <p className="text-[9px] uppercase tracking-[0.25em] text-[#c7aa82]">
                02
              </p>

              <h3 className="mt-4 font-serif text-2xl">
                Thoughtful Craft
              </h3>

              <p className="mt-3 max-w-sm text-sm leading-7 text-white/50">
                Every piece is considered for texture, colour,
                comfort and everyday usability.
              </p>

            </div>

            <div>

              <p className="text-[9px] uppercase tracking-[0.25em] text-[#c7aa82]">
                03
              </p>

              <h3 className="mt-4 font-serif text-2xl">
                Made to Last
              </h3>

              <p className="mt-3 max-w-sm text-sm leading-7 text-white/50">
                Timeless materials and refined designs created to
                remain beautiful season after season.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          NEWSLETTER
      ===================================================== */}

      <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-[9px] uppercase tracking-[0.3em] text-[#8a7355]">
            The Loomé Journal
          </p>

          <h2 className="mt-5 font-serif text-4xl sm:text-5xl">

            Inspiration,
            <br />

            <span className="italic">
              woven in.
            </span>

          </h2>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#27231f]/50">
            New collections, textile stories and styling inspiration
            delivered occasionally.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-9 flex max-w-md border-b border-[#27231f]/30"
          >

            <input
              type="email"
              required
              placeholder="Your email address"
              className="w-full bg-transparent px-1 py-4 text-sm outline-none placeholder:text-[#27231f]/30"
            />

            <button
              type="submit"
              className="group flex items-center gap-2 px-2 text-[9px] uppercase tracking-[0.18em]"
            >

              Join

              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />

            </button>

          </form>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-[#27231f] px-6 pb-8 text-[#f7f3ec] sm:px-10 lg:px-16">

        <div className="mx-auto max-w-[1440px]">

          <div className="grid gap-12 border-t border-white/10 py-14 sm:grid-cols-2 lg:grid-cols-4">

            {/* BRAND */}

            <div>

              <a
                href="/"
                className="text-[22px] font-semibold tracking-[0.22em]"
              >
                LOOMÉ
              </a>

              <p className="mt-5 max-w-xs text-sm leading-7 text-white/45">
                Premium fashion and textiles selected for modern
                living, timeless style and everyday beauty.
              </p>

              <div className="mt-6 flex gap-3">

                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center border border-white/15 text-[9px] uppercase transition hover:bg-white hover:text-[#27231f]"
                >
                  IG
                </a>

                <a
                  href="#"
                  aria-label="Pinterest"
                  className="flex h-9 w-9 items-center justify-center border border-white/15 text-[9px] uppercase transition hover:bg-white hover:text-[#27231f]"
                >
                  PIN
                </a>

              </div>

            </div>

            {/* EXPLORE */}

            <div>

              <p className="text-[9px] uppercase tracking-[0.25em] text-white/35">
                Explore
              </p>

              <div className="mt-5 flex flex-col gap-3">

                <a
                  href="/"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  Home
                </a>

                <a
                  href="/shop"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  Products
                </a>

                <a
                  href="/about"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  About
                </a>

                <a
                  href="/contact"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  Contact
                </a>

              </div>

            </div>

            {/* CATEGORIES */}

            <div>

              <p className="text-[9px] uppercase tracking-[0.25em] text-white/35">
                Categories
              </p>

              <div className="mt-5 flex flex-col gap-3">

                {["Women", "Men", "Kids"].map((item) => (

                  <a
                    key={item}
                    href={`/shop?category=${item}`}
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    {item}
                  </a>

                ))}

              </div>

            </div>

            {/* CONTACT */}

            <div>

              <p className="text-[9px] uppercase tracking-[0.25em] text-white/35">
                Contact
              </p>

              <div className="mt-5 flex flex-col gap-3 text-sm text-white/60">

                <a
                  href="mailto:hello@loome.com"
                  className="transition hover:text-white"
                >
                  hello@loome.com
                </a>

                <a
                  href="tel:+94112345678"
                  className="transition hover:text-white"
                >
                  +94 11 234 5678
                </a>

                <p>
                  Colombo, Sri Lanka
                </p>

              </div>

            </div>

          </div>

          <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-[9px] uppercase tracking-[0.18em] text-white/30 sm:flex-row">

            <p>
              © 2026 Loomé. All rights reserved.
            </p>

            <p>
              Crafted with intention.
            </p>

          </div>

        </div>

      </footer>

    </main>
  );
}