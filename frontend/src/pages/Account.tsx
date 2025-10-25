import { useUserProfile } from '../hooks/useUserProfile';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';
import { Layout, Navbar, Card, Footer } from '../components/ui';
import SectionAccount from '../components/account/SectionAccount';
import SectionProfile from '../components/account/SectionProfile';

type TabKey = 'account' | 'profile';

type AccountProps = {
  initialTab?: TabKey;
};

const Account = ({ initialTab = 'account' }: AccountProps) => {
  const { user } = useAuthStore();
  const { data: profile, isLoading } = useUserProfile();
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);


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
              <SectionAccount email={user?.email ?? ''} />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              {profile && <SectionProfile profile={profile} />}
            </div>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </Layout>
  );
};

export default Account;