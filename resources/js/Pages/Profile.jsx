import React from 'react';
import Layout from '../Layouts/AuthenticatedLayout';

export default function Profile({ user }) {
    return (
        <Layout>
            <div className="container mt-5">
                <h2>Profile</h2>
                <div className="card mt-3" style={{ maxWidth: '400px' }}>
                    <div className="card-body">
                        <h5 className="card-title">{user?.name}</h5>
                        <p className="card-text">Email: {user?.email}</p>
                        <button className="btn btn-primary">Edit Profile</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
