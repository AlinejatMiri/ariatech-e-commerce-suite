import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Mail, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const { t } = useTranslation();
  const { signUp, user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!authLoading && user) return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: t("auth.passwordsDontMatch"), variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: t("auth.passwordTooShort"), description: t("auth.passwordTooShortDesc"), variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password, displayName);
    setLoading(false);
    if (error) {
      toast({ title: t("auth.signupFailed"), description: error, variant: "destructive" });
    } else {
      toast({
        title: t("auth.accountCreated"),
        description: t("auth.checkEmail"),
      });
    }
  };

  return (
    <div className="container flex items-center justify-center py-20">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t("auth.createAccount")}</CardTitle>
          <CardDescription>{t("auth.createAccountDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">{t("auth.displayName")}</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="displayName"
                  type="text"
                  placeholder="John Doe"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
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
              <Label htmlFor="password">{t("auth.password")}</Label>
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
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t("auth.confirmPassword")}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {t("auth.createAccount")}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            {t("auth.alreadyHaveAccount")}{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              {t("common.signIn")}
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

export default Signup;
