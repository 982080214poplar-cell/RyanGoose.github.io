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
        isActive ? "text-[#3b2a1a] underline underline-offset-8" : "hover:text-[#3b2a1a]"
      }`}
    >
      {children}
    </Link>
  );
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#f6d97a] text-[#3b2a1a]">
      
      <header className="group relative z-40 bg-[#f6d97a] px-10 py-7">
        
        {/* 上半部分（固定高度） */}
        <div className="mx-auto flex max-w-7xl items-start justify-between gap-10">
          <Link
            to="/"
            className="text-[22px] font-semibold uppercase tracking-[0.14em] leading-[1.5]"
          >
            RYAN GOSLING
            <br />
            ARCHIVE
          </Link>

          <nav className="flex gap-8 text-[17px]">
            <NavLinkItem to="/">Home</NavLinkItem>
            <NavLinkItem to="/filmography">Filmography</NavLinkItem>
            <NavLinkItem to="/interviews">Interviews</NavLinkItem>
            <NavLinkItem to="/gallery">Gallery</NavLinkItem>
          </nav>
        </div>

        {/* 下半部分（延伸区域） */}
        <div
          className="
            mx-auto max-w-7xl
            overflow-hidden
            max-h-0
            transition-all duration-300 ease-in-out
            group-hover:max-h-40
          "
        >
          <div className="mt-6 border-t border-[#3b2a1a]/20 pt-5">
            
            <p className="mb-3 text-[12px] uppercase tracking-[0.16em] text-[#3b2a1a]/60">
              More archive sections
            </p>

            <Link
              to="/saturday-night-live"
              className="inline-block text-[18px] font-medium hover:underline"
            >
              Saturday Night Live
            </Link>

          </div>
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
    <Link to={`/gallery/${item.slug}`} className="transition hover:-translate-y-1">
      <img
        src={item.img}
        alt={item.title}
        className="h-48 w-full rounded-[1.1rem] object-cover shadow-[0_10px_22px_rgba(59,42,26,0.08)]"
      />
      <p className="mt-3 text-[14px] uppercase tracking-[0.08em] text-[#6faef2]">
        {item.date}
      </p>
      <h4 className="mt-1 text-[18px] font-bold">{item.title}</h4>
    </Link>
  );
}

function HomePage() {
  return (
    <Layout>
      <section className="relative mx-auto max-w-7xl px-10 pb-12 pt-6">
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
        <SectionHeader icon={<Quote className="text-[#6faef2]" />} title="Interviews" linkTo="/interviews" linkText="View all interviews" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {interviewEras.map((era) => (
            <EraCard key={era.slug} era={era} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-10 pb-16 pt-8">
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

function GalleryPage() {
  const { year } = useParams();

  const years = [...new Set(gallery.map((item) => item.year))].sort((a, b) => b.localeCompare(a));
  const filteredGallery = year ? gallery.filter((item) => item.year === year) : gallery;

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-10 pb-16 pt-4">
        <h2 className="mb-4 text-[54px] font-bold uppercase">Gallery</h2>
        <p className="mb-8 max-w-3xl text-[22px] leading-[1.6] text-[#5a4631]">
          Browse archive images by date, or filter the gallery by year.
        </p>

        <div className="mb-10 flex flex-wrap gap-3">
          <Link
            to="/gallery"
            className={`rounded-full px-5 py-2 text-[15px] font-medium ${
              !year ? "bg-[#9cc9ff]" : "bg-[#f8e6a2] hover:bg-[#9cc9ff]/70"
            }`}
          >
            All
          </Link>

          {years.map((galleryYear) => (
            <Link
              key={galleryYear}
              to={`/gallery/year/${galleryYear}`}
              className={`rounded-full px-5 py-2 text-[15px] font-medium ${
                year === galleryYear ? "bg-[#9cc9ff]" : "bg-[#f8e6a2] hover:bg-[#9cc9ff]/70"
              }`}
            >
              {galleryYear}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
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

function SNLPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-10 pb-16 pt-4">
        <div className="mb-8 flex items-center gap-3">
          <Tv className="text-[#6faef2]" />
          <h2 className="text-[54px] font-bold uppercase">Saturday Night Live</h2>
        </div>

        <p className="mb-12 max-w-3xl text-[22px] leading-[1.6] text-[#5a4631]">
          SNL archive entries are organised by season first, then divided into individual episodes.
        </p>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {snlSeasons.map((season) => (
            <Link
              key={season.slug}
              to={`/saturday-night-live/${season.slug}`}
              className="rounded-[1.5rem] bg-[#f8e6a2] p-7 shadow-[0_10px_22px_rgba(59,42,26,0.08)] transition hover:-translate-y-1"
            >
              <p className="text-[15px] uppercase tracking-[0.08em] text-[#6faef2]">{season.year}</p>
              <h3 className="mt-2 text-[32px] font-bold uppercase">{season.season}</h3>
              <p className="mt-4 text-[18px] leading-[1.6] text-[#5a4631]">{season.description}</p>
              <p className="mt-5 text-[16px] text-[#6b5948]">{season.episodes.length} episodes</p>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

function SNLSeasonPage() {
  const { seasonSlug } = useParams();
  const season = snlSeasons.find((s) => s.slug === seasonSlug);

  if (!season) {
    return (
      <Layout>
        <section className="mx-auto max-w-7xl px-10 py-20">
          <p className="text-[22px]">Season not found.</p>
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
          <p className="mt-6 max-w-3xl text-[22px] leading-[1.6] text-[#5a4631]">
            {season.description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {season.episodes.map((episode) => (
            <Link
              key={episode.slug}
              to={`/saturday-night-live/${season.slug}/${episode.slug}`}
              className="overflow-hidden rounded-[1.5rem] bg-[#f8e6a2] shadow-[0_10px_22px_rgba(59,42,26,0.08)] transition hover:-translate-y-1"
            >
              <img src={episode.image} alt={episode.title} className="h-52 w-full object-cover" />
              <div className="p-6">
                <p className="text-[15px] text-[#6b5948]">
                  {episode.episode} · {episode.date}
                </p>
                <h3 className="mt-2 text-[26px] font-bold leading-tight">{episode.title}</h3>
                <p className="mt-3 text-[17px] text-[#5a4631]">Host: {episode.host}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

function SNLEpisodePage() {
  const { seasonSlug, episodeSlug } = useParams();
  const season = snlSeasons.find((s) => s.slug === seasonSlug);
  const episode = season?.episodes.find((e) => e.slug === episodeSlug);

  if (!season || !episode) {
    return (
      <Layout>
        <section className="mx-auto max-w-7xl px-10 py-20">
          <p className="text-[22px]">Episode not found.</p>
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
          <img
            src={episode.image}
            alt={episode.title}
            className="w-full rounded-[2rem] object-cover shadow-[0_10px_22px_rgba(59,42,26,0.08)]"
          />

          <div className="rounded-[2rem] bg-[#f8e6a2] p-8 shadow-[0_10px_22px_rgba(59,42,26,0.08)]">
            <p className="text-[15px] uppercase tracking-[0.08em] text-[#6faef2]">
              {season.season} · {episode.episode}
            </p>
            <h2 className="mt-2 text-[44px] font-bold leading-tight">{episode.title}</h2>
            <p className="mt-3 text-[18px] text-[#6b5948]">{episode.date}</p>

            <div className="mt-8 space-y-2 text-[20px] leading-[1.6] text-[#5a4631]">
              <p>Host: {episode.host}</p>
              <p>Musical Guest: {episode.musicalGuest}</p>
            </div>

            <p className="mt-8 text-[20px] leading-[1.7] text-[#5a4631]">{episode.summary}</p>
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

      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/gallery/year/:year" element={<GalleryPage />} />
      <Route path="/gallery/:slug" element={<GalleryDetailPage />} />

      <Route path="/saturday-night-live" element={<SNLPage />} />
      <Route path="/saturday-night-live/:seasonSlug" element={<SNLSeasonPage />} />
      <Route path="/saturday-night-live/:seasonSlug/:episodeSlug" element={<SNLEpisodePage />} />
    </Routes>
  );
}