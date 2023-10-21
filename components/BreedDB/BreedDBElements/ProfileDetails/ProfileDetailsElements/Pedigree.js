import React from "react";
import dynamic from "next/dynamic";
// import { Tree, TreeNode } from "react-organizational-chart";
const Tree = dynamic(
  () => import("react-organizational-chart").then((mod) => mod.Tree),
  {
    ssr: false,
  }
);

const TreeNode = dynamic(
  () => import("react-organizational-chart").then((mod) => mod.TreeNode),
  {
    ssr: false,
  }
);

import { Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

import classes from "./Pedigree.module.css";
import Link from "next/link";

const Pedigree = () => {
  const PedigreeData = [
    {
      name: "Iris vom Wolfsberg",
      gender: "male",
      breed: "Affenpinscher",
      date: "2009-06-07",
      registrationNo: "KP 22042",
      generation: 1,
      children: [
        {
          name: "Iris Child Wolfsberg",
          gender: "female",
          breed: "Affenpinscher",
          date: "2009-06-07",
          registrationNo: "KP 22042",
          generation: 2,
          children: [
            {
              name: "Iris vom Wolfsberg",
              gender: "female",
              breed: "Affenpinscher",
              date: "2009-06-07",
              registrationNo: "KP 22042",
              generation: 3,
            },
            {
              name: "Iris vom Wolfsberg",
              gender: "female",
              breed: "Affenpinscher",
              date: "2009-06-07",
              registrationNo: "KP 22042",
              generation: 3,
            },
          ],
        },
        {
          name: "Iris Child Wolfsberg",
          gender: "male",
          breed: "Affenpinscher",
          date: "2009-06-07",
          registrationNo: "KP 22042",
          generation: 2,
          children: [
            {
              name: "Iris vom Wolfsberg",
              gender: "female",
              breed: "Affenpinscher",
              date: "2009-06-07",
              registrationNo: "KP 22042",
              generation: 3,
            },
            {
              name: "Iris vom Wolfsberg",
              gender: "female",
              breed: "Affenpinscher",
              date: "2009-06-07",
              registrationNo: "KP 22042",
              generation: 3,
            },
          ],
        },
      ],
    },
    {
      name: "Iris vom Wolfsberg",
      gender: "male",
      breed: "Affenpinscher",
      date: "2009-06-07",
      registrationNo: "KP 22042",
      generation: 1,
      children: [
        {
          name: "Iris Child Wolfsberg",
          gender: "female",
          breed: "Affenpinscher",
          date: "2009-06-07",
          registrationNo: "KP 22042",
          generation: 2,
          children: [
            {
              name: "Iris vom Wolfsberg",
              gender: "female",
              breed: "Affenpinscher",
              date: "2009-06-07",
              registrationNo: "KP 22042",
              generation: 3,
            },
            {
              name: "Iris vom Wolfsberg",
              gender: "female",
              breed: "Affenpinscher",
              date: "2009-06-07",
              registrationNo: "KP 22042",
              generation: 3,
            },
          ],
        },
        {
          name: "Iris Child Wolfsberg",
          gender: "male",
          breed: "Affenpinscher",
          date: "2009-06-07",
          registrationNo: "KP 22042",
          generation: 2,
          children: [
            {
              name: "Iris vom Wolfsberg",
              gender: "female",
              breed: "Affenpinscher",
              date: "2009-06-07",
              registrationNo: "KP 22042",
              generation: 3,
            },
            {
              name: "Iris vom Wolfsberg",
              gender: "female",
              breed: "Affenpinscher",
              date: "2009-06-07",
              registrationNo: "KP 22042",
              generation: 3,
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className={classes.pedigree}>
      <Tree lineWidth={"3px"} lineColor={"#1976d2"} lineBorderRadius={"10px"}>
        {PedigreeData.map((children, index) => (
          <TreeNodeElement key={index} data={children} />
        ))}
      </Tree>
    </div>
  );
};

export default Pedigree;

const TreeNodeElement = ({ data }) => {
  return (
    <TreeNode
      label={
        <TreeElement
          name={data.name}
          gender={data.gender}
          breed={data.breed}
          date={data.date}
          registrationNo={data.registrationNo}
          generation={data.generation}
        />
      }
    >
      {data?.children?.map((children, index) => (
        <TreeNodeElement key={index} data={children} />
      ))}
    </TreeNode>
  );
};

const TreeElement = ({
  name,
  gender,
  breed,
  date,
  registrationNo,
  generation,
}) => {
  return (
    <div
      style={{ fontSize: `${18 - generation * 2}px` }}
      className={classes["tree-element"]}
    >
      <div className={classes.title}>
        <Typography
          //   style={{ fontSize: `${18 - generation * 2}px` }}
          fontSize="inherit"
          variant="h1"
        >
          {name}
        </Typography>
        {gender === "male" ? (
          <span className={classes.male}>
            <MaleIcon fontSize="inherit" />
          </span>
        ) : (
          <span className={classes.female}>
            <FemaleIcon fontSize="inherit" />
          </span>
        )}
      </div>
      <Link
        href="/breed-profile/Usmane-de-l'Eau-qui-Dort/527686"
        target="_blank"
        className={classes.thumbnail}
      >
        <img
          src="https://i.pinimg.com/236x/53/6a/52/536a52c154460fd9fbec2e20f9f699ba.jpg"
          alt="Doge"
        />
      </Link>
      <div
        style={{ fontSize: `${16 - generation * 1.5}px` }}
        className={classes.details}
      >
        {breed && (
          <Typography variant="p">
            <span className={classes.attr}>Breed: </span>
            {breed}
          </Typography>
        )}
        {date && (
          <Typography variant="p">
            <span className={classes.attr}>Date of Birth: </span>
            {date}
          </Typography>
        )}
        {registrationNo && (
          <Typography variant="p">
            <span className={classes.attr}>Registration No: </span>
            {registrationNo}
          </Typography>
        )}
      </div>
    </div>
  );
};
