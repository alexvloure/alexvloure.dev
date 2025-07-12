export const SpotifySkeleton = () => {
  return (
    <div className="flex animate-pulse items-center justify-end gap-4">
      <div className="flex flex-col items-end gap-1">
        <div className="h-[18px] w-48 rounded bg-gray-700" />
        <div className="h-4 w-20 rounded bg-gray-700" />
      </div>
      <div
        className="flex aspect-square h-[60px] w-[60px] items-center justify-center rounded-full
          bg-gray-700 bg-cover bg-center"
      ></div>
    </div>
  );
};
