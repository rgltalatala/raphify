import Header from "@/components/Header/Header";
import "../styles/reset.scss";
import styles from "./page.module.scss";
import ListItem from '../../components/ListItem/ListItem'
import getSongs from "@/actions/getSongs";
import PageContent from "@/components/PageContent/PageContent";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  return <div className={styles.main}>
    <Header>
      <div>
        <h1 className={styles.headerText}>
          Welcome Back
        </h1>
        <div className={styles.listContainer}>
          <ListItem 
            image="/images/liked.jpg"
            name="Liked Songs"
            href="liked"
          />
        </div>
      </div>
    </Header>
    <div className={styles.songSection}>
      <div className={styles.songContainer}>
        <h1 className={styles.songSectionTitle}>Newest songs</h1>
      </div>
      <PageContent songs={songs}/>
      {/* <div>
        {songs.map((song) => <div>{song.title}</div>)}
      </div> */}
    </div>
  </div>;
}
