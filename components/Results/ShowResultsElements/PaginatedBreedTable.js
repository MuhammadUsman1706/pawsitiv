import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import ReactCountryFlag from "react-country-flag";
import Link from "next/link";

import classes from "./PaginatedBreedTable.module.css";

export const BreedTable = ({ currentItems, selectedDogBreed }) => {
  return (
    <div className={classes["table-parent"]}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th
              style={{
                borderTopLeftRadius: "5px",
              }}
            >
              Date
            </th>
            <th>Event</th>
            <th>Club/Org</th>
            <th
              style={{
                borderTopRightRadius: "5px",
              }}
            >
              Country/City
            </th>
          </tr>
        </thead>
        {currentItems?.length > 0 ? (
          <tbody>
            {currentItems.map((data) => (
              <tr key={data.eventId}>
                <td>{new Date(data.start_date).toDateString()}</td>
                <td>
                  <Link
                    href={
                      selectedDogBreed?.id
                        ? `results/${selectedDogBreed?.label}/${data.eventId}`
                        : `results/multi-breed/${data.event}/${data.eventId}`
                    }
                  >
                    {data.event}
                  </Link>
                </td>
                <td>{data.club}</td>
                <td id={classes.country}>
                  {data.country}
                  &nbsp;
                  <ReactCountryFlag svg countryCode={data.countryCode} />
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td>-</td>
              <td>No events to show</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

function PaginatedBreedTable({ itemsPerPage, items, selectedDogBreed }) {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items?.slice(itemOffset, endOffset);
  const pageCount = Math?.ceil(items?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items?.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <BreedTable
        selectedDogBreed={selectedDogBreed}
        currentItems={currentItems}
      />
      <div className="page-list">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}

export default PaginatedBreedTable;
