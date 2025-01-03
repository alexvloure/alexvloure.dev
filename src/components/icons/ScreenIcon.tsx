export const ScreenIcon = (props: React.ComponentPropsWithoutRef<"svg">) => {
  return (
    <svg
      fill="none"
      height="15"
      viewBox="0 0 15 15"
      width="15"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M1.5 1C0.671573 1 0 1.67157 0 2.5V10.5C0 11.3284 0.671574 12 1.5 12L13.5 12C14.3284 12 15 11.3284 15 10.5V2.5C15 1.67157 14.3284 1 13.5 1H1.5Z" />
      <path d="M4 15H11V14H4V15Z" />
    </svg>
  );
};
