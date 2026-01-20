import Hero from "@/components/Hero";
import PrivateArchive from "@/components/PrivateArchive";
import RequestAccessModal from "@/components/RequestAccessModal";

export default function Home() {
  return (
    <main className="bg-[#111111]">
      <Hero />
      <PrivateArchive />
      <RequestAccessModal />
    </main>
  );
}
