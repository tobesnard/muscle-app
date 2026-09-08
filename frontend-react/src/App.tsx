// App.tsx
import { ConfigProvider } from './context/ConfigContext';
import { ThemeColors } from './components/ThemeColors';
import { Title } from './components/Title';

export default function App() {
  return (
    <ConfigProvider>
      <ThemeColors>
        <Title />
      </ThemeColors>
    </ConfigProvider>
  );
}
