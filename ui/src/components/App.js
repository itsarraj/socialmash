import { useEffect } from 'react';

import { getPosts } from '../api/index';
import { Navbar } from './index';
import styles from '../styles/app.module.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Login, Home, Signin, NotFound } from '../pages/index';

import toast, { Toaster } from 'react-hot-toast';

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
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    gutter={8}
                    containerClassName=""
                    containerStyle={{}}
                    toastOptions={{
                        // Define default options
                        className: '',
                        duration: 2000,
                        style: {
                            background: 'pink',
                            color: '#000',
                        },

                        // Default options for specific types
                        success: {
                            duration: 3000,
                            theme: {
                                primary: 'green',
                                secondary: 'black',
                            },
                        },
                    }}
                />
            </div>
        </>
    );
}

export default App;
