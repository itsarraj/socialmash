import { useState } from 'react';
import { useAuth } from '../hooks';
import styles from '../styles/settings.module.css';
import toast, { Toaster } from 'react-hot-toast';

const UserProfile = () => {
    const user = {};

    return (
        <div className={styles.settings}>
            <div className={styles.imgContainer}>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
                    alt=""
                />
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Email</div>
                <div className={styles.fieldValue}>{user?.email}</div>
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Name</div>

                <div className={styles.fieldValue}>{user?.name}</div>
            </div>
            <div className={styles.btnGrp}>
                <button className={`button ${styles.editBtn}`}>
                    Add friend{' '}
                </button>
                <button className={`button ${styles.editBtn}`}>
                    Remove friend{' '}
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
