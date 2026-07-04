import { motion } from "framer-motion";

export default function GlassCard({
  children,
  className = "",
  strong = false,
  hover = true,
  as: Component = motion.div,
  ...props
}) {
  return (
    <Component
      className={`${strong ? "glass-strong" : "glass"} rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] ${
        hover ? "transition-colors duration-300 hover:border-white/20" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
