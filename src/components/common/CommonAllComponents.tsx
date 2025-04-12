'use client';

import React, { useEffect } from 'react';
import { useStore } from '@/hooks/useStore';
import ServerSideBar from '../ServerSideBar';
import { usePathname } from 'next/navigation';
import Navbar from '../Navbar';
import { motion } from 'motion/react'

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
            <div className={`flex flex-row w-full ${showSideBar ? 'md:h-full h-[calc(100dvh-2rem)] ' : 'h-dvh'}`}>                {!sideBarBlockedRoutes.includes(path) && (
                <ServerSideBar hideSideBar={!showSideBar} />
            )}
                <motion.div
                    initial={{ x: '-75.22px' }} // Initial state (hidden off-screen)
                    animate={{
                      x: !showSideBar ? '-75.22px' : '0%', // Slide in or out based on hideSideBar
                    }}
                    exit={{ x: '-75.22px' }} // Exit state (hidden off-screen)
                    className={`${showSideBar ? 'w-[calc(100vw-75px)]' : 'w-full'} h-full`}>{children}</motion.div>
            </div>
        </div>
    );
}