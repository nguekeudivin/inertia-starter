// http.ts

import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';

export function client(customHeaders: Partial<AxiosRequestHeaders> = {}): AxiosInstance {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    if (!token) {
        console.warn('CSRF token not found. Make sure a <meta name="csrf-token"> tag is present in your HTML.');
    }

    const defaultHeaders: Partial<AxiosRequestHeaders> = {
        //'X-CSRF-TOKEN': token || '',
        Accept: 'application/json',
    };

    return axios.create({
        headers: {
            ...defaultHeaders,
            ...customHeaders,
        },
        withCredentials: true,
    });
}
