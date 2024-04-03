import React from "react";
import styles from '../styles/Footer.module.css';

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.aboutFaqContact}>
                <p id={styles.about}>About Us</p>
                <p id={styles.faq}>FAQ</p>
                <p id={styles.contactUs}>Contact Us</p>
            </div>
        </div>
    )
  };

export default Footer;