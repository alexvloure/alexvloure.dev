import Image from "next/image";

export const Card = ({
  title,
  description,
  className = "",
  /**
   * Optional render function to customize the top content of the card.
   */
  renderContent,
}: {
  title: string;
  description?: string;
  className?: string;
  imageSrc?: string;
  renderContent?: () => React.ReactNode;
}) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-lg ${className} p-6`}
    >
      {renderContent && renderContent()}
      <div
        className="flex h-[calc(100%_-_3rem)] flex-col items-center justify-end overflow-hidden
          md:h-full"
      >
        <h3 className="text-[20px] font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        )}
      </div>
    </div>
  );
};
