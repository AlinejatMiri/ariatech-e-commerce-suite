import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const useRTL = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const isRTL = i18n.language === "fa";
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
};

export default useRTL;
