import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          // Parse cookies from document.cookie
          const pairs = document.cookie.split(";")
          const cookies: { name: string; value: string }[] = []
          for (const pair of pairs) {
            const [name, ...rest] = pair.trim().split("=")
            if (name) {
              cookies.push({ name, value: rest.join("=") })
            }
          }
          return cookies
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            let cookie = `${name}=${value}`
            if (options?.path) cookie += `; path=${options.path}`
            if (options?.maxAge) cookie += `; max-age=${options.maxAge}`
            if (options?.sameSite) cookie += `; samesite=${options.sameSite}`
            if (options?.secure) cookie += `; secure`
            document.cookie = cookie
          })
        },
      },
    }
  )
}
