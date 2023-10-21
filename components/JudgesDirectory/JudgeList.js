import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Button,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import classes from "./JudgeList.module.css";

let judgeOrigin;

const JudgeList = ({ fetchedJudges }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [judgeList, setJudgeList] = useState([]);

  const filterByIconClick = () => {
    if (!judgeList) return;

    setJudgeList(
      judgeOrigin.filter((judge) =>
        judge.full_name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  const filterByKeywordsHandler = (event) => {
    const query = event.target.value;
    setSearchValue(event.target.value);

    if (query?.length >= 3) {
      setJudgeList(
        judgeOrigin.filter((judge) =>
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

  return (
    <main className={classes["judge-list-main"]}>
      <div className={classes.header}>
        <Typography variant="h2" component="h1">
          Our Judges
        </Typography>
        <Typography variant="h6" component="p">
          This is the official list of all Judges.
        </Typography>
      </div>

      <div className={classes["breed-list-section"]}>
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
          {judgeList.map((judge, index) => (
            <div key={index} className={classes["judge-card"]}>
              <div className={classes["judge-image"]}>
                <img src={judge.image} alt={judge.full_name} />
              </div>
              <Link
                href={`/judges-directory/${judge.full_name
                  .split(" ")
                  .join("_")}/${judge.id}`}
              >
                <Typography variant="h5" component="h2">
                  {judge.full_name}
                </Typography>
              </Link>
              <Typography style={{ fontWeight: "bold" }}>
                {judge.position_in_club}
              </Typography>
              <Button
                onClick={() =>
                  router.push(
                    `/judges-directory/${judge.full_name
                      .split(" ")
                      .join("_")}/${judge.id}`
                  )
                }
                variant="outlined"
              >
                Read Bio
              </Button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default JudgeList;
