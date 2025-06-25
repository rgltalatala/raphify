import { Song } from "@/types";

import styles from './PageContent.module.scss'
import SongItem from "../SongItem/SongItem";

interface PageContent {
    songs: Song[];
}

const PageContent: React.FC<PageContent> = (props) => {
    const { songs } = props;

    if (!songs.length) {
        return (
            <div className={styles.emptySongsList}>
                No songs available.  
            </div>
        )
    }
    return ( 
        <div className={styles.songsList}>
            {songs.map(item => (
                <SongItem 
                    // onClick={(id: string) => onPlay(id)} 
                    key={item.id} 
                    data={item} 
                />
            ))}
        </div>
     );
}
 
export default PageContent;