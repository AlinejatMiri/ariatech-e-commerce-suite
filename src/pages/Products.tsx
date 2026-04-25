import { useParams, Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { useProducts, useProductsByCategory, useCategories } from "@/hooks/useProductData";

type SortOption = "newest" | "price-asc" | "price-desc" | "rating";

const Products = () => {
  const { slug } = useParams();
  const [sort, setSort] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 8;

  const { data: allProducts = [] } = useProducts();

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [slug, sort, selectedBrands, inStockOnly, priceRange]);
  const { data: categoryProducts = [] } = useProductsByCategory(slug ?? "");
  const { data: categories = [] } = useCategories();
  const products = slug ? categoryProducts : allProducts;
  const category = slug ? categories.find(c => c.slug === slug) : null;
  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (selectedBrands.length > 0) result = result.filter(p => selectedBrands.includes(p.brand));
    if (inStockOnly) result = result.filter(p => p.inStock);
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return result;
  }, [products, sort, selectedBrands, inStockOnly, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const paginatedProducts = filteredProducts.slice((page - 1) * perPage, page * perPage);

  const brands = useMemo(() => {
    return [...new Set(products.map(p => p.brand))].sort();
  }, [products]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container py-4">
        <nav className="text-sm text-muted-foreground flex items-center gap-1.5">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{category?.name || "All Products"}</span>
        </nav>
      </div>

      <div className="container pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{category?.name || "All Products"}</h1>
            <p className="text-sm text-muted-foreground mt-1">{filteredProducts.length} products found</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors lg:hidden">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <div className="relative">
              <select
                value={sort}
                onChange={e => setSort(e.target.value as SortOption)}
                className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-border text-sm font-medium bg-card hover:bg-muted transition-colors cursor-pointer"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters sidebar */}
          <aside className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-60 shrink-0`}>
            <div className="bg-card rounded-xl p-5 border border-border space-y-6 sticky top-32">
              <div>
                <h3 className="text-sm font-semibold mb-3">Category</h3>
                <div className="space-y-1.5">
                  <Link to="/products" className={`block text-sm px-2 py-1 rounded ${!slug ? "text-primary font-medium bg-primary/5" : "text-muted-foreground hover:text-foreground"}`}>All Products</Link>
                  {categories.map(c => (
                    <Link key={c.id} to={`/category/${c.slug}`} className={`block text-sm px-2 py-1 rounded ${slug === c.slug ? "text-primary font-medium bg-primary/5" : "text-muted-foreground hover:text-foreground"}`}>
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-3">Brand</h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} className="rounded border-border text-primary focus:ring-primary" />
                      {brand}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-3">Price Range</h3>
                <div className="flex items-center gap-2">
                  <input type="number" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])} className="w-full px-2 py-1.5 text-sm border border-border rounded bg-background" placeholder="Min" />
                  <span className="text-muted-foreground">–</span>
                  <input type="number" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])} className="w-full px-2 py-1.5 text-sm border border-border rounded bg-background" placeholder="Max" />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)} className="rounded border-border text-primary focus:ring-primary" />
                In Stock Only
              </label>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {paginatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="p-2 rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${p === page ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="p-2 rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-lg font-medium text-muted-foreground">No products found</p>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
