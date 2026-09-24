import { useState } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  HelpCircle,
  MessageSquare,
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    category: 'Гарантія',
    question: 'Чи злітає нове авто з дилерської гарантії при оклейці плівкою?',
    answer:
      'Ні. Оклейка кузова антигравійною поліуретановою плівкою є зовнішнім захисним покриттям і не вносить конструктивних змін в автомобіль. Більше того, дилери самі рекомендують захищати ЛФП одразу після виїзду з салону.',
  },
  {
    id: '2',
    category: 'Матеріали',
    question: 'Який реальний термін служби антигравійної плівки та кераміки?',
    answer:
      'Преміальний поліуретан (PPF) служить від 5 до 7 років: він не жовтіє, не тріскається та має функцію самовідновлення подряпин при нагріванні. Керамічне покриття тримається від 12 до 24 місяців залежно від кількості шарів та частоти мийок.',
  },
  {
    id: '3',
    category: 'Безпека',
    question:
      'Чи можна зняти плівку через 3–5 років без шкоди для рідного лаку?',
    answer:
      'Так, абсолютно. Ми використовуємо виключно якісні поліуретанові плівки з первинним клейовим шаром. При демонтажі плівка знімається єдиним полотном і не залишає залишків клею та не пошкоджує заводський лак.',
  },
  {
    id: '4',
    category: 'Процес',
    question: 'Скільки часу займає робота і як дізнатися про статус?',
    answer:
      'Локальні роботи (полірування фар, хімчистка) займають 1 день. Повна оклейка кузова або комплексне полірування з керамікою — від 2 до 4 днів. Протягом усього процесу ми надсилаємо детальний фото- та відеозвіт у Telegram або Viber.',
  },
  {
    id: '5',
    category: 'Догляд',
    question: 'Як доглядати за автомобілем після нанесеного покриття?',
    answer:
      'Після нанесення кераміки перші 7–10 днів не рекомендується мити авто хімією (іде процес кристалізації). Надалі достатньо мити авто на двохфазних детейлінг-мийках без використання агресивних лужних складів.',
  },
];

const faqStyles = `
  .faq-premium {
    --faq-bg: #0a0a0c;
    --faq-card: #121318;
    --faq-card-soft: rgba(18, 19, 24, 0.72);
    --faq-line: #222430;
    --faq-text: #f3f4f6;
    --faq-muted: #8b8f9e;
    --faq-yellow: #ffee00;
    --faq-green: #c9cb00;
  }

  .faq-noise {
    background-image:
      radial-gradient(circle at 18% 14%, rgba(255, 238, 0, 0.065), transparent 28%),
      radial-gradient(circle at 85% 78%, rgba(255, 255, 255, 0.035), transparent 30%);
  }

  .faq-grid {
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.018) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.018) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
    -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
  }

  .faq-card {
    transition:
      border-color 0.3s ease,
      background-color 0.3s ease,
      transform 0.25s ease,
      box-shadow 0.25s ease;
  }

  .faq-card:hover {
    transform: translateY(-2px);
  }

  .faq-card-open {
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.28);
  }

  .faq-answer-grid {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.28s ease;
    will-change: grid-template-rows;
  }

  .faq-answer-grid-open {
    grid-template-rows: 1fr;
  }

  .faq-answer-inner {
    min-height: 0;
    overflow: hidden;
  }

  .faq-mobile-line {
    transition:
      height 0.35s ease,
      opacity 0.35s ease,
      background-color 0.35s ease;
  }

  .faq-mobile-number {
    font-variant-numeric: tabular-nums;
  }

  @media (max-width: 639px) {
    .faq-card:hover {
      transform: none;
    }

    .faq-grid {
      background-size: 42px 42px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .faq-card,
    .faq-answer-grid,
    .faq-mobile-line {
      transition: none !important;
    }
  }
`;

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('1');

  const toggleAccordion = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const activeIndex = Math.max(
    0,
    faqData.findIndex((item) => item.id === openId),
  );

  const activeItem = openId
    ? faqData.find((item) => item.id === openId)
    : undefined;

  return (
    <section
      id="faq"
      className="faq-premium relative isolate overflow-hidden bg-[#0a0a0c] px-4 py-24 text-white sm:px-8 sm:py-32 lg:py-36"
    >
      <style>{faqStyles}</style>

      {/* Decorative atmosphere */}
      <div
        aria-hidden="true"
        className="faq-noise pointer-events-none absolute inset-0"
      />

      <div
        aria-hidden="true"
        className="faq-grid pointer-events-none absolute inset-0 opacity-80"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[10%] top-[22%] h-52 w-52 rounded-full bg-[#ffee00]/[0.04] blur-[90px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          {/* LEFT — EDITORIAL INTRO */}
          <div className="lg:sticky lg:top-28">
            <div className="mb-7 flex items-end justify-between gap-6">
              <div>
                <p className="mb-5 inline-flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.22em] text-[#ffee00] sm:text-[10px]">
                  <span
                    className="h-px w-7 bg-[#ffee00]/60"
                    aria-hidden="true"
                  />
                  Часті запитання
                </p>

                <h2 className="portfolio-display max-w-xl text-[clamp(2rem,6vw,4.2rem)] font-black uppercase leading-[0.96] tracking-[-0.055em] text-[#f3f4f6]">
                  ВСЕ, ЩО ВАРТО
                  <span className="mt-2 block bg-gradient-to-r from-[#ffee00] via-white to-[#ffee00] bg-clip-text pb-1 text-transparent">
                    ЗНАТИ ПЕРЕД ЗАПИСОМ
                  </span>
                </h2>
              </div>
            </div>

            <p className="max-w-xl text-sm leading-[1.9] text-[#8b8f9e] sm:text-base">
              Зібрали відповіді на найпопулярніші питання клієнтів щодо
              гарантії, процесів та догляду за автомобілем.
            </p>

            {/* MOBILE ACCENT */}
            <div className="mt-8 flex items-center gap-3 sm:hidden">
              <span className="h-px w-8 bg-[#ffee00]/60" aria-hidden="true" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#686d7c]">
                Відповіді на головне
              </span>
            </div>

            {/* CONTACT CARD */}
            <div className="mt-6 rounded-[1.5rem] border border-[#222430] bg-[#121318] p-5 sm:mt-10 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#ffee00] text-[#0a0a0c]">
                  <MessageSquare size={19} strokeWidth={2.4} />
                </div>

                <div className="min-w-0">
                  <h3 className="portfolio-display text-[12px] font-black uppercase text-[#f3f4f6] sm:text-sm">
                    Залишились питання?
                  </h3>
                  <p className="mt-1 text-xs leading-[1.7] text-[#8b8f9e]">
                    Проконсультуємо та розрахуємо вартість під ваше авто за 5
                    хвилин.
                  </p>
                </div>

                <ArrowUpRight
                  className="ml-auto h-5 w-5 shrink-0 text-[#ffee00]"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* RIGHT — ACCORDION */}
          <div className="space-y-3 sm:space-y-4">
            {faqData.map((item, idx) => {
              const isOpen = openId === item.id;

              return (
                <article
                  key={item.id}
                  className={`faq-card overflow-hidden rounded-[1.35rem] border sm:rounded-[1.75rem] ${
                    isOpen
                      ? 'faq-card-open border-[#ffee00]/40 bg-[#121318]'
                      : 'border-[#222430] bg-[rgba(18,19,24,0.58)] hover:border-[#ffee00]/20'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    className="group relative w-full px-4 py-4 text-left sm:px-6 sm:py-6"
                  >
                    <div className="flex items-center gap-3 sm:gap-5">
                      {/* Mobile / desktop number rail */}
                      <div className="flex shrink-0 flex-col items-center gap-2">
                        <span
                          className={`portfolio-display faq-mobile-number text-[10px] font-black transition-colors duration-300 sm:text-xs ${
                            isOpen ? 'text-[#ffee00]' : 'text-[#4e5260]'
                          }`}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </span>

                        <span
                          className={`faq-mobile-line w-px sm:h-7 ${
                            isOpen
                              ? 'h-7 bg-[#ffee00]'
                              : 'h-3 bg-[#2a2d36] opacity-70'
                          }`}
                          aria-hidden="true"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <span
                            className={`text-[8px] font-black uppercase tracking-[0.18em] transition-colors duration-300 sm:text-[9px] ${
                              isOpen ? 'text-[#ffee00]' : 'text-[#686d7c]'
                            }`}
                          >
                            {item.category}
                          </span>

                          {isOpen && (
                            <span
                              aria-hidden="true"
                              className="h-1 w-1 rounded-full bg-[#ffee00]"
                            />
                          )}
                        </div>

                        <h3 className="portfolio-display pr-2 text-[12px] font-black uppercase leading-[1.35] tracking-[-0.02em] text-[#f3f4f6] sm:text-base lg:text-[17px]">
                          {item.question}
                        </h3>
                      </div>

                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 sm:h-11 sm:w-11 ${
                          isOpen
                            ? 'rotate-180 border-[#ffee00] bg-[#ffee00] text-[#0a0a0c]'
                            : 'border-[#2a2d36] bg-[#181a20] text-[#8b8f9e] group-hover:border-[#ffee00]/30 group-hover:text-[#ffee00]'
                        }`}
                        aria-hidden="true"
                      >
                        <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                    </div>
                  </button>

                  <div
                    id={`faq-answer-${item.id}`}
                    className={`faq-answer-grid ${
                      isOpen ? 'faq-answer-grid-open' : ''
                    }`}
                  >
                    <div className="faq-answer-inner">
                      <div className="border-t border-[#222430]/80 px-4 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
                        <div className="flex gap-3 sm:gap-4">
                          <div
                            aria-hidden="true"
                            className="mt-1 h-auto min-h-12 w-px shrink-0 bg-gradient-to-b from-[#ffee00] via-[#ffee00]/40 to-transparent"
                          />

                          <div className="min-w-0">
                            <div className="mb-3 inline-flex rounded-md border border-[#ffee00]/15 bg-[#ffee00]/[0.06] px-2.5 py-1">
                              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#ffee00]">
                                {item.category}
                              </span>
                            </div>

                            <p className="max-w-2xl text-[12px] leading-[1.85] text-[#8b8f9e] sm:text-sm">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
