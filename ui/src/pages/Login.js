import { useState } from 'react';
import styles from '../styles/login.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../hooks';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);
    const auth = useAuth();
    console.log('auth', auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoggingIn(true);

        if (!email || !password) {
            return toast.error('Please enter both email and password');
        }

        const response = await auth.login(email, password);

        if (response.success) {
            toast.success('Successfully logged in');
        } else {
            toast.error(`Error in logging in ${response.message}`);
        }

        setLoggingIn(false);
    };

    return (
        <>
            <div className={styles.container}>
                {/*  */}
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <div className={styles.loginHeaderContainer}>
                        <span className={styles.loginHeader}>Login</span>
                    </div>
                    {/*  */}
                    <div className={styles.fieldContainer}>
                        {/*  */}
                        <div className={styles.field}>
                            <input
                                className={styles.input}
                                type="username"
                                placeholder="username"
                                // required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {/*  */}
                        <div className={styles.field}>
                            <input
                                className={styles.input}
                                type="password"
                                placeholder="password"
                                // required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    {/*  */}
                    {/* Disable the button for more than one api call after 1st button click and api call is made , and Change Text inside the button to give better UX */}
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} disabled={loggingIn}>
                            {loggingIn ? 'Logging in .....' : 'Log In'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
