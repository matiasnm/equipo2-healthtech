import { useNavigate } from 'react-router-dom';
import { Layout, Navbar, Card, Input, Button, Footer } from '../components/ui';
import { useUserProfile } from '../hooks/useUserProfile';
import { ROUTES } from '../routes/routes';
import { FiEdit } from 'react-icons/fi';

const Profile = () => {
  const { data: profile, isLoading } = useUserProfile();
  const navigate = useNavigate();

  const identifier = profile?.identifiers?.[0] ?? {
    type: '',
    value: '',
    system: '',
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
      <Card className="max-w-md mx-auto my-8 space-y-4 relative">
        {/* Botón de edición arriba a la derecha */}
        <div className="absolute top-4 right-4">
          <Button
            variant="accent"
            onClick={() => navigate(ROUTES.EDIT_PROFILE)}
            className="flex items-center gap-2"
          >
            <FiEdit />
            Editar
          </Button>
        </div>

        <h2 className="text-xl font-bold">Mi perfil</h2>

        <div className="space-y-4 pt-6">
          <Input
            label="Nombre completo"
            value={profile.fullName}
            disabled
          />

          <Input
            label="Teléfono"
            value={profile.phone}
            disabled
          />

          <Input
            label="Dirección"
            value={profile.address}
            disabled
          />

          <Input
            label="Género"
            value={profile.gender}
            disabled
          />

          <Input
            label="Fecha de nacimiento"
            value={profile.birthday}
            disabled
          />

          <Input
            label="Número de documento"
            value={identifier.value}
            disabled
          />

          <Input
            label="Sistema de identificación"
            value={identifier.system}
            disabled
          />
        </div>
      </Card>
      <Footer />
    </Layout>
  );
};

export default Profile;
