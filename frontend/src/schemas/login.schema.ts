import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "El email es obligatorio").email("Ingresá un email válido"),
  password: z.string().min(5, "La contraseña debe tener al menos 5 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;




