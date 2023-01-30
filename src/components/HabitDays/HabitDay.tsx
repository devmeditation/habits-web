import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import dayjs from "dayjs";

import styles from "./habitDay.module.css";

import { ProgressBar } from "../ProgressBar/ProgressBar";
import { HabitsList } from "../HabitsList/HabitsList";
import { useState } from "react";

interface HabitDauProps {
  date: Date;
  defaultCompleted?: number;
  amount?: number;
  focus?: boolean;
}

export function HabitDay({
  defaultCompleted = 0,
  amount = 0,
  date,
  focus,
}: HabitDauProps) {
  const [completed, setCompleted] = useState(defaultCompleted);
  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format("dddd");

  function handleCompletedChanged(completed: number) {
    setCompleted(completed);
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        autoFocus={focus ?? false}
        className={clsx(`${styles.habitDaysSquare} `, {
          " !bg-violet-900 border-violet-800":
            completedPercentage > 0 && completedPercentage < 20,
          " !bg-violet-800 border-violet-700":
            completedPercentage >= 20 && completedPercentage < 40,
          " !bg-violet-700 border-violet-600":
            completedPercentage >= 40 && completedPercentage < 60,
          " !bg-violet-600 border-violet-500":
            completedPercentage >= 60 && completedPercentage < 80,
          " !bg-violet-500 border-violet-400": completedPercentage >= 80,
        })}
      />

      <Popover.Portal>
        <Popover.Content className={styles.content}>
          <span className={styles.day}>{dayOfWeek}</span>
          <span className={styles.date}>{dayAndMonth}</span>

          <ProgressBar progress={completedPercentage} />

          <HabitsList date={date} onCompletedChanged={handleCompletedChanged} />

          <div className={styles.previousDate}>
            {!dayjs(Date.now()).isSame(date, "day") && (
              <h2 className={styles.previousDateText}>
                Você não pode editar uma data que já passou
              </h2>
            )}
          </div>

          <Popover.Arrow width={16} height={8} className={styles.arrow} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
