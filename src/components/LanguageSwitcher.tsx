import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "fa" ? "en" : "fa";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "fa" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-foreground/10 transition-colors text-sm font-medium"
      title={i18n.language === "fa" ? "English" : "فارسی"}
    >
      <Languages className="w-4 h-4" />
      <span className="hidden sm:inline">{i18n.language === "fa" ? "English" : "فارسی"}</span>
    </button>
  );
};

export default LanguageSwitcher;
