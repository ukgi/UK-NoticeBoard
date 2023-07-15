import Page from "./page";

export default function ListLayout({ children }) {
  return (
    <section>
      <nav>리스트 네비게이션</nav>
      {children}
    </section>
  );
}
