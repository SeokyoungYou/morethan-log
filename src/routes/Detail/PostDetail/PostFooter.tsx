import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"

type Props = {
  category: string | undefined
}

const Footer: React.FC<Props> = ({ category }) => {
  const router = useRouter()
  return (
    <StyledWrapper>
      <a
        onClick={() => {
          if (category) {
            router.push({
              pathname: "/",
              query: {
                category: category,
              },
            })
          } else {
            router.push("/")
          }
        }}
      >
        ← Back
      </a>
      <a onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        ↑ Top
      </a>
    </StyledWrapper>
  )
}

export default Footer

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray10};
  a {
    margin-top: 0.5rem;
    cursor: pointer;

    :hover {
      color: ${({ theme }) => theme.colors.gray12};
    }
  }
`
