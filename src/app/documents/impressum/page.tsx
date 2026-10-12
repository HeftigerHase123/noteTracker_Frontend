import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Impressum – NoteTracker",
  description: "Rechtliche Angaben zu NoteTracker.",
};

const sections = [
  { id: "betreiber", title: "Angaben zum Betreiber" },
  { id: "kontakt", title: "Kontakt" },
  { id: "verantwortlich", title: "Verantwortlich für den Inhalt" },
  { id: "haftung-inhalte", title: "Haftung für Inhalte" },
  { id: "haftung-links", title: "Haftung für Links" },
  { id: "urheberrecht", title: "Urheberrecht" },
  { id: "datenschutz", title: "Datenschutz" },
];

/* Platzhalter sind farbig hinterlegt, damit man sie beim Ausfüllen nicht übersieht */
function Placeholder({ children }: { children: React.ReactNode }) {
  return <span className={styles.placeholder}>{children}</span>;
}

export default function ImpressumPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <h1>Impressum</h1>
          <p>Rechtliche Angaben zu NoteTracker</p>
        </div>
      </header>

      <div className={styles.layout}>
        <nav className={styles.toc} aria-label="Inhalt dieser Seite">
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.title}</a>
              </li>
            ))}
          </ul>
        </nav>

        <article className={styles.content}>
          <section id="betreiber" className={styles.section}>
            <h2>Angaben zum Betreiber</h2>
            <dl>
              <dt>Name</dt>
              <dd>
                <Placeholder>Vorname Nachname</Placeholder>
              </dd>
              <dt>Projekt</dt>
              <dd>NoteTracker</dd>
              <dt>Adresse</dt>
              <dd>
                <Placeholder>Strasse Nr.</Placeholder>
                <br />
                <Placeholder>PLZ Ort</Placeholder>
                <br />
                <Placeholder>Land</Placeholder>
              </dd>
              <dt>Institution</dt>
              <dd>
                <Placeholder>Schule / Ausbildungsbetrieb (optional)</Placeholder>
              </dd>
            </dl>
          </section>

          <section id="kontakt" className={styles.section}>
            <h2>Kontakt</h2>
            <dl>
              <dt>E-Mail</dt>
              <dd>
                <Placeholder>name@beispiel.ch</Placeholder>
              </dd>
              <dt>Telefon</dt>
              <dd>
                <Placeholder>+41 00 000 00 00</Placeholder>
              </dd>
            </dl>
          </section>

          <section id="verantwortlich" className={styles.section}>
            <h2>Verantwortlich für den Inhalt</h2>
            <p>
              Verantwortlich für die Inhalte dieser Website ist{" "}
              <Placeholder>Vorname Nachname</Placeholder>,{" "}
              <Placeholder>Adresse wie oben</Placeholder>.
            </p>
          </section>

          <section id="haftung-inhalte" className={styles.section}>
            <h2>Haftung für Inhalte</h2>
            <p>
              Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
              kann jedoch keine Gewähr übernommen werden. Berechnungen wie
              Notendurchschnitte und Semesternoten sind Hilfsmittel und
              ersetzen keine offiziellen Zeugnisse oder Bewertungen der Schule.
            </p>
          </section>

          <section id="haftung-links" className={styles.section}>
            <h2>Haftung für Links</h2>
            <p>
              Diese Website kann Links zu externen Websites Dritter enthalten.
              Auf deren Inhalte haben wir keinen Einfluss. Für die Inhalte
              verlinkter Seiten ist stets der jeweilige Anbieter oder Betreiber
              verantwortlich.
            </p>
          </section>

          <section id="urheberrecht" className={styles.section}>
            <h2>Urheberrecht</h2>
            <p>
              Die auf dieser Website veröffentlichten Inhalte, Texte, Grafiken
              und Bilder unterliegen dem Urheberrecht von{" "}
              <Placeholder>Vorname Nachname</Placeholder>, soweit nicht anders
              angegeben. Eine Vervielfältigung oder Verwendung bedarf der
              vorherigen schriftlichen Zustimmung.
            </p>
          </section>

          <section id="datenschutz" className={styles.section}>
            <h2>Datenschutz</h2>
            <p>
              NoteTracker speichert Noten und Stundenplandaten, die du selbst
              einträgst. Informationen dazu, welche Daten erhoben, wie sie
              verwendet und wie lange sie gespeichert werden, findest du in der
              Datenschutzerklärung:{" "}
              <Placeholder>Link zur Datenschutzerklärung</Placeholder>.
            </p>
            <p>
              Bei Fragen zum Datenschutz erreichst du uns unter{" "}
              <Placeholder>datenschutz@beispiel.ch</Placeholder>.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
