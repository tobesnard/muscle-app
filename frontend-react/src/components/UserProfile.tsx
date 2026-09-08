// components/UserProfile.tsx
import { useConfig } from '../context/ConfigContext';

export function UserProfile() {
  const { getValue, loading } = useConfig();

  if (loading) return <div>Chargement...</div>;

  const appName = getValue<string>('app.name');

  return (
    <div>
      <p>Bienvenue {appName}</p>
    </div>
  );
}