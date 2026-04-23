import { ArrowRight, Sparkles, Film, Quote, Camera, Star } from "lucide-react";
import { Routes, Route, Link, useParams, useLocation } from "react-router-dom";

const films = [
  {
    slug: "the-notebook",
    year: "2004",
    title: "The Notebook",
    role: "Noah Calhoun",
    note: "恋恋笔记本",
    img: "",
  },
  {
    slug: "drive",
    year: "2011",
    title: "Drive",
    role: "Driver",
    note: "决战小三之巅得主",
    img: "/image/drive.PNG",
  },
  {
    slug: "the-ides-of-march",
    year: "2011",
    title: "The Ides of March",
    role: "Stephen Meyers",
    note: "小政客太好法了婊子婊子婊子",
    img: "/image/the ides of march.jpg",
  },
  {
    slug: "the-place-beyond-the-pines",
    year: "2012",
    title: "The Place Beyound the Pines",
    role: "Luke Glanton",
    note: "导演我的艳尸去哪了",
    img: "/image/the place beyond the pines.PNG",
  },
  {
    slug: "la-la-land",
    year: "2016",
    title: "La La Land",
    role: "Sebastian",
    note: "哭死了我要法死你",
    img: "",
  },
  {
    slug: "blade-runner-2049",
    year: "2017",
    title: "Blade Runner 2049",
    role: "K",
    note: "“我把K嬷死了” 仿生人牛逼",
    img: "",
  },
  {
    slug: "first-man",
    year: "2018",
    title: "First Man",
    role: "Neil Armstrong",
    note: "登月第一人",
    img: "",
  },
  {
    slug: "barbie",
    year: "2023",
    title: "Barbie",
    role: "Ken",
    note: "无敌好嬷之金发碧眼性爱娃娃 两套器官持有者",
    img: "/image/barbie.JPG",
  },
  {
    slug: "the-fall-guy",
    year: "2024",
    title: "The Fall Guy",
    role: "Colt Seavers",
    note: "叫好不叫座之我草那么大的奶那么深的沟",
    img: "/image/the fall guy.jpg",
  },
  {
    slug: "project-hail-mary",
    year: "2026",
    title: "Project Hail Mary",
    role: "Ryland Grace",
    note: "太空麻辣教师我一天到晚一直一直一直想一直一直一直入",
    img: "/image/project hail mary.JPG",
  },
];

const interviews = [
  {
    slug: "gq-classic-man",
    source: "GQ — The New Classic Man",
    year: "2016",
    text: "I'm just always looking for something that feels honest.",
    summary:
      "A profile focused on taste, masculinity, performance choices, and the appeal of sincerity in screen image.",
  },
  {
    slug: "hollywood-reporter",
    source: "The Hollywood Reporter",
    year: "2017",
    text: "I like characters who are a little bit damaged.",
    summary:
      "A conversation about complexity, restraint, and the appeal of characters who are emotionally fractured.",
  },
  {
    slug: "esquire-made-to-last",
    source: "Esquire — Made to Last",
    year: "2022",
    text: "The best part of this job is the people you get to meet.",
    summary:
      "An interview touching on longevity, collaboration, public image, and the social texture of filmmaking.",
  },
];

const gallery = [
  {
    slug: "portrait-blue-suit",
    title: "Blue Suit Portrait",
    caption: "A polished editorial-style image with a softer public-facing mood.",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "night-light-portrait",
    title: "Night Light Portrait",
    caption: "A cooler, more cinematic image shaped by shadow and coloured light.",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "black-white-study",
    title: "Black and White Study",
    caption: "A stripped-down portrait that emphasises facial expression and stillness.",
    img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "street-style-frame",
    title: "Street Style Frame",
    caption: "An image with a more casual energy and contemporary editorial feel.",
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "soft-neutral-portrait",
    title: "Soft Neutral Portrait",
    caption: "A cleaner, calmer frame that works well as archive material or section art.",
    img: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80",
  },
];

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

          <nav className="flex gap-8 text-[17px]">
            <NavLinkItem to="/">Home</NavLinkItem>
            <NavLinkItem to="/filmography">Filmography</NavLinkItem>
            <NavLinkItem to="/interviews">Interviews</NavLinkItem>
            <NavLinkItem to="/gallery">Gallery</NavLinkItem>
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

function InterviewCard({ item }) {
  return (
    <Link
      to={`/interviews/${item.slug}`}
      className="rounded-[1.5rem] bg-[#f8e6a2] p-7 shadow-[0_10px_22px_rgba(59,42,26,0.08)] transition hover:-translate-y-1"
    >
      <p className="text-[18px] font-bold text-[#3b2a1a]">{item.source}</p>
      <p className="mt-1 text-[16px] text-[#6b5948]">{item.year}</p>
      <p className="mt-5 text-[22px] leading-[1.45] text-[#5a4631]">“{item.text}”</p>
      <div className="mt-8 inline-flex rounded-full bg-[#9cc9ff] px-5 py-2 text-[14px] font-medium text-[#3b2a1a]">
        Read more
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
        <div className="grid gap-6 md:grid-cols-3">
          {interviews.map((item) => (
            <InterviewCard key={item.slug} item={item} />
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
        <h2 className="mb-8 text-[54px] font-bold uppercase">Interviews</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {interviews.map((item) => (
            <InterviewCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

function InterviewDetailPage() {
  const { slug } = useParams();
  const interview = interviews.find((i) => i.slug === slug);

  if (!interview) {
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
        <Link to="/interviews" className="text-[#6faef2] hover:underline">
          ← Back to Interviews
        </Link>

        <div className="mt-8 rounded-[2rem] bg-[#f8e6a2] p-10 shadow-[0_10px_22px_rgba(59,42,26,0.08)]">
          <p className="text-[16px] text-[#6b5948]">{interview.year}</p>
          <h2 className="mt-2 text-[48px] font-bold leading-tight">{interview.source}</h2>
          <p className="mt-8 max-w-3xl text-[28px] leading-[1.5] text-[#5a4631]">“{interview.text}”</p>
          <p className="mt-8 max-w-3xl text-[20px] leading-[1.6] text-[#5a4631]">{interview.summary}</p>
        </div>
      </section>
    </Layout>
  );
}

function GalleryPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-10 pb-16 pt-4">
        <h2 className="mb-8 text-[54px] font-bold uppercase">Gallery</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {gallery.map((item) => (
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
            <p className="text-[16px] text-[#6b5948]">Gallery Entry</p>
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
      <Route path="/interviews/:slug" element={<InterviewDetailPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/gallery/:slug" element={<GalleryDetailPage />} />
    </Routes>
  );
}
