import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import ProtectedRoute from "@/components/ProtectedRoute";

const AdminSettings = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [whatsappLink, setWhatsappLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      const { data } = await (supabase.from("site_settings") as any)
        .select("value")
        .eq("key", "whatsapp_link")
        .maybeSingle();
      if (data) setWhatsappLink(data.value);
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await (supabase.from("site_settings") as any)
      .upsert({ key: "whatsapp_link", value: whatsappLink }, { onConflict: "key" });
    setSaving(false);
    if (error) {
      toast({ title: t("admin.saveFailed"), description: error.message, variant: "destructive" });
    } else {
      toast({ title: t("admin.settingsSaved"), description: t("admin.whatsappLinkSaved") });
    }
  };

  return (
    <Layout>
      <div className="container py-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">{t("admin.settings")}</h1>
            <p className="text-sm text-muted-foreground mt-1">{t("admin.manageSettings")}</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  {t("admin.whatsappSettings")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="whatsappLink">{t("admin.whatsappLink")}</Label>
                  <Input
                    id="whatsappLink"
                    placeholder="https://wa.me/1234567890"
                    value={whatsappLink}
                    onChange={e => setWhatsappLink(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    {t("admin.whatsappLinkDesc")}
                  </p>
                </div>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                  {t("common.save")}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

const AdminSettingsPage = () => (
  <ProtectedRoute requireAdmin>
    <AdminSettings />
  </ProtectedRoute>
);

export default AdminSettingsPage;
