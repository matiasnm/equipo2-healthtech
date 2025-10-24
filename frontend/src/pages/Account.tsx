import { useEffect, useState } from 'react';
import { Layout, Navbar, Card, Input, Button, Footer, Select, DatePicker } from '../components/ui';
import { useAuthStore } from '../store/useAuthStore';
import { useUserProfile } from '../hooks/useUserProfile';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { editProfileSchema, EditProfileFormData } from '../schemas/editProfile.schema';
import { updatePasswordSchema, UpdatePasswordFormData } from '../schemas/updatePassword.schema';
import { updateUserPassword, updateUserProfile } from '../services/user';
import { toast } from 'react-toastify';

type TabKey = 'account' | 'profile';

type AccountProps = {
  initialTab?: TabKey;
};

const Account = ({ initialTab = 'account' }: AccountProps) => {
  const { user } = useAuthStore();
  const { data: profile, isLoading } = useUserProfile();
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState<boolean>(() => {
    const stored = localStorage.getItem('mfaEnabled');
    return stored === 'true';
  });
  const [mfaStep, setMfaStep] = useState<'idle' | 'sent' | 'verified'>('idle');

  // Formulario de perfil (datos personales)
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
    },
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
      });
    }
  }, [profile, reset]);

  const onSubmitProfile = async (data: EditProfileFormData) => {
    if (!profile) return;
    const merged = {
      fullName: data.fullName || profile.fullName,
      phone: data.phone || profile.phone,
      address: data.address || profile.address,
      gender: data.gender || profile.gender,
      birthday: data.birthday || profile.birthday,
    };
    try {
      await updateUserProfile(merged);
      toast.success('Datos personales actualizados');
    } catch (e) {
      toast.error('No se pudieron actualizar los datos');
    }
  };

  // Formulario de cuenta (cambiar contraseña, mostrar email)
  const {
    register: registerPwd,
    handleSubmit: handleSubmitPwd,
    formState: { errors: pwdErrors },
    reset: resetPwd
  } = useForm<UpdatePasswordFormData>({ resolver: zodResolver(updatePasswordSchema) });

  const onSubmitPassword = async (data: UpdatePasswordFormData) => {
    try {
      await updateUserPassword(data);
      toast.success('Contraseña actualizada');
      resetPwd();
    } catch (e) {
      toast.error('No se pudo actualizar la contraseña');
    }
  };

  // Mock MFA setup logic
  const handleStartMfa = () => {
    if (!isEditingAccount) return;
    setMfaStep('sent');
    toast.info('Se envió un código de verificación (mock)');
  };

  const handleConfirmMfa = (code: string) => {
    if (!isEditingAccount) return;
    if (code && code.length >= 6) {
      setMfaEnabled(true);
      localStorage.setItem('mfaEnabled', 'true');
      setMfaStep('verified');
      toast.success('MFA activado (mock)');
    } else {
      toast.error('Ingresá un código de 6 dígitos');
    }
  };

  const handleDisableMfa = () => {
    if (!isEditingAccount) return;
    setMfaEnabled(false);
    localStorage.setItem('mfaEnabled', 'false');
    setMfaStep('idle');
    toast.success('MFA desactivado (mock)');
  };

  if (isLoading || !profile) {
    return (
      <Layout>
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto my-8 animate-pulse">
            <div className="h-8 w-56 bg-gray-200 rounded mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="p-6 lg:col-span-2">
                <div className="h-40 bg-gray-100 rounded" />
              </Card>
              <Card className="p-6">
                <div className="h-40 bg-gray-100 rounded" />
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
          {/* Tabs header */}
          <div className="flex items-center gap-2 border-b">
            <button
              className={`px-4 py-2 -mb-px border-b-2 text-sm sm:text-base ${activeTab === 'account' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}
              onClick={() => setActiveTab('account')}
            >
              Cuenta
            </button>
            <button
              className={`px-4 py-2 -mb-px border-b-2 text-sm sm:text-base ${activeTab === 'profile' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}
              onClick={() => setActiveTab('profile')}
            >
              Perfil
            </button>
          </div>

          {/* Content */}
          {activeTab === 'account' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <Card className="p-6 sm:p-8 lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Información de la cuenta</h3>
                  {!isEditingAccount ? (
                    <Button variant="accent" onClick={() => setIsEditingAccount(true)}>Editar</Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={() => setIsEditingAccount(false)}>Cancelar</Button>
                      {/* No hay cambios editables directos aquí por ahora (email es solo lectura) */}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <Input
                    type='email'
                    label="Email"
                    disabled
                    value={user?.email ?? ''}
                  />
                </div>

                {/* MFA mock */}
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Autenticación de dos factores (MFA)</h4>
                    <span className={`text-xs px-2 py-1 rounded ${mfaEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {mfaEnabled ? 'Activada' : 'Desactivada'}
                    </span>
                  </div>
                  {mfaEnabled ? (
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" disabled={!isEditingAccount} onClick={handleDisableMfa}>Desactivar MFA</Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {mfaStep === 'idle' && (
                        <Button variant="accent" disabled={!isEditingAccount} onClick={handleStartMfa}>Configurar MFA (mock)</Button>
                      )}
                      {mfaStep === 'sent' && (
                        <div className="flex items-end gap-2 jus">
                          <Input label="Código" placeholder="123456" onChange={() => { }} />
                          <div className='mb-2'>
                            <Button variant="primary" disabled={!isEditingAccount} onClick={() => handleConfirmMfa('123456')}>Confirmar</Button>
                          </div>
                        </div>
                      )}
                      {mfaStep === 'verified' && (
                        <p className="text-sm text-green-700">MFA activado correctamente.</p>
                      )}
                    </div>
                  )}
                </div>
              </Card>

              <Card className="p-6 sm:p-8 h-fit space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Seguridad</h3>
                </div>

                {/* Cambiar contraseña */}
                <div className="space-y-3">
                  <h4 className="font-medium">Cambiar contraseña</h4>
                  <form onSubmit={handleSubmitPwd(onSubmitPassword)} className="space-y-3">
                    <Input label="Contraseña actual" type="password" disabled={!isEditingAccount} {...registerPwd('oldPassword')} errorMessage={pwdErrors.oldPassword?.message} />
                    <Input label="Nueva contraseña" type="password" disabled={!isEditingAccount} {...registerPwd('newPassword')} errorMessage={pwdErrors.newPassword?.message} />
                    <Button type="submit" variant="primary" className="w-full">Actualizar contraseña</Button>
                  </form>
                </div>


              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <Card className="p-6 sm:p-8 lg:col-span-2">
                <h3 className="text-lg font-semibold mb-4">Datos personales</h3>
                <form onSubmit={handleSubmit(onSubmitProfile)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Input
                      label="Nombre completo"
                      placeholder={profile?.fullName || 'Ej: Juan Pérez'}
                      {...register('fullName')}
                      errorMessage={errors.fullName?.message}
                    />
                  </div>

                  <Input
                    label="Teléfono"
                    placeholder={profile?.phone || 'Ej: +54 11 5555-5555'}
                    {...register('phone')}
                    errorMessage={errors.phone?.message}
                  />

                  <Input
                    label="Dirección"
                    placeholder={profile?.address || 'Ej: Av. Siempre Viva 742'}
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

                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <Input
                      label="Número de documento"
                      value={profile?.identifiers?.[0]?.value ?? ''}
                      disabled
                      className="px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50"
                    />

                    <Input
                      label="Sistema de identificación"
                      value={profile?.identifiers?.[0]?.system ?? ''}
                      disabled
                      className="px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-2 pt-2">
                    <Button type="submit" variant="accent" className="w-full md:w-auto">Guardar cambios</Button>
                  </div>
                </form>
              </Card>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Account;