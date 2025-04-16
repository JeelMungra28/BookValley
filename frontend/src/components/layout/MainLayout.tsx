import React from "react";
import Header from "./header";
import Footer from "./footer";
import { ScrollToTop } from "../layout/ScrollToTop";

export function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="main-layout">
            <Header />
            <main>{children}</main>
            <Footer />
            <ScrollToTop />
        </div>
    );
}