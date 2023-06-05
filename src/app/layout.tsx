import "./globals.css";
import { Inter } from "next/font/google";
import { layoutProp } from "@/utils/types";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import { ThemeContextProvider } from "@/context/themeContext";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Maxjn",
  description: "My Portfolio Website",
};

export default function RootLayout({ children }: layoutProp) {
  return (
    <>
      <html
        lang="en"
        suppressHydrationWarning={true}
        className={inter.className}
      >
        <body suppressHydrationWarning={true}>
          <ThemeContextProvider>
            <AuthProvider>
              <div className={`container`}>
                <NavBar />
                {children}
                <Footer />
              </div>
            </AuthProvider>
          </ThemeContextProvider>
        </body>
      </html>
    </>
  );
}
