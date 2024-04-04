import React from "react";
import Link from 'next/link';
import styles from '../styles/Footer.module.css';
import { BsInstagram, BsTwitter, BsGithub, BsFacebook } from "react-icons/bs";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.aboutFaqContact}>
                <Link href="/homepage" passHref>
                    <button className={styles.button}>
                        About Us
                    </button>
                </Link>
                <Link href="/homepage" passHref>
                    <button className={styles.button}>
                        FAQ
                    </button>
                </Link>
                <Link href="/homepage" passHref>
                    <button className={styles.button}>
                        Contact Us
                    </button>
                </Link>
                <Link href="/homepage" passHref>
                    <button className={styles.button}>
                        Site Feedback
                    </button>
                </Link>
            </div>
            <div className={styles.iconsDiv}>
                <div className={styles.spacerForIcons}>
                    <Link href="/homepage" passHref>
                        <button className={styles.button}>
                            <BsInstagram/>
                        </button>
                    </Link>
                </div>
                <div className={styles.spacerForIcons}>
                    <Link href="/homepage" passHref>
                        <button className={styles.button}>
                            <BsTwitter/>
                        </button>
                    </Link>
                </div>
                <div className={styles.spacerForIcons}>
                    <Link href="/homepage" passHref>
                        <button className={styles.button}>
                            <BsGithub/>
                        </button>
                    </Link>
                </div>
                <div className={styles.spacerForIcons}>
                    <Link href="/homepage" passHref>
                        <button className={styles.button}>
                            <BsFacebook/>
                        </button>
                    </Link>
                </div>
            </div>
            <div>
                <p id={styles.madeBy}>Made by Ctrl-P</p>
            </div>
        </div>
    )
  };

export default Footer;