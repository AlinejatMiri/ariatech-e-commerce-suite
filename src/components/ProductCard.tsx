import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/data/products";
import { motion } from "framer-motion";

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-product rounded-xl overflow-hidden group flex flex-col"
    >
      <Link to={`/product/${product.slug}`} className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount && <span className="badge-sale text-xs font-semibold px-2 py-0.5 rounded">-{discount}%</span>}
          {product.isNew && <span className="badge-new text-xs font-semibold px-2 py-0.5 rounded">NEW</span>}
        </div>
      </Link>

      <div className="p-3 sm:p-4 flex flex-col flex-1 min-h-0">
        <span className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider truncate">{product.brand}</span>
        <Link to={`/product/${product.slug}`} className="mt-1 font-medium text-xs sm:text-sm leading-snug text-foreground hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </Link>
        <div className="flex items-center gap-0.5 sm:gap-1 mt-1.5 sm:mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${i < Math.floor(product.rating) ? "star-color fill-current" : "text-muted-foreground/30"}`} />
          ))}
          <span className="text-[10px] sm:text-xs text-muted-foreground ml-0.5 sm:ml-1">({product.reviewCount})</span>
        </div>
        <div className="mt-auto pt-2 sm:pt-3 flex items-end justify-between gap-1 sm:gap-2">
          <div className="min-w-0">
            <span className="text-sm sm:text-lg font-bold text-foreground">${product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="block text-[10px] sm:text-xs price-old line-through">${product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); addItem(product); toast({ title: "Added to cart", description: product.name }); }}
            className="p-2 sm:p-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shrink-0"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
