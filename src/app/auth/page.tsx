import SignInPageContent from "@/components/auth/SignInPageContent"
import { createClient } from "@/lib/supabaseServer"
import { redirect } from "next/navigation"

const SignInPage = async () => {
  const supabase = await createClient()

  const { data } = await supabase.auth.getUser()

  if (!!data.user) {
    redirect("/dashboard")
  }

  return <SignInPageContent />
}

export default SignInPage
