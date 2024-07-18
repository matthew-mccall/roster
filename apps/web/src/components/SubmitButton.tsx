'use client'

import Button, { ButtonProps } from 'react-bootstrap/Button';
import { useFormStatus } from 'react-dom'
import { Spinner, Stack } from 'react-bootstrap';

export default function SubmitButton({ children, ...props }: ButtonProps) {
  const { pending } = useFormStatus()

  if (pending) {
    return (
      <Button {...props} disabled>
        <Stack direction={"horizontal"} gap={3}>
          {children}
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Stack>
      </Button>
    )
  }

  return (
    <Button {...props}>
      {children}
    </Button>
  )
}
