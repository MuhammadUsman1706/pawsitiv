import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ReactHtmlParser from "react-html-parser";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import classes from "./JudgeDetails.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { postContact, verifyCaptcha } from "@/pages/api";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {
  Divider,
  IconButton,
  InputBase,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "700px",
  bgcolor: "background.paper",
  border: "2px solid white",
  borderRadius: 5,
  boxShadow: 24,
  padding: "32px 0px",
};

let judgeOrigin;

const JudgeDetails = ({ fetchedJudges, judgeDetail }) => {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [searchValue, setSearchValue] = useState("");
  const [judgeList, setJudgeList] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);


  // if (router?.isFallback) {
  //   return <div>Loading</div>;
  // }

  const filterByIconClick = () => {
    if (!judgeList) return;

    setJudgeList(
      judgeOrigin?.filter((judge) =>
        judge.full_name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  const filterByKeywordsHandler = (event) => {
    const query = event.target.value;
    setSearchValue(event.target.value);

    if (query?.length >= 3) {
      setJudgeList(
        judgeOrigin?.filter((judge) =>
          judge.full_name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setJudgeList(fetchedJudges);
    }
  };

  useEffect(() => {
    judgeOrigin = fetchedJudges;
    setJudgeList(fetchedJudges);
  }, []);

  if (router?.isFallback) {
    return (
      <div className="loading">
        <CircularProgress size={50} />
        <Typography variant="h5">Please Wait</Typography>
      </div>
    );
  }
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
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <main className={classes["judge-details"]}>
      <header className={classes.filter}>
        <div className={classes.search}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              maxWidth: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Judges"
              inputProps={{ "aria-label": "search breeds" }}
              onChange={filterByKeywordsHandler}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  filterByIconClick();
                }
              }}
              value={searchValue}
            />

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              onClick={filterByIconClick}
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
      </header>
      <div className={classes["judge-list"]}>
        {searchValue.length >= 3 &&
          judgeList.map((judge, index) => (
            <div key={index} className={classes["judge-card"]}>
              <div className={classes["judge-image"]}>
                <img src={judge.image} alt={judge.full_name} />
              </div>

              <a
                style={{ cursor: "pointer" }}
                onClick={(event) => {
                  event.preventDefault();
                  router.push(
                    `/judges-directory/${judge.full_name
                      .split(" ")
                      .join("_")}/${judge.id}`
                  );
                  setJudgeList([]);
                  setSearchValue("");
                }}
              >
                <Typography variant="h5" component="h2">
                  {judge.full_name}
                </Typography>
              </a>
              <Typography style={{ fontWeight: "bold" }}>
                {judge.position_in_club}
              </Typography>
              <Button
                onClick={() => {
                  router.push(
                    `/judges-directory/${judge.full_name
                      .split(" ")
                      .join("_")}/${judge.id}`
                  );
                  setJudgeList([]);
                  setSearchValue("");
                }}
                variant="outlined"
              >
                Read Bio
              </Button>
            </div>
          ))}
      </div>
      {/* <Typography
        className={classes.heading}
        variant="h2"
        component="h1"
        style={{ fontWeight: "bold" }}
      >
        Judge Profile
      </Typography> */}

      <div className={classes.mainBody}>
        <div className={classes.round}>
          <img
            // src="https://media.licdn.com/dms/image/C4D03AQHOWbtZ-BHXgA/profile-displayphoto-shrink_800_800/0/1663450693585?e=2147483647&v=beta&t=WpYhpccNv5EEgGMkTQMFTQ6TPf8vbTmEVpT2cGIa-rk"
            src={judgeDetail.profilePhoto}
            alt={judgeDetail.full_name}
          />
        </div>

        <div className={classes.text}>
          <div className={classes["heading_icons"]}>
            <div>
              <Typography
                variant="h3"
                component="h2"
                className={classes.judgeName}
              >
                {judgeDetail.full_name}
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                className={classes.judgePosition}

              >
                ({judgeDetail.position_in_club})
              </Typography>
            </div>

            <div className={classes.contact}>
              {judgeDetail.facebook && <a target="_blank" href={`${judgeDetail.facebook}`}>
                <FacebookIcon fontSize="inherit" />
              </a>}
              {judgeDetail.instagram && <a target="_blank" href={`${judgeDetail.instagram}`}>
                <InstagramIcon fontSize="inherit" />
              </a>}
              {judgeDetail.linkedIn && <a target="_blank" href={`${judgeDetail.linkedIn}`}>
                <LinkedInIcon fontSize="inherit" />
              </a>}
              {judgeDetail.twitter && <a target="_blank" href={`${judgeDetail.twitter}`}>
                <TwitterIcon fontSize="inherit" />
              </a>}
              {judgeDetail.twitter && <a href="#" onClick={handleOpen}>
                <EmailIcon fontSize="inherit" />
              </a>}
              {judgeDetail.phone && <a target="_blank" href={`${judgeDetail.phone}`}>
                <PhoneIcon fontSize="inherit" />
              </a>}

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
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
                  </section>
                </Box>
              </Modal>
            </div>
          </div>
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <div style={{ display: "flex", columnGap: 10, marginBottom:5 }}>
              <Typography variant="h7" component="h4"
                style={{ fontSize: 17, fontFamily: "Roboto, sans-serif" }}>Can Award:</Typography >
              <span style={{ fontSize: 17, fontFamily: "Roboto, sans-serif" }}>{judgeDetail.award}</span>
            </div>

            <div style={{ display: "flex", columnGap: 10, marginLeft: "-17%" }}>
              <Typography variant="h7" component="h4"
                style={{ fontSize: 17, fontFamily: "Roboto, sans-serif" }}>Breed</Typography >
              {Array.isArray(judgeDetail.breedNames) && (
                <span style={{ fontSize: 17, fontFamily: "Roboto, sans-serif" }}>{judgeDetail.breedNames.join(", ")}</span>
              )}

            </div>
          </div>
          <Typography style={{ fontFamily: 'Roboto, sans-serif', fontSize: "18px" }}>
            {ReactHtmlParser(judgeDetail.description)}
          </Typography>

        </div>
      </div>
    </main>
  );
};

export default JudgeDetails;
