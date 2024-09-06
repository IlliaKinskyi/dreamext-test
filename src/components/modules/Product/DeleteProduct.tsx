import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';
import { useAppDispatch } from '../../../store/store';
import { deleteFormProduct } from '../../../store/formProducts/asyncActions';
import { TId } from '../../../store/formProducts/types';
import { useNavigate } from 'react-router-dom';
import { NAV_URL } from '../Content/global';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function DeleteProduct({ id, icon }: TId) {
  const [open, setOpen] = useState(false);
  const dispacth = useAppDispatch();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteProduct = (id: string | number) => {
    dispacth(deleteFormProduct(id));
    navigate(NAV_URL.PRODUCT_PAGE);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>Видалення продукту</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Ви дійсно хочете видалити продукт?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ні</Button>
          <Button onClick={() => handleDeleteProduct(id)} autoFocus>
            Так
          </Button>
        </DialogActions>
      </Dialog>

      {icon ? (
        <Button onClick={handleClickOpen}>
          <DeleteOutlineIcon color='error' />
        </Button>
      ) : (
        <Button
          variant='contained'
          type='button'
          color='error'
          sx={{
            marginTop: '20px',
          }}
          onClick={handleClickOpen}>
          Delete product
        </Button>
      )}
    </>
  );
}
