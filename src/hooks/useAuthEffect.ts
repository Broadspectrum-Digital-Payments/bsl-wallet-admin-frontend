import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {IUseAuthHook} from "@/utils/interfaces/IUseAuthHook";

export const useAuthHelper = <T extends IUseAuthHook>({
                                                          isAuthenticated,
                                                          setIsAuthenticated,
                                                      }: T) => {
    const router = useRouter();
    useEffect(() => {
        if (!isAuthenticated) {
            if (setIsAuthenticated) setIsAuthenticated(false);
            router.replace('/');
        }
    }, [isAuthenticated]);
};
