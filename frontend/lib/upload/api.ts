const EXPRESS_BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL || "https://api.m3ntha.ch"
    : process.env.NEXT_PUBLIC_API_URL_DEV || "http://localhost:5000";

export async function uploadImageToServer(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

   const res = await fetch(`${EXPRESS_BASE_URL }/api/uploads`, {
          method: "POST",
          body: formData,
        });

  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Upload failed");
  console.log("Uploaded image path:", data.data.photo);
  data.photo = data.data.path;
  return data.photo;
}
