import React from 'react';
import { Link } from 'react-router-dom';

// 404 functional component
const NotFoundPage = () => (
    <div>
        <h2>404 :/</h2>
        <Link to="/">Home</Link>
    </div>
);

export default NotFoundPage;