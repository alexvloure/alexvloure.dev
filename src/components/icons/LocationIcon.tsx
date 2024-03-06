export const LocationIcon = (props: React.ComponentPropsWithoutRef<'svg'>) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="48px"
      height="48px"
      viewBox="0 0 48 48"
      preserveAspectRatio="xMidYMid meet"
      {...props}>
      <g transform="translate(0,48) scale(0.1,-0.1)" stroke="none">
        <path
          d="M175 426 c-86 -39 -126 -136 -90 -222 18 -43 132 -164 155 -164 23 0
137 121 155 164 58 138 -85 282 -220 222z m133 -36 c18 -11 41 -34 52 -52 39
-64 22 -122 -64 -213 l-56 -60 -52 55 c-28 30 -60 69 -70 85 -69 115 74 255
190 185z"
        />
        <path
          d="M200 310 c-11 -11 -20 -29 -20 -40 0 -26 34 -60 60 -60 26 0 60 34
60 60 0 11 -9 29 -20 40 -11 11 -29 20 -40 20 -11 0 -29 -9 -40 -20z m65 -40
c0 -18 -6 -26 -23 -28 -13 -2 -25 3 -28 12 -10 26 4 48 28 44 17 -2 23 -10 23
-28z"
        />
      </g>
    </svg>
  );
};
