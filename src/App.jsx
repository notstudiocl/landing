import { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

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
    stack: ["WordPress", "React", "Next.js", "Tailwind CSS"],
    result: "15+ sitios entregados",
    span: 2,
  },
  {
    icon: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
    emoji: "\u{1F6D2}",
    title: "E-Commerce",
    desc: "Tiendas online completas. Pasarela de pagos, inventario, catálogo y panel de administración.",
    stack: ["WooCommerce", "Transbank", "Shopify", "MercadoPago"],
    result: "10+ tiendas activas",
    span: 1,
  },
  {
    icon: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=600&q=80",
    emoji: "\u26A1",
    title: "Automatizaciones",
    desc: "Elimina el trabajo manual. Workflows que conectan tus herramientas y ahorran horas cada semana.",
    stack: ["n8n", "Zapier", "APIs REST", "Webhooks"],
    result: "500+ horas ahorradas",
    span: 1,
  },
  {
    icon: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    emoji: "\u{1F4CA}",
    title: "Apps Web",
    desc: "Dashboards, sistemas de gestión y soluciones a medida. Todo en la nube, accesible desde cualquier dispositivo.",
    stack: ["React", "Node.js", "PostgreSQL", "Firebase"],
    result: "8 sistemas en producción",
    span: 1,
  },
  {
    icon: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80",
    emoji: "\u{1F4E3}",
    title: "Campañas de Marketing",
    desc: "Estrategias de Meta Ads y Google Ads que generan resultados reales. Segmentación, creatividades y optimización continua. Diego lidera esta área.",
    stack: ["Meta Ads", "Google Ads", "Analytics", "Looker Studio"],
    result: "3x ROAS promedio",
    span: 2,
  },
];

const PROJECTS = [
  {
    title: "Virtual Keys",
    category: "E-Commerce",
    desc: "Tienda de productos digitales con entrega automatizada al instante. Sistema de licencias, pasarela de pago integrada y panel de administración completo para gestionar stock y ventas.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    color: CHERRY,
    stack: ["WooCommerce", "WordPress", "PHP", "Transbank"],
    results: "+200 ventas primer mes",
    review: "#",
  },
  {
    title: "Sistema de Gestión",
    category: "Web App",
    desc: "Dashboard administrativo con reportes en tiempo real, control de inventario, gestión de usuarios con roles y exportación de datos. Accesible desde cualquier dispositivo.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    color: "#2563EB",
    stack: ["React", "Node.js", "PostgreSQL", "Chart.js"],
    results: "40h/mes automatizadas",
    review: "#",
  },
  {
    title: "Automatización CRM",
    category: "Automatización",
    desc: "Pipeline de leads automatizado con scoring inteligente, seguimiento por etapas, notificaciones en tiempo real y sincronización con WhatsApp y email marketing.",
    img: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=800&q=80",
    color: "#7C3AED",
    stack: ["n8n", "Google Sheets", "WhatsApp API", "Webhooks"],
    results: "20h semanales ahorradas",
    review: "#",
  },
  {
    title: "Web Corporativa",
    category: "Sitio Web",
    desc: "Presencia digital profesional con formularios de captación, blog integrado, SEO técnico optimizado y métricas de conversión. Diseño responsive pixel-perfect.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    color: "#059669",
    stack: ["WordPress", "Elementor", "SEO", "Analytics"],
    results: "3x tráfico orgánico",
    review: "#",
  },
  {
    title: "Campaña E-Commerce",
    category: "Campaña Marketing",
    desc: "Estrategia completa de Meta Ads para tienda de ropa online. Segmentación de audiencias, creatividades A/B testing, retargeting dinámico y optimización de ROAS.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    color: "#EA580C",
    stack: ["Meta Ads", "Pixel", "Google Analytics", "Looker Studio"],
    results: "3.2x ROAS promedio",
    review: "#",
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
    price: "Desde $250.000",
    desc: "Presencia digital profesional que convierte.",
    features: ["Diseño personalizado", "Responsive mobile-first", "Optimización SEO", "Formulario de contacto", "Hosting primer año", "Entrega en 5-7 días"],
    popular: false,
  },
  {
    name: "E-Commerce",
    price: "Desde $400.000",
    desc: "Tu tienda online lista para vender.",
    features: ["Todo lo de Landing Page", "Catálogo de productos", "Pasarela de pagos", "Gestión de inventario", "Panel de administración", "Soporte 30 días"],
    popular: true,
  },
  {
    name: "Campaña Marketing",
    price: "Desde $200.000",
    desc: "Meta Ads y Google Ads que generan ventas reales.",
    features: ["Estrategia de campaña", "Segmentación de audiencias", "Creatividades optimizadas", "Pixel y tracking", "Reportes semanales", "Optimización continua"],
    popular: false,
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
  { q: "¿Qué tecnologías usan?", a: "WordPress, React, Node.js, n8n para automatizaciones, WooCommerce para e-commerce, y lo que el proyecto necesite. No nos casamos con una sola herramienta." },
  { q: "¿Incluyen hosting y dominio?", a: "El hosting del primer año va incluido en todos los planes. El dominio lo podemos gestionar nosotros o si ya tienes uno, lo configuramos sin problema." },
  { q: "¿Cómo es el proceso de trabajo?", a: "Hablamos por WhatsApp, definimos alcance, te pasamos una propuesta formal, pagas el 50% de anticipo, desarrollo, revisiones, entrega y pagas el resto. Simple y directo." },
  { q: "¿Qué pasa si necesito cambios después?", a: "Incluimos un período de soporte post-entrega en todos los planes. Después de eso, ofrecemos planes de mantenimiento o cambios puntuales con tarifas preferenciales." },
  { q: "¿Trabajan con empresas grandes?", a: "Trabajamos con emprendedores, pymes y startups principalmente. Si tu proyecto necesita un equipo más grande, te lo decimos honestamente." },
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
   3D WIREFRAME GLOBE
   ═══════════════════════════════════════════════════════════════ */
function Globe({ size = 32 }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    let rotation = 0;
    const R = size / 2 - 1.5;
    const cx = size / 2;
    const cy = size / 2;
    const segments = 48;

    function project(x, y, z) {
      const cosR = Math.cos(rotation);
      const sinR = Math.sin(rotation);
      return {
        x: cx + (x * cosR + z * sinR),
        y: cy - y,
        z: -x * sinR + z * cosR,
      };
    }

    function draw() {
      ctx.clearRect(0, 0, size, size);
      ctx.strokeStyle = CHERRY;
      ctx.lineWidth = 0.7;

      // Longitude lines (meridians)
      for (let i = 0; i < 8; i++) {
        const theta = (i / 8) * Math.PI;
        for (let j = 0; j < segments; j++) {
          const phi1 = (j / segments) * Math.PI * 2;
          const phi2 = ((j + 1) / segments) * Math.PI * 2;
          const p1 = project(
            R * Math.sin(phi1) * Math.cos(theta),
            R * Math.cos(phi1),
            R * Math.sin(phi1) * Math.sin(theta)
          );
          const p2 = project(
            R * Math.sin(phi2) * Math.cos(theta),
            R * Math.cos(phi2),
            R * Math.sin(phi2) * Math.sin(theta)
          );
          ctx.globalAlpha = 0.08 + 0.55 * ((p1.z / R + 1) / 2);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      // Latitude lines (parallels)
      for (let i = 1; i <= 5; i++) {
        const phi = (i / 6) * Math.PI;
        const r = R * Math.sin(phi);
        const yPos = R * Math.cos(phi);
        for (let j = 0; j < segments; j++) {
          const t1 = (j / segments) * Math.PI * 2;
          const t2 = ((j + 1) / segments) * Math.PI * 2;
          const p1 = project(r * Math.cos(t1), yPos, r * Math.sin(t1));
          const p2 = project(r * Math.cos(t2), yPos, r * Math.sin(t2));
          ctx.globalAlpha = 0.08 + 0.55 * ((p1.z / R + 1) / 2);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      // Outer ring
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      ctx.globalAlpha = 1;
      rotation += 0.006;
      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, flexShrink: 0 }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   3D HERO COMPONENTS
   ═══════════════════════════════════════════════════════════════ */
function FloatingShape({ position, scale, color, speed, type, mouseRef }) {
  const meshRef = useRef();
  const smoothMouse = useRef({ x: 0, y: 0 });
  const geometry = useMemo(() => {
    switch (type) {
      case "sphere":
        return new THREE.SphereGeometry(1, 32, 32);
      case "torus":
        return new THREE.TorusGeometry(1, 0.4, 16, 32);
      case "icosahedron":
        return new THREE.IcosahedronGeometry(1, 0);
      default:
        return new THREE.SphereGeometry(1, 32, 32);
    }
  }, [type]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const lerpFactor = 1 - Math.pow(0.05, delta);

    if (mouseRef.current) {
      smoothMouse.current.x += (mouseRef.current.x - smoothMouse.current.x) * lerpFactor;
      smoothMouse.current.y += (mouseRef.current.y - smoothMouse.current.y) * lerpFactor;
    }

    const floatX = Math.cos(t * speed * 0.3) * 0.2;
    const floatY = Math.sin(t * speed * 0.5) * 0.35;
    const floatZ = Math.sin(t * speed * 0.4) * 0.15;

    meshRef.current.position.x = position[0] + floatX + smoothMouse.current.x * 0.6;
    meshRef.current.position.y = position[1] + floatY + smoothMouse.current.y * 0.4;
    meshRef.current.position.z = position[2] + floatZ;

    meshRef.current.rotation.x += 0.003 * speed;
    meshRef.current.rotation.y += 0.004 * speed;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
      <meshPhysicalMaterial
        color={color}
        transmission={0.6}
        thickness={0.5}
        roughness={0.1}
        metalness={0.1}
        ior={1.5}
        transparent
        opacity={0.7}
        envMapIntensity={1}
      />
    </mesh>
  );
}

function FloatingParticles({ count = 50 }) {
  const pointsRef = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, [count]);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005;
      pointsRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#C41E3A"
        size={0.04}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function HeroScene({ isMobile, mouseRef }) {
  const shapes = useMemo(() => {
    const all = [
      { position: [-3, 1.5, -1], scale: 0.6, color: "#C41E3A", speed: 0.8, type: "sphere" },
      { position: [3.5, -1, -2], scale: 0.5, color: "#FFB3C1", speed: 1.0, type: "torus" },
      { position: [-2, -1.5, 0], scale: 0.45, color: "#FFFFFF", speed: 0.6, type: "icosahedron" },
      { position: [2, 2, -1.5], scale: 0.35, color: "#C41E3A", speed: 1.2, type: "sphere" },
      { position: [-4, 0, -2], scale: 0.4, color: "#FFB3C1", speed: 0.7, type: "torus" },
      { position: [4, 0.5, -1], scale: 0.55, color: "#FFFFFF", speed: 0.9, type: "icosahedron" },
      { position: [0, -2.5, -1], scale: 0.3, color: "#C41E3A", speed: 1.1, type: "sphere" },
    ];
    return isMobile ? all.slice(0, 4) : all;
  }, [isMobile]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#FFFFFF" />
      <directionalLight position={[-3, 3, 2]} intensity={0.4} color="#FFB3C1" />
      <Environment preset="city" />
      {shapes.map((s, i) => (
        <FloatingShape key={i} {...s} mouseRef={mouseRef} />
      ))}
      <FloatingParticles count={isMobile ? 25 : 50} />
    </>
  );
}

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
          <Globe size={32} />
          <span className="logo-text">NotStudio</span>
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
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const words = ["Sistemas", "E-commerce", "Automatizaciones", "Apps Web"];
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const i = setInterval(() => setWordIdx((c) => (c + 1) % words.length), 2500);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafRef.current = requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="hero">
      <div
        className="hero-canvas-wrap"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      >
        <Suspense fallback={<div className="hero-canvas-fallback" />}>
          <Canvas
            dpr={[1, isMobile ? 1.5 : 2]}
            gl={{ alpha: true, antialias: true }}
            camera={{ position: [0, 0, 6], fov: 45 }}
            onPointerMove={(e) => {
              if (isMobile) return;
              mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
              mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
            }}
            style={{ pointerEvents: "auto" }}
          >
            <HeroScene isMobile={isMobile} mouseRef={mouseRef} />
          </Canvas>
        </Suspense>
      </div>

      <div className="hero-overlay" />

      <div
        className="container hero-content"
        style={{ transform: `translateY(${-scrollY * 0.3}px)` }}
      >
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
          <h2 className="section-title">LO QUE HACEMOS</h2>
          <p className="section-desc">
            Sin tecnicismos. Sin vueltas. Te armamos un sistema que funcione y que tu negocio necesita para crecer.
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
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="bento-img-wrap">
                <img src={s.icon} alt={s.title} className="bento-img" loading="lazy" />
                <div className="bento-img-overlay" />
              </div>
              <div className="bento-body">
                <div className="bento-header">
                  <span className="bento-emoji">{s.emoji}</span>
                  {s.result && <span className="bento-result">{s.result}</span>}
                </div>
                <h3 className="bento-title">{s.title}</h3>
                <p className="bento-desc">{s.desc}</p>
                <div className="bento-stack-label">Stack tecnológico</div>
                <div className="bento-tags">
                  {s.stack.map((t, j) => (
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
   PROJECTS (CAROUSEL)
   ═══════════════════════════════════════════════════════════════ */
function Projects() {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef(null);
  const dragStart = useRef(0);
  const dragOffset = useRef(0);

  const goTo = (idx) => setCurrent(Math.max(0, Math.min(idx, PROJECTS.length - 1)));
  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  const handleDragStart = (e) => {
    setDragging(true);
    dragStart.current = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    dragOffset.current = 0;
  };
  const handleDragMove = (e) => {
    if (!dragging) return;
    const x = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    dragOffset.current = x - dragStart.current;
  };
  const handleDragEnd = () => {
    if (!dragging) return;
    setDragging(false);
    if (dragOffset.current < -60) next();
    else if (dragOffset.current > 60) prev();
  };

  return (
    <section id="proyectos" className="section">
      <div className="container">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
          <span className="section-label">PORTAFOLIO</span>
          <h2 className="section-title">PROYECTOS REALES</h2>
          <p className="section-desc">Resultados concretos, no promesas. Cada proyecto entregado con obsesión por el detalle.</p>
        </motion.div>
      </div>

      <motion.div
        className="carousel-wrap"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeUp}
      >
        <div
          className="carousel-track"
          ref={trackRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          style={{
            transform: `translateX(calc(-${current * 100}% - ${current * 24}px))`,
            transition: dragging ? "none" : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {PROJECTS.map((p, i) => (
            <div key={i} className="carousel-slide">
              <div className="carousel-card">
                <div className="carousel-img-wrap">
                  <img src={p.img} alt={p.title} className="carousel-img" loading="lazy" />
                  <div className="carousel-img-gradient" />
                  <span className="carousel-badge" style={{ background: p.color }}>{p.category}</span>
                  {p.results && (
                    <span className="carousel-result">{p.results}</span>
                  )}
                </div>
                <div className="carousel-body">
                  <h3 className="carousel-title">{p.title}</h3>
                  <p className="carousel-desc">{p.desc}</p>
                  <div className="carousel-stack">
                    {p.stack.map((tech, j) => (
                      <span key={j} className="carousel-tech">{tech}</span>
                    ))}
                  </div>
                  <a href={p.review} className="carousel-review-btn">
                    Ver testimonio del cliente
                    <ArrowIcon />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="carousel-nav">
          <button className="carousel-arrow" onClick={prev} disabled={current === 0} aria-label="Anterior">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M15 10H5M5 10L10 5M5 10L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div className="carousel-dots">
            {PROJECTS.map((_, i) => (
              <button key={i} className={`carousel-dot ${i === current ? "carousel-dot-active" : ""}`} onClick={() => goTo(i)} aria-label={`Proyecto ${i + 1}`} />
            ))}
          </div>
          <button className="carousel-arrow" onClick={next} disabled={current === PROJECTS.length - 1} aria-label="Siguiente">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </motion.div>
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
          <span className="section-label">SOBRE NOSOTROS</span>
          <h2 className="section-title">NUESTRA HISTORIA</h2>
          <p className="section-desc">
            10 años de experiencia. Del primer HTML a los sistemas que mueven negocios hoy.
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
  const [form, setForm] = useState({ nombre: "", whatsapp: "", correo: "", presupuesto: "", mensaje: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://n8n-n8n.f8ihph.easypanel.host/webhook-test/notstudioleads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, fecha: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error("Error");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

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
            Completa el formulario y en menos de 24 horas tienes respuesta de nuestro equipo. Sin compromiso, sin vueltas.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
        >
          {status === "success" ? (
            <div className="contact-success">
              <span style={{ fontSize: "2.5rem", display: "block", marginBottom: 16 }}>{"\u2705"}</span>
              <h3 className="contact-success-title">{"\u00A1"}Mensaje enviado!</h3>
              <p className="contact-success-text">Te respondemos en menos de 24 horas.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-field">
                  <label className="contact-label">Nombre completo</label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    placeholder="Tu nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className="contact-input"
                  />
                </div>
                <div className="contact-field">
                  <label className="contact-label">WhatsApp</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    required
                    placeholder="+56 9 1234 5678"
                    value={form.whatsapp}
                    onChange={handleChange}
                    className="contact-input"
                  />
                </div>
              </div>
              <div className="contact-form-row">
                <div className="contact-field">
                  <label className="contact-label">Correo electrónico</label>
                  <input
                    type="email"
                    name="correo"
                    required
                    placeholder="tu@correo.com"
                    value={form.correo}
                    onChange={handleChange}
                    className="contact-input"
                  />
                </div>
                <div className="contact-field">
                  <label className="contact-label">Rango de presupuesto</label>
                  <select
                    name="presupuesto"
                    required
                    value={form.presupuesto}
                    onChange={handleChange}
                    className={`contact-input contact-select ${!form.presupuesto ? "contact-select-placeholder" : ""}`}
                  >
                    <option value="" disabled>Selecciona un rango</option>
                    <option value="Menos de $150.000">Menos de $150.000</option>
                    <option value="$150.000 - $350.000">$150.000 - $350.000</option>
                    <option value="$350.000 - $700.000">$350.000 - $700.000</option>
                    <option value="Más de $700.000">Más de $700.000</option>
                    <option value="No tengo claro">No tengo claro</option>
                  </select>
                </div>
              </div>
              <div className="contact-field">
                <label className="contact-label">{"\u00BF"}Qué necesitas?</label>
                <textarea
                  name="mensaje"
                  required
                  rows={4}
                  placeholder="Cuéntanos brevemente tu proyecto..."
                  value={form.mensaje}
                  onChange={handleChange}
                  className="contact-input contact-textarea"
                />
              </div>
              {status === "error" && (
                <p className="contact-error">Hubo un problema al enviar. Intenta de nuevo o escríbenos directo por WhatsApp.</p>
              )}
              <motion.button
                type="submit"
                className="contact-submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {status === "loading" ? (
                  <span className="contact-spinner" />
                ) : (
                  "Enviar consulta"
                )}
              </motion.button>
            </form>
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeIn}
          className="contact-social"
          style={{ marginTop: 40 }}
        >
          <a href="https://instagram.com/notmatyx" target="_blank" rel="noopener noreferrer">@notmatyx en Instagram</a>
          <span className="contact-divider">|</span>
          <a href="https://tiktok.com/@notmatyx" target="_blank" rel="noopener noreferrer">@notmatyx en TikTok</a>
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
.hero-canvas-wrap {
  position: absolute;
  inset: 0;
  z-index: 0;
  will-change: transform;
}
.hero-canvas-fallback {
  width: 100%;
  height: 100%;
  background:
    radial-gradient(ellipse at 30% 20%, rgba(196,30,58,0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 80%, rgba(255,179,193,0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(196,30,58,0.04) 0%, transparent 70%);
}
.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: radial-gradient(ellipse at center, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 100%);
  pointer-events: none;
}
.hero-content {
  text-align: center;
  position: relative;
  z-index: 2;
  will-change: transform;
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
  box-shadow: 0 20px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(196,30,58,0.1);
  border-color: rgba(196,30,58,0.15);
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
.bento-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.bento-emoji {
  font-size: 2rem;
  display: block;
}
.bento-result {
  font-family: 'Sora', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  color: ${CHERRY};
  background: rgba(196,30,58,0.08);
  padding: 6px 14px;
  border-radius: 100px;
  white-space: nowrap;
}
.bento-stack-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: ${GRAY[400]};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 10px;
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

/* ── Projects Carousel ── */
.carousel-wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  overflow: hidden;
}
.carousel-track {
  display: flex;
  gap: 24px;
  cursor: grab;
  user-select: none;
}
.carousel-track:active { cursor: grabbing; }
.carousel-slide {
  min-width: 100%;
  flex-shrink: 0;
}
.carousel-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: ${WHITE};
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 32px rgba(0,0,0,0.06);
  transition: box-shadow 0.4s;
}
.carousel-card:hover {
  box-shadow: 0 16px 48px rgba(0,0,0,0.1);
}
.carousel-img-wrap {
  position: relative;
  min-height: 360px;
  overflow: hidden;
}
.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.carousel-card:hover .carousel-img {
  transform: scale(1.04);
}
.carousel-img-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, transparent 60%, rgba(255,255,255,0.15) 100%);
}
.carousel-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 6px 16px;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 700;
  color: ${WHITE};
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.carousel-result {
  position: absolute;
  bottom: 20px;
  left: 20px;
  padding: 8px 18px;
  border-radius: 12px;
  font-family: 'Sora', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  color: ${WHITE};
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.carousel-body {
  padding: 40px 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.carousel-title {
  font-family: 'Sora', sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: ${DARK};
  margin-bottom: 12px;
}
.carousel-desc {
  font-size: 0.95rem;
  color: ${GRAY[500]};
  line-height: 1.7;
  margin-bottom: 20px;
}
.carousel-stack {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}
.carousel-tech {
  font-size: 0.75rem;
  font-weight: 600;
  color: ${CHERRY};
  background: rgba(196,30,58,0.06);
  padding: 5px 14px;
  border-radius: 100px;
  letter-spacing: 0.01em;
}
.carousel-review-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${GRAY[700]};
  text-decoration: none;
  transition: color 0.25s;
}
.carousel-review-btn:hover {
  color: ${CHERRY};
}
.carousel-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 32px;
}
.carousel-arrow {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1.5px solid ${GRAY[200]};
  background: ${WHITE};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${GRAY[700]};
  transition: all 0.3s;
}
.carousel-arrow:hover:not(:disabled) {
  border-color: ${CHERRY};
  color: ${CHERRY};
  box-shadow: 0 4px 16px rgba(196,30,58,0.12);
}
.carousel-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.carousel-dots {
  display: flex;
  gap: 8px;
}
.carousel-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${GRAY[200]};
  cursor: pointer;
  transition: all 0.3s;
  padding: 0;
}
.carousel-dot-active {
  background: ${CHERRY};
  transform: scale(1.3);
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
  grid-template-columns: repeat(4, 1fr);
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
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.contact-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.contact-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
}
.contact-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255,255,255,0.75);
  letter-spacing: 0.02em;
}
.contact-input {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  color: ${DARK};
  background: rgba(255,255,255,0.92);
  border: 1.5px solid rgba(255,255,255,0.3);
  border-radius: 14px;
  padding: 14px 18px;
  outline: none;
  transition: all 0.3s;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.contact-input:focus {
  background: ${WHITE};
  border-color: ${WHITE};
  box-shadow: 0 0 0 3px rgba(255,255,255,0.2);
}
.contact-input::placeholder {
  color: ${GRAY[400]};
}
.contact-select {
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23555' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
  cursor: pointer;
}
.contact-select-placeholder {
  color: ${GRAY[400]};
}
.contact-textarea {
  resize: vertical;
  min-height: 100px;
}
.contact-submit {
  font-family: 'Sora', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: ${CHERRY};
  background: ${WHITE};
  border: none;
  border-radius: 100px;
  padding: 18px 48px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  align-self: center;
  min-width: 220px;
}
.contact-submit:hover {
  box-shadow: 0 12px 40px rgba(0,0,0,0.2);
}
.contact-submit:disabled {
  opacity: 0.85;
  cursor: wait;
}
.contact-spinner {
  width: 20px;
  height: 20px;
  border: 2.5px solid rgba(196,30,58,0.2);
  border-top-color: ${CHERRY};
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
.contact-success {
  max-width: 480px;
  margin: 0 auto;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 24px;
  padding: 48px 40px;
  text-align: center;
}
.contact-success-title {
  font-family: 'Sora', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: ${WHITE};
  margin-bottom: 8px;
}
.contact-success-text {
  font-size: 1rem;
  color: rgba(255,255,255,0.7);
}
.contact-error {
  font-size: 0.85rem;
  color: rgba(255,255,200,0.9);
  text-align: center;
  background: rgba(0,0,0,0.15);
  padding: 10px 16px;
  border-radius: 10px;
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
@keyframes spin {
  to { transform: rotate(360deg); }
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
}

@media (max-width: 768px) {
  .section { padding: 80px 0; }
  .section-title { margin-bottom: 16px; }
  .section-desc { margin-bottom: 40px; }

  .nav-desktop { display: none; }
  .btn-header { display: none; }
  .menu-toggle { display: block; }

  .hide-mobile { display: none; }

  .hero { padding: 120px 24px 60px; min-height: 100svh; }
  .hero-title { margin-bottom: 20px; }
  .hero-overlay {
    background: radial-gradient(ellipse at center, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.55) 100%);
  }
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

  .carousel-card {
    grid-template-columns: 1fr;
  }
  .carousel-img-wrap {
    min-height: 220px;
  }
  .carousel-body {
    padding: 28px 24px;
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
  .price-card-popular {
    transform: none;
    order: -1;
  }

  .contact-title {
    font-size: 2.5rem;
  }
  .contact-form-row {
    grid-template-columns: 1fr;
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
