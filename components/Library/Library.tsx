"use client";

import { TbPlaylist } from "react-icons/tb";
import styles from "./Library.module.scss";
import { AiOutlinePlus } from "react-icons/ai";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "../MediaItem/MediaItem";

interface LibraryProps {
    songs: Song[];
}

const Library = (props: LibraryProps) => {
    const { songs } = props;

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
                {songs.map((item) => (
                    <MediaItem
                        onClick={() => {}}
                        key={item.id}
                        data={item}
                    />
                ))}
            </div>
        </div>
    )

}

export default Library;