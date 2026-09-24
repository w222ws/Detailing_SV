import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { createPortal } from 'react-dom';
import {
  Armchair,
  Check,
  ChevronDown,
  Clock,
  Droplets,
  Gem,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
  type LucideIcon,
} from 'lucide-react';

/* ───────────────────────── Налаштування ───────────────────────── */

const PHONE = '+380000000000'; // ← свій номер
const INSTAGRAM_URL = 'https://www.instagram.com/'; // ← посилання на профіль бізнесу

/* ───────────────────────── Дані ───────────────────────── */

type CategoryId = 'body' | 'interior' | 'special';

interface Category {
  id: CategoryId;
  label: string;
}

interface Variant {
  label: string;
  hint?: string;
  price: number;
  from?: boolean; // «від»
}

interface Service {
  id: string;
  categoryId: CategoryId;
  icon: LucideIcon;
  title: string;
  desc: string;
  time: string;
  badge?: string;
  variants: Variant[];
  features: string[];
}

const categories: Category[] = [
  { id: 'body', label: 'Кузов і захист' },
  { id: 'interior', label: 'Салон' },
  { id: 'special', label: 'Деталі та спецпослуги' },
];

const services: Service[] = [
  {
    id: 'ppf',
    categoryId: 'body',
    icon: ShieldCheck,
    title: 'Захист бронеплівкою (PPF)',
    desc: 'Поліуретанова плівка приймає удар камінців, гілок і реагентів на себе, а лак під нею лишається як новий.',
    time: '2–4 дні',
    badge: 'Топ захист',
    variants: [
      {
        label: 'Зона ризику',
        hint: 'Капот, бампер, фари',
        price: 18000,
        from: true,
      },
      { label: 'Повний кузов', hint: 'Седан', price: 55000, from: true },
      {
        label: 'Повний кузов',
        hint: 'Кросовер / SUV',
        price: 65000,
        from: true,
      },
    ],
    features: [
      'Захист від камінців, гілок та хімії',
      'Подряпини самовідновлюються при нагріванні',
      'Повна прозорість, колір не змінюється',
      'Гарантія від пожовтіння — 5 років',
    ],
  },
  {
    id: 'ceramic',
    categoryId: 'body',
    icon: Sparkles,
    title: 'Полірування та кераміка',
    desc: 'Прибираємо павутинку й дефекти лаку, повертаємо глибину кольору та закриваємо кузов гідрофобною керамікою.',
    time: '1–2 дні',
    badge: 'Хіт продажів',
    variants: [
      { label: 'Седан / хетчбек', price: 8000 },
      { label: 'Кросовер', price: 10000 },
      { label: 'Великий позашляховик', price: 12000 },
    ],
    features: [
      'Усуваємо до 95% павутинки та подряпин',
      'Дзеркальний блиск і насичений колір',
      'Потужний гідрофобний ефект',
      'Покриття служить до 24 місяців',
    ],
  },
  {
    id: 'dry-cleaning',
    categoryId: 'interior',
    icon: Armchair,
    title: 'Детейлінг-хімчистка салону',
    desc: 'Глибоке очищення з частковим розбором салону, озонуванням і захистом матеріалів.',
    time: '1–2 дні',
    variants: [
      { label: 'Компакт / седан', price: 4500 },
      { label: 'Кросовер / позашляховик', price: 5500 },
    ],
    features: [
      'Виймаємо сидіння для повного доступу',
      'Екстракторне промивання текстилю від плям',
      'Озонування та дезінфекція кондиціонера',
      'Преміум-крем для шкіри та пластику',
    ],
  },
  {
    id: 'leather',
    categoryId: 'interior',
    icon: Gem,
    title: 'Захист і кераміка шкіри',
    desc: 'Захисний склад на шкірі: проти потертостей, профарбування джинсами та розтріскування.',
    time: '5–8 годин',
    variants: [
      { label: 'Передній комплект', hint: '2 сидіння + кермо', price: 3000 },
      {
        label: 'Повний салон',
        hint: 'Усі сидіння + картки дверей',
        price: 5500,
      },
    ],
    features: [
      'Матовий невидимий бар’єр на шкірі',
      'Не дає профарбовуватись джинсами',
      'Запобігає передчасному розтріскуванню',
    ],
  },
  {
    id: 'engine',
    categoryId: 'special',
    icon: Wrench,
    title: 'Детейлінг підкапотного простору',
    desc: 'Безпечна мийка двигуна діелектричними гелями з наступною консервацією та захистом від вологи.',
    time: '4–5 годин',
    variants: [{ label: 'Будь-яке легкове авто', price: 2000 }],
    features: [
      'Безпечна діелектрична хімія',
      'Просушка турбосушкою — без вологи в електриці',
      'Консервація пластику й патрубків антистатиком',
    ],
  },
  {
    id: 'glass',
    categoryId: 'special',
    icon: Droplets,
    title: 'Полірування скла й антидощ',
    desc: 'Прибираємо водний камінь і потертості від двірників, наносимо водовідштовхувальне покриття.',
    time: '4–6 годин',
    variants: [
      { label: 'Лобове скло', hint: 'Полірування + антидощ', price: 2500 },
      { label: 'Усі скла по колу', price: 4500 },
    ],
    features: [
      'Чітка видимість під час зливи',
      'Краплі самі злітають зі швидкості від 60 км/год',
      'Менший знос щіток склоочисника',
    ],
  },
];

// Рахуємо один раз на рівні модуля, а не на кожному рендері
const groups = categories.map((c) => ({
  ...c,
  items: services.filter((s) => s.categoryId === c.id),
}));

const nf = new Intl.NumberFormat('uk-UA');
const money = (n: number) => `${nf.format(n)}\u00A0₴`;
const variantPrice = (v: Variant) =>
  v.from ? `від ${money(v.price)}` : money(v.price);
const startPrice = (s: Service) => {
  const min = Math.min(...s.variants.map((v) => v.price));
  const isFrom = s.variants.length > 1 || s.variants.some((v) => v.from);
  return isFrom ? `від ${money(min)}` : money(min);
};

/* ───────────────────────── Стилі та анімації ─────────────────────────
   Усе рухається тільки через transform/opacity (GPU), нічого не
   перемальовується. Ключові кадри тут, тому tailwind.config чіпати не треба. */

const css = `
/* фон: статичне тепле світло */
.svc-glow{background:
  radial-gradient(60% 45% at 88% 0%,rgba(255,238,0,.07),transparent 70%),
  radial-gradient(50% 40% at 0% 100%,rgba(255,238,0,.045),transparent 70%)}

/* фон для тач-екранів: повільний відблиск світла по «кузову» */
.svc-sweep{display:none;position:absolute;top:-25%;bottom:-25%;left:0;width:34%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.05) 45%,rgba(255,238,0,.09) 55%,transparent);
  transform:translate3d(-160%,0,0) skewX(-18deg);
  animation:svc-sweep 11s ease-in-out infinite;will-change:transform}
@media (hover:none),(pointer:coarse){.svc-sweep{display:block}}

/* фон для миші: «інспекційна лампа» — світло слідує за курсором
   і проявляє мікроподряпини лаку, як у справжньому детейлінгу */
.svc-light{position:absolute;left:0;top:0;width:560px;height:560px;overflow:hidden;border-radius:9999px;
  opacity:0;transition:opacity .45s ease;will-change:transform,opacity;
  background:radial-gradient(circle,rgba(255,238,0,.12),transparent 65%);
  -webkit-mask-image:radial-gradient(circle,#000 30%,transparent 70%);
  mask-image:radial-gradient(circle,#000 30%,transparent 70%)}
.svc-scratch{position:absolute;left:0;top:0;will-change:transform;
  background-image:
    repeating-radial-gradient(circle at 22% 30%,transparent 0 5px,rgba(255,255,255,.17) 5px 5.7px),
    repeating-radial-gradient(circle at 71% 58%,transparent 0 7px,rgba(255,238,0,.2) 7px 7.6px),
    repeating-radial-gradient(circle at 46% 84%,transparent 0 9px,rgba(255,255,255,.13) 9px 9.6px)}

/* ставимо анімації на паузу, коли секція поза екраном */
.svc-root[data-paused="true"] *{animation-play-state:paused!important}

/* кільце-підказка навколо кнопки вибору: 3 імпульси і тиша */
.svc-ring{animation:svc-ring 2.4s ease-out .8s 3 both}

/* реакція на дії користувача */
.svc-fade{animation:svc-fade .35s ease both}

/* шторка вибору: знизу на мобілці, по центру на десктопі */
.svc-sheet{max-height:86vh;max-height:86dvh;transform:translate3d(0,100%,0);opacity:0;
  transition:transform .34s cubic-bezier(.22,1,.36,1),opacity .25s ease;
  padding-bottom:env(safe-area-inset-bottom,0px)}
.svc-sheet[data-shown="true"]{transform:none;opacity:1}
@media (min-width:768px){
  .svc-sheet{transform:translate3d(0,18px,0) scale(.96);padding-bottom:0}
  .svc-sheet[data-shown="true"]{transform:none}
}

@keyframes svc-sweep{0%{transform:translate3d(-160%,0,0) skewX(-18deg)}60%,100%{transform:translate3d(420%,0,0) skewX(-18deg)}}
@keyframes svc-ring{0%{opacity:.6;transform:scale(1)}100%{opacity:0;transform:scale(1.035,1.28)}}
@keyframes svc-fade{from{opacity:0}to{opacity:1}}

@media (prefers-reduced-motion:reduce){
  .svc-sweep,.svc-ring,.svc-fade{animation:none!important}
  .svc-ring{opacity:0}
  .svc-sheet{transition-duration:.01s}
}
`;

/* ───────────────────────── Хуки ───────────────────────── */

// Монтуємо шторку на час анімації закриття, потім прибираємо з DOM
function usePresence(open: boolean, ms: number) {
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setEntered(true)),
      );
      return () => cancelAnimationFrame(id);
    }
    setEntered(false);
    const t = setTimeout(() => setMounted(false), ms);
    return () => clearTimeout(t);
  }, [open, ms]);

  return { mounted: mounted || open, shown: open && entered };
}

/* ───────────────────────── Шторка вибору послуги ───────────────────────── */

interface PickerProps {
  open: boolean;
  activeId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}

function ServicePicker({ open, activeId, onSelect, onClose }: PickerProps) {
  const { mounted, shown } = usePresence(open, 340);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);
  const drag = useRef({ startY: 0, dy: 0, active: false });

  // Блокуємо скрол сторінки без «стрибка» від зникнення скролбара
  useEffect(() => {
    if (!open) return;
    const sw = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;
    document.body.style.overflow = 'hidden';
    if (sw > 0) document.body.style.paddingRight = `${sw}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open]);

  // Esc закриває, Tab не виходить за межі шторки
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      // Include visually hidden radios: sr-only inputs remain keyboard focusable.
      const items = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // При відкритті фокус на поточну послугу і центруємо її у списку
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => {
      const list = listRef.current;
      const el = activeRef.current;
      if (list && el) {
        list.scrollTop = Math.max(
          0,
          el.offsetTop - list.clientHeight / 2 + el.offsetHeight / 2,
        );
      }
      el?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  // Свайп вниз за «ручку» — напряму через style, без ре-рендерів
  const onHandleDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    drag.current = { startY: e.clientY, dy: 0, active: true };
    e.currentTarget.setPointerCapture(e.pointerId);
    if (panelRef.current) panelRef.current.style.transition = 'none';
  };
  const onHandleMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !panelRef.current) return;
    const dy = Math.max(0, e.clientY - drag.current.startY);
    drag.current.dy = dy;
    panelRef.current.style.transform = `translate3d(0,${dy}px,0)`;
  };
  const onHandleUp = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const el = panelRef.current;
    if (el) {
      el.style.transition = '';
      el.style.transform = '';
    }
    if (drag.current.dy > 90) onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center md:items-center md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-picker-title"
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/75 transition-opacity duration-300 ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        ref={panelRef}
        data-shown={shown}
        className="svc-sheet relative flex w-full flex-col rounded-t-[28px] border border-white/10 bg-[#0d0d10] md:max-w-lg md:rounded-[28px]"
      >
        {/* ручка (тільки мобільні) */}
        <div
          onPointerDown={onHandleDown}
          onPointerMove={onHandleMove}
          onPointerUp={onHandleUp}
          onPointerCancel={onHandleUp}
          className="flex h-9 shrink-0 touch-none items-center justify-center md:hidden"
        >
          <span className="h-1 w-10 rounded-full bg-white/25" />
        </div>

        <div className="flex shrink-0 items-center justify-between gap-4 px-5 pb-2 pt-1 md:pt-6">
          <h3
            id="service-picker-title"
            className="text-xl font-extrabold tracking-tight text-white"
          >
            Оберіть послугу
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрити"
            className="grid h-11 w-11 place-items-center rounded-full bg-white/[0.07] text-neutral-300 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffee00]/70"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          ref={listRef}
          className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-4 md:pb-5"
        >
          {groups.map((g) => (
            <div key={g.id} className="mb-2">
              <p className="px-2 pb-2 pt-4 text-sm font-semibold text-neutral-500">
                {g.label}
              </p>
              <div className="space-y-1.5">
                {g.items.map((s) => {
                  const active = s.id === activeId;
                  const Ic = s.icon;
                  return (
                    <button
                      key={s.id}
                      ref={active ? activeRef : undefined}
                      type="button"
                      onClick={() => onSelect(s.id)}
                      aria-pressed={active}
                      className={`flex w-full items-center gap-3.5 rounded-2xl border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffee00]/70 ${
                        active
                          ? 'border-[#ffee00]/50 bg-[#ffee00]/[0.07]'
                          : 'border-transparent hover:bg-white/[0.05] active:bg-white/[0.08]'
                      }`}
                    >
                      <span
                        className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${
                          active
                            ? 'bg-[#ffee00] text-black'
                            : 'bg-white/[0.07] text-[#ffee00]'
                        }`}
                      >
                        <Ic className="h-6 w-6" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[15px] font-semibold leading-snug text-white">
                          {s.title}
                        </span>
                        <span className="mt-1 flex items-center gap-3 text-xs text-neutral-400">
                          <span className="font-semibold text-neutral-300">
                            {startPrice(s)}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {s.time}
                          </span>
                        </span>
                      </span>
                      {active && (
                        <Check className="h-5 w-5 shrink-0 text-[#ffee00]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* ───────────────────────── Секція ───────────────────────── */

export default function Services() {
  const [serviceId, setServiceId] = useState(services[0].id);
  const [variantIdx, setVariantIdx] = useState(0);
  const [pickerOpen, setPickerOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const scratchRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  const service = services.find((s) => s.id === serviceId) ?? services[0];
  const Icon = service.icon;
  const serviceIndex = services.findIndex((item) => item.id === service.id);
  const serviceCategory = categories.find(
    (item) => item.id === service.categoryId,
  );

  const closePicker = useCallback(() => setPickerOpen(false), []);

  const pickService = (id: string) => {
    if (id !== serviceId) {
      setServiceId(id);
      setVariantIdx(0);
    }
    setPickerOpen(false);
  };

  // Повертаємо фокус на кнопку після закриття шторки
  useEffect(() => {
    if (wasOpen.current && !pickerOpen) {
      triggerRef.current?.focus({ preventScroll: true });
    }
    wasOpen.current = pickerOpen;
  }, [pickerOpen]);

  // Фон: пауза поза екраном + «лампа» за курсором (без ре-рендерів React)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        section.dataset.paused = entry.isIntersecting ? 'false' : 'true';
      },
      { rootMargin: '120px' },
    );
    io.observe(section);

    const light = lightRef.current;
    const scratch = scratchRef.current;
    const canHover = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    ).matches;
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let stopLight = () => {};

    if (light && scratch && canHover && !reduce) {
      const HALF = 280; // половина розміру .svc-light
      let tx = 0;
      let ty = 0;
      let cx = 0;
      let cy = 0;
      let lastX = 0;
      let lastY = 0;
      let raf = 0;
      let seen = false;

      const apply = () => {
        const ox = cx - HALF;
        const oy = cy - HALF;
        light.style.transform = `translate3d(${ox}px,${oy}px,0)`;
        // текстура рухається в протилежний бік — тож «приклеєна» до сторінки
        scratch.style.transform = `translate3d(${-ox}px,${-oy}px,0)`;
      };

      const tick = () => {
        cx += (tx - cx) * 0.16;
        cy += (ty - cy) * 0.16;
        apply();
        raf =
          Math.abs(tx - cx) + Math.abs(ty - cy) > 0.4
            ? requestAnimationFrame(tick)
            : 0;
      };

      const retarget = () => {
        const r = section.getBoundingClientRect();
        tx = lastX - r.left;
        ty = lastY - r.top;
        if (!raf) raf = requestAnimationFrame(tick);
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType === 'touch') return;
        lastX = e.clientX;
        lastY = e.clientY;
        retarget();
        if (!seen) {
          seen = true;
          cx = tx;
          cy = ty;
          apply();
        }
        light.style.opacity = '1';
      };
      const onLeave = () => {
        light.style.opacity = '0';
      };
      const onScroll = () => {
        if (seen) retarget();
      };

      const fit = () => {
        scratch.style.width = `${section.offsetWidth}px`;
        scratch.style.height = `${section.offsetHeight}px`;
      };
      fit();
      const ro = new ResizeObserver(fit);
      ro.observe(section);

      section.addEventListener('pointermove', onMove, { passive: true });
      section.addEventListener('pointerleave', onLeave);
      window.addEventListener('scroll', onScroll, { passive: true });

      stopLight = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        section.removeEventListener('pointermove', onMove);
        section.removeEventListener('pointerleave', onLeave);
        window.removeEventListener('scroll', onScroll);
      };
    }

    return () => {
      io.disconnect();
      stopLight();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="svc-root relative bg-[#08080a] px-4 py-16 text-neutral-100 sm:px-8 md:py-24"
    >
      <style>{css}</style>

      {/* ФОН */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="svc-glow absolute inset-0" />
        <div className="svc-sweep" />
        <div ref={lightRef} className="svc-light">
          <div ref={scratchRef} className="svc-scratch" />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl text-center">
          <p className="mb-5 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#ffee00] sm:gap-3 sm:text-[10px] sm:tracking-[0.22em]">
            <span className="h-px w-7 bg-[#ffee00]/60" aria-hidden="true" />
            Догляд за авто — на рівень вище
            <span className="h-px w-7 bg-[#ffee00]/60" aria-hidden="true" />
          </p>

          <h2 className="portfolio-display bg-gradient-to-r from-[#ffee00] via-white to-[#ffee00] bg-clip-text text-[2.5rem] font-black uppercase leading-[0.98] tracking-[-0.055em] text-transparent sm:text-6xl lg:text-7xl">
            Що зробимо для вашого авто
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-[1.9] text-[#8b8f9e] sm:text-base">
            Оберіть послугу та варіант — вартість і час покажемо одразу.
          </p>
        </header>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setPickerOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={pickerOpen}
          className="group relative mx-auto mt-9 flex min-h-[76px] w-full max-w-2xl items-center justify-center gap-4 overflow-hidden rounded-[24px] border border-[#ffee00]/35 bg-[linear-gradient(120deg,rgba(255,238,0,0.09),rgba(255,255,255,0.025)_52%,rgba(255,238,0,0.04))] px-4 py-3 text-center shadow-[0_16px_60px_rgba(0,0,0,0.24)] transition duration-300 hover:-translate-y-0.5 hover:border-[#ffee00]/70 hover:shadow-[0_20px_70px_rgba(255,238,0,0.09)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffee00]/70 sm:mt-11 sm:px-6 sm:py-4"
        >
          <span className="svc-ring pointer-events-none absolute inset-0 rounded-[24px] border border-[#ffee00]" />
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#ffee00] text-black shadow-[0_5px_24px_rgba(255,238,0,0.22)] sm:h-14 sm:w-14">
            <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
          </span>
          <span className="min-w-0">
            <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#ffee00]">
              Обрати послугу
            </span>
            <span className="mt-1 block text-base font-bold leading-snug text-white sm:text-lg">
              {service.title}
            </span>
          </span>
          <ChevronDown className="absolute right-4 h-5 w-5 shrink-0 text-[#ffee00] transition-transform duration-200 group-hover:translate-y-0.5 sm:right-5" />
        </button>

        <div
          key={service.id}
          className="svc-fade relative mx-auto mt-8 grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#101014]/85 p-5 shadow-[0_28px_100px_rgba(0,0,0,0.42)] backdrop-blur-md sm:mt-10 sm:rounded-[32px] sm:p-8 lg:grid-cols-[1fr_0.92fr] lg:gap-10 lg:p-10"
        >
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#ffee00]/60 to-transparent" />
          <div className="flex flex-col items-center text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ffee00]">
              {String(serviceIndex + 1).padStart(2, '0')}
              <span className="mx-2 text-white/25">/</span>
              {serviceCategory?.label}
            </p>
            <h3 className="mt-4 max-w-xl text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-[2.5rem]">
              {service.title}
            </h3>
            {service.badge && (
              <span className="mt-4 inline-flex rounded-full border border-[#ffee00]/25 bg-[#ffee00]/[0.08] px-3 py-1 text-xs font-bold text-[#ffee00]">
                {service.badge}
              </span>
            )}
            <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-300 sm:text-[17px]">
              {service.desc}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-neutral-400">
              <Clock className="h-4 w-4 text-[#ffee00]" aria-hidden="true" />
              Термін виконання: {service.time}
            </p>

            <div className="mt-8 w-full border-t border-white/[0.08] pt-6">
              <h4 className="mb-4 text-center text-sm font-semibold text-white/80">
                Що входить
              </h4>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-left text-sm leading-relaxed text-neutral-300 sm:text-[15px]"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#ffee00]/[0.12] text-[#ffee00]">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <fieldset className="mt-8 min-w-0 border-t border-white/[0.08] pt-7 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <legend className="mb-4 w-full text-center text-sm font-semibold text-neutral-300">
              Оберіть варіант
            </legend>
            <div className="space-y-2">
              {service.variants.map((variant, index) => {
                const active = index === variantIdx;
                return (
                  <label
                    key={`${variant.label}-${variant.hint ?? ''}`}
                    className="block cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`variant-${service.id}`}
                      checked={active}
                      onChange={() => setVariantIdx(index)}
                      className="peer sr-only"
                    />
                    <span
                      className={`flex min-h-[68px] items-center gap-3 rounded-2xl border px-3.5 py-3 transition duration-200 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-[#ffee00]/80 sm:px-4 ${
                        active
                          ? 'border-[#ffee00]/50 bg-[#ffee00]/[0.08] shadow-[inset_0_0_24px_rgba(255,238,0,0.035)]'
                          : 'border-white/[0.08] bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.045]'
                      }`}
                    >
                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors ${
                          active ? 'border-[#ffee00]' : 'border-white/25'
                        }`}
                        aria-hidden="true"
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-full bg-[#ffee00] transition-transform duration-200 ${
                            active ? 'scale-100' : 'scale-0'
                          }`}
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold leading-snug text-white sm:text-[15px]">
                          {variant.label}
                        </span>
                        {variant.hint && (
                          <span className="mt-1 block text-xs leading-snug text-neutral-400 sm:text-sm">
                            {variant.hint}
                          </span>
                        )}
                      </span>
                      <span
                        className={`shrink-0 whitespace-nowrap text-sm font-extrabold tabular-nums sm:text-base ${
                          active ? 'text-[#ffee00]' : 'text-neutral-200'
                        }`}
                      >
                        {variantPrice(variant)}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
            <p className="mt-4 text-center text-xs leading-relaxed text-neutral-400 sm:text-sm">
              Остаточну вартість підтвердимо після огляду авто.
            </p>
          </fieldset>
        </div>

        <div className="mx-auto mt-8 flex w-full max-w-5xl flex-col items-center gap-4 text-center sm:mt-10 md:flex-row md:justify-center md:gap-8">
          <a
            href={`tel:${PHONE}`}
            className="inline-flex min-h-14 w-full max-w-md items-center justify-center rounded-2xl bg-[#ffee00] px-7 py-3.5 text-base font-extrabold text-black shadow-[0_12px_36px_rgba(255,238,0,0.17)] transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_44px_rgba(255,238,0,0.2)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080a] md:w-auto md:min-w-52"
          >
            Записатися
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center text-sm font-semibold text-neutral-300 underline decoration-white/25 underline-offset-4 transition-colors hover:text-[#ffee00] hover:decoration-[#ffee00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffee00]/70 md:inline-flex md:text-base"
          >
            Instagram
          </a>
        </div>
      </div>

      <ServicePicker
        open={pickerOpen}
        activeId={service.id}
        onSelect={pickService}
        onClose={closePicker}
      />
    </section>
  );
}
