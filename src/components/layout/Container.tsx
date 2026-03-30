import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={className}
      style={{
        maxWidth: "var(--l-container-max, 1280px)",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      {children}
    </div>
  );
}
