"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { profiles } from "../data/profiles";

export default function ProfilesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  // Get unique locations and specialties
  const locations = ["all", ...new Set(profiles.map(p => p.location))];
  const allSpecialties = profiles.flatMap(p => p.specialties);
  const specialties = ["all", ...new Set(allSpecialties)];

  // Filter profiles
  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === "all" || profile.location === selectedLocation;
    const matchesPrice = priceRange === "all" || 
                        (priceRange === "low" && profile.rate < 550) ||
                        (priceRange === "medium" && profile.rate >= 550 && profile.rate < 650) ||
                        (priceRange === "high" && profile.rate >= 650);
    const matchesSpecialty = selectedSpecialty === "all" || 
                            profile.specialties.includes(selectedSpecialty);

    return matchesSearch && matchesLocation && matchesPrice && matchesSpecialty;
  });

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            <span className="text-gradient">Browse Profiles</span>
          </h1>
          <p className="text-xl text-gray-400">
            Discover our exclusive selection of verified companions
          </p>
        </div>

        {/* Filters */}
        <div className="glass-effect rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc} className="bg-gray-900">
                    {loc === "all" ? "All Locations" : loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Price Range
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value="all" className="bg-gray-900">All Prices</option>
                <option value="low" className="bg-gray-900">Under $550/hr</option>
                <option value="medium" className="bg-gray-900">$550-$650/hr</option>
                <option value="high" className="bg-gray-900">$650+/hr</option>
              </select>
            </div>

            {/* Specialty */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Specialty
              </label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                {specialties.map(spec => (
                  <option key={spec} value={spec} className="bg-gray-900">
                    {spec === "all" ? "All Specialties" : spec}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredProfiles.length} of {profiles.length} companions
          </p>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProfiles.map((profile) => (
            <Link
              key={profile.id}
              href={`/profiles/${profile.id}`}
              className="glass-effect rounded-2xl overflow-hidden hover-lift group"
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={profile.image}
                  alt={profile.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {profile.verified && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-1">
                      {profile.name}
                    </h3>
                    <p className="text-gray-400">{profile.age} • {profile.location}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-white font-medium">{profile.rating}</span>
                  </div>
                </div>

                <p className="text-gray-400 mb-4 line-clamp-2">
                  {profile.description}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.specialties.slice(0, 3).map((specialty) => (
                    <span
                      key={specialty}
                      className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* Rate */}
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-2xl font-bold text-gradient">
                    ${profile.rate}/hr
                  </span>
                  <span className="text-purple-400 font-medium group-hover:text-purple-300 transition-colors">
                    View Profile →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredProfiles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No profiles match your criteria</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedLocation("all");
                setPriceRange("all");
                setSelectedSpecialty("all");
              }}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium hover:shadow-lg transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
