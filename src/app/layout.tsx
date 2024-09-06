import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./_context/providers";
import { CookiesProvider } from "next-client-cookies/server";
import { Layout } from "@/components/ui/default";
import { headers } from "next/headers";

const poppins = Poppins({
  weight: ["400", "300", "200", "100", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const aHeadersList = headers();

  const pathname = aHeadersList.get("x-current-path");

  const isLoginPage = pathname?.includes("/login");
  
  return (
    <html lang="en">
      <body className={poppins.className}>
        <CookiesProvider>
          <Providers>
            {isLoginPage ? children : <Layout>{children}</Layout>}
          </Providers>
        </CookiesProvider>
      </body>
    </html>
  );
}
