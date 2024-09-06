import { z } from 'zod';
import { errorMessage } from '../constants/errorMessage';

export type TProductCreationSchema = z.infer<typeof productCreationSchema>;

export const productCreationSchema = z.object({
  title: z.string().min(2, errorMessage.TITLE).max(30, errorMessage.TITLE),
  price: z
    .string()
    .min(1, errorMessage.PRICE)
    .refine((val) => !Number.isNaN(parseInt(val, 10))),
  description: z.string().min(2, errorMessage.DESCRIPTION).max(200, errorMessage.DESCRIPTION),
  published: z.boolean(),
});
