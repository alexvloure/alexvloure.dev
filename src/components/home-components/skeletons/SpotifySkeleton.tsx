export const SpotifySkeleton = () => {
  return (
    <div className="flex justify-end items-center gap-4 animate-pulse">
      <div className="flex flex-col items-end gap-1">
        <div className="w-48 h-[18px] rounded bg-gray-700" />
        <div className="w-20 h-4 rounded bg-gray-700" />
      </div>
      <div className="bg-cover bg-center bg-gray-700 rounded-full w-[60px] h-[60px] aspect-square flex justify-center items-center"></div>
    </div>
  );
};
