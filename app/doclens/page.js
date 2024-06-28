import { fetchSummarizationHistory } from "@/actions";
import AddDocument from "@/components/AddDocument";
import Button from "@/components/Button";
import ChangeOptions from "@/components/ChangeOptions";
import Pagination from "@/components/Pagination";
import { calculateEndPage } from "@/utils/helper";
import Link from "next/link";

export default async function page({ searchParams }) {
  const rowsPerPage = searchParams?.limit || 8;
  const page = searchParams?.page || 1;
  const startPage = 1;
  const [summaryHistory, totalEntries] = await fetchSummarizationHistory(rowsPerPage, page);
  const endPage = calculateEndPage(totalEntries, rowsPerPage);
  return (
    <div className="flex flex-col justify-between w-full">
      <span className="text-white text-2xl font-bold sm:hidden block truncate">
        Doclens
      </span>
      <div className="flex justify-between mb-10">
      <span className="text-white text-2xl font-bold hidden sm:block truncate items-start">
        Summarized Documents
      </span>
      <AddDocument/>
      </div>
      {summaryHistory?.results?.map((obj) => (
        <li className="flex justify-between" key={obj.uuid}>
          <h1>{obj.file_name}</h1>
          <Link href={`/doclens/${obj.uuid}`}>
            <Button label="View Details" />
          </Link>
        </li>
      ))}
      <div className="mt-10">
        <ChangeOptions
          initialOption={8}
          options={[8, 10, 15]}
        />
        <Pagination startPage={startPage} page={page} endPage={endPage}/>
      </div>
    </div>
  );
}
