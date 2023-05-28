import { Children, FC, ReactNode, cloneElement, isValidElement } from 'react';
import { BUTTON_RESTRICT_TEXT } from '../../resources/securedBtn/securedButton';
import { useAppSelector } from 'src/app/hooks';
import { Tooltip, Button, ButtonProps } from '@mui/material';

interface SecuredButtonProps extends ButtonProps {
  tooltipMessage?: string;
  createdById: number;
}

type PropsWithChildren<P> = P & { children?: ReactNode };

export const SecuredButton: FC<PropsWithChildren<SecuredButtonProps>> = ({
  children,
  ...props
}) => {
  const mappedChildren = Children.map<ReactNode, ReactNode>(
    children,
    (child) => {
      if (isValidElement(child)) {
        return cloneElement(child, child.props);
      }
    }
  );

  const { tooltipMessage = BUTTON_RESTRICT_TEXT, ...rest } = props;
  const userData = useAppSelector((state) => state.user.userData);
  const isUserAdmin =
    userData.userId === props.createdById || userData.role === 'ADMIN';

  return (
    <Tooltip
      sx={{ width: 'fit-content' }}
      title={isUserAdmin ? '' : tooltipMessage}
    >
      <div>
        <Button {...rest} disabled={!isUserAdmin}>
          {mappedChildren}
        </Button>
      </div>
    </Tooltip>
  );
};
