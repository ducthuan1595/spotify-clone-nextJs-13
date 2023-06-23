import "./globals.css";
import { Figtree } from "next/font/google";
import Sidebar from "@/components/sidebar";
import SupabaseProvider from "@/providers/supabasProvider";
import UserProvider from "@/providers/userProvider";
import ModalProvider from "@/providers/modalProvider";
import ToastProvider from "@/providers/toastPriveder";
import getSongsByUserId from "@/actions/getSongByUserId";
import Player from "@/components/player";

const inter = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify",
  description: "Listen music with me!",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();
    
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
          <Sidebar songs={userSongs}>
            {children}
          </Sidebar>
          <Player />
          </UserProvider>
          <ToastProvider />
        </SupabaseProvider>
      </body>
    </html>
  );
}
