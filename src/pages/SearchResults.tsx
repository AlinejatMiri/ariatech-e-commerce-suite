import { useSearchParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { useSearchProducts } from "@/hooks/useProductData";
import { Search, Loader2 } from "lucide-react";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const { data: results = [], isLoading } = useSearchProducts(query);

  return (
    <Layout>
      <div className="container py-8 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <Search className="w-6 h-6 text-muted-foreground" />
          <h1 className="text-2xl font-bold">
            {query ? `Results for "${query}"` : "Search"}
          </h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : query && results.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-6">{results.length} product{results.length !== 1 ? "s" : ""} found</p>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {results.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </>
        ) : query ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-lg font-medium">No results found</h2>
            <p className="text-sm text-muted-foreground mt-1">Try different keywords or browse categories</p>
            <Link to="/products" className="text-primary hover:underline text-sm mt-4 inline-block">
              View All Products
            </Link>
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-lg font-medium">Start searching</h2>
            <p className="text-sm text-muted-foreground mt-1">Type a keyword in the search bar above</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchResults;
