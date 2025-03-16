-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- USER MANAGEMENT
-- ==========================================

-- Profiles table (already exists but ensuring it has all needed fields)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  phone_number TEXT,
  avatar_url TEXT,
  birth_date DATE,
  gender TEXT,
  newsletter_subscribed BOOLEAN DEFAULT false,
  marketing_consent BOOLEAN DEFAULT false,
  account_status TEXT DEFAULT 'active',
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User addresses
CREATE TABLE IF NOT EXISTS user_addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  address_type TEXT NOT NULL, -- 'shipping', 'billing', 'both'
  is_default BOOLEAN DEFAULT false,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  company TEXT,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL,
  phone_number TEXT,
  delivery_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User preferences
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  preferred_language TEXT DEFAULT 'en',
  preferred_currency TEXT DEFAULT 'USD',
  preferred_theme TEXT DEFAULT 'light',
  email_notifications JSONB DEFAULT '{"order_updates": true, "promotions": true, "product_updates": true}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- PRODUCT MANAGEMENT
-- ==========================================

-- Categories table (already exists but ensuring it has all needed fields)
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  image_url TEXT,
  banner_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Brands table (already exists but ensuring it has all needed fields)
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  logo_url TEXT,
  banner_url TEXT,
  website_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table (already exists but ensuring it has all needed fields)
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  compare_at_price DECIMAL(10, 2),
  cost_price DECIMAL(10, 2),
  sku TEXT,
  barcode TEXT,
  inventory_quantity INTEGER NOT NULL DEFAULT 0,
  inventory_policy TEXT DEFAULT 'deny', -- 'deny', 'continue'
  weight DECIMAL(10, 2),
  weight_unit TEXT DEFAULT 'kg',
  dimensions JSONB, -- {length, width, height}
  is_physical BOOLEAN DEFAULT true,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
  tax_rate DECIMAL(5, 2),
  tags TEXT[],
  meta_title TEXT,
  meta_description TEXT,
  search_keywords TEXT[],
  average_rating DECIMAL(3, 2),
  review_count INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product images table (already exists but ensuring it has all needed fields)
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product attributes (for filtering)
CREATE TABLE IF NOT EXISTS product_attributes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  attribute_type TEXT NOT NULL, -- 'text', 'number', 'boolean', 'color', 'size'
  is_filterable BOOLEAN DEFAULT true,
  is_visible BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product attribute values
CREATE TABLE IF NOT EXISTS product_attribute_values (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  attribute_id UUID REFERENCES product_attributes(id) ON DELETE CASCADE,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product variants table (already exists but ensuring it has all needed fields)
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sku TEXT,
  barcode TEXT,
  price DECIMAL(10, 2),
  compare_at_price DECIMAL(10, 2),
  cost_price DECIMAL(10, 2),
  inventory_quantity INTEGER NOT NULL DEFAULT 0,
  weight DECIMAL(10, 2),
  weight_unit TEXT DEFAULT 'kg',
  dimensions JSONB, -- {length, width, height}
  is_default BOOLEAN DEFAULT false,
  options JSONB, -- {color: "red", size: "XL"}
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product options (for variants)
CREATE TABLE IF NOT EXISTS product_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- 'Color', 'Size', etc.
  display_name TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product option values
CREATE TABLE IF NOT EXISTS product_option_values (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  option_id UUID REFERENCES product_options(id) ON DELETE CASCADE,
  value TEXT NOT NULL, -- 'Red', 'XL', etc.
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Related products
CREATE TABLE IF NOT EXISTS related_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  related_product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL, -- 'related', 'upsell', 'cross-sell'
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id, related_product_id)
);

-- ==========================================
-- INVENTORY MANAGEMENT
-- ==========================================

-- Inventory transactions
CREATE TABLE IF NOT EXISTS inventory_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  transaction_type TEXT NOT NULL, -- 'purchase', 'sale', 'adjustment', 'return'
  quantity INTEGER NOT NULL,
  reference_id UUID, -- Order ID, Purchase Order ID, etc.
  reference_type TEXT, -- 'order', 'purchase_order', 'manual'
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inventory locations
CREATE TABLE IF NOT EXISTS inventory_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product inventory by location
CREATE TABLE IF NOT EXISTS product_inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
  location_id UUID REFERENCES inventory_locations(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id, variant_id, location_id)
);

-- ==========================================
-- ORDER MANAGEMENT
-- ==========================================

-- Orders table (already exists but ensuring it has all needed fields)
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_number TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'
  total DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax_total DECIMAL(10, 2) DEFAULT 0,
  shipping_total DECIMAL(10, 2) DEFAULT 0,
  discount_total DECIMAL(10, 2) DEFAULT 0,
  shipping_address JSONB,
  billing_address JSONB,
  payment_method TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'paid', 'failed', 'refunded'
  payment_intent_id TEXT,
  shipping_method TEXT,
  tracking_number TEXT,
  notes TEXT,
  customer_notes TEXT,
  coupon_code TEXT,
  ip_address TEXT,
  user_agent TEXT,
  currency TEXT DEFAULT 'USD',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table (already exists but ensuring it has all needed fields)
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL,
  variant_id UUID,
  name TEXT NOT NULL,
  sku TEXT,
  price DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax_amount DECIMAL(10, 2) DEFAULT 0,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  image TEXT,
  options JSONB, -- {color: "red", size: "XL"}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order history (for tracking status changes)
CREATE TABLE IF NOT EXISTS order_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- SHOPPING CART
-- ==========================================

-- Shopping carts
CREATE TABLE IF NOT EXISTS shopping_carts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT, -- For guest users
  currency TEXT DEFAULT 'USD',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart items
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id UUID REFERENCES shopping_carts(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  options JSONB, -- {color: "red", size: "XL"}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- WISHLIST
-- ==========================================

-- Wishlists
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT DEFAULT 'Default',
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wishlist items
CREATE TABLE IF NOT EXISTS wishlist_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wishlist_id UUID REFERENCES wishlists(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- REVIEWS & RATINGS
-- ==========================================

-- Product reviews
CREATE TABLE IF NOT EXISTS product_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title TEXT,
  content TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  is_verified_purchase BOOLEAN DEFAULT false,
  helpful_votes INTEGER DEFAULT 0,
  unhelpful_votes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Review images
CREATE TABLE IF NOT EXISTS review_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id UUID REFERENCES product_reviews(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Review votes
CREATE TABLE IF NOT EXISTS review_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id UUID REFERENCES product_reviews(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  is_helpful BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(review_id, user_id)
);

-- ==========================================
-- MARKETING
-- ==========================================

-- Coupons table (already exists but ensuring it has all needed fields)
CREATE TABLE IF NOT EXISTS coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  discount_type TEXT NOT NULL, -- 'percentage', 'fixed_amount', 'free_shipping'
  discount_value DECIMAL(10, 2) NOT NULL,
  minimum_order_amount DECIMAL(10, 2),
  maximum_discount_amount DECIMAL(10, 2),
  starts_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  usage_limit INTEGER,
  usage_limit_per_user INTEGER,
  usage_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  applies_to TEXT, -- 'all', 'products', 'categories'
  product_ids UUID[],
  category_ids UUID[],
  exclude_product_ids UUID[],
  exclude_category_ids UUID[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coupon usage
CREATE TABLE IF NOT EXISTS coupon_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  coupon_id UUID REFERENCES coupons(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  discount_amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Promotions
CREATE TABLE IF NOT EXISTS promotions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  promotion_type TEXT NOT NULL, -- 'sale', 'bogo', 'bundle'
  discount_type TEXT NOT NULL, -- 'percentage', 'fixed_amount'
  discount_value DECIMAL(10, 2) NOT NULL,
  starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ends_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  applies_to TEXT, -- 'all', 'products', 'categories'
  product_ids UUID[],
  category_ids UUID[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- CUSTOMER SUPPORT
-- ==========================================

-- Support tickets
CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open', -- 'open', 'in_progress', 'resolved', 'closed'
  priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
  department TEXT, -- 'orders', 'returns', 'technical', 'general'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Ticket messages
CREATE TABLE IF NOT EXISTS ticket_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_staff BOOLEAN DEFAULT false,
  message TEXT NOT NULL,
  attachments TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- CONTENT MANAGEMENT
-- ==========================================

-- Blog categories (already exists but ensuring it has all needed fields)
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  image_url TEXT,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts (already exists but ensuring it has all needed fields)
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  author_id UUID REFERENCES auth.users(id),
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'published', 'archived'
  is_featured BOOLEAN DEFAULT false,
  category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  tags TEXT[],
  meta_title TEXT,
  meta_description TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog comments
CREATE TABLE IF NOT EXISTS blog_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  parent_id UUID REFERENCES blog_comments(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tutorial categories (already exists but ensuring it has all needed fields)
CREATE TABLE IF NOT EXISTS tutorial_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES tutorial_categories(id) ON DELETE SET NULL,
  image_url TEXT,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tutorials (already exists but ensuring it has all needed fields)
CREATE TABLE IF NOT EXISTS tutorials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  content TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  difficulty TEXT NOT NULL DEFAULT 'beginner', -- 'beginner', 'intermediate', 'advanced'
  duration_minutes INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'published', 'archived'
  category_id UUID REFERENCES tutorial_categories(id) ON DELETE SET NULL,
  tags TEXT[],
  meta_title TEXT,
  meta_description TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pages (for static content)
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'published', 'archived'
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- SHIPPING & TAX
-- ==========================================

-- Shipping methods
CREATE TABLE IF NOT EXISTS shipping_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  free_shipping_threshold DECIMAL(10, 2),
  is_active BOOLEAN DEFAULT true,
  estimated_delivery_days INTEGER,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shipping zones
CREATE TABLE IF NOT EXISTS shipping_zones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  countries TEXT[],
  states TEXT[],
  zip_codes TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shipping rates
CREATE TABLE IF NOT EXISTS shipping_rates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  zone_id UUID REFERENCES shipping_zones(id) ON DELETE CASCADE,
  method_id UUID REFERENCES shipping_methods(id) ON DELETE CASCADE,
  price DECIMAL(10, 2) NOT NULL,
  min_order_amount DECIMAL(10, 2),
  max_order_amount DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tax rates
CREATE TABLE IF NOT EXISTS tax_rates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  rate DECIMAL(5, 2) NOT NULL,
  country TEXT,
  state TEXT,
  zip_code TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- ANALYTICS & TRACKING
-- ==========================================

-- Page views
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  page_url TEXT NOT NULL,
  referrer_url TEXT,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product views
CREATE TABLE IF NOT EXISTS product_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  referrer_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- NOTIFICATIONS
-- ==========================================

-- User notifications
CREATE TABLE IF NOT EXISTS user_notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL, -- 'order', 'system', 'marketing'
  is_read BOOLEAN DEFAULT false,
  action_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- FUNCTIONS & TRIGGERS
-- ==========================================

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (id, email, created_at, updated_at)
  VALUES (NEW.id, NEW.email, NOW(), NOW());
  
  -- Create default wishlist
  INSERT INTO public.wishlists (user_id, name, is_public)
  VALUES (NEW.id, 'Default Wishlist', false);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  END IF;
END
$$;

-- Function to update product average rating
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
DECLARE
  avg_rating DECIMAL(3, 2);
  review_cnt INTEGER;
BEGIN
  -- Calculate average rating and count
  SELECT 
    COALESCE(AVG(rating), 0),
    COUNT(*)
  INTO 
    avg_rating,
    review_cnt
  FROM product_reviews
  WHERE 
    product_id = NEW.product_id AND
    status = 'approved';
  
  -- Update product
  UPDATE products
  SET 
    average_rating = avg_rating,
    review_count = review_cnt
  WHERE id = NEW.product_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for product rating updates
CREATE TRIGGER update_product_rating_trigger
AFTER INSERT OR UPDATE OR DELETE ON product_reviews
FOR EACH ROW EXECUTE FUNCTION update_product_rating();

-- Function to check inventory before order
CREATE OR REPLACE FUNCTION check_inventory_before_order()
RETURNS TRIGGER AS $$
DECLARE
  product_record RECORD;
  variant_record RECORD;
  current_quantity INTEGER;
BEGIN
  -- Get product info
  SELECT inventory_quantity, inventory_policy INTO product_record
  FROM products WHERE id = NEW.product_id;
  
  -- Check if variant exists
  IF NEW.variant_id IS NOT NULL THEN
    SELECT inventory_quantity INTO variant_record
    FROM product_variants WHERE id = NEW.variant_id;
    
    current_quantity := variant_record.inventory_quantity;
  ELSE
    current_quantity := product_record.inventory_quantity;
  END IF;
  
  -- Check inventory
  IF current_quantity < NEW.quantity AND product_record.inventory_policy = 'deny' THEN
    RAISE EXCEPTION 'Not enough inventory for product %', NEW.product_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for inventory check
CREATE TRIGGER check_inventory_trigger
BEFORE INSERT ON order_items
FOR EACH ROW EXECUTE FUNCTION check_inventory_before_order();

-- Function to update inventory after order
CREATE OR REPLACE FUNCTION update_inventory_after_order()
RETURNS TRIGGER AS $$
BEGIN
  -- Update product inventory
  IF NEW.variant_id IS NULL THEN
    UPDATE products
    SET inventory_quantity = inventory_quantity - NEW.quantity
    WHERE id = NEW.product_id;
  ELSE
    UPDATE product_variants
    SET inventory_quantity = inventory_quantity - NEW.quantity
    WHERE id = NEW.variant_id;
  END IF;
  
  -- Record inventory transaction
  INSERT INTO inventory_transactions (
    product_id,
    variant_id,
    transaction_type,
    quantity,
    reference_id,
    reference_type
  ) VALUES (
    NEW.product_id,
    NEW.variant_id,
    'sale',
    -NEW.quantity,
    NEW.order_id,
    'order'
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for inventory update
CREATE TRIGGER update_inventory_trigger
AFTER INSERT ON order_items
FOR EACH ROW EXECUTE FUNCTION update_inventory_after_order();

-- ==========================================
-- RLS POLICIES
-- ==========================================

-- Enable RLS on all tables
DO $$
DECLARE
  table_name text;
BEGIN
  FOR table_name IN 
    SELECT tablename FROM pg_tables 
    WHERE schemaname = 'public' AND 
    tablename NOT IN ('schema_migrations', 'schema_version')
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY',  'schema_version')
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY',
      table_name);
  END LOOP;
END
$$;

-- Create default policies for all tables
-- Users can view their own data
DO $$
DECLARE
  table_name text;
BEGIN
  FOR table_name IN 
    SELECT tablename FROM pg_tables 
    WHERE schemaname = 'public' AND 
    tablename LIKE '%user%' OR
    tablename LIKE 'profiles' OR
    tablename LIKE 'orders' OR
    tablename LIKE 'wishlists' OR
    tablename LIKE 'shopping_carts' OR
    tablename LIKE 'support_tickets'
  LOOP
    EXECUTE format('
      CREATE POLICY "Users can view their own data on %1$I"
      ON %1$I FOR SELECT
      USING (auth.uid() = user_id);
      
      CREATE POLICY "Users can insert their own data on %1$I"
      ON %1$I FOR INSERT
      WITH CHECK (auth.uid() = user_id);
      
      CREATE POLICY "Users can update their own data on %1$I"
      ON %1$I FOR UPDATE
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
      
      CREATE POLICY "Users can delete their own data on %1$I"
      ON %1$I FOR DELETE
      USING (auth.uid() = user_id);
    ', table_name);
  END LOOP;
END
$$;

-- Public read access for published content
DO $$
DECLARE
  table_name text;
BEGIN
  FOR table_name IN 
    SELECT tablename FROM pg_tables 
    WHERE schemaname = 'public' AND 
    (tablename LIKE 'products' OR
     tablename LIKE 'categories' OR
     tablename LIKE 'brands' OR
     tablename LIKE 'blog_posts' OR
     tablename LIKE 'blog_categories' OR
     tablename LIKE 'tutorials' OR
     tablename LIKE 'tutorial_categories' OR
     tablename LIKE 'pages')
  LOOP
    IF table_name LIKE '%posts' OR table_name LIKE 'tutorials' OR table_name = 'products' OR table_name = 'pages' THEN
      EXECUTE format('
        CREATE POLICY "Public can view published content on %1$I"
        ON %1$I FOR SELECT
        USING (status = ''published'' OR auth.uid() IN (SELECT user_id FROM admin_users));
      ', table_name);
    ELSE
      EXECUTE format('
        CREATE POLICY "Public can view content on %1$I"
        ON %1$I FOR SELECT
        USING (true);
      ', table_name);
    END IF;
  END LOOP;
END
$$;

-- Admin policies
DO $$
DECLARE
  table_name text;
BEGIN
  FOR table_name IN 
    SELECT tablename FROM pg_tables 
    WHERE schemaname = 'public' AND 
    tablename NOT IN ('schema_migrations', 'schema_version')
  LOOP
    EXECUTE format('
      CREATE POLICY "Admins can do anything with %1$I"
      ON %1$I
      USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()))
      WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));
    ', table_name);
  END LOOP;
END
$$;

-- ==========================================
-- INDEXES
-- ==========================================

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand_id ON products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_is_published ON products(is_published);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);

CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON product_variants(product_id);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

CREATE INDEX IF NOT EXISTS idx_user_addresses_user_id ON user_addresses(user_id);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category_id ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);

CREATE INDEX IF NOT EXISTS idx_tutorials_slug ON tutorials(slug);
CREATE INDEX IF NOT EXISTS idx_tutorials_status ON tutorials(status);
CREATE INDEX IF NOT EXISTS idx_tutorials_category_id ON tutorials(category_id);
CREATE INDEX IF NOT EXISTS idx_tutorials_published_at ON tutorials(published_at);

CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id ON product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_user_id ON product_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_status ON product_reviews(status);

CREATE INDEX IF NOT EXISTS idx_wishlists_user_id ON wishlists(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_items_wishlist_id ON wishlist_items(wishlist_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_items_product_id ON wishlist_items(product_id);

CREATE INDEX IF NOT EXISTS idx_shopping_carts_user_id ON shopping_carts(user_id);
CREATE INDEX IF NOT EXISTS idx_shopping_carts_session_id ON shopping_carts(session_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product_id ON cart_items(product_id);

-- ==========================================
-- INITIAL DATA
-- ==========================================

-- Insert default inventory location
INSERT INTO inventory_locations (name, is_default)
VALUES ('Main Warehouse', true)
ON CONFLICT DO NOTHING;

-- Insert default shipping methods
INSERT INTO shipping_methods (name, description, price, estimated_delivery_days, display_order)
VALUES 
('Standard Shipping', 'Delivery in 3-5 business days', 5.99, 5, 1),
('Express Shipping', 'Delivery in 1-2 business days', 12.99, 2, 2),
('Free Shipping', 'Free shipping on orders over $50', 0, 5, 3)
ON CONFLICT DO NOTHING;

-- Insert default shipping zone
INSERT INTO shipping_zones (name, countries)
VALUES ('United States', ARRAY['US'])
ON CONFLICT DO NOTHING;

