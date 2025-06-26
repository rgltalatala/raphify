"use client";

import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import styles from "./LikedContent.module.scss";
import MediaItem from "@/components/MediaItem/MediaItem";
import LikeButton from "@/components/LikeButton/LikeButton";

interface LikedContentProps {
  songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = (props) => {
  const { songs } = props;

  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div className={styles.likedContentEmptyState}>
        You have no liked songs.
      </div>
    );
  }

  return (
    <div className={styles.likedContentPage}>
      {songs.map((song) => (
        <div key={song.id} className={styles.likedSongWrapper}>
          <div className={styles.likedSong}>
            <MediaItem onClick={() => {}} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
