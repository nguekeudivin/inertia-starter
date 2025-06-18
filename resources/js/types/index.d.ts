import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface CheckBoxOptionType {
    value: any;
    label: string;
    description?: string;
}

export type ID = number | string;

export interface ImageFile {
    file: File | undefined;
    src: string;
    id: string;
}

export interface VideoFile {
    file: File | undefined;
    src: string;
    id: string;
}

type PageProps = {
    auth: {
        user: {
            name: string;
            email: string;
            company_step_at: string | null;
        };
    };
    sidebar: {
        bgColor: string;
    };
};

type Idtype = string | number;
