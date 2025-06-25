import getSongsByTitle from "@/actions/getSongsByTitle";

import Header from "@/components/Header/Header";
import SearchInput from "@/components/SearchInput/SearchInput";

import styles from './page.module.scss';

interface SearchProps {
    searchParams: {
        title: string;
    }
}

const Search = async (props: SearchProps) => {
    const { searchParams } = props;
    
    const songs = await getSongsByTitle(searchParams.title);

    return (
        <div className={styles.searchPage}>
            <Header className={styles.searchPageHeader}>
                <div className={styles.searchSection}>
                    <h1 className={styles.searchPageTitle}>
                        Search
                    </h1>
                    <SearchInput></SearchInput>
                </div>
            </Header>
        </div>
    )
}

export default Search;