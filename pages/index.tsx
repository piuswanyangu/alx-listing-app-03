// home page
import React, { useMemo, useState } from "react";
import { PROPERTYLISTINGSAMPLE, HERO_BG } from "@/constants";
import PropertyCard from "@/components/property/PropertyCard";
import Pill from "@/components/ui/Pill";
import type { PropertyProps } from "@/interfaces";

const FILTERS = [
  "All",
  "Luxury Villa",
  "Self Checkin",
  "Beachfront",
  "Pool",
  "Mountain View",
  "Pet Friendly",
  "City Center",
  "Safari",
];

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [query, setQuery] = useState<string>("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROPERTYLISTINGSAMPLE.filter((p: PropertyProps) => {
      // filter by pill
      const matchesFilter =
        selectedFilter === "All" ||
        p.category.some((c) => c.toLowerCase().includes(selectedFilter.toLowerCase())) ||
        p.name.toLowerCase().includes(selectedFilter.toLowerCase());

      // filter by search query (name or city)
      const matchesQuery =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.address.city.toLowerCase().includes(q) ||
        p.address.state.toLowerCase().includes(q) ||
        p.address.country.toLowerCase().includes(q);

      return matchesFilter && matchesQuery;
    });
  }, [selectedFilter, query]);

  return (
    <div>
      {/* HERO */}
      <section
        className="relative bg-gray-800 text-white"
        aria-label="Hero"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-75"
          style={{ backgroundImage: `url(${HERO_BG})` }}
          role="img"
          aria-hidden
        />
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-28 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
              Find your favorite place here!
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-indigo-100">
              The best prices for over 2 million properties worldwide.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="#listings"
                className="bg-indigo-600 hover:bg-indigo-700 inline-block px-5 py-3 rounded-md font-medium shadow-sm"
              >
                Browse listings
              </a>
              <a
                href="#filters"
                className="inline-block px-5 py-3 rounded-md bg-white text-indigo-700 font-medium hover:bg-gray-100"
              >
                Explore filters
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section id="filters" className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            {FILTERS.map((f) => (
              <Pill
                key={f}
                label={f}
                active={f === selectedFilter}
                onClick={() => setSelectedFilter(f)}
              />
            ))}
          </div>

          <div className="w-full sm:w-auto">
            <label htmlFor="searchTop" className="sr-only">Search</label>
            <input
              id="searchTop"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by property, city, country..."
              className="w-full sm:w-64 border rounded-full px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>
      </section>

      {/* LISTINGS */}
      <section id="listings" className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-500">
              No properties match your filters.
            </div>
          ) : (
            filtered.map((p) => <PropertyCard key={p.name + p.address.city} property={p} />)
          )}
        </div>
      </section>
    </div>
  );
}
