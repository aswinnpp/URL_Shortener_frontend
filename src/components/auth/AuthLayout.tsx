import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            {title}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {subtitle}
          </p>
        </div>

        {children}
      </Card>
    </div>
  );
}