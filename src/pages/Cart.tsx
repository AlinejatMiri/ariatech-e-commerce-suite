import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
            Start Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 pb-16">
        <h1 className="text-2xl font-bold mb-8">Shopping Cart ({totalItems} items)</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart items */}
          <div className="flex-1 space-y-4">
            {items.map(({ product, quantity }) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex gap-4 p-4 bg-card rounded-xl border border-border"
              >
                <Link to={`/product/${product.slug}`} className="w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.slug}`} className="font-medium text-sm hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </Link>
                  <span className="text-xs text-muted-foreground block mt-0.5">{product.brand}</span>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-border rounded-lg">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1.5 hover:bg-muted transition-colors">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-sm font-medium">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1.5 hover:bg-muted transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold">${(product.price * quantity).toLocaleString()}</span>
                      <button onClick={() => removeItem(product.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-card rounded-xl border border-border p-6 sticky top-32">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-sm" style={{ color: "hsl(var(--badge-new))" }}>Free</span>
                </div>
              </div>
              <div className="border-t border-border mt-4 pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
              </div>
              <button className="w-full mt-6 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
                Proceed to Checkout
              </button>
              <Link to="/products" className="block text-center text-sm text-primary hover:underline mt-3">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
