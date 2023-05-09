import styles from '../styles/signin.module.css';

const Signin = () => {
    return (
        <>
            <div className={styles.container}>
                {/*  */}
                <form className={styles.signinForm}>
                    <div className={styles.signinHeaderContainer}>
                        <span className={styles.signinHeader}>Signin</span>
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
                        <button className={styles.button}>signin</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Signin;
