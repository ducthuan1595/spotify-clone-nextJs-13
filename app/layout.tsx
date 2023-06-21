import "./globals.css";
import { Figtree } from "next/font/google";
import Sidebar from "@/components/sidebar";
import SupabaseProvider from "@/providers/supabasProvider";
import UserProvider from "@/providers/userProvider";
import ModalProvider from "@/providers/modalProvider";

const inter = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify",
  description: "Listen music with me!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
          <Sidebar >
            {children}
          </Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
