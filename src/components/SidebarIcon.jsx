export default function SidebarIcon({ icon: Icon, active }) {
  return (
    <div
      className={`p-3 rounded-xl mb-4 cursor-pointer transition-all ${
        active
          ? 'bg-[#2a1e1e] text-[#ff4d4d]'
          : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
      }`}
    >
      <Icon size={22} strokeWidth={active ? 2.5 : 2} />
    </div>
  );
}