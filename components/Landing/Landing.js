import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactCountryFlag from "react-country-flag";
import { postSubscription, verifyCaptcha } from "@/pages/api";
import { createTheme } from "@mui/material/styles";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {
  Autocomplete,
  Button,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";

import classes from "./Landing.module.css";

let subscribed = false;

const Landing = ({ dogNames, statistics, recentResults }) => {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [selectedDogBreed, setSelectedDogBreed] = useState(null);
  const [subscribeDetails, setSubscribeDetails] = useState({});
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const setSubscribeDetailsHandler = (event, value) => {
    if (value) {
      setSubscribeDetails((prevState) => ({
        ...prevState,
        breed: value.id,
      }));
    } else {
      setSubscribeDetails((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const submitSubscriptionHandler = async (event) => {
    event.preventDefault();
    const token = await executeRecaptcha();
    const response = await verifyCaptcha(token);
    if (subscribed) return;

    if (response.success && response.score > 0.5) {
      await postSubscription(subscribeDetails);
      subscribed = true;
    } else {
      toast.error(
        "There was an error verifying you request, please refresh and try again!"
      );
    }
  };

  const searchEventsHandler = (event) => {
    event.preventDefault();
    if (!selectedDogBreed) return;
    // const index = dogNames.indexOf(selectedDogBreed);
    router.push(
      `/show-results/${selectedDogBreed?.label}/${selectedDogBreed?.id}`
    );
  };

  return (
    <main className={classes.landing}>
      <section className={classes["hero-section"]}>
        <div className={classes.overlay} />
        <div className={classes.header}>
          <h1>World's Largest Online Dog Database</h1>
          <h4>Over 50,000,000 Dogs are listed in our System</h4>
        </div>
        <form onSubmit={searchEventsHandler} className={classes.search}>
          <ThemeProvider theme={theme}>
            <Autocomplete
              disablePortal
              options={dogNames}
              sx={{
                width: "40%",
                color: "white",
                border: 1,
                borderRadius: 1,
                borderColor: "white !important",
              }}
              onChange={(_, value) => setSelectedDogBreed(value)}
              renderInput={(params) => (
                <TextField
                  //   sx={{ border: "1px solid white", borderRadius: "4px" }}
                  {...params}
                  required
                  label="Enter Breed Name"
                />
              )}
            />
          </ThemeProvider>
          <Button type="submit" sx={{ width: "10%" }} variant="contained">
            SEARCH
          </Button>
        </form>
      </section>

      <section className={classes["recents"]}>
        <Typography variant="h3" component="h1">
          Recent Results
        </Typography>
        {/* <div className={classes.wrapper}>
          <div>
            <h2>Recent Champion</h2>
            <ul>
              <li>
                <span>Dog name: </span> Triss Merigold
              </li>
              <li>
                <span>Show Res: </span> Champion
              </li>
              <li>
                <span>Club Name: </span> Temerian Sorceress
              </li>
              <li>
                <span>Event Name: </span> ABC Event
              </li>
              <li>
                <span>Country/ City: </span> Temeria
              </li>
              <li>
                <span>Sire/ Dam: </span> Keira Metz
              </li>
              <li>
                <span>Breed: </span> Sorceress
              </li>
            </ul>
          </div>
          <hr />
          <div>
            <h2>Recent Event</h2>
            <ul>
              <li>
                <span>Event name: </span> Triss Merigold
              </li>
              <li>
                <span>Club: </span> Temerian Sorceress
              </li>
              <li>
                <span>Date: </span> 05/10/2020
              </li>
              <li>
                <span>Country/ City: </span> Temeria
              </li>
              <li>
                <span>Judge: </span> Geralt of Rivia
              </li>
            </ul>
          </div>
        </div> */}
        <div className={classes["table-parent"]}>
          <table className={classes.table}>
            <thead>
              <tr>
                <th
                  style={{
                    borderTopLeftRadius: "5px",
                  }}
                >
                  Date
                </th>
                <th>Event</th>
                <th>Breed Name</th>
                <th>Club/Org</th>
                <th
                  style={{
                    borderTopRightRadius: "5px",
                  }}
                >
                  Country/City
                </th>
              </tr>
            </thead>
            <tbody>
              {recentResults?.length > 0 ? (
                recentResults.map((data, index) => (
                  <tr key={index}>
                    <td>{new Date(data.start_date).toDateString()}</td>
                    <td>
                      <Link href={`/results/${data.breedName}/${data.eventId}`}>
                        {data.event}
                      </Link>
                    </td>
                    <td>{data.breedName}</td>
                    <td>{data.club}</td>
                    <td id={classes.country}>
                      {data.country}
                      &nbsp;
                      <ReactCountryFlag svg countryCode={data.countryCode} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>-</td>
                  <td>No recent results</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className={classes.statistics}>
        <Typography variant="h3" component="h1">
          Our Statistics
        </Typography>
        <div className={classes["statistic-cards"]}>
          <div className={classes["statistic-card"]}>
            <Typography variant="h3">{statistics.totalNoEvents}</Typography>
            <Typography>Total Events in Our System</Typography>
            <div id={classes["svg-1"]} className={classes.svg} />
          </div>
          <div className={classes["statistic-card"]}>
            <Typography variant="h3">{statistics.totalNoClubs}</Typography>
            <Typography>Total No. of Clubs</Typography>
            <div id={classes["svg-2"]} className={classes.svg} />
          </div>
          <div className={classes["statistic-card"]}>
            <Typography variant="h3">{statistics.totalNoDogs}</Typography>
            <Typography>Total No. of Dogs</Typography>
            <div id={classes["svg-3"]} className={classes.svg} />
          </div>
          <div className={classes["statistic-card"]}>
            <Typography variant="h3">{statistics.totalNoBreeds}</Typography>
            <Typography>Total No. of Breeds</Typography>
            <div id={classes["svg-4"]} className={classes.svg} />
          </div>
        </div>
      </section>

      <form onSubmit={submitSubscriptionHandler} className={classes.updates}>
        {/* <h1>SUBSCRIBE FOR UPDATES</h1> */}
        <Typography variant="h3" component="h1">
          Subscribe For Updates
        </Typography>
        <div>
          <TextField
            name="name"
            onChange={setSubscribeDetailsHandler}
            required
            id="outlined-basic"
            label="Name"
            variant="outlined"
          />
          <TextField
            name="email"
            type="email"
            onChange={setSubscribeDetailsHandler}
            required
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          {/* <TextField id="outlined-basic" label="Breed" variant="outlined" /> */}
          <Autocomplete
            disablePortal
            options={dogNames}
            name="breed"
            onChange={setSubscribeDetailsHandler}
            className={classes["breed-selector"]}
            renderInput={(params) => (
              <TextField
                required
                name="breed"
                {...params}
                label="Enter Breed Name"
              />
            )}
          />
        </div>
        <Button type="submit" variant="contained">
          Subscribe
        </Button>
      </form>
    </main>
  );
};

export default Landing;
