import styles from './Guard.module.css';

function LoadingGuard() {
  return (
    <div className={styles.container}>
      {' '}
      <h3 className={styles.title}>Loading...!</h3>
    </div>
  );
}

export default LoadingGuard;
