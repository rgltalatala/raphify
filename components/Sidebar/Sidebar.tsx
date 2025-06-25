"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import styles from "./Sidebar.module.scss";
import Box from "../Box/Box";
import SidebarItem from "./SidebarItem/SidebarItem";
import Library from '../Library/Library';

interface SidebarProps {
    children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    const { children } = props;

    const pathname = usePathname();

    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: pathname !== '/search',
            href: '/',
        },
        {
            icon: BiSearch,
            label: 'Search',
            active: pathname === '/search',
            href: '/search',
        },
    ], [])

    return (
        <div className={styles.sidebarWrapper}>
            <div className={styles.sidebar}>
                <Box>
                    {routes.map(route => (
                        <SidebarItem key={route.label} {...route}/>
                    ))}
                </Box>
                <Box className={styles.songLibrary}>
                    <Library></Library>
                </Box>
            </div>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}

export default Sidebar;