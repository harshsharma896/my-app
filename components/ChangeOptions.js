"use client";
import useChangeOptions from "@/hooks/useChangeOptions";
import Link from "next/link";
import React from "react";

const ChangeOptions = ({ initialOption, options }) => {
  const [option, setOption] = useChangeOptions(initialOption);
  return (
    <div>
      Change Options
      <div>
        {options.map(option => (
        <Link href={`/doclens?limit=${option}`} key={option}>
          <span onClick={() => setOption(option)} className="m-2">{option}</span>
        </Link>  
        ))}
      </div>
      <div>Current Option: {option}</div>
    </div>
  );
};

export default ChangeOptions;
