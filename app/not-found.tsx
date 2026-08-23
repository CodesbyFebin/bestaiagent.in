import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: true }
};

export default function NotFound(){return <div className="shell detail"><p className="eyebrow">404</p><h1>Entity not found</h1><p className="lead">This route is not in the current public graph.</p><Link className="button buttonPrimary" href="/">Return home</Link></div>}
