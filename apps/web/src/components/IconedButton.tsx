import Button, { ButtonProps } from 'react-bootstrap/Button';
import { Stack } from 'react-bootstrap';

export default function IconedButton({ icon, children, ...props }: { icon: string} & ButtonProps) {
  return (
    <Button {...props}>
      <Stack>
        <i className={icon} />
        <small>{children}</small>
      </Stack>
    </Button>
  )
}
