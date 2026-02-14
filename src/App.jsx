import { useState, useEffect, useRef } from "react";

const CHERRY = "#C41E3A";
const CHERRY_DARK = "#A01830";
const DARK = "#0A0A0A";
const GRAY_900 = "#111111";
const GRAY_800 = "#1A1A1A";
const GRAY_700 = "#2A2A2A";
const GRAY_400 = "#888888";
const GRAY_300 = "#AAAAAA";
const WHITE = "#FAFAFA";

const WHATSAPP_LINK = "https://wa.me/56964286319?text=Hola%20Matías,%20vengo%20de%20notstudio.cl";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, direction = "up", style = {}, className = "" }) {
  const [ref, visible] = useInView();
  const dirs = { up: "translateY(40px)", down: "translateY(-40px)", left: "translateX(40px)", right: "translateX(-40px)", none: "none" };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : dirs[direction],
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function NavBar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { id: "servicios", label: "Servicios" },
    { id: "proyectos", label: "Proyectos" },
    { id: "historia", label: "Mi Historia" },
    { id: "testimonios", label: "Testimonios" },
    { id: "precios", label: "Precios" },
    { id: "contacto", label: "Contacto" },
  ];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.4s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, background: CHERRY, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 16, color: WHITE }}>N</div>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18, color: WHITE }}>notstudio</span>
        </a>
        {/* Desktop */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} style={{
              textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, letterSpacing: "0.02em",
              color: activeSection === l.id ? WHITE : GRAY_400,
              transition: "color 0.3s",
            }}>{l.label}</a>
          ))}
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{
            background: CHERRY, color: WHITE, padding: "10px 22px", borderRadius: 50, textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, transition: "background 0.3s",
          }}>Hablemos</a>
        </div>
        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" style={{
          display: "none", background: "none", border: "none", cursor: "pointer", padding: 8,
        }}>
          <div style={{ width: 24, height: 2, background: WHITE, marginBottom: 6, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none" }} />
          <div style={{ width: 24, height: 2, background: WHITE, marginBottom: 6, opacity: menuOpen ? 0 : 1, transition: "opacity 0.3s" }} />
          <div style={{ width: 24, height: 2, background: WHITE, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none" }} />
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu" style={{
          background: "rgba(10,10,10,0.98)", backdropFilter: "blur(20px)", padding: "20px 24px 30px",
          display: "flex", flexDirection: "column", gap: 20,
        }}>
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setMenuOpen(false)} style={{
              textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 500,
              color: activeSection === l.id ? WHITE : GRAY_400,
            }}>{l.label}</a>
          ))}
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} style={{
            background: CHERRY, color: WHITE, padding: "14px 24px", borderRadius: 50, textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, textAlign: "center", marginTop: 8,
          }}>Hablemos</a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [count, setCount] = useState(0);
  const words = ["Sistemas", "E-commerce", "Automatizaciones", "Aplicaciones Web"];
  useEffect(() => {
    const i = setInterval(() => setCount(c => (c + 1) % words.length), 2500);
    return () => clearInterval(i);
  }, []);
  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: `radial-gradient(ellipse 80% 60% at 50% -10%, rgba(196,30,58,0.15) 0%, transparent 60%), ${DARK}`,
      position: "relative", overflow: "hidden", padding: "120px 24px 80px",
    }}>
      {/* Subtle grid */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      <div style={{ maxWidth: 900, textAlign: "center", position: "relative", zIndex: 1 }}>
        <FadeIn delay={0.1}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(196,30,58,0.12)",
            border: "1px solid rgba(196,30,58,0.25)", borderRadius: 50, padding: "8px 20px", marginBottom: 32,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ADE80", animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: GRAY_300, letterSpacing: "0.04em" }}>
              Disponible para proyectos
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <h1 style={{
            fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(36px, 7vw, 72px)",
            lineHeight: 1.05, color: WHITE, margin: "0 0 24px", letterSpacing: "-0.03em",
          }}>
            Que los sistemas<br />
            <span style={{ color: CHERRY }}>trabajen para ti</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.35}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(16px, 2.5vw, 20px)", color: GRAY_400,
            lineHeight: 1.6, maxWidth: 600, margin: "0 auto 20px",
          }}>
            Digitalizo y automatizo tu negocio para que enfoques tu tiempo en lo que importa y tenga impacto en tu facturación.
          </p>
        </FadeIn>
        <FadeIn delay={0.45}>
          <div style={{
            fontFamily: "'Sora', sans-serif", fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 600,
            color: WHITE, height: 40, overflow: "hidden", marginBottom: 40,
          }}>
            <div style={{
              transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
              transform: `translateY(-${count * 40}px)`,
            }}>
              {words.map((w, i) => (
                <div key={i} style={{ height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {w}<span style={{ color: CHERRY }}>.</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.55}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{
              background: CHERRY, color: WHITE, padding: "16px 36px", borderRadius: 50, textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, transition: "all 0.3s",
              boxShadow: "0 0 30px rgba(196,30,58,0.3)",
            }}>Conversemos →</a>
            <a href="#proyectos" style={{
              background: "rgba(255,255,255,0.06)", color: WHITE, padding: "16px 36px", borderRadius: 50,
              textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600,
              border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.3s",
            }}>Ver proyectos</a>
          </div>
        </FadeIn>
        <FadeIn delay={0.7}>
          <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 60, flexWrap: "wrap" }}>
            {[
              { num: "+15", label: "Sitios entregados" },
              { num: "+10", label: "Años en digital" },
              { num: "24h", label: "Tiempo de respuesta" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 28, fontWeight: 800, color: WHITE }}>{s.num}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: GRAY_400, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: "🌐",
      title: "Páginas Web",
      desc: "Sitios profesionales que representan tu marca y convierten visitantes en clientes. Sin código, sin complicaciones para ti.",
      tags: ["WordPress", "Landing Pages", "Corporativos"],
    },
    {
      icon: "🛒",
      title: "E-commerce",
      desc: "Tiendas online listas para vender. Carrito, pagos, inventario, todo configurado y funcionando.",
      tags: ["WooCommerce", "Catálogo", "Pasarela de pagos"],
    },
    {
      icon: "⚡",
      title: "Automatizaciones",
      desc: "Sistemas que hacen el trabajo repetitivo por ti. Menos Excel, menos errores, más tiempo para vender.",
      tags: ["n8n", "Flujos", "Integraciones"],
    },
    {
      icon: "📱",
      title: "Aplicaciones Web",
      desc: "Soluciones a medida para problemas específicos de tu negocio. Funciona en el celular, sin instalar nada.",
      tags: ["Dashboards", "Gestión", "A medida"],
    },
  ];
  return (
    <section id="servicios" style={{ padding: "120px 24px", background: GRAY_900 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ marginBottom: 64 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: CHERRY, letterSpacing: "0.12em", textTransform: "uppercase" }}>Servicios</span>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 44px)", color: WHITE, margin: "12px 0 16px", letterSpacing: "-0.02em" }}>
              Cuéntame qué necesitas<br />y lo hacemos
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: GRAY_400, maxWidth: 500, lineHeight: 1.6 }}>
              Sin tecnicismos. Sin vueltas. Te armo un sistema que funcione solo.
            </p>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
          {services.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                background: GRAY_800, borderRadius: 20, padding: 32, border: "1px solid rgba(255,255,255,0.05)",
                transition: "all 0.4s", cursor: "default", height: "100%",
                display: "flex", flexDirection: "column",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(196,30,58,0.3)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ fontSize: 36, marginBottom: 20 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 20, color: WHITE, margin: "0 0 12px" }}>{s.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: GRAY_400, lineHeight: 1.6, margin: "0 0 20px", flex: 1 }}>{s.desc}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {s.tags.map((t, j) => (
                    <span key={j} style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: GRAY_300,
                      background: "rgba(255,255,255,0.05)", padding: "4px 12px", borderRadius: 50,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    { title: "Virtual Keys", type: "E-commerce", desc: "Tienda de productos digitales con +1 año funcionando. Sistema completo de inventario, pagos y entrega automática.", color: "#6366F1" },
    { title: "Sistema de Gestión", type: "Aplicación Web", desc: "Dashboard a medida para empresa de servicios. Organización de clientes, órdenes y facturación en un solo lugar.", color: "#10B981" },
    { title: "Automatización de Leads", type: "Automatización", desc: "Sistema que captura consultas desde la web y las envía formateadas a WhatsApp y email en tiempo real.", color: "#F59E0B" },
    { title: "Web Corporativa", type: "Página Web", desc: "Sitio profesional para empresa industrial. Diseño moderno, optimizado para móvil y preparado para captar clientes.", color: CHERRY },
  ];
  return (
    <section id="proyectos" style={{ padding: "120px 24px", background: DARK }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ marginBottom: 64 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: CHERRY, letterSpacing: "0.12em", textTransform: "uppercase" }}>Proyectos</span>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 44px)", color: WHITE, margin: "12px 0 16px", letterSpacing: "-0.02em" }}>
              Resultados reales,<br />no promesas
            </h2>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {projects.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                background: GRAY_800, borderRadius: 20, overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.05)", transition: "all 0.4s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ height: 160, background: `linear-gradient(135deg, ${p.color}22, ${p.color}08)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <div style={{ width: 60, height: 60, borderRadius: 16, background: `${p.color}20`, border: `1px solid ${p.color}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: p.color }} />
                  </div>
                </div>
                <div style={{ padding: "24px 28px 28px" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: p.color, letterSpacing: "0.06em" }}>{p.type}</span>
                  <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 20, color: WHITE, margin: "8px 0 12px" }}>{p.title}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: GRAY_400, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  const milestones = [
    { year: "2016", age: "11 años", text: "Empecé con Photoshop, intros 3D y diseño gráfico. Quería ser youtuber." },
    { year: "2018", age: "13 años", text: "Renové la web de la empresa de mi papá. Aprendí desarrollo web por YouTube." },
    { year: "2020", age: "16 años", text: "Armé mi primer e-commerce real. Aposté los únicos $40.000 que tenía." },
    { year: "2021-23", age: "17-19", text: "Fracasos, pivotes, $800.000 perdidos. Cada caída me dejó experiencia." },
    { year: "2025", age: "20 años", text: "Me rapé la cabeza para obligarme a dar la cara. 150K views en una semana." },
    { year: "2026", age: "21 años", text: "Hoy vivo de lo digital. Sistemas, e-commerce, automatizaciones. Sin jefe." },
  ];
  return (
    <section id="historia" style={{ padding: "120px 24px", background: GRAY_900 }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ marginBottom: 64 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: CHERRY, letterSpacing: "0.12em", textTransform: "uppercase" }}>Mi Historia</span>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 44px)", color: WHITE, margin: "12px 0 16px", letterSpacing: "-0.02em" }}>
              10 años haciendo<br />lo que me gusta
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: GRAY_400, maxWidth: 550, lineHeight: 1.6 }}>
              Desde chico me gustó lo digital. No busco el dinero — busco aportar, ser útil. La plata llega sola si haces las cosas bien y no dejas de intentar.
            </p>
          </div>
        </FadeIn>
        <div style={{ position: "relative", paddingLeft: 40 }}>
          <div style={{ position: "absolute", left: 11, top: 8, bottom: 8, width: 2, background: `linear-gradient(to bottom, ${CHERRY}, ${CHERRY}33)` }} />
          {milestones.map((m, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ marginBottom: 36, position: "relative" }}>
                <div style={{
                  position: "absolute", left: -40, top: 6, width: 24, height: 24, borderRadius: "50%",
                  background: i === milestones.length - 1 ? CHERRY : GRAY_800,
                  border: `2px solid ${i === milestones.length - 1 ? CHERRY : GRAY_700}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: i === milestones.length - 1 ? WHITE : GRAY_400 }} />
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "baseline", marginBottom: 8, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18, color: WHITE }}>{m.year}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: CHERRY, fontWeight: 500 }}>{m.age}</span>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: GRAY_400, lineHeight: 1.6, margin: 0 }}>{m.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    { name: "Cliente E-commerce", biz: "Tienda Online", text: "Matías nos armó la tienda en tiempo récord. Todo funciona perfecto, los pagos, el inventario, todo automático. Nos ahorra horas de trabajo cada semana." },
    { name: "Empresa de Servicios", biz: "Mantención Industrial", text: "Necesitábamos ordenar nuestra operación y Matías lo entendió al toque. Sin tecnicismos, sin vueltas. El sistema que nos armó cambió cómo trabajamos." },
    { name: "Emprendedor", biz: "Startup Digital", text: "Lo mejor de trabajar con Matías es que habla tu idioma. No te marea con código ni palabras difíciles. Te muestra resultados y punto." },
  ];
  return (
    <section id="testimonios" style={{ padding: "120px 24px", background: DARK }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ marginBottom: 64, textAlign: "center" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: CHERRY, letterSpacing: "0.12em", textTransform: "uppercase" }}>Testimonios</span>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 44px)", color: WHITE, margin: "12px 0", letterSpacing: "-0.02em" }}>
              Lo que dicen mis clientes
            </h2>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                background: GRAY_800, borderRadius: 20, padding: 32,
                border: "1px solid rgba(255,255,255,0.05)", height: "100%",
                display: "flex", flexDirection: "column",
              }}>
                <div style={{ fontSize: 32, color: CHERRY, fontFamily: "Georgia, serif", marginBottom: 16, lineHeight: 1 }}>"</div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: GRAY_300, lineHeight: 1.7, margin: "0 0 24px", flex: 1 }}>{t.text}</p>
                <div>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 15, color: WHITE }}>{t.name}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: GRAY_400, marginTop: 4 }}>{t.biz}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Landing Page",
      price: "Desde $150.000",
      desc: "Ideal para empezar con presencia online profesional.",
      features: ["Diseño personalizado", "Optimizado para móvil", "Formulario de contacto", "Dominio propio", "Entrega en 5-7 días"],
      popular: false,
    },
    {
      name: "E-commerce",
      price: "Desde $350.000",
      desc: "Tu tienda online lista para vender desde el día uno.",
      features: ["Todo lo de Landing Page", "Carrito de compras", "Pasarela de pagos", "Panel de administración", "Catálogo de productos", "Capacitación incluida"],
      popular: true,
    },
    {
      name: "Sistema a Medida",
      price: "Conversemos",
      desc: "Solución personalizada para tu problema específico.",
      features: ["Análisis de tu negocio", "Desarrollo a medida", "Automatizaciones", "Integraciones", "Soporte continuo", "Escalable"],
      popular: false,
    },
  ];
  return (
    <section id="precios" style={{ padding: "120px 24px", background: GRAY_900 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ marginBottom: 64, textAlign: "center" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: CHERRY, letterSpacing: "0.12em", textTransform: "uppercase" }}>Precios</span>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 44px)", color: WHITE, margin: "12px 0 16px", letterSpacing: "-0.02em" }}>
              Transparente y directo
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: GRAY_400, maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>
              Conocimiento gratis, ejecución se paga. Sin letra chica.
            </p>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, alignItems: "start" }}>
          {plans.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                background: p.popular ? `linear-gradient(135deg, rgba(196,30,58,0.12), rgba(196,30,58,0.04))` : GRAY_800,
                borderRadius: 24, padding: 36,
                border: p.popular ? `1px solid rgba(196,30,58,0.3)` : "1px solid rgba(255,255,255,0.05)",
                position: "relative",
              }}>
                {p.popular && (
                  <div style={{
                    position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                    background: CHERRY, color: WHITE, padding: "6px 20px", borderRadius: 50,
                    fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.04em",
                  }}>MÁS POPULAR</div>
                )}
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 22, color: WHITE, margin: "0 0 8px" }}>{p.name}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: GRAY_400, margin: "0 0 20px" }}>{p.desc}</p>
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 28, color: WHITE, marginBottom: 28 }}>
                  {p.price}<span style={{ fontSize: 14, fontWeight: 400, color: GRAY_400 }}> CLP</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
                  {p.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(196,30,58,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ color: CHERRY, fontSize: 12, fontWeight: 700 }}>✓</span>
                      </div>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: GRAY_300 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{
                  display: "block", textAlign: "center", padding: "14px 24px", borderRadius: 50,
                  textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
                  background: p.popular ? CHERRY : "transparent",
                  color: WHITE,
                  border: p.popular ? "none" : "1px solid rgba(255,255,255,0.15)",
                  transition: "all 0.3s",
                }}>
                  {p.price === "Conversemos" ? "Agendar llamada" : "Empezar proyecto"}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contacto" style={{
      padding: "120px 24px", position: "relative", overflow: "hidden",
      background: `radial-gradient(ellipse 80% 50% at 50% 110%, rgba(196,30,58,0.12) 0%, transparent 60%), ${DARK}`,
    }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: CHERRY, letterSpacing: "0.12em", textTransform: "uppercase" }}>Contacto</span>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 44px)", color: WHITE, margin: "12px 0 16px", letterSpacing: "-0.02em" }}>
            ¿Listo para empezar?
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: GRAY_400, maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.6 }}>
            Cuéntame tu idea por WhatsApp o déjame tus datos. Sin compromiso, sin letra chica.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            background: "#25D366", color: WHITE, padding: "18px 40px", borderRadius: 50,
            textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700,
            transition: "all 0.3s", boxShadow: "0 0 40px rgba(37,211,102,0.25)",
            marginBottom: 48,
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.4 0-4.616-.85-6.34-2.264l-.442-.37-3.09 1.036 1.036-3.09-.37-.442A9.97 9.97 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Escríbeme por WhatsApp
          </a>
        </FadeIn>
        <FadeIn delay={0.25}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center", marginBottom: 40 }}>
            <div style={{ height: 1, width: 60, background: "rgba(255,255,255,0.1)" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: GRAY_400 }}>o déjame tus datos</span>
            <div style={{ height: 1, width: 60, background: "rgba(255,255,255,0.1)" }} />
          </div>
        </FadeIn>
        <FadeIn delay={0.3}>
          {!sent ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 440, margin: "0 auto" }}>
              {[
                { placeholder: "Tu nombre", type: "text" },
                { placeholder: "Tu email o teléfono", type: "text" },
                { placeholder: "¿Qué necesitas? (cuéntame breve)", type: "textarea" },
              ].map((input, i) =>
                input.type === "textarea" ? (
                  <textarea key={i} placeholder={input.placeholder} rows={3} style={{
                    background: GRAY_800, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14,
                    padding: "16px 20px", color: WHITE, fontFamily: "'DM Sans', sans-serif", fontSize: 15,
                    outline: "none", resize: "vertical", transition: "border-color 0.3s",
                  }} onFocus={e => e.target.style.borderColor = "rgba(196,30,58,0.4)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
                ) : (
                  <input key={i} type={input.type} placeholder={input.placeholder} style={{
                    background: GRAY_800, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14,
                    padding: "16px 20px", color: WHITE, fontFamily: "'DM Sans', sans-serif", fontSize: 15,
                    outline: "none", transition: "border-color 0.3s",
                  }} onFocus={e => e.target.style.borderColor = "rgba(196,30,58,0.4)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
                )
              )}
              <button onClick={() => setSent(true)} style={{
                background: CHERRY, color: WHITE, padding: "16px 32px", borderRadius: 50,
                border: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600,
                cursor: "pointer", transition: "all 0.3s", marginTop: 8,
              }}>Enviar mensaje →</button>
            </div>
          ) : (
            <div style={{
              background: GRAY_800, borderRadius: 20, padding: 40,
              border: "1px solid rgba(196,30,58,0.2)", maxWidth: 440, margin: "0 auto",
            }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 20, color: WHITE, margin: "0 0 8px" }}>¡Mensaje enviado!</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: GRAY_400, margin: 0 }}>Te respondo en menos de 24 horas.</p>
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "48px 24px", background: GRAY_900, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 28, height: 28, background: CHERRY, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 14, color: WHITE }}>N</div>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: WHITE }}>notstudio</span>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: GRAY_400, margin: 0 }}>Matías Garrido • @notmatyx • Chile</p>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { label: "TikTok", href: "https://tiktok.com/@notmatyx" },
            { label: "Instagram", href: "https://instagram.com/notmatyx" },
            { label: "WhatsApp", href: WHATSAPP_LINK },
          ].map((l, i) => (
            <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: GRAY_400,
              textDecoration: "none", transition: "color 0.3s",
            }}
              onMouseEnter={e => e.target.style.color = WHITE}
              onMouseLeave={e => e.target.style.color = GRAY_400}
            >{l.label}</a>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: "32px auto 0", textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: GRAY_400, fontStyle: "italic", margin: 0 }}>
          Nos vemos, chavales 🤙
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "servicios", "proyectos", "historia", "testimonios", "precios", "contacto"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; scroll-padding-top: 80px; }
        body { background: ${DARK}; -webkit-font-smoothing: antialiased; }
        ::selection { background: rgba(196,30,58,0.3); color: white; }
        input::placeholder, textarea::placeholder { color: ${GRAY_400}; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
      <NavBar activeSection={activeSection} />
      <Hero />
      <Services />
      <Projects />
      <Story />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
    </>
  );
}
