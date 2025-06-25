"use client";

import { useRouter } from "next/navigation";
import styles from './ListItem.module.scss';
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
    image: string;
    name: string;
    href: string;
}

const ListItem: React.FC<ListItemProps> = (props) => {
    const {
        image,
        name,
        href
    } = props;
    const router = useRouter();
    const onClick = () => {
        // add auth before push
        router.push(href)
    }    
    
    return (
        <button className={styles.listItemButton} onClick={onClick}>
            <div className={styles.listItem}>
                <Image 
                    className={styles.image}
                    src={image}
                    alt="Liked playlist title image"
                    height={66}
                    width={66}
                />
                <div className={styles.titleAndPlayContainer}>
                    <p className={styles.playlistTitle}>{name}</p>
                    <div className={styles.playButton}>
                        <FaPlay />
                    </div>
                </div>
            </div>
        </button>
    )
}

export default ListItem