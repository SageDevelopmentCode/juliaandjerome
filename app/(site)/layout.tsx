import { cookies } from "next/headers";
import SiteGate from "@/app/components/SiteGate";
import SitePageEnter from "@/app/components/SitePageEnter";
import { hasSiteAccess } from "@/lib/site-gate";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const allowed = hasSiteAccess(cookieStore);

  if (!allowed) {
    return <SiteGate />;
  }

  return <SitePageEnter>{children}</SitePageEnter>;
}
