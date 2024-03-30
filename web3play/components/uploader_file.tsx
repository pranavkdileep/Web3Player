import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Up({ videopublisher }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [video_id, setVideo_id] = useState("");
  const [copied, setCopied] = useState(false);

  const handleUpload = async () => {
    const videoid = await videopublisher(title, description, video, setVideo_id);
    setVideo_id(videoid);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://web3-player.vercel.app/watch?id=${video_id}`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900">
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
                <Textarea
                  className="input-style dark:text-white"
                  id="description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="video">Video URL</Label>
                <Input
                  className="input-style"
                  id="video"
                  required
                  type="text"
                  value={video}
                  onChange={(e) => setVideo(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Button className="w-full" onClick={handleUpload} type="button">
                Upload
              </Button>
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
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}
