import { ArrowRight, Sparkles, Film, Quote, Camera, Star, Tv } from "lucide-react";
import { Routes, Route, Link, useParams, useLocation } from "react-router-dom";
import { films } from "./data/films";
import { interviewEras } from "./data/interviews";
import { gallery } from "./data/gallery";
import { snlSeasons } from "./data/snl";

function NavLinkItem({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <Link
      to={to}
      className={`transition ${
        isActive ? "text-[#6faef2] underline underline-offset-8" : "hover:text-[#6faef2]"
      }`}
    >
      {children}
    </Link>
  );
}

function ScribbleTop() {
  return (
    <svg
      className="absolute left-[36%] top-20 opacity-70"
      width="230"
      height="120"
      viewBox="0 0 230 120"
      fill="none"
    >
      <path d="M18 92 C 70 54, 126 18, 214 8" stroke="#9cc9ff" strokeWidth="5" strokeLinecap="round" />
      <path d="M68 104 C 110 66, 148 44, 214 24" stroke="#9cc9ff" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function ScribbleBottom() {
  return (
    <svg
      className="absolute right-6 bottom-[-16px] opacity-60"
      width="210"
      height="120"
      viewBox="0 0 210 120"
      fill="none"
    >
      <path d="M10 34 C 76 20, 136 66, 196 108" stroke="#9cc9ff" strokeWidth="5" strokeLinecap="round" />
      <path d="M32 18 C 102 10, 148 54, 204 92" stroke="#9cc9ff" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function Starburst({ className = "" }) {
  return (
    <svg className={className} width="78" height="78" viewBox="0 0 78 78" fill="none">
      <path d="M39 4V74M4 39H74M13 13L65 65M65 13L13 65" stroke="#9cc9ff" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#f6d97a] text-[#3b2a1a]">
      <header className="px-10 py-7">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="text-[22px] font-semibold tracking-[0.14em]">
            RYAN GOSLING ARCHIVE
          </Link>

          <nav className="group relative flex gap-8 text-[17px]">
            <NavLinkItem to="/">Home</NavLinkItem>
            <NavLinkItem to="/filmography">Filmography</NavLinkItem>
            <NavLinkItem to="/interviews">Interviews</NavLinkItem>
            <NavLinkItem to="/gallery">Gallery</NavLinkItem>

            <div className="pointer-events-none absolute right-0 top-8 z-30 w-72 translate-y-2 rounded-[1.25rem] bg-[#f8e6a2] p-3 opacity-0 shadow-[0_16px_30px_rgba(59,42,26,0.16)] transition group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
              <p className="px-3 pb-2 text-[13px] uppercase tracking-[0.1em] text-[#6b5948]">More archive sections</p>
              <NavLinkItem to="/saturday-night-live">Saturday Night Live</NavLinkItem>
            </div>
          </nav>
        </div>
      </header>

      {children}

      <footer className="mx-auto mt-8 max-w-7xl border-t border-[#3b2a1a]/20 px-10 py-10 text-center text-[15px] text-[#5b4a37]">
        This is an unofficial fan site and is not affiliated with Ryan Gosling or any official representatives.
      </footer>
    </div>
  );
}

function SectionHeader({ icon, title, linkTo, linkText }) {
  return (
    <div className="mb-7 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="text-[38px] font-bold uppercase tracking-[-0.03em]">{title}</h3>
      </div>

      <Link to={linkTo} className="flex items-center gap-2 text-[18px] text-[#6faef2] hover:underline">
        {linkText} <ArrowRight size={18} />
      </Link>
    </div>
  );
}

function FilmCard({ film }) {
  return (
    <Link
      to={`/filmography/${film.slug}`}
      className="overflow-hidden rounded-[1.25rem] bg-[#f8e6a2] shadow-[0_10px_22px_rgba(59,42,26,0.08)] transition hover:-translate-y-1"
    >
      <img src={film.img} alt={film.title} className="h-52 w-full object-cover" />
      <div className="p-4">
        <p className="text-[15px] text-[#6b5948]">{film.year}</p>
        <h4 className="mt-1 text-[24px] font-bold uppercase leading-tight">{film.title}</h4>
        <p className="mt-2 text-[17px] text-[#6b5948]">{film.role}</p>
      </div>
    </Link>
  );
}

function EraCard({ era }) {
  return (
    <Link
      to={`/interviews/${era.slug}`}
      className="rounded-[1.5rem] bg-[#f8e6a2] p-7 shadow-[0_10px_22px_rgba(59,42,26,0.08)] transition hover:-translate-y-1"
    >
      <p className="text-[15px] uppercase tracking-[0.08em] text-[#6faef2]">{era.year}</p>
      <h3 className="mt-2 text-[28px] font-bold leading-tight">{era.era}</h3>
      <p className="mt-3 text-[18px] leading-[1.6] text-[#5a4631]">{era.description}</p>
    </Link>
  );
}

function InterviewItemCard({ eraSlug, item }) {
  return (
    <Link
      to={`/interviews/${eraSlug}/${item.slug}`}
      className="overflow-hidden rounded-[1.5rem] bg-[#f8e6a2] shadow-[0_10px_22px_rgba(59,42,26,0.08)] transition hover:-translate-y-1"
    >
      <img src={item.image} alt={item.title} className="h-52 w-full object-cover" />
      <div className="p-6">
        <p className="text-[15px] text-[#6b5948]">
          {item.outlet} · {item.date}
        </p>
        <h4 className="mt-2 text-[26px] font-bold leading-tight">{item.title}</h4>
        <p className="mt-4 text-[20px] leading-[1.5] text-[#5a4631]">“{item.quote}”</p>
      </div>
    </Link>
  );
}

function GalleryCard({ item }) {
  return (
    <Link to={`/gallery/${item.slug}`} className="group block transition hover:-translate-y-1">
      <img
        src={item.img}
        alt={item.title}
        className="h-48 w-full rounded-[1.1rem] object-cover shadow-[0_10px_22px_rgba(59,42,26,0.08)]"
      />
      <div className="mt-3 flex items-center justify-between gap-3">
        <h4 className="text-[17px] font-bold leading-tight group-hover:text-[#6faef2]">{item.title}</h4>
        <span className="rounded-full bg-[#f8e6a2] px-3 py-1 text-[13px] text-[#6b5948]">{item.date}</span>
      </div>
    </Link>
  );
}

function HomePage() {
  return (
    <Layout>
      <section id="home" className="relative mx-auto max-w-7xl px-10 pb-12 pt-6">
        <ScribbleTop />
        <Starburst className="absolute left-[-4px] top-[260px] opacity-75" />
        <Starburst className="absolute right-8 top-[150px] scale-75 opacity-75" />

        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.95fr]">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 text-[16px] font-medium uppercase tracking-[0.08em] text-[#6faef2]">
              <Sparkles size={16} />
              Unofficial Fan Archive
            </div>

            <h2 className="max-w-xl text-[88px] font-bold uppercase leading-[0.9] tracking-[-0.04em]">
              100 reasons
              <br />
              to love
              <br />
              Ryan Gosling
            </h2>

            <div className="mt-7 h-[4px] w-40 rounded-full bg-[#6faef2]" />

            <p className="mt-8 max-w-xl text-[30px] leading-[1.18]">
              Ryan Gosling centered collection of films, interviews and images.
            </p>
          </div>

          <div className="relative z-10">
            <div className="relative mx-auto w-full max-w-[520px]">
              <div className="absolute -left-5 -top-5 h-full w-full rounded-[3rem] border-2 border-[#3b2a1a]/15" />

              <div className="rounded-[3rem] bg-[#9cc9ff] p-5 shadow-[0_20px_40px_rgba(59,42,26,0.12)]">
                <div className="overflow-hidden rounded-[2.5rem]">
                  <img
                    src="/image/hothothot.JPG"
                    alt="Ryan Gosling inspired hero"
                    className="h-[620px] w-full object-cover"
                  />
                </div>
              </div>

              <div className="absolute -bottom-6 right-[-20px] rounded-full bg-[#fff1b5] px-5 py-3 text-[14px] font-medium shadow-[0_10px_20px_rgba(59,42,26,0.08)]">
                He is so fucking hot
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-10 pb-12 pt-4">
        <SectionHeader icon={<Film className="text-[#6faef2]" />} title="Filmography" linkTo="/filmography" linkText="View all films" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {films.map((film) => (
            <FilmCard key={film.slug} film={film} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-10 pb-12 pt-8">
        <SectionHeader
          icon={<Quote className="text-[#6faef2]" />}
          title="Interviews"
          linkTo="/interviews"
          linkText="View all interviews"
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {interviewEras.map((era) => (
            <EraCard key={era.slug} era={era} />
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-10 pb-16 pt-8">
        <ScribbleBottom />
        <Starburst className="absolute left-[-10px] bottom-4 opacity-75" />

        <SectionHeader icon={<Camera className="text-[#6faef2]" />} title="Gallery" linkTo="/gallery" linkText="View full gallery" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {gallery.map((item) => (
            <GalleryCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

function FilmographyPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-10 pb-16 pt-4">
        <h2 className="mb-8 text-[54px] font-bold uppercase">Filmography</h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {films.map((film) => (
            <FilmCard key={film.slug} film={film} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

function FilmDetailPage() {
  const { slug } = useParams();
  const film = films.find((f) => f.slug === slug);

  if (!film) {
    return (
      <Layout>
        <section className="mx-auto max-w-7xl px-10 py-20">
          <p className="text-[22px]">Film not found.</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-10 pb-16 pt-4">
        <Link to="/filmography" className="text-[#6faef2] hover:underline">
          ← Back to Filmography
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <img src={film.img} alt={film.title} className="w-full rounded-[2rem] object-cover shadow-[0_10px_22px_rgba(59,42,26,0.08)]" />

          <div>
            <p className="text-[16px] text-[#6b5948]">{film.year}</p>
            <h2 className="mt-2 text-[64px] font-bold uppercase leading-none">{film.title}</h2>
            <p className="mt-4 text-[24px] text-[#6faef2]">{film.role}</p>
            <p className="mt-8 max-w-2xl text-[22px] leading-[1.5]">{film.note}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function InterviewsPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-10 pb-16 pt-4">
        <h2 className="mb-4 text-[54px] font-bold uppercase">Interviews</h2>
        <p className="mb-12 max-w-3xl text-[22px] leading-[1.6] text-[#5a4631]">
          Interviews are organised by film era, so that each group reflects a distinct phase in Ryan Gosling’s screen image, publicity, and performance style.
        </p>

        <div className="space-y-16">
          {interviewEras.map((era) => (
            <section key={era.slug}>
              <div className="mb-6 flex items-end justify-between gap-6">
                <div>
                  <p className="text-[16px] uppercase tracking-[0.08em] text-[#6faef2]">{era.year}</p>
                  <h3 className="text-[38px] font-bold uppercase tracking-[-0.03em]">{era.era}</h3>
                  <p className="mt-3 max-w-3xl text-[18px] leading-[1.6] text-[#5a4631]">{era.description}</p>
                </div>

                <Link to={`/interviews/${era.slug}`} className="shrink-0 text-[18px] text-[#6faef2] hover:underline">
                  View era
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {era.items.map((item) => (
                  <InterviewItemCard key={item.slug} eraSlug={era.slug} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </Layout>
  );
}

function InterviewEraPage() {
  const { eraSlug } = useParams();
  const era = interviewEras.find((e) => e.slug === eraSlug);

  if (!era) {
    return (
      <Layout>
        <section className="mx-auto max-w-7xl px-10 py-20">
          <p className="text-[22px]">Interview era not found.</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-10 pb-16 pt-4">
        <Link to="/interviews" className="text-[#6faef2] hover:underline">
          ← Back to Interviews
        </Link>

        <div className="mt-8">
          <p className="text-[16px] uppercase tracking-[0.08em] text-[#6faef2]">
            {era.year} · {era.film}
          </p>
          <h2 className="mt-2 text-[54px] font-bold uppercase">{era.era}</h2>
          <p className="mt-6 max-w-3xl text-[22px] leading-[1.6] text-[#5a4631]">
            {era.description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {era.items.map((item) => (
            <InterviewItemCard key={item.slug} eraSlug={era.slug} item={item} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

function InterviewDetailPage() {
  const { eraSlug, interviewSlug } = useParams();
  const era = interviewEras.find((e) => e.slug === eraSlug);
  const interview = era?.items.find((item) => item.slug === interviewSlug);

  if (!era || !interview) {
    return (
      <Layout>
        <section className="mx-auto max-w-7xl px-10 py-20">
          <p className="text-[22px]">Interview not found.</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-10 pb-16 pt-4">
        <Link to={`/interviews/${era.slug}`} className="text-[#6faef2] hover:underline">
          ← Back to {era.era}
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <img
            src={interview.image}
            alt={interview.title}
            className="w-full rounded-[2rem] object-cover shadow-[0_10px_22px_rgba(59,42,26,0.08)]"
          />

          <div className="rounded-[2rem] bg-[#f8e6a2] p-8 shadow-[0_10px_22px_rgba(59,42,26,0.08)]">
            <p className="text-[15px] uppercase tracking-[0.08em] text-[#6faef2]">{era.era}</p>
            <h2 className="mt-2 text-[44px] font-bold leading-tight">{interview.title}</h2>
            <p className="mt-3 text-[18px] text-[#6b5948]">
              {interview.outlet} · {interview.date}
            </p>

            <p className="mt-8 text-[28px] leading-[1.5] text-[#5a4631]">“{interview.quote}”</p>

            <p className="mt-8 text-[20px] leading-[1.7] text-[#5a4631]">{interview.summary}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function SnlSeasonCard({ season }) {
  return (
    <Link
      to={`/saturday-night-live/${season.slug}`}
      className="rounded-[1.5rem] bg-[#f8e6a2] p-7 shadow-[0_10px_22px_rgba(59,42,26,0.08)] transition hover:-translate-y-1"
    >
      <p className="text-[15px] uppercase tracking-[0.08em] text-[#6faef2]">{season.year}</p>
      <h3 className="mt-2 text-[32px] font-bold uppercase leading-tight">{season.season}</h3>
      <p className="mt-3 text-[18px] leading-[1.6] text-[#5a4631]">{season.description}</p>
      <p className="mt-5 text-[16px] text-[#6b5948]">{season.episodes.length} episodes</p>
    </Link>
  );
}

function SnlEpisodeCard({ seasonSlug, episode }) {
  return (
    <Link
      to={`/saturday-night-live/${seasonSlug}/${episode.slug}`}
      className="overflow-hidden rounded-[1.5rem] bg-[#f8e6a2] shadow-[0_10px_22px_rgba(59,42,26,0.08)] transition hover:-translate-y-1"
    >
      <img src={episode.image} alt={episode.title} className="h-52 w-full object-cover" />
      <div className="p-6">
        <p className="text-[15px] text-[#6b5948]">{episode.episode} · {episode.date}</p>
        <h4 className="mt-2 text-[26px] font-bold leading-tight">{episode.title}</h4>
        <p className="mt-3 text-[17px] text-[#5a4631]">Host: {episode.host}</p>
      </div>
    </Link>
  );
}

function SaturdayNightLivePage() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-10 pb-16 pt-4">
        <div className="mb-10 flex items-center gap-3">
          <Tv className="text-[#6faef2]" />
          <h2 className="text-[54px] font-bold uppercase">Saturday Night Live</h2>
        </div>
        <p className="mb-12 max-w-3xl text-[22px] leading-[1.6] text-[#5a4631]">
          This section is organised by season first, then by individual episode, so you can keep sketches, clips, image references, and notes in a clear archive structure.
        </p>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {snlSeasons.map((season) => (
            <SnlSeasonCard key={season.slug} season={season} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

function SnlSeasonPage() {
  const { seasonSlug } = useParams();
  const season = snlSeasons.find((item) => item.slug === seasonSlug);

  if (!season) {
    return (
      <Layout>
        <section className="mx-auto max-w-7xl px-10 py-20">
          <p className="text-[22px]">SNL season not found.</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-10 pb-16 pt-4">
        <Link to="/saturday-night-live" className="text-[#6faef2] hover:underline">
          ← Back to Saturday Night Live
        </Link>
        <div className="mt-8">
          <p className="text-[16px] uppercase tracking-[0.08em] text-[#6faef2]">{season.year}</p>
          <h2 className="mt-2 text-[54px] font-bold uppercase">{season.season}</h2>
          <p className="mt-6 max-w-3xl text-[22px] leading-[1.6] text-[#5a4631]">{season.description}</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {season.episodes.map((episode) => (
            <SnlEpisodeCard key={episode.slug} seasonSlug={season.slug} episode={episode} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

function SnlEpisodePage() {
  const { seasonSlug, episodeSlug } = useParams();
  const season = snlSeasons.find((item) => item.slug === seasonSlug);
  const episode = season?.episodes.find((item) => item.slug === episodeSlug);

  if (!season || !episode) {
    return (
      <Layout>
        <section className="mx-auto max-w-7xl px-10 py-20">
          <p className="text-[22px]">SNL episode not found.</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-10 pb-16 pt-4">
        <Link to={`/saturday-night-live/${season.slug}`} className="text-[#6faef2] hover:underline">
          ← Back to {season.season}
        </Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <img src={episode.image} alt={episode.title} className="w-full rounded-[2rem] object-cover shadow-[0_10px_22px_rgba(59,42,26,0.08)]" />
          <div className="rounded-[2rem] bg-[#f8e6a2] p-8 shadow-[0_10px_22px_rgba(59,42,26,0.08)]">
            <p className="text-[15px] uppercase tracking-[0.08em] text-[#6faef2]">{season.season} · {episode.episode}</p>
            <h2 className="mt-2 text-[44px] font-bold leading-tight">{episode.title}</h2>
            <p className="mt-3 text-[18px] text-[#6b5948]">{episode.date}</p>
            <div className="mt-8 space-y-2 text-[20px] text-[#5a4631]">
              <p><span className="font-bold">Host:</span> {episode.host}</p>
              <p><span className="font-bold">Musical guest:</span> {episode.musicalGuest}</p>
            </div>
            <p className="mt-8 text-[20px] leading-[1.7] text-[#5a4631]">{episode.summary}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function GalleryPage() {
  const { year = "all" } = useParams();
  const availableYears = [...new Set(gallery.map((item) => item.year))].sort((a, b) => b.localeCompare(a));
  const filteredGallery = year === "all" ? gallery : gallery.filter((item) => item.year === year);

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-10 pb-16 pt-4">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="text-[54px] font-bold uppercase">Gallery</h2>
            <p className="mt-3 text-[20px] text-[#5a4631]">Browse archive images by time period.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to="/gallery"
              className={`rounded-full px-4 py-2 text-[15px] transition ${year === "all" ? "bg-[#6faef2] text-white" : "bg-[#f8e6a2] hover:bg-[#9cc9ff]"}`}
            >
              All
            </Link>
            {availableYears.map((galleryYear) => (
              <Link
                key={galleryYear}
                to={`/gallery/year/${galleryYear}`}
                className={`rounded-full px-4 py-2 text-[15px] transition ${year === galleryYear ? "bg-[#6faef2] text-white" : "bg-[#f8e6a2] hover:bg-[#9cc9ff]"}`}
              >
                {galleryYear}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-5">
          {filteredGallery.map((item) => (
            <GalleryCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

function GalleryDetailPage() {
  const { slug } = useParams();
  const item = gallery.find((g) => g.slug === slug);

  if (!item) {
    return (
      <Layout>
        <section className="mx-auto max-w-7xl px-10 py-20">
          <p className="text-[22px]">Image not found.</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-10 pb-16 pt-4">
        <Link to="/gallery" className="text-[#6faef2] hover:underline">
          ← Back to Gallery
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <img src={item.img} alt={item.title} className="w-full rounded-[2rem] object-cover shadow-[0_10px_22px_rgba(59,42,26,0.08)]" />

          <div className="rounded-[2rem] bg-[#f8e6a2] p-8 shadow-[0_10px_22px_rgba(59,42,26,0.08)]">
            <p className="text-[16px] text-[#6b5948]">Gallery Entry · {item.date}</p>
            <h2 className="mt-2 text-[44px] font-bold leading-tight">{item.title}</h2>
            <p className="mt-8 text-[22px] leading-[1.6] text-[#5a4631]">{item.caption}</p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#9cc9ff] px-4 py-2 text-[14px] font-medium">
              <Star size={16} /> Archive image
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/filmography" element={<FilmographyPage />} />
      <Route path="/filmography/:slug" element={<FilmDetailPage />} />
      <Route path="/interviews" element={<InterviewsPage />} />
      <Route path="/interviews/:eraSlug" element={<InterviewEraPage />} />
      <Route path="/interviews/:eraSlug/:interviewSlug" element={<InterviewDetailPage />} />
      <Route path="/saturday-night-live" element={<SaturdayNightLivePage />} />
      <Route path="/saturday-night-live/:seasonSlug" element={<SnlSeasonPage />} />
      <Route path="/saturday-night-live/:seasonSlug/:episodeSlug" element={<SnlEpisodePage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/gallery/year/:year" element={<GalleryPage />} />
      <Route path="/gallery/:slug" element={<GalleryDetailPage />} />
    </Routes>
  );
}
