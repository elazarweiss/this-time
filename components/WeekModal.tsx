"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { Week, Book } from "@/lib/types";

interface WeekModalProps {
  week: Week;
  book: Book;
  onClose: () => void;
}

export default function WeekModal({ week, book, onClose }: WeekModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-parchment max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo side */}
        <div className="md:w-3/5 bg-white p-4 flex items-center justify-center">
          <div className="relative w-full aspect-square">
            <Image
              src={`/photos/${week.photos[0]}`}
              alt={week.location}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Text side */}
        <div className="md:w-2/5 p-8 flex flex-col justify-between border-l border-parchment-dark">
          <div>
            {/* Book label */}
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b border-parchment-dark"
              style={{ color: book.color }}
            >
              {book.he} · {book.en}
            </div>

            {/* Location */}
            <p className="text-ink-light text-sm mb-1">
              {week.location}
            </p>

            {/* Parsha */}
            <h2 className="text-2xl text-ink-dark font-serif mb-6">
              <span className="hebrew block text-3xl mb-1">{week.parsha.he}</span>
              <span className="text-base text-ink-light">{week.parsha.en}</span>
            </h2>

            {/* Verse Hebrew */}
            <p
              className="hebrew text-xl leading-relaxed text-ink-dark mb-4 text-right"
              lang="he"
            >
              {week.verse.he}
            </p>

            {/* Verse English */}
            <p className="text-ink italic leading-relaxed mb-3 text-sm">
              "{week.verse.en}"
            </p>

            {/* Source */}
            {week.verse.source && (
              <p className="text-ink-light text-xs">
                — {week.verse.source}
              </p>
            )}
          </div>

          {/* Extra photos */}
          {week.photos.length > 1 && (
            <div className="mt-6 flex gap-2 flex-wrap">
              {week.photos.slice(1).map((photo) => (
                <div
                  key={photo}
                  className="relative w-16 h-16 border-2 border-white shadow"
                >
                  <Image
                    src={`/photos/${photo}`}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <button
            onClick={onClose}
            className="mt-8 text-ink-light text-sm hover:text-ink-dark transition-colors self-start"
          >
            ← Close
          </button>
        </div>
      </div>
    </div>
  );
}
