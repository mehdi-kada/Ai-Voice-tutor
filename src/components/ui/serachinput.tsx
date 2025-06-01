"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

function SearchInput() {
  const pathname = usePathname(); // Renamed from path for clarity
  const router = useRouter(); // Corrected from route
  const searchParams = useSearchParams(); // Renamed from params for clarity
  const initialTopic = searchParams.get("topic") || "";
  const [searchQuery, setSearchQuery] = useState(initialTopic);

  // effect to initialize the searchquery to the topic from the params
  useEffect(() => {
    setSearchQuery(searchParams.get("topic") || "");
  }, [searchParams]);

  // effect to update params when searchQuery changes
  useEffect(() => {
    // create a mutatable copy of the search params since the params arent mutatable
    const params = new URLSearchParams(searchParams.toString());

    // debounce the fetching from the api
    const handler = setTimeout(() => {
      // set the params to the searchquery from the input
      if (searchQuery) {
        params.set("topic", searchQuery);
      } else {
        // else remove the topic params from the url
        params.delete("topic");
      }

      //cheack if the current params are identical to the new ones to avoid redundancy
      if (params.toString() !== searchParams.toString()) {
        // construct the new URL perserves other existing parameters
        router.push(`${pathname}?${params.toString()}`);
      }
    }, 500);

    // function to reset timeout if the user starts typing again ,  it is called before the next effect
    return () => clearTimeout(handler);
  }, [searchParams, pathname, searchQuery, router]);

  return (
    <div className="relative border border-black rounded-lg items-center flex gap-4 px-2 py-1 h-fit ">
      <Image
        src={"/icons/search.svg"}
        alt="search icon"
        width={15}
        height={15}
      />
      <input
        className="outline-none bg-transparent" // Added bg-transparent for better visuals if parent has bg
        placeholder="Search topic"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
    </div>
  );
}

export default SearchInput;
