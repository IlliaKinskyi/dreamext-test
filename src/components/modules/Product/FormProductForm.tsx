import { CardContent, Switch, TextField, Typography } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function FormProductForn({ isPublished }: { isPublished: boolean }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <CardContent
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
      }}>
      <TextField
        label='Title'
        variant='outlined'
        {...register('title')}
        error={Boolean(errors.title?.message)}
        helperText={errors.title?.message?.toString()}
        sx={{ marginBottom: '20px' }}
      />

      <TextField
        label='Description'
        variant='outlined'
        {...register('description')}
        error={Boolean(errors.description?.message)}
        helperText={errors.description?.message?.toString()}
        sx={{ marginBottom: '20px' }}
      />

      <TextField
        label='Price'
        variant='outlined'
        {...register('price')}
        error={Boolean(errors.price?.message)}
        helperText={errors.price?.message?.toString()}
        sx={{ marginBottom: '20px' }}
      />
      <Typography
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Switch defaultChecked={isPublished} {...register('published')} />
        Published
      </Typography>
    </CardContent>
  );
}
