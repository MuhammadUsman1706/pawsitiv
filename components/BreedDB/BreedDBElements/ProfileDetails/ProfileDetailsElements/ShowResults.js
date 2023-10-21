import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, Typography } from "@mui/material";

import classes from "./ShowResults.module.css";

const BEST_IN_SHOW_DUMMY = [
  {
    award: "BoB, BiG, Res.BiS, CACIB",
    eventName: "Lumber #1 Event",
    clubName: "Magush-Byp A-Jany Magma",
    place: "PetrolPump se aage Lassi wale k seedhe hath pr",
    date: new Date(),
  },
  {
    award: "BoB, BiG, Res.BiS, CACIB",
    eventName: "Lumber #1 Event",
    clubName: "Magush-Byp A-Jany Magma",
    place: "PetrolPump se aage Lassi wale k seedhe hath pr",
    date: new Date(),
  },
  {
    award: "BoB, BiG, Res.BiS, CACIB",
    eventName: "Lumber #1 Event",
    clubName: "Magush-Byp A-Jany Magma",
    place: "PetrolPump se aage Lassi wale k seedhe hath pr",
    date: new Date(),
  },
  {
    award: "BoB, BiG, Res.BiS, CACIB",
    eventName: "Lumber #1 Event",
    clubName: "Magush-Byp A-Jany Magma",
    place: "PetrolPump se aage Lassi wale k seedhe hath pr",
    date: new Date(),
  },
];

const BREED_DUMMY = [
  {
    grade: "Excellent",
    position: "Second",
    eventName: "Lumber #1 Event",
    clubName: "Magush-Byp A-Jany Magma",
    place: "PetrolPump se aage Lassi wale k seedhe hath pr",
  },
  {
    grade: "Excellent",
    position: "Second",
    eventName: "Lumber #1 Event",
    clubName: "Magush-Byp A-Jany Magma",
    place: "PetrolPump se aage Lassi wale k seedhe hath pr",
  },
  {
    grade: "Excellent",
    position: "Second",
    eventName: "Lumber #1 Event",
    clubName: "Magush-Byp A-Jany Magma",
    place: "PetrolPump se aage Lassi wale k seedhe hath pr",
  },
  {
    grade: "Excellent",
    position: "Second",
    eventName: "Lumber #1 Event",
    clubName: "Magush-Byp A-Jany Magma",
    place: "PetrolPump se aage Lassi wale k seedhe hath pr",
  },
];

const ShowResults = () => {
  const { profileName } = useRouter().query;

  return (
    <main className={classes["show-results"]}>
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
                  Award Name
                </th>
                <th>Event Name</th>
                <th>Club Name</th>
                <th>Place</th>
                <th
                  style={{
                    borderTopRightRadius: "5px",
                  }}
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {BEST_IN_SHOW_DUMMY.map((show, index) => (
                <tr key={index}>
                  <td>{show.award}</td>
                  <td>{show.eventName}</td>
                  <td>{show.clubName}</td>
                  <td>{show.place}</td>
                  <td>{show.date.toDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
                  Award Name
                </th>
                <th>Group</th>
                <th>Event Name</th>
                <th>Club Name</th>
                <th>Place</th>
                <th
                  style={{
                    borderTopRightRadius: "5px",
                  }}
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {BEST_IN_SHOW_DUMMY.map((show, index) => (
                <tr key={index}>
                  <td>{show.award}</td>
                  <td>Dark Horses</td>
                  <td>{show.eventName}</td>
                  <td>{show.clubName}</td>
                  <td>{show.place}</td>
                  <td>{show.date.toDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <hr />
      <div className={classes["breed-section"]}>
        <Typography variant="h5" component="h2">
          {profileName}
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
                  Grading
                </th>
                <th>Position</th>
                <th>Event Name</th>
                <th>Club Name</th>
                <th
                  style={{
                    borderTopRightRadius: "5px",
                  }}
                >
                  Place
                </th>
              </tr>
            </thead>
            <tbody>
              {BREED_DUMMY.map((data, index) => (
                <tr key={index}>
                  <td>{data.grade}</td>
                  <td>{data.position}</td>
                  <td>{data.eventName}</td>
                  <td>{data.clubName}</td>
                  <td>{data.eventName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default ShowResults;
