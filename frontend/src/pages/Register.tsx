import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLogin } from '../hooks/useLogin';
import { useAuthStore } from "../store/useAuthStore";
import { RegisterPayload } from "../types/user.types";
import { ROUTES } from '../routes/routes';
import { registerSchema, RegisterFormData } from '../schemas/register.schema';
import { useRegister } from '../hooks/useRegister';
import { Card, Input, Button, Layout, Navbar } from '../components/ui';
import { inferRoleFromEmail } from '../utils/auth.utils.ts';

const Register = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<RegisterFormData, 'role'>>({
    resolver: zodResolver(registerSchema.omit({ role: true })),
  });

  const { mutateAsync: registerUser, isPending } = useRegister();
  const { mutateAsync: loginUser } = useLogin(); // login automático

  const onSubmit = async (data: Omit<RegisterFormData, 'role'>) => {
    const role = inferRoleFromEmail(data.email);

    try {
      const payload: RegisterPayload = {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role,
      };

      // Registro
      await registerUser(payload);

      // Login automático
      const response = await loginUser({ email: data.email, password: data.password });
      const { login, user: loggedUser } = response;
      const token = login.token;

      // Guardar sesión
      localStorage.setItem("token", token);
      setToken(token);
      setUser(loggedUser);

      toast.success("Registro exitoso. Completá tu perfil para activar tu cuenta.");

      // Redirección según estado
      if (!loggedUser.status) {
        navigate(ROUTES.PROFILE_SETUP);
      } else {
        navigate(ROUTES.PROFILE);
      }

    } catch (error: any) {
      if (error?.response?.status === 409) {
        toast.error("Este email ya está registrado. Iniciá sesión o usá otro.");
      } else {
        toast.error(error?.message || "Error al registrar");
      }
    }
  };

  return (
    <Layout>
      <Navbar />
      <Card className="max-w-md mx-auto my-8">
        <h2 className="text-xl font-bold mb-4">Crear cuenta</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={!!errors.email}
            errorMessage={errors.email?.message}
            placeholder="ejemplo@correo.com"
          />
          <Input
            label="Contraseña"
            type="password"
            {...register('password')}
            error={!!errors.password}
            errorMessage={errors.password?.message}
            placeholder="******"
          />
          <Input
            label="Repetir contraseña"
            type="password"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
            placeholder="******"
          />
          <Button variant="primary" type="submit" className="w-full mt-4" disabled={isPending}>
            {isPending ? 'Registrando...' : 'Registrarme'}
          </Button>
        </form>
      </Card>
    </Layout>
  );
};

export default Register;




