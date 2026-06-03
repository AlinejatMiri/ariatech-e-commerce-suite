import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
  <footer className="header-bg mt-auto">
    <div className="container py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="text-xl font-bold mb-4 block">
            <span className="text-primary">Aria</span>
            <span className="text-header-fg">Tech</span>
          </Link>
          <p className="text-header-fg/60 text-sm leading-relaxed">
            {t("footer.about")}
          </p>
        </div>
        <div>
          <h4 className="text-header-fg font-semibold mb-4 text-sm uppercase tracking-wider">{t("footer.shop")}</h4>
          <ul className="space-y-2">
            {[{ label: t("nav.laptops"), slug: "laptops" }, { label: t("nav.desktops"), slug: "desktops" }, { label: t("nav.monitors"), slug: "monitors" }, { label: t("nav.components"), slug: "components" }, { label: t("nav.peripherals"), slug: "peripherals" }].map(cat => (
              <li key={cat.slug}>
                <Link to={`/category/${cat.slug}`} className="text-header-fg/60 hover:text-primary text-sm transition-colors">
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-header-fg font-semibold mb-4 text-sm uppercase tracking-wider">{t("footer.support")}</h4>
          <ul className="space-y-2">
            {[t("footer.contactUs"), t("footer.faq"), t("footer.shippingInfo"), t("footer.returns"), t("footer.warranty")].map(item => (
              <li key={item}>
                <Link to="/contact" className="text-header-fg/60 hover:text-primary text-sm transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-header-fg font-semibold mb-4 text-sm uppercase tracking-wider">{t("footer.contact")}</h4>
          <ul className="space-y-2 text-header-fg/60 text-sm">
            <li>📧 support@ariatech.com</li>
            <li>📞 +1 (555) 123-4567</li>
            <li>📍 123 Tech Street, Silicon Valley</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-header-fg/10 mt-8 pt-6 text-center text-header-fg/40 text-sm">
        {t("footer.rights")}
      </div>
    </div>
  </footer>
  );
};

export default Footer;
