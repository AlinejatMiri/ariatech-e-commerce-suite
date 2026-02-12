import { Link } from "react-router-dom";
import { ShoppingCart, Search, User, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Laptops", to: "/category/laptops" },
  { label: "Desktop PCs", to: "/category/desktops" },
  { label: "Monitors", to: "/category/monitors" },
  { label: "Components", to: "/category/components" },
  { label: "Peripherals", to: "/category/peripherals" },
  { label: "All Products", to: "/products" },
];

const Header = () => {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="header-bg">
        <div className="container flex items-center justify-between h-16 gap-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight shrink-0">
            <span className="text-primary">Aria</span>
            <span className="text-header-fg">Tech</span>
          </Link>

          {/* Search bar - desktop */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                className="w-full h-10 pl-4 pr-10 rounded-lg bg-foreground/10 text-header-fg placeholder:text-header-fg/50 border-0 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-header-fg/50" />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button onClick={() => setSearchOpen(!searchOpen)} className="md:hidden p-2 rounded-lg hover:bg-foreground/10 transition-colors">
              <Search className="w-5 h-5 text-header-fg" />
            </button>
            <Link to="/cart" className="relative p-2 rounded-lg hover:bg-foreground/10 transition-colors">
              <ShoppingCart className="w-5 h-5 text-header-fg" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/account" className="hidden sm:flex p-2 rounded-lg hover:bg-foreground/10 transition-colors">
              <User className="w-5 h-5 text-header-fg" />
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-foreground/10 transition-colors">
              {mobileOpen ? <X className="w-5 h-5 text-header-fg" /> : <Menu className="w-5 h-5 text-header-fg" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="md:hidden overflow-hidden">
              <div className="container pb-3">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full h-10 px-4 rounded-lg bg-foreground/10 text-header-fg placeholder:text-header-fg/50 border-0 outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation bar - desktop */}
      <nav className="hidden md:block bg-card border-b border-border">
        <div className="container flex items-center gap-1 h-11">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-primary rounded-md hover:bg-primary/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 bg-card border-b border-border shadow-lg"
          >
            <nav className="container py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-foreground/70 hover:text-primary rounded-lg hover:bg-primary/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/account"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-foreground/70 hover:text-primary rounded-lg hover:bg-primary/5 transition-colors sm:hidden"
              >
                Account
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
