import type { SVGProps } from 'react';

export function LeafIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M11 20A7 7 0 0 1 4 13V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.586A4 4 0 0 0 12.414 10H14a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1.5a3.5 3.5 0 0 0-2.5 6Z" />
      <path d="M12 18a7 7 0 0 0 7-7V7a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.586A4 4 0 0 1 11.586 10H10a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1.5a3.5 3.5 0 0 1 2.5 6Z" />
    </svg>
  );
}
