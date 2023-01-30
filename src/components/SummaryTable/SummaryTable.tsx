import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { notificationPush } from "../../lib/notification";
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

  // if(summary.length > 0) {
  //   const notificationOnDay = summary.find((day) => {            
  //       return dayjs(Date.now()).isSame(day.date, "day");
  //   });
    
     
  //   if(notificationOnDay) {
  //     const rest = notificationOnDay.amount - notificationOnDay.completed

  //     if (rest === 0) {
  //       notificationPush(
  //         `Parabéns você concluiu todos os hábitos de hoje`, 
  //         '/icon.png',
  //         )  
  //     } else {

  //       (rest > 1) 
  //       ?
  //        notificationPush(
  //         `Ops, você ainda não concluiu os ${rest} hábitos 🧐`, 
  //         '/icon.png',
  //         )
  //       : 
  //       notificationPush(
  //         `Ops, ainda tem ${rest} hábito não concluido 🧐`, 
  //         '/icon.png',
  //         )
  //     }
  //   }
 
  // }
  
  
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
              focus={dayjs(Date.now()).isSame(date, 'day')}
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
