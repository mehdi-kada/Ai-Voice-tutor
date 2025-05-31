import CompanionCard from "@/components/ui/companioncard";
import CompanionsList from "@/components/ui/companionslist";
import CTA from "@/components/ui/cta";
import { recentSessions } from "@/constants";
import React from "react";

const Page = () => {
  return (
    <>
      <main>
        <h1>Popular Companions</h1>
        <section className="home-section">
          <CompanionCard
            id="123"
            subject="math"
            title="Neura the Brainy Explorer"
            topic="Neural Network of the Brain"
            duration={30}
            color="#E5D0FF"
          />
          <CompanionCard
            id="123"
            subject="math"
            title="Neura the Brainy Explorer"
            topic="Neural Network of the Brain"
            duration={30}
            color="#E5D0FF"
          />
          <CompanionCard
            id="123"
            subject="math"
            title="Neura the Brainy Explorer"
            topic="Neural Network of the Brain"
            duration={30}
            color="#E5D0FF"
          />
        </section>
        <section className="home-section">
          <CompanionsList
            title="Recently Completed Lessons"
            companions={recentSessions}
            classNames={"w-2/3 max-lg:w-full"}
          />
          <CTA />
        </section>
      </main>
    </>
  );
};

export default Page;
