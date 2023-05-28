import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface DialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  onClickDelegate: (value: any) => void;
  delegateParameter: any;
  color: 'success' | 'error' | 'primary' | 'warning';
  title: string;
  description: string;
}

export const ConfirmDialog = ({
  open,
  setOpen,
  onClickDelegate,
  delegateParameter,
  color,
  title,
  description,
}: DialogProps) => {
  const handleClose = async () => {
    await onClickDelegate(delegateParameter);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            color={color}
            onClick={handleClose}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
