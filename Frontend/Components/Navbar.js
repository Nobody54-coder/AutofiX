import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>AutoFixIDE</div>
      <div style={styles.links}>
        <Link href="/"><a style={styles.link}>Home</a></Link>
        <Link href="/editor"><a style={styles.link}>Editor</a></Link>
        <Link href="/projects"><a style={styles.link}>Projects</a></Link>
        <Link href="/auth"><a style={styles.link}>Auth</a></Link>
        <Link href="/deploy"><a style={styles.link}>Deploy</a></Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#333",
    padding: "10px 20px",
    color: "#fff",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
};
