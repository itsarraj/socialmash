import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
                <div className={styles.user}>
                    <Link to="/">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2I75rxUUGe78wcrBLRtUg5NAoqSCJf88-Tg&usqp=CAU"
                            alt="aa"
                            className={styles.userProfilePicture}
                        />
                    </Link>
                    <span>Animesh Raj</span>
                </div>

                <div className={styles.navLinks}>
                    <ul>
                        <li>
                            <Link to="/login">login</Link>
                        </li>
                        <li>
                            <Link to="/">logout</Link>
                        </li>
                        <li>
                            <Link to="/signin">signin</Link>
                        </li>
                        <li>
                            <Link to="/">/</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default Navbar;
