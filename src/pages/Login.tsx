import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const { signIn, user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!authLoading && user) return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      const desc = error.includes("Email not confirmed")
        ? t("auth.emailNotConfirmed")
        : error;
      toast({ title: t("auth.loginFailed"), description: desc, variant: "destructive" });
    } else {
      toast({ title: t("auth.welcomeBackMsg"), description: t("auth.loggedInSuccess") });
    }
  };

  return (
    <div className="container flex items-center justify-center py-20">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t("auth.welcomeBack")}</CardTitle>
          <CardDescription>{t("auth.signInDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t("auth.password")}</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                  {t("auth.forgotPassword")}
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {t("common.signIn")}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            {t("auth.dontHaveAccount")}{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              {t("common.signUp")}
            </Link>
          </p>
          <p className="text-center text-sm text-muted-foreground mt-2">
            <Link to="/" className="hover:underline">{t("common.backToHome")}</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
