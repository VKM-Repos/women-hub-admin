import { useRef, useState } from "react";
import * as ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ReactQuillComponent = (ReactQuill as any).default ?? ReactQuill;

type TabKey = "privacy" | "terms" | "gdpr";

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "align",
  "link",
  "image",
  "video",
];

export default function LegalCompliance() {
  const [activeTab, setActiveTab] = useState<TabKey>("privacy");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("Click or drop files");
  const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null);
  const [editorHtml, setEditorHtml] = useState<string>("Start typing your content here...");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const switchTab = (tab: TabKey) => {
    setActiveTab(tab);
  };

  const previewContent = () => {
    window.alert("Preview:\n\n" + editorHtml.replace(/<[^>]+>/g, ""));
  };

  const handleCoverClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFileName(file.name);
    setSelectedImagePreview(null);

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const confirmAction = () => {
    window.alert("Changes saved!");
    closeModal();
  };

  return (
    <div className="bg-gray-100 font-[Inter] mx-auto">
      <div className="audit-container">Legal and Compliance</div>
      <div className="max-w-5xl mx-auto mt-10 bg-[#FCFCFC] shadow rounded-lg p-10">

        <div className="flex items-center gap-6 bg-[#FCFCFC] w-[460px] px-2 py-2 mb-6 font-semibold text-sm">
          <button
            type="button"
            className={`tab-btn pb-2 ${
              activeTab === "privacy"
                ? "text-black border-b-4 border-black"
                : "text-gray-500"
            }`}
            onClick={() => switchTab("privacy")}
          >
            Privacy Policy
          </button>
          <button
            type="button"
            className={`tab-btn pb-2 ${
              activeTab === "terms"
                ? "text-black border-b-4 border-black"
                : "text-gray-500"
            }`}
            onClick={() => switchTab("terms")}
          >
            Terms &amp; Conditions
          </button>
          <button
            type="button"
            className={`tab-btn pb-2 ${
              activeTab === "gdpr"
                ? "text-black border-b-4 border-black"
                : "text-gray-500"
            }`}
            onClick={() => switchTab("gdpr")}
          >
            GDPR Compliance
          </button>
        </div>

        <div className="flex items-center gap-2 mb-5">
          <img src="/src/assets/tag.svg" alt="Tag icon" />
          <h3 className="font-bold">Add Content</h3>

          <div className="flex text-left pl-[300px] gap-3">
            <img src="/src/assets/arrow-move-up-left-sharp.svg" alt="Arrow left" />
            <img src="/src/assets/arrow-move-up-right-sharp.svg" alt="Arrow right" />

            <button
              type="button"
              className="flex items-center gap-1 border-[2px] py-[8px] px-[16px] rounded-lg w-[95px] font-[Inter] font-semibold hover:bg-[#B5E4CA]"
              // onClick={}
            >
              <img src="/src/assets/Union.svg" alt="Back icon" className="w-[18px] h-[15px]" />
              Back
            </button>

            <button
              type="button"
              className="flex items-center gap-1 border-[2px] py-[8px] px-[16px] rounded-lg w-[124px] font-[Inter] font-semibold hover:bg-[#B5E4CA]"
              onClick={previewContent}
            >
              <img src="/src/assets/eye-hide-show.svg" alt="Preview icon" />
              Preview
            </button>

            <button
              type="button"
              className="flex items-center gap-1 border-[2px] py-[8px] px-[16px] rounded-lg w-[115px] font-[Inter] font-semibold hover:bg-[#B5E4CA]"
              onClick={openModal}
            >
              <img src="/src/assets/update.svg" alt="Update icon" />
              Update
            </button>
          </div>
        </div>

        <div className={`fixed inset-0 bg-black/40 ${isModalOpen ? "flex" : "hidden"} items-center justify-center`}>
          <div className="bg-white w-[408px] h-[262px] rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-8 bg-orange-400 rounded" />
              <h2 className="text-lg font-semibold">Save Changes</h2>
            </div>

            <hr className="mb-4" />

            <p className="text-gray-500 mb-6 font-semibold text-sm">
              This edit will take effect once confirmed
            </p>

            <hr className="mb-4" />

            <div className="flex justify-end gap-3 mt-[30px]">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 font-bold text-base h-[48px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmAction}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-bold text-base h-[48px]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>

        <div id="content-area">
          <label htmlFor="titleInput" className="font-semibold">
            Title
          </label>
          <input
            id="titleInput"
            type="text"
            placeholder="Text"
            className="w-full border bg-gray-100 rounded-lg px-4 py-2 mt-3 mb-5 text-sm"
          />

          <div className="mb-[15px]">
            <label htmlFor="fileInput" className="font-semibold">
            Cover Page
            </label>
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={handleCoverClick}
            className="border rounded-lg h-40 flex items-center justify-center mb-4 cursor-pointer hover:bg-gray-50"
          >
            <span className="font-[Inter] font-bold text-base text-[#1A1D1F]">
              {selectedImagePreview ? (
                <img src={selectedImagePreview} alt="Preview" className="h-20 rounded" />
              ) : (
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border-[2px] rounded-xl w-[200px] h-[50px] bg-gray-200 hover:bg-gray-400"
                >
                  <img src="/src/assets/upload.svg" alt="Upload icon" className="w-[24px]" />
                  {selectedFileName}
                </button>
              )}
            </span>
          </div>

          <input
            ref={fileInputRef}
            id="fileInput"
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />

          <div className="mb-4">
            <ReactQuillComponent
              theme="snow"
              value={editorHtml}
              onChange={setEditorHtml}
              modules={quillModules}
              formats={quillFormats}
              placeholder="Start typing your content here..."
              className="bg-white rounded-lg shadow-sm min-h-[280px]"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button type="button" className="w-[74px] h-[48px] px-[20px] py-[12px] font-bold bg-[#FF7400] hover:bg-orange-400 text-white rounded-xl text-base">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
