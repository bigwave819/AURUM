// components/contact/contact-form.tsx
"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const formContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.35 },
  },
};

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

type Status = "idle" | "loading" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [values, setValues] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("sent");
      setValues({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setErrorMessage("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  const isLoading = status === "loading";
  const isSent = status === "sent";

  return (
    <motion.div initial="hidden" animate="visible" variants={formContainerVariants}>
      <motion.h3
        variants={fieldVariants}
        className="font-serif text-2xl mb-1.5"
        style={{ color: "#3A2F22", fontFamily: "var(--font-serif, Georgia, serif)" }}
      >
        Send an inquiry
      </motion.h3>
      <motion.p variants={fieldVariants} className="text-xs mb-8" style={{ color: "#9E9185" }}>
        We typically respond within one business day.
      </motion.p>

      <form onSubmit={handleSubmit}>
        {status === "error" && errorMessage && (
          <motion.div
            variants={fieldVariants}
            className="mb-5 rounded-md px-3 py-2 text-xs"
            style={{ backgroundColor: "#FCEBEB", color: "#791F1F", border: "0.5px solid #F09595" }}
          >
            {errorMessage}
          </motion.div>
        )}

        <motion.div variants={fieldVariants} className="mb-5">
          <label
            htmlFor="name"
            className="block text-[11px] tracking-wide uppercase mb-1.5"
            style={{ color: "#9E9185" }}
          >
            Full name
          </label>
          <input
            id="name"
            type="text"
            required
            disabled={isLoading}
            placeholder="Hirwa Tresor"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            className="w-full bg-transparent outline-none text-[14.5px] py-2 disabled:opacity-60"
            style={{ borderBottom: "1px solid #E0D5C8", color: "#3A2F22" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#745A27")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#E0D5C8")}
          />
        </motion.div>

        <motion.div variants={fieldVariants} className="mb-5">
          <label
            htmlFor="email"
            className="block text-[11px] tracking-wide uppercase mb-1.5"
            style={{ color: "#9E9185" }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            disabled={isLoading}
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            className="w-full bg-transparent outline-none text-[14.5px] py-2 disabled:opacity-60"
            style={{ borderBottom: "1px solid #E0D5C8", color: "#3A2F22" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#745A27")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#E0D5C8")}
          />
        </motion.div>

        <motion.div variants={fieldVariants} className="mb-5">
          <label
            htmlFor="message"
            className="block text-[11px] tracking-wide uppercase mb-1.5"
            style={{ color: "#9E9185" }}
          >
            Message
          </label>
          <textarea
            id="message"
            required
            disabled={isLoading}
            rows={3}
            placeholder="I'd like to ask about..."
            value={values.message}
            onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
            className="w-full bg-transparent outline-none text-[14.5px] py-2 resize-none disabled:opacity-60"
            style={{ borderBottom: "1px solid #E0D5C8", color: "#3A2F22" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#745A27")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#E0D5C8")}
          />
        </motion.div>

        <motion.button
          variants={fieldVariants}
          type="submit"
          disabled={isLoading || isSent}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3.5 mt-2 text-[12.5px] tracking-wide uppercase rounded-md transition-colors disabled:cursor-not-allowed"
          style={{
            backgroundColor: isSent ? "#3B6D11" : "#745A27",
            color: "#FFF8F3",
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          {isLoading ? "Sending…" : isSent ? "Message sent" : "Send message"}
        </motion.button>

        <motion.p
          variants={fieldVariants}
          className="text-[11px] text-center mt-3.5"
          style={{ color: "#B5A088" }}
        >
          Your details are only used to respond to this inquiry.
        </motion.p>
      </form>
    </motion.div>
  );
}