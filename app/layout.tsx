import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "ClipLoad — Video tools",
  description: "Инструменты для видео, которыми вы владеете или имеете право пользоваться."
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="ru"><body>{children}</body></html>;
}