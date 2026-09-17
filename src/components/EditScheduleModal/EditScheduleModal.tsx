"use client";

import styles from "./EditScheduleModal.module.css";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export default function EditScheduleModal({
    isOpen,
    onClose,
    children,
}: ModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Modal schliessen"
                >
                    ×
                </button>

                {children}
            </div>
        </div>
    );
}