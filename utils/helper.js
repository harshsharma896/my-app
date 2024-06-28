import { jwt, signedUrl } from "@/components/Api";

export const calculateEndPage = (total, rowsPerPage) => {
    const endPage = Math.ceil(total/rowsPerPage);
    return endPage;
}

export const generateFileUrls = async (file) => {
    try {
      let fileUrlResponse = await fetch(signedUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });
      if(fileUrlResponse.ok) {
        fileUrlResponse = await fileUrlResponse.json();
        let fileUrlResponseWrite = fileUrlResponse?.write_file_url;
        let fileUrlResponseRead = fileUrlResponse?.read_file_url;
        return [fileUrlResponseRead, fileUrlResponseWrite];
      }
    } catch (e) {
      alert(e);
    }
};

export const uploadOnFileUrls = async (file, fileUrl) => {
  try {
      const res = await fetch(fileUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/pdf",  // or another appropriate MIME type
          "x-ms-blob-type": "BlockBlob",
        },
        body: file,
      });
      console.log(res);
      if(res.ok) {
        return {
          message: "File uploaded successfully",
          status: 200,
        }
      }
    }
  catch (e) {
    return {
      status: 500
    }
  }
};