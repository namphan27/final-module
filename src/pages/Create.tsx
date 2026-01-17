import { useRef, useState } from "react";
import axiosInstance from "../utils/axios";

export default function CreatePost() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleCreatePost = async () => {
    if (!file) {
      alert("Vui lòng chọn ảnh hoặc video");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);

    try {
      setLoading(true);

      await axiosInstance.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Đăng bài thành công");
      setFile(null);
      setPreview("");
      setCaption("");
    } catch (error) {
      console.error(error);
      alert("Đăng bài thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-[5%]">
      <div className="w-113 h-130 bg-[#1e1e1e] rounded-xl text-white">
        <div className="text-center py-3 border-b border-gray-700 font-semibold">
          Tạo bài viết mới
        </div>

        {!preview ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <p>Kéo ảnh và video vào đây</p>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-500 px-4 py-2 rounded"
            >
              Chọn từ máy tính
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              hidden
              onChange={handleChooseFile}
            />
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 bg-black">
              {file?.type.startsWith("video") ? (
                <video src={preview} controls className="w-full h-full" />
              ) : (
                <img src={preview} className="w-full h-full object-cover" />
              )}
            </div>

            <div className="p-3">
              <textarea
                placeholder="Viết chú thích..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full bg-transparent outline-none resize-none"
              />

              <button
                onClick={handleCreatePost}
                disabled={loading}
                className="mt-3 w-full bg-blue-500 py-2 rounded disabled:opacity-50"
              >
                {loading ? "Đang đăng..." : "Chia sẻ"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
