import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";

import classes from "./CharacteristicChart.module.css";

export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

export const RatingItem = ({ name, value }) => {
  return (
    <Fragment>
      <div className={classes.rating}>
        <Typography
          className={classes["att-name"]}
          variant="p"
          component="legend"
        >
          {name}
        </Typography>
        <div className={classes.stars}>
          <StyledRating
            name="customized-color"
            readOnly
            value={value}
            getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
            precision={0.5}
            icon={<PetsOutlinedIcon fontSize="large" />}
            emptyIcon={<PetsOutlinedIcon fontSize="large" />}
          />
        </div>
      </div>
      <hr />
    </Fragment>
  );
};
