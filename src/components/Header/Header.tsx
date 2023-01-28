import * as Dialog from '@radix-ui/react-dialog';
import { Plus, X } from "phosphor-react";
import logoSVG from "../../assets/logo.svg";

import styles from "./header.module.css"
import { NewHabitForm } from './NewHabitForm';

export function Header() {
  
  return (
    <header className={styles.header}>
      <img src={logoSVG} alt="" />

      <Dialog.Root>
      <Dialog.Trigger type="button" className={styles.button}>
        <Plus size={20} />
        Novo hábito
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <Dialog.Close className={styles.close}>
            <X size={24} />
          </Dialog.Close>
          
          <Dialog.Title className={styles.title}> Criar hábito</Dialog.Title>

          <NewHabitForm />
        </Dialog.Content>
      </Dialog.Portal>
      </Dialog.Root>

    </header>
  );
}
