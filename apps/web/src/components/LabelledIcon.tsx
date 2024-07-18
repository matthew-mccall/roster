import { Stack } from 'react-bootstrap';
import React, { ReactNode } from 'react';

export default function LabelledIcon({ icon, children }: { icon: string, children: ReactNode }) {
  return (
    <Stack className="text-center">
      <i className={icon} />
      <small>{children}</small>
    </Stack>
  )
}
