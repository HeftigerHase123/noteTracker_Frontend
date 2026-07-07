import Link from "next/link";

type Props = {
  onLinkClick: () => void;
};

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
];

export default function NavLinks({ onLinkClick }: Props) {
  return (
    <>
      {links.map((link) => (
        <Link key={link.href} href={link.href} onClick={onLinkClick}>
          {link.label}
        </Link>
      ))}
    </>
  );
}