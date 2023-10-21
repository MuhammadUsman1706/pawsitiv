import React, { useEffect, useRef, useState } from "react";
import CharacteristicChart from "./BreedDetailElements/CharacteristicChart";
import Carousel from "react-material-ui-carousel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SetMealOutlinedIcon from "@mui/icons-material/SetMealOutlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";
import CleaningServicesOutlinedIcon from "@mui/icons-material/CleaningServicesOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import classes from "./BreedDetail.module.css";
import {
  Divider,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PaginatedBreedList from "./BreedListElements/PaginatedBreedList";
import Link from "next/link";
import { useRouter } from "next/router";

let breedOrigin;

const BreedDetail = ({ breedListData, fetchedData }) => {
  const router = useRouter();


  const [breedDetails, setBreedDetails] = useState(null);
  const [breedList, setBreedList] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  // const searchRef = useRef();

  const filterByKeywordsHandler = (event) => {
    // if (!breedList) return;
    const query = event.target.value;
    setSearchValue(event.target.value);

    if (query?.length >= 3) {
      setBreedList(
        breedOrigin?.filter((breed) =>
          breed.breed_name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
    else {
      setBreedList(breedListData);
    }

    // const value = event.target.value;
    // if (!value) {
    //   setBreedList(breedOrigin);
    // }
    // if (!breedList || value.length < 3) return;

    // setBreedList(
    //   breedOrigin?.filter((breed) =>
    //     breed.breed_name.toLowerCase().includes(value.toLowerCase())
    //   )
    // );
  };

  useEffect(() => {
    setBreedDetails(fetchedData);
  }, [fetchedData]);

  useEffect(() => {
    breedOrigin = breedListData;
    setBreedList(breedListData);
  }, []);

  return (
    breedDetails && (
      <div className={classes["breed-detail"]}>
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
                placeholder="Search Breeds"
                inputProps={{ "aria-label": "search breeds" }}
                onChange={filterByKeywordsHandler}
                // inputRef={searchRef}
                // onChange={(event) => setSearchValue(event.target.value)}
                // onKeyPress={(event) => {
                //   if (event.key === "Enter") {
                //     event.preventDefault();
                //     filterByKeywordsHandler();
                //   }
                // }}
                value={searchValue}
              />

              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton
                onClick={filterByKeywordsHandler}
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
        </header>

        <div className={classes["breed-list"]}>
          {searchValue.length >= 3 && breedList?.map((breed, index) => (
            <div key={index} className={classes["breed-card"]}>
              <img
                loading="lazy"
                src={breed.profile_photo}
                alt={breed.breed_name}
              />
              <span>
                {/* <Link
                  href={`/breed-detail/${breed.breed_name}/${breed.id}`}
                // as={`breed-detail/${breed.breed_name}`}
                > */}
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    router.push(
                      `/breed-detail/${breed.breed_name.split(' ').join('_')}/${breed.id}`
                    )
                    setBreedList([])
                    setSearchValue('')
                  }
                  }
                // href={`/breed-detail/${breed.breed_name}/${breed.id}`}
                >
                  <Typography variant="h6" component="p">
                    {breed.breed_name}
                  </Typography>
                </div>
              </span>
            </div>
          ))

          }
        </div >

        <div className={classes.header}>
          <div className={classes.about}>
            <Typography variant="h3" component="h1">
              {breedDetails?.breed.breed_name}
            </Typography>
            <p variant="h6" component="p">
              {breedDetails?.breed.about_the_breed}
            </p>
          </div>
          <Carousel
            className={classes.carousel}
            swipe={true}
            cycleNavigation={true}
            autoPlay
            indicators
          >
            {breedDetails?.media?.map((item, i) => (
              <div key={i} className={classes.image}>
                <img src={item} alt={breedDetails.breed.breed_name} />
              </div>
            ))}
          </Carousel>
        </div>

        <div className={classes["basic-char"]}>
          <Typography variant="h5" component="h2">
            Average sizes and life expectancy of the breed.
          </Typography>

          <div>
            <div className={classes.attribute}>
              <svg class="icon icon-breed-height" viewBox="0 0 79 54">
                <g fill="none" fill-rule="evenodd">
                  <path
                    d="M54.9 52.627c-3.466.296-4.661-1.02-4.247-4.322.183-1.46.023-2.973-.118-4.45-.306-3.235-.751-6.459-1.028-9.695-.094-1.105-.523-1.484-1.654-1.73-3-.65-5.952-1.497-9.039-2.296-3.087-.798-2.359-1.124-3.843-.737-1.484.388-1.474 1.004-2.233 2.324-1.658 2.885-3.918 5.374-6.896 7.065-3.446 1.956-3.36 5.301-4.03 8.365-.283 1.298-.21 2.505 1.336 3.321.506.267.528 1.364.772 2.082-.6.156-1.214.487-1.797.442-3.901-.302-4.345-.958-3.959-4.807.163-1.622.029-3.28-.089-4.915-.163-2.268-.287-4.408 1.54-6.319 2.305-2.412 1.949-5.425 1.229-8.274-.615-2.429-1.66-4.76-2.591-7.348-.764.507-1.762 1.098-2.67 1.794-.898.689-1.695 1.497-2.557 2.23-2.906 2.472-6.257 2.545-9.766 1.567-.466-.13-.842-.55-1.26-.835l.137-.465c1.176 0 2.359-.076 3.527.016 2.44.19 4.398-.708 6.123-2.244 1.804-1.607 3.598-3.225 5.439-4.793 3.98-3.39 8.539-4.964 13.989-4.682 5.64.294 11.304.345 16.868-1.169 3.875-1.055 6.707-3.017 8.594-6.465 1.05-1.92 2.641-2.895 4.06-4.618.33-.4.938-.81 1.437-.833 2.902-.132 6.042-.836 8.24 1.077.234.203.59.43.592.648.024 2.907 2.862 3.227 4.584 4.563.361.28.868.425 1.151.754.21.243.334.756.209 1.028-1.821 3.911-4.163 5.034-8.734 4.347-.488-.074-1.21.111-1.543.437-2.522 2.466-3.38 5.732-4.13 8.902-.649 2.746-1.488 5.367-3.31 7.521-3.25 3.844-4.055 8.361-4.478 13.032-.09.995.06 2.015-.085 2.998-.266 1.785-.282 3.363 1.765 4.318.435.204 1.028.868 1.028 1.702s-1.842.402-2.562.464z"
                    stroke="#BABABA"
                    mask="url(#mask-2)"
                  ></path>
                  <path
                    stroke="#09F"
                    mask="url(#mask-2)"
                    transform="matrix(-1 0 0 1 96 0)"
                    d="M50 19.667h-4"
                  ></path>
                  <path
                    stroke="#09F"
                    mask="url(#mask-2)"
                    transform="matrix(-1 0 0 1 94 0)"
                    d="M48 22.94h-2"
                  ></path>
                  <path
                    stroke="#09F"
                    mask="url(#mask-2)"
                    transform="matrix(-1 0 0 1 92 0)"
                    d="M55 13H37"
                  ></path>
                  <path
                    stroke="#09F"
                    mask="url(#mask-2)"
                    transform="matrix(-1 0 0 1 94 0)"
                    d="M48 16.273h-2"
                  ></path>
                  <path
                    stroke="#09F"
                    mask="url(#mask-2)"
                    transform="matrix(-1 0 0 1 96 0)"
                    d="M50 26.333h-4"
                  ></path>
                  <path
                    stroke="#09F"
                    mask="url(#mask-2)"
                    transform="matrix(-1 0 0 1 94 0)"
                    d="M48 29.607h-2"
                  ></path>
                  <path
                    stroke="#09F"
                    mask="url(#mask-2)"
                    transform="matrix(-1 0 0 1 96 0)"
                    d="M50 33h-4"
                  ></path>
                  <path
                    stroke="#09F"
                    mask="url(#mask-2)"
                    transform="matrix(-1 0 0 1 94 0)"
                    d="M48 36.273h-2"
                  ></path>
                  <path
                    stroke="#09F"
                    mask="url(#mask-2)"
                    transform="matrix(-1 0 0 1 96 0)"
                    d="M50 39.667h-4"
                  ></path>
                  <path
                    stroke="#09F"
                    mask="url(#mask-2)"
                    transform="matrix(-1 0 0 1 94 0)"
                    d="M48 42.94h-2"
                  ></path>
                  <path
                    stroke="#09F"
                    mask="url(#mask-2)"
                    transform="matrix(-1 0 0 1 96 0)"
                    d="M50 46.333h-4"
                  ></path>
                  <path
                    stroke="#09F"
                    mask="url(#mask-2)"
                    transform="matrix(-1 0 0 1 94 0)"
                    d="M48 49.607h-2"
                  ></path>
                  <path
                    stroke="#09F"
                    mask="url(#mask-2)"
                    transform="matrix(-1 0 0 1 92 0)"
                    d="M46.137 13.365L45.922 53"
                  ></path>
                </g>
              </svg>
              <div>
                <p>HEIGHT</p>
                {breedDetails?.breed?.height_male.replace("TO", "-")} CMs
              </div>
            </div>

            <div className={classes.attribute}>
              <svg class="icon icon-breed-weight" viewBox="0 0 56 55">
                <g fill="none" fill-rule="evenodd">
                  <path
                    d="M47.825 54.5H8.175a5.485 5.485 0 01-3.802-1.526 5.485 5.485 0 01-1.693-3.73l-1.903-43a5.483 5.483 0 011.437-3.957A5.483 5.483 0 016.017.506L49.73.5c1.518 0 2.893.616 3.889 1.61a5.483 5.483 0 011.61 3.88L53.32 49.242a5.485 5.485 0 01-1.693 3.731 5.485 5.485 0 01-3.802 1.526z"
                    stroke="#BABABA"
                  ></path>
                  <path
                    d="M28.06 25.667h13.07l8.238-9.195c-7.061-6.093-14.164-9.139-21.309-9.139-7.144 0-14.287 3.046-21.427 9.139l8.239 9.195h13.188zM16.211 11l1.473 2.933M40.526 11l-1.473 2.933M27.632 7.333V13.2"
                    stroke="#BABABA"
                  ></path>
                  <path fill="#09F" d="M27.953 15.4L25.79 25.667h4.422z"></path>
                </g>
                <g fill="none" fill-rule="evenodd">
                  <path
                    d="M47.825 54.5H8.175a5.485 5.485 0 01-3.802-1.526 5.485 5.485 0 01-1.693-3.73l-1.903-43a5.483 5.483 0 011.437-3.957A5.483 5.483 0 016.017.506L49.73.5c1.518 0 2.893.616 3.889 1.61a5.483 5.483 0 011.61 3.88L53.32 49.242a5.485 5.485 0 01-1.693 3.731 5.485 5.485 0 01-3.802 1.526z"
                    stroke="#BABABA"
                  ></path>
                  <path
                    d="M28.06 25.667h13.07l8.238-9.195c-7.061-6.093-14.164-9.139-21.309-9.139-7.144 0-14.287 3.046-21.427 9.139l8.239 9.195h13.188zM16.211 11l1.473 2.933M40.526 11l-1.473 2.933M27.632 7.333V13.2"
                    stroke="#BABABA"
                  ></path>
                  <path fill="#09F" d="M27.953 15.4L25.79 25.667h4.422z"></path>
                </g>
              </svg>
              <div>
                <p>WEIGHT</p>
                {breedDetails?.breed?.weight_male.replace("TO", "-")} KGs
              </div>
            </div>

            <div className={classes.attribute}>
              <svg class="icon icon-breed-life-expectancy" viewBox="0 0 56 58">
                <g fill="none" fill-rule="evenodd">
                  <path
                    stroke="#BABABA"
                    stroke-linecap="square"
                    d="M4.911 42.5H51"
                  ></path>
                  <path
                    d="M51.5 50.5h-47V27c0-1.243.504-2.368 1.318-3.182A4.486 4.486 0 019 22.5h38c1.243 0 2.368.504 3.182 1.318A4.486 4.486 0 0151.5 27v23.5z"
                    stroke="#BABABA"
                  ></path>
                  <rect
                    stroke="#BABABA"
                    x=".5"
                    y="50.5"
                    width="55"
                    height="7"
                    rx="3.5"
                  ></rect>
                  <path
                    fill="#BABABA"
                    d="M16 14h1v9h-1zM28 14h1v9h-1zM40 14h1v9h-1z"
                  ></path>
                  <path
                    d="M5 30c2.601 2.667 4.877 4 6.827 4 2.925 0 4.91-4 6.221-4s3.852 4 7.208 4c3.355 0 5.407-4 7.334-4 1.927 0 3.856 4 6.598 4 2.743 0 4.67-4 6.481-4 1.207 0 2.984 1.06 5.331 3.18"
                    stroke="#BABABA"
                  ></path>
                  <path
                    d="M15.475 0c.564 2.94.201 4.925-1.09 5.953-1.938 1.54-1.956 6.07.674 7.592 2.63 1.522 4.941-.962 4.941-4.66C20 6.42 18.492 3.458 15.475 0zM27.475 0c.564 2.94.201 4.925-1.09 5.953-1.938 1.54-1.956 6.07.674 7.592 2.63 1.522 4.941-.962 4.941-4.66C32 6.42 30.492 3.458 27.475 0zM39.475 0c.564 2.94.201 4.925-1.09 5.953-1.938 1.54-1.956 6.07.674 7.592 2.63 1.522 4.941-.962 4.941-4.66C44 6.42 42.492 3.458 39.475 0z"
                    fill="#09F"
                  ></path>
                </g>
              </svg>
              <div>
                <p>LIFE EXPECTANCY</p>
                {breedDetails?.breed?.life_span.replace("TO", "-")} Years
              </div>
            </div>
          </div>
        </div>

        <div className={classes["adv-char"]}>
          <Typography variant="h4" component="h1">
            Breed Traits & Characteristics
          </Typography>

          {breedDetails && <CharacteristicChart data={breedDetails.ratings} />}
        </div>

        <div className={classes.care}>
          <header>
            <Typography variant="h4" component="h1">
              What To Expect When Caring For {breedDetails?.breed.breed_name}
            </Typography>
            <br />
            <Typography variant="h6" component="p">
              Having a dog{" "}
              <em>
                <strong>
                  is more than just a privilege; it's an immense responsibility.
                </strong>
              </em>{" "}
              As pet owners, we are responsible for ensuring our furry friends
              have adequate food and shelter, but they also deserve much more
              than that. When you bring a dog into your life, it's essential to
              comprehend the level of commitment required.
            </Typography>
          </header>

          <main className={classes.accordion}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.typography}>
                  <span>
                    <HealthAndSafetyIcon fontSize="inherit" />
                  </span>
                  Health
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{breedDetails.breed.health}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.typography}>
                  <span>
                    <FavoriteBorderOutlinedIcon fontSize="inherit" />
                  </span>
                  Care
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{breedDetails.breed.care}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.typography}>
                  <span>
                    <SetMealOutlinedIcon fontSize="inherit" />
                    {/* <img
                      width="54"
                      src="https://www.portablepress.com/wp-content/uploads/2014/04/220px-KFC_logo.svg_.jpg"
                      alt="KFC"
                    /> */}
                  </span>
                  Feeding
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{breedDetails.breed.feeding}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.typography}>
                  <span>
                    <ChildCareOutlinedIcon fontSize="inherit" />
                  </span>
                  Children and Pets
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{breedDetails.breed.children_and_pets}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.typography}>
                  <span>
                    <CleaningServicesOutlinedIcon fontSize="inherit" />
                  </span>
                  Grooming
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{breedDetails.breed.grooming}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.typography}>
                  <span>
                    <SentimentSatisfiedOutlinedIcon fontSize="inherit" />
                  </span>
                  Personality
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{breedDetails.breed.personality}</Typography>
              </AccordionDetails>
            </Accordion>
          </main>
        </div>
      </div >
    )
  );
};

export default BreedDetail;
