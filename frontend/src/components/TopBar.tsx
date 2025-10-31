import { Search, Bell } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { roleLabel } from '../utils/roleLabel';
import avatarImage from '../assets/avatar.jpg';

export default function TopBar() {
  const { user, role } = useAuthStore();
  const navigate = useNavigate();

  const name = user?.userProfile?.fullName ?? user?.name ?? 'Usuario';
  const avatar = user?.avatarUrl ?? '/default-avatar.png';
  const roleText = roleLabel(role ?? '');

  return (
    <header className="sticky top-0 z-30 mb-4 bg-[#a2adff6e] backdrop-blur-md border-b border-[var(--color-secondary)] flex items-center justify-end px-4 sm:px-6 py-2 sm:py-3 rounded-b-2xl">
      <div className="flex items-center space-x-3 sm:space-x-4">
        <button
          type="button"
          title="Buscar"
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--color-secondary)] transition-colors duration-200"
        >
          <Search size={18} className="text-[var(--color-secondary-hover)]" />
        </button>

        <div className="relative">
          <button
            type="button"
            title="Notificaciones"
            className="w-9 h-9  rounded-full flex items-center justify-center hover:bg-[var(--color-secondary)] transition-colors duration-200"
          >
            <Bell size={18} className="text-[var(--color-secondary-hover)]" />
          </button>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF2D2D] rounded-full" />
        </div>

        <button
          type="button"
          title="Ir al perfil"
          onClick={() => navigate('/profile')}
          className="flex items-center space-x-3 hover:bg-[var(--color-secondary-bg)] transition-colors duration-200 rounded-lg px-2 py-1"
        >
          <img
            src={avatarImage}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover border border-[var(--color-accent)]"
          />
          <div className="hidden sm:block text-left">
            <div className="font-poppins font-semibold text-sm text-[var(--color-primary)] truncate max-w-[140px]">
              {name}
            </div>
          <div className="font-inter text-xs text-[var(--color-text)]">
              {roleText}
          </div>
        </div>
    </button>
      </div>
    </header>
  );
}


