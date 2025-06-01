"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { subjects } from "@/constants";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

function SubjectFilter() {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [subject, setSubject] = useState(searchParams.get("subject"));

  useEffect(() => {
    setSubject(searchParams.get("subject"));
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (subject && subject.trim().length > 0) {
      params.set("subject", subject);
    } else {
      params.delete("subject");
    }
    if (params.toString() !== searchParams.toString()) {
        // construct a query and avoid ? if params are empty 
      const query = params? `?${params.toString()}` : "";  
      router.push(`${pathName}?${query}`);
    }
  }, [subject]);

  return (
    <Select onValueChange={setSubject} >
      <SelectTrigger className=" input captalize ">
        <SelectValue placeholder="subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value=" ">All</SelectItem>
        {subjects.map((s) => (
          <SelectItem key={s} value={s} className="capitalize">
            {s}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SubjectFilter;
