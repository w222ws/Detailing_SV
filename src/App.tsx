import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import FAQ from './components/FAQ';

export default function App() {
  return (
    <div className="relative min-h-screen bg-bg-main text-text-main bg-grain font-sans overflow-x-hidden selection:bg-accent-yellow selection:text-bg-main">
      <Header />

      <main>
        <Hero />
        <Marquee />
        <Services />
        <Portfolio />
        <FAQ />
      </main>
    </div>
  );
}
