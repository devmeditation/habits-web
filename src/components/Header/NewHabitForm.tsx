import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import { CheckBox } from "../CheckBox/CheckBox";

import styles from "./newHabitForm.module.css";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feiera",
  "Sábado",
];


export function NewHabitForm() {
  const [title, setTitle] = useState('')
  const [weekDays, SetWeekDays] = useState<number[]>([])

  // function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   setTitle(event.target.value)
  // }

  function habdleToggleWeekDay(weekDay: number){
    if( weekDays.includes(weekDay)) {
      const weekDayWithRemovedOne = weekDays.filter(day => day !== weekDay)
      SetWeekDays(weekDayWithRemovedOne)
    } else {
      const weekDaysWithAddedOne = [...weekDays, weekDay]

      SetWeekDays(weekDaysWithAddedOne)
    }
  }

  async function createNewHabit(event: FormEvent) {
    event.preventDefault()

    if(!title || weekDays.length === 0) {
      return
    }

    await api.post('habits', {
      title,
      weekDays,
    })

    setTitle('')
    SetWeekDays([])

    alert('Hábito criado com sucesso!')
    
  }

  return (
    <form onSubmit={createNewHabit} className={styles.form}>
      <label className={styles.label} htmlFor="title">
        Qual seu comprometimento?
      </label>
      <input
        className={styles.input}
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir bem, etc."
        autoFocus
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
       
      <label className={styles.label}>
        Qual a recorrencia?
      </label>

      {availableWeekDays.map((weekDay, index) => {
        return (
          <CheckBox
            checked={weekDays.includes(index)}
            onCheckedChange={() => habdleToggleWeekDay(index)}
            key={weekDay}
            _checkboxStyle={["group-data-[state=checked]:bg-green-500/80 transition-colors"]}
            _text={weekDay}
            _textStyle={["!text-[0.95rem] text-zinc-500 group-data-[state=checked]:!text-zinc-200 transition-colors"]}
          />
        );
      })}

      <button className={styles.button} type="submit">
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
