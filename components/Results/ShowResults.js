import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PaginatedBreedTable from "./ShowResultsElements/PaginatedBreedTable";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useRouter } from "next/router";
import { globalFetcher } from "@/pages/api";
import moment from "moment-timezone";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  createTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

import classes from "./ShowResults.module.css";

const ShowResults = ({ breeds, countries, clubs }) => {
  const router = useRouter();

  const [selectedDogBreed, setSelectedDogBreed] = useState({
    id: router.query.breedId,
    label: router.query.breedName,
  });
  const [results, setResults] = useState();
  const [sorting, setSorting] = useState(null);
  const [filters, setFilters] = useState({ startDate: "", endDate: "" });

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const { data, error, isLoading } = useSWR(
    selectedDogBreed?.id
      ? `https://inspedium.xyz/pawsitive-web/api/events/filter?breed_id=${
          selectedDogBreed.id
        }${filters.startDate ? `&start_date=${filters.startDate}` : ""}${
          filters.endDate ? `&end_date=${filters.endDate}` : ""
        }${filters.club ? `&club_id=${filters.club}` : ""}${
          filters.country ? `&country_id=${filters.country}` : ""
        }`
      : null,
    globalFetcher
  );

  const {
    data: champData,
    // error: champError,
    // isLoading: champIsLoading,
  } = useSWR(
    selectedDogBreed?.id
      ? `https://inspedium.xyz/pawsitive-web/api/champions-listing/${selectedDogBreed.id}`
      : null,
    globalFetcher
  );

  const setFiltersHandler = (value, name) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    // if (!data) return;

    // temporary
    if (!data) {
      const dataTemp = {
        event_result: [
          {
            start_date: "2023-02-19",
            end_date: "2023-02-19",
            event: "All Breed Show 1",
            club: "Club #1",
            country: "Pakistan",
            countryCode: "PK",
            eventId: "1",
          },
          {
            start_date: "2023-02-18",
            end_date: "2023-02-18",
            event: "All Breed Show 2",
            club: "Club #2",
            country: "Pakistan",
            countryCode: "PK",
            eventId: "2",
          },
          {
            start_date: "2023-02-17",
            end_date: "2023-02-17",
            event: "All Breed Show 3",
            club: "Club #3",
            country: "Pakistan",
            countryCode: "PK",
            eventId: "3",
          },
        ],
      };
      setResults(dataTemp.event_result);
      return;
    }
    // temporary

    let temp;
    if (sorting === "asc") {
      temp = data?.event_result?.sort(
        (a, b) => new Date(a.start_date) - new Date(b.start_date)
      );
    } else {
      temp = data?.event_result?.sort(
        (a, b) => new Date(b.start_date) - new Date(a.start_date)
      );
    }

    setResults([...temp]);
  }, [data, sorting]);

  if (router?.isFallback) {
    return (
      <div className="loading">
        <CircularProgress size={50} />
        <Typography variant="h5">Please Wait</Typography>
      </div>
    );
  }

  return (
    <div className={classes["show-results"]}>
      <header className={classes.header}>
        <h1>Show Results</h1>
        <div className={classes.search}>
          <ThemeProvider theme={theme}>
            <Autocomplete
              disablePortal
              options={breeds}
              onChange={(_, value) => {
                setSelectedDogBreed(value);
              }}
              // defaultValue={router.query.breedIndex ? breeds[router.query.breedIndex] : ""}
              defaultValue={
                router?.query?.breedId
                  ? { id: +router.query.breedId, label: router.query.breedName }
                  : ""
              }
              id="combo-box-demo"
              sx={{
                width: "40%",
                color: "white",
                border: 1,
                borderRadius: 1,
                borderColor: "white !important",
                "&.Mui-focused": {
                  border: 0,
                },
              }}
              renderInput={(params) => (
                <TextField
                  //   sx={{ border: "1px solid white", borderRadius: "4px" }}
                  {...params}
                  // defaultValue={breeds[0].label}
                  label="Choose Breed"
                />
              )}
            />
          </ThemeProvider>
          <Button sx={{ width: "10%" }} variant="contained">
            SEARCH
          </Button>
        </div>
      </header>

      <div className={classes.body}>
        <main className={classes["filter-table"]}>
          <h1 className={classes["loading-heading"]}>
            Search Results <span>{isLoading && <CircularProgress />}</span>
          </h1>
          <div className={classes.control}>
            <div className={classes.sorting}>
              {/* <Typography>Sorting</Typography> */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Sort Records
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Sort Records"
                  onChange={(event) => setSorting(event.target.value)}
                >
                  <MenuItem value="asc">Sort By Date (Ascending)</MenuItem>
                  <MenuItem value="desc">Sort By Date (Descending)</MenuItem>
                </Select>
              </FormControl>
            </div>

            <Accordion
              sx={{
                borderRadius: "5px",
                marginTop: "0 !important",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h2
                  style={{
                    fontWeight: "normal",
                  }}
                >
                  Filters
                </h2>
              </AccordionSummary>
              <AccordionDetails>
                <div className={classes.filter}>
                  {/* <h2>Filters</h2> */}
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <p>Date Range</p>
                      <div className={classes.dates}>
                        <DesktopDatePicker
                          // value={moment(filters.startDate)}
                          inputFormat="MM/DD/YYYY"
                          renderInput={(params) => <TextField {...params} />}
                          onChange={(value) => {
                            if (!isNaN(value.$d))
                              setFiltersHandler(
                                moment(value.$d).format().split("T")[0],
                                "startDate"
                              );
                            else setFiltersHandler("", "startDate");
                          }}
                        />
                        <h2> - </h2>
                        <DesktopDatePicker
                          // value={moment(filters.endDate)}
                          inputFormat="MM/DD/YYYY"
                          renderInput={(params) => <TextField {...params} />}
                          onChange={(value) => {
                            if (!isNaN(value.$d))
                              setFiltersHandler(
                                moment(value.$d).format().split("T")[0],
                                "endDate"
                              );
                            else setFiltersHandler("", "endDate");
                          }}
                        />
                        {/* <IconButton
                          onClick={() =>
                            setFilters((prevState) => ({
                              ...prevState,
                              endDate: "",
                              startDate: "",
                            }))
                          }
                          color="default"
                          aria-label="upload picture"
                          component="label"
                        >
                          <CloseIcon />
                        </IconButton> */}
                      </div>
                    </LocalizationProvider>
                  </div>

                  <div>
                    <p>Country</p>
                    <Autocomplete
                      // label="Choose Country"
                      disablePortal
                      options={countries}
                      getOptionLabel={(option) => option.countryName}
                      onChange={(_, value) =>
                        setFiltersHandler(value?.idCountry || "", "country")
                      }
                      renderInput={(params) => (
                        <TextField
                          // label="Choose Country"
                          placeholder="Choose Country"
                          {...params}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <p>Club</p>
                    <Autocomplete
                      // label="Choose Club"
                      disablePortal
                      getOptionLabel={(option) => option.label}
                      options={clubs}
                      onChange={(_, value) =>
                        setFiltersHandler(value?.id || "", "club")
                      }
                      renderInput={(params) => (
                        <TextField placeholder="Choose Clubs" {...params} />
                      )}
                    />
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>

          <PaginatedBreedTable
            itemsPerPage={4}
            items={results}
            selectedDogBreed={selectedDogBreed}
          />
        </main>

        <aside className={classes.champions}>
          <h1>Champions</h1>
          <div className={classes["champion-list"]}>
            <ul>
              {champData?.champions ? (
                champData?.champions?.map((champion, i) => (
                  <li key={i}>
                    <span>
                      <MilitaryTechIcon />
                    </span>
                    {champion.dog_name}
                  </li>
                ))
              ) : (
                <li>
                  <span>
                    <MilitaryTechIcon />
                  </span>
                  No Champions to Show
                </li>
              )}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ShowResults;
