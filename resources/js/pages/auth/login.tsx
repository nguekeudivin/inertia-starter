import { Head } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { InputField } from '@/components/form';
import Logo from '@/components/shared/Logo';
import TextLink from '@/components/typography/text-link';
import { Button } from '@/components/ui/button';
import { useSimpleForm } from '@/hooks/use-simple-form';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset, handleChange } = useSimpleForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Log in" />

            <Logo />
            <h3 className="mt-8 text-center text-3xl font-semibold">Bienvenue !</h3>
            <h4 className="mt-1 text-center text-gray-700">Connectez-vous pour accéder à votre compte</h4>
            {status && <div className="my-4 rounded-md bg-green-100 p-4 text-center text-sm font-medium text-green-800">{status}</div>}

            <div className="mt-6 space-y-6">
                <InputField label="Addresse email" name="email" value={data.email} onChange={handleChange} error={errors.email} />

                <InputField
                    label="Mot de passe"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    canToggleType={true}
                    type="password"
                    error={errors.password}
                />
            </div>

            <div className="mt-4 text-sm text-gray-700">
                <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                    <span>Vous avez oublier votre mot de passe ?</span>
                    <span className="ml-1 text-teal-800 hover:underline">{`Oui j'ai oublié mon mot de passe`}</span>
                </TextLink>
            </div>

            <div className="mt-8">
                <Button className="w-full" loading={processing} onClick={submit}>
                    Se connecter
                </Button>
            </div>

            <div className="text-muted-foreground mt-4 text-center text-sm">
                <TextLink href={route('register')} tabIndex={5}>
                    <span> Vous n'avez pas de compte ?</span>
                    <span className="ml-1 text-teal-800 hover:underline">{`Créer un compte`}</span>
                </TextLink>
            </div>
        </AuthLayout>
    );
}
