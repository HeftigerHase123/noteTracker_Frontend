import EditButton from "@/components/Buttons/editButton/EditButton";
import styles from "./page.module.css";
import ExportButton from "@/components/Buttons/exportButton/ExportButton";

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
];

const timeSlots = [
    "07:30 - 08:15",
    "08:20 - 09:05",
    "09:10 - 09:55",
    "10:15 - 11:00",
    "11:05 - 11:50",
    "Mittagspause",
    "13:30 - 14:15",
    "14:20 - 15:05",
    "15:25 - 16:10",
    "16:15 - 17:00",
];

export default function ClassSchedulePage() {

  return(
    <div className={styles.page}>
      <div className={styles.headline}>
        <div>
          <h1>Class Schedule</h1>
        </div>
        <div className={styles.buttons}>
          <EditButton />
          <ExportButton />
        </div>
      </div>

      <div className={styles.table}>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th></th>

                    {days.map((day) => (
                        <th key={day} className={styles[day]}>{day}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {timeSlots.map((time) => (
                    <tr key={time}>
                        <th>{time}</th>

                        {days.map((day) => (
                            <td key={`${day}-${time}`}></td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}