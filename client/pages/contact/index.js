import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS 
import Layout from "@/components/Layout";
import React from "react";
import ContacctComponent from "@/components/contactform";
import 'tailwindcss/tailwind.css'
import Background from "@/components/Background";
export default function index({ Component, pageProps }) {
  return (
      <div>
        <ContacctComponent/>


      </div>
  );
}
