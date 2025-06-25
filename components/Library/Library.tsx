"use client";

import { TbPlaylist } from "react-icons/tb";
import styles from "./Library.module.scss";
import { AiOutlinePlus } from "react-icons/ai";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";

interface LibraryProps {

}

const Library = () => {
    // const {} = props;

    const uploadModal = useUploadModal();
    const authModal = useAuthModal();
    const user = useUser();

    if (!user) {
        return authModal.onOpen();
    }
    const onClick = () => {
        if (!user) {
            return authModal.onOpen();
        }

        return uploadModal.onOpen();
    };

    return (
        <div>
            <div className={styles.libraryHeaderContainer}>
                <div className={styles.libraryHeader}>
                    <TbPlaylist className={styles.libraryIcon} size={26}/>
                    <p>Your Library</p>
                </div>
                <AiOutlinePlus className={styles.plusIcon} onClick={onClick} size={20}/>
            </div>
            <div className={styles.songList}>
                songs
            </div>
        </div>
    )

}

export default Library;