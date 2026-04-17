import React, { useEffect, useRef, useState } from 'react';

const injectStyles = () => {
  if (document.getElementById('felicita-pampulha-styles')) return;
  const style = document.createElement('style');
  style.id = 'felicita-pampulha-styles';
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,300;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Montserrat:wght@200;300;400;500;600;700&display=swap');

    :root {
      --rose:   #E8789A;
      --rose2:  #F0A0BA;
      --blue:   #5BC4E8;
      --blue2:  #A8DDEF;
      --gold:   #C9A84C;
      --gold2:  #E8C97E;
      --mint:   #7ED8B0;
      --cream:  #FDFAF6;
      --cream2: #FFF5F9;
      --dark:   #0A0A0A;
      --dark2:  #101010;
      --dark3:  #161616;
      --txt:    #2C2C2C;
      --txts:   #5C5C5C;
      --wht:    #FAFAFA;
      --crm:    #F5F0E8;

      --rose10: rgba(232,120,154,.10);
      --rose20: rgba(232,120,154,.20);
      --rose30: rgba(232,120,154,.30);
      --blue10: rgba(91,196,232,.10);
      --blue20: rgba(91,196,232,.20);
      --gold10: rgba(201,168,76,.10);
      --gold20: rgba(201,168,76,.20);
      --gold30: rgba(201,168,76,.30);
      --gold50: rgba(201,168,76,.50);
    }

    html { scroll-behavior: smooth; }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--cream); color: var(--dark); overflow-x: hidden; -webkit-font-smoothing: antialiased; }
    ::selection { background: var(--gold); color: var(--dark); }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: var(--dark); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 4px; }

    .fade-up { opacity:0; transform:translateY(24px); transition:opacity .8s cubic-bezier(.25,.46,.45,.94),transform .8s cubic-bezier(.25,.46,.45,.94); }
    .fade-up.visible { opacity:1; transform:translateY(0); }

    /* HEADER */
    .f-header { position:fixed; top:0; left:0; right:0; z-index:1000; background:rgba(10,10,10,.96); backdrop-filter:blur(16px); border-bottom:1px solid rgba(201,168,76,.2); display:flex; align-items:center; justify-content:space-between; padding:14px 56px; }
    .f-header-badge { font-family:'Montserrat',sans-serif; font-size:10px; font-weight:600; letter-spacing:.35em; text-transform:uppercase; color:var(--gold); background:rgba(201,168,76,.1); border:1px solid rgba(201,168,76,.3); padding:6px 16px; border-radius:999px; }

    /* SPREAD */
    .spread { position:relative; overflow:hidden; }
    .spread-img { position:absolute; top:-15%; left:0; right:0; bottom:0; width:100%; height:100%; object-fit:cover; display:block; }
    .spread-veil { position:absolute; inset:0; background:linear-gradient(to bottom,rgba(10,10,10,.25) 0%,rgba(10,10,10,0) 30%,rgba(10,10,10,0) 55%,rgba(10,10,10,.82) 100%); }

    /* PHOTO FRAME */
    .photo-frame { position:relative; overflow:hidden; border-radius:4px; }
    .photo-frame img { display:block; width:100%; height:100%; object-fit:cover; transition:transform 1.1s ease; }
    .photo-frame:hover img { transform:scale(1.04); }
    .photo-frame-border { position:absolute; inset:0; border:.5px solid var(--gold30); z-index:2; pointer-events:none; border-radius:4px; }

    /* CARDS */
    .diff-card { padding:28px 24px; border:1px solid var(--gold20); background:var(--dark3); border-radius:12px; position:relative; overflow:hidden; transition:border-color .3s,box-shadow .3s; box-shadow:0 4px 20px rgba(201,168,76,.06); }
    .diff-card:hover { border-color:var(--gold); box-shadow:0 8px 32px rgba(201,168,76,.12); }
    .diff-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,var(--gold),var(--gold2)); border-radius:12px 12px 0 0; }

    /* VIP CARD */
    .vip-card { padding:36px 32px; border:1px solid var(--gold30); background:linear-gradient(135deg,rgba(201,168,76,.08),rgba(10,10,10,0)); border-radius:12px; position:relative; overflow:hidden; }
    .vip-card::before { content:'VIP'; position:absolute; top:16px; right:20px; font-family:'Playfair Display',serif; font-size:11px; font-weight:700; letter-spacing:.4em; color:var(--gold); opacity:.3; }

    .team-item { border-bottom:1px solid rgba(201,168,76,.15); padding-bottom:20px; transition:border-color .4s; }
    .team-item:hover { border-color:var(--gold); }

    .buffet-row { display:flex; flex-direction:column; padding-bottom:20px; border-bottom:1px solid var(--gold10); }
    @media (min-width:768px) { .buffet-row { flex-direction:row; align-items:baseline; } }

    /* INVESTIMENTO */
    .inv-table-row { display:grid; grid-template-columns:1fr 1.5fr; padding:14px 0; border-bottom:.5px solid rgba(201,168,76,.12); transition:background .2s; }
    .inv-table-row:hover { background:rgba(201,168,76,.05); }
    .inv-table-row:last-child { border-bottom:none; }

    /* BOATE ITEMS */
    .boate-item { display:flex; align-items:center; gap:16px; padding:20px 0; border-bottom:1px solid rgba(201,168,76,.1); }
    .boate-item:last-child { border-bottom:none; }
    .boate-dot { width:8px; height:8px; border-radius:50%; background:var(--gold); flex-shrink:0; box-shadow:0 0 10px var(--gold); }

    .dot-bg { background-image:radial-gradient(circle,rgba(201,168,76,.06) 1px,transparent 1px); background-size:28px 28px; }
    .stat-item { display:flex; flex-direction:column; padding:16px 0; }

    .grid-bg { background-image:linear-gradient(rgba(166,129,54,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(166,129,54,.05) 1px,transparent 1px); background-size:30px 30px; }

    @media (max-width:768px) {
      .f-header { padding:10px 16px; }
      section { padding-left:20px !important; padding-right:20px !important; overflow-x:hidden !important; }
      * { max-width:100vw; box-sizing:border-box; }
      #hero { height:90vh !important; }
      .inv-table-row { display:block !important; padding:16px !important; border:.5px solid rgba(201,168,76,.2) !important; background:var(--dark2) !important; text-align:center !important; margin-bottom:4px !important; }
      .inv-table-row span:nth-child(1) { font-size:22px !important; display:block !important; margin-bottom:10px !important; color:var(--gold) !important; }
      .inv-table-row span:nth-child(2)::before { content:'Domingo: ' !important; font-weight:600 !important; color:var(--gold) !important; }
      .inv-table-row span:nth-child(2) { font-size:13px !important; display:block !important; margin-bottom:4px !important; }
    }
  `;
  document.head.appendChild(style);
};

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

const FadeIn = ({ children, delay = 0 }) => {
  const { ref, visible } = useFadeIn();
  return (
    <div ref={ref} className={`fade-up ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const LogoLight = ({ height = 48 }) => (
  <img src="/images/Logo com letras branca correto.svg" alt="Espaço Felicitá" style={{ height, width: 'auto', display: 'block' }} />
);
  <img src="/images/Logodark.svg" alt="Espaço Felicitá" style={{ height, width: 'auto', display: 'block' }} />
);

  <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.4em', textTransform: 'uppercase', color: 'var(--rose)', display: 'block', marginBottom: 14 }}>{text}</span>
);
  <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.4em', textTransform: 'uppercase', color: 'var(--blue)', display: 'block', marginBottom: 14 }}>{text}</span>
);
const EyG = ({ text }) => (
  <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: '.44em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: 14 }}>{text}</span>
);

  <div style={{ width: 56, height: 2, background: center ? 'linear-gradient(90deg,transparent,var(--rose),transparent)' : 'linear-gradient(90deg,var(--rose),transparent)', margin: center ? '18px auto' : '18px 0', borderRadius: 2 }} />
);
const RuleG = ({ center = false }) => (
  <div style={{ width: 56, height: 1, background: center ? 'linear-gradient(90deg,transparent,var(--gold),transparent)' : 'linear-gradient(90deg,var(--gold),transparent)', margin: center ? '18px auto' : '18px 0' }} />
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

export default function App() {
  useEffect(() => { injectStyles(); }, []);
  const isMobile = useIsMobile();

  const gridBg = { backgroundImage: 'linear-gradient(rgba(166,129,54,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(166,129,54,.05) 1px,transparent 1px)', backgroundSize: '30px 30px' };

  return (
    <div style={{ backgroundColor: 'var(--dark)', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* HEADER */}
      <header className="f-header">
        <LogoLight height={isMobile ? 36 : 48} />
        <span className="f-header-badge">Proposta Exclusiva · Pampulha · 2026</span>
      </header>
      <div style={{ height: isMobile ? 68 : 80 }} />

      {/* S1 HERO */}
      <section id="hero" className="spread" style={{ height: isMobile ? '90vh' : '130vh' }}>
        <img className="spread-img" src="/images/hero.png" alt="Espaço Felicitá Pampulha" style={{ objectPosition: 'center center', top: isMobile ? '0%' : '-15%' }} />
        <div className="spread-veil" />
      </section>

      {/* S2 MANIFESTO */}
      <section id="celebracao" style={{ background: 'var(--dark2)', padding: isMobile ? '60px 24px' : 'clamp(56px,8vw,96px) clamp(24px,5vw,56px)', ...gridBg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: isMobile ? 40 : 80, alignItems: 'center' }}>
            <FadeIn>
              <Frame src="/images/essence.png" alt="Espaço Felicitá Pampulha" style={{ aspectRatio: '4/5' }} imgStyle={{ objectPosition: 'center 30%' }} />
            </FadeIn>
            <div>
              <FadeIn>
                <EyG text="A Essência da Celebração" />
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(30px,3.5vw,48px)', fontWeight: 700, color: 'var(--wht)', lineHeight: 1.12, marginBottom: 6 }}>Uma celebração à altura</h2>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(30px,3.5vw,48px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)', lineHeight: 1.12 }}>de quem você ama.</h2>
                <RuleG />
              </FadeIn>
              <FadeIn delay={200}>
                <blockquote style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 23, color: 'rgba(250,250,250,.6)', lineHeight: 1.8, borderLeft: '2px solid var(--gold)', paddingLeft: 20, margin: '24px 0 28px' }}>
                  "No Espaço Felicitá Pampulha, cada celebração é única — um ambiente pensado para que cada detalhe reflita a sofisticação e a emoção que o momento merece."
                </blockquote>
              </FadeIn>
              <FadeIn delay={300}>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 15, fontWeight: 300, color: 'rgba(250,250,250,.5)', lineHeight: 1.95, marginBottom: 12 }}>
                  Da recepção ao último brinde, nossa equipe cuida de cada detalhe para que você e seus convidados vivam essa noite com presença, leveza e muito estilo.
                </p>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(250,250,250,.38)', lineHeight: 1.95 }}>
                  Espaço, serviços e buffet próprio unidos para criar uma festa que ficará na memória de todos os presentes.
                </p>
              </FadeIn>
              <FadeIn delay={400}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 8, borderTop: '1px solid var(--gold20)', paddingTop: 28 }}>
                  {[{ n: '+14', l: 'Anos de história' }, { n: '3', l: 'Unidades em BH' }, { n: '230', l: 'Convidados' }, { n: 'Próprio', l: 'Buffet exclusivo' }].map((s, i) => (
                    <div key={i} className="stat-item">
                      <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 400, color: 'var(--gold)', display: 'block', lineHeight: 1.1, marginBottom: 6 }}>{s.n}</span>
                      <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(250,250,250,.4)' }}>{s.l}</span>
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
        <img className="spread-img" src="/images/spread-1.png" alt="Espaço Felicitá Pampulha" style={{ objectPosition: 'center center', top: isMobile ? '0%' : '-15%' }} />
        <div className="spread-veil" />
        <div style={{ position: 'absolute', top: 24, right: 32, zIndex: 20 }}><LogoLight height={44} /></div>
        <div style={{ position: 'absolute', bottom: isMobile ? 60 : 100, left: isMobile ? 24 : 56, right: isMobile ? 24 : 56, zIndex: 20 }}>
          <FadeIn>
            <Orn />
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: isMobile ? 22 : 28, fontWeight: 300, color: 'rgba(255,255,255,.85)', marginBottom: 8 }}>o cenário perfeito para</p>
            <h2 style={{ fontFamily: "'Nunito',sans-serif", fontSize: isMobile ? 32 : 'clamp(36px,5vw,64px)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.1 }}>Uma Noite Inesquecível em Pampulha</h2>
          </FadeIn>
        </div>
      </section>

      {/* S4 EQUIPE */}
      <section style={{ backgroundColor: 'var(--dark)', padding: isMobile ? '60px 24px' : '96px 56px', ...gridBg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <EyG text="Profissionais Dedicados" />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700, color: 'var(--wht)', lineHeight: 1.12, marginBottom: 6 }}>A equipe que transforma</h2>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(28px,3.5vw,44px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--gold2)', lineHeight: 1.12 }}>cada detalhe em magia.</h2>
              <RuleG center />
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,.5)', maxWidth: 540, margin: '16px auto 0', lineHeight: 1.9 }}>
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
                { t: 'Equipe de Cozinha', d: 'Especialistas em experiência gastronômica de alto nível' },
              ].map((item, i) => (
                <FadeIn delay={i * 80} key={i}>
                  <div className="team-item">
                    <h5 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 500, color: 'var(--gold2)', marginBottom: 6 }}>{item.t}</h5>
                    <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,.45)', lineHeight: 1.7 }}>{item.d}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={200}>
              <Frame src="/images/team.jpg" alt="Equipe Felicitá" style={{ aspectRatio: '4/5' }} imgStyle={{ objectPosition: 'center 20%' }} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* S5 ESTRUTURA */}
      <section id="estrutura" style={{ background: 'var(--dark2)', padding: isMobile ? '60px 24px' : '80px 56px', ...gridBg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.6fr', gap: isMobile ? 40 : 72, alignItems: 'start' }}>
            <FadeIn>
              <div>
                <EyG text="Estrutura & Exclusividade" />
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3vw,42px)', fontWeight: 700, color: 'var(--wht)', lineHeight: 1.12, marginBottom: 6 }}>Detalhes que elevam</h2>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(28px,3vw,42px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)', lineHeight: 1.12 }}>cada momento.</h2>
                <RuleG />
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 15, fontWeight: 300, color: 'rgba(250,250,250,.5)', lineHeight: 1.9, marginTop: 16 }}>
                  A Unidade Pampulha foi concebida para ser o cenário perfeito de uma celebração única. Cada elemento foi escolhido com um único critério: a excelência.
                </p>
              </div>
            </FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { t: 'Capacidade', v: '230', s: 'convidados', cor: 'var(--gold)' },
                { t: 'Conforto', v: 'Climatizado', s: 'todos os ambientes', cor: 'var(--gold)' },
                { t: 'Arquitetura', v: '4m', s: 'de pé-direito', cor: 'var(--gold)' },
                { t: 'Elegância', v: 'Lustres', s: 'de cristal', cor: 'var(--gold)' },
                { t: 'Segurança', v: 'Câmeras', s: 'circuito completo', cor: 'var(--gold)' },
              ].map((c, i) => (
                <FadeIn delay={i * 70} key={i}>
                  <div className="diff-card">
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: 10 }}>{c.t}</span>
                    <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 500, color: 'var(--wht)', display: 'block', lineHeight: 1.1, marginBottom: 4 }}>{c.v}</span>
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(250,250,250,.4)' }}>{c.s}</span>
                  </div>
                </FadeIn>
              ))}
              {/* SALA VIP */}
              <FadeIn delay={350}>
                <div className="vip-card" style={{ gridColumn: '1 / -1' }}>
                  <EyG text="Sala VIP" />
                  <h5 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 500, color: 'var(--gold2)', marginBottom: 10 }}>Ambiente reservado para momentos exclusivos</h5>
                  <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 14, fontWeight: 300, color: 'rgba(250,250,250,.5)', lineHeight: 1.8, marginBottom: 20 }}>
                    Espaço privativo com decoração refinada, iluminação especial e serviço dedicado — para quem deseja um momento à parte durante a celebração.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {['Acesso exclusivo', 'Decoração diferenciada', 'Serviço personalizado', 'Ambiente climatizado', 'Iluminação especial'].map((item, i) => (
                      <span key={i} style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)', background: 'rgba(201,168,76,.08)', border: '1px solid rgba(201,168,76,.2)', padding: '5px 14px', borderRadius: 999 }}>{item}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* S6 MOBILIÁRIO */}
      <section style={{ background: 'var(--dark3)', padding: isMobile ? '60px 24px' : '96px 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <EyG text="Ambientação & Conforto" />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3vw,42px)', fontWeight: 700, color: 'var(--wht)', lineHeight: 1.12, marginBottom: 6 }}>Conforto e estilo</h2>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(28px,3vw,42px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)', lineHeight: 1.12 }}>em cada ambiente.</h2>
              <RuleG center />
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1px 1fr', gap: 48, alignItems: 'center' }}>
            <FadeIn>
              <Frame src="/images/ambiance.png" alt="Salão decorado" style={{ aspectRatio: '3/4' }} imgStyle={{ objectPosition: 'center 35%' }} />
            </FadeIn>
            {!isMobile && <div style={{ background: 'var(--gold20)', height: '60%', width: 1 }} />}
            <FadeIn delay={200}>
              <div style={{ border: '1px solid var(--gold20)', padding: '36px 32px', background: 'rgba(201,168,76,.04)', borderRadius: 8 }}>
                <EyG text="Mobiliário" />
                {[
                  { n: '15', l: 'Mesas Redondas' },
                  { n: '02', l: 'Mesas da Família' },
                  { n: '03', l: 'Mesas Baixas com 3 Poltronas cada' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '14px 0', borderBottom: i < 2 ? '1px solid rgba(201,168,76,.1)' : 'none' }}>
                    <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 400, color: 'var(--gold)', lineHeight: 1, minWidth: 56 }}>{item.n}</span>
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(250,250,250,.6)' }}>{item.l}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* S7 SPREAD 2 — foto atual do hero */}
      <section className="spread" style={{ height: isMobile ? '72vh' : '110vh' }}>
        <img className="spread-img" src="/images/spread-2.png" alt="Espaço Felicitá Pampulha" style={{ objectPosition: 'center center', top: isMobile ? '0%' : '-15%' }} />
        <div className="spread-veil" />
        <div style={{ position: 'absolute', top: 24, right: 32, zIndex: 20 }}><LogoLight height={44} /></div>
        <div style={{ position: 'absolute', bottom: isMobile ? 40 : 100, left: isMobile ? 24 : 56, right: isMobile ? 24 : 56, zIndex: 20 }}>
          <FadeIn>
            <Orn />
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: isMobile ? 20 : 28, fontWeight: 300, color: 'rgba(255,255,255,.85)', marginBottom: 8 }}>um espaço criado para</p>
            <h2 style={{ fontFamily: "'Nunito',sans-serif", fontSize: isMobile ? 30 : 'clamp(34px,5vw,60px)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.1 }}>Momentos que Ficam Para Sempre</h2>
          </FadeIn>
        </div>
      </section>

      {/* S8 BOATE */}
      <section style={{ backgroundColor: 'var(--dark)', padding: isMobile ? '60px 24px' : '96px 56px', ...gridBg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 72, alignItems: 'start' }}>
            <div>
              <FadeIn>
                <EyG text="Boate · Luz · Som" />
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(26px,3vw,42px)', fontWeight: 700, color: 'var(--wht)', lineHeight: 1.12, marginBottom: 6 }}>Onde a noite</h2>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(26px,3vw,42px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)', lineHeight: 1.12 }}>ganha vida.</h2>
                <RuleG />
                <blockquote style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 22, color: 'rgba(250,250,250,.55)', lineHeight: 1.8, borderLeft: '2px solid var(--gold)', paddingLeft: 20, margin: '24px 0 32px' }}>
                  "Uma estrutura de boate completa, pensada para que a energia e a magia da noite sejam sentidas por cada convidado — do primeiro ao último momento."
                </blockquote>
              </FadeIn>
              <FadeIn delay={200}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {[
                    { icon: '▬', label: 'Painel de LED', desc: 'Painel de LED de grande formato com programação personalizada para o tema da festa' },
                    { icon: '〰', label: 'Faixas de LED no Teto', desc: 'Iluminação com faixas de LED integradas ao teto, criando atmosfera única e imersiva' },
                    { icon: '♪', label: 'DJ Profissional', desc: 'DJ com equipamento completo, controlador e mixagem ao vivo durante toda a celebração' },
                  ].map((item, i) => (
                    <div key={i} className="boate-item">
                      <div className="boate-dot" />
                      <div>
                        <h5 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 500, color: 'var(--gold2)', marginBottom: 4 }}>{item.label}</h5>
                        <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(250,250,250,.45)', lineHeight: 1.6 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={150}>
              <Frame src="/images/celebration.png" alt="Boate Felicitá" style={{ aspectRatio: '4/5' }} imgStyle={{ objectPosition: 'center 30%' }} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* S9 SPREAD 3 */}
      <section className="spread" style={{ height: isMobile ? '72vh' : '110vh' }}>
        <img src="/images/spread-3.png" alt="Momento especial" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.2) 0%,rgba(0,0,0,.3) 45%,rgba(0,0,0,.78) 100%)' }} />
        <div style={{ position: 'absolute', top: 24, right: 32, zIndex: 20 }}><LogoLight height={44} /></div>
        <div style={{ position: 'absolute', bottom: isMobile ? 32 : 56, left: isMobile ? 24 : 56, right: isMobile ? 24 : 56, zIndex: 20 }}>
          <FadeIn>
            <Orn />
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: isMobile ? 20 : 28, fontWeight: 300, color: 'rgba(255,255,255,.85)', marginBottom: 8 }}>porque cada celebração merece</p>
            <h2 style={{ fontFamily: "'Nunito',sans-serif", fontSize: isMobile ? 30 : 'clamp(34px,4.5vw,58px)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.1 }}>Viver a Sua Festa dos Sonhos</h2>
          </FadeIn>
        </div>
      </section>

      {/* S10 GASTRONOMIA */}
      <section id="gastronomia" style={{ background: 'var(--dark2)', padding: isMobile ? '60px 24px' : '96px 56px', ...gridBg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.3fr', gap: isMobile ? 40 : 72 }}>
            <FadeIn>
              <div>
                <EyG text="Gastronomia de Alto Nível" />
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(26px,3vw,42px)', fontWeight: 700, color: 'var(--wht)', lineHeight: 1.12, marginBottom: 6 }}>Buffet próprio,</h2>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(26px,3vw,42px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)', lineHeight: 1.12 }}>sabor de verdade.</h2>
                <RuleG />
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 15, fontWeight: 300, color: 'rgba(250,250,250,.5)', lineHeight: 1.9, marginBottom: 32 }}>
                  Nosso buffet é inteiramente próprio — desenvolvido para atender todos os convidados com excelência, variedade e apresentação impecável.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, fontWeight: 700, color: 'rgba(250,250,250,.35)', marginBottom: 16 }}>
                  *Ítens opcionais — a composição do buffet é definida conforme o pacote contratado.
                </p>
                {[
                  { t: 'Coquetel de boas-vindas *', d: 'Finger foods e drinks de entrada para todos os convidados' },
                  { t: 'Jantar completo *', d: 'Pratos quentes, saladas, carnes e acompanhamentos' },
                  { t: 'Mesa de frios *', d: 'Queijos, embutidos e acompanhamentos selecionados' },
                  { t: 'Sobremesas *', d: 'Doces finos, bolo e mesa de docinhos' },
                  { t: 'Bar completo *', d: 'Bebidas alcoólicas, sucos, refrigerantes e água' },
                ].map((item, i) => (
                  <FadeIn delay={i * 60} key={i}>
                    <div className="buffet-row">
                      <h5 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 500, color: 'var(--gold2)', minWidth: 200, marginBottom: isMobile ? 4 : 0 }}>{item.t}</h5>
                      <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 14, fontWeight: 300, color: 'rgba(250,250,250,.45)', lineHeight: 1.6 }}>{item.d}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* S11 INVESTIMENTO */}
      <section id="investimento" style={{ backgroundColor: 'var(--dark3)', padding: isMobile ? '60px 24px' : '96px 56px', ...gridBg }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <EyG text="Proposta de Investimento" />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(30px,3vw,46px)', fontWeight: 700, color: 'var(--wht)', lineHeight: 1.12, marginBottom: 6 }}>O valor de uma</h2>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(30px,3vw,46px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)', lineHeight: 1.12 }}>memória eterna.</h2>
              <RuleG center />
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 22, fontWeight: 300, color: 'rgba(250,250,250,.5)', lineHeight: 1.8, maxWidth: 520, margin: '16px auto 0' }}>
                "Cada celebração é única — e o Espaço Felicitá garante que o investimento reflita a exclusividade que a sua festa merece."
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            {/* Info chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginBottom: 40 }}>
              {['Somente aos Domingos', 'Duração de 4 horas', 'Mínimo 80 convidados'].map((info, i) => (
                <span key={i} style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', background: 'rgba(201,168,76,.08)', border: '1px solid rgba(201,168,76,.2)', padding: '7px 18px', borderRadius: 999 }}>{info}</span>
              ))}
            </div>
            <div style={{ border: '.5px solid rgba(201,168,76,.3)', background: 'var(--dark2)', padding: isMobile ? '28px 16px' : '40px 36px', position: 'relative' }}>
              {[{ top:-1,left:-1,borderTop:'2px solid var(--gold)',borderLeft:'2px solid var(--gold)' },{ top:-1,right:-1,borderTop:'2px solid var(--gold)',borderRight:'2px solid var(--gold)' },{ bottom:-1,left:-1,borderBottom:'2px solid var(--gold)',borderLeft:'2px solid var(--gold)' },{ bottom:-1,right:-1,borderBottom:'2px solid var(--gold)',borderRight:'2px solid var(--gold)' }].map((s,i) => (
                <div key={i} style={{ position:'absolute', width:18, height:18, ...s }} />
              ))}
              {/* Header */}
              {!isMobile && (
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1.5fr', paddingBottom:16, marginBottom:16, borderBottom:'.5px solid rgba(201,168,76,.2)' }}>
                  {['Convidados','Domingo · 4 horas'].map((h,i) => (
                    <span key={i} style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, fontWeight:600, color:'var(--gold)', letterSpacing:'.2em', textTransform:'uppercase', textAlign: i===0?'left':'center' }}>{h}</span>
                  ))}
                </div>
              )}
              {[
                [80, '38.500,00'],
                [90, '40.500,00'],
                [100, '42.500,00'],
              ].map(([pax, valor], i) => (
                <div key={i} className="inv-table-row">
                  <span style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:500, color:'var(--gold)' }}>{pax}</span>
                  <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:13, fontWeight:300, color:'rgba(250,250,250,.72)', textAlign:'center' }}>R$ {valor}</span>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={400}>
            <div style={{ marginTop:28, display:'flex', flexDirection:'column', gap:8, alignItems:'center' }}>
              <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, fontWeight:500, letterSpacing:'.3em', textTransform:'uppercase', color:'var(--gold)', border:'.5px solid rgba(201,168,76,.2)', padding:'8px 20px', display:'inline-block' }}>Formas de pagamento a combinar</span>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:14, color:'rgba(250,250,250,.38)', textAlign:'center', lineHeight:1.7 }}>
                * A cada 10 convidados adicionais, acrescenta-se R$ 2.000,00 ao valor total.<br />
                * Esta proposta tem validade de 5 dias e não garante reserva de data.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* S12 CONTATO */}
      <section id="contato" style={{ backgroundColor: 'var(--dark)', padding: isMobile ? '60px 24px' : '96px 56px', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', borderTop:'.5px solid rgba(44,44,44,.8)', ...gridBg }}>
        <FadeIn><LogoLight height={isMobile ? 280 : 380} /></FadeIn>
        <FadeIn delay={200}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(28px,3vw,44px)', fontWeight:400, color:'var(--wht)', lineHeight:1.3, marginTop:32, marginBottom:8 }}>Onde os seus sonhos</h2>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(28px,3vw,44px)', fontStyle:'italic', fontWeight:400, color:'var(--gold)', lineHeight:1.3, marginBottom:52 }}>se realizam</h2>
        </FadeIn>
        <FadeIn delay={300}>
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:40, maxWidth:900, width:'100%', marginBottom:56 }}>
            {[
              { l:'Instagram', v:<a href="https://www.instagram.com/espaco_felicita" target="_blank" rel="noopener noreferrer" style={{ color:'var(--wht)', textDecoration:'none' }}>@espaco_felicita</a> },
              { l:'WhatsApp', v:<a href="https://wa.me/5531973560312?text=Olá!%20Vim%20pela%20proposta%20Pampulha." target="_blank" rel="noopener noreferrer" style={{ color:'var(--wht)', textDecoration:'none' }}>(31) 97356-0312</a> },
              { l:'Endereço', v:<a href="https://maps.google.com/?q=Avenida+Otacílio+Negrão+de+Lima,+6920,+Bandeirantes,+Belo+Horizonte,+MG" target="_blank" rel="noopener noreferrer" style={{ color:'var(--wht)', textDecoration:'none' }}>Av. Otacílio Negrão de Lima, 6920<br />Bandeirantes, BH</a> },
              { l:'Site', v:<a href="https://www.espacofelicita.com.br/site/" target="_blank" rel="noopener noreferrer" style={{ color:'var(--wht)', textDecoration:'none' }}>www.espacofelicita.com.br</a> },
            ].map((ct,i) => (
              <div key={i} style={{ display:'flex', flexDirection:'column', gap:8 }}>
                <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:12, fontWeight:600, letterSpacing:'.4em', textTransform:'uppercase', color:'var(--gold)' }}>{ct.l}</span>
                <span style={{ fontFamily:"'Playfair Display',serif", fontSize:17, color:'var(--wht)', lineHeight:1.5 }}>{ct.v}</span>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={400}>
          <div style={{ borderTop:'.5px solid rgba(44,44,44,.8)', paddingTop:36, display:'flex', flexDirection:'column', alignItems:'center', gap:16, width:'100%', maxWidth:520 }}>
            <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:12, fontWeight:600, letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(250,250,250,.28)' }}>Conheça também nossas casas</span>
            <div style={{ display:'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 12 : 40, alignItems:'center', fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:28, color:'var(--gold2)' }}>
              <span style={{ whiteSpace:'nowrap' }}>Felicitá Palmares</span>
              {!isMobile && <span style={{ color:'rgba(201,168,76,.3)' }}>·</span>}
              <span style={{ whiteSpace:'nowrap' }}>Felicitá Cidade Nova</span>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={600}>
          <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, fontWeight:300, letterSpacing:'.18em', color:'rgba(250,250,250,.18)', marginTop:48 }}>
            Espaço Felicitá © 2026 · Unidade Pampulha · Belo Horizonte, MG
          </p>
        </FadeIn>
      </section>

    </div>
  );
}
