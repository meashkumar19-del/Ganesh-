"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { profiles } from "../../data/profiles";

export default function ProfileDetailPage() {
  const params = useParams();
  const profile = profiles.find(p => p.id === params.id);

  if (!profile) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Profile Not Found</h1>
          <Link
            href="/profiles"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            ← Back to Profiles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/profiles"
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Profiles
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div>
            <div className="relative h-[600px] rounded-2xl overflow-hidden glass-effect">
              <Image
                src={profile.image}
                alt={profile.name}
                fill
                className="object-cover"
              />
              {profile.verified && (
                <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified Profile
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div>
            <div className="glass-effect rounded-2xl p-8">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-4xl font-serif font-bold text-white mb-2">
                  {profile.name}
                </h1>
                <p className="text-xl text-gray-400">
                  {profile.age} years old • {profile.location}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(profile.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white font-medium">{profile.rating} / 5.0</span>
                </div>
              </div>

              {/* Rate */}
              <div className="mb-8 p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl border border-purple-500/30">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-lg">Hourly Rate</span>
                  <span className="text-4xl font-bold text-gradient">
                    ${profile.rate}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">About</h2>
                <p className="text-gray-300 leading-relaxed">
                  {profile.description}
                </p>
              </div>

              {/* Languages */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Languages</h2>
                <div className="flex flex-wrap gap-3">
                  {profile.languages.map((lang) => (
                    <span
                      key={lang}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Specialties</h2>
                <div className="flex flex-wrap gap-3">
                  {profile.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-4 py-2 bg-purple-600/20 text-purple-300 rounded-lg border border-purple-500/30"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Availability</h2>
                <div className="flex flex-wrap gap-3">
                  {profile.availability.map((time) => (
                    <span
                      key={time}
                      className="px-4 py-2 bg-green-600/20 text-green-300 rounded-lg border border-green-500/30"
                    >
                      {time}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/booking?profileId=${profile.id}`}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold text-center hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
                >
                  Book Now
                </Link>
                <Link
                  href={`/messages?profileId=${profile.id}`}
                  className="flex-1 px-6 py-4 glass-effect rounded-xl text-white font-semibold text-center hover:bg-white/10 transition-all"
                >
                  Send Message
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
