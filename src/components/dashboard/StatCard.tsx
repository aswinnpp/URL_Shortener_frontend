import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
}

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <Card className="flex items-center justify-between p-6 transition-shadow hover:shadow-lg">
      <div>
        <p className="text-sm text-muted-foreground">
          {title}
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {value}
        </h2>
      </div>

      <div className="rounded-full bg-primary/10 p-4">
        {icon}
      </div>
    </Card>
  );
}