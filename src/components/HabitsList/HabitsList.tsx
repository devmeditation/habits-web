import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

import styles from "./habitsList.module.css";

interface HabitsListProps {
  date: Date;
  onCompletedChanged: (completed: number) => void
}

interface Habits {
  id: string;
  title: string;
  created_at: string;
}

interface HabitsInfo {
  possibleHabits: Habits[];
  completedHabits: string[];
}

export function HabitsList({ date, onCompletedChanged }: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  useEffect(() => {
    api
      .get("day", {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => {
        setHabitsInfo(response.data);
      });
  }, []);

  const isDateInPost = dayjs(date).endOf("day").isBefore(new Date());

  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`)

    const ishabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId)

    let completedHabits: string[] = []

    if(ishabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId]
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits
    })

    onCompletedChanged(completedHabits.length)
  }

  return (
    <>
      {habitsInfo?.possibleHabits.map((habit) => {
        return (
          <Checkbox.Root
            key={habit.id}
            onCheckedChange={() => handleToggleHabit(habit.id)}
            checked={habitsInfo.completedHabits.includes(habit.id)}
            disabled={isDateInPost}
            className={`${styles.habitsListContainer} group`}
          >
            <div
              className={`${styles.habitsListIndicator} group-data-[state=checked]:bg-green-500/80 group-focus:ring-2 group-focus:ring-green-500/50 group-focus:bg-green-500/10`}
            >
              <Checkbox.Indicator>
                <Check size={20} color="white" />
              </Checkbox.Indicator>
            </div>
            <span
              className={`${styles.habitsListText} group-data-[state=checked]:line-through group-data-[state=checked]:brightness-75`}
            >
              {habit.title}
            </span>
          </Checkbox.Root>
        );
      })}
    </>
  );
}
