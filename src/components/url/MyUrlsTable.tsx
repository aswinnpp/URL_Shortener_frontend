import { useState } from "react";
import toast from "react-hot-toast";
import {
  Copy,
  ExternalLink,
  Trash2,
  Pencil,
  Plus,
  Link2,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMyUrls } from "@/hooks/useMyUrls";
import { urlService } from "@/services/url.service";

import DeleteDialog from "@/components/common/DeleteDialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  createUrlSchema,
  CreateUrlFormData,
} from "@/validation/url.schema";

import type { Url } from "@/types/url";

export default function MyUrlsTable() {
  const { urls, loading, refetch, search,
    setSearch,
    page,
    setPage,
    totalPages,
  } = useMyUrls();

  
console.log(totalPages);

  const [open, setOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [editingUrl, setEditingUrl] =
    useState<Url | null>(null);

  // ---------------- Create Form ----------------

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUrlFormData>({
    resolver: zodResolver(createUrlSchema),
  });



  // ---------------- Edit Form ----------------

  const {
    register: registerEdit,
    handleSubmit: handleEditSubmit,
    reset: resetEdit,
    formState: { errors: editErrors },
  } = useForm<CreateUrlFormData>({
    resolver: zodResolver(createUrlSchema),
  });

  const createUrl = async (
    data: CreateUrlFormData
  ) => {
    try {
      await urlService.create(data);

      toast.success("Short URL created.");

      reset();

      setOpen(false);

      refetch();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
        "Failed to create URL."
      );
    }
  };

  const openEditDialog = (url: Url) => {
    setEditingUrl(url);

    resetEdit({
      originalUrl: url.originalUrl,
    });

    setEditOpen(true);
  };

  const updateUrl = async (
    data: CreateUrlFormData
  ) => {
    if (!editingUrl) return;

    try {
      await urlService.updateUrl(
        editingUrl.id,
        data
      );

      toast.success("URL updated.");

      setEditOpen(false);

      setEditingUrl(null);

      refetch();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
        "Update failed."
      );
    }
  };

  const deleteUrl = async (id: string) => {
    try {
      await urlService.deleteUrl(id);

      toast.success("URL deleted successfully.");
      if (urls.length === 1 && page > 1) {
        setPage(page - 1);
      }else{
 refetch();
      }

     
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
        "Failed to delete URL."
      );
    }
  };

  const copy = async (shortUrl: string) => {
    await navigator.clipboard.writeText(shortUrl);

    toast.success("Short URL copied.");
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>My URLs</CardTitle>

            <CardDescription>
              Manage all your shortened URLs.
            </CardDescription>
          </div>

          <Dialog
            open={open}
            onOpenChange={setOpen}
          >
            <DialogTrigger >
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New URL
              </Button>
            </DialogTrigger>

            <Input
              placeholder="Search URLs..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-72"
            />

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Create Short URL
                </DialogTitle>
              </DialogHeader>

              <form
                onSubmit={handleSubmit(createUrl)}
                className="space-y-4"
              >
                <div>
                  <Label>Original URL</Label>

                  <Input
                    placeholder="https://example.com"
                    {...register("originalUrl")}
                  />

                  {errors.originalUrl && (
                    <p className="mt-1 text-sm text-red-500">
                      {
                        errors.originalUrl
                          .message
                      }
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                >
                  <Link2 className="mr-2 h-4 w-4" />
                  Create URL
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          {urls.length === 0 ? (
            <div className="rounded-lg border border-dashed py-16 text-center">
              <h3 className="text-lg font-semibold">
                No URLs Found
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Create your first shortened URL
                to see it here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      Short URL
                    </TableHead>

                    <TableHead className="text-center">
                      Clicks
                    </TableHead>

                    <TableHead>
                      Created
                    </TableHead>

                    <TableHead className="text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {urls.map((url) => (
                    <TableRow
                      key={url.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell>
                        <a
                          href={url.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                        >
                          {url.shortUrl}

                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </TableCell>

                      <TableCell className="text-center">
                        {url.clicks}
                      </TableCell>

                      <TableCell>
                        {new Date(
                          url.createdAt
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </TableCell>

                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() =>
                              openEditDialog(url)
                            }
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>

                          <DeleteDialog
                            title="Delete URL"
                            description="This action cannot be undone. The shortened URL will be permanently deleted."
                            onConfirm={() =>
                              deleteUrl(url.id)
                            }
                          >
                            <Button
                              size="icon"
                              variant="destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </DeleteDialog>

                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() =>
                              copy(url.shortUrl)
                            }
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {totalPages > 1 && (
  <div className="mt-6 flex items-center justify-between">
    <Button
      variant="outline"
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
    >
      Previous
    </Button>

    <span className="text-sm text-muted-foreground">
      Page {page} of {totalPages}
    </span>

    <Button
      variant="outline"
      disabled={page === totalPages}
      onClick={() => setPage(page + 1)}
    >
      Next
    </Button>
  </div>
)}
              
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}

      <Dialog
        open={editOpen}
        onOpenChange={setEditOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit URL
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleEditSubmit(
              updateUrl
            )}
            className="space-y-4"
          >
            <div>
              <Label>Original URL</Label>

              <Input
                {...registerEdit(
                  "originalUrl"
                )}
              />

              {editErrors.originalUrl && (
                <p className="text-sm text-red-500">
                  {
                    editErrors.originalUrl
                      .message
                  }
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
            >
              Save Changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}