type IconSliderProps = {
  icons: React.ReactNode[];
};

export const IconSlider: React.FC<IconSliderProps> = ({ icons }) => {
  return (
    <div
      className="bg-background relative w-[calc(100%-2px)] max-w-[500px] self-center
        overflow-hidden before:absolute before:left-0 before:top-0 before:z-[2]
        before:h-full before:w-[100px]
        before:bg-[linear-gradient(to_right,hsl(var(--background)),transparent)]
        before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2]
        after:h-full after:w-[100px] after:-scale-x-100
        after:bg-[linear-gradient(to_right,hsl(var(--background)),transparent)]
        after:content-['']"
    >
      <div className="flex max-h-14 w-[calc(250px*10)] animate-infinite-scroll-icons">
        {icons.map((icon, index) => (
          <div className="mx-auto flex items-center justify-center" key={index}>
            {icon}
          </div>
        ))}
        {icons.map((icon, index) => (
          <div className="mx-auto flex items-center justify-center" key={index}>
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
};
