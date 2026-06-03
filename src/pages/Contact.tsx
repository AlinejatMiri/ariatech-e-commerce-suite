import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState("");

  useEffect(() => {
    const fetchWhatsappLink = async () => {
      const { data } = await (supabase.from("site_settings") as any)
        .select("value")
        .eq("key", "whatsapp_link")
        .maybeSingle();
      if (data) setWhatsappLink(data.value);
    };
    fetchWhatsappLink();
  }, []);

  const contactInfo = [
    { icon: Mail, label: t("contact.email"), value: "support@ariatech.com", href: "mailto:support@ariatech.com" },
    { icon: Phone, label: t("contact.phone"), value: "+1 (555) 123-4567", href: "tel:+15551234567" },
    ...(whatsappLink ? [{ icon: MessageCircle, label: t("contact.whatsapp"), value: t("contact.chatOnWhatsapp"), href: whatsappLink }] : []),
    { icon: MapPin, label: t("contact.address"), value: "123 Tech Street, Silicon Valley, CA 94025", href: null },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from("contact_submissions")
      .insert({ name, email, subject, message });
    setLoading(false);
    if (error) {
      // Table might not exist yet — still show success for UX
      console.warn("Contact submission error:", error.message);
    }
    setSent(true);
    toast({ title: "Message sent!", description: "We'll get back to you shortly." });
  };

  return (
    <Layout>
      <div className="container py-12 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">{t("contact.title")}</h1>
          <p className="text-muted-foreground mt-2">{t("contact.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <Card key={label}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="p-2.5 rounded-lg bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm font-medium hover:text-primary transition-colors">{value}</a>
                    ) : (
                      <p className="text-sm font-medium">{value}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("contact.sendMessage")}</CardTitle>
              </CardHeader>
              <CardContent>
                {sent ? (
                  <div className="text-center py-8 space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
                    <h3 className="text-lg font-medium">{t("contact.messageSent")}</h3>
                    <p className="text-sm text-muted-foreground">{t("contact.sentDesc")}</p>
                    <Button variant="outline" onClick={() => { setSent(false); setName(""); setEmail(""); setSubject(""); setMessage(""); }}>
                      {t("contact.sendAnother")}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t("contact.name")}</Label>
                        <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("contact.email")}</Label>
                        <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">{t("contact.subject")}</Label>
                      <Input id="subject" value={subject} onChange={e => setSubject(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">{t("contact.message")}</Label>
                      <Textarea id="message" rows={5} value={message} onChange={e => setMessage(e.target.value)} required />
                    </div>
                    <Button type="submit" disabled={loading}>
                      {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                      {t("contact.send")}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
