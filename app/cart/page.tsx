"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  material: string;
  image: string;
};

type CartItem = {
  productId: number;
  quantity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "Linen Midi Dress",
    category: "Women",
    price: 89,
    material: "100% European Linen",
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
  {
    id: 5,
    name: "Classic Linen Shirt",
    category: "Men",
    price: 68,
    material: "Washed European Linen",
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
    image:
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: 9,
    name: "Little Linen Dress",
    category: "Kids",
    price: 48,
    material: "Soft Natural Linen",
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

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // =====================================================
  // LOAD CART FROM LOCAL STORAGE
  // =====================================================

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("loome-cart");

      if (!savedCart) {
        setCart([]);
        setLoaded(true);
        return;
      }

      const parsed = JSON.parse(savedCart);

      if (!Array.isArray(parsed)) {
        setCart([]);
        setLoaded(true);
        return;
      }

      const validCart: CartItem[] = parsed
        .filter(
          (item): item is CartItem =>
            item &&
            typeof item.productId === "number" &&
            Number.isFinite(item.productId) &&
            typeof item.quantity === "number" &&
            Number.isFinite(item.quantity) &&
            item.quantity > 0 &&
            products.some(
              (product) => product.id === item.productId
            )
        )
        .map((item) => ({
          productId: item.productId,
          quantity: Math.floor(item.quantity),
        }));

      // Remove accidental duplicate product entries
      const mergedCart = validCart.reduce<CartItem[]>(
        (result, item) => {
          const existing = result.find(
            (cartItem) =>
              cartItem.productId === item.productId
          );

          if (existing) {
            existing.quantity += item.quantity;
          } else {
            result.push({
              productId: item.productId,
              quantity: item.quantity,
            });
          }

          return result;
        },
        []
      );

      setCart(mergedCart);
    } catch {
      localStorage.removeItem("loome-cart");
      setCart([]);
    }

    setLoaded(true);
  }, []);

  // =====================================================
  // SAVE CART TO LOCAL STORAGE
  // =====================================================

  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        "loome-cart",
        JSON.stringify(cart)
      );
    } catch {
      // Ignore localStorage errors
    }
  }, [cart, loaded]);

  // =====================================================
  // CART PRODUCTS
  // =====================================================

  const cartProducts = useMemo(() => {
    return cart
      .map((item) => {
        const product = products.find(
          (product) => product.id === item.productId
        );

        if (!product) return null;

        return {
          ...product,
          quantity: item.quantity,
        };
      })
      .filter(Boolean) as (Product & {
      quantity: number;
    })[];
  }, [cart]);

  // =====================================================
  // UPDATE QUANTITY
  // =====================================================

  const updateQuantity = (
    productId: number,
    amount: number
  ) => {
    setCart((current) => {
      const updatedCart = current
        .map((item) => {
          if (item.productId !== productId) {
            return item;
          }

          return {
            ...item,
            quantity: Math.max(
              0,
              item.quantity + amount
            ),
          };
        })
        .filter((item) => item.quantity > 0);

      // Save immediately
      try {
        localStorage.setItem(
          "loome-cart",
          JSON.stringify(updatedCart)
        );
      } catch {
        // Ignore localStorage errors
      }

      return updatedCart;
    });
  };

  // =====================================================
  // REMOVE PRODUCT
  // =====================================================

  const removeItem = (productId: number) => {
    setCart((current) => {
      const updatedCart = current.filter(
        (item) => item.productId !== productId
      );

      // Save immediately
      try {
        localStorage.setItem(
          "loome-cart",
          JSON.stringify(updatedCart)
        );
      } catch {
        // Ignore localStorage errors
      }

      return updatedCart;
    });
  };

  // =====================================================
  // TOTAL QUANTITY
  // =====================================================

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // =====================================================
  // PRICE CALCULATIONS
  // =====================================================

  const subtotal = cartProducts.reduce(
    (total, product) =>
      total + product.price * product.quantity,
    0
  );

  const delivery = subtotal > 0 ? 8 : 0;

  const total = subtotal + delivery;

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#27231f]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-[#27231f]/10">

        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-5 sm:px-10 lg:px-16">

          {/* LOGO */}

          <a
            href="/"
            className="text-[20px] font-semibold tracking-[0.22em] sm:text-[22px]"
          >
            LOOMÉ
          </a>

          {/* CONTINUE SHOPPING */}

          <a
            href="/shop"
            className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em]"
          >
            <ArrowLeft size={14} />

            Continue Shopping
          </a>

        </div>

      </header>

      {/* =====================================================
          CART
      ===================================================== */}

      <section className="px-6 py-16 sm:px-10 lg:px-16 lg:py-24">

        <div className="mx-auto max-w-[1200px]">

          {/* =====================================================
              TITLE
          ===================================================== */}

          <div className="mb-12">

            <p className="text-[9px] uppercase tracking-[0.3em] text-[#8a7355]">
              Your selection
            </p>

            <h1 className="mt-4 font-serif text-5xl sm:text-6xl">
              Your Bag
            </h1>

            <p className="mt-4 text-sm text-[#27231f]/50">

              {cartCount} item
              {cartCount !== 1 ? "s" : ""} in your bag

            </p>

          </div>

          {/* =====================================================
              EMPTY CART
          ===================================================== */}

          {cartProducts.length === 0 ? (

            <div className="border-y border-[#27231f]/10 py-24 text-center">

              <ShoppingBag
                size={40}
                strokeWidth={1.1}
                className="mx-auto text-[#27231f]/25"
              />

              <h2 className="mt-6 font-serif text-3xl">
                Your bag is empty
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#27231f]/50">
                Discover our curated collection and add
                your favourite pieces to your bag.
              </p>

              <a
                href="/shop"
                className="mt-8 inline-flex items-center gap-3 bg-[#27231f] px-7 py-4 text-[9px] uppercase tracking-[0.18em] text-white transition hover:bg-[#403a34]"
              >
                Explore Collection

                <ArrowRight size={14} />
              </a>

            </div>

          ) : (

            /* =====================================================
               CART CONTENT
            ===================================================== */

            <div className="grid gap-12 lg:grid-cols-[1fr_380px]">

              {/* =====================================================
                  PRODUCTS
              ===================================================== */}

              <div className="divide-y divide-[#27231f]/10 border-y border-[#27231f]/10">

                {cartProducts.map((product) => (

                  <article
                    key={product.id}
                    className="flex gap-4 py-6 sm:gap-7"
                  >

                    {/* =================================================
                        PRODUCT IMAGE
                    ================================================= */}

                    <div className="h-36 w-28 shrink-0 overflow-hidden bg-[#ebe5da] sm:h-44 sm:w-36">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />

                    </div>

                    {/* =================================================
                        PRODUCT DETAILS
                    ================================================= */}

                    <div className="flex min-w-0 flex-1 flex-col justify-between">

                      <div>

                        <p className="text-[8px] uppercase tracking-[0.22em] text-[#8a7355]">
                          {product.category}
                        </p>

                        <h2 className="mt-2 font-serif text-xl">
                          {product.name}
                        </h2>

                        <p className="mt-1 text-xs text-[#27231f]/45">
                          {product.material}
                        </p>

                        <p className="mt-2 text-sm">
                          ${product.price.toFixed(2)}
                        </p>

                      </div>

                      {/* =================================================
                          QUANTITY
                      ================================================= */}

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">

                        <div className="flex items-center border border-[#27231f]/15">

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                product.id,
                                -1
                              )
                            }
                            className="flex h-9 w-9 touch-manipulation items-center justify-center transition hover:bg-[#e9e1d5]"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>

                          <span className="flex h-9 min-w-9 items-center justify-center border-x border-[#27231f]/15 text-xs">
                            {product.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                product.id,
                                1
                              )
                            }
                            className="flex h-9 w-9 touch-manipulation items-center justify-center transition hover:bg-[#e9e1d5]"
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>

                        </div>

                        {/* =================================================
                            ITEM TOTAL
                        ================================================= */}

                        <p className="text-sm">

                          $
                          {(
                            product.price *
                            product.quantity
                          ).toFixed(2)}

                        </p>

                      </div>

                    </div>

                    {/* =================================================
                        REMOVE
                    ================================================= */}

                    <button
                      type="button"
                      onClick={() =>
                        removeItem(product.id)
                      }
                      className="self-start touch-manipulation text-[#27231f]/35 transition hover:text-[#27231f]"
                      aria-label={`Remove ${product.name}`}
                    >
                      <Trash2 size={16} />
                    </button>

                  </article>

                ))}

              </div>

              {/* =====================================================
                  ORDER SUMMARY
              ===================================================== */}

              <aside className="h-fit bg-[#e9e1d5] p-7 sm:p-9">

                <p className="text-[9px] uppercase tracking-[0.25em] text-[#27231f]/45">
                  Order Summary
                </p>

                <div className="mt-7 space-y-4 border-b border-[#27231f]/10 pb-7">

                  {/* ITEMS */}

                  <div className="flex justify-between text-sm">

                    <span className="text-[#27231f]/55">
                      Items
                    </span>

                    <span>
                      {cartCount}
                    </span>

                  </div>

                  {/* SUBTOTAL */}

                  <div className="flex justify-between text-sm">

                    <span className="text-[#27231f]/55">
                      Subtotal
                    </span>

                    <span>
                      ${subtotal.toFixed(2)}
                    </span>

                  </div>

                  {/* DELIVERY */}

                  <div className="flex justify-between text-sm">

                    <span className="text-[#27231f]/55">
                      Delivery
                    </span>

                    <span>
                      ${delivery.toFixed(2)}
                    </span>

                  </div>

                </div>

                {/* =================================================
                    TOTAL
                ================================================= */}

                <div className="flex items-center justify-between pt-6">

                  <span className="font-serif text-xl">
                    Total
                  </span>

                  <span className="text-lg">
                    ${total.toFixed(2)}
                  </span>

                </div>

                {/* =================================================
                    CHECKOUT
                ================================================= */}

                <a
                  href="/checkout"
                  className="mt-8 flex items-center justify-center gap-3 bg-[#27231f] px-6 py-4 text-[9px] uppercase tracking-[0.18em] text-white transition hover:bg-[#403a34]"
                >
                  Proceed to Checkout

                  <ArrowRight size={14} />
                </a>

              </aside>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}