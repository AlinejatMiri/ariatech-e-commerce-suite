import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import type { Product, Category } from "@/data/products";
import { products as fallbackProducts, categories as fallbackCategories } from "@/data/products";

type DbProduct = Tables<"products"> & {
  categories: { name: string; slug: string } | null;
};

const mapProduct = (p: DbProduct): Product => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  price: Number(p.price),
  originalPrice: p.original_price ? Number(p.original_price) : undefined,
  image: p.images?.[0] ?? "",
  images: p.images ?? [],
  category: p.categories?.name ?? "",
  categorySlug: p.categories?.slug ?? "",
  brand: p.brand ?? "",
  rating: Number(p.rating ?? 0),
  reviewCount: p.review_count ?? 0,
  inStock: p.stock > 0,
  isNew: p.is_new ?? false,
  isBestSeller: p.featured ?? false,
  description: p.description ?? "",
  specs: (p.specifications as Record<string, string>) ?? {},
});

const mapCategory = (c: Tables<"categories">, productCount?: number): Category => ({
  id: c.id,
  name: c.name,
  slug: c.slug,
  icon: "📦",
  productCount: productCount ?? 0,
});

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, categories(name, slug)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      if (!data || data.length === 0) return fallbackProducts;
      return (data as DbProduct[]).map(mapProduct);
    },
    staleTime: 5 * 60 * 1000,
  });

export const useProductsByCategory = (categorySlug: string) =>
  useQuery({
    queryKey: ["products", "category", categorySlug],
    queryFn: async () => {
      // First get category id
      const { data: cat } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", categorySlug)
        .maybeSingle();
      if (!cat) {
        return fallbackProducts.filter(p => p.categorySlug === categorySlug);
      }
      const { data, error } = await supabase
        .from("products")
        .select("*, categories(name, slug)")
        .eq("category_id", cat.id);
      if (error) throw error;
      if (!data || data.length === 0) return fallbackProducts.filter(p => p.categorySlug === categorySlug);
      return (data as DbProduct[]).map(mapProduct);
    },
    enabled: !!categorySlug,
    staleTime: 5 * 60 * 1000,
  });

export const useProduct = (slug: string) =>
  useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, categories(name, slug)")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      if (!data) return fallbackProducts.find(p => p.slug === slug) ?? null;
      return mapProduct(data as DbProduct);
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      if (error) throw error;
      if (!data || data.length === 0) return fallbackCategories;
      // Get product counts
      const { data: counts } = await supabase
        .from("products")
        .select("category_id");
      const countMap: Record<string, number> = {};
      (counts ?? []).forEach(p => {
        if (p.category_id) countMap[p.category_id] = (countMap[p.category_id] ?? 0) + 1;
      });
      return data.map(c => mapCategory(c, countMap[c.id]));
    },
    staleTime: 5 * 60 * 1000,
  });

export const useSearchProducts = (query: string) =>
  useQuery({
    queryKey: ["products", "search", query],
    queryFn: async () => {
      if (!query.trim()) return [];
      const { data, error } = await supabase
        .from("products")
        .select("*, categories(name, slug)")
        .or(`name.ilike.%${query}%,brand.ilike.%${query}%,description.ilike.%${query}%`);
      if (error) throw error;
      if (!data || data.length === 0) {
        // Fallback to local search
        const q = query.toLowerCase();
        return fallbackProducts.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      }
      return (data as DbProduct[]).map(mapProduct);
    },
    enabled: !!query.trim(),
    staleTime: 30 * 1000,
  });
