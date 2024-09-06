import { useFormContext } from 'react-hook-form';
import { FormControlLabel, Switch, TextField } from '@mui/material';

export default function ProductCreationForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <TextField
        label='Title'
        variant='outlined'
        {...register('title')}
        error={Boolean(errors.title?.message)}
        helperText={errors.title?.message?.toString()}
      />
      <TextField
        sx={{ marginTop: '10px' }}
        label='Price'
        variant='outlined'
        {...register('price')}
        type='number'
        error={Boolean(errors.price?.message)}
        helperText={errors.price?.message?.toString()}
      />
      <TextField
        sx={{ marginTop: '10px' }}
        label='Description'
        variant='outlined'
        {...register('description')}
        error={Boolean(errors.description?.message)}
        helperText={errors.description?.message?.toString()}
      />

      <FormControlLabel label='Published' control={<Switch {...register('published')} />} />
    </>
  );
}
