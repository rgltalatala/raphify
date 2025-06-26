"use client";

import { Song } from "@/types";

import styles from "./SearchContent.module.scss";
import MediaItem from "@/components/MediaItem/MediaItem";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = (props) => {
  const { songs } = props;

  if (songs.length === 0) {
    return (
      <div className={styles.searchContentEmptyState}>No songs found.</div>
    );
  }

  return (
    <div className={styles.searchContentWrapper}>
      {songs.map((song) => (
        <div key={song.id} className={styles.songWrapper}>
            <div className={styles.song}>
                <MediaItem onClick={() => {}} data={song}/>
            </div>
            {/* todo: add like button */}
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
