import React from 'react';
import Background from '@/components/Background';
import Link from 'next/link';
import { BsInstagram, BsTwitter, BsGithub, BsFacebook } from "react-icons/bs";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

function ContactUs() {
  return (
   <div className="background-color"
   style={{
     minHeight: "70vh",
     color: "#333",
   }}>
      <div className="contact-container">
        <div className="contact-form">
          <h1>GET IN TOUCH WITH US</h1>
          <div className="form-wrapper">
            <div className="form-group">
              <input type="text" id="name" name="name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" id="email" name="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <input type="tel" id="phone" name="phone" placeholder="Your Phone" required />
            </div>
            <div className="form-group">
              <textarea id="message" name="message" placeholder="Your Message" required style={{ borderColor: '#800080' }}></textarea>
            </div>
            <button type="submit">Send Message</button>
          </div>
        </div>
        <div className="contact-info">
          <div className="info-group">
            <div className="info-item" style={{ border: '1px solid #800080', borderRadius: '5px', padding: '10px', marginRight: '20px' }}>
              <h3 style={{ color: '#800080' }}><HiOutlineMail /> Email</h3>
              <p style={{ color: '#800080' }}>
                Contact us at<br />
                <a href="mailto:nycexploringhighschools@gmail.com" style={{ color: '#800080' }}>
                  nycexploring<br />highschools<br />@gmail.com
                </a>
              </p>
            </div>
            <div className="info-item" style={{ border: '1px solid #800080', borderRadius: '5px', padding: '10px', marginRight: '20px' }}>
              <h3 style={{ color: '#800080' }}><HiOutlinePhone /> Phone</h3>
              <p style={{ color: '#800080' }}>Call us at:<br />+1 123 456-7890</p>
            </div>
            <div className="info-item" style={{ border: '1px solid #800080', borderRadius: '5px', padding: '10px' }}>
              <h3 style={{ color: '#800080' }}>Follow us</h3>
              <div className="social-icons">
                <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <BsInstagram className="icon" />
                </Link>
                <Link href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <BsTwitter className="icon" />
                </Link>
                <Link href="https://www.github.com" target="_blank" rel="noopener noreferrer">
                  <BsGithub className="icon" />
                </Link>
                <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <BsFacebook className="icon" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 90px 20px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        .contact-form {
          flex: 1;
          margin-right: 40px;
        }
        h1 {
          color: #800080;
          margin-bottom: 20px;
        }
        .form-wrapper {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 20px;
          border-color: #800080;
        }
        .form-group {
          margin-bottom: 20px;
        }
        input, textarea {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 4px;
        }
        button {
          width: 100%;
          padding: 10px 0;
          background-color: #800080;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .contact-info {
          flex: 1;
          display: flex;
          justify-content: center;
        }
        .info-group {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }
        .info-item {
          flex: 1;
          min-width: 170px;
          max-width: 170px;
        }
        .info-item h3 {
          color: #800080;
          margin-bottom: 10px;
        }
        .social-icons {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin-top: 10px;
        }
        .icon {
          color: #800080;
          font-size: 32px;
        }
        @media (max-width: 768px) {
          .contact-container {
            flex-direction: column;
          }
          .contact-form {
            margin-right: 0;
            margin-bottom: 40px;
          }
        }
      `}</style>
    </div>
  );
}

export default ContactUs;
