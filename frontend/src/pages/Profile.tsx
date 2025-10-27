import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Layout, Navbar, Card, Input, Button, Footer, Select, DatePicker } from '../components/ui';
import { useUserProfile } from '../hooks/useUserProfile';
import { ROUTES } from '../routes/routes';
import { FiEdit, FiX, FiSave } from 'react-icons/fi';
import { editProfileSchema, EditProfileFormData } from '../schemas/editProfile.schema';
import { updateUserProfile, updateUserPassword } from '../services/user';
import { updatePasswordSchema, UpdatePasswordFormData } from '../schemas/updatePassword.schema';
import { toast } from 'react-toastify';

const Profile = () => {
  const { data: profile, isLoading } = useUserProfile();
  const navigate = useNavigate();
  const location = useLocation();
  const startsInEdit = useMemo(() => location.pathname.endsWith('/edit'), [location.pathname]);
  const [isEditing, setIsEditing] = useState(startsInEdit);

  // const identifier = profile?.identifiers?.[0] ?? {
  //   type: '',
  //   value: '',
  //   system: '',
  // };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fullName: profile?.fullName ?? '',
      phone: profile?.phone ?? '',
      address: profile?.address ?? '',
      gender: profile?.gender ?? 'OTHER',
      birthday: profile?.birthday ?? '',
      // documentType: identifier.type,
      // documentValue: identifier.value,
      // documentSystem: identifier.system,
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
  });

  useEffect(() => {
    if (profile) {
      const id = profile.identifiers?.[0];
      reset({
        fullName: profile.fullName ?? '',
        phone: profile.phone ?? '',
        address: profile.address ?? '',
        gender: profile.gender ?? 'OTHER',
        birthday: profile.birthday ?? '',
        // documentType: id?.type ?? '',
        // documentValue: id?.value ?? '',
        // documentSystem: id?.system ?? '',
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data: EditProfileFormData) => {
    console.log('EditProfile - onSubmit called with data:', data);
    if (!profile) return;
    const mergedData = {
      fullName: data.fullName || profile.fullName,
      phone: data.phone || profile.phone,
      address: data.address || profile.address,
      gender: data.gender || profile.gender,
      birthday: data.birthday || profile.birthday,
      // documentType: data.documentType || identifier.type,
      // documentValue: data.documentValue || identifier.value,
      // documentSystem: data.documentSystem || identifier.system,
    };
    try {
      await updateUserProfile(mergedData);
      toast.success('Perfil actualizado');
      setIsEditing(false);
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

  const handleCancel = () => {
    if (profile) {
      const id = profile.identifiers?.[0];
      reset({
        fullName: profile.fullName ?? '',
        phone: profile.phone ?? '',
        address: profile.address ?? '',
        gender: profile.gender ?? 'OTHER',
        birthday: profile.birthday ?? '',
        // documentType: id?.type ?? '',
        // documentValue: id?.value ?? '',
        // documentSystem: id?.system ?? '',
      });
    }
    setIsEditing(false);
    navigate(ROUTES.PROFILE);
  };

  const getValue = (value: string)=>{
    switch(value){
      case 'FEMALE':
        return 'Femenino';
      case 'MALE':
        return 'Masculino'; 
      case 'OTHER':
        return 'Otro';
      default:
        return '';
    }
  }

  if (isLoading || !profile) {
    return (
      <Layout>
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto my-8 animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="p-6 lg:col-span-2 space-y-4">
                <div className="h-6 w-40 bg-gray-200 rounded" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="h-12 bg-gray-100 rounded" />
                  <div className="h-12 bg-gray-100 rounded" />
                  <div className="h-12 bg-gray-100 rounded md:col-span-2" />
                  <div className="h-12 bg-gray-100 rounded" />
                  <div className="h-12 bg-gray-100 rounded" />
                  <div className="h-12 bg-gray-100 rounded md:col-span-2" />
                </div>
              </Card>
              <Card className="p-6">
                <div className="h-6 w-56 bg-gray-200 rounded mb-4" />
                <div className="space-y-3">
                  <div className="h-12 bg-gray-100 rounded" />
                  <div className="h-12 bg-gray-100 rounded" />
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </Layout>
    );
  }
  return (
    <Layout>
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto my-8">
          <header className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Mi perfil</h2>
              <p className="text-sm text-gray-500 mt-1">{isEditing ? 'Editá tu información' : 'Tu información personal'}</p>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <Button variant="accent" onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                  <FiEdit /> Editar
                </Button>
              ) : (
                <>
                  <Button variant="secondary" onClick={handleCancel} className="flex items-center gap-2">
                    <FiX /> Cancelar
                  </Button>
                  <Button variant="primary" onClick={handleSubmit(onSubmit)} className="flex items-center gap-2">
                    <FiSave /> Guardar
                  </Button>
                </>
              )}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Datos personales (lectura/edición) */}
            <Card className="p-6 sm:p-8 lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Información personal</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Input
                    label="Nombre completo"
                    placeholder={profile?.fullName || 'Ej: Juan Pérez'}
                    disabled={!isEditing}
                    {...register('fullName')}
                    errorMessage={errors.fullName?.message}
                  />
                </div>

                <Input
                  label="Teléfono"
                  placeholder={profile?.phone || 'Ej: +54 11 5555-5555'}
                  disabled={!isEditing}
                  {...register('phone')}
                  errorMessage={errors.phone?.message}
                />

                <Input
                  label="Dirección"
                  placeholder={profile?.address || 'Ej: Av. Siempre Viva 742'}
                  disabled={!isEditing}
                  {...register('address')}
                  errorMessage={errors.address?.message}
                />

                {isEditing ? (
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Select
                        label="Género"
                        name={field.name}
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={field.onBlur}
                        errorMessage={fieldState.error?.message ?? ''}
                        options={[
                          { label: 'Femenino', value: 'FEMALE' },
                          { label: 'Masculino', value: 'MALE' },
                          { label: 'Otro', value: 'OTHER' },
                        ]}
                        variant="editable"
                        placeholder={profile?.gender}
                      />
                    )}
                  />
                ) : (
                  <Input label="Género" value={getValue(profile.gender)} disabled />
                )}

                {isEditing ? (
                  <Controller
                    name="birthday"
                    control={control}
                    render={({ field, fieldState }) => (
                      <DatePicker
                        label="Fecha de nacimiento"
                        name={field.name}
                        value={field.value ?? ''}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        errorMessage={fieldState.error?.message ?? ''}
                      />
                    )}
                  />
                ) : (
                  <Input label="Fecha de nacimiento" value={profile.birthday} disabled />
                )}

                {/* <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <Input
                    label="Número de documento"
                    value={profile?.identifiers?.[0]?.value ?? ''}

                    className="px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50"
                  />

                  <Input
                    label="Sistema de identificación"
                    value={profile?.identifiers?.[0]?.system ?? ''}

                    className="px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50"
                  />
                </div> */}

                {isEditing && (
                  <div className="md:col-span-2 pt-2">
                    <Button type="submit" variant="accent" className="w-full md:w-auto">Guardar cambios</Button>
                  </div>
                )}
              </form>
            </Card>

            {/* Seguridad: cambiar contraseña */}
            <Card className="p-6 sm:p-8 h-fit">
              <h3 className="text-lg font-semibold mb-4">Seguridad</h3>
              <form onSubmit={handleSubmitPassword(onPasswordSubmit)} className="space-y-4">
                <Input label="Contraseña actual" type="password" {...registerPassword('oldPassword')} errorMessage={passwordErrors.oldPassword?.message} />
                <Input label="Nueva contraseña" type="password" {...registerPassword('newPassword')} errorMessage={passwordErrors.newPassword?.message} />
                <Button type="submit" variant="primary" className="w-full">Actualizar contraseña</Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </Layout>
  );
};

export default Profile;