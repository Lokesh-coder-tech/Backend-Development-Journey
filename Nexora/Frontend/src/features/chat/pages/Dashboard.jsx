import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import {
  Search,
  LayoutGrid,
  History,
  Compass,
  Plus,
  Monitor,
  TrendingUp,
  MoreHorizontal,
  UserCircle,
  Menu,
  X,
  ArrowUpRight,
  SendHorizontal,
} from "lucide-react";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const chat = useChat();

  const { user } = useSelector((state) => state.auth);

  console.log(user);

  useEffect(() => {
    chat.initializeSocketConnection();
  }, []);

  return (
    <div className="flex h-screen w-full bg-[#080C0C] text-[#E5E5E5] font-sans overflow-hidden">
      {/* --- MOBILE OVERLAY --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside
        className={`
        fixed lg:relative z-50 h-full w-72 bg-[#0A0F0F] border-r border-teal-900/30 flex flex-col p-5 transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-teal-500 rounded-lg shadow-[0_0_15px_rgba(20,184,166,0.5)] flex items-center justify-center">
              <ArrowUpRight size={20} className="text-black" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Nexora
            </span>
          </div>
          <button
            className="lg:hidden text-gray-400"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 mt-6 space-y-1 overflow-y-auto custom-scrollbar">
          <SidebarItem icon={<Search size={19} />} label="Search" active />
          <SidebarItem icon={<Monitor size={19} />} label="Computer" />

          <div className="py-4">
            <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-teal-500/10 border border-teal-500/30 rounded-xl hover:bg-teal-500/20 transition-all group">
              <Plus size={18} className="text-teal-400" />
              <span className="text-sm font-semibold text-teal-500">
                New Thread
              </span>
            </button>
          </div>

          <SidebarItem icon={<History size={19} />} label="History" />
          <SidebarItem icon={<Compass size={19} />} label="Discover" />
          <SidebarItem icon={<LayoutGrid size={19} />} label="Spaces" />
          <SidebarItem icon={<TrendingUp size={19} />} label="Finance" />
          <SidebarItem icon={<MoreHorizontal size={19} />} label="More" />
        </nav>

        <div className="mt-auto pt-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-3 hover:bg-white/5 rounded-xl cursor-pointer transition-all border border-transparent hover:border-white/10">
            <div className="h-9 w-9 rounded-full bg-linear-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-black font-bold">
              {user?.name?.charAt(0) || (
                <UserCircle size={24} className="text-white" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">
                {user?.name || "Nexora Guest"}
              </span>
              <span className="text-[10px] text-teal-500 uppercase tracking-widest font-bold">
                Pro Member
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-white/5 bg-[#080C0C]/80 backdrop-blur-md sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-300"
          >
            <Menu size={24} />
          </button>
          <span className="font-bold text-teal-500">Nexora</span>
          <div className="w-6" /> {/* Spacer */}
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 relative">
          {/* Top Navigation Links */}
          <div className="hidden sm:flex gap-10 absolute top-10 text-xs font-bold uppercase tracking-widest text-gray-500">
            <span className="text-teal-400 border-b-2 border-teal-500 pb-2 cursor-pointer transition-all">
              Answer
            </span>
            <span className="hover:text-white cursor-pointer transition-all">
              Links
            </span>
            <span className="hover:text-white cursor-pointer transition-all">
              Images
            </span>
          </div>

          {/* Central UI */}
          <div className="w-full max-w-3xl space-y-10">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-center">
              How can I help you{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-cyan-400">
                today?
              </span>
            </h1>

            {/* The "Glow" Search Container */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-teal-600 to-cyan-600 rounded-3xl blur-xl opacity-10 group-focus-within:opacity-25 transition duration-500"></div>

              <div className="relative bg-[#0F1616] border border-teal-900/50 rounded-2xl shadow-2xl overflow-hidden">
                <textarea
                  className="w-full bg-transparent border-none focus:ring-0 text-lg p-6 resize-none placeholder-gray-600 h-20 md:h-20"
                  placeholder="Ask Nexora anything..."
                />

                <div className="flex justify-between items-center p-2 bg-black/20 border-t border-white/5 ">
                  <button className="flex items-center gap-2 text-gray-400 hover:text-teal-400 transition-colors text-sm font-medium">
                    <Plus size={18} />
                    <span>Attach</span>
                  </button>

                  <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-black px-5 py-2 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(20,184,166,0.4)]">
                    <span>Send</span>
                    <SendHorizontal size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
const SidebarItem = ({ icon, label, active = false }) => (
  <div
    className={`
    flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all group
    ${active ? "bg-teal-500/10 text-teal-400 border border-teal-500/20" : "text-gray-500 hover:bg-white/5 hover:text-white"}
  `}
  >
    <span
      className={`${active ? "text-teal-400" : "text-gray-500 group-hover:text-teal-400"} transition-colors`}
    >
      {icon}
    </span>
    <span className="text-sm font-medium tracking-wide">{label}</span>
  </div>
);

export default Dashboard;
