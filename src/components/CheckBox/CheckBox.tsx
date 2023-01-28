import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

import styles from "./checkbox.module.css";

type CheckedState = boolean | "indeterminate";

interface CheckBoxProps {
  date?: Date;
  _checkboxStyle?: string[];
  _text?: string;
  _textStyle?: string[];

  checked?: CheckedState;
  onCheckedChange?(checked: CheckedState): void;
}

interface Habits {
  id: string
  title: string
  created_at: string
}

interface HabitsInfo {
  possibleHabits: Habits[]
  completedHabits: string[]
}

export function CheckBox({
  date,
  _checkboxStyle,
  _text,
  _textStyle,
  checked,
  onCheckedChange,
}: CheckBoxProps) {
  // const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

  // if (date) {
  //   useEffect(() => {
  //     api.get("day", {
  //       params: {
  //         date: date.toISOString(),
  //       },
  //     }).then(response =>{
  //       setHabitsInfo(response.data)
  //     })
  //   }, []);
  // }

  return (
    <Checkbox.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={`${styles.checkboxContainer} group`}
    >
      <div className={`${styles.checkboxIndicator} ${_checkboxStyle} group-focus:ring-2 group-focus:ring-green-500/50 group-focus:bg-green-500/10`}>
        <Checkbox.Indicator >
          <Check size={20} color="white" />
        </Checkbox.Indicator>
      </div>
      <span className={`${styles.checkboxText} ${_textStyle}`}>{_text}</span>
    </Checkbox.Root>
  );
}
