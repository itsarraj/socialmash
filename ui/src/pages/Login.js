import styles from '../styles/login.module.css';

const Login = () => {
    return (
        <>
            <div className={styles.container}>
                {/*  */}
                <form className={styles.loginForm}>
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
                                required
                            />
                        </div>
                        {/*  */}
                        <div className={styles.field}>
                            <input
                                className={styles.input}
                                type="password"
                                placeholder="password"
                                required
                            />
                        </div>
                    </div>
                    {/*  */}
                    <div className={styles.buttonContainer}>
                        <button className={styles.button}>Login</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
