import styles from '../styles/signup.module.css';

const Signup = () => {
    return (
        <>
            <div className={styles.container}>
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
                        <button className={styles.button}>Signup</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Signup;
