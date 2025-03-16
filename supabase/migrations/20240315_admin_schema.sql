-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'editor',
  is_super_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  compare_at_price DECIMAL(10, 2),
  cost_price DECIMAL(10, 2),
  sku TEXT,
  barcode TEXT,
  inventory_quantity INTEGER NOT NULL DEFAULT 0,
  weight DECIMAL(10, 2),
  weight_unit TEXT DEFAULT 'kg',
  is_physical BOOLEAN DEFAULT true,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  category_id UUID,
  brand_id UUID,
  tax_rate DECIMAL(5, 2),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product_images table
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product_variants table
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sku TEXT,
  barcode TEXT,
  price DECIMAL(10, 2),
  inventory_quantity INTEGER NOT NULL DEFAULT 0,
  is_default BOOLEAN DEFAULT false,
  options JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create brands table
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  logo_url TEXT,
  website_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create coupons table
CREATE TABLE IF NOT EXISTS coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  discount_type TEXT NOT NULL, -- percentage, fixed_amount
  discount_value DECIMAL(10, 2) NOT NULL,
  minimum_order_amount DECIMAL(10, 2),
  starts_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  usage_limit INTEGER,
  usage_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- Admin users policies
CREATE POLICY "Admin users can view admin_users"
ON admin_users FOR SELECT
USING (
  auth.uid() IN (
    SELECT user_id FROM admin_users
  )
);

CREATE POLICY "Super admins can insert admin_users"
ON admin_users FOR INSERT
WITH CHECK (
  auth.uid() IN (
    SELECT user_id FROM admin_users WHERE is_super_admin = true
  )
);

CREATE POLICY "Super admins can update admin_users"
ON admin_users FOR UPDATE
USING (
  auth.uid() IN (
    SELECT user_id FROM admin_users WHERE is_super_admin = true
  )
)
WITH CHECK (
  auth.uid() IN (
    SELECT user_id FROM admin_users WHERE is_super_admin = true
  )
);

CREATE POLICY "Super admins can delete admin_users"
ON admin_users FOR DELETE
USING (
  auth.uid() IN (
    SELECT user_id FROM admin_users WHERE is_super_admin = true
  )
);

-- Products policies
CREATE POLICY "Anyone can view published products"
ON products FOR SELECT
USING (
  is_published = true OR
  auth.uid() IN (
    SELECT user_id FROM admin_users
  )
);

CREATE POLICY "Admins can insert products"
ON products FOR INSERT
WITH CHECK (
  auth.uid() IN (
    SELECT user_id FROM admin_users
  )
);

CREATE POLICY "Admins can update products"
ON products FOR UPDATE
USING (
  auth.uid() IN (
    SELECT user_id FROM admin_users
  )
)
WITH CHECK (
  auth.uid() IN (
    SELECT user_id FROM admin_users
  )
);

CREATE POLICY "Admins can delete products"
ON products FOR DELETE
USING (
  auth.uid() IN (
    SELECT user_id FROM admin_users
  )
);

-- Similar policies for other tables...

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
DECLARE
  is_admin BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid()
  ) INTO is_admin;
  
  RETURN is_admin;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user is super admin
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
DECLARE
  is_super BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_super_admin = true
  ) INTO is_super;
  
  RETURN is_super;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to create first super admin
CREATE OR REPLACE FUNCTION public.create_first_super_admin(admin_email TEXT)
RETURNS UUID AS $$
DECLARE
  user_id UUID;
BEGIN
  -- Get user ID from email
  SELECT id INTO user_id FROM auth.users WHERE email = admin_email;
  
  IF user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', admin_email;
  END IF;
  
  -- Check if any admin exists
  IF EXISTS (SELECT 1 FROM admin_users) THEN
    RAISE EXCEPTION 'Admin users already exist. Cannot create first super admin.';
  END IF;
  
  -- Insert super admin
  INSERT INTO admin_users (user_id, role, is_super_admin)
  VALUES (user_id, 'super_admin', true);
  
  RETURN user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

