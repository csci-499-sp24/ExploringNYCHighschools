import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS 
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import Background from "@/components/Background";
import NavBar from "@/components/NavBar";

export default function App({ Component, pageProps }) {
  return (
    <Background>
      <NavBar />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Background>
  );
}
