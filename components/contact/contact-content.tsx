// components/contact/contact-content.tsx
"use client";

import { motion } from "framer-motion";
import { ContactForm } from "./contact-form";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

const contactDetails = [
  { label: "Email", value: "concierge@aurum.rw" },
  { label: "Telephone", value: "+250 788 000 000" },
  { label: "Boutique", value: "KG 7 Ave, Kigali, Rwanda" },
  { label: "Hours", value: "Mon – Sat, 9:00 – 18:00" },
];

export default function ContactContent() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 md:p-8"
    //   style={{ backgroundColor: "#FFF8F3" }}
    >
      <div
        className="w-full max-w-5xl rounded-xl overflow-hidden grid md:grid-cols-2"
        style={{ border: "0.5px solid #E8DDD0", backgroundColor: "#FFF8F3" }}
      >
        {/* Left — editorial */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="p-10 md:p-14 flex flex-col justify-center"
        >
          <motion.p
            variants={itemVariants}
            className="text-[11px] tracking-[0.2em] uppercase mb-5"
            style={{ color: "#B89660" }}
          >
            Private client services
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl md:text-[42px] leading-[1.1] mb-5"
            style={{ color: "#3A2F22", fontFamily: "var(--font-serif, Georgia, serif)" }}
          >
            Speak with{" "}
            <em className="italic" style={{ color: "#745A27", fontStyle: "italic" }}>
              a specialist
            </em>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-sm leading-relaxed max-w-sm mb-10"
            style={{ color: "#6B6258" }}
          >
            Whether you&apos;re sourcing a specific reference or have questions
            about an existing order, our specialists in Kigali are available
            to assist directly.
          </motion.p>

          <motion.div variants={itemVariants} className="max-w-sm">
            {contactDetails.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.09, duration: 0.5, ease: "easeOut" }}
                className="flex items-start gap-4 py-4.5 relative"
                style={{
                  borderBottom: i < contactDetails.length - 1 ? "0.5px solid #E8DDD0" : "none",
                }}
              >
                <div
                  className="w-0.5 h-7 shrink-0 mt-0.5"
                  style={{ backgroundColor: "#745A27" }}
                />
                <div>
                  <p
                    className="text-[10px] tracking-[0.12em] uppercase mb-1"
                    style={{ color: "#B5A088" }}
                  >
                    {item.label}
                  </p>
                  <p className="text-[15px]" style={{ color: "#3A2F22" }}>
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — form */}
        <div
          className="p-10 md:p-14 flex flex-col justify-center"
          style={{ backgroundColor: "white", borderLeft: "0.5px solid #E8DDD0" }}
        >
          <ContactForm />
        </div>
      </div>
    </div>
  );
}