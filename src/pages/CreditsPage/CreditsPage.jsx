import "./CreditsPage.css";
import {
  FiExternalLink,
  FiCode,
  FiFilm,
  FiInfo,
  FiGithub,
} from "react-icons/fi";

const technologies = [
  { name: "React", url: "https://react.dev/" },
  { name: "TypeScript", url: "https://www.typescriptlang.org/" },
  { name: "Vite", url: "https://vite.dev/" },
  { name: "React Router", url: "https://reactrouter.com/" },
  { name: "TanStack Query", url: "https://tanstack.com/query" },
  { name: "Zod", url: "https://zod.dev/" },
  { name: "DOMPurify", url: "https://github.com/cure53/DOMPurify" },
  { name: "React Icons", url: "https://react-icons.github.io/react-icons/" },
  { name: "ESLint", url: "https://eslint.org/" },
];

function CreditsPage() {
  return (
    <main className="creditsPage">
      <header className="creditsHeader">
        <span className="creditsEyebrow">CINEVAULT</span>
        <h1>Credits & Sources</h1>
        <p>
          The data providers, technologies, and open-source
          libraries that help bring CineVault to life.
        </p>
      </header>

      <section className="creditsSection">
        <div className="creditsSectionTitle">
          <FiFilm />
          <h2>Data Providers</h2>
        </div>

        <div className="creditsProviders">
          <article className="creditsCard tmdbCard">
            <div className="creditsProviderHeader">
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noreferrer"
                className="creditsProviderLogo tmdbLogo"
                aria-label="Visit The Movie Database"
              >
                TMDB
              </a>
              <span className="creditsProviderType">
                Movies & TV Shows
              </span>
            </div>

            <h3>The Movie Database</h3>
            <p>
              Movie and television metadata, posters, descriptions,
              ratings, release dates, and trending information are
              provided by TMDB.
            </p>

            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noreferrer"
              className="creditsLink"
            >
              Visit TMDB <FiExternalLink />
            </a>
          </article>

          <article className="creditsCard anilistCard">
            <div className="creditsProviderHeader">
              <a
                href="https://anilist.co/"
                target="_blank"
                rel="noreferrer"
                className="creditsProviderLogo anilistLogo"
                aria-label="Visit AniList"
              >
                AL
              </a>
              <span className="creditsProviderType">Anime</span>
            </div>

            <h3>AniList</h3>
            <p>
              Anime titles, cover images, descriptions, formats,
              airing information, and related anime data are
              provided through the AniList API.
            </p>

            <a
              href="https://anilist.co/"
              target="_blank"
              rel="noreferrer"
              className="creditsLink"
            >
              Visit AniList <FiExternalLink />
            </a>

            <a
              href="https://docs.anilist.co/"
              target="_blank"
              rel="noreferrer"
              className="creditsLink"
            >
              API Documentation <FiExternalLink />
            </a>
          </article>
        </div>

        <p className="creditsNote">
          Content availability and metadata may vary depending on
          the source and its latest updates.
        </p>
      </section>

      <section className="creditsSection">
        <div className="creditsSectionTitle">
          <FiCode />
          <h2>Built With</h2>
        </div>

        <div className="creditsTechList">
          {technologies.map((technology) => (
            <a
              key={technology.name}
              href={technology.url}
              target="_blank"
              rel="noreferrer"
            >
              {technology.name}
              <FiExternalLink />
            </a>
          ))}
        </div>

        <p className="creditsTechDescription">
          CineVault is built with React and TypeScript, powered by
          Vite, and supported by open-source libraries for routing,
          data fetching, validation, and interface development.
        </p>
      </section>

      <section className="creditsSection">
        <div className="creditsSectionTitle">
          <FiGithub />
          <h2>About the Project</h2>
        </div>

        <div className="creditsDisclaimer">
          <p>
            CineVault is an independent project that brings movies,
            TV shows, and anime together in one place.
          </p>
          <p>
            It is built as a frontend development project using
            modern web technologies and third-party data APIs.
          </p>
        </div>
      </section>

      <section className="creditsDisclaimer">
        <div className="creditsSectionTitle">
          <FiInfo />
          <h2>Disclaimer</h2>
        </div>

        <p>
          CineVault is an independent project and is not affiliated
          with or endorsed by TMDB or AniList.
        </p>

        <p>
          This product uses TMDB and the TMDB APIs but is not
          endorsed, certified, or otherwise approved by TMDB.
        </p>
      </section>

    </main>
  );
}

export default CreditsPage;
