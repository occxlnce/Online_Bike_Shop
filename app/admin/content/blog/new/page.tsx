"use client"

import { useState, useEffect } from "react"
import { AdminShell } from "@/components/admin/admin-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, ImageIcon, Save } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

export default function NewBlogPostPage() {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [status, setStatus] = useState("draft")
  const [categoryId, setCategoryId] = useState("")
  const [featuredImage, setFeaturedImage] = useState("")
  const [isFeatured, setIsFeatured] = useState(false)
  const [publishDate, setPublishDate] = useState(new Date())
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (title) {
      setSlug(
        title
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-"),
      )
    }
  }, [title])

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from("blog_categories").select("*").order("name")

      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error("Error fetching categories:", error)
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      })
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploadingImage(true)

      // Create a unique file name
      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `blog-images/${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage.from("blog-images").upload(filePath, file)

      if (uploadError) throw uploadError

      // Get the public URL
      const { data } = supabase.storage.from("blog-images").getPublicUrl(filePath)

      setFeaturedImage(data.publicUrl)

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      })
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !content) {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)

      const { data: userData } = await supabase.auth.getUser()

      const postData = {
        title,
        slug,
        content,
        excerpt,
        status,
        category_id: categoryId || null,
        featured_image: featuredImage,
        is_featured: isFeatured,
        author_id: userData.user?.id,
        published_at: status === "published" ? publishDate.toISOString() : null,
      }

      const { data, error } = await supabase.from("blog_posts").insert([postData]).select()

      if (error) throw error

      toast({
        title: "Success",
        description: "Blog post created successfully",
      })

      router.push("/admin/content/blog")
    } catch (error) {
      console.error("Error creating blog post:", error)
      toast({
        title: "Error",
        description: "Failed to create blog post",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminShell>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => router.back()} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-3xl font-bold tracking-tight">New Blog Post</h2>
          </div>
          <div className="flex items-center gap-2">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : "Save"}
              <Save className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter post title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug</Label>
                      <Input
                        id="slug"
                        placeholder="post-url-slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        placeholder="Brief summary of the post"
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="write">
                    <TabsList className="mb-4">
                      <TabsTrigger value="write">Write</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="write">
                      <Textarea
                        placeholder="Write your post content here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="min-h-[400px]"
                      />
                    </TabsContent>
                    <TabsContent value="preview">
                      <div className="border rounded-md p-4 min-h-[400px] prose max-w-none">
                        {content ? (
                          <div dangerouslySetInnerHTML={{ __html: content }} />
                        ) : (
                          <p className="text-muted-foreground">No content to preview</p>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={categoryId} onValueChange={setCategoryId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Uncategorized</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Publication Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {format(publishDate, "PPP")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={publishDate}
                          onSelect={(date) => date && setPublishDate(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="featured" checked={isFeatured} onCheckedChange={setIsFeatured} />
                    <Label htmlFor="featured">Featured Post</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Featured Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {featuredImage ? (
                    <div className="relative aspect-video rounded-md overflow-hidden">
                      <img
                        src={featuredImage || "/placeholder.svg"}
                        alt="Featured"
                        className="object-cover w-full h-full"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setFeaturedImage("")}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="border border-dashed rounded-md p-8 text-center">
                      <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">Drag and drop or click to upload</p>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                        id="image-upload"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("image-upload").click()}
                        disabled={uploadingImage}
                      >
                        {uploadingImage ? "Uploading..." : "Upload Image"}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </AdminShell>
  )
}

