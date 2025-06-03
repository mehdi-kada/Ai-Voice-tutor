import CompanionCard from "@/components/ui/companioncard";
import SearchInput from "@/components/ui/serachinput";
import SubjectFilter from "@/components/ui/subjectFilter";
import { getAllCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";

async function Companions({ searchParams }: SearchParams) {
  const params = await searchParams;

  const topic = params.topic ? params.topic : undefined;
  const subject = params.subject ? params.subject : undefined;

  const companions = await getAllCompanions({ subject: subject, topic: topic });

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Companions Library</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-8">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>
    </main>
  );
}

export default Companions;
