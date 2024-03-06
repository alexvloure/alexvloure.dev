type LoaderProps = {
  fallback: React.ReactNode;
  isLoading: boolean;
  children: React.ReactNode;
};

export function Loader({ fallback, isLoading, children }: LoaderProps) {
  return <>{isLoading ? fallback : children}</>;
}
