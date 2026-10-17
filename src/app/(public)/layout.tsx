import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { StickySearchNavbar } from "@/components/layout/StickySearchNavbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicHeader />
      <StickySearchNavbar />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
