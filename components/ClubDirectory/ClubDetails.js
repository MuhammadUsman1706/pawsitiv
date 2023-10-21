import React, { useEffect, useState } from "react";
import classes from "./ClubDetails.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import {
  Typography,
  Divider,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { postClubContact, verifyCaptcha } from "@/pages/api";

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

let clubOrigin;

export default function ClubDetails({ clubData, clubDetail }) {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [clubInfo, setClubInfo] = useState(null);
  useEffect(() => {
    setClubInfo(clubDetail);
  }, [clubDetail]);

  const [searchValue, setSearchValue] = useState("");
  const [clubList, setClubList] = useState([]);
  let count = 25;

  const filterByKeywordsHandler = (event) => {
    const query = event.target.value;
    setSearchValue(query);
    if (query?.length >= 3) {
      setClubList(
        clubOrigin?.filter((clubData) =>
          clubData.clubs_name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setClubList(clubData);
    }
  };

  const filterByIconClick = () => {
    if (!clubList) return;

    setClubList(
      clubOrigin.filter((clubData) =>
        clubData.clubs_name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  useEffect(() => {
    clubOrigin = clubData;
    setClubList(clubData);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = await executeRecaptcha();
    const response = await verifyCaptcha(token);

    if (response.success && response.score > 0.5) {

      const club_name = clubInfo?.clubs_name;
      const club_id = clubInfo?.id;

      const formData = {
        name,
        email,
        message,
        club_name,
        club_id,
      };
      postClubContact(formData);

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
    <main className={classes["main-club-detail"]}>
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
              placeholder="Search Clubs"
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
      <div className={classes["club-list"]}>
        {searchValue.length >= 3 &&
          clubList?.map((clubMembers) => (
            // <Link
            //   key={clubMembers.id}
            //   href={`/club-directory/${clubMembers.clubs_name.split(' ').join('_')}/${clubMembers.id}`}
            // >
            <div
              key={clubMembers.id}
              onClick={() => {
                router.push(
                  `/club-directory/${clubMembers.clubs_name
                    .split(" ")
                    .join("_")}/${clubMembers.id}`
                );
                setClubList([]);
                setSearchValue("");
              }}
            >
              <div className={classes["club-member-detail"]}>
                <img
                  className={classes["club-img"]}
                  loading="lazy"
                  src={clubMembers.image}
                  alt={clubMembers.clubs_name}
                />
                <div className={classes["club-member-text"]}>
                  <span>
                    {clubMembers.clubs_name.slice(0, count) +
                      (clubMembers.clubs_name.length > count ? "..." : "")}
                  </span>
                  <span>{clubMembers.country_of_origin}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className={classes["club-profile"]}>
        <img
          className={classes["profile-img"]}
          src={clubInfo?.logo}
          alt={clubInfo?.clubs_name}
        />
        <span>{clubInfo?.clubs_name}</span>
      </div>
      <hr style={{ marginTop: 15, height: 2, background: "lightgray" }}></hr>
      <div className={classes["club-main-Div"]}>
        <div className={classes["club-main-info"]}>
          <div className={classes["club-info-subDiv"]}>
            <div className={classes["club-info-text"]}>
              <span>Club Name:</span>
              <span>{clubInfo?.clubs_name}</span>
            </div>
            <div className={classes["club-info-text"]}>
              <span>Contact Person:</span>
              <span>{clubInfo?.contact_person}</span>
            </div>
            <div className={classes["club-info-text"]}>
              <span>Designation:</span>
              <span>{clubInfo?.designation}</span>
            </div>
            <div className={classes["club-info-text"]}>
              <span>Country :</span>
              <span>{clubInfo?.country_of_origin}</span>
            </div>
            <div className={classes["club-info-text"]}>
              <span>City:</span>
              <span>{clubInfo?.city_of_origin}</span>
            </div>
          </div>
          <div className={classes["club-info-subDiv"]}>
            <div className={classes["club-info-text"]}>
              <span>Email:</span>
              {/* <span>{clubInfo?.email}</span> */}
              <Button onClick={handleOpen}>Contact Club </Button>

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
                          <label for="name">Name</label>
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
                          <label for="email">Email</label>
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
            <div className={classes["club-info-text"]}>
              <span>Phone:</span>
              <span>{clubInfo?.phone}</span>
            </div>
            <div className={classes["club-info-text"]}>
              <span>Affiliated with:</span>
              <span>{clubInfo?.affiliatedBy}</span>
            </div>
            <div className={classes["club-info-text"]}>
              <span>Website:</span>
              <span>{clubInfo?.website}</span>
            </div>
            <div className={classes["club-info-text"]}>
              <span>Address:</span>
              <span>{clubInfo?.address}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
