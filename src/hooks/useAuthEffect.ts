import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

interface AuthHelperProps {
    isAuthenticated?: boolean;
    setHeaderDetails: () => void;
    setIsAuthenticated?: (value: boolean) => void;
}

export const useAuthHelper = <T extends AuthHelperProps>({
                                                             isAuthenticated,
                                                             setHeaderDetails,
                                                             setIsAuthenticated,
                                                         }: T) => {
    const router = useRouter();

    useEffect(() => {
        setHeaderDetails();

        if (!isAuthenticated) {
            if (setIsAuthenticated) setIsAuthenticated(false);
            router.replace('/');
        }
    }, [isAuthenticated]);
};
