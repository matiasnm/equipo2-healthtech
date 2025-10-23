import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Layout, Navbar, Card, Input, Button, Footer, Select, DatePicker } from '../components/ui';
import { editProfileSchema, EditProfileFormData } from '../schemas/editProfile.schema';
import { updatePasswordSchema, UpdatePasswordFormData } from '../schemas/updatePassword.schema';
import { useUserProfile } from '../hooks/useUserProfile';
import { updateUserProfile, updateUserPassword } from '../services/user';
import { ROUTES } from '../routes/routes';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const { data: profile, isLoading } = useUserProfile();
  const navigate = useNavigate();

  const identifier = profile?.identifiers?.[0] ?? {
    type: '',
    value: '',
    system: '',
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fullName: profile?.fullName ?? '',
      phone: profile?.phone ?? '',
      address: profile?.address ?? '',
      gender: profile?.gender ?? 'OTHER',
      birthday: profile?.birthday ?? '',
      documentType: identifier.type,
      documentValue: identifier.value,
      documentSystem: identifier.system,
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = async (data: EditProfileFormData) => {
    const mergedData = {
    fullName: data.fullName || profile!.fullName,
    phone: data.phone || profile!.phone,
    address: data.address || profile!.address,
    gender: data.gender || profile!.gender,
    birthday: data.birthday || profile!.birthday,
    documentType: data.documentType || identifier.type,
    documentValue: data.documentValue || identifier.value,
    documentSystem: data.documentSystem || identifier.system,
    };
    try {
      await updateUserProfile(mergedData);
      toast.success('Perfil actualizado');
      navigate(ROUTES.PROFILE);
    } catch {
      toast.error('Error al actualizar el perfil');
    }
  };

  const onPasswordSubmit = async (data: UpdatePasswordFormData) => {
    try {
      await updateUserPassword(data);
      toast.success('Contraseña actualizada');
    } catch {
      toast.error('Error al cambiar la contraseña');
    }
  };

  if (isLoading || !profile) {
    return (
      <Layout>
        <Navbar />
        <Card className="max-w-md mx-auto my-8">
          <p>Cargando datos del perfil...</p>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout>
      <Navbar />
      <Card className="max-w-md mx-auto my-8 space-y-4">
        <h2 className="text-xl font-bold">Editar perfil</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Nombre completo"
            placeholder={profile?.fullName}
            defaultValue=""
            {...register('fullName')}
            errorMessage={errors.fullName?.message}
          />

          <Input
            label="Teléfono"
            placeholder={profile?.phone}
            defaultValue=""
            {...register('phone')}
            errorMessage={errors.phone?.message}
          />

          <Input
            label="Dirección"
            placeholder={profile?.address}
            defaultValue=""
            {...register('address')}
            errorMessage={errors.address?.message}
          />

          <Controller
            name="gender"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                label="Género"
                name={field.name}
                value={field.value}
                onChange={field.onChange} 
                onBlur={field.onBlur}
                ref={field.ref}
                errorMessage={fieldState.error?.message}
                options={[
                  { label: `Actual: ${field.value}`, value: '' },
                  { label: 'Femenino', value: 'FEMALE' },
                  { label: 'Masculino', value: 'MALE' },
                  { label: 'Otro', value: 'OTHER' },
                ]}
              />
            )}
          />


          <Controller
            name="birthday"
            control={control}
            render={({ field, fieldState }) => (
              <DatePicker
                label="Fecha de nacimiento"
                name={field.name}
                value={field.value}
                onChange={field.onChange} 
                onBlur={field.onBlur}
                ref={field.ref}
                errorMessage={fieldState.error?.message}
                placeholder={profile?.birthday}
              />
            )}
          />

          <Input
            label="Número de documento"
            value={profile?.identifiers?.[0]?.value ?? ''}
            disabled
            className="px-3 py-2.5 text-lg font-[var(--font-poppins)] rounded-lg border border-[var(--color-primary)] bg-[var(--color-secondary)] text-bold]"
          />

          <Input
            label="Sistema de identificación"
            value={profile?.identifiers?.[0]?.system ?? ''}
            disabled
            className="px-3 py-2.5 text-lg font-[var(--font-poppins)] rounded-lg border border-[var(--color-primary)] bg-[var(--color-secondary)] text-bold]"
          />

          <Button type="submit" variant="accent" className="w-full">Guardar cambios</Button>
        </form>

        <form onSubmit={handleSubmitPassword(onPasswordSubmit)} className="space-y-4 border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold">Cambiar contraseña</h3>
          <Input label="Contraseña actual" type="password" {...registerPassword('oldPassword')} errorMessage={passwordErrors.oldPassword?.message} />
          <Input label="Nueva contraseña" type="password" {...registerPassword('newPassword')} errorMessage={passwordErrors.newPassword?.message} />
          <Button type="submit" variant="primary" className="w-full">Actualizar contraseña</Button>
        </form>
      </Card>
      <Footer />
    </Layout>
  );
};

export default EditProfile;