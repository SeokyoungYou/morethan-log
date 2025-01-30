import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import { DEFAULT_CATEGORY } from "src/constants"

export default function useLanguage() {
  const router = useRouter()

  const language = `${router.query.category || ``}` || DEFAULT_CATEGORY

  const setLanguage = useCallback(
    (language: "en" | "ko") => {
      router.push({
        query: {
          ...router.query,
          category: language,
        },
      })
    },
    [router]
  )

  return { language, setLanguage }
}
