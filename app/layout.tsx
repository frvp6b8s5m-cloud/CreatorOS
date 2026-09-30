import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata={title:"CreatorOS — Creator Intelligence",description:"A cinematic intelligence command center for creators."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}