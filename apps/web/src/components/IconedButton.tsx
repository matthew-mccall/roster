import Button, { ButtonProps } from 'react-bootstrap/Button';
import LabelledIcon from './LabelledIcon';

export default function IconedButton({ icon, children, ...props }: { icon: string} & ButtonProps) {
  return (
    <Button {...props}>
      <LabelledIcon icon={icon}>
        {children}
      </LabelledIcon>
    </Button>
  )
}
