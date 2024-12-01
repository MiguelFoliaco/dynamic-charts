import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export const validateSession = async () => {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }
}