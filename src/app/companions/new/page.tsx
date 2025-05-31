import CreateCompanion from "@/components/ui/createCompanion";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import React from "react";

async function NewCompanion() {
  const {userId} = await auth();
  const authenticated = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  console.log(authenticated)
  return (
    <main className="lg:w-1/3 p-8 md:w-2/3 items-center justify-center">
      <article className="w-full flex flex-col gap-4">
        <CreateCompanion />
      </article>
    </main>
  );
}

export default NewCompanion;
