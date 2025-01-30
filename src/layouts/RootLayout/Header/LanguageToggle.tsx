import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"
import { Emoji } from "src/components/Emoji"
import useLanguage from "src/hooks/useLanguage"

type Props = {}

const LanguageToggle: React.FC<Props> = () => {
  const router = useRouter()
  const { language, setLanguage } = useLanguage()
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleComplete = () => setIsLoading(false)

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleComplete)
    router.events.on("routeChangeError", handleComplete)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleComplete)
      router.events.off("routeChangeError", handleComplete)
    }
  }, [router])

  const handleClick = () => {
    const newLanguage = language === "en" ? "ko" : "en"
    setLanguage(newLanguage)
    setIsLoading(true)
    router.push({
      query: {
        ...router.query,
        category: newLanguage,
      },
    })
  }

  return (
    <StyledWrapper onClick={handleClick}>
      {isLoading ? (
        <LoadingSpinner>⌛</LoadingSpinner>
      ) : (
        <Emoji>{language === "en" ? "🇬🇧" : "🇰🇷"}</Emoji>
      )}
    </StyledWrapper>
  )
}

export default LanguageToggle

const StyledWrapper = styled.div`
  cursor: pointer;
`

const LoadingSpinner = styled.div`
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
