import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import UserAuthContext from "../firebase/authContext"; // Import the UserAuthContext

export default function App({ Component, pageProps }) {
  return (
    <UserAuthContext>
      <div>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </UserAuthContext>
  );
}