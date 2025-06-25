"use client";

import Image from "next/image";
import { Song } from "@/types";
import useLoadImage from "@/hooks/useLoadImage";

import styles from "./SongItem.module.scss";
import PlayButton from "../PlayButton/PlayButton";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = (props) => {
  const { data, onClick } = props;

  const imagePath = useLoadImage(data);

  return (
    <div onClick={() => onClick(data.id)} className={styles.songItemWrapper}>
      <div className={styles.songImageWrapper}>
        <Image src={imagePath || "/images/liked.png"} fill alt="Song Image" />
      </div>
      <div className={styles.songTitleWrapper}>
        <p className={styles.songTitle}>{data.title}</p>
        <p className={styles.songArtist}>By {data.artist}</p>
      </div>
      <div className={styles.playButton}>
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
