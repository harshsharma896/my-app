"use client"
import React, { useState } from 'react'
import { jwt, summaryUrl } from './Api';
import { generateFileUrls, uploadOnFileUrls } from '@/utils/helper';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { summarizeDocument } from '@/actions';

const AddDocument = () => {
    const [files, setFiles] = useState([]);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    // const summarizeDocument = async (fileUrl, fileName, role, domain, async) => {
    //     try {
    //       const res = await fetch(summaryUrl, {
    //         method: "POST",
    //         headers: {
    //           "Authorization": `Bearer ${jwt}`,
    //           "Content-Type": "application/json", // Added Content-Type header
    //         },
    //         body: JSON.stringify({
    //           file_url: `${fileUrl}`,
    //           file_name: `${fileName}`,
    //           async: async,
    //         }),
    //       });
    //         const data = await res.json();
    //         router.refresh();
    //         // router.push(`${pathname}?${searchParams.toString()}`)
    //         return data;
    //     } catch (error) {
    //       console.log(error);
    //       return error;
    //     }
    // }

    const handleSubmit = async (file) => {
        try {
            const [readUrl, writeUrl] = await generateFileUrls(file);
            const { status } = await uploadOnFileUrls(file, writeUrl)
            if(status == 200) {
              const data = await summarizeDocument(readUrl, file.name, true);
              // console.log(data);
            }
            setFiles([]);
        } catch (error) {
            alert(error);
        }
    }
  return (
    <>
    <button onClick={() => document.getElementById("upload").click()}> + Add Document</button>
    <input id='upload' className='hidden' type='file' accept='.pdf' onChange={(e) => setFiles(e.target.files) }/>
    {
        Array.from(files)?.map((file) => (
            <p>{file.name}</p>
        ))
    }
    {files.length > 0 && <button onClick={() => handleSubmit(files[0])}>Submit</button>}
    </>
  )
}

export default AddDocument