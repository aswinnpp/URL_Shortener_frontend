import toast from "react-hot-toast";
import { Copy, ExternalLink, Trash2 } from "lucide-react";

import { useMyUrls } from "@/hooks/useMyUrls";
import { urlService } from "@/services/url.service";

import DeleteDialog from "@/components/common/DeleteDialog";

import { Button } from "@/components/ui/button";

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

export default function MyUrlsTable() {
  const {
    urls,
    loading,
    refetch,
  } = useMyUrls();
console.log(
  'ss',urls
);

  const copy = async (shortUrl: string) => {
    await navigator.clipboard.writeText(shortUrl);

    toast.success("Short URL copied.");
  };

  const deleteUrl = async (id: string) => {
    try {
      await urlService.deleteUrl(id);

      toast.success("URL deleted successfully.");

      refetch();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to delete URL."
      );
    }
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
      <CardHeader>
        <CardTitle>My URLs</CardTitle>

        <CardDescription>
          Manage all your shortened URLs.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {urls.length === 0 ? (
          <div className="rounded-lg border border-dashed py-16 text-center">
            <h3 className="text-lg font-semibold">
              No URLs Found
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Create your first shortened URL to see it here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>

                  <TableHead>Short URL</TableHead>

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
          </div>
        )}
      </CardContent>
    </Card>
    </div>
  );
}