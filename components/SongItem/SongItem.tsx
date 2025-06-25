"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";

import styles from './SongItem.module.scss'
import Image from "next/image";

interface SongItemProps {
    data: Song;
    onClick: (id: string) => void; 
}

const SongItem: React.FC<SongItemProps> = (props) => {
    const {
        data,
        onClick,
    } = props;

    const imagePath = useLoadImage(data);

    return ( 
        <div 
            onClick={() => onClick(data.id)}
            className={styles.songItemWrapper}
        >
            <div className={styles.songImageWrapper}>
                <Image 
                    src={imagePath || '/images/liked.png'}
                    fill
                    alt="Song Image"
                />
            </div>
        </div>
     );
}
 
export default SongItem;