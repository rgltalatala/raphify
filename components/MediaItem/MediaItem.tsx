"use client"

import Image from "next/image"
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";

import styles from './MediaItem.module.scss';

interface MediaItemProps {
    data: Song;
    onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = (props) => {
    const { data, onClick } = props;
    
    const imageUrl = useLoadImage(data);

    const handleClick = () => {
        if (onClick) {
            return onClick(data.id);
        }

        // todo: add turn on player
    }

    return ( 
        <div onClick={handleClick} className={styles.mediaItemWrapper}>
            <div className={styles.mediaItemImageWrapper}> 
                <Image 
                    fill
                    src={imageUrl || '/images/liked.png'}
                    alt="Media Item"
                    className={styles.mediaItemImage}
                />
            </div>
            <div className={styles.mediaItemTitleWrapper}>
                <p className={styles.mediaItemTitle}>
                    {data.title}
                </p>
                <p className={styles.mediaItemArtist}>
                    {data.artist}
                </p>
            </div>
        </div>
     );
}
 
export default MediaItem;