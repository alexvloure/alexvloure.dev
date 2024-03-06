import styles from '@/styles/Weather.module.css';

export default function Night() {
  return <Moon />;
}

function Moon() {
  return (
    <div
      className={`${styles.moon} rounded-3xl md:rounded-[3rem] w-20 h-20 md:w-40 md:h-40 xl:w-56 xl:h-56 right-5 md:right-10`}>
      <span
        className={`${styles.dot1} w-5 h-5 md:w-10 md:h-10 top-2 md:top-4 left-6 md:left-10`}
      />
      <span
        className={`${styles.dot2} w-3 h-3 md:w-6 md:h-6 top-8 md:top-16 left-2 md:left-2`}
      />
      <span className={`${styles.star1} w-[1px] h-3 md:h-4`} />
      <span className={`${styles.star2} w-[1px] h-5 md:h-7`} />
    </div>
  );
}
