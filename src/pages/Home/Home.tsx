
import { Header } from "../../components/Header/Header";
import { SummaryTable } from "../../components/SummaryTable/SummaryTable";
import styles from "./home.module.css";

export function Home() { 
  return (
    <section className={styles.home}>
      <div className={styles.homeContainer}>
        <Header />
        <SummaryTable />
      </div>
    </section>
  );
}
