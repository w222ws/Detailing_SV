import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';

export default function App() {
  return (
    <div className="relative min-h-screen bg-bg-main text-text-main bg-grain font-sans overflow-x-hidden selection:bg-accent-yellow selection:text-bg-main">
      <Header />

      <main>
        <Hero />
        <Marquee />
      </main>
    </div>
  );
}
