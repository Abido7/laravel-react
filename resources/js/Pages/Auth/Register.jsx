import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import styles from '../../Auth.module.css';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: '',
        registerAsVendor: false,
        vendorName: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className={styles['auth-bg']}>
            <Head title="Register" />
            <div className={styles['auth-card']}>
                <div className={styles['auth-logo']}>
                    <i className="bi bi-person-plus"></i>
                </div>
                <div className={styles['auth-title']}>إنشاء حساب جديد</div>
                <form onSubmit={submit} className={styles['auth-form']}>
                    <div>
                        <InputLabel htmlFor="name" value="الاسم" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="form-control mt-1"
                            autoComplete="name"
                            isFocused={true}
                            onChange={e => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="phone" value="رقم الجوال" />
                        <TextInput
                            id="phone"
                            name="phone"
                            value={data.phone}
                            className="form-control mt-1"
                            autoComplete="tel"
                            onChange={e => setData('phone', e.target.value)}
                            required
                        />
                        <InputError message={errors.phone} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="البريد الالكتروني" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="form-control mt-1"
                            autoComplete="username"
                            onChange={e => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="كلمة السر" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="form-control mt-1"
                            autoComplete="new-password"
                            onChange={e => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password_confirmation" value="تأكيد كلمة السر" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="form-control mt-1"
                            autoComplete="new-password"
                            onChange={e => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="mt-4 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="registerAsVendor"
                            checked={data.registerAsVendor}
                            onChange={e => setData('registerAsVendor', e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="registerAsVendor">
                            التسجيل كبائع
                        </label>
                    </div>

                    {data.registerAsVendor && (
                        <div className="mt-4">
                            <InputLabel htmlFor="vendorName" value="اسم المتجر / البائع" />
                            <TextInput
                                id="vendorName"
                                name="vendorName"
                                value={data.vendorName}
                                className="form-control mt-1"
                                autoComplete="organization"
                                onChange={e => setData('vendorName', e.target.value)}
                                required
                            />
                            <InputError message={errors.vendorName} className="mt-2" />
                        </div>
                    )}

                    <div className="mt-4 flex items-center justify-end">
                        <Link
                            href={route('login')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            لديك حساب؟ تسجيل الدخول
                        </Link>
                        <PrimaryButton className="btn btn-primary w-100 mt-3" disabled={processing}>
                            تسجيل
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
