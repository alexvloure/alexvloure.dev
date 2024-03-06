import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export const useWeather = () => {
  const { i18n } = useTranslation('global');
  const fetchWeather = async () => {
    const response = await fetch(`/api/weather?lang=${i18n.language}`);
    return await response.json();
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ['weather'],
    queryFn: fetchWeather,
    staleTime: 5 * (60 * 1000), // 5 minutes
  });

  if (error) {
    console.log('Something went wrong!', error);
  }

  return { data, isLoading };
};
