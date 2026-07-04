import { motion } from "framer-motion";

const VARIANTS = {
  primary: "bg-[#5b8dff] text-white hover:bg-[#4b7dee] shadow-[0_0_20px_rgba(91,141,255,0.35)]",
  ghost: "bg-white/5 text-[#f5f6f8] hover:bg-white/10 border border-white/10",
  outline: "bg-transparent text-[#9096a5] hover:text-[#f5f6f8] border border-white/10 hover:border-white/25",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  icon: Icon,
  ...props
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </motion.button>
  );
}
