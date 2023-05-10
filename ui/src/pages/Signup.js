import { useState } from 'react';
import { useAuth } from '../hooks';
import styles from '../styles/signup.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [signingUp, setSigningUp] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSigningUp(true);

        let error = false;
        if (!name || !username || !password || !confirmPassword) {
            toast.error('Please fill all the fields');
            error = true;
        }

        if (password !== confirmPassword) {
            toast.error('Make sure password and confirm password matches');

            error = true;
        }

        if (error) {
            return setSigningUp(false);
        }

        const response = await auth.signup(
            name,
            username,
            password,
            confirmPassword
        );

        if (response.success) {
            navigate('/login', { replace: true });
            setSigningUp(false);

            return toast.success(
                'User registered successfully, please login now'
            );
        } else {
            toast.error(response.message);
        }

        setSigningUp(false);
    };

    if (auth.user) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <div className={styles.container} onSubmit={handleFormSubmit}>
                {/*  */}
                <form className={styles.signupForm}>
                    <div className={styles.signupHeaderContainer}>
                        <span className={styles.signupHeader}>Signup</span>
                    </div>
                    {/*  */}
                    <div className={styles.fieldContainer}>
                        {/*  */}
                        <div className={styles.field}>
                            <input
                                className={styles.input}
                                type="name"
                                placeholder="name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        {/*  */}
                        <div className={styles.field}>
                            <input
                                className={styles.input}
                                type="username"
                                placeholder="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        {/*  */}
                        <div className={styles.field}>
                            <input
                                className={styles.input}
                                type="password"
                                placeholder="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {/*  */}
                        <div className={styles.field}>
                            <input
                                className={styles.input}
                                type="password"
                                placeholder="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />
                        </div>
                    </div>
                    {/*  */}
                    <div className={styles.buttonContainer}>
                        <button disabled={signingUp} className={styles.button}>
                            {signingUp ? 'Signing up...' : 'Signup'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Signup;
