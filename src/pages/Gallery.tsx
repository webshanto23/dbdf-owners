"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryPage } from "@/types";

interface GalleryProps {
  gallery: GalleryPage;
}

export function Gallery({ gallery }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof gallery.images[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filtered = selectedCategory === "All" ? gallery.images : gallery.images.filter((img) => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setSelectedImage(filtered[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const next = (currentIndex + 1) % filtered.length;
    setCurrentIndex(next);
    setSelectedImage(filtered[next]);
  };

  const prevImage = () => {
    const prev = (currentIndex - 1 + filtered.length) % filtered.length;
    setCurrentIndex(prev);
    setSelectedImage(filtered[prev]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentIndex]);

  return (
    <main>
      <PageBanner title={gallery.title} subtitle={gallery.subtitle} />
      <section className="py-24 bg-bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent" />
        <div className="container-custom relative">
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {gallery.categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className="rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group border border-accent-gold/10 hover:border-accent-gold/30 transition-all duration-500"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center text-text-primary p-4">
                    <p className="font-medium text-sm">{image.caption}</p>
                    <p className="text-xs text-text-muted mt-1">{image.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Dialog open={!!selectedImage} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-5xl p-0 bg-black border-none">
          {selectedImage && (
            <div className="relative">
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 text-white hover:text-accent-gold transition-colors"
              >
                <X className="h-8 w-8" />
              </button>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-accent-gold transition-colors"
              >
                <ChevronLeft className="h-10 w-10" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-accent-gold transition-colors"
              >
                <ChevronRight className="h-10 w-10" />
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="p-4 bg-black text-white">
                <p className="font-medium">{selectedImage.caption}</p>
                <p className="text-sm text-white/70">{selectedImage.category}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}

function PageBanner({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="relative py-20 md:py-28 bg-bg-primary text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-surface to-bg-primary" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/10 via-transparent to-transparent" />
      <div className="relative z-10 container-custom text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
          {title}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto">
          {subtitle}
        </motion.p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  );
}
