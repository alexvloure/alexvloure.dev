export const SuundLoadingOverlay = () => {
  return (
    <div
      className="bg-opacity-85 absolute inset-0 flex items-center justify-center rounded-lg
        bg-[#ffffffd1] backdrop-blur-sm dark:bg-[#0c0c0cd1]"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="audio-waveform flex h-12 items-end gap-1">
          <div
            className="waveform-bar w-1 rounded-sm bg-gradient-to-t from-[var(--accent)] to-[#ffffff9c]
              dark:to-[#2e2e2e]"
          ></div>
          <div
            className="waveform-bar w-1 rounded-sm bg-gradient-to-t from-[var(--accent)] to-[#ffffff9c]
              dark:to-[#2e2e2e]"
          ></div>
          <div
            className="waveform-bar w-1 rounded-sm bg-gradient-to-t from-[var(--accent)] to-[#ffffff9c]
              dark:to-[#2e2e2e]"
          ></div>
          <div
            className="waveform-bar w-1 rounded-sm bg-gradient-to-t from-[var(--accent)] to-[#ffffff9c]
              dark:to-[#2e2e2e]"
          ></div>
          <div
            className="waveform-bar w-1 rounded-sm bg-gradient-to-t from-[var(--accent)] to-[#ffffff9c]
              dark:to-[#2e2e2e]"
          ></div>
          <div
            className="waveform-bar w-1 rounded-sm bg-gradient-to-t from-[var(--accent)] to-[#ffffff9c]
              dark:to-[#2e2e2e]"
          ></div>
          <div
            className="waveform-bar w-1 rounded-sm bg-gradient-to-t from-[var(--accent)] to-[#ffffff9c]
              dark:to-[#2e2e2e]"
          ></div>
          <div
            className="waveform-bar w-1 rounded-sm bg-gradient-to-t from-[var(--accent)] to-[#ffffff9c]
              dark:to-[#2e2e2e]"
          ></div>
          <div
            className="waveform-bar w-1 rounded-sm bg-gradient-to-t from-[var(--accent)] to-[#ffffff9c]
              dark:to-[#2e2e2e]"
          ></div>
          <div
            className="waveform-bar w-1 rounded-sm bg-gradient-to-t from-[var(--accent)] to-[#ffffff9c]
              dark:to-[#2e2e2e]"
          ></div>
        </div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Suund is analyzing your musical mood...
        </p>
      </div>
    </div>
  );
};
