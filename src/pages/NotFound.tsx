import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent" />
      <div className="text-center px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-9xl font-bold text-accent-gold mb-4">404</h1>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-4">Page Not Found</h2>
          <p className="text-text-muted text-lg max-w-md mx-auto mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Button asChild variant="gold" size="lg">
            <Link to="/">
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
