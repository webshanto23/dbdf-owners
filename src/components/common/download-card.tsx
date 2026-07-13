import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Document } from "@/types";

interface DownloadCardProps {
  document: Document;
  className?: string;
}

export function DownloadCard({ document, className }: DownloadCardProps) {
  const iconMap: Record<string, React.ReactNode> = {
    pdf: <FileText className="h-7 w-7 text-accent-gold" />,
    doc: <FileText className="h-7 w-7 text-accent-gold" />,
    docx: <FileText className="h-7 w-7 text-accent-gold" />,
    xls: <FileText className="h-7 w-7 text-accent-gold" />,
    xlsx: <FileText className="h-7 w-7 text-accent-gold" />,
    image: <FileText className="h-7 w-7 text-accent-gold" />,
  };
  const icon = iconMap[document.fileType] || <FileText className="h-7 w-7 text-accent-gold" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="h-full border-none shadow-lg bg-bg-surface border border-accent-gold/10 hover:border-accent-gold/30 hover:translateY-[-6px] transition-all duration-500">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-bg-primary border border-accent-gold/10 flex items-center justify-center shrink-0">
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-lg font-bold text-text-primary mb-1 truncate">
                {document.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed line-clamp-2 mb-3">
                {document.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <Badge variant="outline" className="text-xs border-accent-gold/30 text-accent-gold">{document.category}</Badge>
                  <span>{document.fileSize}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="h-8 text-xs text-text-muted hover:text-text-primary"
                  >
                    <a href={document.fileUrl} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </Button>
                  <Button variant="gold" size="sm" asChild className="h-8 text-xs">
                    <a href={document.fileUrl} download>
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
