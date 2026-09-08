"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  X,
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileCategories, setMobileCategories] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenu(false);
    setMobileCategories(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#27231f]">
      {/* ================= HEADER ================= */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#27231f]/10 bg-[#f7f3ec]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          {/* HEADER ROW */}
          <div className="flex h-[78px] items-center justify-between">
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

              {/* CATEGORIES */}
              <div className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em]"
                >
                  Categories
                  <ChevronDown
                    size={12}
                    strokeWidth={1.4}
                    className="transition-transform duration-300 group-hover:rotate-180"
                  />
                </button>

                <div className="invisible absolute left-1/2 top-full mt-5 w-52 -translate-x-1/2 translate-y-2 border border-[#27231f]/10 bg-[#f7f3ec] p-4 opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {["Women", "Men", "Kids"].map((item) => (
                    <a
                      key={item}
                      href={`/shop?category=${item.toLowerCase()}`}
                      className="block border-b border-[#27231f]/10 px-3 py-3 text-[10px] uppercase tracking-[0.16em] last:border-0 hover:bg-[#e9e1d5]"
                    >
                      {item}
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
                className="text-[10px] uppercase tracking-[0.18em] underline underline-offset-8"
              >
                Contact
              </a>
            </nav>

            {/* ================= DESKTOP CTA ================= */}
            <a
              href="/shop"
              className="hidden border border-[#27231f] px-5 py-3 text-[9px] uppercase tracking-[0.18em] transition-all duration-300 hover:bg-[#27231f] hover:text-white sm:block lg:block"
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
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-[#27231f]/10 lg:hidden"
              >
                <nav className="py-5">
                  {/* HOME */}
                  <a
                    href="/"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-between border-b border-[#27231f]/10 py-4 text-[10px] uppercase tracking-[0.2em]"
                  >
                    Home
                    <ArrowRight size={14} strokeWidth={1.2} />
                  </a>

                  {/* PRODUCTS REMOVED */}

                  {/* MOBILE CATEGORIES */}
                  <div className="border-b border-[#27231f]/10">
                    <button
                      type="button"
                      onClick={() =>
                        setMobileCategories(!mobileCategories)
                      }
                      className="flex w-full items-center justify-between py-4 text-[10px] uppercase tracking-[0.2em]"
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
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden pb-3"
                        >
                          {["Women", "Men", "Kids"].map((item) => (
                            <a
                              key={item}
                              href={`/shop?category=${item.toLowerCase()}`}
                              onClick={closeMobileMenu}
                              className="flex items-center justify-between px-3 py-3 text-[9px] uppercase tracking-[0.18em] text-[#27231f]/55 transition-colors hover:text-[#27231f]"
                            >
                              {item}
                              <ArrowRight
                                size={13}
                                strokeWidth={1.2}
                              />
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* SHOP */}
                  <a
                    href="/shop"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-between border-b border-[#27231f]/10 py-4 text-[10px] uppercase tracking-[0.2em]"
                  >
                    Shop
                    <ArrowRight size={14} strokeWidth={1.2} />
                  </a>

                  {/* ABOUT */}
                  <a
                    href="/about"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-between border-b border-[#27231f]/10 py-4 text-[10px] uppercase tracking-[0.2em]"
                  >
                    About
                    <ArrowRight size={14} strokeWidth={1.2} />
                  </a>

                  {/* CONTACT */}
                  <a
                    href="/contact"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-between border-b border-[#27231f]/10 py-4 text-[10px] uppercase tracking-[0.2em]"
                  >
                    Contact
                    <ArrowRight size={14} strokeWidth={1.2} />
                  </a>

                  {/* MOBILE CTA */}
                  <a
                    href="/shop"
                    onClick={closeMobileMenu}
                    className="mt-5 flex w-full items-center justify-center gap-3 bg-[#27231f] px-6 py-4 text-[9px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#403a34]"
                  >
                    Shop Collection
                    <ArrowRight size={14} strokeWidth={1.2} />
                  </a>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[72vh] items-end overflow-hidden">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHmz-bRmnZ2jbGqGfLLsHhbPFOH95-EL4BVIn_cnuqnVzWMyddJbhW1G53&s=10"
          alt="Loomé textile interior"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-16 pt-40 sm:px-10 lg:px-16 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/70">
              Get in touch
            </p>

            <h1 className="mt-5 font-serif text-6xl leading-[0.9] sm:text-8xl lg:text-[105px]">
              Let&apos;s talk
              <br />
              <span className="italic">textiles.</span>
            </h1>

            <p className="mt-7 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
              Have a question about our fabrics, need help choosing a material,
              or simply want to say hello? We would love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= CONTACT INTRO ================= */}
      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3">
              <Sparkles size={15} strokeWidth={1.2} />

              <p className="text-[9px] uppercase tracking-[0.3em] text-[#27231f]/45">
                Contact Loomé
              </p>
            </div>

            <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl">
              We&apos;re here
              <br />
              <span className="italic">to help.</span>
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-7 text-[#27231f]/55">
              Whether you are looking for a specific textile or need advice
              choosing the right material, our team is happy to help.
            </p>

            {/* CONTACT DETAILS */}
            <div className="mt-10 space-y-6">
              {/* EMAIL */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#27231f]/15">
                  <Mail size={16} strokeWidth={1.2} />
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#27231f]/40">
                    Email
                  </p>

                  <a
                    href="mailto:hello@loome.com"
                    className="mt-1 block text-sm hover:underline"
                  >
                    hello@loome.com
                  </a>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#27231f]/15">
                  <Phone size={16} strokeWidth={1.2} />
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#27231f]/40">
                    Phone
                  </p>

                  <a
                    href="tel:+94112345678"
                    className="mt-1 block text-sm hover:underline"
                  >
                    +94 11 234 5678
                  </a>
                </div>
              </div>

              {/* LOCATION */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#27231f]/15">
                  <MapPin size={16} strokeWidth={1.2} />
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#27231f]/40">
                    Studio
                  </p>

                  <p className="mt-1 text-sm">
                    Colombo, Sri Lanka
                  </p>
                </div>
              </div>

              {/* OPENING HOURS */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#27231f]/15">
                  <Clock3 size={16} strokeWidth={1.2} />
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#27231f]/40">
                    Opening Hours
                  </p>

                  <p className="mt-1 text-sm">
                    Mon — Fri / 9:00 — 17:00
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ================= FORM ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-[#e9e1d5] p-7 sm:p-10 lg:p-12"
          >
            <div className="mb-9">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#27231f]/40">
                Send us a message
              </p>

              <h3 className="mt-3 font-serif text-3xl sm:text-4xl">
                How can we help?
              </h3>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[400px] flex-col items-center justify-center text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#27231f]/20">
                  <Check size={25} strokeWidth={1.2} />
                </div>

                <h3 className="mt-6 font-serif text-3xl">
                  Thank you.
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-[#27231f]/55">
                  Your message has been received. We&apos;ll get back to you
                  as soon as possible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* NAME */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-[9px] uppercase tracking-[0.2em] text-[#27231f]/50"
                  >
                    Your name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full border-b border-[#27231f]/20 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-[#27231f]/30 focus:border-[#27231f]"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-[9px] uppercase tracking-[0.2em] text-[#27231f]/50"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full border-b border-[#27231f]/20 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-[#27231f]/30 focus:border-[#27231f]"
                  />
                </div>

                {/* SUBJECT */}
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-[9px] uppercase tracking-[0.2em] text-[#27231f]/50"
                  >
                    Subject
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    defaultValue=""
                    required
                    className="w-full border-b border-[#27231f]/20 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#27231f]"
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>

                    <option value="product">
                      Product enquiry
                    </option>

                    <option value="order">
                      Order support
                    </option>

                    <option value="custom">
                      Custom textile request
                    </option>

                    <option value="other">
                      Something else
                    </option>
                  </select>
                </div>

                {/* MESSAGE */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-[9px] uppercase tracking-[0.2em] text-[#27231f]/50"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className="w-full resize-none border-b border-[#27231f]/20 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-[#27231f]/30 focus:border-[#27231f]"
                  />
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 bg-[#27231f] px-6 py-4 text-[9px] uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#403a34]"
                >
                  Send Message

                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <p className="text-center text-[9px] leading-5 text-[#27231f]/35">
                  We usually respond within 1–2 business days.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ================= IMAGE / STUDIO ================= */}
      <section className="px-4 pb-24 sm:px-8 lg:px-10 lg:pb-32">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
          {/* IMAGE */}
          <div className="relative min-h-[480px] overflow-hidden sm:min-h-[600px]">
            <img
              src="https://img.magnific.com/free-photo/empty-boutique-shopping-centre_482257-78792.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Loomé textile studio"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* TEXT */}
          <div className="flex items-center bg-[#e7dfd3] px-7 py-16 sm:px-12 lg:px-20">
            <div className="max-w-lg">
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#27231f]/45">
                Visit Loomé
              </p>

              <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
                Come and feel
                <br />
                <span className="italic">the difference.</span>
              </h2>

              <p className="mt-6 text-sm leading-7 text-[#27231f]/55">
                Sometimes the best way to choose a textile is to experience
                it. Visit our studio to explore textures, colours and
                materials in person.
              </p>

              <div className="mt-8 flex items-start gap-4">
                <MapPin
                  size={18}
                  strokeWidth={1.2}
                  className="mt-1 shrink-0"
                />

                <div>
                  <p className="font-serif text-xl">
                    Colombo Studio
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#27231f]/50">
                    Colombo
                    <br />
                    Sri Lanka
                  </p>
                </div>
              </div>

              <a
                href="#"
                className="mt-8 inline-flex items-center gap-3 border-b border-[#27231f] pb-2 text-[9px] uppercase tracking-[0.2em]"
              >
                Get directions
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="border-y border-[#27231f]/10 px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          {/* FAQ TITLE */}
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#27231f]/45">
              Frequently Asked
            </p>

            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
              Questions,
              <br />
              answered.
            </h2>
          </div>

          {/* FAQ ITEMS */}
          <div className="divide-y divide-[#27231f]/10">
            {[
              {
                question: "Can I request fabric samples?",
                answer:
                  "Yes. Contact our team with the fabric you are interested in and we can help you with sample availability.",
              },
              {
                question: "Do you offer custom textile solutions?",
                answer:
                  "We can discuss custom requirements depending on material, quantity and project needs.",
              },
              {
                question: "How quickly will you reply?",
                answer:
                  "Our team normally responds within 1–2 business days.",
              },
              {
                question: "Where is Loomé based?",
                answer:
                  "Loomé is based in Colombo, Sri Lanka, with a focus on carefully selected premium textiles.",
              },
            ].map((item) => (
              <details
                key={item.question}
                className="group py-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl">
                  {item.question}

                  <span className="text-2xl font-light transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#27231f]/55">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SOCIAL CTA ================= */}
      <section className="px-6 py-24 text-center sm:px-10 lg:py-32">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-[#27231f]/30 text-lg">
          ◎
        </div>

        <p className="mt-5 text-[9px] uppercase tracking-[0.3em] text-[#27231f]/45">
          Follow along
        </p>

        <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
          Discover @loome
        </h2>

        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#27231f]/50">
          Follow our latest collections, material stories and textile
          inspiration.
        </p>

        <a
          href="#"
          className="mt-7 inline-flex items-center gap-2 border-b border-[#27231f] pb-2 text-[9px] uppercase tracking-[0.2em]"
        >
          Follow Instagram
          <ArrowRight size={13} />
        </a>
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
                  className="text-sm text-white/60 hover:text-white"
                >
                  Home
                </a>

                <a
                  href="/shop"
                  className="text-sm text-white/60 hover:text-white"
                >
                  Products
                </a>

                <a
                  href="/shop"
                  className="text-sm text-white/60 hover:text-white"
                >
                  Shop
                </a>

                <a
                  href="/about"
                  className="text-sm text-white/60 hover:text-white"
                >
                  About
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
                    href={`/shop?category=${item.toLowerCase()}`}
                    className="text-sm text-white/60 hover:text-white"
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
                  className="hover:text-white"
                >
                  Contact us
                </a>

                <a
                  href="mailto:hello@loome.com"
                  className="hover:text-white"
                >
                  hello@loome.com
                </a>

                <p>Colombo, Sri Lanka</p>
              </div>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-[9px] uppercase tracking-[0.18em] text-white/30 sm:flex-row">
            <p>
              © 2026 Loomé. All rights reserved.
            </p>

            <div className="flex gap-5">
              <a
                href="#"
                className="hover:text-white"
              >
                Instagram
              </a>

              <a
                href="#"
                className="hover:text-white"
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