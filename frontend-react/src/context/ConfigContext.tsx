// context/ConfigContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ConfigService } from '../services/configService';

interface ConfigContextType {
    config: Record<string, unknown> | null;
    loading: boolean;
    getValue: <T>(path: string) => T | undefined;
}

const ConfigContext = createContext<ConfigContextType | null>(null);

const API_URL = import.meta.env.VITE_API_URL || '';
const configService = ConfigService.getInstance(API_URL);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [config, setConfig] = useState<Record<string, unknown> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        configService
            .loadConfig()
            .then((data) => setConfig(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const getValue = <T,>(path: string): T | undefined => {
        if (!config) return undefined;

        let value: unknown = config;
        for (const key of path.split('.')) {
            if (typeof value !== 'object' || value === null || !(key in value)) {
                return undefined;
            }
            value = (value as Record<string, unknown>)[key];
        }
        return value as T;
    };

    return (
        <ConfigContext.Provider value={{ config, loading, getValue }
        }>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error('useConfig doit être utilisé au sein d\'un ConfigProvider');
    }
    return context;
};