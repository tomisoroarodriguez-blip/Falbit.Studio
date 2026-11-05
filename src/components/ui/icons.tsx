export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M3 10h13M11 4l6 6-6 6" />
    </svg>
  );
}

export function ExternalIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M6 3H3v10h10v-3M9 3h4v4M13 3 7 9" />
    </svg>
  );
}
