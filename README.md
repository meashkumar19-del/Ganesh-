# Elite Companions - Premium Intimacy Service Platform

A sophisticated, modern web application for high-profile companionship services built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Elegant Landing Page**: Luxury design with animated gradients and smooth transitions
- **Profile Browsing**: Advanced filtering by location, price range, and specialties
- **Detailed Profiles**: Comprehensive companion information with verified badges
- **Booking System**: Intuitive scheduling with real-time pricing calculations
- **Secure Messaging**: Encrypted communication interface between users and companions
- **Authentication**: Professional sign-up and login system with privacy focus
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Inter, Playfair Display)
- **Images**: Next.js Image Optimization

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
/app
  /components      # Reusable UI components
  /data           # Mock data for profiles
  /types          # TypeScript type definitions
  /profiles       # Profile browsing and detail pages
  /booking        # Booking system
  /messages       # Messaging interface
  /auth           # Authentication pages
  layout.tsx      # Root layout with navigation
  page.tsx        # Home page
  globals.css     # Global styles
```

## Key Pages

- **Home** (`/`) - Landing page with hero section and features
- **Profiles** (`/profiles`) - Browse all companions with filters
- **Profile Detail** (`/profiles/[id]`) - Individual companion details
- **Booking** (`/booking`) - Schedule appointments
- **Messages** (`/messages`) - Secure communication
- **Auth** (`/auth`) - Sign in / Sign up

## Design Philosophy

- **Luxury Aesthetic**: Deep purples, pinks, and gold accents
- **Privacy First**: Emphasis on discretion and security
- **Professional**: High-end, sophisticated user experience
- **Accessible**: Clean, readable design with proper contrast

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
colors: {
  primary: { ... },
  gold: { ... },
}
```

### Profiles

Add or modify companion profiles in `app/data/profiles.ts`

## License

Private and confidential. All rights reserved.

## Disclaimer

This is a demonstration application. All profiles and data are fictional for showcase purposes only.
