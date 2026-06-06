import remarkGfm from "remark-gfm";
import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import {
  Search,
  Monitor,
  Plus,
  History,
  Compass,
  LayoutGrid,
  MoreHorizontal,
  Paperclip,
  SendHorizontal,
  MessageSquare,
  Menu,
  X,
  Trash2
} from "lucide-react";

const Dashboard = () => {
  const chat = useChat();
  const [chatInput, setChatInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const user = useSelector((state) => state.auth?.user);
  // State to hold selected images

  const fileInputRef = useRef(null); // Reference for the hidden file input

  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);

  useEffect(() => {
    chat.initializeSocketConnection();
    chat.handleGetChats();
  }, []);

  // Helper to convert a File to a Base64 string
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle opening the file explorer
  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  // Handle when files are selected
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      // Create preview URLs for the images
      const newImages = files.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setSelectedImages((prev) => [...prev, ...newImages]);
    }
    // Reset the input so the same file can be selected again if needed
    event.target.value = "";
  };

  // Remove an image from the preview list
  const removeImage = (indexToRemove) => {
    setSelectedImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleSubmitMessage = async (event) => {
    event.preventDefault();
    const trimmedMessage = chatInput.trim();

    if (!trimmedMessage && selectedImages.length === 0) return;

    // Convert all selected raw File objects to Base64 strings
    let base64Images = [];
    if (selectedImages.length > 0) {
      base64Images = await Promise.all(
        selectedImages.map((img) => fileToBase64(img.file)),
      );
    }

    // Now send the base64 strings to your backend/socket
    chat.handleSendMessage({
      message: trimmedMessage,
      chatId: currentChatId,
      images: base64Images, // <--- Sending Base64 instead of File objects
    });

    setChatInput("");
    setSelectedImages([]); // Clear images after sending
  };

  const handleNewChat = () => {
    chat.handleCreateNewChat();
    setIsSidebarOpen(false);
  };

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId);
    setIsSidebarOpen(false);
  };

  return (
    <main className="flex h-screen w-full bg-[#010404] text-[#e2e2e2] overflow-hidden font-sans relative">
      {/* MOBILE HAMBURGER MENU */}
      <div className="absolute top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-[#0a0f0f] border border-white/10 rounded-lg"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-[#010404] border-r border-white/5 p-4 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 flex flex-col
      `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6 px-2 mt-12 md:mt-0">
          <div className="bg-[#00ffd5] p-1.5 rounded-lg">
            <SendHorizontal size={18} className="text-black -rotate-45" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Nexora</h1>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={16}
            />
            <input
              type="text"
              placeholder="Search history..."
              className="w-full bg-[#0a0f0f] border border-white/10 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-[#00ffd5]/40 text-sm"
            />
          </div>
          <button
            onClick={handleNewChat}
            className="flex items-center justify-center gap-2 w-full bg-[#0a0f0f] border border-white/10 rounded-xl py-2.5 hover:bg-white/5 transition-all text-[#00ffd5] font-semibold text-sm"
          >
            <Plus size={18} /> New Chat
          </button>
        </div>

        {/* HISTORY SECTION */}
        <div
          className="flex-1 overflow-y-auto pr-1 no-scrollbar"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitScrollbar: { display: "none" },
          }}
        >
          <div className="flex items-center gap-2 mb-3 px-3">
            <History size={14} className="text-gray-500" />
            <p className="text-[12px] uppercase tracking-widest text-gray-500 font-bold">
              History
            </p>
          </div>

          <div className="space-y-1">
            {Object.values(chats).length > 0 ? (
              Object.values(chats)
                .reverse()
                .map((chatItem) => (
                  <button
                    key={chatItem.id}
                    onClick={() => openChat(chatItem.id)}
                    className={`relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all group text-left ${
                      currentChatId === chatItem.id
                        ? "bg-white/10 text-white border border-white/10"
                        : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                    }`}
                  >
                    <MessageSquare
                      size={16}
                      className={
                        currentChatId === chatItem.id
                          ? "text-[#00ffd5]"
                          : "text-gray-600"
                      }
                    />
                    <span className="text-sm font-medium truncate flex-1">
                      {chatItem.title || "Untitled Chat"}
                    </span>

                    <div className="relative ml-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(
                            openMenuId === chatItem.id ? null : chatItem.id,
                          );
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal size={16} />
                      </button>

                      {openMenuId === chatItem.id && (
                        <div className="absolute right-0 top-6 bg-[#121818] border border-white/10 rounded-lg shadow-lg z-50 min-w-30">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              chat.handleDeleteChat(chatItem.id);
                              setOpenMenuId(null);
                            }}
                            className="flex items-center gap-2 w-full px-3 py-2 text-red-500 hover:bg-white/5 text-sm"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>

                  </button>
                ))
            ) : (
              <p className="text-xs text-gray-600 px-3">No history found</p>
            )}
          </div>
        </div>

        {/* Bottom Nav & Profile */}
        <div className="mt-auto pt-4 space-y-4">
          {/* <nav className="space-y-1">
            <NavItem icon={<Compass size={18} />} label="Discover" />
            <NavItem icon={<LayoutGrid size={18} />} label="Library" />
          </nav> */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-[#00ffd5] flex items-center justify-center text-black font-bold text-xs">
                {user?.username?.charAt(0).toUpperCase() || "N"}
              </div>
              <div className="leading-tight">
                <p className="text-xs font-bold">
                  {" "}
                  {user?.username || "Nexora Guest"}
                </p>
                <span className="text-[9px] text-[#00ffd5] font-black uppercase">
                  Pro
                </span>
              </div>
            </div>
            <MoreHorizontal
              size={18}
              className="text-gray-500 cursor-pointer"
            />
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <section className="relative flex flex-1 flex-col bg-[#010404] min-w-0">
        {/* Navigation Tabs */}
        <div className="flex justify-center gap-6 md:gap-8 py-4 text-[10px] font-black tracking-[0.2em] uppercase text-gray-500">
          <button className="text-[#00ffd5] border-b border-[#00ffd5] pb-1">
            Answer
          </button>
          {/* <button className="hover:text-white">Sources</button>
          <button className="hover:text-white">Media</button> */}
        </div>

        <div
          className="flex-1 overflow-y-auto px-4 md:px-0"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitScrollbar: { display: "none" },
          }}
        >
          {currentChatId && chats[currentChatId] ? (
            <div className="mx-auto max-w-3xl space-y-8 py-10">
              <h1 className="text-2xl md:text-3xl font-bold mb-10 px-2">
                {chats[currentChatId].title}
              </h1>
              {chats[currentChatId]?.messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[90%] md:max-w-[85%] rounded-2xl px-5 py-3 ${
                      message.role === "user"
                        ? "bg-[#121818] border border-white/5"
                        : "border-l-2 border-white/10 pl-4 md:pl-6"
                    }`}
                  >
                    {/* NEW: RENDER ATTACHED IMAGES HERE */}
                    {message.images && message.images.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {message.images.map((imgSrc, i) => (
                          <img
                            key={i}
                            src={imgSrc}
                            alt="Attached content"
                            className="max-h-48 rounded-lg border border-white/10 object-contain"
                          />
                        ))}
                      </div>
                    )}

                    <ReactMarkdown
                      components={markdownStyles}
                      remarkPlugins={[remarkGfm]}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center px-4">
              <h2 className="text-3xl md:text-5xl font-medium text-white mb-10 text-center">
                How can I help you{" "}
                <span className="text-[#00ffd5] italic font-serif">today?</span>
              </h2>
            </div>
          )}
        </div>

        {/* INPUT BOX */}
        <div className="mx-auto w-full max-w-3xl px-4 pb-6">
          <form
            onSubmit={handleSubmitMessage}
            className="bg-[#0a0f0f] border border-white/10 rounded-3xl p-2 shadow-2xl flex flex-col"
          >
            {/* Image Previews Section */}
            {selectedImages.length > 0 && (
              <div className="flex gap-3 px-4 pt-4 pb-2 overflow-x-auto">
                {selectedImages.map((img, index) => (
                  <div key={index} className="relative shrink-0">
                    <img
                      src={img.previewUrl}
                      alt="preview"
                      className="h-16 w-16 object-cover rounded-xl border border-white/20"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-[#121818] border border-white/20 rounded-full p-1 hover:bg-white/10 transition-colors"
                    >
                      <X size={12} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <textarea
              rows="1"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask anything..."
              className="w-full bg-transparent px-4 py-3 md:py-4 text-base md:text-lg text-white outline-none resize-none"
            />

            <div className="flex items-center justify-between px-2 pb-2">
              {/* HIDDEN FILE INPUT */}
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />

              <button
                type="button"
                onClick={handleAttachClick}
                className="flex items-center gap-1.5 text-gray-500 hover:text-white text-xs font-semibold px-3 transition-colors cursor-pointer"
              >
                <Paperclip size={14} />{" "}
                <span className="hidden sm:inline">Attach</span>
              </button>

              <button
                type="submit"
                disabled={!chatInput.trim() && selectedImages.length === 0}
                className="flex items-center gap-2 rounded-full bg-[#00ffd5] px-4 md:px-6 py-2 text-[10px] md:text-xs font-black uppercase tracking-widest text-black disabled:opacity-20 transition-opacity"
              >
                <span className="hidden sm:inline">Send</span>{" "}
                <SendHorizontal size={14} />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </main>
  );
};

const NavItem = ({ icon, label }) => (
  <button className="flex items-center gap-3 w-full px-3 py-2 text-gray-500 hover:text-white text-sm">
    {icon} <span className="font-medium">{label}</span>
  </button>
);

const markdownStyles = {
  p: ({ children }) => (
    <p className="mb-4 last:mb-0 leading-relaxed text-sm md:text-base">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 list-disc pl-5 space-y-2">{children}</ul>
  ),
  code: ({ children }) => (
    <code className="rounded bg-white/10 px-1 py-0.5 text-xs md:text-sm font-mono text-[#00ffd5]">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mb-6 overflow-x-auto rounded-xl bg-black/60 p-4 border border-white/5 text-xs md:text-sm">
      {children}
    </pre>
  ),
};

export default Dashboard;
