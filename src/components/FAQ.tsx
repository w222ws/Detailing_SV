import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

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

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('1');

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="py-24 px-4 md:px-10 max-w-7xl mx-auto relative overflow-hidden"
    >
      {/* ---------------- ДЕКОР НА ФОНЕ ---------------- */}

      {/* Мягкий неоновый свет */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[400px] h-[400px] bg-[#ffee00]/5 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Тонкие геометрические орбиты (кольца) */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] md:w-[900px] h-[600px] md:h-[900px] border border-[#ffee00]/10 rounded-full pointer-events-none z-0" />
      <div className="absolute top-[5%] right-[5%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] border border-[#ffee00]/5 rounded-full pointer-events-none z-0" />

      {/* Огромный типографический вотермарк */}
      <div className="absolute bottom-10 left-[-5%] text-[12rem] md:text-[20rem] lg:text-[25rem] font-display font-black text-white/[0.02] pointer-events-none select-none z-0 leading-none tracking-tighter">
        FAQ
      </div>

      {/* ---------------- КОНТЕНТ ---------------- */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        {/* Лівий блок з заголовком і закликом */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ffee00]/20 bg-[#ffee00]/5 mb-5 backdrop-blur-sm">
            <HelpCircle size={14} className="text-[#ffee00]" />
            <span className="font-display text-[10px] tracking-[0.2em] uppercase text-[#ffee00] font-black">
              Часті запитання
            </span>
          </div>

          {/* Увеличенный мобильный шрифт + фикс переполнения на ПК (адаптирован размер под десктоп) */}
          <h2 className="font-display text-4xl sm:text-5xl lg:text-4xl xl:text-5xl uppercase font-black tracking-tight text-[#f3f4f6] leading-[1.0] mb-5 break-words">
            ВІДПОВІДІ <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffee00] via-white to-[#ffee00] bg-size-200 animate-gradient">
              НА ВАШІ
            </span>{' '}
            <br />
            ЗАПИТАННЯ
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#8b8f9e] leading-relaxed mb-8">
            Зібрали відповіді на найпопулярніші питання клієнтів щодо гарантії,
            процесів та догляду за автомобілем.
          </p>

          {/* Преміальна картка із крутою кнопкою */}
          <div className="p-8 bg-[#121318]/90 backdrop-blur-md border border-[#222430] rounded-[2rem] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffee00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <h4 className="font-display text-xl font-black uppercase text-[#f3f4f6] mb-3 relative z-10">
              Залишились питання?
            </h4>
            <p className="font-sans text-sm text-[#8b8f9e] mb-8 relative z-10">
              Напишіть нам напряму. Безкоштовно проконсультуємо та розрахуємо
              точну вартість під ваше авто за 5 хвилин.
            </p>

            <a
              href="https://t.me/твій_нік_тут" // <--- ТУТ ВСТАВ СВІЙ ЛІНК НА ТЕЛЕГРАМ
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex items-center justify-center w-full px-8 py-4 bg-[#ffee00] text-[#0a0a0c] font-display font-black text-[11px] sm:text-xs uppercase tracking-[0.15em] rounded-xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(255,238,0,0.3)] z-10"
            >
              <span className="relative z-10">Написати в Telegram</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
            </a>
          </div>
        </div>

        {/* Правий блок — Аккордеон */}
        <div className="lg:col-span-7 space-y-4 pt-4 lg:pt-0">
          {faqData.map((item, idx) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm ${
                  isOpen
                    ? 'bg-[#121318]/90 border-[#ffee00]/40 shadow-[0_10px_30px_rgba(0,0,0,0.3)]'
                    : 'bg-[#121318]/50 border-[#222430] hover:border-[#ffee00]/20'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 select-none"
                >
                  <div className="flex items-center gap-4 sm:gap-5">
                    <span className="font-display font-black text-sm text-[#ffee00]/60 shrink-0">
                      0{idx + 1}
                    </span>
                    {/* Увеличенный шрифт вопроса для мобилок (text-lg) */}
                    <h3 className="font-display text-lg sm:text-xl uppercase font-black text-[#f3f4f6] leading-snug">
                      {item.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#222430] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'rotate-180 bg-[#ffee00] text-[#0a0a0c] border-[#ffee00]'
                        : 'text-[#8b8f9e] bg-[#1a1c24]'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {/* Розгортаємий текст */}
                {isOpen && (
                  // Увеличенный шрифт ответа (text-sm sm:text-base)
                  <div className="px-5 sm:px-6 pb-6 pt-0 font-sans text-sm sm:text-base text-[#8b8f9e] leading-relaxed border-t border-[#222430]/50 mt-2 pt-4">
                    <span className="inline-block px-2.5 py-0.5 rounded bg-[#ffee00]/10 text-[#ffee00] text-[10px] sm:text-xs font-mono uppercase mb-3">
                      {item.category}
                    </span>
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
