-- Create blog categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  author_id UUID REFERENCES auth.users(id),
  status TEXT NOT NULL DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT false,
  category_id UUID REFERENCES blog_categories(id),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tutorial categories table
CREATE TABLE IF NOT EXISTS tutorial_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tutorials table
CREATE TABLE IF NOT EXISTS tutorials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  content TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  difficulty TEXT NOT NULL DEFAULT 'beginner',
  duration_minutes INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  category_id UUID REFERENCES tutorial_categories(id),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create media metadata table
CREATE TABLE IF NOT EXISTS media_metadata (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_path TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  file_type TEXT,
  file_size BIGINT,
  width INTEGER,
  height INTEGER,
  alt_text TEXT,
  bucket TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage buckets if they don't exist
DO $$
BEGIN
  -- Create product images bucket
  PERFORM supabase_storage.create_bucket('product-images', '{"public": true}');
  EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  -- Create blog images bucket
  PERFORM supabase_storage.create_bucket('blog-images', '{"public": true}');
  EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  -- Create tutorial images bucket
  PERFORM supabase_storage.create_bucket('tutorial-images', '{"public": true}');
  EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Add RLS policies
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutorial_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutorials ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_metadata ENABLE ROW LEVEL SECURITY;

-- Create policies for admin users
CREATE POLICY "Admin users can do anything with blog categories"
  ON blog_categories
  USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Admin users can do anything with blog posts"
  ON blog_posts
  USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Admin users can do anything with tutorial categories"
  ON tutorial_categories
  USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Admin users can do anything with tutorials"
  ON tutorials
  USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Admin users can do anything with media metadata"
  ON media_metadata
  USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

-- Create policies for public read access
CREATE POLICY "Public can view published blog posts"
  ON blog_posts
  FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public can view published tutorials"
  ON tutorials
  FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public can view blog categories"
  ON blog_categories
  FOR SELECT
  USING (true);

CREATE POLICY "Public can view tutorial categories"
  ON tutorial_categories
  FOR SELECT
  USING (true);

