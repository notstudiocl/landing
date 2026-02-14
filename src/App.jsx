import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════ */
const CHERRY = "#C41E3A";
const CHERRY_LIGHT = "#E8243B";
const CHERRY_DARK = "#9B1830";
const DARK = "#0F0F0F";
const WHITE = "#FFFFFF";
const BG = "#FAFAFA";
const GRAY = {
  50: "#F7F7F8",
  100: "#EFEFEF",
  200: "#DCDCDC",
  300: "#BABABA",
  400: "#929292",
  500: "#6E6E6E",
  600: "#555555",
  700: "#3A3A3A",
  800: "#1F1F1F",
  900: "#141414",
};

const WA = "https://wa.me/56964286319?text=Hola%20Matías,%20vengo%20de%20notstudio.cl";
const ease = [0.22, 1, 0.36, 1];

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */
const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Historia", href: "#historia" },
  { label: "Precios", href: "#precios" },
  { label: "FAQ", href: "#faq" },
];

const MARQUEE_ITEMS = [
  "DESARROLLO WEB",
  "E-COMMERCE",
  "AUTOMATIZACIONES",
  "APPS WEB",
  "WORDPRESS",
  "DASHBOARDS",
  "LANDING PAGES",
  "INTEGRACIONES API",
];

const SERVICES = [
  {
    icon: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    emoji: "\u{1F310}",
    title: "Desarrollo Web",
    desc: "Sitios rápidos, modernos y que convierten. WordPress, React o lo que tu proyecto necesite. Responsive, optimizado y listo para crecer.",
    tags: ["WordPress", "React", "Landing Pages", "SEO"],
    span: 2,
  },
  {
    icon: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
    emoji: "\u{1F6D2}",
    title: "E-Commerce",
    desc: "Tiendas online completas. Pasarela de pagos, inventario, catálogo y panel de administración.",
    tags: ["WooCommerce", "Pasarelas", "Inventario"],
    span: 1,
  },
  {
    icon: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=600&q=80",
    emoji: "\u26A1",
    title: "Automatizaciones",
    desc: "Elimina el trabajo manual. Workflows que conectan tus herramientas y ahorran horas cada semana.",
    tags: ["n8n", "APIs", "Workflows", "CRM"],
    span: 1,
  },
  {
    icon: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    emoji: "\u{1F4CA}",
    title: "Apps Web",
    desc: "Dashboards, sistemas de gestión y soluciones a medida. Todo en la nube, accesible desde cualquier dispositivo.",
    tags: ["Dashboards", "React", "Node.js", "Bases de Datos"],
    span: 2,
  },
];

const PROJECTS = [
  {
    title: "Virtual Keys",
    category: "E-Commerce",
    desc: "Tienda de productos digitales con entrega automatizada y pasarela de pago integrada.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    color: CHERRY,
  },
  {
    title: "Sistema de Gestión",
    category: "Web App",
    desc: "Dashboard administrativo con reportes en tiempo real y control de inventario completo.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    color: "#2563EB",
  },
  {
    title: "Automatización CRM",
    category: "Automatización",
    desc: "Pipeline de leads automatizado con scoring, seguimiento y notificaciones en tiempo real.",
    img: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=800&q=80",
    color: "#7C3AED",
  },
  {
    title: "Web Corporativa",
    category: "Sitio Web",
    desc: "Presencia digital profesional con formularios, blog y SEO optimizado para captar clientes.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    color: "#059669",
  },
];

const TESTIMONIALS = [
  { text: "Matías transformó nuestra idea en un sistema funcional en tiempo récord. La comunicación fue impecable de principio a fin.", name: "Carlos M.", role: "CEO, Startup Tech" },
  { text: "El e-commerce que nos armó duplicó nuestras ventas el primer mes. Sabe exactamente lo que un negocio necesita.", name: "Andrea P.", role: "Dueña, Tienda Online" },
  { text: "Las automatizaciones que implementó nos ahorraron 20 horas semanales. Inversión que se pagó sola.", name: "Roberto S.", role: "Gerente de Operaciones" },
  { text: "Profesional, rápido y con un ojo para el diseño que no esperaba. El mejor partner digital que hemos tenido.", name: "Valentina R.", role: "Directora de Marketing" },
  { text: "Nos entregó un dashboard que nuestro equipo ama usar. Intuitivo, rápido y exactamente lo que pedimos.", name: "Sebastián L.", role: "CTO, Fintech" },
  { text: "Desde el primer llamado entendió lo que necesitábamos. Cumplió cada deadline sin excusas. 100% recomendado.", name: "Francisca T.", role: "Fundadora, Agencia" },
];

const TIMELINE = [
  { year: "2016", age: "11 años", title: "El inicio", desc: "Descubrí la programación por curiosidad pura. HTML, CSS y la obsesión por entender cómo funcionaba todo." },
  { year: "2018", age: "13 años", title: "Primeros proyectos", desc: "Creé mis primeras páginas web para conocidos. PHP, JavaScript y la realidad de que los clientes siempre quieren más." },
  { year: "2020", age: "15 años", title: "E-commerce real", desc: "Me lancé con WooCommerce. Primera tienda online con pasarela de pago. Aposté todo lo que tenía." },
  { year: "2022", age: "17 años", title: "Automatizaciones", desc: "Descubrí n8n y las APIs. Empecé a automatizar procesos y entendí el verdadero poder de los sistemas." },
  { year: "2024", age: "19 años", title: "Apps a medida", desc: "React, Node.js, bases de datos. De hacer sitios a construir sistemas completos para empresas." },
  { year: "2025", age: "21 años", title: "notstudio", desc: "Todo lo aprendido en 10 años condensado en un servicio profesional. Sin jefe, sin límites." },
];

const PRICING = [
  {
    name: "Landing Page",
    price: "Desde $150.000",
    desc: "Presencia digital profesional que convierte.",
    features: ["Diseño personalizado", "Responsive mobile-first", "Optimización SEO", "Formulario de contacto", "Hosting primer año", "Entrega en 5-7 días"],
    popular: false,
  },
  {
    name: "E-Commerce",
    price: "Desde $350.000",
    desc: "Tu tienda online lista para vender.",
    features: ["Todo lo de Landing Page", "Catálogo de productos", "Pasarela de pagos", "Gestión de inventario", "Panel de administración", "Soporte 30 días"],
    popular: true,
  },
  {
    name: "Sistema a Medida",
    price: "Conversemos",
    desc: "Soluciones que escalan con tu negocio.",
    features: ["Análisis de requerimientos", "Arquitectura personalizada", "Dashboard y reportes", "Integraciones API", "Automatizaciones", "Soporte continuo"],
    popular: false,
  },
];

const FAQS = [
  { q: "¿Cuánto demora un proyecto?", a: "Depende de la complejidad. Una landing page se entrega en 5-7 días. Un e-commerce en 2-3 semanas. Sistemas a medida los definimos juntos según el alcance." },
  { q: "¿Qué tecnologías usas?", a: "WordPress, React, Node.js, n8n para automatizaciones, WooCommerce para e-commerce, y lo que el proyecto necesite. No me caso con una sola herramienta." },
  { q: "¿Incluyes hosting y dominio?", a: "El hosting del primer año va incluido en todos los planes. El dominio lo puedo gestionar yo o si ya tienes uno, lo configuramos sin problema." },
  { q: "¿Cómo es el proceso de trabajo?", a: "Hablamos por WhatsApp, definimos alcance, te paso una propuesta formal, pagas el 50% de anticipo, desarrollo, revisiones, entrega y pagas el resto. Simple y directo." },
  { q: "¿Qué pasa si necesito cambios después?", a: "Incluyo un período de soporte post-entrega en todos los planes. Después de eso, ofrezco planes de mantenimiento o cambios puntuales con tarifas preferenciales." },
  { q: "¿Trabajas con empresas grandes?", a: "Trabajo con emprendedores, pymes y startups principalmente. Si tu proyecto necesita un equipo más grande, te lo digo honestamente." },
];

/* ═══════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const scaleUp = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } },
};

/* ═══════════════════════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════════════════════ */
const WhatsAppIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3.5 8.5L6.5 11.5L12.5 5.5" stroke={CHERRY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════════════════════════ */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease }}
      className={`header ${scrolled ? "header-scrolled" : ""}`}
    >
      <div className="header-inner">
        <a href="#" className="logo">
          <span className="logo-mark">N</span>
          <span className="logo-text">notstudio</span>
        </a>

        <nav className="nav-desktop">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
        </nav>

        <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-header">
          Hablemos
        </a>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={`hamburger ${menuOpen ? "open" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="nav-mobile"
          >
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-mobile-link" onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-mobile" onClick={() => setMenuOpen(false)}>
              Hablemos por WhatsApp
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════ */
function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const words = ["Sistemas", "E-commerce", "Automatizaciones", "Apps Web"];

  useEffect(() => {
    const i = setInterval(() => setWordIdx((c) => (c + 1) % words.length), 2500);
    return () => clearInterval(i);
  }, []);

  return (
    <section className="hero">
      {/* Decorative elements */}
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />
      <div className="hero-dots" />

      <div className="container hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="hero-badge"
        >
          <span className="pulse-dot" />
          <span>Disponible para proyectos</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          className="hero-title"
        >
          QUE LOS SISTEMAS
          <br />
          <span className="hero-title-accent">TRABAJEN</span>
          <br />
          PARA TI.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="hero-subtitle"
        >
          Desarrollo web, e-commerce y automatizaciones para negocios
          <br className="hide-mobile" />
          que no quieren quedarse atrás.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease }}
          className="hero-words"
        >
          <div className="hero-words-track" style={{ transform: `translateY(-${wordIdx * 44}px)` }}>
            {words.map((w, i) => (
              <div key={i} className="hero-word">{w}<span style={{ color: CHERRY }}>.</span></div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease }}
          className="hero-ctas"
        >
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <WhatsAppIcon size={20} />
            Conversemos
          </a>
          <a href="#proyectos" className="btn-secondary">
            Ver Proyectos
            <ArrowIcon />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95, ease }}
          className="hero-stats"
        >
          {[
            { num: "+50", label: "Proyectos" },
            { num: "+30", label: "Clientes" },
            { num: "24h", label: "Respuesta" },
          ].map((s, i) => (
            <div key={i} className="hero-stat">
              <span className="hero-stat-num">{s.num}</span>
              <span className="hero-stat-label">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={GRAY[400]} strokeWidth="2">
          <path d="M7 10l5 5 5-5" />
        </svg>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MARQUEE
   ═══════════════════════════════════════════════════════════════ */
function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <section className="marquee-section">
      <div className="marquee-tilt">
        <div className="marquee-track">
          {items.map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
              <span className="marquee-dot">{"\u2666"}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SERVICES (BENTO GRID)
   ═══════════════════════════════════════════════════════════════ */
function Services() {
  return (
    <section id="servicios" className="section section-alt">
      <div className="container">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
          <span className="section-label">SERVICIOS</span>
          <h2 className="section-title">LO QUE HAGO</h2>
          <p className="section-desc">
            Sin tecnicismos. Sin vueltas. Te armo un sistema que funcione y que tu negocio necesita para crecer.
          </p>
        </motion.div>

        <motion.div
          className="bento-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {SERVICES.map((s, i) => (
            <motion.div
              key={i}
              variants={scaleUp}
              className={`bento-card bento-span-${s.span}`}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <div className="bento-img-wrap">
                <img src={s.icon} alt={s.title} className="bento-img" loading="lazy" />
                <div className="bento-img-overlay" />
              </div>
              <div className="bento-body">
                <span className="bento-emoji">{s.emoji}</span>
                <h3 className="bento-title">{s.title}</h3>
                <p className="bento-desc">{s.desc}</p>
                <div className="bento-tags">
                  {s.tags.map((t, j) => (
                    <span key={j} className="bento-tag">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROJECTS
   ═══════════════════════════════════════════════════════════════ */
function Projects() {
  return (
    <section id="proyectos" className="section">
      <div className="container">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
          <span className="section-label">PORTAFOLIO</span>
          <h2 className="section-title">PROYECTOS REALES</h2>
          <p className="section-desc">Resultados concretos, no promesas. Cada proyecto entregado con obsesión por el detalle.</p>
        </motion.div>

        <motion.div
          className="projects-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {PROJECTS.map((p, i) => (
            <motion.div key={i} variants={scaleUp} className="project-card">
              <img src={p.img} alt={p.title} className="project-img" loading="lazy" />
              <div className="project-overlay">
                <span className="project-badge" style={{ background: p.color }}>{p.category}</span>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS MARQUEE
   ═══════════════════════════════════════════════════════════════ */
function TestimonialsMarquee() {
  const row1 = [...TESTIMONIALS.slice(0, 3), ...TESTIMONIALS.slice(0, 3)];
  const row2 = [...TESTIMONIALS.slice(3), ...TESTIMONIALS.slice(3)];

  return (
    <section id="testimonios" className="section section-alt">
      <div className="container">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} style={{ textAlign: "center" }}>
          <span className="section-label">TESTIMONIOS</span>
          <h2 className="section-title">LO QUE DICEN</h2>
        </motion.div>
      </div>

      <div className="testimonials-wrap">
        <div className="testimonials-row testimonials-row-left">
          {row1.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-quote">&ldquo;</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.name.charAt(0)}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="testimonials-row testimonials-row-right">
          {row2.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-quote">&ldquo;</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.name.charAt(0)}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STORY (TIMELINE)
   ═══════════════════════════════════════════════════════════════ */
function Story() {
  return (
    <section id="historia" className="section">
      <div className="container">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
          <span className="section-label">SOBRE MÍ</span>
          <h2 className="section-title">MI HISTORIA</h2>
          <p className="section-desc">
            10 años haciendo lo que me gusta. Del cabro de 11 años que aprendió HTML
            a los sistemas que mueven negocios hoy.
          </p>
        </motion.div>

        <div className="timeline">
          <div className="timeline-line" />
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger}>
            {TIMELINE.map((m, i) => (
              <motion.div key={i} variants={fadeUp} className={`timeline-item ${i % 2 === 0 ? "timeline-left" : "timeline-right"}`}>
                <div className="timeline-dot">
                  <div className="timeline-dot-inner" style={{ background: i === TIMELINE.length - 1 ? CHERRY : GRAY[300] }} />
                </div>
                <div className="timeline-card">
                  <div className="timeline-meta">
                    <span className="timeline-year">{m.year}</span>
                    <span className="timeline-age">{m.age}</span>
                  </div>
                  <h3 className="timeline-title">{m.title}</h3>
                  <p className="timeline-desc">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PRICING
   ═══════════════════════════════════════════════════════════════ */
function PricingSection() {
  return (
    <section id="precios" className="section section-alt">
      <div className="container">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} style={{ textAlign: "center" }}>
          <span className="section-label">INVERSIÓN</span>
          <h2 className="section-title">PLANES Y PRECIOS</h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            Transparente y directo. Conocimiento gratis, ejecución se paga. Sin letra chica.
          </p>
        </motion.div>

        <motion.div
          className="pricing-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {PRICING.map((p, i) => (
            <motion.div
              key={i}
              variants={scaleUp}
              className={`price-card ${p.popular ? "price-card-popular" : ""}`}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              {p.popular && <div className="price-popular-badge">MÁS POPULAR</div>}
              <h3 className="price-name">{p.name}</h3>
              <p className="price-desc">{p.desc}</p>
              <div className="price-amount">
                {p.price}
                {p.price !== "Conversemos" && <span className="price-currency"> CLP</span>}
              </div>
              <ul className="price-features">
                {p.features.map((f, j) => (
                  <li key={j} className="price-feature">
                    <CheckIcon />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href={WA} target="_blank" rel="noopener noreferrer" className={`price-cta ${p.popular ? "price-cta-popular" : ""}`}>
                {p.price === "Conversemos" ? "Agendar llamada" : "Empezar proyecto"}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FAQ (ACCORDION)
   ═══════════════════════════════════════════════════════════════ */
function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const toggle = (i) => setOpenIdx(openIdx === i ? null : i);

  return (
    <section id="faq" className="section">
      <div className="container" style={{ maxWidth: 800 }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} style={{ textAlign: "center" }}>
          <span className="section-label">FAQ</span>
          <h2 className="section-title">PREGUNTAS FRECUENTES</h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger}>
          {FAQS.map((faq, i) => (
            <motion.div key={i} variants={fadeUp} className={`faq-item ${openIdx === i ? "faq-item-open" : ""}`}>
              <button className="faq-question" onClick={() => toggle(i)}>
                <span>{faq.q}</span>
                <motion.span
                  className="faq-icon"
                  animate={{ rotate: openIdx === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                    className="faq-answer-wrap"
                  >
                    <p className="faq-answer">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════════════════════════ */
function Contact() {
  return (
    <section className="contact-section">
      <div className="contact-inner container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          style={{ textAlign: "center" }}
        >
          <h2 className="contact-title">
            ¿LISTO PARA
            <br />
            <span style={{ color: WHITE }}>EMPEZAR?</span>
          </h2>
          <p className="contact-subtitle">
            Escríbeme y en menos de 24 horas tienes respuesta. Sin compromiso, sin vueltas.
          </p>
          <motion.a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa-large"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <WhatsAppIcon size={24} />
            Escríbeme por WhatsApp
          </motion.a>
          <div className="contact-social">
            <a href="https://instagram.com/notmatyx" target="_blank" rel="noopener noreferrer">@notmatyx en Instagram</a>
            <span className="contact-divider">|</span>
            <a href="https://tiktok.com/@notmatyx" target="_blank" rel="noopener noreferrer">@notmatyx en TikTok</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="#" className="logo" style={{ marginBottom: 8 }}>
            <span className="logo-mark" style={{ width: 28, height: 28, fontSize: 13 }}>N</span>
            <span className="logo-text" style={{ fontSize: 15 }}>notstudio</span>
          </a>
          <p className="footer-credit">Matías Garrido &middot; @notmatyx &middot; Chile</p>
        </div>
        <div className="footer-links">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="footer-link">{l.label}</a>
          ))}
        </div>
        <div className="footer-social">
          <a href="https://tiktok.com/@notmatyx" target="_blank" rel="noopener noreferrer" className="footer-social-link">TikTok</a>
          <a href="https://instagram.com/notmatyx" target="_blank" rel="noopener noreferrer" className="footer-social-link">Instagram</a>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="footer-social-link">WhatsApp</a>
        </div>
      </div>
      <div className="footer-bottom container">
        <p className="footer-sign-off">Nos vemos, chavales</p>
        <p className="footer-copy">&copy; {new Date().getFullYear()} notstudio. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════════════════════════ */
const styles = `
/* ── Reset & Global ── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}
body {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  background: ${BG};
  color: ${GRAY[800]};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}
::selection {
  background: rgba(196, 30, 58, 0.12);
  color: ${DARK};
}
img { display: block; max-width: 100%; }
a { color: inherit; }

/* ── Layout ── */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
.section {
  padding: 120px 0;
  position: relative;
}
.section-alt {
  background: ${GRAY[50]};
}

/* ── Typography ── */
.section-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  color: ${CHERRY};
  letter-spacing: 0.18em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 12px;
}
.section-title {
  font-family: 'Sora', sans-serif;
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 800;
  color: ${DARK};
  letter-spacing: -0.03em;
  line-height: 1.05;
  text-transform: uppercase;
  margin-bottom: 20px;
}
.section-desc {
  font-size: 1.1rem;
  color: ${GRAY[500]};
  line-height: 1.65;
  max-width: 550px;
  margin-bottom: 60px;
}

/* ── Header ── */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.header-scrolled {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 20px rgba(0, 0, 0, 0.04);
}
.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}
.logo-mark {
  width: 34px;
  height: 34px;
  background: ${CHERRY};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Sora', sans-serif;
  font-weight: 800;
  font-size: 16px;
  color: ${WHITE};
}
.logo-text {
  font-family: 'Sora', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: ${DARK};
}
.nav-desktop {
  display: flex;
  gap: 32px;
  align-items: center;
}
.nav-link {
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 500;
  color: ${GRAY[500]};
  transition: color 0.25s;
  letter-spacing: 0.01em;
}
.nav-link:hover {
  color: ${CHERRY};
}
.btn-header {
  background: ${CHERRY};
  color: ${WHITE};
  text-decoration: none;
  padding: 10px 26px;
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.3s;
}
.btn-header:hover {
  background: ${CHERRY_DARK};
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(196, 30, 58, 0.25);
}
.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  position: relative;
  width: 40px;
  height: 40px;
}
.hamburger {
  display: block;
  width: 22px;
  height: 2px;
  background: ${DARK};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s;
}
.hamburger::before, .hamburger::after {
  content: '';
  position: absolute;
  width: 22px;
  height: 2px;
  background: ${DARK};
  left: 0;
  transition: all 0.3s;
}
.hamburger::before { top: -7px; }
.hamburger::after { top: 7px; }
.hamburger.open { background: transparent; }
.hamburger.open::before { top: 0; transform: rotate(45deg); }
.hamburger.open::after { top: 0; transform: rotate(-45deg); }
.nav-mobile {
  overflow: hidden;
  background: rgba(255,255,255,0.96);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-top: 1px solid rgba(0,0,0,0.06);
  padding: 0 24px;
}
.nav-mobile-link {
  display: block;
  text-decoration: none;
  color: ${GRAY[700]};
  font-size: 1.05rem;
  font-weight: 500;
  padding: 16px 0;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.btn-mobile {
  display: block;
  background: ${CHERRY};
  color: ${WHITE};
  text-decoration: none;
  text-align: center;
  padding: 16px 24px;
  border-radius: 100px;
  font-weight: 600;
  font-size: 0.95rem;
  margin: 16px 0;
}

/* ── Hero ── */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: ${WHITE};
  padding: 140px 24px 80px;
}
.hero-blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.hero-blob-1 {
  width: 700px;
  height: 700px;
  top: -250px;
  right: -200px;
  background: radial-gradient(circle, rgba(196,30,58,0.08) 0%, transparent 70%);
}
.hero-blob-2 {
  width: 500px;
  height: 500px;
  bottom: -150px;
  left: -150px;
  background: radial-gradient(circle, rgba(196,30,58,0.05) 0%, transparent 70%);
}
.hero-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
}
.hero-content {
  text-align: center;
  position: relative;
  z-index: 1;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(196,30,58,0.06);
  border: 1px solid rgba(196,30,58,0.12);
  border-radius: 100px;
  padding: 8px 22px;
  margin-bottom: 36px;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${GRAY[600]};
}
.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22C55E;
  position: relative;
  flex-shrink: 0;
}
.pulse-dot::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: rgba(34, 197, 94, 0.3);
  animation: pulse-ring 2s ease-in-out infinite;
}
.hero-title {
  font-family: 'Sora', sans-serif;
  font-size: clamp(2.8rem, 8vw, 6.5rem);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.04em;
  color: ${DARK};
  margin-bottom: 28px;
}
.hero-title-accent {
  color: ${CHERRY};
  position: relative;
}
.hero-subtitle {
  font-size: clamp(1rem, 2.2vw, 1.25rem);
  color: ${GRAY[500]};
  line-height: 1.65;
  max-width: 560px;
  margin: 0 auto 16px;
}
.hero-words {
  height: 44px;
  overflow: hidden;
  margin-bottom: 40px;
}
.hero-words-track {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.hero-word {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Sora', sans-serif;
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-weight: 600;
  color: ${GRAY[700]};
}
.hero-ctas {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 60px;
}
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: ${CHERRY};
  color: ${WHITE};
  padding: 16px 36px;
  border-radius: 100px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s;
  box-shadow: 0 4px 24px rgba(196,30,58,0.2);
}
.btn-primary:hover {
  background: ${CHERRY_DARK};
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(196,30,58,0.3);
}
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: ${GRAY[700]};
  padding: 16px 36px;
  border-radius: 100px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  border: 1.5px solid ${GRAY[200]};
  transition: all 0.3s;
}
.btn-secondary:hover {
  border-color: ${CHERRY};
  color: ${CHERRY};
  transform: translateY(-2px);
}
.hero-stats {
  display: flex;
  gap: 48px;
  justify-content: center;
  flex-wrap: wrap;
  padding: 32px 40px;
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 20px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.04);
}
.hero-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.hero-stat-num {
  font-family: 'Sora', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: ${DARK};
  letter-spacing: -0.02em;
}
.hero-stat-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: ${GRAY[400]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.scroll-indicator {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.5;
}

/* ── Marquee ── */
.marquee-section {
  padding: 0;
  overflow: hidden;
  background: ${CHERRY};
  position: relative;
}
.marquee-tilt {
  transform: rotate(-2deg) scale(1.05);
  padding: 20px 0;
}
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 25s linear infinite;
}
.marquee-item {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 24px;
  font-family: 'Sora', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: ${WHITE};
  white-space: nowrap;
  letter-spacing: 0.04em;
}
.marquee-dot {
  font-size: 0.6rem;
  opacity: 0.5;
}

/* ── Bento Grid ── */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.bento-span-2 { grid-column: span 2; }
.bento-span-1 { grid-column: span 1; }
.bento-card {
  background: ${WHITE};
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  cursor: default;
}
.bento-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, ${CHERRY}, ${CHERRY_LIGHT});
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 2;
}
.bento-card:hover {
  box-shadow: 0 20px 60px rgba(0,0,0,0.08);
  border-color: rgba(196,30,58,0.12);
}
.bento-card:hover::before {
  transform: scaleX(1);
}
.bento-img-wrap {
  position: relative;
  height: 180px;
  overflow: hidden;
}
.bento-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.bento-card:hover .bento-img {
  transform: scale(1.05);
}
.bento-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.95) 100%);
}
.bento-body {
  padding: 28px 32px 32px;
}
.bento-emoji {
  font-size: 2rem;
  display: block;
  margin-bottom: 16px;
}
.bento-title {
  font-family: 'Sora', sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: ${DARK};
  margin-bottom: 10px;
}
.bento-desc {
  font-size: 0.95rem;
  color: ${GRAY[500]};
  line-height: 1.65;
  margin-bottom: 20px;
}
.bento-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.bento-tag {
  font-size: 0.75rem;
  font-weight: 600;
  color: ${CHERRY};
  background: rgba(196,30,58,0.06);
  padding: 5px 14px;
  border-radius: 100px;
  letter-spacing: 0.01em;
}

/* ── Projects ── */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.project-card {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  aspect-ratio: 16/11;
  cursor: pointer;
  border: 1px solid rgba(0,0,0,0.06);
}
.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.project-card:hover .project-img {
  transform: scale(1.06);
}
.project-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 32px;
  transition: background 0.4s;
}
.project-card:hover .project-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.15) 100%);
}
.project-badge {
  display: inline-block;
  width: fit-content;
  padding: 5px 14px;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 700;
  color: ${WHITE};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
}
.project-title {
  font-family: 'Sora', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${WHITE};
  margin-bottom: 8px;
}
.project-desc {
  font-size: 0.9rem;
  color: rgba(255,255,255,0.7);
  line-height: 1.55;
}

/* ── Testimonials ── */
.testimonials-wrap {
  overflow: hidden;
  padding: 0 0 20px;
}
.testimonials-row {
  display: flex;
  gap: 20px;
  width: max-content;
  padding: 10px 0;
}
.testimonials-row-left {
  animation: marquee 40s linear infinite;
}
.testimonials-row-right {
  animation: marquee-reverse 45s linear infinite;
}
.testimonial-card {
  width: 400px;
  background: ${WHITE};
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 20px;
  padding: 32px;
  position: relative;
  flex-shrink: 0;
  transition: box-shadow 0.3s, border-color 0.3s;
}
.testimonial-card:hover {
  box-shadow: 0 12px 40px rgba(0,0,0,0.06);
  border-color: rgba(196,30,58,0.12);
}
.testimonial-quote {
  font-family: Georgia, serif;
  font-size: 3rem;
  color: ${CHERRY};
  line-height: 1;
  opacity: 0.25;
  position: absolute;
  top: 20px;
  right: 28px;
}
.testimonial-text {
  font-size: 0.95rem;
  color: ${GRAY[600]};
  line-height: 1.7;
  margin-bottom: 24px;
}
.testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
}
.testimonial-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(196,30,58,0.08);
  color: ${CHERRY};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Sora', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}
.testimonial-name {
  font-family: 'Sora', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  color: ${DARK};
}
.testimonial-role {
  font-size: 0.8rem;
  color: ${GRAY[400]};
  margin-top: 2px;
}

/* ── Timeline ── */
.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}
.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, rgba(196,30,58,0.1), ${CHERRY}, rgba(196,30,58,0.1));
  transform: translateX(-50%);
}
.timeline-item {
  display: flex;
  align-items: flex-start;
  position: relative;
  margin-bottom: 48px;
  width: 50%;
}
.timeline-left {
  padding-right: 48px;
  text-align: right;
  margin-left: 0;
}
.timeline-right {
  padding-left: 48px;
  text-align: left;
  margin-left: 50%;
}
.timeline-dot {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${WHITE};
  border: 2px solid ${GRAY[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
.timeline-left .timeline-dot {
  right: -10px;
}
.timeline-right .timeline-dot {
  left: -10px;
}
.timeline-dot-inner {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.timeline-card {
  background: ${WHITE};
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.04);
  transition: box-shadow 0.3s, transform 0.3s;
}
.timeline-card:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  transform: translateY(-2px);
}
.timeline-meta {
  display: flex;
  gap: 12px;
  align-items: baseline;
  margin-bottom: 8px;
}
.timeline-left .timeline-meta {
  justify-content: flex-end;
}
.timeline-year {
  font-family: 'Sora', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: ${DARK};
}
.timeline-age {
  font-size: 0.8rem;
  color: ${CHERRY};
  font-weight: 600;
}
.timeline-title {
  font-family: 'Sora', sans-serif;
  font-weight: 600;
  font-size: 1.05rem;
  color: ${GRAY[800]};
  margin-bottom: 6px;
}
.timeline-desc {
  font-size: 0.9rem;
  color: ${GRAY[500]};
  line-height: 1.6;
}

/* ── Pricing ── */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: start;
}
.price-card {
  background: ${WHITE};
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 24px;
  padding: 40px 32px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.price-card:hover {
  box-shadow: 0 20px 60px rgba(0,0,0,0.07);
}
.price-card-popular {
  background: ${CHERRY};
  border: none;
  transform: scale(1.04);
  box-shadow: 0 24px 60px rgba(196,30,58,0.2);
}
.price-card-popular:hover {
  box-shadow: 0 28px 70px rgba(196,30,58,0.25);
}
.price-popular-badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: ${WHITE};
  color: ${CHERRY};
  padding: 6px 20px;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  white-space: nowrap;
}
.price-name {
  font-family: 'Sora', sans-serif;
  font-weight: 700;
  font-size: 1.35rem;
  color: ${DARK};
  margin-bottom: 8px;
}
.price-card-popular .price-name { color: ${WHITE}; }
.price-desc {
  font-size: 0.9rem;
  color: ${GRAY[500]};
  margin-bottom: 24px;
  line-height: 1.5;
}
.price-card-popular .price-desc { color: rgba(255,255,255,0.7); }
.price-amount {
  font-family: 'Sora', sans-serif;
  font-weight: 800;
  font-size: 1.8rem;
  color: ${DARK};
  margin-bottom: 32px;
  letter-spacing: -0.02em;
}
.price-card-popular .price-amount { color: ${WHITE}; }
.price-currency {
  font-size: 0.85rem;
  font-weight: 400;
  color: ${GRAY[400]};
}
.price-card-popular .price-currency { color: rgba(255,255,255,0.6); }
.price-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 32px;
}
.price-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;
  color: ${GRAY[600]};
}
.price-card-popular .price-feature { color: rgba(255,255,255,0.85); }
.price-card-popular .price-feature svg path { stroke: ${WHITE}; }
.price-cta {
  display: block;
  text-align: center;
  padding: 14px 28px;
  border-radius: 100px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s;
  background: transparent;
  color: ${DARK};
  border: 1.5px solid ${GRAY[200]};
}
.price-cta:hover {
  border-color: ${CHERRY};
  color: ${CHERRY};
  transform: translateY(-2px);
}
.price-cta-popular {
  background: ${WHITE};
  color: ${CHERRY};
  border: none;
}
.price-cta-popular:hover {
  background: rgba(255,255,255,0.9);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

/* ── FAQ ── */
.faq-item {
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.faq-item-open {
  border-color: rgba(196,30,58,0.15);
}
.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 24px 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: 'Sora', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: ${DARK};
  transition: color 0.25s;
}
.faq-question:hover {
  color: ${CHERRY};
}
.faq-item-open .faq-question {
  color: ${CHERRY};
}
.faq-icon {
  font-size: 1.5rem;
  font-weight: 300;
  color: ${CHERRY};
  display: inline-block;
  flex-shrink: 0;
  width: 28px;
  text-align: center;
}
.faq-answer-wrap {
  overflow: hidden;
}
.faq-answer {
  padding: 0 0 24px;
  font-size: 0.95rem;
  color: ${GRAY[500]};
  line-height: 1.7;
  max-width: 640px;
}

/* ── Contact ── */
.contact-section {
  background: linear-gradient(135deg, ${CHERRY_DARK} 0%, ${CHERRY} 50%, ${CHERRY_LIGHT} 100%);
  padding: 120px 0;
  position: relative;
  overflow: hidden;
}
.contact-section::before {
  content: '';
  position: absolute;
  top: -200px;
  right: -200px;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: rgba(255,255,255,0.06);
  pointer-events: none;
}
.contact-section::after {
  content: '';
  position: absolute;
  bottom: -150px;
  left: -150px;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: rgba(0,0,0,0.08);
  pointer-events: none;
}
.contact-inner {
  position: relative;
  z-index: 1;
}
.contact-title {
  font-family: 'Sora', sans-serif;
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 800;
  color: rgba(255,255,255,0.85);
  line-height: 0.95;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  margin-bottom: 24px;
}
.contact-subtitle {
  font-size: 1.15rem;
  color: rgba(255,255,255,0.7);
  line-height: 1.6;
  max-width: 480px;
  margin: 0 auto 40px;
}
.btn-wa-large {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: ${WHITE};
  color: ${CHERRY};
  padding: 20px 48px;
  border-radius: 100px;
  text-decoration: none;
  font-family: 'Sora', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  transition: all 0.3s;
  margin-bottom: 32px;
}
.btn-wa-large:hover {
  box-shadow: 0 12px 40px rgba(0,0,0,0.2);
}
.contact-social {
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.contact-social a {
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.25s;
}
.contact-social a:hover {
  color: ${WHITE};
}
.contact-divider {
  color: rgba(255,255,255,0.2);
}

/* ── Footer ── */
.footer {
  background: ${DARK};
  padding: 60px 0 40px;
}
.footer .logo-text {
  color: ${WHITE};
}
.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.footer-credit {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.4);
}
.footer-links {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}
.footer-link {
  font-size: 0.88rem;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  transition: color 0.25s;
}
.footer-link:hover {
  color: ${WHITE};
}
.footer-social {
  display: flex;
  gap: 20px;
}
.footer-social-link {
  font-size: 0.88rem;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  transition: color 0.25s;
}
.footer-social-link:hover {
  color: ${CHERRY};
}
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 32px;
  flex-wrap: wrap;
  gap: 16px;
}
.footer-sign-off {
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255,255,255,0.5);
  font-style: italic;
}
.footer-copy {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.25);
}

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: ${GRAY[100]}; }
::-webkit-scrollbar-thumb { background: ${CHERRY}; border-radius: 8px; }

/* ── Keyframes ── */
@keyframes pulse-ring {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.8); opacity: 0; }
}
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes marquee-reverse {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

/* ── Responsive ── */
.hide-mobile { }

@media (max-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .bento-span-2 { grid-column: span 2; }
  .bento-span-1 { grid-column: span 1; }
  .pricing-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .pricing-grid > :last-child {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .section { padding: 80px 0; }
  .section-title { margin-bottom: 16px; }
  .section-desc { margin-bottom: 40px; }

  .nav-desktop { display: none; }
  .btn-header { display: none; }
  .menu-toggle { display: block; }

  .hide-mobile { display: none; }

  .hero { padding: 120px 24px 60px; min-height: auto; }
  .hero-title { margin-bottom: 20px; }
  .hero-stats { gap: 24px; padding: 24px 20px; }
  .hero-stat-num { font-size: 1.5rem; }

  .bento-grid {
    grid-template-columns: 1fr;
  }
  .bento-span-2, .bento-span-1 {
    grid-column: span 1;
  }
  .bento-img-wrap { height: 140px; }
  .bento-body { padding: 24px; }

  .projects-grid {
    grid-template-columns: 1fr;
  }
  .project-card {
    aspect-ratio: 16/12;
  }

  .testimonial-card { width: 320px; }

  .timeline-line {
    left: 16px;
  }
  .timeline-item {
    width: 100%;
    margin-left: 0;
    padding-left: 48px;
    padding-right: 0;
    text-align: left;
  }
  .timeline-left, .timeline-right {
    margin-left: 0;
    padding-left: 48px;
    padding-right: 0;
    text-align: left;
  }
  .timeline-left .timeline-dot,
  .timeline-right .timeline-dot {
    left: 6px;
    right: auto;
  }
  .timeline-left .timeline-meta {
    justify-content: flex-start;
  }

  .pricing-grid {
    grid-template-columns: 1fr;
  }
  .pricing-grid > :last-child {
    grid-column: span 1;
  }
  .price-card-popular {
    transform: none;
    order: -1;
  }

  .contact-title {
    font-size: 2.5rem;
  }
  .btn-wa-large {
    padding: 18px 32px;
    font-size: 1rem;
  }

  .footer-inner {
    flex-direction: column;
    gap: 32px;
  }
  .footer-links { flex-direction: column; gap: 12px; }
  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .hero-ctas { flex-direction: column; align-items: stretch; }
  .hero-ctas a { justify-content: center; }
  .hero-stats { flex-direction: column; gap: 20px; }
  .testimonial-card { width: 280px; padding: 24px; }
  .price-card { padding: 32px 24px; }
}
`;

/* ═══════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <style>{styles}</style>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Projects />
        <TestimonialsMarquee />
        <Story />
        <PricingSection />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
