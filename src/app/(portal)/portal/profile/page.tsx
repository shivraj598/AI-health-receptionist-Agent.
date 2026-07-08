export default function PortalProfilePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white tracking-tight mb-1">My Profile</h1>
      <p className="text-sm text-white/40 mb-6">Manage your personal information and preferences.</p>
      <div className="bg-white/[0.04] backdrop-blur-2xl rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white text-xl font-bold">
            JS
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Jane Smith</h2>
            <p className="text-sm text-white/50">jane.smith@email.com</p>
          </div>
        </div>
        <form className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1.5">Full Name</label>
            <input type="text" defaultValue="Jane Smith" className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1.5">Email</label>
            <input type="email" defaultValue="jane.smith@email.com" className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1.5">Phone</label>
            <input type="tel" defaultValue="(503) 555-0199" className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200" />
          </div>
          <button type="submit" className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-teal-500/20 hover:shadow-lg transition-all duration-200 text-sm">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}
