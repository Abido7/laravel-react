import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="container d-flex flex-column min-vh-100 justify-content-center align-items-center bg-light pt-5">
            <div>
                <Link href="/">
                    <ApplicationLogo className="mb-4" style={{ height: 80, width: 80 }} />
                </Link>
            </div>
            <div className="card shadow-sm w-100" style={{ maxWidth: 400 }}>
                <div className="card-body p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
