import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { profileSchema, ProfileFormData } from '../schemas/profile.schema';
import { useCreateProfile } from '../hooks/useCreateProfile';
import type { CreateProfilePayload } from '../types/user.types';
import { Input, Layout, Select, Button, Card } from './ui';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes';
import { useAuthStore } from '../store/useAuthStore';


// Mapeo automático del sistema según tipo de documento
const systemByType: Record<string, string> = {
  NATIONAL_ID: 'RENAPER',
  PASSPORT: 'Ministerio del Interior',
  DRIVER_LICENSE: 'Dirección Nacional de Tránsito',
  HEALTH_CARD: '', 
  OTHER: '', 
};


const ProfileSetupForm = () => {
  const { mutateAsync, isPending } = useCreateProfile();
  const { validateSession } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      identifiers: [{ system: '', value: '', type: 'NATIONAL_ID' }],
    },
  });
  
  const selectedType = (watch('identifiers.0.type') ?? 'NATIONAL_ID') as keyof typeof systemByType;

  
  // Actualizacion automática del sistema según tipo de documento
  useEffect(() => {
    const system = systemByType[selectedType] ?? '';
    setValue('identifiers.0.system', system);
  }, [selectedType, setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const { confirmation, ...rest } = data;
      const payload = rest as CreateProfilePayload;
      await mutateAsync(payload);
      toast.success("Perfil actualizado. Tu cuenta ya está activa.");
      await validateSession();
      navigate(ROUTES.PROFILE);
    } catch (error: any) {
      toast.error(error?.message || "Error al actualizar perfil");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto my-8">
          <header className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Completá tu perfil</h2>
            <p className="text-sm text-gray-500 mt-1">Necesitamos algunos datos para activar tu cuenta</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Formulario principal */}
            <Card className="p-6 sm:p-8 lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Input 
                    label="Nombre completo" 
                    placeholder="Ej: Juan Pérez"
                    disabled={isPending}
                    {...register('fullName')} 
                    error={!!errors.fullName} 
                    errorMessage={errors.fullName?.message} 
                  />
                </div>

                <Input 
                  label="Teléfono" 
                  placeholder="Ej: +54 11 5555-5555"
                  disabled={isPending}
                  {...register('phone')} 
                  error={!!errors.phone} 
                  errorMessage={errors.phone?.message} 
                />

                <Input 
                  label="Dirección" 
                  placeholder="Ej: Av. Siempre Viva 742"
                  disabled={isPending}
                  {...register('address')} 
                  error={!!errors.address} 
                  errorMessage={errors.address?.message} 
                />

                <Select
                  label="Género"
                  name="gender"
                  register={register}
                  errorMessage={errors.gender?.message ?? ''}
                  options={[
                    { label: 'Masculino', value: 'MALE' },
                    { label: 'Femenino', value: 'FEMALE' },
                    { label: 'Otro', value: 'OTHER' },
                  ]}
                  variant="simple"
                />

                <Input 
                  label="Fecha de nacimiento" 
                  type="date" 
                  disabled={isPending}
                  {...register('birthday')} 
                  error={!!errors.birthday} 
                  errorMessage={errors.birthday?.message} 
                />

                <Select
                  label="Tipo de documento"
                  name="identifiers.0.type"
                  register={register}
                  errorMessage={errors.identifiers?.[0]?.type?.message ?? ''}
                  options={[
                    { label: 'DNI', value: 'NATIONAL_ID' },
                    { label: 'Pasaporte', value: 'PASSPORT' },
                    { label: 'Licencia de conducir', value: 'DRIVER_LICENSE' },
                    { label: 'Carnet de obra social', value: 'HEALTH_CARD' },
                    { label: 'Otro', value: 'OTHER' },
                  ]}
                  variant="simple"
                /> 

                {selectedType === 'HEALTH_CARD' || selectedType === 'OTHER' ? (
                  <Input
                    label="Sistema de identificación"
                    disabled={isPending}
                    {...register('identifiers.0.system')}
                    error={!!errors.identifiers?.[0]?.system}
                    errorMessage={errors.identifiers?.[0]?.system?.message}
                  />
                ) : ( 
                  <Input
                    label="Sistema de identificación"
                    defaultValue={systemByType[selectedType]}
                    disabled
                  />
                )}

                <Input
                  label="Número de documento"
                  placeholder="Ej: 12.345.678"
                  disabled={isPending}
                  {...register('identifiers.0.value')}
                  error={!!errors.identifiers?.[0]?.value}
                  errorMessage={errors.identifiers?.[0]?.value?.message}
                /> 

                <div className="md:col-span-2">
                  <Input
                    type="checkbox"
                    label="Confirmo que los datos son correctos"
                    disabled={isPending}
                    {...register('confirmation')}
                    error={!!errors.confirmation}
                    errorMessage={errors.confirmation?.message}
                  />
                </div>

                <div className="md:col-span-2 pt-2">
                  <Button type="submit" disabled={isPending} className="w-full md:w-auto">
                    {isPending ? 'Guardando...' : 'Guardar perfil'}
                  </Button>
                </div>
              </form>
            </Card>

            {/* Resumen y ayuda */}
            <Card className="p-6 sm:p-8 h-fit">
              <h3 className="text-lg font-semibold mb-4">Revisá tus datos</h3>
              <div className="bg-gray-50 border rounded-lg p-4 text-sm text-gray-700 space-y-2">
                <p><strong>Nombre completo:</strong> {watch('fullName') || '-'}</p>
                <p><strong>Teléfono:</strong> {watch('phone') || '-'}</p>
                <p><strong>Dirección:</strong> {watch('address') || '-'}</p>
                <p><strong>Género:</strong> {watch('gender') || '-'}</p>
                <p><strong>Fecha de nacimiento:</strong> {watch('birthday') || '-'}</p>
                <p><strong>Tipo de documento:</strong> {watch('identifiers.0.type') || '-'}</p>
                <p><strong>Número de documento:</strong> {watch('identifiers.0.value') || '-'}</p>
                <p><strong>Sistema de identificación:</strong> {watch('identifiers.0.system') || systemByType[selectedType] || '-'}</p>
              </div>

              <div className="mt-4 text-xs text-gray-500 space-y-1">
                <p>• Estos datos se usarán para tus turnos y facturación.</p>
                <p>• Podrás editarlos más adelante desde tu perfil.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileSetupForm;


