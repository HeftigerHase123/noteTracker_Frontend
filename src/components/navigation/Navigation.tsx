"use client";
import { useEffect, useState } from "react";
import BurgerButton from "./BurgerButton";
import Overlay from "./Overlay";
import Sidebar from "./Sidebar";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <BurgerButton isOpen={isOpen} onClick={() => setIsOpen(true)} />
      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}