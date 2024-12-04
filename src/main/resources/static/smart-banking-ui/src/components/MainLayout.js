import React from 'react';
import Header from './Header';
import '../styles/MainLayout.css';

function MainLayout({ children }) {
    return (
        <div className="main-layout">
            <Header /> {/* Header outside of the main content */}
            <div className="content">{children}</div> {/* Content area for each page */}
        </div>
    );
}

export default MainLayout;
