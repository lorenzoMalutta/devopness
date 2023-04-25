import create from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
    token: string,
    id: number,
    isAuth: boolean
}

type Actions = {
    setToken: (token: string) => void,
    setId: (id: number) => void,
    logout: () => void
}

export const useAuthStore = create(persist<State & Actions>(
    (set) => ({
        token: "",
        isAuth: false,
        id: 0,
        setId: (id: number) => set(() => ({
            id,
            isAuth: true,
        })),
        setToken: (token: string) => set(() => ({
            token,
            isAuth: true,
        })),
        logout: () => set(() => ({
            token: "",
            isAuth: false,
            id: 0,
        }))
    }), {
    name: "auth",
})
);