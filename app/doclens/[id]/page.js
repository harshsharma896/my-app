import { jwt, summarizationHistory, summarizationPoll } from "@/components/Api";

export default async function Page({ params }) {
  const res = await fetch(summarizationPoll + `${params.id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  const details = await res.json();
  return <div>Summary Details: <br/>
  {details.summary}
  </div>;
}
