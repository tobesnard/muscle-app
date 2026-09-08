// App.tsx
import { ConfigProvider } from './context/ConfigContext';
import { useThemeColors } from './hooks/useThemeColors';
import { Title } from './components/Title';
import { FrontendSwitcher } from './components/FrontendSwitcher';
import './App.css';

function AppContent() {
  useThemeColors();
  return (
    <>
      <div className="flex items-center justify-evenly">
        <Title />
        <FrontendSwitcher />
      </div>
    </>
  );
}

export default function App() {
  return (
    <ConfigProvider>
      <AppContent />
    </ConfigProvider>
  );
}
