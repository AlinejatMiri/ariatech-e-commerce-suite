-- Create site_settings table for storing configurable site-wide settings
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Only admins can update settings
CREATE POLICY "Admins can update settings" ON public.site_settings
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Everyone can read settings
CREATE POLICY "Public can read settings" ON public.site_settings
  FOR SELECT TO public
  USING (true);

-- Insert default WhatsApp link setting
INSERT INTO public.site_settings (key, value) 
VALUES ('whatsapp_link', 'https://wa.me/1234567890')
ON CONFLICT (key) DO NOTHING;

-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_site_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS site_settings_updated_at ON public.site_settings;
CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_site_settings_updated_at();
