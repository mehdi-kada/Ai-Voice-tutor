import { getCompanion } from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import Image from "next/image";
import { getSubjectColor } from "@/lib/utils";
import CompanionComponent from "@/components/ui/companionComponent";

async function CompanionSession({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const companion = await getCompanion(id);
  console.log(companion)
  const { name, subject, topic, duration } = companion;
  console.log(name)
  const userName = user?.firstName || "User";
  const imageUrl = user?.imageUrl || "/images/default-user.jpeg";
  
  if (!companion) redirect("/companions");

  return (
    <main className="p-10 mb-5">
      <article className="flex rounded-border justify-between  p-6 max-md:flex-col">
        <div className="flex items-center gap-2">
          <div
            className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
            style={{ background: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              width={35}
              height={35}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 ">
              <p className="font-bold text-2xl">{name}</p>
              <div className="subject-badge max-sm:hidden">{subject}</div>
            </div>
            <p className="text-lg">{topic}</p>
          </div>
        </div>
        <div className="items-start text-2xl max-md:hidden">
          {duration} mins
        </div>
      </article>

      <CompanionComponent
        {...companion}
        companionId={id}
        userName={userName}
        userImage={imageUrl}
      />
    </main>
  );
}

export default CompanionSession;
