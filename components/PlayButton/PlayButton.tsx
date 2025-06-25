import { FaPlay } from "react-icons/fa";

import styles from "./PlayButton.module.scss";

const PlayButton = () => {
  return (
    <button className={styles.playButton}>
      <FaPlay className={styles.playButtonIcon} />
    </button>
  );
};

export default PlayButton;
