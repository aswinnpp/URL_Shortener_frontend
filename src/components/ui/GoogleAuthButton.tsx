import { GoogleLogin } from "@react-oauth/google";
import { Chrome } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth.service";
import { useAuthenticate } from "@/hooks/useAuthenticate";

export default function GoogleAuthButton() {
  const authenticate = useAuthenticate();

  return (
    <div className="space-y-2">
      {/* Hidden Google Button */}
      <div id="google-signin" className="hidden">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            if (!credentialResponse.credential) {
              toast.error("Google authentication failed.");
              return;
            }

            try {
              const response = await authService.googleAuth(
                credentialResponse.credential
              );

              authenticate(response);

              toast.success("Login successful.");
            } catch (error: any) {
              toast.error(
                error?.response?.data?.message ??
                  "Google login failed."
              );
            }
          }}
          onError={() => {
            toast.error("Google authentication failed.");
          }}
        />
      </div>

      {/* Your shadcn Button */}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => {
          const button = document.querySelector(
            "#google-signin div[role='button']"
          ) as HTMLDivElement | null;

          button?.click();
        }}
      >
        <Chrome className="mr-2 h-4 w-4" />

        Continue with Google
      </Button>
    </div>
  );
}