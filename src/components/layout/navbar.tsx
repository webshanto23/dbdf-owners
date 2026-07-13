import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

interface NavbarProps {
  navLinks: NavLink[];
  logo: string;
  siteName: string;
}

export function Navbar({ navLinks, logo, siteName }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => location.pathname === href;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-bg-primary/80 backdrop-blur-xl border-b border-accent-gold/10"
          : "bg-transparent"
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt={siteName} className="h-12 w-auto" />
            <span className={cn("hidden md:block font-serif text-xl font-bold", scrolled ? "text-primary" : "text-white")}>
              {siteName}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                {navLinks.map((link) => (
                  <DesktopNavItem key={link.href} link={link} isActive={isActive(link.href)} scrolled={scrolled} />
                ))}
              </NavigationMenuList>
              <NavigationMenuViewport />
            </NavigationMenu>
          </nav>

          <div className="hidden lg:block">
            <Button asChild variant="gold" size="sm">
              <Link to="/contact">Become a Member</Link>
            </Button>
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu" className={cn(scrolled ? "text-neutral-700" : "text-white")}>
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <MobileNavLink
                    key={link.href}
                    link={link}
                    isActive={isActive(link.href)}
                  />
                ))}
                <Button asChild variant="gold" className="mt-4">
                  <Link to="/contact">Become a Member</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function DesktopNavItem({ link, isActive, scrolled }: { link: NavLink; isActive: boolean; scrolled: boolean }) {
  const [open, setOpen] = useState(false);

  if (link.children && link.children.length > 0) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button
          className={cn(
            "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-md",
            scrolled
              ? isActive
                ? "text-primary bg-primary/5"
                : "text-neutral-700 hover:text-primary hover:bg-neutral-50"
              : isActive
                ? "text-white bg-white/20"
                : "text-white/90 hover:text-white hover:bg-white/10"
          )}
        >
          {link.label}
          <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
        </button>
        {open && (
          <div className="absolute top-full left-0 pt-1">
            <div className="rounded-lg border bg-white shadow-lg py-1 min-w-[200px]">
              {link.children.map((child) => (
                <Link
                  key={child.href}
                  to={child.href}
                  className={cn(
                    "block px-4 py-2 text-sm transition-colors",
                    location.pathname === child.href
                      ? "text-primary bg-primary/5"
                      : "text-neutral-700 hover:text-primary hover:bg-neutral-50"
                  )}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={link.href}
      className={cn(
        "px-4 py-2 text-sm font-medium transition-colors rounded-md",
        scrolled
          ? isActive
            ? "text-primary bg-primary/5"
            : "text-neutral-700 hover:text-primary hover:bg-neutral-50"
          : isActive
            ? "text-white bg-white/20"
            : "text-white/90 hover:text-white hover:bg-white/10"
      )}
    >
      {link.label}
    </Link>
  );
}

function MobileNavLink({ link, isActive }: { link: NavLink; isActive: boolean }) {
  const [expanded, setExpanded] = useState(false);

  if (link.children && link.children.length > 0) {
    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors",
            isActive
              ? "text-primary font-semibold"
              : "text-neutral-800"
          )}
        >
          {link.label}
          <ChevronDown
            className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
          />
        </button>
        {expanded && (
          <div className="ml-4 mt-1 flex flex-col gap-1">
            {link.children.map((child) => (
              <Link
                key={child.href}
                to={child.href}
                className={cn(
                  "px-4 py-2 text-sm rounded-md transition-colors",
                  location.pathname === child.href
                    ? "text-primary font-semibold"
                    : "text-neutral-700"
                )}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={link.href}
      className={cn(
        "block px-4 py-3 text-sm font-medium rounded-md transition-colors",
        isActive ? "text-primary font-semibold" : "text-neutral-800"
      )}
    >
      {link.label}
    </Link>
  );
}
