import { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
// Импортируем твой чистый прозрачный PNG
import logoImg from '../assets/logo.avif';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Плавный трекинг скролла для эффекта Floating Island
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Блокировка скролла всей страницы при открытом меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Послуги', href: '#services' },
    { name: 'Портфоліо', href: '#portfolio' },
    { name: 'Процес', href: '#process' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      {/* ХЕДЕР */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-out flex justify-center ${isScrolled ? 'pt-4 px-4' : 'pt-0 px-0'}`}
      >
        <div
          className={`w-full flex items-center justify-between transition-all duration-500 ease-out border ${
            isScrolled
              ? 'max-w-4xl bg-[#121318]/80 backdrop-blur-xl border-[#222430] rounded-full py-2.5 px-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)]'
              : 'max-w-7xl bg-transparent py-6 px-6 md:px-10 border-transparent'
          }`}
        >
          {/* Контейнер Логотипа — пропорции под твою новую картинку */}
          <a
            href="#"
            className="block w-[140px] h-10 flex-shrink-0 relative z-50 transition-transform active:scale-98"
          >
            <img
              src={logoImg}
              alt="SM Detailing"
              className="w-full h-full object-contain"
            />
          </a>

          {/* Десктоп навигация */}
          <nav className="hidden md:flex items-center gap-8 font-sans font-medium text-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#8b8f9e] hover:text-[#f3f4f6] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#ffee00] after:transition-all hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Правый блок действий */}
          <div className="flex items-center gap-3 relative z-50">
            {/* Кнопка телефона на мобилках */}
            <a
              href="tel:+380000000000"
              aria-label="Зателефонувати"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#121318] border border-[#222430] text-[#f3f4f6] hover:text-[#ffee00] hover:border-[#ffee00]/30 transition-all duration-300"
            >
              <Phone size={18} />
            </a>

            {/* Десктоп кнопка */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-block bg-[#ffee00] hover:bg-[#ccbe00] text-[#0a0a0c] font-display font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,238,0,0.4)]"
            >
              Записатися
            </a>

            {/* Бургер-крестик с плавной трансформацией */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
              className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full bg-[#121318] border border-[#222430] text-[#f3f4f6] hover:text-[#ffee00] transition-all duration-300 gap-[5px]"
            >
              <span
                className={`w-5 h-[2px] bg-current rounded-full transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}
              />
              <span
                className={`w-5 h-[2px] bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-0' : ''}`}
              />
              <span
                className={`w-5 h-[2px] bg-current rounded-full transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ФУЛЛСКРИН МОБИЛЬНОЕ МЕНЮ */}
      <div
        className={`fixed inset-0 z-30 bg-[#0a0a0c]/98 backdrop-blur-2xl flex flex-col px-6 pt-32 pb-10 transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? 'opacity-100 translate-y-0 visible'
            : 'opacity-0 -translate-y-6 invisible'
        }`}
      >
        <nav className="flex flex-col gap-6 w-full max-w-lg mx-auto">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              style={{ transitionDelay: `${isMenuOpen ? 120 + i * 50 : 0}ms` }}
              className={`font-display text-3xl uppercase font-black text-[#f3f4f6] hover:text-[#ffee00] transition-all duration-500 border-b border-[#222430]/60 pb-4 block ${
                isMenuOpen
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-6'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div
          style={{ transitionDelay: isMenuOpen ? '350ms' : '0ms' }}
          className={`mt-auto w-full max-w-lg mx-auto transition-all duration-500 ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-full bg-[#ffee00] hover:bg-[#ccbe00] text-[#0a0a0c] font-display font-bold text-sm uppercase tracking-wider py-4 rounded-full transition-colors duration-300"
          >
            Записатися через Instagram
          </a>
        </div>
      </div>
    </>
  );
}
