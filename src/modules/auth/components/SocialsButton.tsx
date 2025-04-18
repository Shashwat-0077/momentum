"use client";

import { FcGoogle } from "react-icons/fc";
import { SiNotion } from "react-icons/si";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { envClient } from "@/lib/env/clientEnv";

export default function SocialsButton() {
    const supabase = createClient();

    const redirectUrl = envClient.NEXT_PUBLIC_APP_URL + "/api/auth/callback/";

    const handleGoogleSignIn = () => {
        supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: redirectUrl,
            },
        });
    };

    const handleNotionSignIn = () => {
        supabase.auth.signInWithOAuth({
            provider: "notion",
            options: {
                redirectTo: redirectUrl,
            },
        });
    };

    return (
        <div className="z-50 mt-5 flex gap-5">
            <Button
                className="w-full bg-primary text-foreground"
                onClick={handleGoogleSignIn}
            >
                Sign in with <FcGoogle />
            </Button>
            <Button
                className="w-full bg-foreground text-background hover:bg-foreground-dark"
                onClick={handleNotionSignIn}
            >
                Sign in with <SiNotion />
            </Button>
        </div>
    );
}
