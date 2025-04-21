import React from 'react';
import MainNavbar from './MainNavbar';

export default function Layout({ children }) {
    return (
        <>
            <MainNavbar />
            <main>{children}</main>
        </>
    );
}
