import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS 
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import Footer from '../components/Footer';
import styles from '@/styles/layout.module.css'
import UserAuthContext from "../firebase/authContext"; // Import the UserAuthContext

export default function App({ Component, pageProps }) {
  return (
    <UserAuthContext>
      <main className={styles.container}>
        <section className={styles.main}>
        <div style={{marginTop: "60px"}}/>
        <Component {...pageProps} />
        <Layout/>
        </section>
       <section className={styles.footeer}>
       <Footer/>
       </section>
      </main>
    </UserAuthContext>
  );
}
