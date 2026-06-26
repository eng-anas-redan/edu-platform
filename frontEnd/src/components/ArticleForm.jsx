import { useState } from "react";

const ArticleForm = ({
  initialTitle = "",
  initialContent = "",
  initialTags = "",
  initialImages = [],
  onSubmit,
  buttonText = "Create",
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [tags, setTags] = useState(initialTags);
  const [images, setImages] = useState(initialImages);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);

      tags
        .split(",")
        .map((t) => t.trim())
        .forEach((tag) => formData.append("tags", tag));

      images.forEach((file) => {
        formData.append("images", file);
      });

      await onSubmit(formData);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Something went wrong",
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* title */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Title :
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Your Title"
            className="
              w-full
              px-4
              py-3
              rounded-lg
              bg-white/10
              border
              border-white/20
              text-white
              placeholder:text-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-primary-300
            "
            required
          />
        </div>

        {/* content */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Content :
          </label>
          <textarea
            value={content}
            placeholder="Enter Your Content"
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="
    w-full
    px-4
    py-3
    rounded-lg
    bg-white/10
    border
    border-white/20
    text-white
    placeholder:text-gray-400
    focus:outline-none
    focus:ring-2
    focus:ring-primary-300
  "
            required
          />
        </div>
        {/* tags */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Tags :
          </label>

          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter Your Tags"
            className="
              w-full
              px-4
              py-3
              rounded-lg
              bg-white/10
              border
              border-white/20
              text-white
              placeholder:text-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-primary-300
            "
          />
        </div>
        {/* images */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Images :
          </label>

          <input
            placeholder="Upload Your Images"
            type="file"
            accept="image/*"
            name="images"
            multiple
            onChange={(e) => setImages([...e.target.files])}
            className="
              w-full
              px-4
              py-3
              rounded-lg
              bg-white/10
              border
              border-white/20
              text-white
              placeholder:text-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-primary-300
            "
          />
        </div>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        {/* Submit */}
        <button
          type="submit"
          className="
            w-full
            py-3
            rounded-lg
            bg-primary-600
            hover:bg-primary-700
            text-white
            font-medium
            transition
          "
        >
          {buttonText}
        </button>
      </form>
    </>
  );
};

export default ArticleForm;
