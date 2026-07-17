import type { SVGProps } from "react";

function Base({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </Base>
);

export const Check = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M4.5 12.5l5 5L19.5 6.5" />
  </Base>
);

export const Menu = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </Base>
);

export const Close = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M6 6l12 12" />
    <path d="M18 6L6 18" />
  </Base>
);

export const Package = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
    <path d="M3 8l9 5 9-5" />
    <path d="M12 13v8" />
    <path d="M7.5 5.5l9 5" />
  </Base>
);

export const Warehouse = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M3 21V9.5L12 4l9 5.5V21" />
    <path d="M3 21h18" />
    <path d="M8 21v-8h8v8" />
    <path d="M8 17h8" />
  </Base>
);

export const Receipt = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M5.5 3h13v18l-2.2-1.6-2.1 1.6-2.2-1.6-2.2 1.6-2.1-1.6L5.5 21V3z" />
    <path d="M9.5 8.5h5" />
    <path d="M9.5 12.5h5" />
  </Base>
);

export const Layers = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M12 3l9 5-9 5-9-5 9-5z" />
    <path d="M3.5 12.5L12 17l8.5-4.5" />
    <path d="M3.5 16.5L12 21l8.5-4.5" />
  </Base>
);

export const Route = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <circle cx="6" cy="19" r="2.4" />
    <circle cx="18" cy="5" r="2.4" />
    <path d="M9 19h6a3.5 3.5 0 0 0 0-7h-6a3.5 3.5 0 0 1 0-7h6" />
  </Base>
);

export const Pulse = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 3.8V17h-1A2.5 2.5 0 0 1 4 15z" />
    <path d="M8 11h.01" />
    <path d="M12 11h.01" />
    <path d="M16 11h.01" />
  </Base>
);

export const Search = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </Base>
);

export const Lock = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <rect x="5" y="11" width="14" height="9.5" rx="2" />
    <path d="M8 11V7.5a4 4 0 0 1 8 0V11" />
    <path d="M12 15v2" />
  </Base>
);

export const Mail = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="M4.5 7.5l7.5 5.5 7.5-5.5" />
  </Base>
);

export const Phone = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M6.8 3.5h2.6l1.4 4-2 1.5a12.5 12.5 0 0 0 5.7 5.7l1.5-2 4 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.8 5.7a2 2 0 0 1 2-2.2z" />
  </Base>
);

export const FileText = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M6 3h8l4 4v14H6V3z" />
    <path d="M14 3v4h4" />
    <path d="M9 12h6" />
    <path d="M9 16h6" />
  </Base>
);

export const Shield = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M12 3l7 2.8v5.4c0 4.3-2.8 7.6-7 9.8-4.2-2.2-7-5.5-7-9.8V5.8L12 3z" />
    <path d="M9 11.8l2.2 2.2L15.5 9.5" />
  </Base>
);

export const MapPin = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M12 21s-6.5-5.3-6.5-10.2a6.5 6.5 0 0 1 13 0C18.5 15.7 12 21 12 21z" />
    <circle cx="12" cy="10.5" r="2.3" />
  </Base>
);
