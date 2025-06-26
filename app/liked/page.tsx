import getLikedSongs from "@/actions/getLikedSongs";

import LikedContent from "./components/LikedContent";
import Header from "@/components/Header/Header";
import Image from "next/image";

import styles from "./page.module.scss";

export const revalidate = 0;

const Liked = async () => {
  const songs = await getLikedSongs();

  return (
    <div className={styles.likedSongsPage}>
      <Header>
        <div className={styles.likedSongsPageHeaderWrapper}>
          <div className={styles.likedSongsHeaderContainer}>
            <div className={styles.likedSongsHeaderImage}>
              <Image
                fill
                className={styles.likedSongsImage}
                src="/images/liked.jpg"
                alt="Playlist"
              />
            </div>
            <div className={styles.likedHeaderTextContainer}>
              <p className={styles.likedPlaylist}>Playlist</p>
              <h1 className={styles.likedSongsText}>Liked songs</h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs}/>
    </div>
  );
};

export default Liked;
