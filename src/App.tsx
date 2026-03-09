import React, { useState, useEffect } from 'react';
import { Menu, Utensils, Wine, Quote, Star, MapPin, Phone, Mail, Instagram, Facebook, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const REVIEWS = [
  { name: "Lorena D.C", text: "Súper recomendado, atención amable, berberechos de Galicia increíbles." },
  { name: "Jose Vallarino", text: "Terraza tranquila, buen ambiente, menú del día destacable." },
  { name: "Laura CR", text: "Raciones excelentes, postre pastel árabe, atención destacada." },
  { name: "Maria G", text: "Excelente relación calidad-precio, terraza cálida, atención rápida." },
  { name: "Sergio Durán", text: "Picoteo en terraza, servicio atento, comanda perfecta." },
  { name: "Amalia Ortiz", text: "Menú de día excelente, trato profesional y amable." },
  { name: "Irene Quilis Sanz", text: "Camarero atento, raciones equilibradas, terraza agradable." },
  { name: "Margarita", text: "Rabo de toro estofado delicioso, servicio rápido y amable." },
  { name: "José María Plácido Suárez", text: "Menú del día tras compras, papas bravas y croquetas excelentes." },
  { name: "Gonsxo", text: "Menú del día, alcachofas y rabo de toro, croquetas muy ricas." },
  { name: "Eva Zorzo", text: "Arroz meloso y setas gratinadas excelentes." },
  { name: "KI", text: "Buena relación calidad-precio, variedad de platos, terraza cómoda." },
  { name: "Gonzalo Caceres Montoro", text: "Terraza agradable, cerveza bien fría, comida excelente." },
  { name: "Marc Pajares", text: "Buena carta y empleados atentos, torreznos y tomate 'del pueblo'." },
  { name: "Josue Saava Fernandez", text: "Comida perfecta, meseros atentos, terracita bien acondicionada." }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 400]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  const aboutRef = useRef<HTMLElement>(null);
  const { scrollYProgress: aboutScrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });
  const aboutImageY = useTransform(aboutScrollYProgress, [0, 1], [50, -50]);

  const reservaRef = useRef<HTMLElement>(null);
  const { scrollYProgress: reservaScrollYProgress } = useScroll({
    target: reservaRef,
    offset: ["start end", "end start"]
  });
  const reservaY = useTransform(reservaScrollYProgress, [0, 1], [50, -50]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % Math.max(1, REVIEWS.length - itemsPerView + 1));
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + Math.max(1, REVIEWS.length - itemsPerView + 1)) % Math.max(1, REVIEWS.length - itemsPerView + 1));
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-black">
      {/* Header */}
      <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-primary/10 bg-background-light/90 px-6 py-4 backdrop-blur-md md:px-20">
        <a href="#inicio" className="flex items-center gap-4 text-primary transition-opacity hover:opacity-80">
          <img
            alt="La Mascarada Logo"
            className="size-10 rounded-full object-cover"
            src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773086033/394582018_841150318011195_7162769795721018016_n_mc9exn.jpg"
          />
          <h2 className="font-display text-xl font-bold leading-tight tracking-tight text-primary">
            La Mascarada
          </h2>
        </a>
        <div className="hidden flex-1 items-center justify-end gap-8 lg:flex">
          <nav className="flex items-center gap-9">
            <a href="#inicio" className="text-sm font-medium text-black transition-colors hover:text-primary">Inicio</a>
            <a href="#sobre-nosotros" className="text-sm font-medium text-black transition-colors hover:text-primary">Sobre Nosotros</a>
            <a href="#la-carta" className="text-sm font-medium text-black transition-colors hover:text-primary">La Carta</a>
            <a href="#resenas" className="text-sm font-medium text-black transition-colors hover:text-primary">Reseñas</a>
            <a href="#visitanos" className="text-sm font-medium text-black transition-colors hover:text-primary">Visítanos</a>
          </nav>
          <a href="tel:630237124" className="flex h-10 min-w-[120px] items-center justify-center rounded-lg bg-primary px-5 text-sm font-bold tracking-wide text-white shadow-md transition-all hover:bg-primary/90">
            Reservar
          </a>
        </div>
        <button className="text-primary lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu />
        </button>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background-light pt-20 lg:hidden">
          <nav className="flex flex-col items-center gap-6 p-6">
            <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-black">Inicio</a>
            <a href="#sobre-nosotros" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-black">Sobre Nosotros</a>
            <a href="#la-carta" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-black">La Carta</a>
            <a href="#resenas" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-black">Reseñas</a>
            <a href="#visitanos" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-black">Visítanos</a>
            <a href="tel:630237124" onClick={() => setIsMenuOpen(false)} className="mt-4 flex h-12 w-full items-center justify-center rounded-lg bg-primary px-5 text-base font-bold tracking-wide text-white shadow-md">
              Reservar
            </a>
          </nav>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section id="inicio" className="relative h-screen w-full overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'linear-gradient(rgba(31, 19, 19, 0.6) 0%, rgba(31, 19, 19, 0.8) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBv_Nw1HivLxpOcxgmt8UyoI6XEeiRl_l2TuSymeYCUcCJh1Jp9-iXKlIiplxPdJJsLW3pnvWELiP12Hy94UFM2G0jUV5-mMEetm0j5egzn3GPRb9PbY4SfEaP-_I_H38kAl4bgJSkMqT1aqL6k8y5zgEaoCah0OALpI5QIAnm_uwR7oOckxKCisrpebMEOO9cswRApFS-fag0Eub7RJ5-t6eLDypOggRSiEKSvxFdbjZnzPX58Wdy_mpECdA503c0kYm-MFzeIVqE")',
              y: heroY,
            }}
          />
          <motion.div 
            className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-20 text-center md:px-20"
            style={{ opacity: heroOpacity }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex max-w-3xl flex-col items-center gap-6"
            >
              <img
                alt="Logo Hero"
                className="mx-auto mb-2 h-32 w-32 rounded-full object-cover shadow-lg"
                src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773086033/394582018_841150318011195_7162769795721018016_n_mc9exn.jpg"
              />
              <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl lg:text-8xl">
                La Mascarada
              </h1>
              <p className="text-xl font-medium text-white/90 md:text-2xl">
                Cocina española tradicional con toques contemporáneos
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <a href="#la-carta" className="flex h-14 min-w-[200px] items-center justify-center gap-2 rounded-lg bg-white px-8 text-lg font-bold text-primary shadow-lg transition-transform hover:scale-105">
                  <Utensils className="h-5 w-5" />
                  Ver Carta
                </a>
                <a href="tel:630237124" className="flex h-14 min-w-[200px] items-center justify-center gap-2 rounded-lg bg-primary px-8 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105">
                  <Phone className="h-5 w-5" />
                  Reserva
                </a>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Sobre Nosotros */}
        <section id="sobre-nosotros" ref={aboutRef} className="px-6 py-20 md:px-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row"
          >
            <div className="flex flex-1 flex-col gap-6">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Nuestra Esencia</h2>
              <h3 className="font-display text-4xl font-bold leading-tight text-black md:text-5xl">
                Ambiente tradicional, cocina casera de calidad.
              </h3>
              <p className="text-lg leading-relaxed text-black">
                La Mascarada es un restaurante con el auténtico ambiente de bar tradicional español. Ofrecemos una terraza tranquila y acogedora, perfecta para disfrutar de nuestra cocina casera elaborada con los mejores ingredientes.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex items-start gap-4">
                  <Utensils className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-bold text-black">Clásicos y Temporada</h4>
                    <p className="text-sm text-black">Platos de siempre y sugerencias según la estación.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Wine className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-bold text-black">Para Todos</h4>
                    <p className="text-sm text-black">Ideal para familias, parejas y grupos pequeños con atención profesional y cercana.</p>
                  </div>
                </div>
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex-1"
              style={{ y: aboutImageY }}
            >
              <div className="rotate-2 overflow-hidden rounded-2xl shadow-2xl">
                <img
                  alt="Terraza y ambiente"
                  className="h-[500px] w-full object-cover transition-transform duration-700 hover:scale-110"
                  src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773087192/unnamed_qgt3lu.webp"
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* La Carta */}
        <section id="la-carta" className="px-6 py-20 md:px-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-6xl"
          >
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-primary">La Carta</h2>
              <h3 className="font-display text-4xl font-bold text-black">Nuestras Especialidades</h3>
              <div className="mx-auto mt-6 h-1 w-24 bg-primary"></div>
            </div>
            
            <div className="mb-16">
              <div className="mb-8 flex items-center justify-between border-b border-primary/20 pb-4">
                <h4 className="font-display text-2xl font-bold text-black">Menú del Día</h4>
                <span className="font-display text-xl font-bold text-primary">~13,50 €</span>
              </div>
              <p className="text-black">Disfruta de nuestro menú diario con opciones variadas, caseras y de excelente calidad-precio. Incluye primer plato, segundo plato, bebida, pan y postre o café.</p>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
              {/* Columna 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col gap-12"
              >
                <div>
                  <h4 className="mb-6 font-display text-2xl font-bold text-primary border-b border-primary/20 pb-2">Entrantes</h4>
                  <ul className="flex flex-col gap-4">
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Patatas bravas</span><span className="text-primary font-bold">9,00€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Patatas 2 salsas</span><span className="text-primary font-bold">8,50€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Croquetas de jamón</span><span className="text-primary font-bold">12,00€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Croquetas de boletus</span><span className="text-primary font-bold">12,50€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Cazón en adobo</span><span className="text-primary font-bold">14,00€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Calamares</span><span className="text-primary font-bold">12,50€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Rejos a la Andaluza</span><span className="text-primary font-bold">12,50€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Sepia a la plancha con Alioli</span><span className="text-primary font-bold">17,90€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Tiras de pollo</span><span className="text-primary font-bold">12,50€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Torreznos asados al horno</span><span className="text-primary font-bold">12,00€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Pulpo braseado de la Ría</span><span className="text-primary font-bold">22,00€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Jamón Ibérico</span><span className="text-primary font-bold">20,00€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Ensaladilla Rusa con gamba roja</span><span className="text-primary font-bold">15,00€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Tabla de quesos asturianos</span><span className="text-primary font-bold">22,00€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Cecina de León</span><span className="text-primary font-bold">18,00€</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-6 font-display text-2xl font-bold text-primary border-b border-primary/20 pb-2">Con Huevos</h4>
                  <ul className="flex flex-col gap-4">
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Huevos rotos con jamón</span><span className="text-primary font-bold">13,50€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Huevos rotos con rabo de toro estofado</span><span className="text-primary font-bold">19,00€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Tortilla de patata</span><span className="text-primary font-bold">12,00€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Tortilla de bacalao estilo sidrería asturiana</span><span className="text-primary font-bold">18,00€</span></li>
                  </ul>
                </div>
              </motion.div>

              {/* Columna 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col gap-12"
              >
                <div>
                  <h4 className="mb-6 font-display text-2xl font-bold text-primary border-b border-primary/20 pb-2">Platos del Chef</h4>
                  <ul className="flex flex-col gap-4">
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Gamba roja a la plancha 270g</span><span className="text-primary font-bold">30,00€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Coquinas a la sartén</span><span className="text-primary font-bold">15,00€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Zamburiñas Bilbaína</span><span className="text-primary font-bold">17,00€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Chipirones con trigueros</span><span className="text-primary font-bold">18,00€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Alcachofas confitadas</span><span className="text-primary font-bold">16,00€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Oreja picantita plancha</span><span className="text-primary font-bold">12,00€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Tacos de rabo de toro</span><span className="text-primary font-bold">22,00€</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-6 font-display text-2xl font-bold text-primary border-b border-primary/20 pb-2">Ensaladas</h4>
                  <ul className="flex flex-col gap-4">
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Burrata con tomate casero</span><span className="text-primary font-bold">15,00€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Tomate con ventresca</span><span className="text-primary font-bold">13,50€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Tomate aliñado</span><span className="text-primary font-bold">12,00€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Tomate de pueblo con jamón, cecina y parmesano</span><span className="text-primary font-bold">18,00€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Ensalada de la huerta</span><span className="text-primary font-bold">13,50€</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-6 font-display text-2xl font-bold text-primary border-b border-primary/20 pb-2">Hamburguesas</h4>
                  <ul className="flex flex-col gap-6">
                    <li>
                      <div className="flex justify-between gap-4"><span className="font-bold text-slate-900">Hamburguesa con queso</span><span className="text-primary font-bold">9,50€</span></div>
                      <p className="text-sm text-slate-500 mt-1">Carne, lechuga, tomate y queso</p>
                    </li>
                    <li>
                      <div className="flex justify-between gap-4"><span className="font-bold text-slate-900">Hamburguesa con bacon y queso</span><span className="text-primary font-bold">10,00€</span></div>
                      <p className="text-sm text-slate-500 mt-1">Carne, bacon y queso</p>
                    </li>
                    <li>
                      <div className="flex justify-between gap-4"><span className="font-bold text-slate-900">Hamburguesa con rulo de cabra</span><span className="text-primary font-bold">10,50€</span></div>
                      <p className="text-sm text-slate-500 mt-1">Carne, rulo de cabra, bacon, cebolla caramelizada</p>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Columna 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col gap-12"
              >
                <div>
                  <h4 className="mb-6 font-display text-2xl font-bold text-primary border-b border-primary/20 pb-2">Carnes a la Parrilla</h4>
                  <ul className="flex flex-col gap-4">
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Chuletón de vaca madurada 30 días</span><span className="text-primary font-bold">45,00€ / Kg</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Chuletón Simmental madurada 45 días</span><span className="text-primary font-bold">60,00€ / Kg</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Lomo de vaca vieja 500gr</span><span className="text-primary font-bold">24,00€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Chuletillas de lechal</span><span className="text-primary font-bold">19,50€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Abanico ibérico</span><span className="text-primary font-bold">19,50€</span></li>
                    <li className="flex justify-between gap-4"><span className="font-bold text-slate-900">Picanya brasileña 500gr</span><span className="text-primary font-bold">26,50€</span></li>
                  </ul>
                </div>
                <div className="rounded-xl bg-primary/5 p-6 border border-primary/10">
                  <h4 className="mb-6 font-display text-2xl font-bold text-primary border-b border-primary/20 pb-2">Sugerencias del Chef</h4>
                  <ul className="flex flex-col gap-3">
                    <li className="font-medium text-slate-800">• Gamba roja de Denia</li>
                    <li className="font-medium text-slate-800">• Berberechos a la sartén</li>
                    <li className="font-medium text-slate-800">• Alcachofas con zamburiñas</li>
                    <li className="font-medium text-slate-800">• Migas del pastor con chistorra, trufa negra y huevo poché</li>
                    <li className="font-medium text-slate-800">• Judiones de la Granja estofadas con rabo de toro</li>
                    <li className="font-medium text-slate-800">• Tartar de atún rojo</li>
                    <li className="font-medium text-slate-800">• Ensaladilla rusa con dados de atún rojo</li>
                    <li className="font-medium text-slate-800">• Croquetas de gamba al ajillo</li>
                    <li className="font-medium text-slate-800">• Rabo de toro estofado</li>
                    <li className="font-medium text-slate-800">• Cachopo asturiano</li>
                    <li className="font-medium text-slate-800">• Cachopo de rabo de toro</li>
                    <li className="font-medium text-slate-800">• 10 unidades de zamburiña a la bilbaína</li>
                    <li className="font-medium text-slate-800">• Chuleta de vaca Simmental 1 kg.</li>
                    <li className="font-medium text-slate-800">• Ceviche de corvina</li>
                  </ul>
                  <p className="mt-4 text-sm italic text-slate-500">* Consulta disponibilidad y precios de nuestras sugerencias.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Reseñas */}
        <section id="resenas" className="px-6 py-20 md:px-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-6xl"
          >
            <div className="mb-12 flex flex-col items-center">
              <Quote className="mb-4 h-12 w-12 text-primary" />
              <h3 className="text-center font-display text-3xl font-bold text-black">Lo que dicen nuestros comensales</h3>
            </div>
            
            <div className="relative mb-12">
              <div className="overflow-hidden px-4">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentReviewIndex * (100 / itemsPerView)}%)` }}
                >
                  {REVIEWS.map((review, index) => (
                    <div 
                      key={index} 
                      className="w-full shrink-0 px-4"
                      style={{ width: `${100 / itemsPerView}%` }}
                    >
                      <div className="flex h-full flex-col justify-between rounded-xl border border-primary/10 bg-white p-8 shadow-sm">
                        <div>
                          <div className="mb-4 flex text-primary">
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                          </div>
                          <p className="mb-6 italic text-black">"{review.text}"</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                            {review.name.charAt(0)}
                          </div>
                          <h5 className="font-bold text-black">{review.name}</h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={prevReview}
                className="absolute -left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-transform hover:scale-110"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={nextReview}
                className="absolute -right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-transform hover:scale-110"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <a 
                href="https://www.google.com/maps/place/Restaurante+La+Mascarada/@40.4697441,-3.8740349,17z/data=!3m1!4b1!4m6!3m5!1s0xd41848c963a6693:0xc9629f0af8f5a705!8m2!3d40.46974!4d-3.87146!16s%2Fg%2F11c525_v9n?entry=ttu&g_ep=EgoyMDI2MDMwNS4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-primary bg-white px-6 py-3 font-bold text-primary transition-colors hover:bg-primary hover:text-white sm:w-auto"
              >
                <MapPin className="h-5 w-5" />
                Dejar reseña en Google Maps
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
              <a 
                href="https://www.tripadvisor.es/UserReviewEdit-g1063665-d12869351-La_Mascarada-Majadahonda.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[#34E0A1] bg-white px-6 py-3 font-bold text-[#000] transition-colors hover:bg-[#34E0A1] sm:w-auto"
              >
                <Star className="h-5 w-5" />
                Dejar reseña en TripAdvisor
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </section>

        {/* Visítanos */}
        <section id="visitanos" className="px-6 py-20 md:px-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2"
          >
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-primary">Ubicación y Horario</h2>
                <h3 className="mb-6 font-display text-4xl font-bold text-black">Visítanos</h3>
                <p className="mb-8 text-lg text-black">Encuéntranos en el corazón de Majadahonda. Te esperamos para disfrutar de la mejor gastronomía en nuestra terraza o salón.</p>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex gap-4">
                  <MapPin className="h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h4 className="font-bold text-black">Dirección</h4>
                    <p className="text-black">Pl. Cristóbal Colón, 6, 28220 Majadahonda, Madrid</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h4 className="font-bold text-black">Teléfono</h4>
                    <a href="tel:630237124" className="text-black hover:text-primary">630 237 124</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Utensils className="h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h4 className="font-bold mb-2 text-black">Horario</h4>
                    <ul className="text-sm text-black space-y-1">
                      <li className="flex justify-between gap-4"><span className="font-medium">Lunes:</span> <span>Cerrado</span></li>
                      <li className="flex justify-between gap-4"><span className="font-medium">Martes a Jueves:</span> <span>8:00 – 1:30</span></li>
                      <li className="flex justify-between gap-4"><span className="font-medium">Viernes y Sábado:</span> <span>8:00 – 2:00</span></li>
                      <li className="flex justify-between gap-4"><span className="font-medium">Domingo:</span> <span>8:00 – 1:30</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-h-[400px] overflow-hidden rounded-2xl bg-slate-100 shadow-inner">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3035.4855734311894!2d-3.8740349!3d40.4697441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd41848c963a6693%3A0xc9629f0af8f5a705!2sRestaurante%20La%20Mascarada!5e0!3m2!1ses!2ses!4v1709999999999!5m2!1ses!2ses" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de ubicación de La Mascarada"
              ></iframe>
            </div>
          </motion.div>
        </section>

        {/* Reservar CTA */}
        <section id="reserva" ref={reservaRef} className="px-6 py-20 md:px-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            style={{ y: reservaY }}
            className="mx-auto max-w-4xl rounded-3xl border border-primary/5 bg-white/50 p-10 text-center shadow-2xl backdrop-blur-sm md:p-16"
          >
            <h3 className="mb-4 font-display text-4xl font-bold text-black">Reserva tu Mesa</h3>
            <p className="mb-8 text-lg text-black">Para garantizar la mejor atención, gestionamos todas nuestras reservas de forma personalizada mediante llamada telefónica.</p>
            <a href="tel:630237124" className="mx-auto flex h-16 w-full max-w-md items-center justify-center gap-3 rounded-xl bg-primary px-8 text-xl font-bold text-white shadow-lg transition-transform hover:scale-105 hover:shadow-primary/20">
              <Phone className="h-6 w-6" />
              Llama al 630 237 124
            </a>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background-light px-6 py-16 text-black md:px-20 border-t border-primary/10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-primary">
              <img
                alt="Footer Logo"
                className="size-8 rounded-full object-cover"
                src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773086033/394582018_841150318011195_7162769795721018016_n_mc9exn.jpg"
              />
              <h4 className="font-display text-2xl font-bold">La Mascarada</h4>
            </div>
            <p className="text-sm leading-relaxed text-black/80">
              Cocina española tradicional con toques contemporáneos en el corazón de Majadahonda.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/la_mascarada.bycarlos/" target="_blank" rel="noopener noreferrer" className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/LaMascaradaMajadahonda/?locale=es_ES" target="_blank" rel="noopener noreferrer" className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h5 className="mb-6 inline-block border-b border-primary/20 pb-2 text-lg font-bold text-primary">Contacto</h5>
            <ul className="flex flex-col gap-4 text-black/80">
              <li className="flex items-start gap-2">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm">Pl. Cristóbal Colón, 6, 28220 Majadahonda, Madrid</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:630237124" className="text-sm hover:text-primary">630 237 124</a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="mb-6 inline-block border-b border-primary/20 pb-2 text-lg font-bold text-primary">Horarios</h5>
            <ul className="flex flex-col gap-2 text-sm text-black/80">
              <li className="flex justify-between"><span>Lunes:</span> <span>Cerrado</span></li>
              <li className="flex justify-between"><span>Mar - Jue:</span> <span>8:00 – 1:30</span></li>
              <li className="flex justify-between"><span>Vie - Sáb:</span> <span>8:00 – 2:00</span></li>
              <li className="flex justify-between"><span>Domingo:</span> <span>8:00 – 1:30</span></li>
            </ul>
          </div>
          <div>
            <h5 className="mb-6 inline-block border-b border-primary/20 pb-2 text-lg font-bold text-primary">Legal</h5>
            <ul className="flex flex-col gap-4 text-sm text-black/80">
              <li><a href="#" className="transition-colors hover:text-primary">Aviso Legal</a></li>
              <li><a href="#" className="transition-colors hover:text-primary">Política de Privacidad</a></li>
              <li><a href="#" className="transition-colors hover:text-primary">Política de Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-6xl border-t border-primary/10 pt-8 text-center text-xs text-black/50">
          <p>© {new Date().getFullYear()} La Mascarada. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
