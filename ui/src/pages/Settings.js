import { useState } from 'react';
import { useAuth } from '../hooks';
import styles from '../styles/settings.module.css';
import toast, { Toaster } from 'react-hot-toast';

const Settings = () => {
    const auth = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(auth.user?.name ? auth.user.name : '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [savingForm, setSavingForm] = useState(false);

    const clearForm = () => {
        setPassword('');
        setConfirmPassword('');
    };
    const updateProfile = async () => {
        setSavingForm(true);

        let error = false;
        if (!name || !password || !confirmPassword) {
            toast.error('Fill all the fields');
            error = true;
        }
        if (password !== confirmPassword) {
            toast.error('Password and Confirm Password Doesnot match');
            error = true;
        }
        if (error) {
            return setSavingForm(false);
        }
        const response = await auth.updateUser(
            auth.user._id,
            name,
            password,
            confirmPassword
        );
        console.log('settings response', response);
        if (response.success) {
            setEditMode(false);
            setSavingForm(false);
            clearForm();

            return toast.success('User updated successfully');
        } else {
            toast.error(` error not updated ${response.message}`);
        }
        setSavingForm(false);
    };

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
                <div className={styles.fieldValue}>{auth.user?.email}</div>
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Name</div>
                {editMode ? (
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                ) : (
                    <div className={styles.fieldValue}>{auth.user?.name}</div>
                )}
            </div>

            {editMode && (
                <>
                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>Password</div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>
                            Confirm Password
                        </div>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </>
            )}

            <div className={styles.btnGrp}>
                {editMode ? (
                    <>
                        <button
                            className={`button ${styles.saveBtn}`}
                            onClick={updateProfile}
                        >
                            {savingForm ? 'Saving profile...' : 'Save profile'}
                        </button>
                        <button
                            className={`button ${styles.editBtn}`}
                            onClick={() => setEditMode(false)}
                        >
                            Go back
                        </button>
                    </>
                ) : (
                    <button
                        className={`button ${styles.editBtn}`}
                        onClick={() => setEditMode(true)}
                    >
                        Edit Profile
                    </button>
                )}
            </div>
        </div>
    );
};

export default Settings;
