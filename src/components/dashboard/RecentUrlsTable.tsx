import { UrlItem } from "@/types/url";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  urls: UrlItem[];
}

export default function RecentUrlsTable({
  urls,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Original URL</TableHead>
          <TableHead>Clicks</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {urls.map((url) => (
          <TableRow key={url.id}>
            <TableCell className="max-w-sm truncate">
              {url.originalUrl}
            </TableCell>

            <TableCell>
              {url.clicks}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}