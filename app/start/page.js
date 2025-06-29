"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useClinic } from "@/hooks/useClinic";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function StartTrial() {
  const router = useRouter();
  const search = useSearchParams();
  const { dispatch } = useClinic();

  /* reset wizard every time we arrive here */
  useEffect(() => {
    dispatch({ type: "RESET" });
  }, [dispatch]);

  /* handle OAuth callback → jump into wizard */
  useEffect(() => {
    if (search.get("google_auth") === "success") {
      // tokens come back as query params
      const refresh_token = search.get("refresh_token");
      const calendar_id = search.get("calendar_id");

      if (refresh_token && calendar_id) {
        dispatch({
          type: "UPDATE_DATA",
          payload: {
            gcal_refresh_token: refresh_token,
            gcal_id: calendar_id,
          },
        });
        toast.success("Google Calendar connected");
        router.replace("/wizard/1"); // go to Clinic Basics
      }
    }
  }, [search, dispatch, router]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Connect Google Calendar to begin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <GoogleAuthButton />
        </CardContent>
      </Card>
    </div>
  );
}
