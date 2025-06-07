import CompanionCard from "@/components/ui/companioncard";
import CompanionsList from "@/components/ui/companionslist";
import CTA from "@/components/ui/cta";
import {
  getRecentSessions,
  getUserSessions,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Page = async () => {
  const { userId } = await auth();
  console.log("user id is : ", userId);
  const popularCompanions: Companion = await getRecentSessions(3);
  const userSessions = await getUserSessions(userId);
  console.log("user sessions are ", userSessions);

  return (
    <>
      <main className="p-10">
        <h1>Popular Companions</h1>
        <section className="home-section">
          {popularCompanions.map((companion: Companion, index:number) => (
            <CompanionCard
              key={index}
              id={companion.id}
              subject={companion.subject}
              name={companion.name}
              topic={companion.topic}
              duration={companion.duration}
              color={getSubjectColor(companion.subject)}
            />
          ))}
        </section>
        <section className="home-section">
          <CompanionsList
            title="Recently Completed Lessons"
            companions={userSessions}
            classNames={"w-2/3 max-lg:w-full"}
          />
          <CTA />
        </section>
      </main>
    </>
  );
};

export default Page;
