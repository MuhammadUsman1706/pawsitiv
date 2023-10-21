import {
    Typography,
    Divider,
    IconButton,
    InputBase,
    Paper,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import classes from './Club.module.css'
import SearchIcon from "@mui/icons-material/Search";
import PaginatedClubList from './ClubListElements/PaginatedClubList';

let clubOrigin;

export default function Club({ clubData }) {
    const [searchValue, setSearchValue] = useState('');
    const [clubList, setClubList] = useState([])

    const filterByKeywordsHandler = (event) => {
        const query = event.target.value;
        setSearchValue(query)
        if (query?.length >= 3) {
            setClubList(
                clubOrigin.filter((clubData) =>
                    clubData.clubs_name.toLowerCase().includes(query.toLowerCase())
                )
            );
        } else {
            setClubList(clubData)
        }
    };

    const filterByIconClick = () => {
        if (!clubList) return;

        setClubList(
            clubOrigin.filter((clubData) =>
                clubData.clubs_name.toLowerCase().includes(searchValue.toLowerCase())
            )
        )
    }

    useEffect(() => {
        clubOrigin = clubData;
        setClubList(clubData);
    }, [])
    return (
        <main className={classes['main-club']}>
            <div className={classes.header}>
                <Typography variant="h2" component="h1">
                    Club Directory
                </Typography>
                <Typography variant="h6" component="p">
                    This is the official list of all club members.
                </Typography>
            </div>

            <div className={classes["club-directory-section"]}>
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
                                placeholder="Search Clubs"
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
                {clubList && (
                    <PaginatedClubList
                        itemsPerPage={15}
                        items={clubList}
                    />
                )

                }
            </div>
        </main>
    )
}
