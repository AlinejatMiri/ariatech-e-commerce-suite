import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, Star, Check, Minus, Plus, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "description" | "reviews">("specs");

  if (!product) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Link to="/products" className="text-primary hover:underline mt-4 inline-block">Browse all products</Link>
        </div>
      </Layout>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const related = products.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container py-4">
        <nav className="text-sm text-muted-foreground flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/category/${product.categorySlug}`} className="hover:text-primary transition-colors">{product.category}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </nav>
      </div>

      <div className="container pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Image gallery */}
          <div>
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square rounded-xl overflow-hidden bg-muted mb-3"
            >
              <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${i === selectedImage ? "border-primary" : "border-transparent"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div>
            <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{product.brand}</span>
            <h1 className="text-2xl md:text-3xl font-bold mt-1 mb-3">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "star-color fill-current" : "text-muted-foreground/30"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-foreground">${product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg price-old line-through">${product.originalPrice.toLocaleString()}</span>
                  <span className="badge-sale text-sm font-semibold px-2 py-0.5 rounded">-{discount}%</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 mb-6">
              {product.inStock ? (
                <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: "hsl(var(--badge-new))" }}>
                  <Check className="w-4 h-4" /> In Stock
                </span>
              ) : (
                <span className="text-sm font-medium text-destructive">Out of Stock</span>
              )}
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-border rounded-lg">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2.5 hover:bg-muted transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="p-2.5 hover:bg-muted transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => addItem(product, quantity)}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
            </div>

            {/* Tabs */}
            <div className="border-t border-border pt-6">
              <div className="flex gap-6 mb-4">
                {(["specs", "description", "reviews"] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-sm font-medium pb-2 border-b-2 transition-colors capitalize ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                  >
                    {tab === "specs" ? "Specifications" : tab}
                  </button>
                ))}
              </div>

              {activeTab === "specs" && (
                <div className="rounded-lg border border-border overflow-hidden">
                  {Object.entries(product.specs).map(([key, val], i) => (
                    <div key={key} className={`flex text-sm ${i % 2 === 0 ? "bg-muted/50" : "bg-card"}`}>
                      <span className="w-40 shrink-0 px-4 py-2.5 font-medium text-foreground">{key}</span>
                      <span className="px-4 py-2.5 text-muted-foreground">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "description" && (
                <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              )}

              {activeTab === "reviews" && (
                <p className="text-sm text-muted-foreground">No reviews yet. Be the first to review this product!</p>
              )}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
