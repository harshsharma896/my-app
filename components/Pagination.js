"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

const Pagination = ({ page, startPage, endPage }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <div className="flex justify-between mt-10">
      <Link
        href={
          pathname +
          "?" +
          createQueryString(
            "page",
            Number(page) - 1 >= startPage ? Number(page) - 1 : Number(page)
          )
        }
      >
        <span>Previous</span>
      </Link>
      <span>{page}</span>
      <Link href={pathname + "?" + createQueryString("page", Number(page) + 1 <= endPage ? Number(page) + 1 : Number(page))}>
        <span>Next</span>
      </Link>
    </div>
  );
};

export default Pagination;
