'use client';

import React, { useEffect } from 'react';
import { useStore } from '@/hooks/useStore';
import ServerSideBar from '../ServerSideBar';
import { usePathname } from 'next/navigation';
import Navbar from '../Navbar';

export default function CommonAllComponents({ children }: Readonly<{ children: React.ReactNode }>) {
    const path = usePathname();
    const sideBarBlockedRoutes = [''];
    const [showSideBar, setShowSideBar] = React.useState(false);
    const { isAuthenticated } = useStore((state) => ({
        isAuthenticated: state.isAuthenticated,
    }));

    // Handle screen width changes
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                // For screens >= md, always show the sidebar
                setShowSideBar(true);
            } else {
                // For screens < md, hide the sidebar by default
                setShowSideBar(false);
            }
        };

        // Set initial state based on screen width
        handleResize();
    }, []);

    if (!isAuthenticated) {
        return children;
    }

    return (
        <div className="flex flex-col h-dvh">
            <Navbar hideShowSideBar={() => setShowSideBar((prev) => !prev)} />
            <div className={`flex flex-row w-full ${showSideBar ? 'h-full md:h-[calc(100vh-4rem)] ': 'h-full'}`}>                {!sideBarBlockedRoutes.includes(path) && (
                    <ServerSideBar hideSideBar={!showSideBar} />
                )}
                <div className="w-full h-full">{children}</div>
            </div>
        </div>
    );
}