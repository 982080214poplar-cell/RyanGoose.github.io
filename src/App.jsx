import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Sparkles, Film, Quote, Camera, Star, Tv, Menu, X } from "lucide-react";
import { Routes, Route, Link, useParams, useLocation } from "react-router-dom";
import { films } from "./data/films";
import { interviewEras } from "./data/interviews";
import gallery from "./data/gallery.json";
import { snlSeasons } from "./data/snl";
import { reasons } from "./data/reasons";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6d97a] text-[#3b2a1a]">
      <header className="group relative z-40 bg-[#f6d97a] px-6 py-6 md:px-10 md:py-7">
        <div className="mx-auto flex max-w-7xl items-start justify-between gap-10">
          <Link
            to="/"
            className="text-[20px] font-semibold uppercase leading-[1.5] tracking-[0.14em] md:text-[22px]"
          >
            RYAN GOSLING
            <br />
            ARCHIVE
          </Link>

          {/* Desktop nav */}
          <nav className="hidden gap-8 text-[17px] md:flex">
            <NavLinkItem to="/">Home</NavLinkItem>
            <NavLinkItem to="/filmography">Filmography</NavLinkItem>
            <NavLinkItem to="/interviews">Interviews</NavLinkItem>
            <NavLinkItem to="/gallery">Gallery</NavLinkItem>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-full bg-[#9cc9ff] p-3 shadow md:hidden"
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Desktop hover extension */}
        <div
          className="
            mx-auto hidden max-w-7xl
            overflow-hidden
            max-h-0
            transition-all duration-300 ease-in-out
            group-hover:max-h-40
            md:block
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

      {/* Mobile sidebar backdrop */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 z-50 bg-black/30 transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-[78%] max-w-[320px] bg-[#f6d97a] px-6 py-7 shadow-2xl transition-transform duration-300 md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-start justify-between">
          <Link
            to="/"
            onClick={() => setIsSidebarOpen(false)}
            className="text-[20px] font-semibold uppercase leading-[1.5] tracking-[0.14em]"
          >
            RYAN GOSLING
            <br />
            ARCHIVE
          </Link>

          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-full bg-[#9cc9ff] p-2"
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-5 text-[22px] font-medium">
          <Link to="/" onClick={() => setIsSidebarOpen(false)}>
            Home
          </Link>
          <Link to="/filmography" onClick={() => setIsSidebarOpen(false)}>
            Filmography
          </Link>
          <Link to="/interviews" onClick={() => setIsSidebarOpen(false)}>
            Interviews
          </Link>
          <Link to="/gallery" onClick={() => setIsSidebarOpen(false)}>
            Gallery
          </Link>

          <div className="my-3 border-t border-[#3b2a1a]/20" />

          <p className="text-[12px] uppercase tracking-[0.16em] text-[#3b2a1a]/60">
            More archive sections
          </p>

          <Link
            to="/saturday-night-live"
            onClick={() => setIsSidebarOpen(false)}
          >
            Saturday Night Live
          </Link>
        </nav>
      </aside>

      {children}

      <footer className="mx-auto mt-8 max-w-7xl border-t border-[#3b2a1a]/20 px-6 py-10 text-center text-[15px] text-[#5b4a37] md:px-10">
        This is an unofficial fan site and is not affiliated with Ryan Gosling or any official representatives.
      </footer>
    </div>
  );
}

function SectionHeader({ icon, title, linkTo, linkText }) {
  return (
    <div className="mb-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="text-[30px] font-bold uppercase md:text-[38px]">{title}</h3>
      </div>

      <Link
        to={linkTo}
        className="flex max-w-full shrink-0 items-center gap-2 rounded-full bg-[#9cc9ff] px-4 py-2 text-[14px] font-medium text-[#3b2a1a] shadow-[0_8px_18px_rgba(59,42,26,0.12)] transition hover:-translate-y-0.5 hover:bg-[#fff1b5] sm:text-[15px]"
      >
        {linkText} <ArrowRight size={18} />
      </Link>
    </div>
  );
}

function BackButton({ to, label }) {
  return (
    <Link
      to={to}
      aria-label={label}
      title={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#9cc9ff] text-[#3b2a1a] shadow-[0_8px_18px_rgba(59,42,26,0.12)] transition hover:-translate-y-0.5 hover:bg-[#fff1b5]"
    >
      <ArrowLeft size={22} strokeWidth={2.4} />
    </Link>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
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

function HeroImageDeck() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [hearts, setHearts] = useState([]);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);
  const deckRef = useRef(null);

  const cardWidth = 520;
  const cardPeek = 72;
  const activeCardLeft = 150;
  const rightStackLeft = activeCardLeft + cardWidth + cardPeek;
  const mainImage = "/image/hothothot.JPG";
  const deckImages = gallery.slice(0, 5);

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 1280);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleClick(event) {
    const rect = (deckRef.current ?? event.currentTarget).getBoundingClientRect();

    const newHeart = {
      id: crypto.randomUUID(),
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    setHearts((current) => [...current, newHeart]);

    setTimeout(() => {
      setHearts((current) =>
        current.filter((heart) => heart.id !== newHeart.id)
      );
    }, 1200);
  }

  const mainLeft = isDesktop ? (isOpen ? rightStackLeft + 18 : 500) : 40;

  function getCardLeft(index) {
    if (!isDesktop) return 40;

    if (!isOpen) return 520;

    if (activeCard === null) {
      return 230 + index * cardPeek;
    }

    if (index === activeCard) {
      return activeCardLeft;
    }

    if (index < activeCard) {
      const leftStackStart = activeCardLeft - activeCard * cardPeek;
      return leftStackStart + index * cardPeek;
    }

    return rightStackLeft + (index - activeCard - 1) * cardPeek;
  }

  function getCardWidth(index) {
    if (!isOpen) return cardWidth;
    if (activeCard === index) return cardWidth;
    return cardWidth;
  }

  function getCardZ(index) {
    // 关键：不要让 activeCard 自动跑到最上面
    // 保持后面的牌盖住前面的牌，才像真实叠牌
    return 30 + index;
  }

  function getHitboxLeft(index) {
    return getCardLeft(index);
  }

  function getHitboxWidth(index) {
    if (activeCard === index) return cardWidth;
    return cardPeek;
  }

  if (!isDesktop) {
    return (
      <div
        ref={deckRef}
        className="relative mx-auto mt-8 w-full max-w-[520px] cursor-pointer select-none overflow-visible"
      >
        <div
          onClick={handleClick}
          onDoubleClick={() => setIsOpen((current) => !current)}
          className="rounded-[2.5rem] bg-[#9cc9ff] p-4 shadow-[0_20px_40px_rgba(59,42,26,0.14)]"
        >
          <div className="overflow-hidden rounded-[2rem]">
            <img
              src={mainImage}
              alt="Ryan Gosling"
              className="h-[520px] w-full object-cover"
            />
          </div>
        </div>

        <div
          className={`mt-6 overflow-hidden transition-all duration-500 ${
            isOpen ? "max-h-[290px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex gap-4 overflow-x-auto pb-4">
            {deckImages.map((item) => (
              <div
                key={item.slug}
                tabIndex={0}
                onClick={handleClick}
                className="group relative shrink-0 rounded-[1.8rem] bg-[#9cc9ff] p-3 shadow-[0_12px_24px_rgba(59,42,26,0.12)] transition hover:-translate-y-1 focus:outline-none"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-[240px] w-[170px] rounded-[1.4rem] object-cover"
                />
                <Link
                  to={`/gallery/${item.slug}`}
                  onClick={(event) => event.stopPropagation()}
                  className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-[#9cc9ff] px-4 py-2 text-[13px] font-medium text-[#3b2a1a] opacity-0 shadow-[0_8px_18px_rgba(59,42,26,0.18)] transition duration-300 hover:bg-[#fff1b5] group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>

        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="pointer-events-none absolute z-[300] text-[34px] text-[#9cc9ff] animate-[heartFloat_1200ms_ease-out_forwards]"
            style={{ left: heart.x, top: heart.y }}
          >
            ♥
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="relative h-[650px] w-full max-w-[1160px] overflow-visible">
      <div
        ref={deckRef}
        className="absolute left-1/2 top-0 h-[700px] w-[1160px] origin-top -translate-x-[55%] cursor-pointer select-none"
      >
        {deckImages.map((item, index) => {
          const isActive = activeCard === index;

          return (
            <div
              key={item.slug}
              className="absolute top-[28px] h-[620px] rounded-[3rem] bg-[#9cc9ff] p-5 shadow-[0_18px_35px_rgba(59,42,26,0.14)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                left: `${getCardLeft(index)}px`,
                width: `${getCardWidth(index)}px`,
                opacity: isOpen ? 1 : 0,
                zIndex: getCardZ(index),
                pointerEvents: "none",
                transform: isActive ? "translateY(-6px)" : "translateY(0)",
              }}
            >
              <div className="h-full overflow-hidden rounded-[2.5rem]">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          );
        })}

        {isOpen &&
          deckImages.map((item, index) => (
            <button
              key={`hitbox-${item.slug}`}
              type="button"
              onClick={(event) => {
                handleClick(event);
                event.stopPropagation();
                setActiveCard((current) =>
                  current === index ? null : index
                );
              }}
              className="absolute top-[28px] h-[620px] rounded-[3rem] transition-transform duration-300 hover:-translate-y-2"
              style={{
                left: `${getHitboxLeft(index)}px`,
                width: `${getHitboxWidth(index)}px`,
                zIndex: 260 + index,
                background: "transparent",
              }}
              aria-label={`Open ${item.title}`}
            />
          ))}

        {isOpen && activeCard !== null && deckImages[activeCard] && (
          <div
            className="group absolute top-[28px] h-[620px] w-[520px] rounded-[3rem]"
            onClick={(event) => {
              handleClick(event);
              event.stopPropagation();
            }}
            style={{
              left: `${getCardLeft(activeCard)}px`,
              zIndex: 280,
            }}
          >
            <Link
              to={`/gallery/${deckImages[activeCard].slug}`}
              onClick={(event) => event.stopPropagation()}
              className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-[#9cc9ff] px-5 py-3 text-[14px] font-medium text-[#3b2a1a] opacity-0 shadow-[0_10px_22px_rgba(59,42,26,0.18)] transition duration-300 group-hover:pointer-events-auto group-hover:opacity-100 hover:-translate-y-0.5 hover:bg-[#fff1b5]"
            >
              View
            </Link>
          </div>
        )}

        <div
          className="absolute top-[28px] z-[180] h-[620px] w-[520px] rounded-[3rem] bg-[#9cc9ff] p-5 shadow-[0_20px_40px_rgba(59,42,26,0.14)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          onClick={handleClick}
          onDoubleClick={() => {
            setIsOpen((current) => !current);
            setActiveCard(null);
          }}
          style={{ left: `${mainLeft}px` }}
        >
          <div className="h-full overflow-hidden rounded-[2.5rem]">
            <img
              src={mainImage}
              alt="Ryan Gosling"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div
          className="pointer-events-none absolute top-0 h-[620px] rounded-[3rem] border-2 border-[#3b2a1a]/15 transition-all duration-700"
          style={{
            left: `${mainLeft - 20}px`,
            width: "560px",
          }}
        />

        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="pointer-events-none absolute z-[300] text-[34px] text-[#9cc9ff] animate-[heartFloat_1200ms_ease-out_forwards]"
            style={{ left: heart.x, top: heart.y }}
          >
            ♥
          </span>
        ))}

        <div className="absolute bottom-8 right-24 z-[300] rounded-full bg-[#fff1b5] px-5 py-3 text-[14px] shadow">
          Double click to open · click a card
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <Layout>
      <section className="relative mx-auto max-w-7xl px-6 pb-12 pt-6 md:px-10">
        <div className="grid grid-cols-1 items-center gap-12 xl:grid-cols-[1fr_0.95fr]">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 text-[16px] font-medium uppercase tracking-[0.08em] text-[#6faef2]">
              <Sparkles size={16} />
              Unofficial Fan Archive
            </div>

            <Link
              to="/100-reasons"
              className="block max-w-xl text-[56px] font-bold uppercase leading-[0.9] tracking-[-0.04em] transition hover:text-[#6faef2] md:text-[88px]"
            >
              100 reasons
              <br />
              to love
              <br />
              Ryan Gosling
            </Link>

            <div className="mt-7 h-[4px] w-40 rounded-full bg-[#6faef2]" />

            <p className="mt-8 max-w-xl text-[24px] leading-[1.18] md:text-[30px]">
              Ryan Gosling centered collection of films, interviews and images.
            </p>
          </div>

          <div className="relative z-10 flex justify-center">
            <HeroImageDeck />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-4 md:px-10">
        <SectionHeader
          icon={<Film className="text-[#6faef2]" />}
          title="Filmography"
          linkTo="/filmography"
          linkText="View all films"
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {films.map((film) => (
            <FilmCard key={film.slug} film={film} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-8 md:px-10">
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

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-8 md:px-10">
        <SectionHeader
          icon={<Camera className="text-[#6faef2]" />}
          title="Gallery"
          linkTo="/gallery"
          linkText="View full gallery"
        />

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
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-4 md:px-10">
        <BackButton to="/" label="Back to Home" />
        <h2 className="mb-8 mt-8 text-[38px] font-bold uppercase md:text-[54px]">Filmography</h2>
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
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <p className="text-[22px]">Film not found.</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-4 md:px-10">
        <BackButton to="/filmography" label="Back to Filmography" />

        <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <img src={film.img} alt={film.title} className="w-full rounded-[2rem] object-cover shadow-[0_10px_22px_rgba(59,42,26,0.08)]" />

          <div>
            <p className="text-[16px] text-[#6b5948]">{film.year}</p>
            <h2 className="mt-2 text-[42px] font-bold uppercase leading-[1.02] md:text-[64px] md:leading-none">{film.title}</h2>
            <p className="mt-4 text-[20px] text-[#6faef2] md:text-[24px]">{film.role}</p>
            <p className="mt-8 max-w-2xl text-[19px] leading-[1.5] md:text-[22px]">{film.note}</p>
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
        <BackButton to="/" label="Back to Home" />
        <h2 className="mb-4 mt-8 text-[54px] font-bold uppercase">Interviews</h2>
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

                <Link
                  to={`/interviews/${era.slug}`}
                  className="shrink-0 rounded-full bg-[#9cc9ff] px-4 py-2 text-[15px] font-medium text-[#3b2a1a] shadow-[0_8px_18px_rgba(59,42,26,0.12)] transition hover:-translate-y-0.5 hover:bg-[#fff1b5]"
                >
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
        <BackButton to="/interviews" label="Back to Interviews" />

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
        <BackButton to={`/interviews/${era.slug}`} label={`Back to ${era.era}`} />

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
        <BackButton to="/" label="Back to Home" />
        <h2 className="mb-4 mt-8 text-[54px] font-bold uppercase">Gallery</h2>
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
        <BackButton to="/gallery" label="Back to Gallery" />

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
function ReasonsPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-10 pb-16 pt-4">
        <BackButton to="/" label="Back to Home" />
        <h2 className="mb-4 mt-8 text-[54px] font-bold uppercase">
          100 Reasons to Love Ryan Gosling
        </h2>

        <p className="mb-10 max-w-3xl text-[22px] leading-[1.6] text-[#5a4631]">
          A directory-style archive of 100 reasons. Each entry can be opened and edited later.
        </p>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {reasons.map((reason) => (
            <Link
              key={reason.slug}
              to={`/100-reasons/${reason.slug}`}
              className="rounded-[1.25rem] bg-[#f8e6a2] p-5 shadow-[0_10px_22px_rgba(59,42,26,0.08)] transition hover:-translate-y-1"
            >
              <p className="text-[14px] uppercase tracking-[0.08em] text-[#6faef2]">
                Reason {reason.number}
              </p>

              <h3 className="mt-2 text-[24px] font-bold leading-tight">
                {reason.title}
              </h3>

              <p className="mt-3 text-[16px] leading-[1.5] text-[#5a4631]">
                {reason.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

function ReasonDetailPage() {
  const { reasonSlug } = useParams();
  const reason = reasons.find((item) => item.slug === reasonSlug);

  if (!reason) {
    return (
      <Layout>
        <section className="mx-auto max-w-7xl px-10 py-20">
          <p className="text-[22px]">Reason not found.</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-10 pb-16 pt-4">
        <BackButton to="/100-reasons" label="Back to 100 Reasons" />

        <div className="mt-8 rounded-[2rem] bg-[#f8e6a2] p-8 shadow-[0_10px_22px_rgba(59,42,26,0.08)]">
          <p className="text-[16px] uppercase tracking-[0.08em] text-[#6faef2]">
            Reason {reason.number}
          </p>

          <h2 className="mt-2 text-[54px] font-bold uppercase leading-tight">
            {reason.title}
          </h2>

          <p className="mt-8 max-w-3xl text-[22px] leading-[1.7] text-[#5a4631]">
            {reason.content}
          </p>
        </div>
      </section>
    </Layout>
  );
}

function SNLPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-10 pb-16 pt-4">
        <BackButton to="/" label="Back to Home" />
        <div className="mb-8 mt-8 flex items-center gap-3">
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
        <BackButton to="/saturday-night-live" label="Back to Saturday Night Live" />

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
        <BackButton to={`/saturday-night-live/${season.slug}`} label={`Back to ${season.season}`} />

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
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/100-reasons" element={<ReasonsPage />} />
        <Route path="/100-reasons/:reasonSlug" element={<ReasonDetailPage />} />

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
    </>
  );
}
