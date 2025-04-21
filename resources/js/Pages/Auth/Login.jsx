import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="alert alert-success mb-4 py-2 px-3">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="form-control"
                        autoComplete="username"
                        autoFocus
                        onChange={e => setData('email', e.target.value)}
                    />
                    {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="form-control"
                        autoComplete="current-password"
                        onChange={e => setData('password', e.target.value)}
                    />
                    {errors.password && <div className="text-danger small mt-1">{errors.password}</div>}
                </div>
                <div className="form-check mb-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="remember"
                        name="remember"
                        checked={data.remember}
                        onChange={e => setData('remember', e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="remember">
                        Remember me
                    </label>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-decoration-none small"
                        >
                            Forgot your password?
                        </Link>
                    )}
                    <button type="submit" className="btn btn-primary ms-auto" disabled={processing}>
                        Log in
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
