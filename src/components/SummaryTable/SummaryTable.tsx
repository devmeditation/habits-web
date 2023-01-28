import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { generateDatesFromYearBeginning } from "../../utils/generateDatesFromYearBeginning";
import { HabitDay } from "../HabitDays/HabitDay";
import styles from "./summaryTable.module.css";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7; // 18 semanas
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    api.get("summary").then((response) => {
      setSummary(response.data);
    });
  }, []);
  return (
    <section className={styles.summaryTable}>
      <div className={styles.summaryTableSide}>
        {weekDays.map((weekDay, index) => {
          return (
            <div key={index} className={styles.summaryTableHeader}>
              {weekDay}
            </div>
          );
        })}
      </div>

      <div className={styles.summaryTableContainer}>
        {(summary.length > 0) && summaryDates.map((date) => {
          const dayInSummary = summary.find((day) => {
            return dayjs(date).isSame(day.date, "day");
          });

          return (
            <HabitDay
              key={date.toISOString()}
              date={date}
              amount={dayInSummary?.amount}
              defaultCompleted={dayInSummary?.completed}
            />
          );
        })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, index) => {
            return <HabitDay date={new Date()} key={index} />;
          })}
      </div>
    </section>
  );
}
