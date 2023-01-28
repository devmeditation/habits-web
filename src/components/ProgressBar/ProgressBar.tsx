import styles from "./progressBar.module.css";

interface ProgressBarProps {
  progress: number
}

export function ProgressBar({ progress }:ProgressBarProps) {
  const progressStyles = {
    width: `${progress}%`
  }
  return (
    <div className={styles.progressbar}>
      <div
        role={"progressbar"}
        aria-label="Progresso de hábitos completados nesse dia"
        aria-valuenow={progress}
        style={progressStyles}
      />
    </div>
  );
}
