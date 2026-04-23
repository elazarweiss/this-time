import weeksData from "@/data/weeks.json";
import booksData from "@/data/books.json";
import type { Week, Book } from "@/lib/types";
import Timeline from "@/components/Timeline";

const weeks = weeksData as Week[];
const books = booksData as Book[];

export default function Home() {
  return (
    <main className="min-h-screen bg-parchment">
      {/* ── INTRO ── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center border-b border-parchment-dark">
        <div className="max-w-2xl">
          <p className="text-ink-light text-sm tracking-[0.3em] uppercase mb-6">
            Summer 2020 – Fall 2022
          </p>
          <h1 className="text-6xl md:text-8xl font-serif text-ink-dark leading-tight mb-4">
            This Time
          </h1>
          <p className="text-xl md:text-2xl text-ink-light font-serif italic mb-8">
            A Journey Through the Holy Land
          </p>
          <div className="w-16 border-t border-wire mx-auto mb-8" />
          <p className="text-ink leading-relaxed text-sm md:text-base max-w-lg mx-auto mb-10">
            In the summer of 2020, I hit the road with a rundown car, a tent,
            and the week&apos;s Parasha as my compass. What started as a
            soul-searching trip turned into a yearlong journey through Israel,
            Palestine, and the shades of gray and green in between.
          </p>
          <p className="text-ink-light text-sm">— Elazar Weiss</p>
          <div className="mt-16 animate-bounce text-ink-light text-sm">
            <span className="block">scroll to walk the exhibition</span>
            <span className="block mt-1">↓</span>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="relative bg-parchment">
        <div className="py-4 px-8 border-b border-parchment-dark flex items-center justify-between">
          <h2 className="text-ink-light text-xs tracking-widest uppercase">
            The Journey · {weeks.length} weeks · 5 books of the Torah
          </h2>
          <p className="text-ink-light text-xs hidden md:block">
            Click any photo to read its verse
          </p>
        </div>
        <Timeline weeks={weeks} books={books} />
      </section>

      {/* ── BOOKS ── */}
      <section className="border-t border-parchment-dark">
        {books.map((book) => (
          <div
            key={book.id}
            className="px-8 md:px-16 py-12 border-b border-parchment-dark"
          >
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-baseline gap-4 mb-4">
                <h3
                  className="text-3xl font-serif"
                  style={{ color: book.color }}
                >
                  {book.en}
                </h3>
                <span className="hebrew text-2xl text-ink-light" lang="he">
                  {book.he}
                </span>
                <span className="text-ink-light text-sm italic">
                  {book.subtitle}
                </span>
              </div>
              <p className="text-ink leading-relaxed text-sm">{book.narrative}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-8 py-8 text-center text-ink-light text-xs border-t border-parchment-dark">
        <p>© Elazar Weiss · Exhibited at Yale Slifka Center, February 2023</p>
      </footer>
    </main>
  );
}
