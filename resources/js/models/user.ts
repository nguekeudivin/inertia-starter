import { createResourceSlice, ResourceState } from '@/lib/resource';
import { create } from 'zustand';

export interface User {
    id: string;
    nom: string;
    prenom: string;
    username: string;
    created_at: string;
    updated_at: string;
    user_type: string;
    mutualiste: any;
    admin: any;
}

interface UserState extends ResourceState<User> {}

export const useUser = create<UserState>((set, get) => ({
    ...createResourceSlice('users', set, get),
    current: {
        user_type: '',
        nom: '',
        prenom: '',
        mutualiste: {},
        username: '',
        admin: {},
    } as unknown as User,
}));
