import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Strona Główna", href: "/" },
  { name: "O Nas", href: "/o-nas" },
  { name: "Oferta", href: "/oferta" },
  { name: "Kontakt", href: "/kontakt" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-accent/20">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Zap className="h-10 w-10 text-accent transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-accent/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-heading font-bold text-primary-foreground tracking-tight">
                CZWARTA FAZA
              </span>
              <span className="text-xs text-industrial-steel tracking-widest uppercase">
                Szafy Sterownicze
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors rounded-md",
                  location.pathname === item.href
                    ? "text-accent"
                    : "text-primary-foreground/80 hover:text-accent"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button variant="hero" size="sm" className="ml-4" asChild>
              <Link to="/kontakt">Zapytaj o wycenę</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-accent/20">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium transition-colors rounded-md",
                    location.pathname === item.href
                      ? "text-accent bg-accent/10"
                      : "text-primary-foreground/80 hover:text-accent hover:bg-accent/5"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Button variant="hero" className="mt-2" asChild>
                <Link to="/kontakt" onClick={() => setMobileMenuOpen(false)}>
                  Zapytaj o wycenę
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
