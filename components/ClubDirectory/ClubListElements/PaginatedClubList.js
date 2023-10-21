import React, { useState } from "react";
import ReactPaginate from "react-paginate";

import classes from "./PaginatedClubList.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const ClubList = ({ currentItems }) => {
  const router = useRouter();
  let count = 25;
  return (
    <div className={classes["club-list"]}>
      {currentItems.map((clubMembers) => (
        <Link
          key={clubMembers.id}
          href={`club-directory/${clubMembers.clubs_name
            .split(" ")
            .join("_")}/${clubMembers.id}`}
        >
          <div
            className={classes["club-member-detail"]}
            // onClick={() =>
            //   router.push(`club-directory/${clubMembers.clubs_name}/${clubMembers.id}`)
            // }
          >
            <img
              className={classes["club-img"]}
              loading="lazy"
              src={clubMembers.logo}
              alt={clubMembers.clubs_name}
            />
            <div className={classes["club-member-text"]}>
              <span>
                {clubMembers.clubs_name.slice(0, count) +
                  (clubMembers.clubs_name.length > count ? "..." : "")}
              </span>
              <span>{clubMembers.country_of_origin}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default function PaginatedClubList({ itemsPerPage, items }) {
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
      <ClubList currentItems={currentItems} />
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
