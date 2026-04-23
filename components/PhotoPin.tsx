"use client";

import Image from "next/image";
import type { Week, Book } from "@/lib/types";

interface PhotoPinProps {
  week: Week;
  book: Book;
  position: number;       // x offset in px along the wire
  above: boolean;         // true = pin above wire, false = below
  rotation: number;       // degrees, ±
  offset: number;         // y distance from wire in px
  onClick: () => void;
}

export default function PhotoPin({
  week,
  book,
  position,
  above,
  rotation,
  offset,
  onClick,
}: PhotoPinProps) {
  const WIRE_Y = 0; // relative to the wire, component is positioned via parent

  const top = above
    ? `calc(50% - ${offset + 160}px)`
    : `calc(50% + ${offset}px)`;

  return (
    <div
      className="absolute cursor-pointer group"
      style={{
        left: position,
        top,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: above ? "bottom center" : "top center",
      }}
      onClick={onClick}
    >
      {/* Pin dot */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full z-10 shadow"
        style={{
          backgroundColor: book.color,
          top: above ? "auto" : -4,
          bottom: above ? -4 : "auto",
        }}
      />

      {/* Photo with white mat */}
      <div className="bg-white p-2 shadow-lg group-hover:shadow-xl transition-shadow duration-200 w-36">
        <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
          <Image
            src={`/photos/${week.photos[0]}`}
            alt={week.location}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="144px"
          />
        </div>
        {/* Tombstone label */}
        <div className="mt-1.5 px-0.5">
          <p className="text-[9px] text-ink-light truncate">{week.location}</p>
          <p className="text-[9px] text-ink-light hebrew text-right" lang="he">
            {week.parsha.he}
          </p>
        </div>
      </div>
    </div>
  );
}
