export interface IUseAuthHook {
    isAuthenticated?: boolean;
    setIsAuthenticated?: (value: boolean) => void;
}