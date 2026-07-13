import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-16 h-16 border-4 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin mx-auto mb-4" />
        <p className="text-text-muted font-medium">Loading...</p>
      </motion.div>
    </div>
  );
}
