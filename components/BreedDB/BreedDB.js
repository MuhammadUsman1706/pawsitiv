import React, { useEffect, useRef, useState } from "react";
import PaginatedBreedList from "./BreedDBElements/PaginatedBreedList";
import {
  CircularProgress,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import classes from "./BreedDB.module.css";
import { useRouter } from "next/router";

let breedOrigin;

const alphabets = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const BreedDB = ({ fetchedData, profiles = false }) => {
  const [breedList, setBreedList] = useState(null);

  // const [searchValue, setSearchValue] = useState(null);
  const searchRef = useRef();
  const router = useRouter();
  const searchKeyword = profiles ? "dogs_name" : "breed_name";
  const filterByAlphabetHandler = (event) => {
    if (!breedList) return;
    // setSearchValue("");
    searchRef.current.value = "";

    setBreedList(
      breedOrigin.filter((breed) => breed[searchKeyword][0] === event.target.id)
    );
  };

  const filterByKeywordsHandler = (event) => {
    const value = event.target.value;
    if (!value) {
      setBreedList(breedOrigin);
    }
    if (!breedList || value.length < 3) return;

    setBreedList(
      breedOrigin.filter((breed) =>
        breed[searchKeyword].toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    breedOrigin = fetchedData;
    setBreedList(fetchedData);
  }, []);

  // if (router?.isFallback) {
  //   return (
  //     <div className="loading">
  //       <CircularProgress size={50} />
  //       <Typography variant="h5">Please Wait</Typography>
  //     </div>
  //   );
  // }

  return (
    <main className={classes["breed-list-main"]}>
      <div className={classes.header}>
        <Typography variant="h2" component="h1">
          {profiles ? router.query?.breedName : "Dog Database"}
        </Typography>
        <Typography variant="h6" component="p">
          {profiles
            ? `This is the list of all ${router.query?.breedName}s we have in our database.`
            : "This is the official list of all American Kennel Club Breed Database."}
        </Typography>
      </div>

      <div className={classes["breed-list-section"]}>
        <header className={classes.filter}>
          <div className={classes.alphabets}>
            {alphabets.map((alphabet) => (
              <p key={alphabet} onClick={filterByAlphabetHandler} id={alphabet}>
                {alphabet}
              </p>
            ))}
          </div>

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
                // placeholder="Search Breeds"
                placeholder={
                  profiles
                    ? `Search ${router.query.breedName}`
                    : "Search Breeds"
                }
                inputProps={{ "aria-label": "search breeds" }}
                onChange={filterByKeywordsHandler}
                inputRef={searchRef}
                // onChange={(event) => setSearchValue(event.target.value)}
                // onKeyPress={(event) => {
                //   if (event.key === "Enter") {
                //     event.preventDefault();
                //     filterByKeywordsHandler();
                //   }
                // }}
                // value={searchValue}
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

        {breedList && (
          <PaginatedBreedList
            profiles={profiles}
            itemsPerPage={16}
            items={breedList}
          />
        )}
      </div>
    </main>
  );
};

export default BreedDB;
