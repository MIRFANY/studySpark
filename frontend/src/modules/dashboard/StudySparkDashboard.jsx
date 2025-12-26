import { HiOutlineHome, HiOutlineChartBar, HiOutlineBookOpen, HiOutlineUsers, HiOutlineCog, HiOutlineLightBulb, HiOutlinePlus } from "react-icons/hi";
const features = [
  {
    title: "Mnemonics Genius",
    desc: "Create & Discover Memory Aids",
    bg: "bg-blue-800",
    btn: "New Mnemonics",
    btnColor: "bg-yellow-400 text-blue-900",
    icon: <HiOutlineBookOpen className="text-yellow-300 text-3xl" />,
    route: "/mnemonics",
    notchColor: "fill-blue-900"
  },
  {
    title: "Study Navigator",
    desc: "Plan Your Learning Journey",
    bg: "bg-green-700",
    btn: "Set Schedule",
    btnColor: "bg-yellow-400 text-green-900",
    icon: <HiOutlineChartBar className="text-yellow-300 text-3xl" />,
    route: "/planner",
    notchColor: "fill-green-800"
  },
  {
    title: "Scenario Simulator",
    desc: "Practice Real-World Problems",
    bg: "bg-yellow-400",
    btn: "Start Scenario",
    btnColor: "bg-blue-900 text-yellow-300",
    icon: <HiOutlineLightBulb className="text-blue-900 text-3xl" />,
    route: "/practice",
    notchColor: "fill-yellow-300"
  },
  {
    title: "Flashcard Fortress",
    desc: "Master Key Concepts",
    bg: "bg-purple-700",
    btn: "Review Decks",
    btnColor: "bg-yellow-400 text-purple-900",
    icon: <HiOutlineUsers className="text-yellow-300 text-3xl" />,
    route: "/flashcards",
    notchColor: "fill-purple-800"
  }
];

export default function StudySparkDashboard() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1e232b] to-[#232a3b] relative overflow-hidden font-sans">
      {/* Watermark icons */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <HiOutlineLightBulb className="absolute left-20 top-32 text-yellow-200 text-[10rem]" />
        <HiOutlineBookOpen className="absolute right-32 top-10 text-blue-200 text-[8rem]" />
        <HiOutlineChartBar className="absolute left-1/2 bottom-10 text-green-200 text-[9rem]" />
      </div>
      {/* Sidebar */}
      <aside className="fixed top-6 left-6 h-[92vh] w-20 bg-white/10 backdrop-blur-lg rounded-3xl flex flex-col items-center py-8 z-20 shadow-2xl">
        <div className="mb-8">
          <HiOutlineLightBulb className="text-yellow-400 text-3xl" />
        </div>
        <nav className="flex flex-col gap-6">
          <SidebarIcon icon={<HiOutlineHome />} label="Home" active />
          <SidebarIcon icon={<HiOutlineChartBar />} label="Progress" />
          <SidebarIcon icon={<HiOutlineBookOpen />} label="Resources" />
          <SidebarIcon icon={<HiOutlineUsers />} label="Community" />
          <SidebarIcon icon={<HiOutlineCog />} label="Settings" />
        </nav>
      </aside>
      {/* Top Nav */}
      <header className="flex items-center justify-between pl-40 pr-12 pt-10 pb-6">
        <div className="flex items-center gap-3">
          <HiOutlineLightBulb className="text-yellow-400 text-2xl" />
          <span className="text-white font-extrabold text-2xl tracking-wide">STUDY <span className="text-yellow-400">SPARK</span></span>
        </div>
        <div className="text-white text-lg font-semibold">Hello, Alex!</div>
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-12 h-12 rounded-full border-2 border-yellow-400 object-cover" />
      </header>
      {/* Main Grid */}
      <main className="pl-40 pr-12 pb-12 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto mt-8">
          {features.map((f, i) => (
            <div
              key={i}
              className={`relative ${f.bg} rounded-[2.5rem] shadow-xl flex items-center p-8 min-h-[200px] group transition-transform duration-200 hover:scale-105`}
            >
              {/* Notch */}
              <svg className="absolute left-1/2 -translate-x-1/2 -top-6" width="80" height="32" viewBox="0 0 80 32">
                <path d="M0,32 Q40,-32 80,32" className={f.notchColor} />
              </svg>
              {/* Icon */}
              <div className="mr-6">{f.icon}</div>
              {/* Text */}
              <div className="flex-1">
                <div className="text-white font-bold text-xl mb-2">{f.title}</div>
                <div className="text-gray-200 text-base mb-4">{f.desc}</div>
                <button className={`rounded-full px-5 py-2 font-bold shadow ${f.btnColor} transition-transform duration-200 hover:scale-105`}>
                  {f.btn}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      {/* Floating Action Button */}
      <button className="fixed bottom-10 right-10 bg-yellow-400 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-4xl shadow-2xl hover:bg-yellow-300 transition-transform duration-200 hover:scale-110 z-30">
        <HiOutlinePlus />
      </button>
    </div>
  );
}

function SidebarIcon({ icon, label, active }) {
  return (
    <div className={`flex flex-col items-center group cursor-pointer transition-transform duration-200 hover:scale-110 ${active ? "text-yellow-400" : "text-white/80"}`}>
      <span className="text-2xl">{icon}</span>
      <span className="text-xs mt-1 font-semibold">{label}</span>
    </div>
  );
}