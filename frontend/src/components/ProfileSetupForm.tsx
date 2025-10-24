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
      <Card className="max-w-md mx-auto my-8">
      <h2 className="text-xl font-bold mb-4">Completá tu perfil</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <Input 
        label="Nombre completo" 
        {...register('fullName')} 
        error={!!errors.fullName} 
        errorMessage={errors.fullName?.message} 
        />

        <Input 
        label="Teléfono" 
        {...register('phone')} 
        error={!!errors.phone} 
        errorMessage={errors.phone?.message} 
        />

        <Input 
        label="Dirección" 
        {...register('address')} 
        error={!!errors.address} 
        errorMessage={errors.address?.message} 
        />

        <Select
          label="Género"
          name="gender"
          register={register}
          errorMessage={errors.gender?.message}
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
        {...register('birthday')} 
        error={!!errors.birthday} 
        errorMessage={errors.birthday?.message} 
        />

        <Select
          label="Tipo de documento"
          name="identifiers.0.type"
          register={register}
          errorMessage={errors.identifiers?.[0]?.type?.message}
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
            {...register('identifiers.0.value')}
            error={!!errors.identifiers?.[0]?.value}
            errorMessage={errors.identifiers?.[0]?.value?.message}
      /> 



      {/*Resumen visual del perfil */}
      <div className="bg-gray-50 border rounded-lg p-4 text-sm text-gray-700 space-y-2">
        <p><strong>Nombre completo:</strong> {watch('fullName')}</p>
        <p><strong>Teléfono:</strong> {watch('phone')}</p>
        <p><strong>Dirección:</strong> {watch('address')}</p>
        <p><strong>Género:</strong> {watch('gender')}</p>
        <p><strong>Fecha de nacimiento:</strong> {watch('birthday')}</p>

        <p><strong>Tipo de documento:</strong> {watch('identifiers.0.type')}</p>
        <p><strong>Número de documento:</strong> {watch('identifiers.0.value')}</p>
        <p><strong>Sistema de identificación:</strong> {watch('identifiers.0.system')}</p>
      </div>


      <Input
        type="checkbox"
        label="Confirmo que los datos son correctos"
        {...register('confirmation')}
        error={!!errors.confirmation}
        errorMessage={errors.confirmation?.message}
      />

  

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Guardando...' : 'Guardar perfil'}
        </Button>
      </form>
    </Card>
  </Layout>
  );
};

export default ProfileSetupForm;


