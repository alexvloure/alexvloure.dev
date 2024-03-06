import styles from '@/styles/Weather.module.css';

export default function Day() {
  return <Sun />;
}

function Sun() {
  return (
    <div
      className={`${styles.sun} rounded-[2rem] md:rounded-[4rem] xl:rounded-[6rem] w-20 h-20 md:w-40 md:h-40 xl:w-56 xl:h-56 right-5 md:right-10`}
    />
  );
}
