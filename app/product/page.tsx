"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  RotateCcw,
  Ruler,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

const product = {
  name: "Natural Linen",
  category: "Linen Collection",
  price: 48,
  rating: 4.9,
  reviews: 28,
  material: "100% European Linen",
  color: "Natural Ivory",
  width: "140 cm",
  weight: "185 GSM",
  description:
    "A beautifully textured natural linen designed for effortless elegance. Soft to the touch, breathable and naturally durable, this timeless fabric brings warmth and character to any space.",
  images: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSDFLRvpkgGT74m9o8SjftR9wppq-WfY_dqt3J3UaKvQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSycOJRlMz-AW6E-5HIp6DCkBFbEnWB93pyisbSpBIRZAtpVUIbfxK-2Rc&s=10",
    "https://images.unsplash.com/photo-1528459105426-b9548367069b?auto=format&fit=crop&w=1400&q=90",
  ],
};

const colours = [
  {
    name: "Natural Ivory",
    value: "#e8dfcf",
  },
  {
    name: "Warm Sand",
    value: "#cdbda4",
  },
  {
    name: "Stone",
    value: "#a99f91",
  },
  {
    name: "Charcoal",
    value: "#3e3a36",
  },
];

const relatedProducts = [
  {
    name: "Soft Ivory Cotton",
    category: "Cotton",
    price: 32,
    image:
      "https://5.imimg.com/data5/SELLER/Default/2022/8/ED/GG/TI/14177800/textile-shops-designers.jpg",
  },
  {
    name: "Silk Whisper",
    category: "Silk",
    price: 75,
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Warm Sand Linen",
    category: "Linen",
    price: 54,
    image:
      "https://gobik.com/cdn/shop/files/10-08-107-002-long-sleeve-cycling-suit-mach-tt-men-steel-k10-06_611bfd18-5562-4ebd-8daa-8d6bef6b5c22.jpg?v=1783325577&width=1445",
  },
  {
    name: "Natural Wool",
    category: "Wool",
    price: 68,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
  },
];

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [selectedColour, setSelectedColour] = useState("Natural Ivory");
  const [activeAccordion, setActiveAccordion] = useState<string | null>(
    "details"
  );
  const [added, setAdded] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const total = product.price * quantity;

  const handleAddToBag = () => {
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2200);
  };

  const nextImage = () => {
    setSelectedImage((current) =>
      current === product.images.length - 1 ? 0 : current + 1
    );
  };

  const previousImage = () => {
    setSelectedImage((current) =>
      current === 0 ? product.images.length - 1 : current - 1
    );
  };

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#252321]">
      {/* =========================================================
          ANNOUNCEMENT BAR
      ========================================================= */}

      <div className="bg-[#252321] px-4 py-2.5 text-center text-[10px] uppercase tracking-[0.22em] text-white/80">
        Complimentary shipping on orders over $100
      </div>

      {/* =========================================================
          NAVBAR
      ========================================================= */}

      <nav className="sticky top-0 z-50 border-b border-[#252321]/10 bg-[#f8f5ef]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Logo */}

          <a href="/" className="group">
            <div className="font-serif text-[30px] tracking-wide transition group-hover:opacity-70">
              Loomé
            </div>

            <div className="-mt-1 text-[8px] uppercase tracking-[0.38em] text-[#8a7355]">
              Textile House
            </div>
          </a>

          {/* Desktop Navigation */}

          <div className="hidden items-center gap-8 text-[13px] lg:flex">
            <a
              href="/"
              className="transition hover:text-[#8a7355]"
            >
              Home
            </a>

            <a
              href="/shop"
              className="font-medium text-[#8a7355]"
            >
              Shop
            </a>

            <a
              href="/about"
              className="transition hover:text-[#8a7355]"
            >
              About
            </a>

            <a
              href="/contact"
              className="transition hover:text-[#8a7355]"
            >
              Contact
            </a>
          </div>

          {/* Desktop Bag */}

          <div className="hidden items-center gap-3 sm:flex">
            <button
              aria-label="Wishlist"
              onClick={() => setLiked(!liked)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#252321]/10 transition hover:bg-[#252321] hover:text-white"
            >
              <Heart
                size={17}
                className={liked ? "fill-current" : ""}
              />
            </button>

            <a
              href="#"
              className="flex h-10 items-center gap-2 border border-[#252321]/20 px-4 text-xs uppercase tracking-[0.12em] transition hover:bg-[#252321] hover:text-white"
            >
              <ShoppingBag size={16} />
              Bag
            </a>
          </div>

          {/* Mobile menu button */}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#252321]/15 lg:hidden"
            aria-label="Open menu"
          >
            {mobileMenu ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>

        {/* Mobile Menu */}

        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-[#252321]/10 bg-[#f8f5ef] lg:hidden"
            >
              <div className="space-y-1 px-6 py-6">
                {[
                  ["Home", "/"],
                  ["Shop", "/shop"],
                  ["About", "/about"],
                  ["Contact", "/contact"],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    className="block border-b border-[#252321]/10 py-4 font-serif text-2xl"
                  >
                    {label}
                  </a>
                ))}

                <a
                  href="#"
                  className="mt-5 flex items-center gap-2 text-sm"
                >
                  <ShoppingBag size={16} />
                  Shopping Bag
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* =========================================================
          BREADCRUMB
      ========================================================= */}

      <section className="px-5 pt-7 sm:px-8 lg:px-12 lg:pt-10">
        <div className="mx-auto max-w-7xl">
          <a
            href="/shop"
            className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#77716a] transition hover:text-[#252321]"
          >
            <ArrowLeft
              size={13}
              className="transition group-hover:-translate-x-1"
            />
            Back to collection
          </a>
        </div>
      </section>

      {/* =========================================================
          PRODUCT HERO
      ========================================================= */}

      <section className="px-5 py-8 sm:px-8 md:py-12 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
          {/* =====================================================
              GALLERY
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative overflow-hidden bg-[#e9e2d6]">
              <div className="aspect-[4/5] sm:aspect-[5/6]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={product.images[selectedImage]}
                    alt={product.name}
                    initial={{
                      opacity: 0,
                      scale: 1.04,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.45,
                    }}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {/* Image label */}

              <div className="absolute left-5 top-5">
                <span className="inline-flex items-center gap-2 bg-white px-4 py-2.5 text-[9px] uppercase tracking-[0.2em]">
                  <Sparkles size={12} />
                  Bestseller
                </span>
              </div>

              {/* Wishlist */}

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setLiked(!liked)}
                aria-label="Add to wishlist"
                className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
              >
                <Heart
                  size={18}
                  className={
                    liked
                      ? "fill-[#8a7355] text-[#8a7355]"
                      : ""
                  }
                />
              </motion.button>

              {/* Gallery arrows */}

              <div className="absolute bottom-5 right-5 flex gap-2">
                <button
                  onClick={previousImage}
                  aria-label="Previous image"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white transition hover:bg-[#252321] hover:text-white"
                >
                  <ArrowLeft size={16} />
                </button>

                <button
                  onClick={nextImage}
                  aria-label="Next image"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white transition hover:bg-[#252321] hover:text-white"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Thumbnail gallery */}

            <div className="mt-4 grid grid-cols-3 gap-3">
              {product.images.map((image, index) => (
                <motion.button
                  key={image}
                  whileHover={{ y: -2 }}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-[4/5] overflow-hidden bg-[#e9e2d6] ${
                    selectedImage === index
                      ? "ring-2 ring-[#252321] ring-offset-2 ring-offset-[#f8f5ef]"
                      : "opacity-60 transition hover:opacity-100"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="h-full w-full object-cover"
                  />

                  {selectedImage === index && (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-[#8a7355]" />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Gallery counter */}

            <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#8a837a]">
              <span>Natural linen / detail study</span>
              <span>
                0{selectedImage + 1} / 0{product.images.length}
              </span>
            </div>
          </motion.div>

          {/* =====================================================
              PRODUCT INFORMATION
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            className="flex flex-col justify-center"
          >
            {/* Category */}

            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#8a7355]">
                {product.category}
              </p>

              <span className="text-[10px] uppercase tracking-[0.18em] text-[#aaa39b]">
                LM / 001
              </span>
            </div>

            {/* Name */}

            <h1 className="mt-4 max-w-xl font-serif text-[48px] leading-[0.95] tracking-[-0.025em] sm:text-6xl md:text-7xl">
              {product.name}
            </h1>

            {/* Rating */}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={13}
                    className="fill-[#8a7355] text-[#8a7355]"
                  />
                ))}
              </div>

              <span className="text-sm font-medium">
                {product.rating}
              </span>

              <span className="text-xs text-[#8b857d]">
                Based on {product.reviews} reviews
              </span>
            </div>

            {/* Price */}

            <div className="mt-7 flex items-baseline gap-2">
              <span className="font-serif text-3xl">
                ${product.price}
              </span>

              <span className="text-sm text-[#77716a]">
                / metre
              </span>
            </div>

            <div className="my-8 h-px bg-[#252321]/10" />

            {/* Description */}

            <p className="max-w-xl text-[14px] leading-8 text-[#6e6962]">
              {product.description}
            </p>

            {/* Colour */}

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a837a]">
                    Colour
                  </p>

                  <p className="mt-2 text-sm">
                    {selectedColour}
                  </p>
                </div>

                <span className="text-[10px] text-[#9b948c]">
                  {colours.length} colours
                </span>
              </div>

              <div className="mt-4 flex gap-3">
                {colours.map((colour) => (
                  <button
                    key={colour.name}
                    onClick={() =>
                      setSelectedColour(colour.name)
                    }
                    title={colour.name}
                    aria-label={`Select ${colour.name}`}
                    className={`relative flex h-9 w-9 items-center justify-center rounded-full border ${
                      selectedColour === colour.name
                        ? "border-[#252321]"
                        : "border-transparent"
                    }`}
                  >
                    <span
                      className="h-6 w-6 rounded-full border border-black/10"
                      style={{
                        backgroundColor: colour.value,
                      }}
                    />

                    {selectedColour === colour.name && (
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#252321] text-white">
                        <Check size={9} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Product specs */}

            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-[#252321]/10 py-6">
              <Spec
                label="Composition"
                value={product.material}
              />

              <Spec
                label="Colour"
                value={product.color}
              />

              <Spec
                label="Fabric width"
                value={product.width}
              />

              <Spec
                label="Weight"
                value={product.weight}
              />
            </div>

            {/* Quantity */}

            <div className="mt-8 flex items-end justify-between">
              <div>
                <p className="mb-3 text-[10px] uppercase tracking-[0.2em]">
                  Quantity
                </p>

                <div className="flex w-fit items-center border border-[#252321]/20 bg-transparent">
                  <button
                    onClick={() =>
                      setQuantity((current) =>
                        Math.max(1, current - 1)
                      )
                    }
                    className="flex h-12 w-12 items-center justify-center transition hover:bg-[#ebe5da]"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>

                  <span className="flex h-12 w-14 items-center justify-center border-x border-[#252321]/20 text-sm">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity((current) =>
                        Math.min(20, current + 1)
                      )
                    }
                    className="flex h-12 w-12 items-center justify-center transition hover:bg-[#ebe5da]"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <p className="pb-3 text-right text-xs text-[#77716a]">
                Max. 20 metres
              </p>
            </div>

            {/* CTA */}

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToBag}
              className={`mt-6 flex h-14 w-full items-center justify-center gap-3 text-[12px] uppercase tracking-[0.18em] transition ${
                added
                  ? "bg-[#8a7355] text-white"
                  : "bg-[#252321] text-white hover:bg-[#8a7355]"
              }`}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3"
                  >
                    <Check size={17} />
                    Added to Bag
                  </motion.span>
                ) : (
                  <motion.span
                    key="bag"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3"
                  >
                    <ShoppingBag size={17} />
                    Add to Bag
                    <span className="text-white/50">—</span>
                    ${total}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Sample */}

            <button className="mt-3 flex h-12 w-full items-center justify-center gap-2 border border-[#252321]/20 text-[10px] uppercase tracking-[0.18em] transition hover:bg-[#ebe5da]">
              Request a fabric sample
              <ArrowRight size={14} />
            </button>

            {/* Shipping cards */}

            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              <ServiceCard
                icon={<Truck size={16} />}
                title="Fast delivery"
                text="3–7 days"
              />

              <ServiceCard
                icon={<Ruler size={16} />}
                title="Cut to order"
                text="By the metre"
              />

              <ServiceCard
                icon={<RotateCcw size={16} />}
                title="Easy returns"
                text="14 days"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          TRUST STRIP
      ========================================================= */}

      <section className="border-y border-[#252321]/10 bg-[#ebe5da]">
        <div className="mx-auto grid max-w-7xl divide-y divide-[#252321]/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <TrustItem
            number="01"
            title="European Flax"
            text="Responsibly sourced premium fibres."
          />

          <TrustItem
            number="02"
            title="Small Batch"
            text="Thoughtfully produced in limited runs."
          />

          <TrustItem
            number="03"
            title="Made to Last"
            text="Natural durability for everyday living."
          />
        </div>
      </section>

      {/* =========================================================
          DETAILS
      ========================================================= */}

      <section className="px-5 py-20 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#8a7355]">
              Know your textile
            </p>

            <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
              Product Details
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#77716a]">
              Everything you need to know about the fabric,
              from composition to care.
            </p>
          </div>

          <Accordion
            title="Fabric details"
            open={activeAccordion === "details"}
            onClick={() =>
              setActiveAccordion(
                activeAccordion === "details"
                  ? null
                  : "details"
              )
            }
          >
            <div className="grid gap-8 md:grid-cols-[1fr_0.8fr]">
              <p>
                Natural Linen is woven from premium European flax
                fibres. Its naturally irregular texture gives the
                fabric a relaxed yet sophisticated character.
              </p>

              <div className="space-y-3 border-l border-[#252321]/10 pl-6">
                <InfoRow
                  label="Composition"
                  value="100% Linen"
                />
                <InfoRow
                  label="Origin"
                  value="European Flax"
                />
                <InfoRow
                  label="Finish"
                  value="Washed"
                />
              </div>
            </div>
          </Accordion>

          <Accordion
            title="Care instructions"
            open={activeAccordion === "care"}
            onClick={() =>
              setActiveAccordion(
                activeAccordion === "care" ? null : "care"
              )
            }
          >
            <div className="grid gap-4 text-sm sm:grid-cols-2">
              <CareItem text="Machine wash cold" />
              <CareItem text="Gentle cycle recommended" />
              <CareItem text="Do not bleach" />
              <CareItem text="Air dry naturally" />
              <CareItem text="Iron on low heat" />
              <CareItem text="Avoid tumble drying" />
            </div>
          </Accordion>

          <Accordion
            title="Shipping & returns"
            open={activeAccordion === "shipping"}
            onClick={() =>
              setActiveAccordion(
                activeAccordion === "shipping"
                  ? null
                  : "shipping"
              )
            }
          >
            <div className="space-y-5">
              <p>
                Every order is carefully checked and packaged
                before dispatch. Standard delivery typically
                takes 3–7 business days.
              </p>

              <p>
                Because our fabrics are cut to order, returns
                are accepted on unused and uncut fabrics within
                14 days of delivery.
              </p>
            </div>
          </Accordion>

          <Accordion
            title="Fabric samples"
            open={activeAccordion === "samples"}
            onClick={() =>
              setActiveAccordion(
                activeAccordion === "samples"
                  ? null
                  : "samples"
              )
            }
          >
            <p>
              Not sure about the colour or texture? Request a
              physical sample before placing your order. Our
              sample service helps you experience the fabric in
              your own space.
            </p>
          </Accordion>
        </div>
      </section>

      {/* =========================================================
          EDITORIAL CTA
      ========================================================= */}

      <section className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl overflow-hidden bg-[#252321] lg:grid-cols-2">
          <div className="relative min-h-[360px]">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHmz-bRmnZ2jbGqGfLLsHhbPFOH95-EL4BVIn_cnuqnVzWMyddJbhW1G53&s=10"
              alt="Loomé textile collection"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute bottom-7 left-7 text-white sm:bottom-10 sm:left-10">
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/70">
                The Loomé Journal
              </p>

              <p className="mt-3 max-w-sm font-serif text-3xl">
                Texture changes everything.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center px-7 py-12 text-white sm:px-12 lg:px-16">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9b18e]">
              Crafted with intention
            </p>

            <h2 className="mt-5 max-w-lg font-serif text-4xl leading-tight sm:text-5xl">
              Fabrics made for spaces that feel like home.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/55">
              Discover our approach to natural materials,
              thoughtful craftsmanship and timeless design.
            </p>

            <a
              href="/about"
              className="mt-8 inline-flex w-fit items-center gap-3 border-b border-white/30 pb-2 text-xs uppercase tracking-[0.18em] transition hover:border-white"
            >
              Our story
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          RELATED PRODUCTS
      ========================================================= */}

      <section className="bg-[#ebe5da] px-5 py-20 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#8a7355]">
                You may also like
              </p>

              <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
                Complete the Collection
              </h2>
            </div>

            <a
              href="/shop"
              className="hidden items-center gap-2 text-xs uppercase tracking-[0.15em] underline underline-offset-4 md:flex"
            >
              View all
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item, index) => (
              <motion.a
                href="/shop"
                key={item.name}
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
                  margin: "-80px",
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                }}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-white">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/5" />

                  <button
                    onClick={(event) =>
                      event.preventDefault()
                    }
                    aria-label={`Wishlist ${item.name}`}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white opacity-0 shadow-sm transition duration-300 group-hover:opacity-100"
                  >
                    <Heart size={15} />
                  </button>

                  <div className="absolute bottom-4 left-4 right-4 translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex items-center justify-center gap-2 bg-white py-3 text-[9px] uppercase tracking-[0.18em]">
                      Quick view
                      <ArrowUpRightIcon />
                    </div>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-3 pt-5">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.18em] text-[#8a7355]">
                      {item.category}
                    </p>

                    <h3 className="mt-2 font-serif text-xl">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-sm font-medium">
                    ${item.price}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="bg-[#252321] px-5 py-14 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <h2 className="font-serif text-4xl">
                Loomé
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
                Premium textiles for thoughtful spaces and
                timeless style. Crafted with intention,
                selected with care.
              </p>

              <div className="mt-7 flex gap-3">
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center border border-white/15 text-[10px] transition hover:bg-white hover:text-[#252321]"
                >
                  IG
                </a>

                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center border border-white/15 text-xs font-semibold transition hover:bg-white hover:text-[#252321]"
                >
                  f
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                Navigation
              </h3>

              <div className="mt-5 flex flex-col gap-3 text-sm text-white/60">
                <a href="/" className="hover:text-white">
                  Home
                </a>

                <a href="/shop" className="hover:text-white">
                  Shop
                </a>

                <a href="/about" className="hover:text-white">
                  About
                </a>

                <a
                  href="/contact"
                  className="hover:text-white"
                >
                  Contact
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                Contact
              </h3>

              <div className="mt-5 space-y-3 text-sm text-white/60">
                <p>hello@loome.com</p>
                <p>Colombo, Sri Lanka</p>
                <p>Mon — Sat / 9AM — 6PM</p>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.15em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
            <span>
              © 2026 Loomé Textile House
            </span>

            <span>
              Crafted with intention.
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ================================================================
   SPEC COMPONENT
================================================================ */

function Spec({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-[0.2em] text-[#999189]">
        {label}
      </p>

      <p className="mt-2 text-xs leading-5 sm:text-sm">
        {value}
      </p>
    </div>
  );
}

/* ================================================================
   SERVICE CARD
================================================================ */

function ServiceCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 border border-[#252321]/10 bg-[#f4f0e9] px-3 py-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
        {icon}
      </div>

      <div>
        <p className="text-[9px] uppercase tracking-[0.12em]">
          {title}
        </p>

        <p className="mt-1 text-[10px] text-[#89827a]">
          {text}
        </p>
      </div>
    </div>
  );
}

/* ================================================================
   TRUST ITEM
================================================================ */

function TrustItem({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-5 px-6 py-7 md:px-10">
      <span className="font-serif text-sm text-[#8a7355]">
        {number}
      </span>

      <div>
        <h3 className="font-serif text-xl">
          {title}
        </h3>

        <p className="mt-2 text-xs leading-5 text-[#77716a]">
          {text}
        </p>
      </div>
    </div>
  );
}

/* ================================================================
   INFO ROW
================================================================ */

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#252321]/10 pb-3 text-xs">
      <span className="text-[#999189]">{label}</span>
      <span>{value}</span>
    </div>
  );
}

/* ================================================================
   CARE ITEM
================================================================ */

function CareItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ebe5da]">
        <Check size={12} />
      </span>

      {text}
    </div>
  );
}

/* ================================================================
   ACCORDION
================================================================ */

function Accordion({
  title,
  open,
  onClick,
  children,
}: {
  title: string;
  open: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-[#252321]/15 last:border-b">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-6 text-left"
      >
        <span className="font-serif text-xl sm:text-2xl">
          {title}
        </span>

        <motion.span
          animate={{
            rotate: open ? 180 : 0,
          }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
        }}
        className="overflow-hidden"
      >
        <div className="max-w-3xl pb-7 text-sm leading-7 text-[#716b63]">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

/* ================================================================
   SMALL ARROW ICON
================================================================ */

function ArrowUpRightIcon() {
  return <ArrowRight size={13} />;
}