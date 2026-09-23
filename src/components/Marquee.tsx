import React from 'react';

export default function Marquee() {
  // Линия 1: Массивный плотный текст (Идет влево)
  const lineOne = [
    'ГЛИБОКЕ ПОЛІРУВАННЯ КУЗОВА',
    'НАНЕСЕННЯ КЕРАМІКИ 9H',
    'ПРЕМІАЛЬНА ХІМЧИСТКА САЛОНУ',
    'БРОНЮВАННЯ АНТИГРАВІЙНОЮ ПЛІВКОЮ',
  ];

  // Линия 2: Скоростной контурный 3D-текст (Идет вправо и накладывается сверху)
  const lineTwo = [
    'ПРОФЕСІЙНА ДЕТЕЙЛІНГ МИЙКА',
    'ЗАХИСТ СКЛА ТА ДИСКІВ КВАРЦОМ',
    'БЕЗКОМПРОМІСНИЙ РУЧНИЙ ПІДХІД',
    'ДЗЕРКАЛЬНИЙ БЛИСК ТА ЗАХИСТ',
  ];

  return (
    // font-display (Unbounded) делает геометрию букв брутальной и сбитой
    <section className="w-full bg-[#0a0a0c] py-16 md:py-24 flex flex-col font-display overflow-hidden relative z-20 bg-grain">
      {/* КИНЕМАТОГРАФИЧЕСКИЕ МАСКИ ЗАТЕМНЕНИЯ ПО БОКАМ (Мягко растворяют текст в темноте) */}
      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0a0a0c] via-[#0a0a0c]/10 to-transparent z-30 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0a0a0c] via-[#0a0a0c]/10 to-transparent z-30 pointer-events-none" />

      {/* ==========================================================================
         ЛИНИЯ 1: ВЛЕВО // МАТОВЫЙ СЕРЫЙ ТЕКСТ (Идеально выверенный контраст #262936)
         ========================================================================== */}
      <div className="w-full overflow-hidden whitespace-nowrap select-none tracking-tighter">
        <div className="animate-marquee inline-flex gap-16 pr-16 pointer-events-none">
          <div className="flex gap-16 shrink-0 items-center">
            {lineOne.map((item, index) => (
              <span
                key={`l1-orig-${index}`}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase font-black text-[#262936] hover:text-[#ffee00] transition-colors duration-300"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex gap-16 shrink-0 items-center" aria-hidden="true">
            {lineOne.map((item, index) => (
              <span
                key={`l1-dup-${index}`}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase font-black text-[#262936] hover:text-[#ffee00] transition-colors duration-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ==========================================================================
         ЛИНИЯ 2: ВПРАВО // ЧИСТЫЙ КОНТУРНЫЙ ТЕКСТ (ЛЕТИТ СКОРОСТНО)
         -mt-3 md:-mt-6 заставляет ряды слегка пересекаться краями, создавая 3D объем
         ========================================================================== */}
      <div className="w-full overflow-hidden whitespace-nowrap select-none tracking-tighter -mt-3 md:-mt-6 relative z-10">
        <div className="animate-marquee-fast inline-flex gap-16 pr-16 pointer-events-none">
          <div className="flex gap-16 shrink-0 items-center">
            {lineTwo.map((item, index) => (
              <span
                key={`l2-orig-${index}`}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase font-black text-transparent text-stroke-neon"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex gap-16 shrink-0 items-center" aria-hidden="true">
            {lineTwo.map((item, index) => (
              <span
                key={`l2-dup-${index}`}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase font-black text-transparent text-stroke-neon"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
