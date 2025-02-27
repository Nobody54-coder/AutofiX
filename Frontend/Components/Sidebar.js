import Link from "next/link";

export default function Sidebar() {
  return (
    <aside style={styles.sidebar}>
      <h3>Projects</h3>
      <ul style={styles.ul}>
        <li><Link href="/projects/1"><a style={styles.link}>Project Alpha</a></Link></li>
        <li><Link href="/projects/2"><a style={styles.link}>Project Beta</a></Link></li>
      </ul>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "200px",
    background: "#222",
    color: "#fff",
    padding: "15px",
  },
  ul: {
    listStyle: "none",
    padding: 0,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
};
