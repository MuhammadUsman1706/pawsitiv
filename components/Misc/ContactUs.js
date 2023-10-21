import React, { useState } from "react";
import classes from "./ContactUs.module.css";
import { Button } from "@mui/material";
import { Email } from "@mui/icons-material";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { postContact, verifyCaptcha } from "@/pages/api";
import { toast } from "react-toastify";

export default function ContactUs() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await executeRecaptcha();
    const response = await verifyCaptcha(token);

    if (response.success && response.score > 0.5) {
      
      const formData = { name, email, message };
      postContact(formData);

      setName("");
      setEmail("");
      setMessage("");
    } else {
      toast.error(
        "There was an error verifying you request, please refresh and try again!"
      );
    }
  };

  return (
    <main className={classes["contact-us"]}>
      <section className={classes["hero-section"]}>
        <div className={classes.header}>
          <h1>Contact Us</h1>
          <p>
            We appreciate your interest in Pawsitiv App. If you would like to
            contact us for any reason, please do not hesitate to do so. We would
            be happy to answer any questions or inquiries that you may have. Our
            contact information is listed below, and we look forward to hearing
            from you soon.
          </p>
        </div>
      </section>
      <div className={classes["contact-cards"]}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src="/images/inquiryIcon.svg" alt="inquiryIcon" />
          <h1 className={classes["card-heading"]}>General Inquiries</h1>
          <div className={classes["contactCard-text"]}>
            <p>For General Enquiries Send us an E-Mail at</p>
            <span>info@inspedium.email</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src="/images/supportIcon.svg" alt="inquiryIcon" />
          <h1 className={classes["card-heading"]}>Contact Support</h1>
          <div className={classes["contactCard-text"]}>
            <p>For General Enquiries Send us an E-Mail at</p>
            <span>info@inspedium.email</span>
          </div>
        </div>
      </div>
      <section className={classes["contact-form"]}>
        <div className={classes["contact-inputs"]}>
          <h1>Say Hi!</h1>
          <p>We'd like to talk with you.</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                required
                type="text"
                name="name"
                placeholder="Full Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="message">Your Message</label>
              <textarea
                required
                id="message"
                name="message"
                rows="10"
                cols="50"
                type="text"
                placeholder="I want to say that..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </div>
            <Button type="submit" variant="contained">
              Send Message
            </Button>
          </form>
        </div>
        <div className={classes["LeftSide-section"]}>
          <div className={classes["LeftSide-Text"]}>
            <h1>Contact Information</h1>
            <p>
              Fill up the form and our Team will get back to you within 24
              hours.
            </p>
            <div className={classes["icon-text"]}>
              <Email /> <span>info@inspedium.email</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
