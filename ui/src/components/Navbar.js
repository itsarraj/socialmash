import { useAuth } from '../hooks';
import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const auth = useAuth();
    return (
        <div className={styles.nav}>
            {/* left navbar */}
            <div className={styles.leftNavbar}>
                <Link className={styles.logo} to="/">
                    <img
                        className={styles.logoIcons}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2I75rxUUGe78wcrBLRtUg5NAoqSCJf88-Tg&usqp=CAU"
                        alt="aaa"
                    />
                </Link>
            </div>
            {/* right navbar */}
            <div className={styles.rightNavbar}>
                {auth.user && (
                    <div className={styles.user}>
                        <Link to="/settings ">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2I75rxUUGe78wcrBLRtUg5NAoqSCJf88-Tg&usqp=CAU"
                                alt="aa"
                                className={styles.userProfilePicture}
                            />
                        </Link>
                        <span>{auth.user.name}</span>
                    </div>
                )}

                <div className={styles.navLinks}>
                    <ul>
                        {auth.user ? (
                            <>
                                <li>
                                    <Link onClick={auth.logout} to="/">
                                        logout
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login">login</Link>
                                </li>

                                <li>
                                    <Link to="/signup">signup</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default Navbar;
