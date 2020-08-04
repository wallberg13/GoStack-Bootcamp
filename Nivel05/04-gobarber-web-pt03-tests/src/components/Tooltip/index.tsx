import React from "react";

import { Container } from "./styles";

/**
 * Para permitir que um componente possa ser personalizado por um componente Pai,
 * o mesmo deve possuir uma propriedade chamada de className
 */
interface TooltipProps {
  title: string;
  className?: string;
}
/**
 * Span usa position absolute, então tanto faz onde que ele fica.
 */
const Tooltip: React.FC<TooltipProps> = ({ className, title, children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
