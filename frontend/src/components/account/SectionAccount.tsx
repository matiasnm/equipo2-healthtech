import { useState } from 'react';
import { Card, Input, Button } from '../../components/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePasswordSchema, UpdatePasswordFormData } from '../../schemas/updatePassword.schema';
import { updateUserPassword } from '../../services/user';
import { toast } from 'react-toastify';

type SectionAccountProps = {
    email: string;
};

const SectionAccount = ({ email }: SectionAccountProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [mfaEnabled, setMfaEnabled] = useState<boolean>(() => localStorage.getItem('mfaEnabled') === 'true');
    const [mfaStep, setMfaStep] = useState<'idle' | 'sent' | 'verified'>('idle');
    const [mfaCode, setMfaCode] = useState('');

    const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdatePasswordFormData>({
        resolver: zodResolver(updatePasswordSchema),
    });

    const onSubmitPassword = async (data: UpdatePasswordFormData) => {
        try {
            await updateUserPassword(data);
            toast.success('Contraseña actualizada');
            reset();
        } catch {
            toast.error('No se pudo actualizar la contraseña');
        }
    };

    const handleStartMfa = () => {
        if (!isEditing) return;
        setMfaStep('sent');
        toast.info('Se envió un código de verificación (mock)');
    };

    const handleConfirmMfa = () => {
        if (!isEditing) return;
        if (mfaCode && mfaCode.length >= 6) {
            setMfaEnabled(true);
            localStorage.setItem('mfaEnabled', 'true');
            setMfaStep('verified');
            toast.success('MFA activado (mock)');
        } else {
            toast.error('Ingresá un código de 6 dígitos');
        }
    };

    const handleDisableMfa = () => {
        if (!isEditing) return;
        setMfaEnabled(false);
        localStorage.setItem('mfaEnabled', 'false');
        setMfaStep('idle');
        setMfaCode('');
        toast.success('MFA desactivado (mock)');
    };

    return (
        <>
            <Card className="p-6 sm:p-8 lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Información de la cuenta</h3>
                    {!isEditing ? (
            <Button variant="accent" onClick={() => setIsEditing(true)}>Editar</Button>
          ) : (
            <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancelar</Button>
          )}
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <Input
                        type="email"
                        label="Email"
                        disabled
                        value={email}
                    />
                </div>

                <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Autenticación de dos factores (MFA)</h4>
                        <span className={`text-xs px-2 py-1 rounded ${mfaEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                            {mfaEnabled ? 'Activada' : 'Desactivada'}
                        </span>
                    </div>
                    {mfaEnabled ? (
                        <div className="flex items-center gap-2">
                            <Button variant="secondary" disabled={!isEditing} onClick={handleDisableMfa}>Desactivar MFA</Button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {mfaStep === 'idle' && (
                                <Button variant="accent" disabled={!isEditing} onClick={handleStartMfa}>Configurar MFA (mock)</Button>
                            )}
                            {mfaStep === 'sent' && (
                                <div className="flex items-end gap-2">
                                    <Input label="Código" placeholder="123456" value={mfaCode} onChange={(e: any) => setMfaCode(e.target.value)} />
                                    <div className='mb-2'>
                                        <Button variant="primary" disabled={!isEditing} onClick={handleConfirmMfa}>Confirmar</Button>
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
                    {!isEditing ? (
                        <Button variant="accent" onClick={() => setIsEditing(true)}>Editar</Button>
                    ) : (
                        <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancelar</Button>
                    )}
                </div>

                {/* Cambiar contraseña */}
                <div className="space-y-3">
                    <h4 className="font-medium">Cambiar contraseña</h4>
                    <form onSubmit={handleSubmit(onSubmitPassword)} className="space-y-3">
                        <Input label="Contraseña actual" type="password" disabled={!isEditing} {...register('oldPassword')} errorMessage={errors.oldPassword?.message} />
                        <Input label="Nueva contraseña" type="password" disabled={!isEditing} {...register('newPassword')} errorMessage={errors.newPassword?.message} />
                        <Button type="submit" variant="primary" className="w-full" disabled={!isEditing}>Actualizar contraseña</Button>
                    </form>
                </div>

                {/* MFA mock */}

            </Card>
        </>
    );
};

export default SectionAccount;
