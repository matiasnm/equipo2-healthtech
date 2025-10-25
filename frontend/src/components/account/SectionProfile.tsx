import { useEffect, useState } from 'react';
import { Card, Input, Button, Select, DatePicker } from '../../components/ui';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { editProfileSchema, EditProfileFormData } from '../../schemas/editProfile.schema';
import type { UserProfile } from '../../types/user.types';
import { updateUserProfile } from '../../services/user';
import { toast } from 'react-toastify';

type SectionProfileProps = {
  profile: UserProfile;
};

const SectionProfile = ({ profile }: SectionProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<EditProfileFormData>({
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

  const onSubmit = async (data: EditProfileFormData) => {
    const merged = {
      fullName: data.fullName || profile.fullName,
      phone: data.phone || profile.phone,
      address: data.address || profile.address,
      gender: data.gender || profile.gender,
      birthday: data.birthday || profile.birthday,
    };
    try {
      await updateUserProfile(merged);
      toast.success('Perfil actualizado');
      setIsEditing(false);
    } catch {
      toast.error('Error al actualizar el perfil');
    }
  };

  const handleCancel = () => {
    reset({
      fullName: profile.fullName ?? '',
      phone: profile.phone ?? '',
      address: profile.address ?? '',
      gender: profile.gender ?? 'OTHER',
      birthday: profile.birthday ?? '',
    });
    setIsEditing(false);
  };

  return (
    <Card className="p-6 sm:p-8 lg:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Datos personales</h3>
        {!isEditing ? (
          <Button variant="accent" onClick={() => setIsEditing(true)}>Editar</Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
            <Button variant="primary" onClick={handleSubmit(onSubmit)}>Guardar</Button>
          </div>
        )}
      </div>

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
          <Input label="Género" value={profile.gender} disabled />
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

        {isEditing && (
          <div className="md:col-span-2 pt-2">
            <Button type="submit" variant="accent" className="w-full md:w-auto">Guardar cambios</Button>
          </div>
        )}
      </form>
    </Card>
  );
};

export default SectionProfile;
