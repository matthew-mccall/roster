import { NavLinkProps, Stack } from 'react-bootstrap';
import React from 'react';

export const  IconedNavLink = React.forwardRef(({ icon, children, ...props }: { icon: string  } & NavLinkProps, ref) => {
  return (
    <a {...props}>
      <Stack className="text-center">
        <i className={icon} />
        <small>{children}</small>
      </Stack>
    </a>
  )
})
