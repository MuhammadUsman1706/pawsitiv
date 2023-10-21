import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import {
  a11yProps,
  RatingItem,
  TabPanel,
} from "./CharacteristicsChartElements";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import classes from "./CharacteristicChart.module.css";

export default function CharacteristicChart({ data }) {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [mobileView, setMobileView] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    window.innerWidth < 650 && setMobileView(true);
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        borderRadius: "10px",
        // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <AppBar
        sx={{
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          overflow: "auto",
        }}
        position="static"
      >
        <Tabs
          sx={
            mobileView && {
              width: "max-content",
            }
          }
          value={value}
          onChange={handleChange}
          //   indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          TabIndicatorProps={{ style: { background: "#ff6d75" } }}
        >
          <Tab label="adaptability" {...a11yProps(0)} />
          <Tab label="friendliness" {...a11yProps(1)} />
          <Tab label="grooming" {...a11yProps(2)} />
          <Tab label="physical" {...a11yProps(2)} />
          <Tab label="training" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel
          className={classes["rating-list"]}
          value={value}
          index={0}
          dir={theme.direction}
        >
          <RatingItem
            name="Sensitivity Level"
            value={data?.adapt?.sensitivity_level}
          />

          <RatingItem
            name="Good for Novice Owners"
            value={data?.adapt?.good_for_novice_owners}
          />

          <RatingItem
            name="Suited To Apartment Living"
            value={data?.adapt?.suited_to_apartment_living}
          />

          <RatingItem
            name="Tolerates Being Alone"
            value={data?.adapt?.tolerates_being_alone}
          />

          <RatingItem
            name="Tolerates Cold Weather"
            value={data?.adapt?.tolerates_cold_weather}
          />

          <RatingItem
            name="Tolerates Hot Weather"
            value={data?.adapt?.tolerates_hot_weather}
          />
        </TabPanel>
        <TabPanel
          className={classes["rating-list"]}
          value={value}
          index={1}
          dir={theme.direction}
        >
          <RatingItem
            name="Affectionate With Family"
            value={data?.friendly?.affectionate_with_family}
          />

          <RatingItem name="Kid Friendly" value={data?.friendly?.kid_friendly} />

          <RatingItem name="Dog Friendly" value={data?.friendly?.dog_friendly} />

          <RatingItem
            name="Friendly Towards Strangers"
            value={data?.friendly?.friendly_towards_strangers}
          />
        </TabPanel>
        <TabPanel
          className={classes["rating-list"]}
          value={value}
          index={2}
          dir={theme.direction}
        >
          <RatingItem
            name="Amount Of Shedding"
            value={data?.health_groom?.amount_of_shedding}
          />

          <RatingItem
            name="Drooling Potential"
            value={data?.health_groom?.drooling_potential}
          />

          <RatingItem
            name="Easy to Groom"
            value={data?.health_groom?.easy_to_groom}
          />

          <RatingItem
            name="General Health"
            value={data?.health_groom?.general_health}
          />

          <RatingItem
            name="Potential for Weight Gain"
            value={data?.health_groom?.potential_for_weight_gain}
          />

          <RatingItem name="Size" value={data?.health_groom?.size} />
        </TabPanel>
        <TabPanel
          className={classes["rating-list"]}
          value={value}
          index={3}
          dir={theme.direction}
        >
          <RatingItem name="Energy Level" value={data?.physical?.energy_level} />

          <RatingItem name="Intensity" value={data?.physical?.intensity} />

          <RatingItem
            name="Exercise Needs"
            value={data?.physical?.exercise_needs}
          />

          <RatingItem
            name="Potential for Playfulness"
            value={data?.physical?.potential_for_playfulness}
          />
        </TabPanel>
        <TabPanel
          className={classes["rating-list"]}
          value={value}
          index={4}
          dir={theme.direction}
        >
          <RatingItem name="Easy to Train" value={data?.train?.easy_to_train} />

          <RatingItem name="Intelligence" value={data?.train?.intelligence} />

          <RatingItem
            name="Potential for Mouthiness"
            value={data?.train?.potential_for_mouthiness}
          />

          <RatingItem name="Prey Drive" value={data?.train?.prey_drive} />

          <RatingItem
            name="Tendency to Bark or Howl"
            value={data?.train?.tendency_to_bark_or_howl}
          />

          <RatingItem
            name="Wanderlust Potential"
            value={data?.train?.wanderlust_potential}
          />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
