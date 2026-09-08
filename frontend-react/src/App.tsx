// App.tsx
import { ConfigProvider } from './context/ConfigContext';
import { useThemeColors } from './hooks/useThemeColors';
import { Title } from './components/Title';
import './App.css';

function AppContent() {
  useThemeColors();
  return <Title />;
}

export default function App() {
  return (
    <ConfigProvider>
      <AppContent />
    </ConfigProvider>
  );
}
