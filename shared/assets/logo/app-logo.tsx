export function AppLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="1024" height="1024" rx="220" fill="#F7F8F3" />
      <g transform="translate(512,512) scale(5.6)">
        <path
          d="M0,-46 C13,-46 21,-36 21,-23 C21,-7 7,12 2,23 C1,25 -1,25 -2,23
             C-7,12 -21,-7 -21,-23 C-21,-36 -13,-46 0,-46 Z"
          fill="#74815C"
        />
        <circle cx="0" cy="39" r="10" fill="#AFBC93" />
      </g>
    </svg>
  );
}
