import { useUserProfile } from '../hooks/useUserProfile';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';
import { Layout, Navbar, Card, Footer, Loading } from '../components/ui';
import SectionAccount from '../components/account/SectionAccount';
import SectionProfile from '../components/account/SectionProfile';
import Tabs from '../components/ui/Tabs';

type TabKey = 'account' | 'profile';

type AccountProps = {
  initialTab?: TabKey;
};

const Account = ({ initialTab = 'account' }: AccountProps) => {
  const { user } = useAuthStore();
  const { data: profile, isLoading } = useUserProfile();
  // const [activeTab, setActiveTab] = useState<TabKey>(initialTab);


  if (isLoading || !profile) {
    return (
      <Loading fullScreen text="Cargando cuenta..." />
    );
  }

  return (
    <Layout>
      <Navbar />
      <Tabs 
        initialTab={initialTab}
        tabs={[
          {
            key: 'account',
            label: 'Cuenta',
            content: <SectionAccount email={user?.email ?? ''} />
          },
          {
            key: 'profile',
            label: 'Perfil',
            content: <SectionProfile profile={profile} />
          }
        ]}
      />

    </Layout>
  );
};

export default Account;