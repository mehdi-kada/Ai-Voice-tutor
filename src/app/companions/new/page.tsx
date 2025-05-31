"use client"
import dynamic from "next/dynamic";
import React from "react";

const CreateCompanion = dynamic(
  () => import("@/components/ui/createCompanion"),
  {
    loading: () => (
      <div className="lg:w-1/3 p-8 md:w-2/3 items-center justify-center">
        <article className="w-full flex flex-col gap-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </article>
      </div>
    ),
    ssr: false,
  }
);

function NewCompanion() {
  return (
    <main className="lg:w-1/3 p-8 md:w-2/3 items-center justify-center">
      <article className="w-full flex flex-col gap-4">
        <CreateCompanion />
      </article>
    </main>
  );
}

export default NewCompanion;
