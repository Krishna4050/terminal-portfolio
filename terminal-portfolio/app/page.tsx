import Terminal from "../components/Terminal";
{/* import Testimonials from "../components/Testimonials"; */ }
import SoundToggle from "../components/SoundToggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      <Terminal />
      {/*<Testimonials />*/}
      <SoundToggle />
    </main>
  );
}
