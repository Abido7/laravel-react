import { Head, Link } from '@inertiajs/react';

export default function VendorPending() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
        }}>
            <Head title="في انتظار الموافقة" />
            <div style={{
                background: 'white',
                borderRadius: '24px',
                boxShadow: '0 4px 32px 0 rgba(0,0,0,0.07)',
                padding: '40px 32px',
                maxWidth: '420px',
                width: '100%',
                textAlign: 'center',
                position: 'relative',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '16px',
                }}>
                    <span style={{
                        background: 'linear-gradient(135deg, #36d1c4 0%, #5b86e5 100%)',
                        borderRadius: '50%',
                        width: '64px',
                        height: '64px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0 2px 8px 0 rgba(91,134,229,0.18)',
                    }}>
                        <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c.5304 0 1.0391-.2107 1.4142-.5858C13.7893 10.0391 14 9.5304 14 9c0-.5304-.2107-1.0391-.5858-1.4142C13.0391 7.2107 12.5304 7 12 7c-.5304 0-1.0391.2107-1.4142.5858C10.2107 7.9609 10 8.4696 10 9c0 .5304.2107 1.0391.5858 1.4142C10.9609 10.7893 11.4696 11 12 11zm0 0v6m0 0H9m3 0h3" /></svg>
                    </span>
                </div>
                <h2 style={{
                    fontWeight: 800,
                    fontSize: '1.7rem',
                    color: '#222',
                    marginBottom: '12px',
                }}>تم تسجيل طلبك كبائع بنجاح</h2>
                <p style={{
                    color: '#4a5568',
                    fontSize: '1.13rem',
                    marginBottom: '30px',
                }}>
                    يرجى انتظار موافقة الإدارة قبل أن تتمكن من الدخول إلى لوحة البائع.<br />سنقوم بإشعارك عند الموافقة عبر البريد الإلكتروني.
                </p>
                <Link href={route('login')} style={{
                    background: 'linear-gradient(135deg, #36d1c4 0%, #5b86e5 100%)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 28px',
                    boxShadow: '0 2px 8px 0 rgba(91,134,229,0.18)',
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                    display: 'inline-block',
                }}>
                    العودة لتسجيل الدخول
                </Link>
            </div>
        </div>
    );
}
