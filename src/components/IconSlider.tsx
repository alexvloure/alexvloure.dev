type IconSliderProps = {
  icons: React.ReactNode[];
};

export const IconSlider: React.FC<IconSliderProps> = ({ icons }) => {
  return (
    <div className="w-[calc(100%-2px)] max-w-[500px] relative overflow-hidden self-center bg-[var(--background)] before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:bg-[linear-gradient(to_right,var(--background),transparent)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,var(--background),transparent)] after:content-['']">
      <div className="animate-infinite-scroll flex w-[calc(250px*10)] max-h-14">
        {icons.map((icon, index) => (
          <div className="flex mx-auto items-center justify-center" key={index}>
            {icon}
          </div>
        ))}
        {icons.map((icon, index) => (
          <div className="flex mx-auto items-center justify-center" key={index}>
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
};
