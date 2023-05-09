import { useEffect } from 'react';

import { getPosts } from '../api/index';
import { Navbar } from './index';
import styles from '../styles/app.module.css';

function App() {
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await getPosts();
            console.log(response);
        };
        fetchPosts();
    }, []);
    return (
        <>
            <div className={styles.app}>
                <Navbar />
                <h1>Hello</h1>
            </div>
        </>
    );
}

export default App;
