export function Footer() {
  return (
    <footer className="py-12 bg-[#09090b] border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="text-xl font-semibold text-white">Voxarel</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm">
            <a href="#" className="text-zinc-500 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors">
              Contact
            </a>
          </div>

          {/* Copyright */}
          <p className="text-zinc-600 text-sm">
            &copy; {new Date().getFullYear()} Voxarel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
