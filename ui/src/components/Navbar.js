import styles from '../styles/navbar.module.css';

const Navbar = () => {
    return (
        <div className={styles.nav}>
            {/* left navbar */}
            <div className={styles.leftNavbar}>
                <a
                    className={styles.logo}
                    href="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/768px-Instagram_logo_2022.svg.png"
                >
                    <img
                        className={styles.logoIcons}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2I75rxUUGe78wcrBLRtUg5NAoqSCJf88-Tg&usqp=CAU"
                        alt="aaa"
                    />
                </a>
            </div>
            {/* right navbar */}
            <div className={styles.rightNavbar}>
                <div className={styles.user}>
                    <a href="/">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2I75rxUUGe78wcrBLRtUg5NAoqSCJf88-Tg&usqp=CAU"
                            alt="aa"
                            className={styles.userProfilePicture}
                        />
                    </a>
                    <span>Animesh Raj</span>
                </div>

                <div className={styles.navLinks}>
                    <ul>
                        <li>
                            <a href="/">login</a>
                        </li>
                        <li>
                            <a href="/">logout</a>
                        </li>
                        <li>
                            <a href="/">register</a>
                        </li>
                        <li>
                            <a href="/"></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default Navbar;
