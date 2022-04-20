import * as React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  display: block;
  position: relative;
  width: 140px;
`;

export interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FunctionComponent<ButtonProps> = ({ children, onClick }: ButtonProps) => (
  <StyledButton onClick={onClick}>
    {children}
  </StyledButton>
)

export default Button