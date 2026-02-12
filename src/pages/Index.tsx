import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, Headphones, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import heroImg1 from "@/assets/hero-1.jpg";
import heroImg2 from "@/assets/hero-2.jpg";

const heroSlides = [
  { image: heroImg1, title: "Next-Gen Gaming PCs", subtitle: "Built for performance. Designed for you.", cta: "Shop Gaming PCs", link: "/category/desktops" },
  { image: heroImg2, title: "Laptops That Move With You", subtitle: "Power meets portability. Explore our latest collection.", cta: "Browse Laptops", link: "/category/laptops" },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const bestSellers = products.filter(p => p.isBestSeller);
  const newArrivals = products.filter(p => p.isNew);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(s => (s + 1) % heroSlides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout>
      {/* Hero Slider */}
      <section className="relative h-[420px] md:h-[520px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <img src={heroSlides[currentSlide].image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="max-w-lg"
                >
                  <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-3 leading-tight">
                    {heroSlides[currentSlide].title}
                  </h1>
                  <p className="text-primary-foreground/80 text-lg mb-6">{heroSlides[currentSlide].subtitle}</p>
                  <Link
                    to={heroSlides[currentSlide].link}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                  >
                    {heroSlides[currentSlide].cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === currentSlide ? "bg-primary w-8" : "bg-primary-foreground/40"}`}
            />
          ))}
        </div>
        <button onClick={() => setCurrentSlide(s => (s - 1 + heroSlides.length) % heroSlides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-foreground/20 text-primary-foreground hover:bg-foreground/40 transition-colors hidden md:block">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => setCurrentSlide(s => (s + 1) % heroSlides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-foreground/20 text-primary-foreground hover:bg-foreground/40 transition-colors hidden md:block">
          <ChevronRight className="w-5 h-5" />
        </button>
      </section>

      {/* Features bar */}
      <section className="border-b border-border bg-card">
        <div className="container py-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Truck, label: "Free Shipping", desc: "On orders over $50" },
            { icon: Shield, label: "2-Year Warranty", desc: "On all products" },
            { icon: Headphones, label: "24/7 Support", desc: "Expert tech help" },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-primary/10">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="font-semibold text-sm text-foreground">{label}</span>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container py-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card hover:shadow-lg hover:-translate-y-1 transition-all border border-border/50"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-medium text-foreground text-center">{cat.name}</span>
              <span className="text-[10px] text-muted-foreground">{cat.productCount} items</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Best Sellers</h2>
          <Link to="/products" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="container pb-12">
        <div className="gradient-hero rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">Build Your Dream PC</h3>
            <p className="text-primary-foreground/80">Custom configurations. Expert assembly. Lifetime support.</p>
          </div>
          <Link to="/category/desktops" className="px-6 py-3 rounded-lg bg-primary-foreground text-primary font-semibold hover:bg-primary-foreground/90 transition-colors shrink-0">
            Configure Now
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">New Arrivals</h2>
          <Link to="/products" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
