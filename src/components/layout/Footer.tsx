import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="header-bg mt-auto">
    <div className="container py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="text-xl font-bold mb-4 block">
            <span className="text-primary">Aria</span>
            <span className="text-header-fg">Tech</span>
          </Link>
          <p className="text-header-fg/60 text-sm leading-relaxed">
            Your trusted source for the latest computers, components, and tech accessories. Quality products, expert support.
          </p>
        </div>
        <div>
          <h4 className="text-header-fg font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h4>
          <ul className="space-y-2">
            {["Laptops", "Desktop PCs", "Monitors", "Components", "Peripherals"].map(cat => (
              <li key={cat}>
                <Link to={`/category/${cat.toLowerCase().replace(" ", "-")}`} className="text-header-fg/60 hover:text-primary text-sm transition-colors">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-header-fg font-semibold mb-4 text-sm uppercase tracking-wider">Support</h4>
          <ul className="space-y-2">
            {["Contact Us", "FAQ", "Shipping Info", "Returns", "Warranty"].map(item => (
              <li key={item}>
                <Link to="/contact" className="text-header-fg/60 hover:text-primary text-sm transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-header-fg font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <ul className="space-y-2 text-header-fg/60 text-sm">
            <li>📧 support@ariatech.com</li>
            <li>📞 +1 (555) 123-4567</li>
            <li>📍 123 Tech Street, Silicon Valley</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-header-fg/10 mt-8 pt-6 text-center text-header-fg/40 text-sm">
        © 2026 AriaTech. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
