"use server"
import { revalidateTag } from "next/cache";
import { jwt, summarizationHistory, summaryUrl } from "./components/Api";
import { redirect } from "next/navigation";

export const fetchSummarizationHistory = async (limit=8, page=1) => {
    const res = await fetch(summarizationHistory + `?limit=${limit}&offset=${(page-1)*limit}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      next: {
        tags: ["summary"]
      }
      
    });
    const summaryHistory = await res.json();
    const totalEntries = summaryHistory.count;
    return [summaryHistory, totalEntries];
};

export const summarizeDocument = async (fileUrl, fileName, async ) => {
  try {
    const res = await fetch(summaryUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file_url: `${fileUrl}`,
        file_name: `${fileName}`,
        async: async,
      }),
    });
      const data = await res.json();
      revalidateTag("summary");
      redirect("doclens")
  } catch (error) {
    console.log(error);
  }
}

export const uploadOnFileUrls = async (file, fileUrl) => {
  try {
      const res = await fetch(fileUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/pdf",
          "x-ms-blob-type": "BlockBlob",
        },
        body: file,
      });
      if(res.ok) {
        const data = await res.json();
        console.log(data);
      }
    }
  catch (e) {
    alert(e);
  }
};