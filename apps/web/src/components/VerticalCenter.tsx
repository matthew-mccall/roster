import React from 'react';

interface VerticalCenterProps {
  children?: React.ReactNode;
}

export default function VerticalCenter({ children, ...props }: VerticalCenterProps) {
  return (
    <div className={"d-flex align-items-center flex-grow-1"}>
      <div className={"w-100"} {...props}>
        {children}
      </div>
    </div>
  )
}
