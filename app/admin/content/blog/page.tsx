"use client"

import { useState, useEffect } from "react"
import { AdminShell } from "@/components/admin/admin-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Edit, Eye, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import Link from "next/link"

export default function BlogPostsPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPosts, setSelectedPosts] = useState([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchPosts()
  }, [statusFilter])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      let query = supabase
        .from("blog_posts")
        .select(`
          *,
          blog_categories(name),
          profiles:auth.users(email)
        `)
        .order("created_at", { ascending: false })

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter)
      }

      const { data, error } = await query

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error("Error fetching blog posts:", error)
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id)

      if (error) throw error

      setPosts(posts.filter((post) => post.id !== id))
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      })
      setDeleteDialogOpen(false)
    } catch (error) {
      console.error("Error deleting blog post:", error)
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      })
    }
  }

  const handleBulkDelete = async () => {
    try {
      for (const id of selectedPosts) {
        const { error } = await supabase.from("blog_posts").delete().eq("id", id)

        if (error) throw error
      }

      fetchPosts()
      setSelectedPosts([])
      toast({
        title: "Success",
        description: `${selectedPosts.length} blog posts deleted successfully`,
      })
    } catch (error) {
      console.error("Error deleting blog posts:", error)
      toast({
        title: "Error",
        description: "Failed to delete blog posts",
        variant: "destructive",
      })
    }
  }

  const handleStatusChange = async (id, status) => {
    try {
      const { error } = await supabase.from("blog_posts").update({ status }).eq("id", id)

      if (error) throw error

      setPosts(posts.map((post) => (post.id === id ? { ...post, status } : post)))
      toast({
        title: "Success",
        description: "Blog post status updated",
      })
    } catch (error) {
      console.error("Error updating blog post status:", error)
      toast({
        title: "Error",
        description: "Failed to update blog post status",
        variant: "destructive",
      })
    }
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([])
    } else {
      setSelectedPosts(filteredPosts.map((post) => post.id))
    }
  }

  const toggleSelectPost = (id) => {
    if (selectedPosts.includes(id)) {
      setSelectedPosts(selectedPosts.filter((postId) => postId !== id))
    } else {
      setSelectedPosts([...selectedPosts, id])
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500">Published</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      case "archived":
        return <Badge variant="secondary">Archived</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <AdminShell>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Blog Posts</h2>
          <Button onClick={() => router.push("/admin/content/blog/new")}>
            <Plus className="mr-2 h-4 w-4" /> New Post
          </Button>
        </div>

        <div className="flex flex-col space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search posts..."
                    className="w-full pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  {selectedPosts.length > 0 && (
                    <Button variant="destructive" onClick={() => handleBulkDelete()}>
                      Delete Selected
                    </Button>
                  )}
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                          onCheckedChange={toggleSelectAll}
                          aria-label="Select all"
                        />
                      </TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">Category</TableHead>
                      <TableHead className="hidden md:table-cell">Author</TableHead>
                      <TableHead className="hidden md:table-cell">Status</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          Loading blog posts...
                        </TableCell>
                      </TableRow>
                    ) : filteredPosts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          No blog posts found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedPosts.includes(post.id)}
                              onCheckedChange={() => toggleSelectPost(post.id)}
                              aria-label={`Select ${post.title}`}
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              {post.featured_image && (
                                <div className="w-10 h-10 mr-3 rounded overflow-hidden">
                                  <img
                                    src={post.featured_image || "/placeholder.svg"}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div>
                                <div>{post.title}</div>
                                <div className="text-sm text-muted-foreground md:hidden">
                                  {getStatusBadge(post.status)}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {post.blog_categories?.name || "Uncategorized"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{post.profiles?.email || "Unknown"}</TableCell>
                          <TableCell className="hidden md:table-cell">{getStatusBadge(post.status)}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {new Date(post.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                  <Link href={`/admin/content/blog/edit/${post.id}`}>
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/blog/${post.slug}`} target="_blank">
                                    <Eye className="mr-2 h-4 w-4" /> View
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setPostToDelete(post)
                                    setDeleteDialogOpen(true)
                                  }}
                                  className="text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{postToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => handleDelete(postToDelete?.id)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminShell>
  )
}

