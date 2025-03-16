"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdminShell } from "@/components/admin/admin-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Upload, MoreHorizontal, Edit, Trash2, Copy, Download, ImageIcon } from "lucide-react"
import { supabase } from "@/lib/supabase"
import Image from "next/image"
import { format } from "date-fns"

type MediaItem = {
  id: string
  name: string
  file_path: string
  file_url: string
  file_type: string
  file_size: number
  width?: number
  height?: number
  alt_text?: string
  created_at: string
  bucket: string
}

export default function MediaLibraryPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [uploadFiles, setUploadFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [editForm, setEditForm] = useState({
    name: "",
    alt_text: "",
  })
  const [activeTab, setActiveTab] = useState("all")
  const [buckets, setBuckets] = useState<string[]>([])

  useEffect(() => {
    fetchMedia()
  }, [searchQuery, activeTab])

  const fetchMedia = async () => {
    try {
      setLoading(true)

      // Get list of buckets
      const { data: bucketsData, error: bucketsError } = await supabase.storage.listBuckets()

      if (bucketsError) throw bucketsError

      const bucketNames = bucketsData.map((bucket) => bucket.name)
      setBuckets(bucketNames)

      const allMedia: MediaItem[] = []

      // Filter buckets based on active tab
      const bucketsToFetch = activeTab === "all" ? bucketNames : [activeTab]

      // Fetch files from each bucket
      for (const bucket of bucketsToFetch) {
        const { data, error } = await supabase.storage.from(bucket).list()

        if (error) {
          console.error(`Error fetching from bucket ${bucket}:`, error)
          continue
        }

        if (!data) continue

        // Get file details and URLs
        const bucketItems = await Promise.all(
          data
            .filter((item) => !item.id.endsWith("/")) // Filter out folders
            .map(async (item) => {
              const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(item.name)

              // Get file metadata if available
              let metadata = {}
              try {
                const { data: metaData, error: metaError } = await supabase
                  .from("media_metadata")
                  .select("*")
                  .eq("file_path", `${bucket}/${item.name}`)
                  .single()

                if (!metaError && metaData) {
                  metadata = metaData
                }
              } catch (err) {
                console.error("Error fetching metadata:", err)
              }

              return {
                id: item.id,
                name: item.name,
                file_path: `${bucket}/${item.name}`,
                file_url: urlData.publicUrl,
                file_type: item.metadata?.mimetype || item.name.split(".").pop() || "unknown",
                file_size: item.metadata?.size || 0,
                created_at: item.created_at || new Date().toISOString(),
                bucket,
                ...metadata,
              }
            }),
        )

        allMedia.push(...bucketItems)
      }

      // Filter by search query if provided
      const filteredMedia = searchQuery
        ? allMedia.filter(
            (item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (item.alt_text && item.alt_text.toLowerCase().includes(searchQuery.toLowerCase())),
          )
        : allMedia

      // Sort by date, newest first
      filteredMedia.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

      setMediaItems(filteredMedia)
    } catch (error) {
      console.error("Error fetching media:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchMedia()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    const files = Array.from(e.target.files)
    setUploadFiles(files)
  }

  const handleUpload = async () => {
    if (uploadFiles.length === 0) return

    try {
      setUploading(true)
      setUploadProgress(0)

      const bucket = activeTab === "all" ? "product-images" : activeTab

      for (let i = 0; i < uploadFiles.length; i++) {
        const file = uploadFiles[i]
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`

        // Upload file
        const { error: uploadError } = await supabase.storage.from(bucket).upload(fileName, file)

        if (uploadError) throw uploadError

        // Get public URL
        const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName)

        // Store metadata
        await supabase.from("media_metadata").insert([
          {
            file_path: `${bucket}/${fileName}`,
            name: file.name,
            file_type: file.type,
            file_size: file.size,
            alt_text: file.name.split(".")[0].replace(/-/g, " "),
            bucket,
          },
        ])

        // Update progress
        setUploadProgress(Math.round(((i + 1) / uploadFiles.length) * 100))
      }

      // Refresh media list
      await fetchMedia()
      setUploadDialogOpen(false)
      setUploadFiles([])
    } catch (error) {
      console.error("Error uploading files:", error)
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (item: MediaItem) => {
    setSelectedItem(item)
    setEditForm({
      name: item.name,
      alt_text: item.alt_text || "",
    })
    setEditDialogOpen(true)
  }

  const saveEdit = async () => {
    if (!selectedItem) return

    try {
      // Update metadata
      await supabase.from("media_metadata").upsert([
        {
          file_path: selectedItem.file_path,
          name: editForm.name,
          alt_text: editForm.alt_text,
          bucket: selectedItem.bucket,
        },
      ])

      // Refresh media list
      await fetchMedia()
      setEditDialogOpen(false)
    } catch (error) {
      console.error("Error updating metadata:", error)
    }
  }

  const confirmDelete = (item: MediaItem) => {
    setSelectedItem(item)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!selectedItem) return

    try {
      // Delete file
      const { error } = await supabase.storage.from(selectedItem.bucket).remove([selectedItem.name])

      if (error) throw error

      // Delete metadata
      await supabase.from("media_metadata").delete().eq("file_path", selectedItem.file_path)

      // Refresh media list
      await fetchMedia()
      setDeleteDialogOpen(false)
    } catch (error) {
      console.error("Error deleting file:", error)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("URL copied to clipboard!")
      })
      .catch((err) => {
        console.error("Failed to copy:", err)
      })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <AdminShell>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Media Library</h1>
          <Button onClick={() => setUploadDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <form onSubmit={handleSearch} className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search media..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Media</TabsTrigger>
            {buckets.map((bucket) => (
              <TabsTrigger key={bucket} value={bucket}>
                {bucket
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
                  <p className="text-sm text-muted-foreground">Loading media...</p>
                </div>
              </div>
            ) : mediaItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No media found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery ? "Try a different search term" : "Upload some files to get started"}
                </p>
                <Button onClick={() => setUploadDialogOpen(true)}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Files
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {mediaItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative aspect-square bg-muted">
                      {item.file_type.startsWith("image/") ? (
                        <Image
                          src={item.file_url || "/placeholder.svg"}
                          alt={item.alt_text || item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-muted">
                          <div className="flex flex-col items-center text-muted-foreground">
                            <ImageIcon className="h-8 w-8 mb-2" />
                            <span className="text-xs">{item.file_type.split("/")[1]?.toUpperCase()}</span>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleEdit(item)}>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => copyToClipboard(item.file_url)}>
                              <Copy className="mr-2 h-4 w-4" />
                              <span>Copy URL</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <a href={item.file_url} download target="_blank" rel="noopener noreferrer">
                                <Download className="mr-2 h-4 w-4" />
                                <span>Download</span>
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => confirmDelete(item)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <p className="text-sm font-medium truncate" title={item.name}>
                        {item.name}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-muted-foreground">{formatFileSize(item.file_size)}</span>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(item.created_at), "MMM d, yyyy")}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
            <DialogDescription>Upload images and other media files to your library.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="files">Files</Label>
              <Input id="files" type="file" multiple onChange={handleFileChange} disabled={uploading} />
            </div>

            {uploadFiles.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Selected Files:</p>
                <ul className="text-sm space-y-1">
                  {uploadFiles.map((file, index) => (
                    <li key={index} className="flex justify-between">
                      <span className="truncate">{file.name}</span>
                      <span className="text-muted-foreground">{formatFileSize(file.size)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {uploading && (
              <div className="space-y-2">
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${uploadProgress}%` }}></div>
                </div>
                <p className="text-xs text-center text-muted-foreground">Uploading... {uploadProgress}%</p>
              </div>
            )}

            <Select defaultValue={activeTab === "all" ? "product-images" : activeTab}>
              <SelectTrigger>
                <SelectValue placeholder="Select bucket" />
              </SelectTrigger>
              <SelectContent>
                {buckets.map((bucket) => (
                  <SelectItem key={bucket} value={bucket}>
                    {bucket
                      .split("-")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button type="button" variant="secondary" onClick={() => setUploadDialogOpen(false)} disabled={uploading}>
              Cancel
            </Button>
            <Button type="button" onClick={handleUpload} disabled={uploadFiles.length === 0 || uploading}>
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Media</DialogTitle>
            <DialogDescription>Update the details for this media file.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="alt-text">Alt Text</Label>
              <Textarea
                id="alt-text"
                value={editForm.alt_text}
                onChange={(e) => setEditForm({ ...editForm, alt_text: e.target.value })}
                placeholder="Describe this image for accessibility"
              />
              <p className="text-xs text-muted-foreground">Helps with accessibility and SEO</p>
            </div>

            {selectedItem?.file_type.startsWith("image/") && (
              <div className="relative h-40 w-full rounded-md overflow-hidden">
                <Image
                  src={selectedItem.file_url || "/placeholder.svg"}
                  alt={editForm.alt_text || selectedItem.name}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>
          <DialogFooter className="sm:justify-end">
            <Button type="button" variant="secondary" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={saveEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Media</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this media file? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="flex items-center gap-4">
              {selectedItem.file_type.startsWith("image/") ? (
                <div className="relative h-16 w-16 rounded-md overflow-hidden">
                  <Image
                    src={selectedItem.file_url || "/placeholder.svg"}
                    alt={selectedItem.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <div>
                <p className="font-medium">{selectedItem.name}</p>
                <p className="text-sm text-muted-foreground">{formatFileSize(selectedItem.file_size)}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminShell>
  )
}

