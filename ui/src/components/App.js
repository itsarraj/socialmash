import { useEffect } from 'react';

import { getPosts } from '../api/index';
import { Navbar } from './index';
import styles from '../styles/app.module.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Login, Home, Signin, NotFound } from '../pages/index';

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
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        {/* <Route path="" element={<Component props={props} />} /> */}
                        <Route path="/">
                            <Route index element={<Home />} />
                            <Route path="/about" element={<h1>about</h1>} />
                            <Route path="login" element={<Login />} />
                            <Route path="signin" element={<Signin />} />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
