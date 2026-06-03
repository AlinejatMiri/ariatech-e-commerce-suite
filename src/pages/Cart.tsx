import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { t } = useTranslation();
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const { toast } = useToast();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponLoading, setCouponLoading] = useState(false);

  const finalPrice = totalPrice - discount;

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    const { data, error } = await supabase
      .from("discounts")
      .select("*")
      .eq("code", couponCode.trim().toUpperCase())
      .eq("active", true)
      .maybeSingle();
    setCouponLoading(false);
    if (error || !data) {
      toast({ title: t("cart.invalidCoupon"), description: t("cart.invalidCouponDesc"), variant: "destructive" });
      return;
    }
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      toast({ title: t("cart.couponExpired"), variant: "destructive" });
      return;
    }
    if (data.max_uses && data.used_count && data.used_count >= data.max_uses) {
      toast({ title: t("cart.couponUsedUp"), variant: "destructive" });
      return;
    }
    if (data.min_order_amount && totalPrice < Number(data.min_order_amount)) {
      toast({ title: t("cart.minOrderNotMet"), description: t("cart.minOrderDesc", { amount: Number(data.min_order_amount).toLocaleString() }), variant: "destructive" });
      return;
    }
    const discountAmount = Math.round(totalPrice * Number(data.percentage) / 100 * 100) / 100;
    setDiscount(discountAmount);
    toast({ title: t("cart.couponApplied"), description: t("cart.couponAppliedDesc", { percent: data.percentage, amount: discountAmount.toLocaleString() }) });
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t("cart.empty")}</h1>
          <p className="text-muted-foreground mb-6">{t("cart.emptyDesc")}</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
            {t("cart.startShopping")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 pb-16">
        <h1 className="text-2xl font-bold mb-8">{t("cart.title")} ({totalItems} {t("common.items")})</h1>

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
              <h3 className="font-semibold mb-4">{t("cart.orderSummary")}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {t("cart.discount")}</span>
                    <span>-${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("cart.shipping")}</span>
                  <span className="text-sm" style={{ color: "hsl(var(--badge-new))" }}>{t("common.free")}</span>
                </div>
              </div>
              {/* Coupon */}
              <div className="mt-3 space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder={t("cart.couponCode")}
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    className="h-9 text-sm uppercase"
                  />
                  <Button variant="outline" size="sm" onClick={applyCoupon} disabled={couponLoading} className="shrink-0">
                    {t("common.apply")}
                  </Button>
                </div>
              </div>
              <div className="border-t border-border mt-4 pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>{t("common.total")}</span>
                  <span>${finalPrice.toLocaleString()}</span>
                </div>
              </div>
              <Link to="/checkout" className="w-full mt-6 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center">
                {t("cart.proceedToCheckout")}
              </Link>
              <Link to="/products" className="block text-center text-sm text-primary hover:underline mt-3">
                {t("cart.continueShopping")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
