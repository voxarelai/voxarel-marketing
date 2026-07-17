import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-sm text-zinc-500 uppercase tracking-widest mb-4">404</p>
        <h1 className="heading-serif text-4xl md:text-5xl text-white mb-4">
          Page not found
        </h1>
        <p className="text-zinc-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-2.5 bg-white text-zinc-900 rounded-full font-medium text-sm hover:bg-zinc-100 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
