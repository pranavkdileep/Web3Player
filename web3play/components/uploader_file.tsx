import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from 'axios';
import { Progress } from "@material-tailwind/react";

export function Up({ videopublisher }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [video_id, setVideo_id] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [videourl, setvidis] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };
  const handlePublish = async () => {
    const videoid = await videopublisher(title, description, videourl);
    setVideo_id(videoid);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://api.nft.storage/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk0NzJjNDY5ZmE4M2M3M0I0YzI2RTQyYThiZjE0NjBkOWFjZWJBNTAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5NzgwOTk0ODI2NSwibmFtZSI6Ik5mdCJ9.QNuy4oFt9-fOtksUUe0lcswL4UAuhEZMyXgfFOilTuY', // Replace with your API key
        },
        onUploadProgress: progressEvent => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded / progressEvent.total) * 100)
            : 0;
          setUploadProgress(progress);
        },
      });

      const videoUrlcid = response.data.value.cid;
      const videoid = `https://${videoUrlcid}.ipfs.w3s.link/${file.name}`;

      setvidis(videoid);
      console.log('Video uploaded:', videoid);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://web3-player.vercel.app/watch?id=${video_id}`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="py-4 bg-gray-800 text-white text-center dark:bg-gray-900">
        <h1 className="text-3xl font-bold">Video Uploader</h1>
      </header>

      {/* Main content */}
      <main className="flex-1 py-12 bg-gray-50 sm:px-6 lg:px-8 dark:bg-gray-900 m-10">
        <div className="w-full max-w-md mx-auto space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              Upload your video
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Please fill in the details and select your video file.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Label htmlFor="title" className="dark:text-white">Title</Label>
                <Input
                  className="input-style dark:text-white"
                  id="title"
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="description" className="dark:text-white">Description</Label>
                <Input
                  className="input-style dark:text-white"
                  id="description"
                  required
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="file" className="dark:text-white">Video File</Label>
                {/* <input
                  className="input-style"
                  id="file"
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                /> */}
                <label htmlFor="file" className="sr-only">Choose file</label>
                <input type="file" name="file-input" className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600
    file:bg-gray-50 file:border-0
    file:me-4
    file:py-3 file:px-4
    dark:file:bg-gray-700 dark:file:text-gray-400"
                  id="file"

                  accept="video/*"
                  onChange={handleFileChange}
                ></input>
              </div>
            </div>
            {uploadProgress <= 0 && (
              <div>
              <Button className="w-full" onClick={handleUpload} type="button">
                Upload
              </Button>
            </div>
            )}
            
            {uploadProgress > 0 && uploadProgress < 100 && (
            //   <progress 
            //   value={uploadProgress} 
            //   max="100" 
            //   className="w-full h-2 bg-gray-200 rounded"
            // >
            //   {uploadProgress}
            // </progress>
            <div className="rounded-md dark:bg-slate-400 ">
      <Progress value={uploadProgress} className="rounded-md dark:bg-slate-400" size="lg" label="Complete" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
      
    </div>


            )}
            {uploadProgress == 100 && !videourl && (
            //   <progress 
            //   value={uploadProgress} 
            //   max="100" 
            //   className="w-full h-2 bg-gray-200 rounded"
            // >
            //   {uploadProgress}
            // </progress>
            <div className="rounded-md dark:bg-slate-400 ">
      <Progress value={uploadProgress} className="rounded-md dark:bg-slate-400" size="lg" label="Processing.." placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
      
    </div>


            )}
            {videourl && (
            //   <progress 
            //   value={uploadProgress} 
            //   max="100" 
            //   className="w-full h-2 bg-gray-200 rounded"
            // >
            //   {uploadProgress}
            // </progress>
            <div className="rounded-md dark:bg-slate-400 ">
      <Progress value={uploadProgress} className="rounded-md dark:bg-slate-400" size="lg" label="Ready To Publish" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
      
    </div>


            )}
            <div>
              {videourl && (
                <Button className="w-full" onClick={handlePublish} type="button">
                  Publish
                </Button>
              )}
            </div>


          </form>

          {video_id && (
            <div className="rounded-md bg-gray-100 dark:bg-gray-800 p-4 relative">
              <h2 className="text-center text-2xl font-extrabold text-gray-900 dark:text-gray-100">
                Video URL
              </h2>
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 overflow-hidden overflow-ellipsis">
                {"https://web3-player.vercel.app/watch?id=" + video_id}
              </p>
              <Button className="mt-2 mx-auto" onClick={copyToClipboard}>
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 bg-gray-800 text-white text-center dark:bg-gray-900">
        <p>&copy; 2024 PKD. Made With ❤️ PKD</p>
      </footer>
    </div>
  );
}
