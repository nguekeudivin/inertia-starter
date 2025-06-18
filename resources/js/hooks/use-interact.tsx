import { pick } from '@/lib/utils';
import { create } from 'zustand';

const SERVER_ERROR = 'Le systeme est indisponible pour le moment';

interface DisplayState {
    visible: Record<string, boolean>;
    set: (key: string, value: boolean) => void;
    show: (key: string) => void;
    hide: (key: string) => void;
    toggle: (key: string) => void;
    reset: () => void;
}

interface LoadingState {
    status: Record<string, boolean>;
    start: (key: string) => void;
    stop: (key: string) => void;
    reset: () => void;
}

interface ErrorsState {
    values: Record<string, string[]>;
    set: (key: string, value: string | string[]) => void;
    setMany: (values: any) => void;
    unset: (key: string) => void;
    catch: (error: any) => void;
    reset: () => void;
    render: (...keys: any) => React.ReactNode;
}

export const useLoading = create<LoadingState>((setter) => ({
    status: {},
    start: (key) => {
        console.log(key);
        setter((state) => ({
            status: {
                ...state.status,
                [key]: true,
            },
        }));
    },
    stop: (key) => {
        console.log('stop ', key);
        setter((state) => {
            const newValues: Record<string, any> = {};
            for (const k in state.status) {
                if (k != key) {
                    newValues[k] = state.status[k];
                }
            }
            return {
                status: newValues,
            };
        });
    },

    reset: () => setter(() => ({})),
}));

export const useDisplay = create<DisplayState>((set) => ({
    visible: {},
    set: (key, value) => {
        set((state) => ({
            visible: {
                ...state.visible,
                [key]: value,
            },
        }));
    },
    show: (key) =>
        set((state) => ({
            visible: {
                ...state.visible,
                [key]: true,
            },
        })),
    hide: (key) =>
        set((state) => {
            const newValues: Record<string, any> = {};
            for (const k in state.visible) {
                if (k != key) {
                    newValues[k] = state.visible[k];
                }
            }
            return {
                visible: newValues,
            };
        }),
    toggle: (key) => {
        set((state) => {
            if (state.visible.hasOwnProperty(key)) {
                const newValues: Record<string, any> = {};
                for (const k in state.visible) {
                    if (k != key) {
                        newValues[k] = state.visible[k];
                    }
                }
                return {
                    visible: newValues,
                };
            } else {
                return {
                    visible: {
                        ...state.visible,
                        [key]: true,
                    },
                };
            }
        });
    },
    reset: () => set(() => ({})),
}));

export const useErrors = create<ErrorsState>((setter, getter) => ({
    values: {},
    set: (key, value) =>
        setter((state) => ({
            values: {
                ...state.values,
                [key]: typeof value == 'string' ? [value] : value,
            },
        })),
    setMany: (errors: any) => {
        setter((state) => ({
            values: {
                ...state.values,
                ...errors,
            },
        }));
    },
    unset: (key) =>
        setter((state) => ({
            values: Object.fromEntries(Object.entries(state.values).filter(([k, v]) => k != key)),
        })),
    catch: (error) => {
        let isServerError = true;

        if (error.response != undefined) {
            if ([422, 401, 409, 404, 400].includes(error.response.status)) {
                isServerError = false;
                let values = { error: ['Le systeme est indisponible pour le moment'] };

                if (error.response.data.hasOwnProperty('errors')) {
                    values = error.response.data.errors;

                    return setter(() => ({
                        values: values,
                    }));
                }

                if (error.response.data.hasOwnProperty('message')) {
                    if (typeof error.response.data.message == 'string') {
                        values = {
                            error: [error.response.data.message],
                        };
                    }

                    if (typeof error.response.data.message == 'object') {
                        values = error.response.data.message;
                    }

                    return setter(() => ({
                        values: values,
                    }));
                }
            }
        } else {
            if (error.message != undefined) {
                return setter(() => ({
                    values: {
                        error_message: [error.message],
                    },
                }));
            }
        }

        if (isServerError) {
            return setter(() => ({
                values: {
                    server_error: [SERVER_ERROR],
                },
            }));
        }
    },
    reset: () => {
        setter(() => ({
            values: {},
        }));
    },

    render(...keys: any) {
        const values = getter().values;

        const errors = keys.length ? pick(values, keys) : values;
        if (Object.keys(errors).length == 0) return null;

        return (
            <div>
                {Object.entries(errors as any).map(([key, value], index) => (
                    <div key={`error${key}${index}`} className="ms-3 text-sm font-medium">
                        {Array.isArray(value) ? (
                            <ul>
                                {value.map((msg, i) => (
                                    <li key={`error-${i}`}>{msg}</li>
                                ))}
                            </ul>
                        ) : (
                            <span>{value as string}</span>
                        )}
                    </div>
                ))}
            </div>
        );
    },
}));
