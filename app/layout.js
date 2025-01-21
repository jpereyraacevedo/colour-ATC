import "./globals.css";
import { ClassProvider } from "./Context";


export const metadata = {
  title: "A Todo Color | Tintometría",
  description: "A Todo Color pinturerias",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logo-black.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logo-black.png" />
        <link rel="shortcut icon" href="/images/logo-black.png" />
      </head>
      <body
        className={`antialiased bg-container min-h-screen`}
      >
        <ClassProvider>
          {children}
        </ClassProvider>
      </body>
    </html>
  );
}
