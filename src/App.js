import React, { useEffect, useRef, useState } from 'react';

// ─── ESTILOS ─────────────────────────────────────────────────────────────────
const injectStyles = () => {
  if (document.getElementById('felicita-infantil-styles')) return;
  const style = document.createElement('style');
  style.id = 'felicita-infantil-styles';
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,300;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&display=swap');

    :root {
      --rose:   #FF7BAC;
      --rose2:  #FF9DC2;
      --blue:   #5BC4E8;
      --blue2:  #A8DDEF;
      --gold:   #C9A84C;
      --mint:   #7ED8B0;
      --cream:  #FDFAF6;
      --cream2: #FFF5F9;
      --dark:   #1E1428;
      --dark2:  #2D2040;
      --txt:    #3D2E5C;
      --txts:   #6B5A80;
      --wht:    #FFFFFF;
      --rose10: rgba(255,123,172,.10);
      --rose20: rgba(255,123,172,.20);
      --rose30: rgba(255,123,172,.30);
    }

    html { scroll-behavior: smooth; }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--cream); color: var(--dark); overflow-x: hidden; -webkit-font-smoothing: antialiased; }
    ::selection { background: var(--rose); color: var(--wht); }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: var(--cream); }
    ::-webkit-scrollbar-thumb { background: var(--rose); border-radius: 4px; }

    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes sparkle { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(1.2)} }

    .fade-up { opacity:0; transform:translateY(24px); transition:opacity .8s cubic-bezier(.25,.46,.45,.94),transform .8s cubic-bezier(.25,.46,.45,.94); }
    .fade-up.visible { opacity:1; transform:translateY(0); }

    .f-header { position:fixed; top:0; left:0; right:0; z-index:1000; background:rgba(253,250,246,.96); backdrop-filter:blur(16px); border-bottom:1px solid var(--rose20); display:flex; align-items:center; justify-content:space-between; padding:14px 56px; }
    .f-header-badge { font-family:'Nunito',sans-serif; font-size:10px; font-weight:700; letter-spacing:.35em; text-transform:uppercase; color:var(--rose); background:var(--rose10); border:1px solid var(--rose30); padding:6px 16px; border-radius:999px; }

    .spread { position:relative; overflow:hidden; }
    .spread-img { position:absolute; top:-15%; left:0; right:0; bottom:0; width:100%; height:100%; object-fit:cover; display:block; }
    .spread-veil { position:absolute; inset:0; background:linear-gradient(to bottom,rgba(30,20,40,.25) 0%,rgba(30,20,40,0) 30%,rgba(30,20,40,0) 55%,rgba(30,20,40,.82) 100%); }

    .hero-logo-overlay { position:absolute; bottom:10%; left:50%; transform:translateX(-50%); width:200px; z-index:10; pointer-events:none; }

    .photo-frame { position:relative; overflow:hidden; border-radius:4px; }
    .photo-frame img { display:block; width:100%; height:100%; object-fit:cover; transition:transform 1.1s ease; }
    .photo-frame:hover img { transform:scale(1.04); }
    .photo-frame-border { position:absolute; inset:0; border:.5px solid var(--rose30); z-index:2; pointer-events:none; border-radius:4px; }

    .diff-card { padding:28px 24px; border:1px solid var(--rose20); background:var(--wht); border-radius:12px; position:relative; overflow:hidden; transition:border-color .3s,box-shadow .3s; box-shadow:0 4px 20px rgba(255,123,172,.06); }
    .diff-card:hover { border-color:var(--rose); box-shadow:0 8px 32px rgba(255,123,172,.14); }
    .diff-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,var(--rose),var(--blue)); border-radius:12px 12px 0 0; }

    .kids-item { display:flex; align-items:center; padding:8px 0; border-bottom:1px solid var(--rose10); font-family:'Nunito',sans-serif; font-size:14px; font-weight:600; color:var(--txt); }
    .kids-item:last-child { border-bottom:none; }

    .team-item { border-bottom:1px solid rgba(196,181,253,.3); padding-bottom:20px; transition:border-color .4s; }
    .team-item:hover { border-color:var(--rose); }

    .buffet-row { display:flex; flex-direction:column; padding-bottom:20px; border-bottom:1px solid var(--rose20); }
    @media (min-width:768px) { .buffet-row { flex-direction:row; align-items:baseline; } }

    .inv-table-row { display:grid; grid-template-columns:1fr 1.5fr 1.5fr; padding:12px 0; border-bottom:1px solid var(--rose10); transition:background .2s; border-radius:4px; }
    .inv-table-row:hover { background:var(--rose10); }
    .inv-table-row:last-child { border-bottom:none; }

    .dot-bg { background-image:radial-gradient(circle,rgba(255,123,172,.12) 1px,transparent 1px); background-size:28px 28px; }
    .dot-bg-blue { background-image:radial-gradient(circle,rgba(91,196,232,.1) 1px,transparent 1px); background-size:28px 28px; }
    .stat-item { display:flex; flex-direction:column; padding:16px 0; }

    @media (max-width:768px) {
      .f-header { padding:10px 16px; }
      .hero-logo-overlay { width:110px !important; bottom:8% !important; }
      section { padding-left:20px !important; padding-right:20px !important; overflow-x:hidden !important; }
      * { max-width:100vw; box-sizing:border-box; }
      #hero { height:90vh !important; }
      .inv-table-row { display:block !important; padding:16px !important; border:1px solid var(--rose20) !important; background:var(--wht) !important; text-align:center !important; margin-bottom:8px !important; border-radius:8px !important; }
      .inv-table-row span:nth-child(1) { font-size:26px !important; display:block !important; margin-bottom:12px !important; }
      .inv-table-row span:nth-child(2) { font-size:14px !important; display:block !important; margin-bottom:6px !important; }
      .inv-table-row span:nth-child(2)::before { content:'Seg · Qui · Dom: ' !important; font-weight:700 !important; color:var(--rose) !important; }
      .inv-table-row span:nth-child(3) { font-size:14px !important; display:block !important; }
      .inv-table-row span:nth-child(3)::before { content:'Sex · Sáb · Feriado: ' !important; font-weight:700 !important; color:var(--rose) !important; }
    }
  `;
  document.head.appendChild(style);
};

// ─── HOOKS ───────────────────────────────────────────────────────────────────
const useFadeIn = (threshold = 0.12) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(e.target); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
};

// ─── COMPONENTES ─────────────────────────────────────────────────────────────
const FadeIn = ({ children, delay = 0, className = '' }) => {
  const { ref, visible } = useFadeIn();
  return (
    <div ref={ref} className={`fade-up ${visible ? 'visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const Logo = ({ height = 48 }) => (
  <img src="/images/Logo com letras branca correto.svg" alt="Espaço Felicitá" style={{ height, width: 'auto', display: 'block' }} />
);

const LogoDark = ({ height = 48 }) => (
  <img src="/images/Logodark.svg" alt="Espaço Felicitá" style={{ height, width: 'auto', display: 'block' }} />
);

const Ey = ({ text, color = 'var(--rose)' }) => (
  <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: '.4em', textTransform: 'uppercase', color, display: 'block', marginBottom: 14 }}>{text}</span>
);

const Rule = ({ center = false, color = 'var(--rose)' }) => (
  <div style={{ width: 56, height: 2, background: center ? `linear-gradient(90deg,transparent,${color},transparent)` : `linear-gradient(90deg,${color},transparent)`, margin: center ? '18px auto' : '18px 0', borderRadius: 2 }} />
);

const Orn = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
    <div style={{ height: 1, width: 40, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.5))' }} />
    <span style={{ color: 'rgba(255,255,255,.7)', fontSize: 14 }}>✦</span>
    <div style={{ height: 1, width: 40, background: 'linear-gradient(90deg,rgba(255,255,255,.5),transparent)' }} />
  </div>
);

const Frame = ({ src, alt, style: s = {}, imgStyle = {} }) => (
  <div className="photo-frame" style={s}>
    <div className="photo-frame-border" />
    <img src={src} alt={alt} style={{ objectPosition: 'center center', ...imgStyle }} />
  </div>
);

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => { injectStyles(); }, []);
  const isMobile = useIsMobile();

  return (
    <div style={{ backgroundColor: 'var(--cream)', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* HEADER */}
      <header className="f-header">
        <LogoDark height={isMobile ? 36 : 48} />
        <span className="f-header-badge">Proposta Exclusiva · Festa Infantil · 2026</span>
      </header>
      <div style={{ height: isMobile ? 68 : 80 }} />

      {/* S1 HERO */}
      <section id="hero" className="spread" style={{ height: isMobile ? '90vh' : '130vh' }}>
        <img
          className="spread-img"
          src="/images/hero-infantil.jpg"
          alt="Festa Infantil Espaço Felicitá"
          style={{ objectPosition: 'center center', top: isMobile ? '0%' : '-15%' }}
        />
        <div className="spread-veil" />
        <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
          <FadeIn delay={200}>
            <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.45em', textTransform: 'uppercase', color: 'rgba(255,200,220,.75)', display: 'block', marginBottom: 24 }}>
              Proposta Exclusiva · Festa Infantil · 2026
            </span>
          </FadeIn>
          <FadeIn delay={400}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: isMobile ? 22 : 28, fontWeight: 300, color: 'rgba(255,255,255,.85)', marginBottom: 10 }}>
              o dia mais mágico de
            </p>
            <h1 style={{ fontFamily: "'Nunito',sans-serif", fontSize: isMobile ? 36 : 'clamp(44px,5vw,72px)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.05, letterSpacing: '-.02em', textShadow: '0 2px 32px rgba(0,0,0,.3)' }}>
              Uma Infância que Merece<br />Ser Celebrada
            </h1>
          </FadeIn>
        </div>
        <img src="/images/Logodark.svg" alt="Felicitá" className="hero-logo-overlay" />
      </section>

      {/* S2 MANIFESTO */}
      <section id="celebracao" style={{ background: 'var(--cream2)', padding: isMobile ? '60px 24px' : 'clamp(56px,8vw,96px) clamp(24px,5vw,56px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: isMobile ? 40 : 80, alignItems: 'center' }}>
            <FadeIn>
              <Frame src="/images/essence-infantil.jpg" alt="Celebração infantil" style={{ aspectRatio: '4/5' }} imgStyle={{ objectPosition: 'center 30%' }} />
            </FadeIn>
            <div>
              <FadeIn>
                <Ey text="A Essência da Celebração" />
                <h2 style={{ fontFamily: "'Nunito',sans-serif", fontSize: 'clamp(30px,3.5vw,48px)', fontWeight: 900, color: 'var(--dark)', lineHeight: 1.1, marginBottom: 6 }}>
                  A festa mais importante
                </h2>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(30px,3.5vw,48px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--rose)', lineHeight: 1.1 }}>
                  da vida dele até aqui.
                </h2>
                <Rule />
              </FadeIn>
              <FadeIn delay={200}>
                <blockquote style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 22, color: 'var(--txts)', lineHeight: 1.8, borderLeft: '3px solid var(--rose)', paddingLeft: 20, margin: '24px 0 28px' }}>
                  "Uma criança que celebra rodeada de alegria, amigos e magia carrega essa memória para sempre. No Espaço Felicitá, cada detalhe é pensado para que esse momento seja exatamente o que ele merece."
                </blockquote>
              </FadeIn>
              <FadeIn delay={300}>
                <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: 16, fontWeight: 400, color: 'var(--txts)', lineHeight: 1.9, marginBottom: 12 }}>
                  Do primeiro convite à última fatia do bolo, nossa equipe cuida de cada detalhe para que você e sua família vivam esse dia com presença, leveza e muita emoção. Porque os pais também merecem celebrar.
                </p>
                <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: 14, fontWeight: 400, color: 'var(--txts)', lineHeight: 1.9, marginBottom: 36 }}>
                  Espaço, serviços e buffet próprio unidos para criar uma festa que a criança vai lembrar — e os pais também.
                </p>
              </FadeIn>
              <FadeIn delay={400}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 8, borderTop: '1px solid var(--rose20)', paddingTop: 28 }}>
                  {[{ n: '+14', l: 'Anos de história' }, { n: '3', l: 'Unidades em BH' }, { n: '180', l: 'Convidados' }, { n: 'Próprio', l: 'Buffet exclusivo' }].map((s, i) => (
                    <div key={i} className="stat-item">
                      <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: 26, fontWeight: 900, color: 'var(--rose)', display: 'block', lineHeight: 1.1, marginBottom: 4 }}>{s.n}</span>
                      <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--txts)' }}>{s.l}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* S3 SPREAD 1 */}
      <section className="spread" style={{ height: isMobile ? '70vh' : '85vh' }}>
        <img
          className="spread-img"
          src="/images/spread-1-infantil.jpg"
          alt="Festa infantil Felicitá"
          style={{ objectPosition: 'center center', top: isMobile ? '0%' : '-15%' }}
        />
        <div className="spread-veil" />
        <div style={{ position: 'absolute', top: 24, right: 32, zIndex: 20 }}><LogoDark height={44} /></div>
        <div style={{ position: 'absolute', bottom: isMobile ? 60 : 100, left: isMobile ? 24 : 56, right: isMobile ? 24 : 56, zIndex: 20 }}>
          <FadeIn>
            <Orn />
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: isMobile ? 22 : 28, fontWeight: 300, color: 'rgba(255,255,255,.85)', marginBottom: 8 }}>
              o dia mais mágico de
            </p>
            <h2 style={{ fontFamily: "'Nunito',sans-serif", fontSize: isMobile ? 32 : 'clamp(36px,5vw,64px)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.1 }}>
              Uma Infância que Merece Ser Celebrada
            </h2>
          </FadeIn>
        </div>
      </section>

      {/* S4 EQUIPE */}
      <section style={{ backgroundColor: 'var(--dark)', padding: isMobile ? '60px 24px' : '96px 56px' }} className="dot-bg">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <Ey text="Profissionais Dedicados" color="var(--blue)" />
              <h2 style={{ fontFamily: "'Nunito',sans-serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 900, color: 'var(--wht)', lineHeight: 1.1, marginBottom: 6 }}>A equipe que transforma</h2>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(28px,3.5vw,44px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--rose2)', lineHeight: 1.1 }}>cada detalhe em magia.</h2>
              <Rule center color="var(--rose)" />
              <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: 15, fontWeight: 400, color: 'rgba(255,255,255,.5)', maxWidth: 540, margin: '16px auto 0', lineHeight: 1.9 }}>
                Cada membro da equipe é treinado para antecipar necessidades, garantir segurança e transformar cada minuto da festa em um momento inesquecível.
              </p>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 64, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { t: 'Coordenador do Evento', d: 'Orquestração completa — do planejamento ao último brinde' },
                { t: 'Garçons', d: 'Serviço impecável e presença discreta durante toda a celebração' },
                { t: 'Porteiro', d: 'Recepção calorosa e controle de acesso com cordialidade' },
                { t: 'Monitores do Espaço Kids', d: 'Equipe especializada em cuidar e entreter as crianças com segurança' },
                { t: 'Equipe de Cozinha', d: 'Especialistas em experiência gastronômica de alto nível' },
              ].map((item, i) => (
                <FadeIn delay={i * 80} key={i}>
                  <div className="team-item">
                    <h5 style={{ fontFamily: "'Nunito',sans-serif", fontSize: 18, fontWeight: 800, color: 'var(--rose2)', marginBottom: 6 }}>{item.t}</h5>
                    <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: 15, fontWeight: 400, color: 'rgba(255,255,255,.45)', lineHeight: 1.7 }}>{item.d}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={200}>
              <Frame src="/images/team-infantil.jpg" alt="Equipe Felicitá" style={{ aspectRatio: '4/5' }} imgStyle={{ objectPosition: 'center 20%' }} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* S5 ESTRUTURA */}
      <section id="estrutura" style={{ background: 'var(--cream)', padding: isMobile ? '60px 24px' : '80px 56px', borderTop: '1px solid var(--rose10)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.6fr', gap: isMobile ? 40 : 72, alignItems: 'start' }}>
            <FadeIn>
              <div>
                <Ey text="Estrutura & Exclusividade" />
                <h2 style={{ fontFamily: "'Nunito',sans-serif", fontSize: 'clamp(28px,3vw,42px)', fontWeight: 900, color: 'var(--dark)', lineHeight: 1.1, marginBottom: 6 }}>Detalhes que elevam</h2>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(28px,3vw,42px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--rose)', lineHeight: 1.1 }}>cada momento.</h2>
                <Rule />
                <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: 15, fontWeight: 400, color: 'var(--txts)', lineHeight: 1.9, marginTop: 16 }}>
                  A Unidade Palmares foi concebida para ser o cenário perfeito de uma festa única. Cada elemento foi escolhido com um único critério: a excelência — inclusive para os pequenos.
                </p>
              </div>
            </FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { t: 'Capacidade', v: '180', s: 'convidados' },
                { t: 'Exclusividade', v: 'Sala VIP', s: 'para os anfitriões' },
                { t: 'Conforto', v: 'Climatizado', s: 'todos os ambientes' },
                { t: 'Arquitetura', v: '4m', s: 'de pé-direito' },
                { t: 'Elegância', v: 'Lustres', s: 'de cristal' },
                { t: 'Segurança', v: 'Câmeras', s: 'circuito completo' },
              ].map((c, i) => (
                <FadeIn delay={i * 70} key={i}>
                  <div className="diff-card">
                    <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: 10, fontWeight: 800, letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--rose)', display: 'block', marginBottom: 10 }}>{c.t}</span>
                    <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: 24, fontWeight: 900, color: 'var(--dark)', display: 'block', lineHeight: 1.1, marginBottom: 4 }}>{c.v}</span>
                    <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: 400, color: 'var(--txts)' }}>{c.s}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* S6 MOBILIÁRIO */}
      <section style={{ background: '#FFF0F6', padding: isMobile ? '60px 24px' : '96px 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <Ey text="Ambientação & Conforto" />
              <h2 style={{ fontFamily: "'Nunito',sans-serif", fontSize: 'clamp(28px,3vw,42px)', fontWeight: 900, color: 'var(--dark)', lineHeight: 1.1, marginBottom: 6 }}>Conforto e estilo</h2>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(28px,3vw,42px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--rose)', lineHeight: 1.1 }}>em cada ambiente.</h2>
              <Rule center />
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1px 1fr', gap: 48, alignItems: 'center' }}>
            <FadeIn>
              <Frame src="/images/ambiance-infantil.jpg" alt="Salão decorado" style={{ aspectRatio: '3/4' }} imgStyle={{ objectPosition: 'center 35%' }} />
            </FadeIn>
            {!isMobile && <div style={{ background: 'var(--rose20)', height: '60%', width: 1 }} />}
            <FadeIn delay={200}>
              <div style={{ border: '1px solid var(--rose20)', padding: '36px 32px', background: 'var(--wht)', borderRadius: 16 }}>
                <Ey text="Mobiliário" />
                {[{ n: '12', l: 'Mesas Redondas' }, { n: '4', l: 'Mesas Retangulares' }, { n: '116', l: 'Cadeiras' }, { n: '2', l: 'Sofás' }, { n: '10', l: 'Poltronas' }].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '12px 0', borderBottom: i < 4 ? '1px solid var(--rose10)' : 'none' }}>
                    <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: 34, fontWeight: 900, color: 'var(--rose)', lineHeight: 1, minWidth: 56 }}>{item.n}</span>
                    <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--txts)' }}>{item.l}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* S7 SPREAD 2 */}
      <section className="spread" style={{ height: isMobile ? '72vh' : '110vh' }}>
        <img
          className="spread-img"
          src="/images/spread-2-infantil.jpg"
          alt="Celebração infantil"
          style={{ objectPosition: 'center center', top: isMobile ? '0%' : '-15%' }}
        />
        <div className="spread-veil" />
        <div style={{ position: 'absolute', top: 24, right: 32, zIndex: 20 }}><LogoDark height={44} /></div>
        <div style={{ position: 'absolute', bottom: isMobile ? 40 : 100, left: isMobile ? 24 : 56, right: isMobile ? 24 : 56, zIndex: 20 }}>
          <FadeIn>
            <Orn />
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: isMobile ? 20 : 28, fontWeight: 300, color: 'rgba(255,255,255,.85)', marginBottom: 8 }}>
              um espaço criado para
            </p>
            <h2 style={{ fontFamily: "'Nunito',sans-serif", fontSize: isMobile ? 30 : 'clamp(34px,5vw,60px)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.1 }}>
              Sorrisos que Nunca Esquecemos
            </h2>
          </FadeIn>
        </div>
      </section>

      {/* S8 ENTRETENIMENTO */}
      <section style={{ backgroundColor: 'var(--cream)', padding: isMobile ? '60px 24px' : '96px 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 72, alignItems: 'start' }}>
            <div>
              <FadeIn>
                <Ey text="Música · Luz · Animação" />
                <h2 style={{ fontFamily: "'Nunito',sans-serif", fontSize: 'clamp(26px,3vw,42px)', fontWeight: 900, color: 'var(--dark)', lineHeight: 1.1, marginBottom: 6 }}>Onde a festa</h2>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(26px,3vw,42px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--rose)', lineHeight: 1.1 }}>ganha vida.</h2>
                <Rule />
                <blockquote style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 22, color: 'var(--txts)', lineHeight: 1.8, borderLeft: '3px solid var(--rose)', paddingLeft: 20, margin: '24px 0 32px' }}>
                  "Um espaço pensado para que a festa aconteça com a energia e a magia que cada criança merece — luzes, música e uma pista que convida toda a família a celebrar junto."
                </blockquote>
              </FadeIn>
              <FadeIn delay={200}>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    'DJ Profissional — repertório infantil e adulto',
                    '21 Globos Espelhados de Grande Porte',
                    '02 Microfones sem Fio',
                    'Mesa Numark Mix Control',
                    'Estrutura Retangular Completa',
                    '02 Caixas de Som Profissionais',
                    'Painel e Pista de LED',
                    'Iluminação Cênica Completa',
                  ].map((item, i) => (
                    <li key={i} style={{ fontFamily: "'Nunito',sans-serif", fontSize: 15, fontWeight: 600, color: 'var(--txt)', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ color: 'var(--rose)', fontSize: 12 }}>✦</span>{item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
            <FadeIn delay={150}>
              <Frame src="/images/celebration-infantil.jpg" alt="Celebração" style={{ aspectRatio: '4/5' }} imgStyle={{ objectPosition: 'center 30%' }} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* S9 SPREAD 3 */}
      <section className="spread" style={{ height: isMobile ? '72vh' : '110vh' }}>
        <img
          src="/images/spread-3-infantil.jpg"
          alt="Momento especial"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.2) 0%,rgba(0,0,0,.3) 45%,rgba(0,0,0,.78) 100%)' }} />
        <div style={{ position: 'absolute', top: 24, right: 32, zIndex: 20 }}><LogoDark height={44} /></div>
        <div style={{ position: 'absolute', bottom: isMobile ? 32 : 56, left: isMobile ? 24 : 56, right: isMobile ? 24 : 56, zIndex: 20 }}>
          <FadeIn>
            <Orn />
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: isMobile ? 20 : 28, fontWeight: 300, color: 'rgba(255,255,255,.85)', marginBottom: 8 }}>
              porque cada criança merece
            </p>
            <h2 style={{ fontFamily: "'Nunito',sans-serif", fontSize: isMobile ? 30 : 'clamp(34px,4.5vw,58px)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.1 }}>
              Viver a Sua Festa dos Sonhos
            </h2>
          </FadeIn>
        </div>
      </section>

      {/* S10 GASTRONOMIA */}
      <section id="gastronomia" style={{ background: '#F0FAFF', padding: isMobile ? '60px 24px' : '96px 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.3fr', gap: isMobile ? 40 : 72 }}>
            <FadeIn>
              <div>
                <Ey text="Gastronomia de Alto Nível" color="var(--blue)" />
                <h2 style={{ fontFamily: "'Nunito',sans-serif", fontSize: 'clamp(26px,3vw,42px)', fontWeight: 900, color: 'var(--dark)', lineHeight: 1.1, marginBottom: 6 }}>Buffet próprio,</h2>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(26px,3vw,42px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--blue)', lineHeight: 1.1 }}>sabor de verdade.</h2>
                <Rule color="var(--blue)" />
                <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: 15, fontWeight: 400, color: 'var(--txts)', lineHeight: 1.9, marginBottom: 32 }}>
                  Nosso buffet é inteiramente próprio — desenvolvido para atender tanto os pequenos quanto os adultos com excelência, variedade e apresentação impecável.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { t: 'Coquetel de boas-vindas', d: 'Finger foods e drinks de entrada para adultos e kids' },
                  { t: 'Jantar completo', d: 'Pratos quentes, saladas, carnes e acompanhamentos' },
                  { t: 'Mesa kids', d: 'Opções especialmente desenvolvidas para as crianças' },
                  { t: 'Mesa de frios', d: 'Queijos, embutidos e acompanhamentos selecionados' },
                  { t: 'Sobremesas', d: 'Doces finos, bolo temático e mesa de docinhos' },
                  { t: 'Bar completo', d: 'Bebidas alcoólicas, sucos, refrigerantes e água' },
                ].map((item, i) => (
                  <FadeIn delay={i * 60} key={i}>
                    <div className="buffet-row">
                      <h5 style={{ fontFamily: "'Nunito',sans-serif", fontSize: 16, fontWeight: 800, color: 'var(--dark)', minWidth: 200, marginBottom: isMobile ? 4 : 0 }}>{item.t}</h5>
                      <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: 14, fontWeight: 400, color: 'var(--txts)', lineHeight: 1.6 }}>{item.d}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* S11 ESPAÇO KIDS */}
      <section style={{ background: 'var(--dark)', padding: isMobile ? '60px 24px' : '96px 56px' }} className="dot-bg-blue">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 72, alignItems: 'center' }}>
            <FadeIn>
              <Frame src="/images/kids-infantil.jpg" alt="Espaço Kids" style={{ aspectRatio: '4/5' }} imgStyle={{ objectPosition: 'center 25%' }} />
            </FadeIn>
            <div>
              <FadeIn>
                <Ey text="✦ O Grande Diferencial" color="var(--mint)" />
                <h2 style={{ fontFamily: "'Nunito',sans-serif", fontSize: 'clamp(26px,3vw,42px)', fontWeight: 900, color: 'var(--wht)', lineHeight: 1.1, marginBottom: 6 }}>Espaço Kids completo</h2>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(26px,3vw,42px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--mint)', lineHeight: 1.1 }}>para os protagonistas da noite.</h2>
                <Rule color="var(--mint)" />
                <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: 15, fontWeight: 400, color: 'rgba(255,255,255,.55)', lineHeight: 1.9, marginBottom: 28 }}>
                  Para que os pais vivam plenamente cada instante da celebração, o Espaço Felicitá oferece um Espaço Kids completo — monitores treinados, brinquedos para todas as idades, segurança e diversão em harmonia.
                </p>
              </FadeIn>
              <FadeIn delay={200}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                  {['Área Baby', 'Tobogã', 'Piscina de Bolinha', 'Cama Elástica Suspensa', 'Simuladores', 'Mini Mercado', 'Mini Cozinha', 'Torre Espacial', 'Formigueiro', 'Circuito Brinquedão', 'Video Games'].map((toy, i) => (
                    <div key={i} className="kids-item" style={{ color: 'rgba(255,255,255,.7)', borderBottomColor: 'rgba(126,216,176,.15)' }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--mint)', flexShrink: 0, marginRight: 10 }} />{toy}
                    </div>
                  ))}
                </div>
              </FadeIn>
              <FadeIn delay={300}>
                <div style={{ marginTop: 24, fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 16, fontWeight: 300, color: 'var(--mint)', borderLeft: '2px solid var(--mint)', paddingLeft: 16, lineHeight: 1.7 }}>
                  Ambiente seguro com monitores especializados, garantindo tranquilidade para os convidados e diversão garantida para os pequenos.
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* S12 INVESTIMENTO */}
      <section id="investimento" style={{ background: 'var(--cream2)', padding: isMobile ? '60px 24px' : '96px 56px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <Ey text="Proposta de Investimento" />
              <h2 style={{ fontFamily: "'Nunito',sans-serif", fontSize: 'clamp(28px,3vw,44px)', fontWeight: 900, color: 'var(--dark)', lineHeight: 1.1, marginBottom: 6 }}>O valor de uma</h2>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(28px,3vw,44px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--rose)', lineHeight: 1.1 }}>memória eterna.</h2>
              <Rule center />
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 22, fontWeight: 300, color: 'var(--txts)', lineHeight: 1.8, maxWidth: 520, margin: '16px auto 0' }}>
                "Cada celebração é única — e o Espaço Felicitá garante que o investimento reflita a exclusividade que a sua festa merece."
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div style={{ border: '1px solid var(--rose20)', background: 'var(--wht)', padding: isMobile ? '28px 20px' : '40px 36px', borderRadius: 16, boxShadow: '0 8px 40px rgba(255,123,172,.08)' }}>
              {!isMobile && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1.5fr', paddingBottom: 16, marginBottom: 16, borderBottom: '1px solid var(--rose10)' }}>
                  {['Convidados', 'Seg · Qui · Dom', 'Sex · Sáb · Véspera · Feriado'].map((h, i) => (
                    <span key={i} style={{ fontFamily: "'Nunito',sans-serif", fontSize: 10, fontWeight: 800, color: 'var(--rose)', letterSpacing: '.2em', textTransform: 'uppercase', textAlign: i === 0 ? 'left' : 'center' }}>{h}</span>
                  ))}
                </div>
              )}
              {[[60,'34.000,00','36.600,00'],[70,'36.000,00','38.600,00'],[80,'38.000,00','40.600,00'],[90,'40.000,00','42.600,00'],[100,'42.000,00','44.600,00'],[110,'44.000,00','46.600,00'],[120,'46.000,00','48.600,00'],[130,'48.000,00','50.600,00'],[140,'50.000,00','52.600,00'],[150,'52.000,00','54.600,00'],[160,'54.000,00','56.600,00'],[170,'56.000,00','58.600,00'],[180,'58.000,00','60.600,00']].map(([pax,v1,v2],i) => (
                <div key={i} className="inv-table-row">
                  <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: 20, fontWeight: 900, color: 'var(--rose)' }}>{pax}</span>
                  <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: 14, fontWeight: 400, color: 'var(--txts)', textAlign: 'center' }}>R$ {v1}</span>
                  <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: 14, fontWeight: 700, color: 'var(--rose)', textAlign: 'center' }}>R$ {v2}</span>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={400}>
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--rose)', border: '1px solid var(--rose20)', padding: '8px 20px', display: 'inline-block', borderRadius: 999 }}>
                Formas de pagamento a combinar
              </span>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 14, color: 'var(--txts)', textAlign: 'center', lineHeight: 1.7 }}>
                * Esta proposta tem validade de 5 dias e não garante reserva de data.<br />
                * Para eventos realizados no sábado à noite, mínimo de 150 convidados.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* S13 CONTATO */}
      <section id="contato" style={{ background: 'var(--dark)', padding: isMobile ? '60px 24px' : '96px 56px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }} className="dot-bg">
        <FadeIn><Logo height={isMobile ? 260 : 340} /></FadeIn>
        <FadeIn delay={200}>
          <h2 style={{ fontFamily: "'Nunito',sans-serif", fontSize: 'clamp(26px,3vw,42px)', fontWeight: 900, color: 'var(--wht)', lineHeight: 1.2, marginTop: 32, marginBottom: 8 }}>Onde os sonhos dos pequenos</h2>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(26px,3vw,42px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--rose2)', lineHeight: 1.2, marginBottom: 52 }}>se realizam</h2>
        </FadeIn>
        <FadeIn delay={300}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 40, maxWidth: 900, width: '100%', marginBottom: 56 }}>
            {[
              { l: 'Instagram', v: <a href="https://www.instagram.com/espaco_felicita" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--wht)', textDecoration: 'none' }}>@espaco_felicita</a> },
              { l: 'WhatsApp', v: (<><a href="https://wa.me/5531971871101?text=Ol%C3%A1!%20Vim%20pela%20proposta%20infantil%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es." target="_blank" rel="noopener noreferrer" style={{ color: 'var(--wht)', textDecoration: 'none', display: 'block', marginBottom: 4 }}>(31) 97187-1101</a><a href="https://wa.me/5531984086068?text=Ol%C3%A1!%20Vim%20pela%20proposta%20infantil%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es." target="_blank" rel="noopener noreferrer" style={{ color: 'var(--wht)', textDecoration: 'none', display: 'block' }}>(31) 98408-6068</a></>) },
              { l: 'Endereço', v: <a href="https://maps.app.goo.gl/GjqQxNVBU18E1pRd6" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--wht)', textDecoration: 'none' }}>R. Cel. Jaíro Pereira, 999<br />Palmares, BH</a> },
              { l: 'Site', v: <a href="https://www.espacofelicita.com.br/site/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--wht)', textDecoration: 'none' }}>www.espacofelicita.com.br</a> },
            ].map((ct, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: '.4em', textTransform: 'uppercase', color: 'var(--rose)' }}>{ct.l}</span>
                <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: 16, fontWeight: 600, color: 'var(--wht)', lineHeight: 1.5 }}>{ct.v}</span>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={400}>
          <div style={{ borderTop: '1px solid rgba(255,123,172,.15)', paddingTop: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%', maxWidth: 520 }}>
            <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,.25)' }}>Conheça também nossas casas</span>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 12 : 40, alignItems: 'center', fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 26, color: 'var(--rose2)' }}>
              <span style={{ whiteSpace: 'nowrap' }}>Felicitá Cidade Nova</span>
              {!isMobile && <span style={{ color: 'rgba(255,123,172,.3)' }}>·</span>}
              <span style={{ whiteSpace: 'nowrap' }}>Felicitá Pampulha</span>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={600}>
          <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: 10, fontWeight: 300, letterSpacing: '.15em', color: 'rgba(255,255,255,.18)', marginTop: 48 }}>
            Espaço Felicitá © 2026 · Unidade Palmares · Belo Horizonte, MG
          </p>
        </FadeIn>
      </section>

    </div>
  );
}
