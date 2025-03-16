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
import { Edit, Eye, MoreHorizontal, Plus, Search, Trash2, Video } from "lucide-react"
import Link from "next/link"

export default function TutorialsPage() {
  const [tutorials, setTutorials] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTutorials, setSelectedTutorials] = useState([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [tutorialToDelete, setTutorialToDelete] = useState(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchTutorials()
  }, [statusFilter])

  const fetchTutorials = async () => {
    try {
      setLoading(true)
      let query = supabase
        .from("tutorials")
        .select(`
          *,
          tutorial_categories(name)
        `)
        .order("created_at", { ascending: false })

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter)
      }

      const { data, error } = await query

      if (error) throw error
      setTutorials(data || [])
    } catch (error) {
      console.error("Error fetching tutorials:", error)
      toast({
        title: "Error",
        description: "Failed to load tutorials",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("tutorials").delete().eq("id", id)

      if (error) throw error

      setTutorials(tutorials.filter((tutorial) => tutorial.id !== id))
      toast({
        title: "Success",
        description: "Tutorial deleted successfully",
      })
      setDeleteDialogOpen(false)
    } catch (error) {
      console.error("Error deleting tutorial:", error)
      toast({
        title: "Error",
        description: "Failed to delete tutorial",
        variant: "destructive",
      })
    }
  }

  const handleBulkDelete = async () => {
    try {
      for (const id of selectedTutorials) {
        const { error } = await supabase.from("tutorials").delete().eq("id", id)

        if (error) throw error
      }

      fetchTutorials()
      setSelectedTutorials([])
      toast({
        title: "Success",
        description: `${selectedTutorials.length} tutorials deleted successfully`,
      })
    } catch (error) {
      console.error("Error deleting tutorials:", error)
      toast({
        title: "Error",
        description: "Failed to delete tutorials",
        variant: "destructive",
      })
    }
  }

  const handleStatusChange = async (id, status) => {
    try {
      const { error } = await supabase.from("tutorials").update({ status }).eq("id", id)

      if (error) throw error

      setTutorials(tutorials.map((tutorial) => (tutorial.id === id ? { ...tutorial, status } : tutorial)))
      toast({
        title: "Success",
        description: "Tutorial status updated",
      })
    } catch (error) {
      console.error("Error updating tutorial status:", error)
      toast({
        title: "Error",
        description: "Failed to update tutorial status",
        variant: "destructive",
      })
    }
  }

  const filteredTutorials = tutorials.filter(
    (tutorial) =>
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleSelectAll = () => {
    if (selectedTutorials.length === filteredTutorials.length) {
      setSelectedTutorials([])
    } else {
      setSelectedTutorials(filteredTutorials.map((tutorial) => tutorial.id))
    }
  }

  const toggleSelectTutorial = (id) => {
    if (selectedTutorials.includes(id)) {
      setSelectedTutorials(selectedTutorials.filter((tutorialId) => tutorialId !== id))
    } else {
      setSelectedTutorials([...selectedTutorials, id])
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

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Beginner
          </Badge>
        )
      case "intermediate":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Intermediate
          </Badge>
        )
      case "advanced":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            Advanced
          </Badge>
        )
      default:
        return <Badge variant="outline">{difficulty}</Badge>
    }
  }

  return (
    <AdminShell>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Tutorials</h2>
          <Button onClick={() => router.push("/admin/content/tutorials/new")}>
            <Plus className="mr-2 h-4 w-4" /> New Tutorial
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
                    placeholder="Search tutorials..."
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
                  {selectedTutorials.length > 0 && (
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
                          checked={
                            selectedTutorials.length === filteredTutorials.length && filteredTutorials.length > 0
                          }
                          onCheckedChange={toggleSelectAll}
                          aria-label="Select all"
                        />
                      </TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">Category</TableHead>
                      <TableHead className="hidden md:table-cell">Difficulty</TableHead>
                      <TableHead className="hidden md:table-cell">Status</TableHead>
                      <TableHead className="hidden md:table-cell">Duration</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          Loading tutorials...
                        </TableCell>
                      </TableRow>
                    ) : filteredTutorials.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          No tutorials found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTutorials.map((tutorial) => (
                        <TableRow key={tutorial.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedTutorials.includes(tutorial.id)}
                              onCheckedChange={() => toggleSelectTutorial(tutorial.id)}
                              aria-label={`Select ${tutorial.title}`}
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              {tutorial.thumbnail_url ? (
                                <div className="w-10 h-10 mr-3 rounded overflow-hidden">
                                  <img
                                    src={tutorial.thumbnail_url || "/placeholder.svg"}
                                    alt={tutorial.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="w-10 h-10 mr-3 rounded bg-muted flex items-center justify-center">
                                  <Video className="h-5 w-5 text-muted-foreground" />
                                </div>
                              )}
                              <div>
                                <div>{tutorial.title}</div>
                                <div className="text-sm text-muted-foreground md:hidden">
                                  {getStatusBadge(tutorial.status)}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {tutorial.tutorial_categories?.name || "Uncategorized"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {getDifficultyBadge(tutorial.difficulty)}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{getStatusBadge(tutorial.status)}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {tutorial.duration_minutes ? `${tutorial.duration_minutes} min` : "—"}
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
                                  <Link href={`/admin/content/tutorials/edit/${tutorial.id}`}>
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/tutorials/${tutorial.slug}`} target="_blank">
                                    <Eye className="mr-2 h-4 w-4" /> View
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setTutorialToDelete(tutorial)
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
            <DialogTitle>Delete Tutorial</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{tutorialToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => handleDelete(tutorialToDelete?.id)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminShell>
  )
}

