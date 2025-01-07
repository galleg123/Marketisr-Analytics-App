import { useEffect, useState, useRef } from "react";
import styles from "./Timer.module.css";

function Timer({onComplete, reset, duration}) {
  const [timeLeft, setTimeLeft] = useState(duration);
    const intervalRef = useRef(null);

    const nextTime = () => {
        intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete?.();
    }
  }, [timeLeft])


    useEffect(() => {
        // Reset timer whenever reset or duration changes
        nextTime();
        setTimeLeft(duration)
        return () => clearInterval(intervalRef.current);
    }, [reset]);


  // Calculate percentage completion
  const progress = ((duration - timeLeft) / duration) * 100;
  const radius = 25.2756;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={styles.timer}>
      <svg width="58" height="58" viewBox="0 0 58 58">
        <circle
          className={styles.background}
          cx="28.9853"
          cy="28.537"
          r="25.2756"
          fill="none"
          stroke="#053CB2"
          strokeWidth="6.52274"
        />
        <circle
          className={styles.progress}
          cx="28.9853"
          cy="28.537"
          r="25.2756"
          fill="none"
          stroke="#0B0886"
          strokeWidth="6.52274"
          strokeDasharray={`${circumference} ${circumference}`} // Total length of the circle
          strokeDashoffset={`${circumference - (progress / 100)*circumference}`} // Adjust to show progress
        />
      </svg>
    </div>
  );
}

export default Timer;