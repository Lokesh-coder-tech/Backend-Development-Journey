import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import {
  LayoutGrid,
  Folder,
  Share2,
  Sparkles,
  Settings,
  Search,
  Bell,
  Plus,
  MessageSquare,
  ExternalLink,
  Menu,
  X,
  LogOut,
  User,
  ChevronDown,
  FileText,
} from "lucide-react";

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Destructuring handleLogout from your hook
  const { handleLogout } = useAuth();

  // Temporary local state for UI demo
  // In your next step, you'll likely get this from Redux/Context via useAuth()
  const [user] = useState({
    name: "Alex Vance",
    email: "alex.vance@nebula.io",
  });

  const getInitials = (name) => name.charAt(0).toUpperCase();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="flex h-screen bg-[#0f0f10] text-gray-300 font-sans overflow-hidden">
      {/* --- SIDEBAR (Desktop) --- */}
      <aside className="hidden lg:flex w-64 border-r border-white/5 flex-col p-6 space-y-8 bg-[#0f0f10]">
        <Logo />
        <nav className="flex-1 space-y-2">
          <NavItem icon={<LayoutGrid size={18} />} label="All Saves" active />
          <NavItem icon={<Folder size={18} />} label="Collections" />
          <NavItem icon={<Share2 size={18} />} label="Graph View" />
          <NavItem icon={<Sparkles size={18} />} label="Highlights" />
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </nav>
        <button className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-500 hover:text-white transition-all">
          <Plus size={18} /> Quick Capture
        </button>
      </aside>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-[#0f0f10] z-50 p-6 flex flex-col lg:hidden border-r border-white/10"
            >
              <div className="flex justify-between items-center mb-8">
                <Logo />
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X />
                </button>
              </div>
              <nav className="flex-1 space-y-4">
                <NavItem
                  icon={<LayoutGrid size={20} />}
                  label="All Saves"
                  active
                />
                <NavItem icon={<Folder size={20} />} label="Collections" />
                <NavItem icon={<Share2 size={20} />} label="Graph View" />
                <NavItem icon={<Sparkles size={20} />} label="Highlights" />
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col overflow-y-auto custom-scrollbar relative">
        <header className="p-4 lg:p-6 flex items-center justify-between sticky top-0 bg-[#0f0f10]/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 hover:bg-white/5 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <span className="font-bold text-white uppercase tracking-tighter">
              SaveHub
            </span>
          </div>

          <div className="hidden lg:relative lg:block w-1/3">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search your digital astral..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-12 pr-4 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            <Bell
              size={20}
              className="hidden sm:block hover:text-white cursor-pointer text-gray-500"
            />
            <Plus
              size={20}
              className="hidden sm:block hover:text-white cursor-pointer text-gray-500"
            />

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 pr-2 hover:bg-white/5 rounded-full transition-colors border border-white/5"
              >
                <div className="w-8 h-8 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20">
                  {getInitials(user.name)}
                </div>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-56 bg-[#161618] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-white/5 mb-2">
                      <p className="text-sm font-medium text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-white/5 rounded-lg transition-colors group">
                      <User size={16} className="group-hover:text-white" />{" "}
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    >
                      <LogOut size={16} /> Log Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dashboard Sections */}
        <section className="p-4 lg:p-8 space-y-12 pb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-emerald-400" size={20} />
              <h2 className="text-xl font-semibold text-white tracking-tight">
                Smart Resurfacing
              </h2>
              <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded tracking-widest uppercase">
                2 Months Ago
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LargeCard
                type="MEDIUM"
                time="8 MIN READ"
                title="The Architecture of Infinite Information Systems"
                tags={["#Philosophy", "#Tech"]}
                img="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800"
              />
              <LargeCard
                type="YOUTUBE"
                time="15:20"
                title="Designing for the Astral Plane"
                tags={["#Design", "#Tutorial"]}
                video
              />
            </div>
          </motion.div>

          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex gap-4 lg:gap-8 overflow-x-auto no-scrollbar">
                <span className="text-white border-b-2 border-indigo-500 pb-4 whitespace-nowrap cursor-pointer">
                  Recent Saves
                </span>
                <span className="hover:text-white cursor-pointer whitespace-nowrap transition-colors">
                  Unorganized
                </span>
                <span className="hover:text-white cursor-pointer whitespace-nowrap transition-colors">
                  Archived
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SmallCard
                title="Mastering TypeScript: Advanced Patterns"
                source="dev.to"
                type="ARTICLE"
              />
              <QuoteCard
                author="@linear_app"
                text="The best interfaces are the ones that disappear. Focus on the object, not the chrome."
              />
              <ImageCard
                title="Brutalist Space Station Concept"
                source="Behance"
              />
              <ProgressCard
                title="InterPlanetary File System (IPFS) Whitepaper"
                progress={65}
              />
              <SmallCard
                title="Building a High-Performance Render Engine"
                source="The Cherno"
                type="VIDEO"
              />
            </div>
          </div>
        </section>

        <button className="fixed bottom-8 right-8 bg-[#d8d8ff] text-[#1a1a2e] px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95 transition-all z-40">
          <MessageSquare size={18} /> Ask Astral AI
        </button>
      </main>
    </div>
  );
};

/* --- SUB-COMPONENTS REMAIN THE SAME AS BEFORE --- */
const Logo = () => (
  <div className="flex items-center gap-2 text-white font-bold text-xl">
    <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
      <Sparkles size={18} className="text-white" />
    </div>
    SaveHub
  </div>
);

const NavItem = ({ icon, label, active = false }) => (
  <div
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? "bg-white/10 text-white font-medium" : "hover:bg-white/5 text-gray-500 hover:text-gray-300"}`}
  >
    {icon} <span>{label}</span>
  </div>
);

const LargeCard = ({ type, time, title, tags, video = false, img }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-[#161618] border border-white/5 rounded-3xl overflow-hidden flex flex-col p-1 transition-all"
  >
    <div className="h-48 rounded-2xl bg-[#0f0f10] relative overflow-hidden">
      {img && (
        <img
          src={img}
          className="w-full h-full object-cover opacity-60"
          alt=""
        />
      )}
      {video && (
        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-indigo-500/10 to-purple-500/10">
          <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-emerald-400 border-b-8 border-b-transparent ml-1" />
          </div>
        </div>
      )}
    </div>
    <div className="p-6 space-y-3">
      <div className="flex gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
        <span>{type}</span> • <span>{time}</span>
      </div>
      <h3 className="text-xl font-medium text-white leading-tight">{title}</h3>
      <div className="flex gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-400"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const SmallCard = ({ title, source, type }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-[#161618] p-6 rounded-3xl border border-white/5 space-y-4 hover:border-white/10 transition-colors"
  >
    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
      <FileText size={12} /> {type}
    </div>
    <h4 className="text-md font-medium text-white line-clamp-2 leading-snug">
      {title}
    </h4>
    <div className="flex justify-between items-center text-xs text-gray-600">
      <span>{source}</span>
      <span>2h ago</span>
    </div>
  </motion.div>
);

const QuoteCard = ({ author, text }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-[#161618] p-8 rounded-3xl border border-white/5 flex flex-col justify-center space-y-6"
  >
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-[10px]">
        L
      </div>
      <span className="text-sm font-medium text-gray-400">{author}</span>
      <ExternalLink size={14} className="ml-auto text-gray-600" />
    </div>
    <p className="text-lg italic text-white leading-relaxed">"{text}"</p>
    <div className="flex gap-2">
      <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded">
        #ProductDesign
      </span>
    </div>
  </motion.div>
);

const ImageCard = ({ title, source }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-[#161618] rounded-3xl border border-white/5 overflow-hidden group"
  >
    <div className="relative h-64 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        alt=""
      />
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-gray-300 flex items-center gap-1">
        <Sparkles size={10} className="text-emerald-400" /> VISUAL
      </div>
    </div>
    <div className="p-6">
      <h4 className="text-white font-medium text-lg mb-4">{title}</h4>
      <div className="flex justify-between items-center text-xs text-gray-600">
        <span>{source}</span>
        <span>Saved yesterday</span>
      </div>
    </div>
  </motion.div>
);

const ProgressCard = ({ title, progress }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-[#161618] p-8 rounded-3xl border border-white/5 space-y-6"
  >
    <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400 border border-orange-500/20">
      <FileText size={20} />
    </div>
    <h4 className="text-white font-medium text-lg leading-tight">{title}</h4>
    <div className="space-y-3">
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "anticipate" }}
          className="h-full bg-indigo-500"
        />
      </div>
      <div className="flex justify-end text-[10px] font-bold text-gray-500 tracking-tighter">
        {progress}% READ
      </div>
    </div>
  </motion.div>
);

export default Dashboard;
