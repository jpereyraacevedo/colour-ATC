import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "A Todo Color",
  description: "A Todo Color pinturerias",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/png" href="/images.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-container min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
