"use client";

import EditButton from "@/components/Buttons/editButton/EditButton";
import styles from "./page.module.css";
import ExportButton from "@/components/Buttons/exportButton/ExportButton";
import EditScheduleModal from "@/components/EditScheduleModal/EditScheduleModal";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { SubjectDTO } from "@/models/subject/SubjectDTO";
import { SubjectService } from "@/services/SubjectService";
import { useEffect } from "react";
import { createSession, verifySession } from "@/lib/sessionLogic";
import SubjectContainer from "@/components/SubjectContainer/SubjectContainer";
import DeleteButton from "@/components/Buttons/deleteButton/DeleteButton";
import SaveButton from "@/components/Buttons/saveButton/SaveButton";
import { AuthService } from "@/services/AuthService";
import { Weekday } from "@/models/subject_user/WeekdayEnum";
import { UserDtoResponse } from "@/models/user/UserDtoResponse";
import { JwtDtoResponse } from "@/models/auth/JwtDto";
import { Session } from "@/models/auth/Session";
import { UserService } from "@/services/UserService";
import { SubjectUserDTO } from "@/models/subject_user/SubjectUserDTO";
import { SubjectUserService } from "@/services/SubjectUserService";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const weekdayMapping: Record<string, Weekday> = {
  Monday: Weekday.MO,
  Tuesday: Weekday.TU,
  Wednesday: Weekday.WE,
  Thursday: Weekday.TH,
  Friday: Weekday.FR,
};

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

const getStartTime = (timeSlot: string): string => {
  return `${timeSlot.split(" - ")[0]}:00`;
};

const createTimeTable = (
  data: SubjectUserDTO[],
  weekdayIndex: number,
): Record<string, number> => {
  const currentDay = weekdayMapping[days[weekdayIndex]];

  const newTimeTable: Record<string, number> = {};

  data
    .filter((entry) => entry.weekday === currentDay)
    .forEach((entry) => {
      const timeSlot = timeSlots.find(
        (time) => getStartTime(time) === entry.time,
      );

      if (timeSlot) {
        newTimeTable[timeSlot] = entry.subjectId;
      }
    });

  return newTimeTable;
};

export default function ClassSchedulePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjects, setSubjects] = useState<SubjectDTO[]>([]);
  const [timeTable, setTimeTable] = useState<Record<string, number>>({});
  const [countWeekdayIndex, setCountWeekdayIndex] = useState<number>(0);
  const [user, setUser] = useState<UserDtoResponse>();
  const [session, setSession] = useState<Session>();
  const [tableData, setTableData] = useState<SubjectUserDTO[]>();
  const [width, setWidth] = useState(0);

  const tdRef = useRef<HTMLTableCellElement>(null);

  const fetchData = async () => {
    const jwt = await AuthService.authenticate({
      username: "admin",
      password: "wert1234wert1234",
    });
    await createSession(jwt.accessToken);
    const subjectList = await SubjectService.getAll();
    setSubjects(subjectList);

    const session = await verifySession();
    if (!session) return;
    setSession(session);

    const user = await UserService.getById(session.user.id);
    setUser(user);

    const tableData = await SubjectUserService.getByUserId(user.id);
    setTableData(tableData);
    setTimeTable(createTimeTable(tableData, 0));

    console.log(tableData);
  };

  useEffect(() => {
    const async = async () => {
      await fetchData();
    };

    async();

    if (!tdRef.current) return;

    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });

    observer.observe(tdRef.current);

    return () => observer.disconnect();
  }, []);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, time: string) => {
    e.preventDefault();

    const subjectId = Number(e.dataTransfer.getData("subjectId"));
    setTimeTable((prev) => ({
      ...prev,
      [time]: subjectId,
    }));
  };

  const handleDeleteDrop = (time: string) => {
    setTimeTable((prev) => {
      const updated = { ...prev };
      delete updated[time];
      return updated;
    });
  };

  const saveChanges = () => {
    console.log("SAVE CHANGES");
  };

  const changeIndexCount = (value: number) => {
    const maxRange = days.length - 1;

    let newIndex: number;

    if (countWeekdayIndex === 0 && value === -1) {
        newIndex = maxRange;
    } else if (countWeekdayIndex === maxRange && value === 1) {
        newIndex = 0;
    } else {
        newIndex = countWeekdayIndex + value;
    }

    setCountWeekdayIndex(newIndex);

    if (tableData) {
        setTimeTable(createTimeTable(tableData, newIndex));
    }
};

  return (
    <div className={styles.page}>
      <div className={styles.headline}>
        <div>
          <h1>Class Schedule</h1>
        </div>
        <div className={styles.buttons}>
          <EditButton onClick={() => setIsModalOpen(true)} />
          {/*<ExportButton />*/}
        </div>
      </div>

      <div className={styles.table}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>

              {days.map((day) => (
                <th key={day} className={styles[day]}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {timeSlots.map((time) => (
              <tr key={time}>
                <th>{time}</th>

                {days.map((day) => {
                  const weekday = weekdayMapping[day];
                  const dbTime = getStartTime(time);

                  const entry = tableData?.find(
                    (entry) =>
                      entry.weekday === weekday && entry.time === dbTime,
                  );

                  const subject = subjects.find(
                    (subject) => subject.id === entry?.subjectId,
                  );

                  if (!subject) return <td key={`${day}-${time}`}></td>;
                  return (
                    <td key={`${day}-${time}`} ref={tdRef}>
                      {entry && (
                        <SubjectContainer
                          maxWidth={width}
                          draggable={false}
                          subject={subject}
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className={styles.modalTop}>
          <button
            className={styles.arrowButton}
            onClick={() => changeIndexCount(-1)}
          >
            <Image
              src={"/assets/icons/arrow-left-blue.png"}
              alt="arrow left"
              width={64}
              height={64}
            ></Image>
          </button>
          <div className={styles.weekdayContainer}>
            <p>{days[countWeekdayIndex]}</p>
          </div>
          <button
            className={styles.arrowButton}
            onClick={() => changeIndexCount(1)}
          >
            <Image
              src={"/assets/icons/arrow-left-blue.png"}
              alt="arrow left"
              width={64}
              height={64}
              className={styles.rotatedImage}
            ></Image>
          </button>
        </div>
        <div className={styles.modalBottom}>
          <div className={styles.modalBottomLeft}>
            <div className={styles.head}>
              <h2>Subjects</h2>
            </div>
            <div className={styles.subjectList}>
              {subjects.map((subject, i) => (
                <SubjectContainer maxWidth={320} key={i} subject={subject} />
              ))}
              {subjects.length === 0 && (
                <p> Subjects konnten nicht geladen werden. </p>
              )}
            </div>
          </div>
          <div className={styles.modalBottomMiddle}>
            {timeSlots.map((time, i) => (
              <div key={i} className={styles.dropContainer}>
                <div className={styles.time}>
                  <p>{time}</p>
                </div>
                <div
                  className={styles.dropCell}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, time)}
                >
                  {timeTable[time] &&
                    (() => {
                      const subject = subjects.find(
                        (subject) => subject.id === timeTable[time],
                      );

                      if (!subject) {
                        return null;
                      }

                      return (
                        <div className={styles.dropCellContent}>
                          <SubjectContainer maxWidth={300} subject={subject} />
                          <DeleteButton
                            onClick={() => handleDeleteDrop(time)}
                          />
                        </div>
                      );
                    })()}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.modalBottomRight}>
            <SaveButton onClick={() => saveChanges()} />
          </div>
        </div>
      </EditScheduleModal>
    </div>
  );
}
