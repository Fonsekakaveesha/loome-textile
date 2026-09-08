"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CreditCard,
  MapPin,
  ShoppingBag,
  Truck,
} from "lucide-react";

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

// =====================================================
// SAME PRODUCTS FROM SHOP PAGE
// =====================================================

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

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);

  // =====================================================
  // LOAD CART
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

    setLoaded(true);
  }, []);

  // =====================================================
  // CART PRODUCTS
  // =====================================================

  const cartProducts = cart
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
    .filter(Boolean) as (Product & { quantity: number })[];

  // =====================================================
  // TOTALS
  // =====================================================

  const subtotal = cartProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 500 : 0;

  const total = subtotal + shipping;

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // =====================================================
  // PLACE ORDER
  // =====================================================

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cartProducts.length === 0) {
      return;
    }

    setOrderPlaced(true);

    localStorage.removeItem("loome-cart");
    setCart([]);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#f7f3ec] flex items-center justify-center">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#27231f]/50">
          Loading...
        </p>
      </main>
    );
  }

  // =====================================================
  // ORDER SUCCESS
  // =====================================================

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-[#f7f3ec] text-[#27231f]">
        <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-6">
          <div className="w-full text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#27231f] text-white">
              <Check size={30} strokeWidth={1.4} />
            </div>

            <p className="mt-8 text-[9px] uppercase tracking-[0.35em] text-[#8a7355]">
              Order confirmed
            </p>

            <h1 className="mt-4 font-serif text-5xl">
              Thank you
            </h1>

            <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#27231f]/55">
              Your Loomé order has been placed successfully.
              We’ll contact you shortly with the delivery details.
            </p>

            <Link
              href="/shop"
              className="mt-9 inline-flex items-center gap-3 bg-[#27231f] px-8 py-4 text-[9px] uppercase tracking-[0.2em] text-white transition hover:bg-[#403a34]"
            >
              <ArrowLeft size={14} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // =====================================================
  // EMPTY CART
  // =====================================================

  if (cartProducts.length === 0) {
    return (
      <main className="min-h-screen bg-[#f7f3ec] text-[#27231f]">
        <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-6">
          <div className="text-center">
            <ShoppingBag
              size={42}
              strokeWidth={1}
              className="mx-auto text-[#27231f]/35"
            />

            <p className="mt-7 text-[9px] uppercase tracking-[0.3em] text-[#8a7355]">
              Checkout
            </p>

            <h1 className="mt-4 font-serif text-4xl">
              Your bag is empty
            </h1>

            <p className="mt-4 text-sm leading-7 text-[#27231f]/50">
              Add a product to your bag before continuing.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-3 bg-[#27231f] px-8 py-4 text-[9px] uppercase tracking-[0.2em] text-white"
            >
              <ArrowLeft size={14} />
              Back to Shop
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#27231f]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-[#27231f]/10 bg-[#f7f3ec]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-5 sm:px-10 lg:px-16">

          <Link
            href="/shop"
            className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em]"
          >
            <ArrowLeft size={14} />
            Back to Shop
          </Link>

          <Link
            href="/"
            className="font-semibold tracking-[0.22em] text-[20px] sm:text-[22px]"
          >
            LOOMÉ
          </Link>

          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em]">
            <ShoppingBag size={14} />
            Checkout
          </div>

        </div>
      </header>

      {/* =====================================================
          CHECKOUT
      ===================================================== */}

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-10 lg:px-16 lg:py-24">

        <div className="mb-14">
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#8a7355]">
            Complete your order
          </p>

          <h1 className="mt-4 font-serif text-5xl sm:text-6xl">
            Checkout
          </h1>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid gap-16 lg:grid-cols-[1fr_430px]">

            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <div>

              {/* CONTACT INFORMATION */}

              <section className="mb-14">

                <SectionTitle
                  number="01"
                  title="Contact information"
                />

                <div className="grid gap-5 sm:grid-cols-2">

                  <Input
                    label="First name"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Last name"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Email address"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Phone number"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />

                </div>

              </section>

              {/* DELIVERY */}

              <section className="mb-14">

                <SectionTitle
                  number="02"
                  title="Delivery address"
                />

                <div className="space-y-5">

                  <Input
                    label="Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                  />

                  <div className="grid gap-5 sm:grid-cols-2">

                    <Input
                      label="City"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                    />

                    <Input
                      label="Postal code"
                      name="postalCode"
                      value={form.postalCode}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

              </section>

              {/* DELIVERY METHOD */}

              <section className="mb-14">

                <SectionTitle
                  number="03"
                  title="Delivery method"
                />

                <div className="border border-[#27231f]/15 bg-white p-5">

                  <div className="flex items-center justify-between gap-5">

                    <div className="flex items-center gap-4">

                      <Truck
                        size={21}
                        strokeWidth={1.3}
                        className="text-[#8a7355]"
                      />

                      <div>

                        <p className="text-[10px] uppercase tracking-[0.15em]">
                          Standard Delivery
                        </p>

                        <p className="mt-1 text-xs text-[#27231f]/45">
                          3–5 working days
                        </p>

                      </div>

                    </div>

                    <span className="text-xs">
                      LKR 500
                    </span>

                  </div>

                </div>

              </section>

              {/* PAYMENT */}

              <section>

                <SectionTitle
                  number="04"
                  title="Payment method"
                />

                <div className="space-y-3">

                  {/* CASH ON DELIVERY */}

                  <label
                    className={`flex cursor-pointer items-center justify-between border p-5 transition ${
                      paymentMethod === "cod"
                        ? "border-[#27231f] bg-white"
                        : "border-[#27231f]/15"
                    }`}
                  >

                    <div className="flex items-center gap-4">

                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) =>
                          setPaymentMethod(e.target.value)
                        }
                        className="accent-[#27231f]"
                      />

                      <div>

                        <p className="text-[10px] uppercase tracking-[0.15em]">
                          Cash on Delivery
                        </p>

                        <p className="mt-1 text-xs text-[#27231f]/45">
                          Pay when your order arrives
                        </p>

                      </div>

                    </div>

                  </label>

                  {/* CARD */}

                  <label
                    className={`flex cursor-pointer items-center justify-between border p-5 transition ${
                      paymentMethod === "card"
                        ? "border-[#27231f] bg-white"
                        : "border-[#27231f]/15"
                    }`}
                  >

                    <div className="flex items-center gap-4">

                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) =>
                          setPaymentMethod(e.target.value)
                        }
                        className="accent-[#27231f]"
                      />

                      <div>

                        <p className="text-[10px] uppercase tracking-[0.15em]">
                          Card Payment
                        </p>

                        <p className="mt-1 text-xs text-[#27231f]/45">
                          Secure online payment
                        </p>

                      </div>

                    </div>

                    <CreditCard
                      size={20}
                      strokeWidth={1.3}
                      className="text-[#8a7355]"
                    />

                  </label>

                </div>

              </section>

            </div>

            {/* =================================================
                RIGHT SIDE - ORDER SUMMARY
            ================================================= */}

            <aside>

              <div className="sticky top-[100px] border border-[#27231f]/15 bg-white p-7">

                <div className="flex items-center gap-3">

                  <ShoppingBag
                    size={18}
                    strokeWidth={1.3}
                    className="text-[#8a7355]"
                  />

                  <h2 className="font-serif text-2xl">
                    Your order
                  </h2>

                </div>

                {/* PRODUCTS */}

                <div className="mt-8 space-y-6">

                  {cartProducts.map((item) => (

                    <div
                      key={item.id}
                      className="flex gap-4"
                    >

                      <div className="relative h-24 w-[76px] shrink-0 overflow-hidden bg-[#ebe5da]">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />

                        <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#27231f] px-1.5 text-[8px] text-white">
                          {item.quantity}
                        </span>

                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="font-serif text-lg">
                          {item.name}
                        </p>

                        <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-[#8a7355]">
                          {item.category}
                        </p>

                        <p className="mt-1 text-xs text-[#27231f]/45">
                          {item.material}
                        </p>

                        <p className="mt-2 text-sm">
                          ${item.price} × {item.quantity}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

                <div className="my-7 border-t border-[#27231f]/10" />

                {/* SUBTOTAL */}

                <div className="space-y-4">

                  <div className="flex items-center justify-between text-xs">

                    <span className="text-[#27231f]/50">
                      Subtotal
                    </span>

                    <span>
                      LKR {subtotal.toLocaleString()}
                    </span>

                  </div>

                  <div className="flex items-center justify-between text-xs">

                    <span className="text-[#27231f]/50">
                      Delivery
                    </span>

                    <span>
                      LKR {shipping.toLocaleString()}
                    </span>

                  </div>

                </div>

                <div className="my-7 border-t border-[#27231f]/10" />

                {/* TOTAL */}

                <div className="flex items-end justify-between">

                  <span className="text-[9px] uppercase tracking-[0.22em] text-[#27231f]/50">
                    Total
                  </span>

                  <span className="font-serif text-3xl">
                    LKR {total.toLocaleString()}
                  </span>

                </div>

                {/* PLACE ORDER */}

                <button
                  type="submit"
                  className="mt-8 flex w-full items-center justify-center gap-3 bg-[#27231f] py-5 text-[9px] uppercase tracking-[0.22em] text-white transition hover:bg-[#403a34]"
                >
                  <MapPin size={14} strokeWidth={1.3} />
                  Place Order
                </button>

                <p className="mt-5 text-center text-[8px] leading-5 text-[#27231f]/35">
                  By placing your order, you agree to our
                  terms and conditions.
                </p>

              </div>

            </aside>

          </div>

        </form>

      </section>

    </main>
  );
}

// =====================================================
// SECTION TITLE
// =====================================================

function SectionTitle({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="mb-7 flex items-center gap-3">

      <div className="flex h-8 w-8 items-center justify-center border border-[#27231f]/15">
        <span className="text-[9px]">
          {number}
        </span>
      </div>

      <h2 className="font-serif text-2xl">
        {title}
      </h2>

    </div>
  );
}

// =====================================================
// INPUT
// =====================================================

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  required?: boolean;
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-[8px] uppercase tracking-[0.2em] text-[#27231f]/45"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-[#27231f]/15 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#27231f]/25 focus:border-[#27231f]"
      />

    </div>
  );
}