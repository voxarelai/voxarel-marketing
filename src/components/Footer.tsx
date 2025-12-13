export function Footer() {
  const productLinks = [
    { label: "Container Optimizer", href: "#" },
    { label: "Shipment Tracking", href: "#" },
    { label: "Executive Dashboard", href: "#" },
  ];

  const companyLinks = [
    { label: "About Us", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Careers", href: "#" },
  ];

  const resourceLinks = [
    { label: "Documentation", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ];

  return (
    <>
      {/* Large watermark brand section - above footer */}
      <div className="relative h-[280px] bg-[#fafafa] overflow-hidden">
        {/* Decorative gradient circles for watermark section */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-orange-200/30 to-transparent blur-3xl" />
          <div className="absolute top-10 left-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-rose-200/20 to-transparent blur-3xl" />
          <div className="absolute top-0 right-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-orange-100/30 to-transparent blur-3xl" />
        </div>

        {/* Giant brand text - positioned so only bottom 2/3 shows */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-[13%] text-[18vw] font-bold tracking-tight text-zinc-900/[0.04] whitespace-nowrap pointer-events-none select-none"
          aria-hidden="true"
        >
          Voxarel
        </div>
      </div>

      <footer className="bg-[#fafafa] relative overflow-hidden">
        {/* Decorative gradient circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-orange-200/40 to-transparent blur-3xl" />
        <div className="absolute -top-20 left-1/2 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-rose-200/30 to-transparent blur-3xl" />
        <div className="absolute -top-40 right-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-orange-100/40 to-transparent blur-3xl" />
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Left Side - Logo & Compliance */}
          <div className="flex flex-col gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-xl font-semibold text-zinc-900">Voxarel</span>
            </div>

            {/* Compliance Badges */}
            <div className="flex flex-col gap-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium w-fit">
                Compliant
              </span>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                  <span className="text-[8px] text-zinc-600 font-semibold">SOC2</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                  <span className="text-[8px] text-zinc-600 font-semibold">ISO</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                  <span className="text-[8px] text-zinc-600 font-semibold">ISO</span>
                </div>
                <span className="text-sm text-zinc-400 ml-1">5+</span>
              </div>
            </div>
          </div>

          {/* Right Side - Link Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-16">
            {/* Product Column */}
            <div>
              <h4 className="text-sm font-medium text-zinc-400 mb-4">Product</h4>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-zinc-900 hover:text-zinc-600 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-sm font-medium text-zinc-400 mb-4">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-zinc-900 hover:text-zinc-600 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="text-sm font-medium text-zinc-400 mb-4">Resources</h4>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-zinc-900 hover:text-zinc-600 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-200 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-zinc-500">
              © {new Date().getFullYear()} Voxarel. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {/* X/Twitter */}
              <a
                href="#"
                className="text-zinc-400 hover:text-zinc-900 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="text-zinc-400 hover:text-zinc-900 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
