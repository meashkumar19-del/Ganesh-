"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { profiles } from "../data/profiles";

function BookingContent() {
  const searchParams = useSearchParams();
  const profileId = searchParams.get("profileId");
  const profile = profileId ? profiles.find(p => p.id === profileId) : null;

  const [selectedProfile, setSelectedProfile] = useState(profile?.id || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("2");
  const [location, setLocation] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (profile) {
      setSelectedProfile(profile.id);
    }
  }, [profile]);

  const selectedProfileData = profiles.find(p => p.id === selectedProfile);
  const totalAmount = selectedProfileData ? selectedProfileData.rate * parseInt(duration) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="glass-effect rounded-3xl p-12">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-serif font-bold text-white mb-4">
              Booking Request Submitted!
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Your booking request has been received. You will receive a confirmation 
              within 24 hours via your registered email and phone number.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/profiles"
                className="px-8 py-3 glass-effect rounded-full text-white font-medium hover:bg-white/10 transition-all"
              >
                Browse More Profiles
              </Link>
              <Link
                href="/"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium hover:shadow-lg transition-all"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            <span className="text-gradient">Book Your Experience</span>
          </h1>
          <p className="text-xl text-gray-400">
            Complete the form below to request a booking
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="glass-effect rounded-2xl p-8">
              {/* Profile Selection */}
              <div className="mb-6">
                <label className="block text-white font-semibold mb-3">
                  Select Companion *
                </label>
                <select
                  value={selectedProfile}
                  onChange={(e) => setSelectedProfile(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="" className="bg-gray-900">Choose a companion...</option>
                  {profiles.map((p) => (
                    <option key={p.id} value={p.id} className="bg-gray-900">
                      {p.name} - ${p.rate}/hr
                    </option>
                  ))}
                </select>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-white font-semibold mb-3">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-3">
                    Time *
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <label className="block text-white font-semibold mb-3">
                  Duration (hours) *
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="1" className="bg-gray-900">1 hour</option>
                  <option value="2" className="bg-gray-900">2 hours</option>
                  <option value="3" className="bg-gray-900">3 hours</option>
                  <option value="4" className="bg-gray-900">4 hours</option>
                  <option value="6" className="bg-gray-900">6 hours</option>
                  <option value="8" className="bg-gray-900">8 hours (overnight)</option>
                  <option value="24" className="bg-gray-900">24 hours</option>
                </select>
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-white font-semibold mb-3">
                  Meeting Location *
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  placeholder="Hotel name, restaurant, or address"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              {/* Special Requests */}
              <div className="mb-6">
                <label className="block text-white font-semibold mb-3">
                  Special Requests (Optional)
                </label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  rows={4}
                  placeholder="Any special preferences or requirements..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                />
              </div>

              {/* Terms */}
              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-5 h-5 rounded border-white/10 bg-white/5 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-gray-300 text-sm">
                    I agree to the terms and conditions, privacy policy, and understand 
                    that all bookings are subject to availability and confirmation. I am 
                    21 years of age or older.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!selectedProfile}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Booking Request
              </button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-2xl p-8 sticky top-24">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Booking Summary
              </h2>

              {selectedProfileData ? (
                <>
                  {/* Profile Preview */}
                  <div className="mb-6">
                    <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                      <Image
                        src={selectedProfileData.image}
                        alt={selectedProfileData.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {selectedProfileData.name}
                    </h3>
                    <p className="text-gray-400">
                      {selectedProfileData.location}
                    </p>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                    <div className="flex justify-between text-gray-300">
                      <span>Hourly Rate</span>
                      <span>${selectedProfileData.rate}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Duration</span>
                      <span>{duration} hour{parseInt(duration) > 1 ? 's' : ''}</span>
                    </div>
                    {date && (
                      <div className="flex justify-between text-gray-300">
                        <span>Date</span>
                        <span>{new Date(date).toLocaleDateString()}</span>
                      </div>
                    )}
                    {time && (
                      <div className="flex justify-between text-gray-300">
                        <span>Time</span>
                        <span>{time}</span>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xl font-semibold text-white">Total</span>
                    <span className="text-3xl font-bold text-gradient">
                      ${totalAmount}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-4">
                    <p className="text-sm text-gray-300">
                      Payment will be processed after booking confirmation. 
                      Cancellation policy applies.
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400">
                    Select a companion to see booking details
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
