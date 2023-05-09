import styles from '../styles/notfound.module.css';

const Signin = () => {
    return (
        <>
            <div className={styles.container}>
                <span className={styles.error}>error</span>
                <span className={styles.fourofour}>404</span>
                <span className={styles.somethingwentwrong}>
                    something went wrong
                </span>
            </div>
        </>
    );
};

export default Signin;
