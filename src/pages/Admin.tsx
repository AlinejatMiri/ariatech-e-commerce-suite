import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import {
  Package, ShoppingCart, Users, FileText, Tag, MessageSquare, BarChart3, Settings,
} from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

const adminSections = [
  { title: "Products", desc: "Manage product catalog", icon: Package, to: "/admin/products", count: "12 items" },
  { title: "Orders", desc: "View & process orders", icon: ShoppingCart, to: "/admin/orders", count: "Track status" },
  { title: "Users", desc: "Manage users & roles", icon: Users, to: "/admin/users", count: "Roles & access" },
  { title: "Blog Posts", desc: "Create & edit posts", icon: FileText, to: "/admin/blog", count: "Content mgmt" },
  { title: "Discounts", desc: "Coupon codes & promos", icon: Tag, to: "/admin/discounts", count: "Active promos" },
  { title: "Messages", desc: "Contact submissions", icon: MessageSquare, to: "/admin/messages", count: "Inbox" },
  { title: "Analytics", desc: "Sales & traffic data", icon: BarChart3, to: "/admin/analytics", count: "Coming soon" },
  { title: "Settings", desc: "Site configuration", icon: Settings, to: "/admin/settings", count: "General" },
];

const AdminDashboard = () => (
  <Layout>
    <div className="container py-8 pb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your e-commerce store</p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/">← Back to Store</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminSections.map(({ title, desc, icon: Icon, to, count }) => (
          <Link key={to} to={to}>
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="text-xs text-muted-foreground">{count}</span>
                </div>
                <CardTitle className="text-base">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  </Layout>
);

const Admin = () => (
  <ProtectedRoute requireAdmin>
    <AdminDashboard />
  </ProtectedRoute>
);

export default Admin;
