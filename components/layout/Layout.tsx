import React, { Children } from "react";
import Header from "./Header";
import Footer from "./Footer";
// import React from 'react';

const Layout: React.FC = () => {
    return (
        <>
            <Header />
            <main className=" min-h-screen bg-white">
                {Children}
            </main>
            <Footer />
        </>
    )
}

export default Layout