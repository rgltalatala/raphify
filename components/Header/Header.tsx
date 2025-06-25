"use client";

import { useRouter } from "next/navigation";
import styles from './Header.module.scss';
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

import Button from "../Button/Button";
import toast from "react-hot-toast";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = (props) => {
    const { children, className } = props;

    const { onOpen } = useAuthModal();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();

        router.refresh();

        if (error) {
            toast.error(error.message);
        } else {
            toast.success('Logged out!');
        }
    }
    

    return (
        <div className={`${styles.headerWrapper} ${className}`}>
            <div className={styles.header}>
                <div className={styles.navigationButtonContainer}>
                    <button className={styles.navigationButton} onClick={() => router.back()}>
                        <RxCaretLeft size={35}/>
                    </button>
                    <button className={styles.navigationButton} onClick={() => router.forward()}>
                        <RxCaretRight size={35}/>
                    </button>
                </div>
                <div className={styles.mobileButtons}>
                    <button className={styles.homeButton}>
                        <HiHome size={20}/>
                    </button>
                    <button className={styles.searchButton}>
                        <BiSearch size={20}/>
                    </button>
                </div>
                <div className={styles.authButtonWrapper}>
                {user ? (
                    <div className={styles.loggedInMessage}>
                        <Button 
                            onClick={handleLogout}
                            className={`${styles.userButton} ${styles.logoutButton}`}
                        >
                            Logout
                        </Button>
                        <Button 
                            onClick={() => router.push('/account')}
                            className={`${styles.userButton} ${styles.accountButton}`}
                        >
                            <FaUserAlt />
                        </Button>
                    </div>
                ) : (
                    <>
                        <Button onClick={onOpen} className={styles.signUpButton}>
                            Sign up
                        </Button>
                        <Button onClick={onOpen} className={styles.logInButton}>
                            Log In
                        </Button>
                    </>
                )}
                </div>
            </div>
            {children}
        </div>
    )
}

export default Header;