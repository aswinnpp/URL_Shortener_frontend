import { useState } from "react";
import { Copy, ExternalLink, Link2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

import { urlService } from "@/services/url.service";

import {
    createUrlSchema,
    CreateUrlFormData,
} from "@/validation/url.schema";

import { CreateUrlResponse } from "@/types/url";

export default function CreateUrlForm() {
    const [loading, setLoading] = useState(false);

    const [result, setResult] =
        useState<CreateUrlResponse | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateUrlFormData>({
        resolver: zodResolver(createUrlSchema),
    });

    const onSubmit = async (
        data: CreateUrlFormData
    ) => {
        try {
            setLoading(true);

            const response =
                await urlService.create(data);

            setResult(response);

            toast.success("Short URL created");

            reset();
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ??
                "Failed to create URL"
            );
        } finally {
            setLoading(false);
        }
    };

    const copyUrl = async () => {
        if (!result) return;

        await navigator.clipboard.writeText(
            result.shortUrl
        );

        toast.success("Copied to clipboard");
    };

    return (
        <div className="mx-auto max-w-3xl">

            <Card className="p-8">

                <h1 className="mb-6 text-2xl font-bold">
                    Create Short URL
                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <div>
                        <Label>Original URL</Label>

                        <Input
                            placeholder="https://example.com"
                            {...register("originalUrl")}
                        />

                        {errors.originalUrl && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.originalUrl.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        <Link2 className="mr-2 h-4 w-4" />

                        {loading
                            ? "Creating..."
                            : "Create Short URL"}
                    </Button>

                </form>

            </Card>

            {result && (

                <Card className="mt-8 space-y-5 p-6">

                    <div>
                        <p className="text-sm text-gray-500">
                            Original URL
                        </p>

                        <p className="break-all font-medium">
                            {result.originalUrl}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Short URL
                        </p>

                        <p className="break-all font-medium text-blue-600">
                            {result.shortUrl}
                        </p>
                    </div>

                    <div className="flex gap-3">

                        <Button
                            type="button"
                            onClick={copyUrl}
                        >
                            <Copy className="mr-2 h-4 w-4" />

                            Copy
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                window.open(result.shortUrl, "_blank")
                            }
                        >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Open
                        </Button>
                    </div>

                </Card>

            )}

        </div>
    );
}