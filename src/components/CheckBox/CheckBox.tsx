import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

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
  _checkboxStyle,
  _text,
  _textStyle,
  checked,
  onCheckedChange,
}: CheckBoxProps) {

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
