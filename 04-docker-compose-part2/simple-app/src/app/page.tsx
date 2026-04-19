import SystemStatusBlock from './components/SystemStatus/SystemStatusBlock';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <h1>System status</h1>
          <br />
          <SystemStatusBlock />
        </div>
      </main>
    </div>
  );
}
