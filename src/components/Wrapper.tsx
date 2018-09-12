import * as React from 'react'
import styled from 'react-emotion'

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

interface WrapperProps {
  className?: string
}

const Wrapper: React.SFC<WrapperProps> = ({ children, className }) => (
  <StyledWrapper className={className}>{children}</StyledWrapper>
)

export default Wrapper
