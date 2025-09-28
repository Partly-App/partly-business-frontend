import { createClient } from "@/lib/supabaseServer"

export const getCompanyByUser = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error) {
    console.error("Couldn't get user: ", error)
    return null
  }

  const { data: companyData, error: companyError } = await supabase
    .from("employees")
    .select("company:companyId(*)")
    .eq("userId", data.user.id)
    .single()

  if (!companyData || companyError) {
    console.error(
      "Erro getting companyData in getCompanyByUser: ",
      companyError,
    )
    return null
  }

  return companyData.company
}
