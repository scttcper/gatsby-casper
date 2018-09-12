import * as React from 'react'
import styled from 'react-emotion'

const StyledLayoutMain = styled.main`
  z-index: 100;
  flex-grow: 1;
  position: relative;
  padding: 0 4vw;
`

interface LayoutMainProps {
  className?: string
}

const LayoutMain: React.SFC<LayoutMainProps> = ({ children, className }) => (
  <StyledLayoutMain className={className}>{children}</StyledLayoutMain>
)

export default LayoutMain
