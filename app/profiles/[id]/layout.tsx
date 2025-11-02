import { profiles } from "../../data/profiles";

export function generateStaticParams() {
  return profiles.map((profile) => ({
    id: profile.id,
  }));
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
