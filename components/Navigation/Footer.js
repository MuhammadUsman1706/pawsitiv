import React from "react";
import PetsIcon from "@mui/icons-material/Pets";

import classes from "./Footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.description}>
        <h1 className={classes["footer-heading"]}>
          <img
            className="logo"
            style={{ width: "30px" }}
            src="/images/logo.svg"
            alt="Pawsitiv"
          />
          PAWSITIV
        </h1>
        <p>
          Pawsitiv's dog pedigree database is the largest collection of dog
          pedigrees from around the world. Get started finding pedigree and
          ancestry information for any dog in our database by entering the dog's
          name in the header search form.
        </p>
      </div>
      <div className={classes.contact}>
        <h2>Contact & Legal</h2>
        <hr />
        <br />
        <ul>
          <li>
            <Link href="/contact-us">Contact Us</Link>
          </li>
          <li>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </li>
          <li>
            <a href="">Terms of Use</a>
          </li>
          {/* <li>
            <a href="">Cancellation Policy</a>
          </li> */}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
