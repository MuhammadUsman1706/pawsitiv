import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";

import classes from "./PaginatedBreedList.module.css";

const BreedList = ({ currentItems }) => {
  const router = useRouter();
  const navigateToNextPageHandler = (name, id) => {
    router.push(`breed-detail/${name}/${id}`);
  };
  return (
    <div className={classes["breed-list"]}>
      {currentItems.length > 0 ? (
        currentItems.map((breed, index) => (
          <div
            onClick={() =>
              navigateToNextPageHandler(breed.breed_name, breed.id)
            }
            key={index}
            className={classes["breed-card"]}
          >
            <img
              loading="lazy"
              src={breed.profile_photo}
              alt={breed.breed_name}
            />

            <span>
              {/* <Link href={`breed-detail/${breed.breed_name}/${breed.id}`}> */}
              <Typography variant="h6" component="p">
                {breed.breed_name}
              </Typography>
              {/* </Link> */}
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

function PaginatedBreedList({ itemsPerPage, items }) {
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
      <BreedList currentItems={currentItems} />
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
