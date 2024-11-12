import React from "react";
import styles from './Login.module.css';

function LoginOption({ type, style }) {
    return (
        <button
            className={styles.loginOption}
            style={style}
        >
            {type}
        </button>
    );
}

export default LoginOption;
