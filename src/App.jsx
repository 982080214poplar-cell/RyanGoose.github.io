import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { ArrowLeft, ArrowRight, Sparkles, Film, Quote, Camera, Star, Tv, Menu, X } from "lucide-react";
import { Routes, Route, Link, Navigate, useParams, useLocation } from "react-router-dom";
import films from "./data/films.json";
import interviewEras from "./data/interviews.json";
import gallery from "./data/gallery.json";
import handcraftSections from "./data/handcraft.json";
import snlSeasons from "./data/snl.json";
import reasons from "./data/reasons.json";

const HERO_WAVE_TOP_PATH =
  "M 0 84 C 122 44 252 42 384 72 C 530 106 666 136 834 126 C 978 118 1088 90 1180 66";
const HERO_WAVE_BOTTOM_PATH =
  "M 0 122 C 128 86 258 84 392 112 C 538 144 676 174 844 166 C 986 158 1092 132 1180 108";
function NavLinkItem({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <Link
      to={to}
      className="group/nav relative inline-flex pb-2 uppercase tracking-[0.08em] transition hover:text-[#3b2a1a]"
    >
      {children}
      <span
        className={`absolute bottom-0 left-1/2 h-[4px] -translate-x-1/2 rounded-full bg-[#6faef2] transition-all duration-300 ease-out ${
          isActive ? "w-full" : "w-0 group-hover/nav:w-full"
        }`}
      />
    </Link>
  );
}

function MoreArchiveLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <Link
      to={to}
      className="group/nav relative inline-flex pb-2 text-[18px] font-medium uppercase tracking-[0.08em] transition hover:text-[#3b2a1a]"
    >
      {children}
      <span
        className={`absolute bottom-0 left-1/2 h-[4px] -translate-x-1/2 rounded-full bg-[#6faef2] transition-all duration-300 ease-out ${
          isActive ? "w-full" : "w-0 group-hover/nav:w-full"
        }`}
      />
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
            className="shrink-0 text-[20px] font-semibold uppercase leading-[1.5] tracking-[0.14em] md:text-[22px]"
          >
            <span className="block whitespace-nowrap">RYAN GOSLING</span>
            <span className="block whitespace-nowrap">ARCHIVE</span>
          </Link>

          {/* Desktop nav */}
          <nav className="site-nav ml-auto flex gap-8 text-[17px]">
            <NavLinkItem to="/">Home</NavLinkItem>
            <NavLinkItem to="/filmography">Filmography</NavLinkItem>
            <NavLinkItem to="/interviews">Interviews</NavLinkItem>
            <NavLinkItem to="/gallery">Gallery</NavLinkItem>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="mobile-menu-trigger rounded-full bg-transparent p-3 text-[#3b2a1a] transition hover:text-[#6faef2]"
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
            min-[920px]:block
          "
        >
          <div className="mt-6 border-t border-[#3b2a1a]/20 pt-5">
            <p className="mb-3 text-[12px] uppercase tracking-[0.16em] text-[#3b2a1a]/60">
              More archive sections
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <MoreArchiveLink to="/saturday-night-live">
                Saturday Night Live
              </MoreArchiveLink>
              <MoreArchiveLink to="/handcraft">
                Handcraft
              </MoreArchiveLink>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile sidebar backdrop */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 z-50 bg-black/30 transition-opacity duration-300 min-[920px]:hidden ${
          isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-[78%] max-w-[320px] bg-[#f6d97a] px-6 py-7 shadow-2xl transition-transform duration-300 min-[920px]:hidden ${
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
            className="rounded-full bg-transparent p-2 text-[#3b2a1a] transition hover:text-[#6faef2]"
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-5 text-[22px] font-medium">
          <Link to="/" onClick={() => setIsSidebarOpen(false)} className="transition hover:text-[#6faef2]">
            Home
          </Link>
          <Link to="/filmography" onClick={() => setIsSidebarOpen(false)} className="transition hover:text-[#6faef2]">
            Filmography
          </Link>
          <Link to="/interviews" onClick={() => setIsSidebarOpen(false)} className="transition hover:text-[#6faef2]">
            Interviews
          </Link>
          <Link to="/gallery" onClick={() => setIsSidebarOpen(false)} className="transition hover:text-[#6faef2]">
            Gallery
          </Link>

          <div className="my-3 border-t border-[#3b2a1a]/20" />

          <p className="text-[12px] uppercase tracking-[0.16em] text-[#3b2a1a]/60">
            More archive sections
          </p>

          <Link
            to="/saturday-night-live"
            onClick={() => setIsSidebarOpen(false)}
            className="transition hover:text-[#6faef2]"
          >
            Saturday Night Live
          </Link>
          <Link
            to="/handcraft"
            onClick={() => setIsSidebarOpen(false)}
            className="transition hover:text-[#6faef2]"
          >
            Handcraft
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

function BackButton({ to, label, icon }) {
  return (
    <div className="flex w-full items-center justify-between">
      <Link
        to={to}
        aria-label={label}
        title={label}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#9cc9ff] text-[#3b2a1a] shadow-[0_8px_18px_rgba(59,42,26,0.12)] transition hover:-translate-y-0.5 hover:bg-[#fff1b5]"
      >
        <ArrowLeft className="h-[22px] w-[22px]" strokeWidth={2.4} />
      </Link>

      {icon && (
        <span className="inline-flex h-11 w-11 items-center justify-center bg-transparent text-[#6faef2] [&_svg]:h-11 [&_svg]:w-11">
          {icon}
        </span>
      )}
    </div>
  );
}

function useDetailLayoutShift() {
  const [layoutShift, setLayoutShift] = useState("");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    let timeoutId;

    const startShift = (event) => {
      setLayoutShift(event.matches ? "to-desktop" : "to-mobile");
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => setLayoutShift(""), 1100);
    };

    mediaQuery.addEventListener("change", startShift);

    return () => {
      window.clearTimeout(timeoutId);
      mediaQuery.removeEventListener("change", startShift);
    };
  }, []);

  return layoutShift;
}

function DetailImage({ src, alt }) {
  const layoutShift = useDetailLayoutShift();

  return (
    <img
      src={src}
      alt={alt}
      className={`detail-media w-full rounded-[2rem] object-cover shadow-[0_10px_22px_rgba(59,42,26,0.08)] ${
        layoutShift ? `is-layout-${layoutShift}` : ""
      }`}
    />
  );
}

function createTitleLines(title, lineCount) {
  const words = String(title).trim().split(/\s+/).filter(Boolean);

  if (words.length <= lineCount) {
    return [words.join(" ")];
  }

  const totalLetters = words.reduce((sum, word) => sum + word.length, 0);
  const targetLetters = totalLetters / lineCount;
  const lines = [];
  let currentLine = "";
  let currentLetters = 0;

  words.forEach((word, index) => {
    const remainingWords = words.length - index;
    const remainingLines = lineCount - lines.length;
    const shouldBreak =
      currentLine &&
      currentLetters + word.length > targetLetters &&
      remainingWords >= remainingLines;

    if (shouldBreak) {
      lines.push(currentLine);
      currentLine = word;
      currentLetters = word.length;
      return;
    }

    currentLine = currentLine ? `${currentLine} ${word}` : word;
    currentLetters += word.length;
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  while (lines.length > lineCount) {
    const tail = lines.pop();
    lines[lines.length - 1] = `${lines[lines.length - 1]} ${tail}`;
  }

  return lines;
}

function createMeasuredTitleLines(title, lineCount, measureElement, availableWidth) {
  const words = String(title).trim().split(/\s+/).filter(Boolean);

  if (!measureElement || !words.length) {
    return createTitleLines(title, lineCount);
  }

  const probe = measureElement.querySelector("[data-measure-probe]");
  if (!probe) {
    return createTitleLines(title, lineCount);
  }

  function getTextWidth(text) {
    probe.textContent = text;
    return probe.scrollWidth;
  }

  if (lineCount === 1 || words.length <= 1) {
    return [words.join(" ")];
  }

  const candidates = [];

  function collectLines(startIndex, remainingLines, currentLines) {
    if (remainingLines === 1) {
      candidates.push([...currentLines, words.slice(startIndex).join(" ")]);
      return;
    }

    const lastBreak = words.length - remainingLines;

    for (let breakIndex = startIndex; breakIndex <= lastBreak; breakIndex += 1) {
      collectLines(
        breakIndex + 1,
        remainingLines - 1,
        [...currentLines, words.slice(startIndex, breakIndex + 1).join(" ")]
      );
    }
  }

  collectLines(0, Math.min(lineCount, words.length), []);

  const scoredCandidates = candidates.map((lines) => {
    const widths = lines.map(getTextWidth);
    const maxWidth = Math.max(...widths);
    const minWidth = Math.min(...widths);
    const totalWidth = widths.reduce((sum, width) => sum + width, 0);
    const averageWidth = totalWidth / widths.length;
    const balancePenalty = widths.reduce(
      (sum, width) => sum + Math.abs(width - averageWidth),
      0
    );
    const overflow = Math.max(0, maxWidth - availableWidth);

    return {
      lines,
      score: overflow * 10000 + balancePenalty * 4 + (maxWidth - minWidth) * 2 + maxWidth * 0.15,
    };
  });

  scoredCandidates.sort((a, b) => a.score - b.score);

  return scoredCandidates[0]?.lines ?? createTitleLines(title, lineCount);
}

function findFittingMeasuredTitleLines(title, lineCount, measureElement, availableWidth) {
  const words = String(title).trim().split(/\s+/).filter(Boolean);

  if (!measureElement || !words.length) {
    return createTitleLines(title, lineCount);
  }

  const probe = measureElement.querySelector("[data-measure-probe]");
  if (!probe) {
    return createTitleLines(title, lineCount);
  }

  function getTextWidth(text) {
    probe.textContent = text;
    return probe.scrollWidth;
  }

  if (lineCount === 1) {
    const line = words.join(" ");
    return getTextWidth(line) <= availableWidth ? [line] : null;
  }

  const candidates = [];

  function collectLines(startIndex, remainingLines, currentLines) {
    if (remainingLines === 1) {
      candidates.push([...currentLines, words.slice(startIndex).join(" ")]);
      return;
    }

    const lastBreak = words.length - remainingLines;

    for (let breakIndex = startIndex; breakIndex <= lastBreak; breakIndex += 1) {
      collectLines(
        breakIndex + 1,
        remainingLines - 1,
        [...currentLines, words.slice(startIndex, breakIndex + 1).join(" ")]
      );
    }
  }

  collectLines(0, Math.min(lineCount, words.length), []);

  const fittingCandidates = candidates
    .map((lines) => {
      const widths = lines.map(getTextWidth);
      const maxWidth = Math.max(...widths);
      const minWidth = Math.min(...widths);
      const totalWidth = widths.reduce((sum, width) => sum + width, 0);
      const averageWidth = totalWidth / widths.length;
      const balancePenalty = widths.reduce(
        (sum, width) => sum + Math.abs(width - averageWidth),
        0
      );

      return {
        lines,
        maxWidth,
        score: balancePenalty * 4 + (maxWidth - minWidth) * 2 + maxWidth * 0.15,
      };
    })
    .filter((candidate) => candidate.maxWidth <= availableWidth)
    .sort((a, b) => a.score - b.score);

  return fittingCandidates[0]?.lines ?? null;
}

function StagedTitle({
  as: Tag = "h2",
  children,
  className = "",
  mobileLineCount = 3,
  tabletLineCount = 2,
  desktopLineCount = 1,
}) {
  const titleRef = useRef(null);
  const measureRef = useRef(null);
  const [activeStage, setActiveStage] = useState("mobile");
  const [measuredLines, setMeasuredLines] = useState({
    mobile: createTitleLines(children, mobileLineCount),
    tablet: createTitleLines(children, tabletLineCount),
    desktop: createTitleLines(children, desktopLineCount),
  });
  const oneLine = createTitleLines(children, desktopLineCount);

  useLayoutEffect(() => {
    const titleElement = titleRef.current;
    const measureElement = measureRef.current;

    if (!titleElement || !measureElement) return undefined;

    function updateLineCount() {
      const containerElement = titleElement.parentElement ?? titleElement;
      const availableWidth = Math.floor(containerElement.getBoundingClientRect().width) - 4;
      const relaxedTwoLineWidth = availableWidth * 1.08;
      const desktopLines = findFittingMeasuredTitleLines(
        children,
        desktopLineCount,
        measureElement,
        availableWidth
      );
      const tabletFittingLines = findFittingMeasuredTitleLines(
        children,
        tabletLineCount,
        measureElement,
        relaxedTwoLineWidth
      );
      const nextLines = {
        desktop: desktopLines ?? createMeasuredTitleLines(children, desktopLineCount, measureElement, availableWidth),
        tablet: tabletFittingLines ?? createMeasuredTitleLines(children, tabletLineCount, measureElement, availableWidth),
        mobile: createMeasuredTitleLines(children, mobileLineCount, measureElement, availableWidth),
      };

      setMeasuredLines((current) => {
        const currentValue = JSON.stringify(current);
        const nextValue = JSON.stringify(nextLines);

        return currentValue === nextValue ? current : nextLines;
      });

      const getMaxLineWidth = (lines) =>
        Math.max(
          ...lines.map((line) => {
            const probe = measureElement.querySelector("[data-measure-probe]");
            if (!probe) return Number.POSITIVE_INFINITY;
            probe.textContent = line;
            return probe.scrollWidth;
          })
        );

      if (desktopLines) {
        setActiveStage((current) => current === "desktop" ? current : "desktop");
        return;
      }

      if (tabletFittingLines) {
        setActiveStage((current) => current === "tablet" ? current : "tablet");
        return;
      }

      setActiveStage((current) => current === "mobile" ? current : "mobile");
    }

    updateLineCount();

    const resizeObserver = new ResizeObserver(updateLineCount);
    resizeObserver.observe(titleElement);
    if (titleElement.parentElement) {
      resizeObserver.observe(titleElement.parentElement);
    }
    window.addEventListener("resize", updateLineCount);

    document.fonts?.ready.then(updateLineCount);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateLineCount);
    };
  }, [children, desktopLineCount, mobileLineCount, tabletLineCount]);

  return (
    <Tag ref={titleRef} className={`staged-title ${className}`}>
      <span
        className={`staged-title-stage ${activeStage === "mobile" ? "is-active" : ""}`}
      >
        {measuredLines.mobile.map((line, index) => (
          <span key={`${line}-${index}`} className="block whitespace-nowrap">{line}</span>
        ))}
      </span>
      <span
        className={`staged-title-stage ${activeStage === "tablet" ? "is-active" : ""}`}
      >
        {measuredLines.tablet.map((line, index) => (
          <span key={`${line}-${index}`} className="block whitespace-nowrap">{line}</span>
        ))}
      </span>
      <span
        className={`staged-title-stage ${activeStage === "desktop" ? "is-active" : ""}`}
      >
        {measuredLines.desktop.map((line, index) => (
          <span key={`${line}-${index}`} className="block whitespace-nowrap">{line}</span>
        ))}
      </span>

      <span ref={measureRef} aria-hidden="true" className="staged-title-measure">
        <span data-measure-probe className="block whitespace-nowrap" />
        <span data-measure-stage="one">
          {oneLine.map((line, index) => (
            <span key={`measure-one-${line}-${index}`} className="block whitespace-nowrap">{line}</span>
          ))}
        </span>
        <span data-measure-stage="tablet">
          {measuredLines.tablet.map((line, index) => (
            <span key={`measure-tablet-${line}-${index}`} className="block whitespace-nowrap">{line}</span>
          ))}
        </span>
        <span data-measure-stage="mobile">
          {measuredLines.mobile.map((line, index) => (
            <span key={`measure-mobile-${line}-${index}`} className="block whitespace-nowrap">{line}</span>
          ))}
        </span>
      </span>
    </Tag>
  );
}

function PageTitle({ children, className = "" }) {
  return (
    <StagedTitle
      className={`mb-4 mt-8 max-w-full text-[clamp(34px,10vw,54px)] font-bold uppercase leading-[1.02] ${className}`}
      mobileLineCount={3}
      tabletLineCount={2}
      desktopLineCount={1}
    >
      {children}
    </StagedTitle>
  );
}

function DetailTitle({ children, className = "" }) {
  const titleRef = useRef(null);
  const [isSettling, setIsSettling] = useState(false);
  const titleWords = String(children).trim().split(/\s+/).filter(Boolean);

  useEffect(() => {
    const titleElement = titleRef.current;

    if (!titleElement) return undefined;

    let timeoutId;
    let confirmTimeoutId;
    const getLayoutSignature = () => {
      const wordElements = Array.from(titleElement.querySelectorAll("[data-title-word]"));

      if (!wordElements.length) return "";

      const lines = [];

      wordElements.forEach((wordElement) => {
        const top = Math.round(wordElement.getBoundingClientRect().top);
        const lastLine = lines[lines.length - 1];

        if (lastLine && Math.abs(lastLine.top - top) <= 2) {
          lastLine.words.push(wordElement.textContent);
          return;
        }

        lines.push({ top, words: [wordElement.textContent] });
      });

      return lines.map((line) => line.words.join(" ")).join("|");
    };

    let previousSignature = getLayoutSignature();
    const settleDelay = 220;
    const confirmDelay = 110;

    const startSettling = () => {
      setIsSettling(true);
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => setIsSettling(false), settleDelay);
    };

    const resizeObserver = new ResizeObserver(() => {
      const nextSignature = getLayoutSignature();

      if (nextSignature === previousSignature) return;

      window.clearTimeout(confirmTimeoutId);
      confirmTimeoutId = window.setTimeout(() => {
        const confirmedSignature = getLayoutSignature();

        if (confirmedSignature === previousSignature || confirmedSignature !== nextSignature) return;

        previousSignature = confirmedSignature;
        startSettling();
      }, confirmDelay);
    });

    resizeObserver.observe(titleElement);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(confirmTimeoutId);
      resizeObserver.disconnect();
    };
  }, [children]);

  return (
    <h2
      ref={titleRef}
      className={`detail-title natural-title mt-2 max-w-full text-[clamp(40px,6vw,64px)] font-bold leading-[1.05] ${isSettling ? "is-settling" : ""} ${className}`}
    >
      {titleWords.map((word, index) => (
        <span data-title-word key={`${word}-${index}`}>
          {index > 0 ? " " : ""}
          {word}
        </span>
      ))}
    </h2>
  );
}

function CardTitle({ as: Tag = "h3", children, className = "" }) {
  const titleRef = useRef(null);
  const [isSettling, setIsSettling] = useState(false);
  const titleWords = String(children).trim().split(/\s+/).filter(Boolean);

  useEffect(() => {
    const titleElement = titleRef.current;

    if (!titleElement) return undefined;

    let timeoutId;

    const getLayoutSignature = () => {
      const wordElements = Array.from(titleElement.querySelectorAll("[data-card-title-word]"));

      if (!wordElements.length) return "";

      const lines = [];

      wordElements.forEach((wordElement) => {
        const top = Math.round(wordElement.getBoundingClientRect().top);
        const lastLine = lines[lines.length - 1];

        if (lastLine && Math.abs(lastLine.top - top) <= 2) {
          lastLine.words.push(wordElement.textContent);
          return;
        }

        lines.push({ top, words: [wordElement.textContent] });
      });

      return lines.map((line) => line.words.join(" ")).join("|");
    };

    let previousSignature = getLayoutSignature();
    const settleDelay = 180;

    const startSettling = () => {
      setIsSettling(true);
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => setIsSettling(false), settleDelay);
    };

    const resizeObserver = new ResizeObserver(() => {
      const nextSignature = getLayoutSignature();

      if (nextSignature === previousSignature) return;

      previousSignature = nextSignature;
      startSettling();
    });

    resizeObserver.observe(titleElement);

    return () => {
      window.clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [children]);

  return (
    <Tag
      ref={titleRef}
      className={`card-title ${isSettling ? "is-settling" : ""} ${className}`}
    >
      {titleWords.map((word, index) => (
        <span data-card-title-word key={`${word}-${index}`}>
          {index > 0 ? " " : ""}
          {word}
        </span>
      ))}
    </Tag>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function ArchiveCardMotion() {
  return null;
}

function FilmCard({ film }) {
  return (
    <Link
      to={`/filmography/${film.slug}`}
      className="archive-card flex h-full flex-col transition hover:-translate-y-1"
    >
      <img
        src={film.img}
        alt={film.title}
        className="aspect-video w-full shrink-0 rounded-[1.25rem] object-cover shadow-[0_10px_22px_rgba(59,42,26,0.08)]"
      />
      <div className="card-copy flex min-h-0 min-w-0 flex-1 flex-col justify-start px-2 py-3">
        <p className="text-[13px] uppercase leading-none tracking-[0.08em] text-[#6faef2]">{film.year}</p>
        <CardTitle as="h4" className="mt-1 text-[clamp(16px,1.22vw,23px)] font-bold uppercase leading-[1.04]">
          {film.title}
        </CardTitle>
        <p className="mt-1.5 text-[13px] uppercase leading-tight tracking-[0.08em] text-[#6b5948]">{film.role}</p>
      </div>
    </Link>
  );
}

function ArchiveLayoutGrid({
  aspectRatio = 1.42,
  className = "",
  columnRules = [
    { min: 1100, columns: 4 },
    { min: 760, columns: 3 },
    { min: 520, columns: 2 },
    { min: 0, columns: 1 },
  ],
  gap = 16,
  getKey = (item) => item.slug,
  items,
  renderItem,
}) {
  const gridRef = useRef(null);
  const columnRulesKey = JSON.stringify(columnRules);
  const [layout, setLayout] = useState({
    cardHeight: 0,
    cardWidth: 0,
    columns: 1,
    gap,
    height: 0,
  });

  useLayoutEffect(() => {
    const gridElement = gridRef.current;

    if (!gridElement) return undefined;

    function getColumnCount(width) {
      const sortedRules = [...columnRules].sort((a, b) => b.min - a.min);
      return sortedRules.find((rule) => width >= rule.min)?.columns ?? 1;
    }

    function updateLayout() {
      const width = gridElement.getBoundingClientRect().width;
      const columns = getColumnCount(width);
      const cardWidth = (width - gap * (columns - 1)) / columns;
      const cardHeight = cardWidth / aspectRatio;
      const rows = Math.ceil(items.length / columns);

      setLayout({
        cardHeight,
        cardWidth,
        columns,
        gap,
        height: rows * cardHeight + Math.max(0, rows - 1) * gap,
      });
    }

    updateLayout();

    const resizeObserver = new ResizeObserver(updateLayout);
    resizeObserver.observe(gridElement);

    return () => resizeObserver.disconnect();
  }, [aspectRatio, columnRulesKey, gap, items.length]);

  return (
    <div
      ref={gridRef}
      className={`archive-layout-grid relative ${className}`}
      style={{ height: layout.height || 1 }}
    >
      {layout.cardWidth > 0 && layout.cardHeight > 0 && items.map((item, index) => {
        const column = index % layout.columns;
        const row = Math.floor(index / layout.columns);
        const x = column * (layout.cardWidth + layout.gap);
        const y = row * (layout.cardHeight + layout.gap);

        return (
          <div
            className="archive-layout-grid-item absolute left-0 top-0"
            key={getKey(item)}
            style={{
              height: `${layout.cardHeight}px`,
              transform: `translate(${x}px, ${y}px)`,
              width: `${layout.cardWidth}px`,
            }}
          >
            {renderItem(item)}
          </div>
        );
      })}
    </div>
  );
}

function FilmGrid({ films: filmItems }) {
  return (
    <ArchiveLayoutGrid
      aspectRatio={1.06}
      items={filmItems}
      renderItem={(film) => <FilmCard film={film} />}
    />
  );
}

function EraCard({ era }) {
  return (
    <Link
      to={`/interviews/${era.slug}`}
      className="archive-card card-copy flex h-full min-w-0 flex-col justify-start px-2 py-2 transition hover:-translate-y-1"
    >
      <p className="text-[13px] uppercase leading-none tracking-[0.08em] text-[#6faef2]">{era.year}</p>
      <CardTitle className="mt-1 text-[clamp(22px,1.55vw,28px)] font-bold uppercase leading-[1.02]">
        {era.era}
      </CardTitle>
    </Link>
  );
}

function InterviewItemCard({ eraSlug, item }) {
  return (
    <Link
      to={`/interviews/${eraSlug}/${item.slug}`}
      className="archive-card flex h-full min-w-0 flex-col transition hover:-translate-y-1"
    >
      <img
        src={item.image}
        alt={item.title}
        className="block aspect-video w-full shrink-0 rounded-[1.5rem] object-cover shadow-[0_10px_22px_rgba(59,42,26,0.08)]"
      />
      <div className="card-copy flex min-h-0 min-w-0 flex-1 flex-col justify-start px-2 py-3">
        <p className="break-words text-[12px] leading-tight text-[#6b5948]">
          {item.outlet} · {item.date}
        </p>
        <CardTitle as="h4" className="mt-1.5 text-[clamp(20px,1.55vw,28px)] font-bold uppercase leading-[1.03]">
          {item.title}
        </CardTitle>
      </div>
    </Link>
  );
}

function GalleryCard({ item }) {
  return (
    <Link to={`/gallery/${item.slug}`} className="archive-card flex h-full flex-col transition hover:-translate-y-1">
      <img
        src={item.img}
        alt={item.title}
        className="h-[70%] w-full rounded-[1.1rem] object-cover shadow-[0_10px_22px_rgba(59,42,26,0.08)]"
      />
      <div className="card-copy">
        <p className="mt-3 text-[14px] uppercase tracking-[0.08em] text-[#6faef2]">
          {item.date}
        </p>
        <CardTitle as="h4" className="mt-1 text-[18px] font-bold leading-[1.2]">
          {item.title}
        </CardTitle>
      </div>
    </Link>
  );
}

function HeroImageDeck({
  isOpen,
  setIsOpen,
  activeCard,
  setActiveCard,
  isDesktop,
  isTransitioning,
  layoutShift,
}) {
  const [hearts, setHearts] = useState([]);
  const deckRef = useRef(null);

  const cardWidth = 520;
  const cardPeek = 72;
  const activeCardLeft = 150;
  const rightStackLeft = activeCardLeft + cardWidth + cardPeek;
  const mainImage = "/image/hothothot.JPG";
  const deckImages = gallery.slice(0, 5);


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
    // 卡堆整体要压在主图细边框之上，避免边框“浮”在卡牌前面。
    return 230 + index;
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
        className={`relative mx-auto mt-8 w-full max-w-[520px] cursor-pointer select-none overflow-visible ${
          layoutShift ? `hero-deck-layout-${layoutShift}` : ""
        }`}
      >
        <div className="hero-main-visual relative pt-7">
          <div className="pointer-events-none absolute inset-x-[-20px] top-0 bottom-7 rounded-[3rem] border-2 border-[#3b2a1a]/15" />
          <div
            onClick={handleClick}
            onDoubleClick={() => setIsOpen((current) => !current)}
            className="hero-main-card relative z-10 rounded-[3rem] bg-[#9cc9ff] p-5 shadow-[0_20px_40px_rgba(59,42,26,0.14)]"
          >
            <div className="overflow-hidden rounded-[2.5rem]">
              <img
                src={mainImage}
                alt="Ryan Gosling"
                className="h-[520px] w-full object-cover"
              />
            </div>
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
    <div
      className={`hero-deck-stage relative w-full max-w-[1160px] overflow-visible ${
        layoutShift ? `hero-deck-layout-${layoutShift}` : ""
      }`}
    >
      <div
        ref={deckRef}
        className="hero-deck-inner absolute isolate left-1/2 top-0 h-[700px] w-[1160px] origin-top cursor-pointer select-none xl:z-0"
      >
        {deckImages.map((item, index) => {
          const isActive = activeCard === index;

          return (
            <div
              key={item.slug}
              className="absolute top-[28px] z-10 h-[620px] rounded-[3rem] bg-[#9cc9ff] p-5 shadow-[0_18px_35px_rgba(59,42,26,0.14)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
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
          className={`hero-main-visual absolute top-0 z-[220] h-[648px] w-[560px] ${
            isTransitioning ? "hero-main-visual-static" : ""
          }`}
          style={{ left: `${mainLeft - 20}px` }}
        >
          <div
            className="hero-main-outline pointer-events-none absolute left-0 top-[28px] z-[1] h-[620px] w-[560px] rounded-[3rem] border-2 border-[#3b2a1a]/15"
          />

          <div
            className="hero-main-card absolute left-[20px] top-[28px] z-[2] h-[620px] w-[520px] rounded-[3rem] bg-[#9cc9ff] p-5 shadow-[0_20px_40px_rgba(59,42,26,0.14)]"
            onClick={handleClick}
            onDoubleClick={() => {
              setIsOpen((current) => !current);
              setActiveCard(null);
            }}
          >
            <div className="h-full overflow-hidden rounded-[2.5rem]">
              <img
                src={mainImage}
                alt="Ryan Gosling"
                className="h-full w-full object-cover"
              />
            </div>
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

        <div className="absolute bottom-8 right-24 z-[300] rounded-full bg-[#fff1b5] px-5 py-3 text-[14px] shadow">
          Double click to open · click a card
        </div>
      </div>
    </div>
  );
}

function sanitizeSnapshotNode(node) {
  const clone = node.cloneNode(true);
  clone.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
  clone.querySelectorAll("a, button, input, textarea, select").forEach((element) => {
    element.setAttribute("tabindex", "-1");
    element.setAttribute("aria-hidden", "true");
  });
  return clone;
}

function HeroTransitionOverlay({ transition }) {
  if (!transition) return null;

  const { fromMode, fromSnapshot, phase, toMode, toSnapshot } = transition;
  const isOutPhase = phase.startsWith("out");
  const isPrepPhase = phase.endsWith("prep");
  const stageMode = isOutPhase ? fromMode : toMode;
  const phaseClass = `hero-motion-${isOutPhase ? "out" : "in"}-${toMode}${isPrepPhase ? " hero-motion-prep" : ""}`;
  const activeSnapshot = isOutPhase ? fromSnapshot : toSnapshot;
  if (!activeSnapshot) return null;

  const { bottomWaveSnapshot, mainHtml, mainRect, topWaveSnapshot } = activeSnapshot;
  const primaryWaveSnapshot =
    toMode === "mobile"
      ? isOutPhase
        ? topWaveSnapshot
        : bottomWaveSnapshot
      : isOutPhase
        ? bottomWaveSnapshot
        : topWaveSnapshot;
  const waveSnapshot = primaryWaveSnapshot ?? topWaveSnapshot ?? bottomWaveSnapshot ?? null;

  return (
    <div aria-hidden="true" className={`hero-motion-overlay-main hero-motion-mode-${stageMode} ${phaseClass}`}>
      {waveSnapshot?.html && (
        <div
          className="hero-motion-wave"
          style={{
            height: `${waveSnapshot.rect.height}px`,
            left: `${waveSnapshot.rect.left}px`,
            top: `${waveSnapshot.rect.top}px`,
            width: `${waveSnapshot.rect.width}px`,
          }}
          dangerouslySetInnerHTML={{ __html: waveSnapshot.html }}
        />
      )}

      <div
        className="hero-motion-main"
        style={{
          "--hero-main-natural-height": `${mainRect.naturalHeight}px`,
          "--hero-main-natural-width": `${mainRect.naturalWidth}px`,
          "--hero-main-scale-x": `${mainRect.scaleX}`,
          "--hero-main-scale-y": `${mainRect.scaleY}`,
          height: `${mainRect.height}px`,
          left: `${mainRect.left}px`,
          top: `${mainRect.top}px`,
          width: `${mainRect.width}px`,
        }}
        dangerouslySetInnerHTML={{ __html: mainHtml }}
      />
    </div>
  );
}

function isSnapshotModeConsistent(snapshot, mode) {
  if (!snapshot?.mainRect) return false;

  const { width, height } = snapshot.mainRect;
  if (mode === "desktop") {
    return width > 390 && width < 470 && height > 470 && height < 560;
  }

  return width >= 430 && width < 545 && height >= 520 && height < 690;
}

function createMotionSnapshot(heroSectionElement) {
  if (!heroSectionElement) return null;
  const mainElement = heroSectionElement.querySelector(".hero-main-visual");
  if (!mainElement) return null;
  const topWaveElement = heroSectionElement.querySelector(".hero-wave-field-top");
  const bottomWaveElement = heroSectionElement.querySelector(".hero-wave-field-bottom");
  const mainRect = mainElement.getBoundingClientRect();
  const naturalWidth = Math.max(1, mainElement.offsetWidth || Math.round(mainRect.width));
  const naturalHeight = Math.max(1, mainElement.offsetHeight || Math.round(mainRect.height));
  const mainClone = sanitizeSnapshotNode(mainElement);

  const topWaveSnapshot = topWaveElement
    ? {
        html: sanitizeSnapshotNode(topWaveElement).outerHTML,
        rect: topWaveElement.getBoundingClientRect(),
      }
    : null;

  const bottomWaveSnapshot = bottomWaveElement
    ? {
        html: sanitizeSnapshotNode(bottomWaveElement).outerHTML,
        rect: bottomWaveElement.getBoundingClientRect(),
      }
    : null;

  return {
    bottomWaveSnapshot,
    mainHtml: mainClone.outerHTML,
    mainRect: {
      height: mainRect.height,
      left: mainRect.left,
      naturalHeight,
      naturalWidth,
      scaleX: mainRect.width / naturalWidth,
      scaleY: mainRect.height / naturalHeight,
      top: mainRect.top,
      width: mainRect.width,
    },
    topWaveSnapshot,
  };
}

function isValidMotionSnapshot(snapshot) {
  if (!snapshot) return false;

  return (
    snapshot.mainRect?.width > 0 &&
    snapshot.mainRect?.height > 0 &&
    Boolean(snapshot.mainHtml)
  );
}

function waitForFrames(count, callback) {
  if (count <= 0) {
    callback();
    return;
  }

  requestAnimationFrame(() => waitForFrames(count - 1, callback));
}

function areSnapshotsClose(a, b, tolerance = 1.5) {
  if (!a?.mainRect || !b?.mainRect) return false;

  return (
    Math.abs(a.mainRect.width - b.mainRect.width) <= tolerance &&
    Math.abs(a.mainRect.height - b.mainRect.height) <= tolerance &&
    Math.abs(a.mainRect.left - b.mainRect.left) <= tolerance &&
    Math.abs(a.mainRect.top - b.mainRect.top) <= tolerance
  );
}

function captureMotionSnapshotWithRetry(sectionElement, mode, attempts, onReady) {
  const first = createMotionSnapshot(sectionElement);
  const firstReady = isValidMotionSnapshot(first) && isSnapshotModeConsistent(first, mode);

  if (!firstReady) {
    if (attempts <= 0) {
      onReady(null);
      return;
    }

    requestAnimationFrame(() => {
      captureMotionSnapshotWithRetry(sectionElement, mode, attempts - 1, onReady);
    });
    return;
  }

  waitForFrames(2, () => {
    const second = createMotionSnapshot(sectionElement);
    const secondReady = isValidMotionSnapshot(second) && isSnapshotModeConsistent(second, mode);

    if (secondReady && areSnapshotsClose(first, second)) {
      onReady(second);
      return;
    }

    if (attempts <= 0) {
      onReady(null);
      return;
    }

    requestAnimationFrame(() => {
      captureMotionSnapshotWithRetry(sectionElement, mode, attempts - 1, onReady);
    });
  });
}

function HomePage() {
  const heroSectionRef = useRef(null);
  const heroGridRef = useRef(null);
  const [isHeroDeckOpen, setIsHeroDeckOpen] = useState(false);
  const [activeHeroCard, setActiveHeroCard] = useState(null);
  const [heroMode, setHeroMode] = useState(() =>
    window.innerWidth >= 1024 ? "desktop" : "mobile"
  );
  const [heroMotionTick, setHeroMotionTick] = useState(0);
  const [heroTransition, setHeroTransition] = useState(null);
  const stableSnapshotsRef = useRef({
    desktop: null,
    mobile: null,
  });

  useEffect(() => {
    const BREAKPOINT = 1024;
    const OUT_PHASE_MS = 700;
    const OUT_SWITCH_MS = 690;
    const IN_PHASE_MS = 800;
    const mediaQuery = window.matchMedia(`(min-width: ${BREAKPOINT}px)`);
    let outTimer;
    let inTimer;
    let transitionId = 0;
    let currentMode = mediaQuery.matches ? "desktop" : "mobile";
    let pendingMode = "";
    let isAnimating = false;
    let isDisposed = false;

    function clearTransitionTimers() {
      window.clearTimeout(outTimer);
      window.clearTimeout(inTimer);
    }

    function finishSwitch(nextMode, token = transitionId) {
      if (isDisposed || token !== transitionId) return;

      setHeroTransition(null);
      currentMode = nextMode;
      isAnimating = false;

      if (pendingMode && pendingMode !== currentMode) {
        const queuedMode = pendingMode;
        pendingMode = "";
        startModeSwitch(queuedMode);
        return;
      }

      pendingMode = "";
    }

    function startModeSwitch(nextMode) {
      if (isAnimating) {
        pendingMode = nextMode;
        return;
      }

      if (nextMode === currentMode) {
        pendingMode = "";
        return;
      }

      isAnimating = true;
      transitionId += 1;
      const token = transitionId;
      clearTransitionTimers();
      setHeroMotionTick((current) => current + 1);

      captureMotionSnapshotWithRetry(heroSectionRef.current, currentMode, 20, (strictFromSnapshot) => {
        runSwitch(strictFromSnapshot);
      });

      function runSwitch(fromSnapshot) {
        if (isDisposed || token !== transitionId) return;

        if (!isValidMotionSnapshot(fromSnapshot)) {
          setHeroMode(nextMode);
          finishSwitch(nextMode, token);
          return;
        }

        setHeroTransition({
          fromMode: currentMode,
          fromSnapshot,
          phase: "out-prep",
          toMode: nextMode,
          toSnapshot: null,
        });

        waitForFrames(1, () => {
          if (isDisposed || token !== transitionId) return;

          setHeroTransition({
            fromMode: currentMode,
            fromSnapshot,
            phase: "out",
            toMode: nextMode,
            toSnapshot: null,
          });

          outTimer = window.setTimeout(() => {
            if (isDisposed || token !== transitionId) return;

            flushSync(() => {
              setHeroMode(nextMode);
            });

            if (isDisposed || token !== transitionId) return;

            const immediateToSnapshot = createMotionSnapshot(heroSectionRef.current);
            const immediateReady =
              isValidMotionSnapshot(immediateToSnapshot) &&
              isSnapshotModeConsistent(immediateToSnapshot, nextMode);

            if (immediateReady) {
              startInPhase(immediateToSnapshot);
              return;
            }

            captureMotionSnapshotWithRetry(heroSectionRef.current, nextMode, 8, (strictToSnapshot) => {
              startInPhase(strictToSnapshot);
            });

            function startInPhase(toSnapshot) {
              if (isDisposed || token !== transitionId) return;

              if (!isValidMotionSnapshot(toSnapshot)) {
                finishSwitch(nextMode, token);
                return;
              }

              setHeroTransition({
                fromMode: currentMode,
                fromSnapshot,
                phase: "in-prep",
                toMode: nextMode,
                toSnapshot,
              });

              waitForFrames(1, () => {
                if (isDisposed || token !== transitionId) return;

                setHeroTransition({
                  fromMode: currentMode,
                  fromSnapshot,
                  phase: "in",
                  toMode: nextMode,
                  toSnapshot,
                });

                inTimer = window.setTimeout(() => finishSwitch(nextMode, token), IN_PHASE_MS);
              });
            }
          }, OUT_SWITCH_MS);
        });
      }
    }

    function handleBreakpointChange(event) {
      const nextMode = event.matches ? "desktop" : "mobile";
      startModeSwitch(nextMode);
    }

    setHeroMode(currentMode);
    mediaQuery.addEventListener("change", handleBreakpointChange);

    return () => {
      isDisposed = true;
      clearTransitionTimers();
      mediaQuery.removeEventListener("change", handleBreakpointChange);
    };
  }, []);

  useLayoutEffect(() => {
    const sectionElement = heroSectionRef.current;
    if (!sectionElement) return undefined;

    let animationFrame;

    function refreshStableSnapshot() {
      if (heroTransition) return;
      const strictSnapshot = createMotionSnapshot(sectionElement);
      if (isValidMotionSnapshot(strictSnapshot)) {
        stableSnapshotsRef.current[heroMode] = strictSnapshot;
      }
    }

    function scheduleRefresh() {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(refreshStableSnapshot);
    }

    scheduleRefresh();

    const resizeObserver = new ResizeObserver(scheduleRefresh);
    resizeObserver.observe(sectionElement);

    const mainCard = sectionElement.querySelector(".hero-main-card");
    if (mainCard) {
      resizeObserver.observe(mainCard);
    }

    window.addEventListener("resize", scheduleRefresh);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleRefresh);
    };
  }, [heroMode, heroMotionTick, heroTransition, isHeroDeckOpen, activeHeroCard]);

  return (
    <Layout>
      <section
        ref={heroSectionRef}
        className={`relative mx-auto max-w-7xl overflow-visible px-6 pb-12 pt-6 md:px-10 ${
          isHeroDeckOpen ? "hero-is-open" : ""
        } ${heroTransition ? "hero-is-transitioning" : ""} z-20`}
      >
        {["top", "bottom"].map((placement) => (
          <svg
            key={placement}
            aria-hidden="true"
            className={`hero-wave-field hero-wave-field-${placement} pointer-events-none absolute z-0 text-[#9cc9ff]`}
            viewBox="0 0 1180 220"
            preserveAspectRatio="none"
          >
            <path
              d={HERO_WAVE_TOP_PATH}
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="5"
              opacity="0.56"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={HERO_WAVE_BOTTOM_PATH}
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="5"
              opacity="0.56"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        ))}

        <div
          ref={heroGridRef}
          className="hero-home-grid relative z-10 grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.95fr)] xl:grid-cols-[1fr_0.95fr]"
        >
          <div className="relative z-30">
            <div className="relative z-10 mb-7 inline-flex items-center gap-2 text-[16px] font-medium uppercase tracking-[0.08em] text-[#6faef2]">
              <Sparkles size={16} />
              Unofficial Fan Archive
            </div>

            <Link
              to="/100-reasons"
              className="title-reveal relative z-10 block max-w-[clamp(18rem,52vw,36rem)] text-[clamp(48px,12.4vw,88px)] font-bold uppercase leading-[0.95] tracking-[-0.04em]"
            >
              <span aria-hidden="true" className="absolute inset-0 z-0 block" />
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute left-[0.055em] top-[1.93em] z-20 h-[0.72em] w-[0.72em] -translate-x-1/2 -translate-y-1/2 text-[#9cc9ff]"
                viewBox="0 0 80 80"
              >
                <g fill="currentColor">
                  <path d="M 36.5 40 L 39.25 8 L 40.75 8 L 43.5 40 Z" />
                  <path d="M 36.5 40 L 39.25 8 L 40.75 8 L 43.5 40 Z" transform="rotate(45 40 40)" />
                  <path d="M 36.5 40 L 39.25 8 L 40.75 8 L 43.5 40 Z" transform="rotate(90 40 40)" />
                  <path d="M 36.5 40 L 39.25 8 L 40.75 8 L 43.5 40 Z" transform="rotate(135 40 40)" />
                  <path d="M 36.5 40 L 39.25 8 L 40.75 8 L 43.5 40 Z" transform="rotate(180 40 40)" />
                  <path d="M 36.5 40 L 39.25 8 L 40.75 8 L 43.5 40 Z" transform="rotate(225 40 40)" />
                  <path d="M 36.5 40 L 39.25 8 L 40.75 8 L 43.5 40 Z" transform="rotate(270 40 40)" />
                  <path d="M 36.5 40 L 39.25 8 L 40.75 8 L 43.5 40 Z" transform="rotate(315 40 40)" />
                  <circle cx="40" cy="40" r="5.5" />
                </g>
              </svg>
              <span className="block whitespace-nowrap">100 reasons</span>
              <span className="block whitespace-nowrap">to love</span>
              <span className="block whitespace-nowrap">Ryan Gosling</span>
              <span aria-hidden="true" className="title-reveal-blue pointer-events-none absolute inset-0 block text-[#6faef2]">
                <span className="block whitespace-nowrap">100 reasons</span>
                <span className="block whitespace-nowrap">to love</span>
                <span className="block whitespace-nowrap">Ryan Gosling</span>
              </span>
            </Link>

            <div className="relative z-10 mt-7 h-[4px] w-40 rounded-full bg-[#6faef2]" />

            <p className="relative z-10 mt-8 text-[clamp(22px,2.2vw,30px)] leading-[1.2]">
              <span className="block whitespace-nowrap sm:hidden">Ryan Gosling centered</span>
              <span className="block whitespace-nowrap sm:hidden">collection of films,</span>
              <span className="block whitespace-nowrap sm:hidden">interviews and images.</span>

              <span className="hidden whitespace-nowrap sm:block lg:hidden">Ryan Gosling centered collection</span>
              <span className="hidden whitespace-nowrap sm:block lg:hidden">of films, interviews and images.</span>

              <span className="hidden whitespace-nowrap lg:block xl:hidden">Ryan Gosling centered collection of films,</span>
              <span className="hidden whitespace-nowrap lg:block xl:hidden">interviews and images.</span>

              <span className="hidden whitespace-nowrap xl:block">Ryan Gosling centered collection of films,</span>
              <span className="hidden whitespace-nowrap xl:block">interviews and images.</span>
            </p>
          </div>

          <div className="relative z-40 flex justify-center">
            <HeroImageDeck
              isOpen={isHeroDeckOpen}
              setIsOpen={setIsHeroDeckOpen}
              activeCard={activeHeroCard}
              setActiveCard={setActiveHeroCard}
              isDesktop={heroMode === "desktop"}
              isTransitioning={Boolean(heroTransition)}
              layoutShift=""
            />
          </div>
        </div>
      </section>

      <HeroTransitionOverlay transition={heroTransition} />

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-4 md:px-10">
        <SectionHeader
          icon={<Film className="text-[#6faef2]" />}
          title="Filmography"
          linkTo="/filmography"
          linkText="View all films"
        />

        <FilmGrid films={films} />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-8 md:px-10">
        <SectionHeader
          icon={<Quote className="text-[#6faef2]" />}
          title="Interviews"
          linkTo="/interviews"
          linkText="View all interviews"
        />

        <ArchiveLayoutGrid
          aspectRatio={3.15}
          columnRules={[
            { min: 1100, columns: 4 },
            { min: 760, columns: 3 },
            { min: 520, columns: 2 },
            { min: 0, columns: 1 },
          ]}
          gap={14}
          items={interviewEras}
          renderItem={(era) => <EraCard era={era} />}
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-8 md:px-10">
        <SectionHeader
          icon={<Camera className="text-[#6faef2]" />}
          title="Gallery"
          linkTo="/gallery"
          linkText="View full gallery"
        />

        <ArchiveLayoutGrid
          aspectRatio={0.86}
          columnRules={[
            { min: 768, columns: 5 },
            { min: 0, columns: 2 },
          ]}
          items={gallery}
          renderItem={(item) => <GalleryCard item={item} />}
        />
      </section>
    </Layout>
  );
}

function FilmographyPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-4 md:px-10">
        <BackButton to="/" label="Back to Home" icon={<Film />} />
        <PageTitle className="mb-8">Filmography</PageTitle>
        <FilmGrid films={films} />
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
        <BackButton to="/filmography" label="Back to Filmography" icon={<Film />} />

        <div className="detail-grid mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <DetailImage src={film.img} alt={film.title} />

          <div className="detail-copy">
            <p className="text-[16px] text-[#6b5948]">{film.year}</p>
            <DetailTitle className="uppercase md:leading-none">{film.title}</DetailTitle>
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
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-4 md:px-10">
        <BackButton to="/" label="Back to Home" icon={<Quote />} />
        <PageTitle>Interviews</PageTitle>
        <p className="mb-12 max-w-3xl text-[22px] leading-[1.6] text-[#5a4631]">
          Interviews are organised by film era, so that each group reflects a distinct phase in Ryan Gosling’s screen image, publicity, and performance style.
        </p>

        <div className="space-y-16">
          {interviewEras.map((era) => (
            <section key={era.slug}>
              <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                <div className="min-w-0">
                  <p className="text-[16px] uppercase tracking-[0.08em] text-[#6faef2]">{era.year}</p>
                  <h3 className="text-[clamp(32px,7vw,42px)] font-bold uppercase leading-[1.05] tracking-[-0.03em]">
                    {era.era}
                  </h3>
                  <p className="mt-3 max-w-3xl text-[18px] leading-[1.6] text-[#5a4631]">{era.description}</p>
                </div>

                <Link
                  to={`/interviews/${era.slug}`}
                  className="shrink-0 rounded-full bg-[#9cc9ff] px-4 py-2 text-[15px] font-medium text-[#3b2a1a] shadow-[0_8px_18px_rgba(59,42,26,0.12)] transition hover:-translate-y-0.5 hover:bg-[#fff1b5]"
                >
                  View era
                </Link>
              </div>

              <ArchiveLayoutGrid
                aspectRatio={1.06}
                columnRules={[
                  { min: 1100, columns: 4 },
                  { min: 760, columns: 3 },
                  { min: 520, columns: 2 },
                  { min: 0, columns: 1 },
                ]}
                className="mt-0"
                gap={18}
                items={era.items}
                renderItem={(item) => <InterviewItemCard eraSlug={era.slug} item={item} />}
              />
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
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <p className="text-[22px]">Interview era not found.</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-4 md:px-10">
        <BackButton to="/interviews" label="Back to Interviews" icon={<Quote />} />

        <div className="detail-copy mt-8">
          <p className="text-[16px] uppercase tracking-[0.08em] text-[#6faef2]">
            {era.year} · {era.film}
          </p>
          <DetailTitle className="uppercase">{era.era}</DetailTitle>
          <p className="mt-6 max-w-3xl text-[22px] leading-[1.6] text-[#5a4631]">
            {era.description}
          </p>
        </div>

        <ArchiveLayoutGrid
          aspectRatio={1.06}
          className="mt-12"
          columnRules={[
            { min: 1100, columns: 4 },
            { min: 760, columns: 3 },
            { min: 520, columns: 2 },
            { min: 0, columns: 1 },
          ]}
          gap={18}
          items={era.items}
          renderItem={(item) => <InterviewItemCard eraSlug={era.slug} item={item} />}
        />
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
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <p className="text-[22px]">Interview not found.</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-4 md:px-10">
        <BackButton to={`/interviews/${era.slug}`} label={`Back to ${era.era}`} icon={<Quote />} />

        <div className="detail-grid mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <DetailImage src={interview.image} alt={interview.title} />

          <div className="detail-panel rounded-[2rem] bg-[#f8e6a2] p-8 shadow-[0_10px_22px_rgba(59,42,26,0.08)]">
            <p className="text-[15px] uppercase tracking-[0.08em] text-[#6faef2]">{era.era}</p>
            <DetailTitle>{interview.title}</DetailTitle>
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
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-4 md:px-10">
        <BackButton to="/" label="Back to Home" icon={<Camera />} />
        <PageTitle>Gallery</PageTitle>
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

        <ArchiveLayoutGrid
          aspectRatio={0.86}
          columnRules={[
            { min: 1280, columns: 5 },
            { min: 768, columns: 3 },
            { min: 0, columns: 2 },
          ]}
          items={filteredGallery}
          renderItem={(item) => <GalleryCard item={item} />}
        />
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
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <p className="text-[22px]">Image not found.</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-4 md:px-10">
        <BackButton to="/gallery" label="Back to Gallery" icon={<Camera />} />

        <div className="detail-grid mt-8 grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <DetailImage src={item.img} alt={item.title} />

          <div className="detail-panel rounded-[2rem] bg-[#f8e6a2] p-8 shadow-[0_10px_22px_rgba(59,42,26,0.08)]">
            <p className="text-[16px] text-[#6b5948]">Gallery Entry · {item.date}</p>
            <DetailTitle>{item.title}</DetailTitle>
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
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-4 md:px-10">
        <BackButton to="/" label="Back to Home" icon={<Sparkles />} />
        <PageTitle>
          100 Reasons to Love Ryan Gosling
        </PageTitle>

        <p className="mb-10 max-w-3xl text-[22px] leading-[1.6] text-[#5a4631]">
          A directory-style archive of 100 reasons. Each entry can be opened and edited later.
        </p>

        <ArchiveLayoutGrid
          aspectRatio={1.18}
          columnRules={[
            { min: 1280, columns: 4 },
            { min: 768, columns: 2 },
            { min: 0, columns: 1 },
          ]}
          items={reasons}
          renderItem={(reason) => (
            <Link
              to={`/100-reasons/${reason.slug}`}
              className="archive-card card-copy flex h-full flex-col rounded-[1.25rem] bg-[#f8e6a2] p-5 shadow-[0_10px_22px_rgba(59,42,26,0.08)] transition hover:-translate-y-1"
            >
              <p className="text-[14px] uppercase tracking-[0.08em] text-[#6faef2]">
                Reason {reason.number}
              </p>

              <CardTitle className="mt-2 text-[24px] font-bold leading-[1.12]">
                {reason.title}
              </CardTitle>

              <p className="mt-3 text-[16px] leading-[1.5] text-[#5a4631]">
                {reason.summary}
              </p>
            </Link>
          )}
        />
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
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <p className="text-[22px]">Reason not found.</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-4 md:px-10">
        <BackButton to="/100-reasons" label="Back to 100 Reasons" icon={<Sparkles />} />

        <div className="detail-panel mt-8 rounded-[2rem] bg-[#f8e6a2] p-8 shadow-[0_10px_22px_rgba(59,42,26,0.08)]">
          <p className="text-[16px] uppercase tracking-[0.08em] text-[#6faef2]">
            Reason {reason.number}
          </p>

          <DetailTitle className="uppercase">
            {reason.title}
          </DetailTitle>

          <p className="mt-8 max-w-3xl text-[22px] leading-[1.7] text-[#5a4631]">
            {reason.content}
          </p>
        </div>
      </section>
    </Layout>
  );
}

function HandcraftPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-4 md:px-10">
        <BackButton to="/" label="Back to Home" icon={<Star />} />
        <PageTitle>
          Handcraft
        </PageTitle>

        <p className="mb-10 max-w-3xl text-[20px] leading-[1.6] text-[#5a4631] md:text-[22px]">
          A place for handcraft plans, sketches, and archive-style notes.
        </p>

        <ArchiveLayoutGrid
          aspectRatio={1.65}
          columnRules={[
            { min: 768, columns: 2 },
            { min: 0, columns: 1 },
          ]}
          gap={24}
          items={handcraftSections}
          renderItem={(item) => (
            <Link
              to={`/handcraft/${item.slug}`}
              className="archive-card card-copy flex h-full flex-col rounded-[2rem] bg-[#f8e6a2] p-8 shadow-[0_10px_22px_rgba(59,42,26,0.08)] transition hover:-translate-y-1"
            >
              <p className="text-[16px] uppercase tracking-[0.08em] text-[#6faef2]">
                {item.eyebrow}
              </p>
              <CardTitle className="mt-2 text-[30px] font-bold uppercase leading-[1.08] md:text-[38px]">
                {item.title}
              </CardTitle>
              <p className="mt-4 text-[18px] leading-[1.6] text-[#5a4631]">
                {item.summary}
              </p>
            </Link>
          )}
        />
      </section>
    </Layout>
  );
}

function HandcraftDetailPage() {
  const { handcraftSlug } = useParams();
  const item = handcraftSections.find((section) => section.slug === handcraftSlug);

  if (!item) {
    return (
      <Layout>
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <p className="text-[22px]">Handcraft section not found.</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-4 md:px-10">
        <BackButton to="/handcraft" label="Back to Handcraft" icon={<Star />} />

        <div className="detail-panel mt-8 rounded-[2rem] bg-[#f8e6a2] p-8 shadow-[0_10px_22px_rgba(59,42,26,0.08)]">
          <p className="text-[16px] uppercase tracking-[0.08em] text-[#6faef2]">
            {item.eyebrow}
          </p>
          <DetailTitle className="uppercase">
            {item.title}
          </DetailTitle>
          <p className="mt-8 max-w-3xl text-[20px] leading-[1.7] text-[#5a4631]">
            {item.content}
          </p>
        </div>
      </section>
    </Layout>
  );
}

function LegacyHandcraftRedirect() {
  const { handcraftSlug } = useParams();

  return <Navigate to={`/handcraft/${handcraftSlug}`} replace />;
}

function SNLPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-4 md:px-10">
        <BackButton to="/" label="Back to Home" icon={<Tv />} />
        <PageTitle className="mb-8">Saturday Night Live</PageTitle>

        <p className="mb-12 max-w-3xl text-[22px] leading-[1.6] text-[#5a4631]">
          SNL archive entries are organised by season first, then divided into individual episodes.
        </p>

        <ArchiveLayoutGrid
          aspectRatio={1.2}
          columnRules={[
            { min: 1100, columns: 3 },
            { min: 768, columns: 2 },
            { min: 0, columns: 1 },
          ]}
          gap={24}
          items={snlSeasons}
          renderItem={(season) => (
            <Link
              to={`/saturday-night-live/${season.slug}`}
              className="archive-card card-copy flex h-full flex-col rounded-[1.5rem] bg-[#f8e6a2] p-7 shadow-[0_10px_22px_rgba(59,42,26,0.08)] transition hover:-translate-y-1"
            >
              <p className="text-[15px] uppercase tracking-[0.08em] text-[#6faef2]">{season.year}</p>
              <CardTitle className="mt-2 text-[32px] font-bold uppercase leading-[1.08]">
                {season.season}
              </CardTitle>
              <p className="mt-4 text-[18px] leading-[1.6] text-[#5a4631]">{season.description}</p>
              <p className="mt-5 text-[16px] text-[#6b5948]">{season.episodes.length} episodes</p>
            </Link>
          )}
        />
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
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <p className="text-[22px]">Season not found.</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-4 md:px-10">
        <BackButton to="/saturday-night-live" label="Back to Saturday Night Live" icon={<Tv />} />

        <div className="detail-copy mt-8">
          <p className="text-[16px] uppercase tracking-[0.08em] text-[#6faef2]">{season.year}</p>
          <DetailTitle className="uppercase">{season.season}</DetailTitle>
          <p className="mt-6 max-w-3xl text-[22px] leading-[1.6] text-[#5a4631]">
            {season.description}
          </p>
        </div>

        <ArchiveLayoutGrid
          aspectRatio={0.92}
          className="mt-12"
          columnRules={[
            { min: 1100, columns: 3 },
            { min: 768, columns: 2 },
            { min: 0, columns: 1 },
          ]}
          gap={24}
          items={season.episodes}
          renderItem={(episode) => (
            <Link
              to={`/saturday-night-live/${season.slug}/${episode.slug}`}
              className="archive-card flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-[#f8e6a2] shadow-[0_10px_22px_rgba(59,42,26,0.08)] transition hover:-translate-y-1"
            >
              <img src={episode.image} alt={episode.title} className="h-[52%] w-full object-cover" />
              <div className="card-copy p-6">
                <p className="text-[15px] text-[#6b5948]">
                  {episode.episode} · {episode.date}
                </p>
                <CardTitle className="mt-2 text-[26px] font-bold leading-[1.1]">
                  {episode.title}
                </CardTitle>
                <p className="mt-3 text-[17px] text-[#5a4631]">Host: {episode.host}</p>
              </div>
            </Link>
          )}
        />
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
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <p className="text-[22px]">Episode not found.</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-4 md:px-10">
        <BackButton to={`/saturday-night-live/${season.slug}`} label={`Back to ${season.season}`} icon={<Tv />} />

        <div className="detail-grid mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <DetailImage src={episode.image} alt={episode.title} />

          <div className="detail-panel rounded-[2rem] bg-[#f8e6a2] p-8 shadow-[0_10px_22px_rgba(59,42,26,0.08)]">
            <p className="text-[15px] uppercase tracking-[0.08em] text-[#6faef2]">
              {season.season} · {episode.episode}
            </p>
            <DetailTitle>{episode.title}</DetailTitle>
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
      <ArchiveCardMotion />
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

        <Route path="/handcraft" element={<HandcraftPage />} />
        <Route path="/handcraft/:handcraftSlug" element={<HandcraftDetailPage />} />
        <Route path="/handmade-drawings" element={<Navigate to="/handcraft" replace />} />
        <Route path="/handmade-drawings/:handcraftSlug" element={<LegacyHandcraftRedirect />} />

        <Route path="/saturday-night-live" element={<SNLPage />} />
        <Route path="/saturday-night-live/:seasonSlug" element={<SNLSeasonPage />} />
        <Route path="/saturday-night-live/:seasonSlug/:episodeSlug" element={<SNLEpisodePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
