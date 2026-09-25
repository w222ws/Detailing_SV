import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, MapPin, Phone, Send } from 'lucide-react';

const PHONE = '+380000000000';
const FORMATTED_PHONE = '+38000000000';
const ADDRESS = 'Успенська площа, 11, Дніпро';

const TELEGRAM_URL = 'https://t.me/your_username';
const INSTAGRAM_URL = 'https://instagram.com/your_profile';
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

const navigation = [
  { label: 'Послуги', href: '#services' },
  { label: 'Портфоліо', href: '#portfolio' },
  { label: 'Процес', href: '#process' },
  { label: 'FAQ', href: '#faq' },
];

type CopyStatus = 'idle' | 'copied' | 'error';

export default function Contact() {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      if (resetTimer.current !== undefined)
        window.clearTimeout(resetTimer.current);
    },
    [],
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PHONE);
      setCopyStatus('copied');
      if (resetTimer.current !== undefined)
        window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => setCopyStatus('idle'), 2200);
    } catch {
      setCopyStatus('error');
      if (resetTimer.current !== undefined)
        window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => setCopyStatus('idle'), 3200);
    }
  };

  return (
    <footer
      id="contacts"
      className="relative isolate overflow-hidden border-t border-white/[.07] bg-[#08080a] text-white select-none"
    >
      {/* Делікатне апаратне неонове сяйво на бекграунді без лагів */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_45%_at_100%_0%,rgba(255,238,0,.05),transparent_75%)]"
      />

      <div className="mx-auto max-w-7xl px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-16 sm:px-8 sm:pt-20 lg:px-10 lg:pt-24">
        {/* Монолітна сітка: Ліва частина ширша, щоб заголовок дихав і не перетинався з правим блоком */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 items-start">
          {/* ЛІВА ЧАСТЬ: Брендинг, Опис та Навігація */}
          <div className="flex flex-col items-start w-full">
            <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.2em] text-[#ffee00]">
              <span className="h-px w-7 bg-[#ffee00]/60" aria-hidden="true" />
              SM Detailing · Dnipro
            </p>

            {/* Твій фірмовий заголовок-титан з адаптивним розміром під твій шрифт */}
            <h2 className="font-display mt-5 w-full text-3xl sm:text-5xl lg:text-[4.2rem] font-black uppercase leading-[0.95] tracking-tight">
              ЗВ'ЯЗОК <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffee00] via-white to-[#ffee00] bg-size-200 animate-gradient">
                З НАМИ
              </span>{' '}
              <br />
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#a5a6ad] sm:text-base">
              Від відновлення заводського блиску до преміального ультра-захисту
              кузова. Ми знаємо, як повернути вашому автомобілю вигляд з
              автосалону.
            </p>

            <nav
              aria-label="Footer navigation"
              className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
            >
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-sm font-medium text-white/60 transition-colors hover:text-[#ffee00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffee00]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* ПРАВА ЧАСТЬ: Інтерактивний преміальний хаб */}
          <div className="grid gap-3 sm:grid-cols-2 w-full">
            {/* Картка 1: Гаряча лінія (на всю ширину блоку) */}
            <section className="relative overflow-hidden rounded-[24px] border border-[#ffee00]/20 bg-[linear-gradient(120deg,rgba(255,238,0,.05),rgba(255,255,255,.015)_55%,rgba(255,238,0,.015))] p-5 sm:col-span-2 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#ffee00] text-[#101010]">
                    <Phone
                      className="h-5 w-5"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#ffee00]">
                      СТУДІЯ НА ЗВ'ЯЗКУ
                    </p>
                    <a
                      href={`tel:${PHONE}`}
                      className="font-display mt-1 inline-flex min-h-9 items-center text-[clamp(1rem,3.5vw,1.375rem)] font-black tracking-tight text-white hover:text-[#ffee00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffee00]"
                    >
                      {FORMATTED_PHONE}
                    </a>

                    <p className="text-xs text-white/45 mt-0.5">
                      Преміальний сервіс та запис за телефоном
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-white/15 bg-black/20 px-4 text-sm font-semibold text-white transition-[transform,border-color] hover:-translate-y-0.5 hover:border-[#ffee00]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffee00] sm:w-auto active:scale-[0.98]"
                >
                  {copyStatus === 'copied' ? (
                    <Check
                      className="h-4 w-4 text-[#ffee00]"
                      aria-hidden="true"
                    />
                  ) : (
                    <Copy
                      className="h-4 w-4 text-[#ffee00]"
                      aria-hidden="true"
                    />
                  )}
                  {copyStatus === 'copied' ? 'Скопійовано' : 'Копіювати'}
                </button>
              </div>
            </section>

            {/* Картка 2: Telegram Чат */}
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[112px] items-center justify-between gap-4 rounded-[22px] border border-white/[.09] bg-[#111114] p-5 transition-[transform,border-color] hover:-translate-y-0.5 hover:border-[#ffee00]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffee00] active:scale-[0.98]"
            >
              <span className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#ffee00]/[.08] text-[#ffee00]">
                  <Send
                    className="h-[18px] w-[18px] translate-x-[-1px] translate-y-[1px]"
                    aria-hidden="true"
                  />
                </span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[.16em] text-white/40">
                    ШВИДКИЙ ЧАТ
                  </span>
                  <span className="mt-1 block text-sm font-bold text-white group-hover:text-[#ffee00] transition-colors">
                    Консультація в Telegram
                  </span>
                </span>
              </span>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>

            {/* Картка 3: Instagram Профіль без зовнішніх пакетів */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[112px] items-center justify-between gap-4 rounded-[22px] border border-white/[.09] bg-[#111114] p-5 transition-[transform,border-color] hover:-translate-y-0.5 hover:border-[#ffee00]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffee00] active:scale-[0.98] overflow-hidden relative"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-[#f9ce34]/3 via-[#ee2a7b]/5 to-[#6228d7]/5 transition-opacity duration-500 pointer-events-none" />
              <span className="flex items-center gap-4 z-10">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#ffee00]/[.08] text-[#ffee00]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[18px] w-[18px]"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle
                      cx="17.5"
                      cy="6.5"
                      r=".8"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[.16em] text-white/40">
                    НАШІ РОБОТИ
                  </span>
                  <span className="mt-1 block text-sm font-bold text-white group-hover:text-[#ffee00] transition-colors">
                    Портфоліо в Instagram
                  </span>
                </span>
              </span>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 z-10"
                aria-hidden="true"
              />
            </a>

            {/* Картка 4: Локація на карті */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[100px] items-center justify-between gap-4 rounded-[22px] border border-white/[.09] bg-[#111114] p-5 transition-[transform,border-color] hover:-translate-y-0.5 hover:border-[#ffee00]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffee00] sm:col-span-2 active:scale-[0.98]"
            >
              <span className="flex min-w-0 items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#ffee00]/[.08] text-[#ffee00]">
                  <MapPin className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-[.16em] text-white/40">
                    ЛОКАЦІЯ СТУДІЇ
                  </span>
                  <span className="mt-1 block truncate text-sm font-extrabold text-white sm:text-base">
                    {ADDRESS}
                  </span>
                </span>
              </span>
              <span className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-2 text-xs font-bold uppercase tracking-[.1em] text-[#ffee00]">
                Карта <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>

        {/* Копірайт подвал */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/[.07] pt-6 text-xs text-white/40 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 SM Detailing. Всі права захищені.</span>
          <span>Преміальний детейлінг · Дніпро, Україна</span>
        </div>
      </div>
    </footer>
  );
}
