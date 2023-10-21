import React, { useEffect, useRef, useState } from "react";
import PaginatedBreedList from "./BreedListElements/PaginatedBreedList";
import {
  Divider,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import classes from "./BreedList.module.css";

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

const BreedList = ({ fetchedData }) => {

  const [breedList, setBreedList] = useState(null);
  // const [searchValue, setSearchValue] = useState(null);
  const searchRef = useRef();

  const filterByAlphabetHandler = (event) => {
    if (!breedList) return;

    searchRef.current.value = "";
    setBreedList(
      breedOrigin.filter((breed) => breed.breed_name[0] === event.target.id)
    );
  };

  const filterByKeywordsHandler = (event) => {
    // if (!breedList) return;
    const value = event.target.value;
    if (!value) {
      setBreedList(breedOrigin);
    }
    if (!breedList || value.length < 3) return;

    setBreedList(
      breedOrigin.filter((breed) =>
        breed.breed_name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    breedOrigin = fetchedData;
    setBreedList(fetchedData);
  }, []);

  return (
    <main className={classes["breed-list-main"]}>
      <div className={classes.header}>
        <Typography variant="h2" component="h1">
          Dog Breeds
        </Typography>
        <Typography variant="h6" component="p">
          This is the official list of all American Kennel Club dog breeds.
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
                placeholder="Search Breeds"
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
          <PaginatedBreedList itemsPerPage={16} items={breedList} />
        )}
      </div>
    </main>
  );
};

export default BreedList;
