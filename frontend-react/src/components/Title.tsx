import { useConfig } from '../context/ConfigContext';

export function Title() {
    const { getValue, loading } = useConfig();

    if (loading) {
        return <div>Loading...</div>;
    }

    const apiUrl = getValue<string>('api.baseUrl');
    const appIcon = getValue<string>('resources.icon');

    return (
        <>
            <div className="flex items-center">
                <img src={apiUrl + '/' + appIcon} alt="App Icon" className="w-[100px]" />
                <span className="text-5xl font-bold text-[var(--color-dark-text)]">MUSCLE</span>
                <span className="text-5xl font-bold text-[var(--color-primary)]">APP</span>
            </div>
        </>
    )

}