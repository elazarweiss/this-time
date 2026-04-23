"use client";

import { useState, useRef } from "react";
import type { Week, Book } from "@/lib/types";
import PhotoPin from "./PhotoPin";
import WeekModal from "./WeekModal";

interface TimelineProps {
  weeks: Week[];
  books: Book[];
}

// Deterministic layout — seeded per week id so it's stable across renders
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const SPACING = 220;   // px between weeks
const PADDING = 160;   // left/right padding
const WIRE_HEIGHT = 480; // total height of the timeline strip

export default function Timeline({ weeks, books }: TimelineProps) {
  const [activeWeek, setActiveWeek] = useState<Week | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const totalWidth = PADDING * 2 + weeks.length * SPACING;

  function bookFor(week: Week): Book {
    return books.find((b) => b.id === week.book) ?? books[0];
  }

  // Build book section markers
  const bookMarkers: { book: Book; x: number }[] = [];
  books.forEach((book) => {
    const firstWeekInBook = weeks.find(
      (w) => w.id >= book.weekRange[0] && w.id <= book.weekRange[1]
    );
    if (firstWeekInBook) {
      const idx = weeks.indexOf(firstWeekInBook);
      bookMarkers.push({ book, x: PADDING + idx * SPACING - 30 });
    }
  });

  return (
    <>
      <div
        ref={scrollRef}
        className="timeline-scroll overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing select-none"
        style={{ height: WIRE_HEIGHT }}
        onMouseDown={(e) => {
          const el = scrollRef.current;
          if (!el) return;
          const startX = e.pageX - el.offsetLeft;
          const scrollLeft = el.scrollLeft;
          const onMove = (ev: MouseEvent) => {
            el.scrollLeft = scrollLeft - (ev.pageX - el.offsetLeft - startX);
          };
          const onUp = () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
          };
          window.addEventListener("mousemove", onMove);
          window.addEventListener("mouseup", onUp);
        }}
      >
        <div className="relative" style={{ width: totalWidth, height: WIRE_HEIGHT }}>
          {/* === WIRE === */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width={totalWidth}
            height={WIRE_HEIGHT}
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient id="wireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                {books.map((book, i) => (
                  <stop
                    key={book.id}
                    offset={`${(i / (books.length - 1)) * 100}%`}
                    stopColor={book.color}
                    stopOpacity="0.8"
                  />
                ))}
              </linearGradient>
            </defs>

            {/* Main wire line */}
            <line
              x1={PADDING / 2}
              y1={WIRE_HEIGHT / 2}
              x2={totalWidth - PADDING / 2}
              y2={WIRE_HEIGHT / 2}
              stroke="url(#wireGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Week tick marks */}
            {weeks.map((week, i) => {
              const x = PADDING + i * SPACING + 68; // center of photo card
              return (
                <line
                  key={week.id}
                  x1={x}
                  y1={WIRE_HEIGHT / 2 - 6}
                  x2={x}
                  y2={WIRE_HEIGHT / 2 + 6}
                  stroke={bookFor(week).color}
                  strokeWidth="1.5"
                  opacity="0.5"
                />
              );
            })}
          </svg>

          {/* === BOOK LABELS === */}
          {bookMarkers.map(({ book, x }) => (
            <div
              key={book.id}
              className="absolute flex flex-col items-center z-20"
              style={{
                left: x,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <div
                className="bg-parchment border px-3 py-1 rounded shadow-sm text-center"
                style={{ borderColor: book.color }}
              >
                <span
                  className="block text-xs font-bold tracking-wide uppercase"
                  style={{ color: book.color }}
                >
                  {book.en}
                </span>
                <span className="block hebrew text-sm" style={{ color: book.color }} lang="he">
                  {book.he}
                </span>
              </div>
            </div>
          ))}

          {/* === PHOTO PINS === */}
          {weeks.map((week, i) => {
            const r = seededRandom(week.id);
            const above = i % 2 === 0;
            const rotation = (r - 0.5) * 8; // ±4 degrees
            const offset = 30 + r * 60;      // 30–90px from wire
            const x = PADDING + i * SPACING;

            return (
              <PhotoPin
                key={week.id}
                week={week}
                book={bookFor(week)}
                position={x}
                above={above}
                rotation={rotation}
                offset={offset}
                onClick={() => setActiveWeek(week)}
              />
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {activeWeek && (
        <WeekModal
          week={activeWeek}
          book={bookFor(activeWeek)}
          onClose={() => setActiveWeek(null)}
        />
      )}
    </>
  );
}
