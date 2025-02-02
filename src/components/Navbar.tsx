'use client'

import React from 'react'
import { CircleUserIcon, Menu, X } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Sheet,
    SheetHeader,  // New
    SheetTitle,   // New
    SheetContent,
    SheetTrigger,
    SheetDescription,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
    const router = useRouter()

    const menuItems = [
        { label: 'Profile', onClick: () => router.push('/profile') },
        { label: 'Theme changes', onClick: () => console.log('Theme clicked') },
        { label: 'Change password', onClick: () => console.log('Password clicked') },
        { label: 'Logout', onClick: () => console.log('Logout clicked'), className: 'text-red-500' }
    ]

    // Desktop Menu Component
    const DesktopMenu = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-[#1e4e5d] text-white select-none"
                >
                    <CircleUserIcon className="h w-6 select-none" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-40 mt-4 bg-[#16404D] border-[#16404D]"
            >
                {menuItems.map((item) => (
                    <DropdownMenuItem
                        key={item.label}
                        onClick={item.onClick}
                        className={`cursor-pointer text-white hover:bg-[#1e4e5d] ${item.className || ''}`}
                    >
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )

    // Mobile Menu Component
    const MobileMenu = () => (
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-[#1e4e5d] text-white md:hidden select-none"
                >
                    {isMobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent
                side="right"
                className="w-64 bg-[#16404D] text-white border-l-[#1e4e5d]"
            >
                {/* New Header Section */}
                <SheetHeader>
                    <SheetTitle className="text-white">Menu</SheetTitle>
                    <SheetDescription className="text-gray-300">
                        Access your account settings and preferences
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                    {menuItems.map((item) => (
                        <Button
                            key={item.label}
                            variant="ghost"
                            className={`w-full justify-start text-white hover:bg-[#1e4e5d] ${item.className || ''}`}
                            onClick={() => {
                                item.onClick()
                                setIsMobileMenuOpen(false)
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )

    return (
        <div className="flex justify-between items-center px-4 py-3 bg-[#16404D] text-white h-[52px]">
            <Link className="text-lg font-bold" href={'/'}>Discusync</Link>

            {/* Desktop Menu (hidden on mobile) */}
            <div className="hidden md:block">
                <DesktopMenu />
            </div>

            {/* Mobile Menu (hidden on desktop) */}
            <div className="block md:hidden">
                <MobileMenu />
            </div>
        </div>
    )
}