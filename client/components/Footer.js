import React from "react";
import styles from '../styles/Footer.module.css';
import { BsInstagram, BsTwitter, BsGithub, BsFacebook } from "react-icons/bs";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.aboutFaqContact}>
                <p id={styles.about}>About Us</p>
                <p id={styles.faq}>FAQ</p>
                <p id={styles.contactUs}>Contact Us</p>
                <p id={styles.feedback}>Site Feedback</p>
            </div>
            <div className={styles.iconsDiv}>
                <div className={styles.spacerForIcons}>
                    <BsInstagram/>
                </div>
                <div className={styles.spacerForIcons}>
                    <BsTwitter/>
                </div>
                <div className={styles.spacerForIcons}>
                    <BsGithub/>
                </div>
                <div className={styles.spacerForIcons}>
                    <BsFacebook/>
                </div>
            </div>
        </div>
    )
  };

export default Footer;