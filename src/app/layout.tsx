import "./globals.css";
import { Inter } from "next/font/google";
import { layoutProp } from "@/utils/types";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import { ThemeContextProvider } from "@/context/themeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Maxjn",
  description: "My Portfolio Website",
};

export default function RootLayout({ children }: layoutProp) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ThemeContextProvider>
          <div className="container">
            <NavBar />
            {children}
            <Footer />
          </div>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
