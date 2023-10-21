import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, CircularProgress, Typography } from "@mui/material";

import classes from "./Results.module.css";

const AllResults = ({ fetchedData }) => {
  const router = useRouter();
  const [breedKeys, setBreedKeys] = useState([]);
  const [classKeys, setClassKeys] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [selectedGender, setSelectedGender] = useState("male");
  console.log(fetchedData?.breedData);

  const selectBreedHandler = (breed) => {
    const ckeys = Object.keys(fetchedData?.breedData[breed]);
    setClassKeys(ckeys);
    setSelectedBreed(breed);
    setSelectedClass(ckeys[0]);

    if (fetchedData?.breedData[breed][ckeys[0]]?.male) {
      setSelectedGender("male");
    } else {
      setSelectedGender("female");
    }
  };

  useEffect(() => {
    if (fetchedData?.breedData) {
      const keys = Object.keys(fetchedData?.breedData);
      const ckeys = Object.keys(fetchedData?.breedData[keys[0]]);
      setBreedKeys(keys);
      setClassKeys(ckeys);
      setSelectedBreed(keys[0]);
      setSelectedClass(ckeys[0]);

      if (!fetchedData?.breedData[keys[0]][ckeys[0]]?.male) {
        setSelectedGender("female");
      }
    }
  }, [fetchedData]);

  if (router?.isFallback) {
    return (
      <div className="loading">
        <CircularProgress size={50} />
        <Typography variant="h5">Please Wait</Typography>
      </div>
    );
  }

  const genderChangeHandler = (event) => {
    if (event.target.checked) {
      setSelectedGender("female");
    } else {
      setSelectedGender("male");
    }
  };

  return (
    <div className={classes.results}>
      <header className={classes.header}>
        <Typography variant="h4" component="h1">
          {fetchedData?.details?.event} Results
        </Typography>
        <hr />
        <Typography variant="h5" component="h1">
          Event Details
        </Typography>
        <Typography sx={{ marginTop: "0.5rem" }}>
          Date: {fetchedData?.details?.start_date} | Country:{" "}
          {fetchedData?.details?.country} | City: {fetchedData?.details?.city} |
          Club: {fetchedData?.details?.club}
        </Typography>
      </header>

      <main className={classes.main}>
        {fetchedData?.bestInShow?.length > 0 && (
          <Fragment>
            <hr />
            <div className={classes["best-in-show"]}>
              <Typography variant="h5" component="h2">
                BEST IN SHOW
              </Typography>
              <div className={classes["table-parent"]}>
                <table className={classes.table}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          borderTopLeftRadius: "5px",
                        }}
                      >
                        Dog Name
                      </th>
                      <th>Breed</th>
                      <th>Award(s)</th>
                      <th
                        style={{
                          borderTopRightRadius: "5px",
                        }}
                      >
                        Owner
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fetchedData?.bestInShow?.map((show, index) => (
                      <tr key={index}>
                        <td>{show.dogName}</td>
                        <td>{show.breed}</td>
                        <td>{show.awards}</td>
                        <td>{show.owner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Fragment>
        )}

        {fetchedData?.bestInGroup?.length && (
          <Fragment>
            <hr />
            <div className={classes["best-in-group"]}>
              <Typography variant="h5" component="h2">
                BEST IN GROUP
              </Typography>
              <div className={classes["table-parent"]}>
                <table className={classes.table}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          borderTopLeftRadius: "5px",
                        }}
                      >
                        Dog Name
                      </th>
                      <th>Award(s)</th>
                      <th>Owner</th>
                      <th>Breed</th>
                      <th
                        style={{
                          borderTopRightRadius: "5px",
                        }}
                      >
                        Group
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fetchedData?.bestInGroup?.length > 0 ? (
                      fetchedData?.bestInGroup?.map((show, index) => (
                        <tr key={index}>
                          <td>{show.dogName}</td>
                          <td>{show.breed}</td>
                          <td>{show.awards}</td>
                          <td>{show.owner}</td>
                          <td>{show.group}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>No entries to show</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Fragment>
        )}

        {breedKeys?.length > 0 && (
          <Fragment>
            <hr />
            <br />
            <div className={classes["breed-section"]}>
              <Typography variant="h3" component="h2">
                All Breeds Results
              </Typography>

              {/* <div className={classes.classes}>
                {classKeys.map((key) => (
                  <Button
                    key={key}
                    onClick={() => setSelectedClass(key)}
                    variant="outlined"
                  >
                    {key} class
                  </Button>
                ))}
              </div> */}

              <div className={classes.breeds}>
                {breedKeys.map((key) => {
                  if (key === selectedBreed) {
                    return (
                      <Button
                        key={key}
                        onClick={() => selectBreedHandler(key)}
                        variant="text"
                        sx={{ borderBottom: 1, backgroundColor: "#F6FAFD" }}
                      >
                        {key.replaceAll("_", " ")}
                      </Button>
                    );
                  } else {
                    return (
                      <Button
                        key={key}
                        onClick={() => selectBreedHandler(key)}
                        variant="text"
                      >
                        {key.replaceAll("_", " ")}
                      </Button>
                    );
                  }
                })}
              </div>
              <div className={classes.classes}>
                {classKeys.map((key) => {
                  if (key === selectedClass) {
                    return (
                      <Button
                        key={key}
                        onClick={() => setSelectedClass(key)}
                        variant="contained"
                      >
                        {key} class
                      </Button>
                    );
                  } else {
                    return (
                      <Button
                        key={key}
                        onClick={() => setSelectedClass(key)}
                        variant="outlined"
                      >
                        {key} class
                      </Button>
                    );
                  }
                })}
              </div>

              <div className={classes.gender}>
                <label htmlFor="male">Male</label>
                <label className={classes.switch}>
                  <input
                    checked={selectedGender === "male" ? false : true}
                    // defaultChecked={false}
                    onChange={genderChangeHandler}
                    type="checkbox"
                  />
                  <span className={`${classes.slider} ${classes.round}`}></span>
                </label>
                <label htmlFor="female">Female</label>
              </div>
              <div className={classes["table-parent"]}>
                <table className={classes.table}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          borderTopLeftRadius: "5px",
                        }}
                      >
                        Grading
                      </th>
                      <th>Place</th>
                      <th>Dog Name</th>
                      <th>Award(s)</th>
                      <th
                        style={{
                          borderTopRightRadius: "5px",
                        }}
                      >
                        Class
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fetchedData?.breedData[selectedBreed][selectedClass][
                      selectedGender
                    ]?.length > 0 ? (
                      fetchedData?.breedData[selectedBreed][selectedClass][
                        selectedGender
                      ].map((data, index) => (
                        <tr key={index}>
                          <td>{data.grading}</td>
                          <td>{data.place}</td>
                          <td>
                            <Link
                              href={`/breed-profile/${data.dogName.replaceAll(
                                " ",
                                "-"
                              )}/${data.dogId}`}
                            >
                              {data.dogName}
                            </Link>
                          </td>
                          <td>{data.awards}</td>
                          <td>{data.class}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>No Records to show</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Fragment>
        )}
      </main>
    </div>
  );
};

export default AllResults;
