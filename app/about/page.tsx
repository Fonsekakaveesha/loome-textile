"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Leaf,
  Menu,
  Sparkles,
  Waves,
  X,
} from "lucide-react";

const values = [
  {
    number: "01",
    title: "Natural Materials",
    description:
      "We choose beautiful natural fibres for their authentic texture, comfort and timeless character.",
    icon: Leaf,
  },
  {
    number: "02",
    title: "Thoughtful Quality",
    description:
      "Every fabric is selected with attention to softness, durability, finish and everyday usability.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Timeless Design",
    description:
      "We believe good design should feel beautiful today and remain relevant for years to come.",
    icon: Waves,
  },
];

const materials = [
  {
    name: "Linen",
    description:
      "Lightweight, breathable and naturally textured. Our linen collection brings effortless elegance to everyday living.",
    image:
      "https://macduggal.com/cdn/shop/files/5243-DEN-3041_1-Homepage.jpg?v=1788530737&width=600",
  },
  {
    name: "Cotton",
    description:
      "Soft, versatile and dependable. Carefully selected cottons designed for comfort and everyday use.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkD7O9bWjtMPrcxHT5_6k1C7X_Q6T9E9klzm8LMyqh8g&s",
  },
  {
    name: "Silk",
    description:
      "Smooth, luminous and refined. Our silk fabrics add a quiet sense of luxury to every detail.",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1400&q=90",
  },
];

export default function AboutPage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileCategories, setMobileCategories] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenu(false);
    setMobileCategories(false);
  };

  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#27231f]">
      {/* ================= HEADER ================= */}

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#27231f]/10 bg-[#f7f3ec]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-16">
          {/* LOGO */}

          <a
            href="/"
            onClick={closeMobileMenu}
            className="text-[22px] font-semibold tracking-[0.22em]"
          >
            LOOMÉ
          </a>

          {/* ================= DESKTOP NAV ================= */}

          <nav className="hidden items-center gap-8 lg:flex">
            <a
              href="/"
              className="text-[10px] uppercase tracking-[0.18em] transition-opacity hover:opacity-50"
            >
              Home
            </a>

            {/* PRODUCTS REMOVED */}

            {/* CATEGORIES DROPDOWN */}

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
              className="text-[10px] uppercase tracking-[0.18em] underline underline-offset-8"
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

          {/* ================= DESKTOP CTA ================= */}

          <a
            href="/shop"
            className="hidden border border-[#27231f] px-5 py-3 text-[9px] uppercase tracking-[0.18em] transition-all duration-300 hover:bg-[#27231f] hover:text-white sm:block"
          >
            Shop Collection
          </a>

          {/* ================= MOBILE MENU BUTTON ================= */}

          <button
            type="button"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label={mobileMenu ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenu}
            className="flex h-10 w-10 items-center justify-center border border-[#27231f]/15 transition-all duration-300 hover:bg-[#e9e1d5] lg:hidden"
          >
            {mobileMenu ? (
              <X size={19} strokeWidth={1.4} />
            ) : (
              <Menu size={19} strokeWidth={1.4} />
            )}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}

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
              <nav className="mx-auto max-w-[1440px] px-6 py-5 sm:px-10">
                {/* HOME */}

                <a
                  href="/"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between border-b border-[#27231f]/10 py-4 text-[11px] uppercase tracking-[0.18em]"
                >
                  Home

                  <ArrowRight size={14} strokeWidth={1.3} />
                </a>

                {/* PRODUCTS REMOVED */}

                {/* CATEGORIES */}

                <div className="border-b border-[#27231f]/10">
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
                      strokeWidth={1.3}
                      className={`transition-transform duration-300 ${
                        mobileCategories ? "rotate-180" : ""
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
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-3 gap-2 pb-4">
                          {["Women", "Men", "Kids"].map((item) => (
                            <a
                              key={item}
                              href={`/shop?category=${item}`}
                              onClick={closeMobileMenu}
                              className="border border-[#27231f]/10 bg-[#e9e1d5] px-3 py-4 text-center text-[9px] uppercase tracking-[0.15em] transition-colors hover:bg-[#27231f] hover:text-white"
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* SHOP */}

                <a
                  href="/shop"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between border-b border-[#27231f]/10 py-4 text-[11px] uppercase tracking-[0.18em]"
                >
                  Shop

                  <ArrowRight size={14} strokeWidth={1.3} />
                </a>

                {/* ABOUT */}

                <a
                  href="/about"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between border-b border-[#27231f]/10 py-4 text-[11px] uppercase tracking-[0.18em]"
                >
                  <span className="underline underline-offset-4">
                    About
                  </span>

                  <ArrowRight size={14} strokeWidth={1.3} />
                </a>

                {/* CONTACT */}

                <a
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between border-b border-[#27231f]/10 py-4 text-[11px] uppercase tracking-[0.18em]"
                >
                  Contact

                  <ArrowRight size={14} strokeWidth={1.3} />
                </a>

                {/* MOBILE CTA */}

                <a
                  href="/shop"
                  onClick={closeMobileMenu}
                  className="mt-5 flex items-center justify-center gap-3 bg-[#27231f] px-5 py-4 text-[9px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#403a34]"
                >
                  Shop Collection

                  <ArrowRight size={14} />
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ================= HERO ================= */}

      <section className="relative flex min-h-[88vh] items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=2200&q=90"
          alt="Loomé textile collection"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-16 pt-40 sm:px-10 lg:px-16 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/70">
              About Loomé
            </p>

            <h1 className="mt-5 font-serif text-6xl leading-[0.9] sm:text-8xl lg:text-[110px]">
              Made for
              <br />
              <span className="italic">living beautifully.</span>
            </h1>

            <p className="mt-7 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
              Loomé is a premium textile studio built around natural
              materials, thoughtful craftsmanship and timeless design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= INTRO ================= */}

      <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#27231f]/45">
              Our Story
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              Textiles
              <br />
              <span className="italic">with meaning.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-2xl"
          >
            <p className="text-xl leading-9 sm:text-2xl sm:leading-10">
              We started Loomé with one simple belief: the materials we live
              with should feel as beautiful as the spaces and moments they
              become part of.
            </p>

            <p className="mt-7 text-sm leading-7 text-[#27231f]/55">
              From relaxed linen to elegant silk, our collections are curated
              around the natural beauty of textiles. We look for character,
              texture and quality rather than following short-lived trends.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#27231f]/55">
              The result is a collection designed to feel considered,
              versatile and quietly luxurious — fabrics that become part of
              your everyday life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= BIG IMAGE ================= */}

      <section className="px-4 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[500px] overflow-hidden sm:h-[650px] lg:h-[760px]"
        >
          <img
            src="https://content.jdmagicbox.com/comp/jaipur/51/0141p141std81051/catalogue/anokhi-c-scheme-jaipur-fast-food-yadozie8ts.jpg"
            alt="Premium textile interior"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/15" />

          <div className="absolute bottom-7 left-7 max-w-md text-white sm:bottom-12 sm:left-12">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/70">
              The Loomé Approach
            </p>

            <p className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
              Quiet luxury,
              <br />
              naturally expressed.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ================= VALUES ================= */}

      <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="max-w-xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#27231f]/45">
              What We Believe
            </p>

            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
              Designed with intention.
            </h2>
          </div>

          <div className="mt-16 grid border-y border-[#27231f]/10 md:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={value.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  className="border-b border-[#27231f]/10 px-5 py-12 md:border-b-0 md:border-r md:px-10 md:last:border-r-0 lg:px-14"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.2em] text-[#27231f]/35">
                      {value.number}
                    </span>

                    <Icon
                      size={19}
                      strokeWidth={1.2}
                      className="text-[#27231f]/50"
                    />
                  </div>

                  <h3 className="mt-8 font-serif text-3xl">
                    {value.title}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-[#27231f]/55">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= MATERIALS ================= */}

      <section className="bg-[#e7dfd3] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#27231f]/45">
                Our Materials
              </p>

              <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
                Meet the collection.
              </h2>
            </div>

            <a
              href="/shop"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] underline underline-offset-4"
            >
              Explore fabrics
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {materials.map((material, index) => (
              <motion.a
                href={`/shop?category=${material.name.toLowerCase()}`}
                key={material.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="group"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={material.image}
                    alt={material.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl">
                      {material.name}
                    </h3>

                    <p className="mt-2 max-w-xs text-sm leading-6 text-[#27231f]/55">
                      {material.description}
                    </p>
                  </div>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#27231f]/20 transition-all group-hover:bg-[#27231f] group-hover:text-white">
                    <ArrowRight size={14} />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= QUALITY ================= */}

      <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#27231f]/45">
              Our Promise
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              Better materials.
              <br />
              <span className="italic">Better living.</span>
            </h2>

            <p className="mt-7 text-sm leading-7 text-[#27231f]/55">
              We carefully consider every material before it becomes part of
              the Loomé collection. Texture, comfort, durability and visual
              character all matter.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Carefully selected natural fibres",
                "Premium textures and finishes",
                "Timeless colour palettes",
                "Designed for everyday living",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#27231f]/20">
                    <Check size={12} strokeWidth={1.5} />
                  </span>

                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <img
              src="https://m.media-amazon.com/images/G/01/Shopbop/p/prod/products/lshac/lshac31870291d4/lshac31870291d4_1778103385284_2-0._QL90_UX564_.jpg"
              alt="Loomé fabric texture"
              className="h-full w-full object-cover"
            />

            <div className="absolute bottom-5 left-5 right-5 bg-[#f7f3ec]/90 p-5 backdrop-blur-md">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#27231f]/45">
                Loomé Standard
              </p>

              <p className="mt-2 font-serif text-xl">
                Quality you can feel.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}

      <section className="bg-[#27231f] px-6 py-24 text-center text-[#f7f3ec] sm:px-10 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl"
        >
          <Sparkles
            size={18}
            strokeWidth={1.2}
            className="mx-auto text-white/60"
          />

          <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Find something
            <br />
            <span className="italic">beautifully yours.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/50">
            Explore our curated collection of premium textiles and discover
            materials made to become part of your story.
          </p>

          <a
            href="/shop"
            className="group mt-9 inline-flex items-center gap-3 bg-[#f7f3ec] px-7 py-4 text-[9px] uppercase tracking-[0.2em] text-[#27231f] transition-all duration-300 hover:bg-[#e7dfd3]"
          >
            Explore Collection

            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </section>

      {/* ================= FOOTER ================= */}

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
                Premium textiles selected for modern living, timeless style
                and everyday beauty.
              </p>
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
                  href="/shop"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  Shop
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
                  href="/contact"
                  className="transition hover:text-white"
                >
                  Contact us
                </a>

                <a
                  href="mailto:hello@loome.com"
                  className="transition hover:text-white"
                >
                  hello@loome.com
                </a>

                <p>Colombo, Sri Lanka</p>
              </div>
            </div>
          </div>

          {/* COPYRIGHT */}

          <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-[9px] uppercase tracking-[0.18em] text-white/30 sm:flex-row">
            <p>© 2026 Loomé. All rights reserved.</p>

            <div className="flex gap-5">
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
      </footer>
    </main>
  );
}