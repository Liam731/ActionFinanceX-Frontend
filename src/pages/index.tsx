import { Inter } from "next/font/google";
import Tabs from "@/components/Tabs";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col ${inter.className} text-white mb-20`}>
      <Tabs />
    </main>
  );
}
