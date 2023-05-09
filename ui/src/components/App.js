import { useEffect } from 'react';

import { getPosts } from '../api/index';
import { Navbar } from './index';
import styles from '../styles/app.module.css';
import { BrowserRouter, Route } from 'react-router-dom';

const About = () => {
    return (
        <>
            <div></div>
        </>
    );
};

const UserInfo = () => {
    return (
        <>
            <div></div>
        </>
    );
};

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
