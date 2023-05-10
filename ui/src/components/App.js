import { useEffect } from 'react';

import { getPosts } from '../api/index';
import { Loader, Navbar } from './index';
import styles from '../styles/app.module.css';
import {
    BrowserRouter,
    Route,
    Routes,
    Link,
    Navigate,
    Outlet,
} from 'react-router-dom';
import { Login, Home, Signup, NotFound, Settings } from '../pages/index';

import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../hooks/index';

function PrivateRoutes() {
    const auth = useAuth();
    return auth.user ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
    const auth = useAuth();

    if (auth.loading) {
        return <Loader />;
    }

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
                            <Route path="signup" element={<Signup />} />
                            <Route element={<PrivateRoutes />}>
                                <Route element={<Settings />} path="settings" />
                            </Route>
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
