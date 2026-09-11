import styles from "./Badget.module.css";

type props = {
  text: string;
  color: string;
}

  function getTextColor(color: string): string {
  const hex = color.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? "#000000" : "#ffffff";
}

export default function BadgetComponent(params: props) {

const textColor = getTextColor(params.color);


  return(
    <div className={styles.badget} style={
      {
        "--bg-color": params.color,
        "--font-color": textColor,
      } as React.CSSProperties
    }>
      <span>{params.text}</span>
    </div>
  );
}