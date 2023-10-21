import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";

import classes from "./PaginatedBreedList.module.css";

const BreedList = ({ currentItems, profiles }) => {
  const router = useRouter();
  const keyword = profiles ? "dogs_name" : "breed_name";

  const navigateToNextPageHandler = (name, id) => {
    router.push(
      profiles
        ? `/breed-profile/${name.replaceAll(" ", "-")}/${id}`
        : `/breed-profiles/${name.replaceAll(" ", "-")}/${id}`
    );
  };

  return (
    <div className={classes["breed-list"]}>
      {currentItems.length > 0 ? (
        currentItems.map((breed, index) => (
          <div
            onClick={() => navigateToNextPageHandler(breed[keyword], breed.id)}
            key={index}
            className={classes["breed-card"]}
          >
            <img
              loading="lazy"
              src={breed.profile_photo || breed.profilePhoto}
              alt={breed[keyword]}
            />

            <span>
              {/* <Link href={ profiles ? `/breed-profile/${breed[keyword].replaceAll(" ", "-")}/${breed.id}` : `/breed-profiles/${breed[keyword].replaceAll(" ", "-")}/${breed.id}`}> */}
              <Typography variant="h6" component="p">
                {breed[keyword]}
              </Typography>
              {/* </Link>  */}
            </span>
          </div>
        ))
      ) : (
        <Typography sx={{ margin: "3rem auto" }} variant="h4" component="h1">
          No Results Found!
        </Typography>
      )}
    </div>
  );
};

function PaginatedBreedList({ itemsPerPage, items, profiles }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <BreedList profiles={profiles} currentItems={currentItems} />

      <div className="page-list">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}

export default PaginatedBreedList;
