// schemas/authSchema.ts
import { z } from 'zod';

export const authSchema = z.object({
	username: z.string().min(1, 'Le nom d\'utilisateur est requis'),
	password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

export type AuthSchema = z.infer<typeof authSchema>;
