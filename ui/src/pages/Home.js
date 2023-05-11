import { useEffect, useState } from 'react';
import { Loader } from '../components/index';
import { getPosts } from '../api/index';
import { useAuth } from '../hooks';
import styles from '../styles/home.module.css';

const Home = () => {
    const auth = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await getPosts();
            if (response.success) {
                setPosts(response.data.posts);
            }
            setLoading(false);
        };
        fetchPosts();
    }, []);

    if (loading) {
        return <Loader />;
    }
    return (
        <div className={styles.container}>
            <div className={styles.feedpost}>
                <div className={styles.feedpostImg}>
                    <img
                        src="https://www.goodmorningimagesdownload.com/wp-content/uploads/2021/12/Best-Quality-Profile-Images-Pic-Download-2023.jpg"
                        alt="aa"
                        srcset=""
                    />
                </div>
                <div className={styles.inputArea}>
                    <input type="text" />
                </div>

                <div className={styles.feedPostButton}>
                    <button>send</button>
                </div>
            </div>
            <div className={styles.feeds}>
                <div className={styles.feedpostImg}>
                    <img
                        src="https://www.goodmorningimagesdownload.com/wp-content/uploads/2021/12/Best-Quality-Profile-Images-Pic-Download-2023.jpg"
                        alt="aa"
                        srcset=""
                    />
                </div>
                <div className={styles.inputArea}>
                    <input type="text" />
                </div>

                <div className={styles.feedPostButton}>
                    <button>send</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
