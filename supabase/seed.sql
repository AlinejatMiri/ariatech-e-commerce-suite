-- Seed categories (using valid UUIDs)
INSERT INTO public.categories (id, name, slug, description) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Laptops', 'laptops', 'Portable computers for work and play'),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'Desktop PCs', 'desktops', 'Powerful desktop computers and workstations'),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'Monitors', 'monitors', 'High-quality displays for every need'),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'Components', 'components', 'PC parts: GPUs, CPUs, RAM, and more'),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'Peripherals', 'peripherals', 'Mice, keyboards, and accessories'),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'Networking', 'networking', 'Routers, mesh systems, and networking gear'),
  ('a1b2c3d4-0007-4000-8000-000000000007', 'Storage', 'storage', 'SSDs, HDDs, and external drives'),
  ('a1b2c3d4-0008-4000-8000-000000000008', 'Accessories', 'accessories', 'Headphones, bags, cables, and more')
ON CONFLICT (slug) DO NOTHING;

-- Seed products
INSERT INTO public.products (id, name, slug, description, price, original_price, category_id, brand, stock, images, specifications, featured, is_new, rating, review_count) VALUES
  ('b1c2d3e4-0001-4000-8000-000000000001', 'ASUS ROG Strix G16 Gaming Laptop', 'asus-rog-strix-g16',
   'Powerful gaming laptop with Intel Core i7 13th Gen, RTX 4060, 16GB DDR5, 512GB SSD, 16-inch 165Hz display.',
   1499.99, 1799.99, 'a1b2c3d4-0001-4000-8000-000000000001', 'ASUS', 15,
   ARRAY['https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&q=80', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80'],
   '{"Processor": "Intel Core i7-13650HX", "GPU": "NVIDIA RTX 4060 8GB", "RAM": "16GB DDR5", "Storage": "512GB NVMe SSD", "Display": "16\" FHD+ 165Hz", "OS": "Windows 11 Home"}'::jsonb,
   true, false, 4.7, 234),

  ('b1c2d3e4-0002-4000-8000-000000000002', 'Apple MacBook Pro 14" M3 Pro', 'macbook-pro-14-m3-pro',
   'Apple M3 Pro chip, 18GB unified memory, 512GB SSD, 14.2-inch Liquid Retina XDR display, up to 17 hours battery.',
   1999.99, NULL, 'a1b2c3d4-0001-4000-8000-000000000001', 'Apple', 20,
   ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80', 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80'],
   '{"Processor": "Apple M3 Pro", "RAM": "18GB Unified", "Storage": "512GB SSD", "Display": "14.2\" Liquid Retina XDR", "Battery": "Up to 17 hours", "OS": "macOS Sonoma"}'::jsonb,
   false, true, 4.9, 512),

  ('b1c2d3e4-0003-4000-8000-000000000003', 'Samsung Odyssey G9 49" Curved Monitor', 'samsung-odyssey-g9-49',
   'Super ultra-wide 49-inch DQHD curved gaming monitor, 240Hz, 1ms response, HDR1000.',
   1099.99, 1399.99, 'a1b2c3d4-0003-4000-8000-000000000003', 'Samsung', 8,
   ARRAY['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80'],
   '{"Size": "49\"", "Resolution": "5120x1440 DQHD", "Refresh Rate": "240Hz", "Response Time": "1ms GTG", "Panel": "VA Curved 1000R", "HDR": "HDR1000"}'::jsonb,
   true, false, 4.6, 189),

  ('b1c2d3e4-0004-4000-8000-000000000004', 'NVIDIA GeForce RTX 4070 Ti Super', 'rtx-4070-ti-super',
   'Next-gen gaming performance with 16GB GDDR6X, DLSS 3.5, ray tracing, and AV1 encoding.',
   799.99, NULL, 'a1b2c3d4-0004-4000-8000-000000000004', 'NVIDIA', 12,
   ARRAY['https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80'],
   '{"Memory": "16GB GDDR6X", "Boost Clock": "2610 MHz", "CUDA Cores": "8448", "TDP": "285W", "Interface": "PCIe 4.0 x16", "Outputs": "3x DP 1.4a, 1x HDMI 2.1"}'::jsonb,
   false, true, 4.8, 342),

  ('b1c2d3e4-0005-4000-8000-000000000005', 'Logitech G Pro X Superlight 2', 'logitech-g-pro-x-superlight-2',
   'Ultra-lightweight wireless gaming mouse, 60g, HERO 2 sensor, 95-hour battery, LIGHTSPEED wireless.',
   159.99, NULL, 'a1b2c3d4-0005-4000-8000-000000000005', 'Logitech', 50,
   ARRAY['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80'],
   '{"Weight": "60g", "Sensor": "HERO 2 25K", "DPI": "Up to 32,000", "Battery": "95 hours", "Connection": "LIGHTSPEED Wireless", "Buttons": "5 programmable"}'::jsonb,
   true, false, 4.8, 876),

  ('b1c2d3e4-0006-4000-8000-000000000006', 'Corsair K100 RGB Mechanical Keyboard', 'corsair-k100-rgb',
   'Premium mechanical gaming keyboard with OPX optical switches, iCUE control wheel, per-key RGB.',
   229.99, 259.99, 'a1b2c3d4-0005-4000-8000-000000000005', 'Corsair', 30,
   ARRAY['https://images.unsplash.com/photo-1541140532154-b024d1b23bec?w=800&q=80'],
   '{"Switches": "Corsair OPX", "Layout": "Full-size", "Backlight": "Per-key RGB", "Polling": "4000Hz", "Media": "iCUE Control Wheel", "Wrist": "Magnetic Palm Rest"}'::jsonb,
   false, false, 4.5, 445),

  ('b1c2d3e4-0007-4000-8000-000000000007', 'Samsung 990 Pro 2TB NVMe SSD', 'samsung-990-pro-2tb',
   'PCIe 4.0 NVMe M.2 SSD, sequential read up to 7,450 MB/s, write up to 6,900 MB/s, Samsung V-NAND.',
   169.99, 219.99, 'a1b2c3d4-0007-4000-8000-000000000007', 'Samsung', 40,
   ARRAY['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&q=80'],
   '{"Capacity": "2TB", "Interface": "PCIe 4.0 x4 NVMe", "Read": "7,450 MB/s", "Write": "6,900 MB/s", "Form": "M.2 2280", "Endurance": "1,200 TBW"}'::jsonb,
   true, false, 4.9, 1203),

  ('b1c2d3e4-0008-4000-8000-000000000008', 'Custom Gaming PC - Titan Series', 'custom-gaming-pc-titan',
   'Ultimate gaming PC with Intel i9-14900K, RTX 4080 Super, 64GB DDR5, 2TB NVMe, custom liquid cooling.',
   2999.99, 3499.99, 'a1b2c3d4-0002-4000-8000-000000000002', 'AriaTech', 5,
   ARRAY['https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80', 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80'],
   '{"Processor": "Intel Core i9-14900K", "GPU": "RTX 4080 Super 16GB", "RAM": "64GB DDR5-5600", "Storage": "2TB PCIe 4.0 NVMe", "Cooling": "360mm AIO Liquid", "PSU": "1000W 80+ Gold"}'::jsonb,
   true, true, 4.9, 67),

  ('b1c2d3e4-0009-4000-8000-000000000009', 'Dell UltraSharp 27" 4K USB-C Monitor', 'dell-ultrasharp-27-4k',
   '27-inch 4K UHD IPS monitor, 100% sRGB, USB-C 90W, HDR 400, factory calibrated.',
   619.99, NULL, 'a1b2c3d4-0003-4000-8000-000000000003', 'Dell', 18,
   ARRAY['https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800&q=80'],
   '{"Size": "27\"", "Resolution": "3840x2160 4K", "Panel": "IPS", "Color Accuracy": "100% sRGB", "Connectivity": "USB-C 90W PD", "HDR": "VESA HDR 400"}'::jsonb,
   false, false, 4.7, 321),

  ('b1c2d3e4-0010-4000-8000-000000000010', 'Sony WH-1000XM5 Wireless Headphones', 'sony-wh-1000xm5',
   'Industry-leading noise canceling headphones with Auto NC Optimizer, 30-hour battery, multipoint connection.',
   349.99, 399.99, 'a1b2c3d4-0008-4000-8000-000000000008', 'Sony', 35,
   ARRAY['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'],
   '{"Driver": "30mm", "ANC": "Dual Processor", "Battery": "30 hours", "Bluetooth": "5.2", "Codec": "LDAC, AAC, SBC", "Weight": "250g"}'::jsonb,
   true, false, 4.8, 2100),

  ('b1c2d3e4-0011-4000-8000-000000000011', 'AMD Ryzen 9 7950X Processor', 'amd-ryzen-9-7950x',
   '16-core, 32-thread desktop processor with 5.7 GHz max boost, 80MB cache, AM5 socket.',
   549.99, 699.99, 'a1b2c3d4-0004-4000-8000-000000000004', 'AMD', 22,
   ARRAY['https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&q=80'],
   '{"Cores": "16 / 32 Threads", "Base Clock": "4.5 GHz", "Boost Clock": "5.7 GHz", "Cache": "80MB", "TDP": "170W", "Socket": "AM5"}'::jsonb,
   false, false, 4.8, 567),

  ('b1c2d3e4-0012-4000-8000-000000000012', 'TP-Link Deco XE75 Wi-Fi 6E Mesh System', 'tp-link-deco-xe75',
   'Whole home mesh Wi-Fi 6E system, 3-pack, AXE5400, covers up to 7,200 sq ft, tri-band.',
   299.99, NULL, 'a1b2c3d4-0006-4000-8000-000000000006', 'TP-Link', 25,
   ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80'],
   '{"Standard": "Wi-Fi 6E AXE5400", "Coverage": "7,200 sq ft", "Band": "Tri-Band", "Ports": "3x Gigabit", "Units": "3-Pack", "Security": "WPA3"}'::jsonb,
   false, true, 4.5, 198)
ON CONFLICT (slug) DO NOTHING;
