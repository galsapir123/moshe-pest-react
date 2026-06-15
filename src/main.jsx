import React, { useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Phone,
  MessageCircle,
  Mail,
  ShieldCheck,
  BadgeCheck,
  Clock3,
  Home,
  Building2,
  Bug,
  Mouse,
  Star,
  ChevronDown,
  Send,
  MapPin,
  Sparkles,
  AlertTriangle,
  ClipboardCheck,
  Camera,
  HeartHandshake,
  CheckCircle2,
  Menu,
  X,
  ArrowUpRight
} from 'lucide-react';
import './styles.css';

function CockroachIcon() {
  return (
    <svg viewBox="0 0 512 512" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* antennae */}
      <path d="M215 108 C200 90 170 60 130 35" fill="none" stroke="#1a1a1a" strokeWidth="18" strokeLinecap="round"/>
      <path d="M297 108 C312 90 342 60 382 35" fill="none" stroke="#1a1a1a" strokeWidth="18" strokeLinecap="round"/>
      {/* head */}
      <ellipse cx="256" cy="148" rx="62" ry="52" fill="#6b3d3d" stroke="#1a1a1a" strokeWidth="14"/>
      {/* body */}
      <ellipse cx="256" cy="310" rx="88" ry="155" fill="#c8905a" stroke="#1a1a1a" strokeWidth="14"/>
      {/* thorax overlay */}
      <ellipse cx="256" cy="210" rx="82" ry="62" fill="#a0634a" stroke="#1a1a1a" strokeWidth="12"/>
      {/* body center line */}
      <line x1="256" y1="175" x2="256" y2="450" stroke="#a0634a" strokeWidth="10" strokeLinecap="round"/>
      {/* body shading */}
      <ellipse cx="240" cy="310" rx="55" ry="130" fill="#b87e4a" opacity="0.5"/>
      {/* legs left — jointed (upper, mid, lower) */}
      <polyline points="185,230 130,200 90,170" fill="none" stroke="#1a1a1a" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="180,305 110,295 60,320" fill="none" stroke="#1a1a1a" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="185,385 130,390 100,440" fill="none" stroke="#1a1a1a" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round"/>
      {/* legs right — jointed */}
      <polyline points="327,230 382,200 422,170" fill="none" stroke="#1a1a1a" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="332,305 402,295 452,320" fill="none" stroke="#1a1a1a" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="327,385 382,390 412,440" fill="none" stroke="#1a1a1a" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const CONTACT = {
  name: 'מימון הדברות',
  title: 'מדביר מורשה בדירות',
  license: 'רישיון מדביר בדירות מס׳ 3754',
  warranty: 'אחריות עד חצי שנה לפי סוג טיפול',
  phoneDisplay: '+972 52-483-2432',
  phoneDial: '+972524832432',
  whatsapp: '972524832432',
  email: 'Moshemaymon84@gmail.com',
  instagram: '#',
  facebook: '#',
  areas: ['דירות מגורים', 'משרדים קטנים', 'רכוש משותף בבניין עד 16 דירות/משרדים']
};

const pests = [
  { name: 'תיקנים וג׳וקים', icon: <CockroachIcon />, color: 'brown', problem: 'מופיעים בעיקר במטבח, באמבטיה ובאזורים לחים.', treatment: 'אבחון מוקדי פעילות, טיפול נקודתי באזורים אסטרטגיים והנחיות מניעה לאחר הטיפול.' },
  { name: 'נמלים', icon: '🐜', color: 'amber', problem: 'שבילים ליד שיש, חלונות, ארונות מזון או נקודות מים.', treatment: 'איתור נתיבי כניסה, טיפול במוקדים ופתרון שמקטין חזרה של המושבה.' },
  { name: 'פרעושים', icon: '🦟', color: 'red', problem: 'עקיצות חוזרות, בעיקר בבתים עם בעלי חיים או אחרי כניסה לדירה ריקה.', treatment: 'טיפול שטח יסודי לפי הצורך, יחד עם הכנה נכונה של הבית לפני ההגעה.' },
  { name: 'קרציות', icon: '🕷️', color: 'green', problem: 'נפוצות סביב בעלי חיים, חצרות צמודות ושטיחים/ריפודים.', treatment: 'אבחון היקף הבעיה והנחיות שילוב טיפול בבעל החיים דרך וטרינר.' },
  { name: 'עכבישים', icon: '🕸️', color: 'slate', problem: 'קורים בפינות, מחסנים, מרפסות וחללים פחות פעילים.', treatment: 'ניקוי מוקדים, צמצום מקומות מסתור וטיפול היקפי לפי צורך.' },
  { name: 'דג הכסף', icon: '🐟', color: 'silver', problem: 'מופיע בארונות, חדרים לחים, ספריות וחדרי אמבטיה.', treatment: 'איתור לחות ומקומות מסתור, טיפול ממוקד והמלצות להפחתת תנאים שמושכים אותו.' },
  { name: 'יתושים וזבובים', icon: '🦟', color: 'blue', problem: 'מופיעים סביב מים עומדים, פחים, מרפסות ונקודות פתוחות.', treatment: 'איתור מקור, סילוק תנאי משיכה וטיפול מתאים בהתאם לסביבה.' },
  { name: 'מכרסמים', icon: '🐭', color: 'dark', problem: 'רעשי לילה, סימני כרסום, גללים או ריח חריג.', treatment: 'איתור נתיבי כניסה, חסימה, ניטור וטיפול בהתאם למותר ולתנאי המקום.' }
];

const processSteps = [
  { icon: Camera, title: 'שולחים תמונה', text: 'תמונה בוואטסאפ עוזרת להבין מהר מה המזיק ומה רמת הדחיפות.' },
  { icon: ClipboardCheck, title: 'מקבלים אבחון', text: 'בודקים את סוג המזיק, האזור בבית והפתרון המתאים לפני שמתחילים.' },
  { icon: ShieldCheck, title: 'מבצעים טיפול', text: 'עבודה נקייה, מסודרת ובהתאם לרישיון ולהוראות השימוש בתכשירים.' },
  { icon: HeartHandshake, title: 'אחריות והנחיות', text: 'מקבלים הסבר מה לעשות אחרי הטיפול ואחריות עד חצי שנה לפי סוג הטיפול.' }
];

const testimonials = [
  { name: 'דניאל ר.', area: 'דירת גן', avatar: 'https://i.pravatar.cc/160?img=12', rating: 5, text: 'משה הגיע באותו היום, הסביר בדיוק מה הוא עושה והשאיר לנו הנחיות ברורות. אחרי הטיפול הייתה ירידה מורגשת כבר מהיום הראשון.' },
  { name: 'מיכל א.', area: 'דירה בבניין', avatar: 'https://i.pravatar.cc/160?img=32', rating: 5, text: 'שירות נעים ומקצועי. אהבתי שהוא לא ניסה למכור סתם, קודם בדק את הבית ואז המליץ על טיפול מדויק.' },
  { name: 'אורן ל.', area: 'משרד קטן', avatar: 'https://i.pravatar.cc/160?img=15', rating: 4.8, text: 'ענה מהר בוואטסאפ, הגיע בזמן וטיפל בבעיה בלי לכלוך ובלי בלגן. אחלה איש מקצוע.' },
  { name: 'שירה כ.', area: 'בניין מגורים', avatar: 'https://i.pravatar.cc/160?img=47', rating: 5, text: 'היה לנו קושי חוזר עם נמלים. משה איתר מאיפה הן מגיעות ולא רק ריסס איפה שראינו אותן. מאוד מרוצה.' }
];

const faqs = [
  { q: 'האם צריך לצאת מהבית אחרי הדברה?', a: 'זה תלוי בסוג הטיפול, סוג המזיק ומצב הבית. לפני כל טיפול תקבלו הנחיות ברורות כמה זמן להמתין ומתי אפשר לחזור לשגרה.' },
  { q: 'כמה זמן האחריות?', a: 'האתר מציג אחריות עד חצי שנה. משך האחריות בפועל תלוי בסוג המזיק, תנאי המקום והטיפול שבוצע.' },
  { q: 'אפשר לשלוח תמונה לזיהוי המזיק?', a: 'כן. מומלץ לשלוח תמונה בוואטסאפ כדי לקבל כיוון ראשוני והמלצה מהירה.' },
  { q: 'האם מתבצעת הדברה מניעתית?', a: 'הגישה המקצועית היא קודם לאבחן את הבעיה. טיפול מתבצע כשיש צורך ובהתאם להנחיות ולתנאי הרישיון.' },
  { q: 'מה הרישיון מאפשר?', a: 'רישיון מדביר בדירות מתאים לדירות מגורים, משרדים קטנים ורכוש משותף בבניין עד 16 דירות או משרדים, בהתאם לתנאי הרישיון.' }
];

function whatsappUrl(message) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePest, setActivePest] = useState(pests[0]);
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({ name: '', phone: '', city: '', pest: 'לא בטוח', message: '' });
  const [emailStatus, setEmailStatus] = useState('idle'); // idle | sending | sent | error
  const pestDetailRef = useRef(null);

  const leadMessage = useMemo(() => {
    return `שלום משה, הגעתי מהאתר.\nשם: ${form.name || 'לא צוין'}\nטלפון: ${form.phone || 'לא צוין'}\nעיר: ${form.city || 'לא צוין'}\nסוג מזיק: ${form.pest || 'לא בטוח'}\nהודעה: ${form.message || 'אין הודעה נוספת'}`;
  }, [form]);

  async function handleEmailSend(e) {
    e.preventDefault();
    setEmailStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name || 'לא צוין',
          phone: form.phone || 'לא צוין',
          city: form.city || 'לא צוין',
          pest: form.pest,
          message: form.message || 'אין הודעה נוספת',
        }),
      });
      setEmailStatus(res.ok ? 'sent' : 'error');
    } catch {
      setEmailStatus('error');
    }
  }

  const navItems = ['מזיקים', 'רישיון', 'תהליך', 'המלצות', 'צור קשר'];

  return (
    <main>
      <div className="noise" />
      <header className="topbar">
        <a className="brand" href="#home" aria-label="חזרה לראש הדף">
          <span className="brand-mark"><Bug size={23} /></span>
          <span>
            <b>{CONTACT.name}</b>
            <small>הדברה מורשית</small>
          </span>
        </a>
        <nav className={menuOpen ? 'nav open' : 'nav'}>
          {navItems.map(item => <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </nav>
        <a className="quick-call" href={`tel:${CONTACT.phoneDial}`}><Phone size={18} /> התקשר</a>
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="פתיחת תפריט">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section className="hero" id="home">
        <div className="hero-orb one" />
        <div className="hero-orb two" />
        <div className="hero-content">
          <div className="eyebrow"><Sparkles size={16} /> זמין לקריאות • אחריות עד חצי שנה</div>
          <h1>מנתחים, מדבירים <span className="hero-highlight">ומבטיחים</span></h1>
          <p className="hero-subtitle"> מימון הדברות מספק הדברה מקצועית לדירות, משרדים קטנים ורכוש משותף — עם אבחון ברור, עבודה נקייה, יחס אישי והסבר מלא לפני ואחרי הטיפול.</p>
          <div className="hero-actions">
            <a className="btn primary" href={whatsappUrl('שלום משה, אני צריך הדברה ואשמח להצעת מחיר')} target="_blank"><MessageCircle /> שלח וואטסאפ</a>
            <a className="btn ghost" href={`tel:${CONTACT.phoneDial}`}><Phone /> התקשר עכשיו</a>
          </div>
          <div className="trust-row">
            <span><BadgeCheck /> {CONTACT.license}</span>
            <span><ShieldCheck /> {CONTACT.warranty}</span>
            <span><ShieldCheck /> תכשירים מאושרים ובהתאם להנחיות</span>
          </div>
        </div>
        <div className="biz-card">
          <div className="biz-card-header">
            <div className="biz-license-badge">מס׳ רישיון 3754</div>
          </div>
          <div className="biz-name-row">
            <Bug size={32} className="biz-logo-icon" />
            <div>
              <h3 className="biz-name">מימון הדברות</h3>
              <p className="biz-subtitle">הדברת מזיקים מקצועית</p>
            </div>
          </div>
          <ul className="biz-features">
            <li><CheckCircle2 size={16} /> אמינות</li>
            <li><CheckCircle2 size={16} /> שירות אישי</li>
            <li><CheckCircle2 size={16} /> זמינות מיידית</li>
            <li><CheckCircle2 size={16} /> אחריות לכל עבודה</li>
          </ul>
          <div className="biz-pests-row">
            <span title="תיקנים" className="biz-pest-svg"><CockroachIcon /></span>
            <span title="יתושים">🦟</span>
            <span title="נמלים">🐜</span>
            <span title="עכברים">🐭</span>
            <span title="עכבישים">🕷️</span>
          </div>
          <div className="biz-contacts">
            <a href={`tel:${CONTACT.phoneDial}`}><Phone size={15} /> {CONTACT.phoneDisplay}</a>
            <a href={`mailto:${CONTACT.email}`}><Mail size={15} /> {CONTACT.email}</a>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div><strong>עד 6 חודשים</strong><span>אחריות לפי סוג טיפול</span></div>
        <div><strong>תגובה מהירה</strong><span>טלפון / וואטסאפ</span></div>
        <div><strong>אבחון לפני טיפול</strong><span>לא עושים עבודה מיותרת</span></div>
        <div><strong>רישיון בתוקף</strong><span>מדביר בדירות מס׳ 3754</span></div>
      </section>

      <section className="section pests" id="מזיקים">
        <div className="section-head">
          <span className="tag">טיפול במזיקים</span>
          <h2>בחרו את המזיק ותראו איך מתקדמים</h2>
          <p>כל בית נראה אחרת, וכל בעיה דורשת אבחון. כאן אפשר להבין במהירות מה הסימנים ומה הכיוון המקצועי לטיפול.</p>
        </div>
        <div className="pest-layout">
          <div className="pest-grid">
            {pests.map(pest => (
              <button key={pest.name} onClick={() => { setActivePest(pest); if (window.innerWidth <= 950) { setTimeout(() => pestDetailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50); } }} className={activePest.name === pest.name ? 'pest-card active' : 'pest-card'}>
                <span className={`pest-icon ${pest.color}`}>{pest.icon}</span>
                <b>{pest.name}</b>
                <small>לחצו להסבר</small>
              </button>
            ))}
          </div>
          <div className="pest-detail" ref={pestDetailRef}>
            <div className="big-pest">{activePest.icon}</div>
            <h3>{activePest.name}</h3>
            <div className="detail-box"><AlertTriangle /> <p><b>מה רואים?</b><br />{activePest.problem}</p></div>
            <div className="detail-box"><CheckCircle2 /> <p><b>איך מטפלים?</b><br />{activePest.treatment}</p></div>
            <a className="btn primary full" href={whatsappUrl(`שלום משה, יש לי בעיה של ${activePest.name}. אשמח לעזרה`)} target="_blank">שלח תמונה בוואטסאפ <ArrowUpRight /></a>
          </div>
        </div>
      </section>

      <section className="section license" id="רישיון">
        <div className="license-copy">
          <span className="tag">שקיפות וביטחון</span>
          <h2>מדביר מורשה, עם גבולות עבודה ברורים</h2>
          <p>הרישיון שמופיע בתעודה הוא רישיון <b>מדביר בדירות</b>. השירות מיועד לדירות מגורים, משרדים קטנים ורכוש משותף בבניין עד 16 דירות או משרדים, בהתאם לתנאי הרישיון והחוק.</p>
          <div className="allowed-grid">
            <span><Home /> דירות מגורים</span>
            <span><Building2 /> משרדים קטנים</span>
            <span><ShieldCheck /> רכוש משותף עד 16 יחידות</span>
          </div>
          <p className="note">*לא מדובר ברישיון לאיוד או לעבודות הדברה החורגות מתנאי רישיון מדביר בדירות.</p>
        </div>
        <div className="glass-panel">
          <h3>למה זה חשוב?</h3>
          <p>כשמזמינים מדביר, חשוב לדעת מי מגיע, מה ההסמכה שלו, ומה מותר לו לבצע. שקיפות מונעת טעויות ונותנת ללקוח ביטחון.</p>
          <ul>
            <li>הסבר לפני כל טיפול</li>
            <li>הנחיות בטיחות לאחר הטיפול</li>
            <li>אחריות עד חצי שנה לפי סוג המזיק והטיפול</li>
          </ul>
        </div>
      </section>

      <section className="section process" id="תהליך">
        <div className="section-head">
          <span className="tag">איך זה עובד</span>
          <h2>מהשיחה הראשונה עד שהבית חוזר להיות רגוע</h2>
        </div>
        <div className="timeline">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return <article key={step.title} className="step-card">
              <span className="step-num">0{index + 1}</span>
              <Icon />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>;
          })}
        </div>
      </section>

      <section className="section reviews" id="המלצות">
        <div className="section-head">
          <span className="tag">לקוחות מספרים</span>
          <h2>שירות שמרגיש אישי, מסודר ומקצועי</h2>
        </div>
        <div className="review-grid">
          {testimonials.map(review => (
            <article className="review-card" key={review.name}>
              <div className="review-head">
                <img src={review.avatar} alt={`תמונת לקוח ${review.name}`} />
                <div>
                  <b>{review.name}</b>
                  <small>{review.area}</small>
                </div>
              </div>
              <div className="stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} fill="currentColor" />)} <span>{review.rating}</span></div>
              <p>“{review.text}”</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section contact" id="צור קשר">
        <div className="contact-info">
          <span className="tag">יצירת קשר</span>
          <h2>רוצים לבדוק מה יש בבית? שלחו הודעה עכשיו</h2>
          <p>אפשר לשלוח תמונה, לתאר את הבעיה או לבחור “לא בטוח” בטופס.  נחזור אליכם עם הכוונה ראשונית.</p>
          <div className="contact-buttons">
            <a href={`tel:${CONTACT.phoneDial}`}><Phone /> {CONTACT.phoneDisplay}</a>
            <a href={whatsappUrl('שלום משה, אני צריך הדברה')} target="_blank"><MessageCircle /> וואטסאפ</a>
            <a href={`mailto:${CONTACT.email}`}><Mail /> מייל</a>
            <a href={CONTACT.facebook}><span className="social-letter">f</span> פייסבוק</a>
            <a href={CONTACT.instagram}><span className="social-letter">◎</span> אינסטגרם</a>
          </div>
        </div>
        <form className="lead-form" onSubmit={(e) => { e.preventDefault(); window.open(whatsappUrl(leadMessage), '_blank'); }}>
          <label>שם מלא<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="השם שלכם" /></label>
          <label>טלפון<input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="050-0000000" /></label>
          <label>עיר / אזור<input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="לדוגמה: רמלה" /></label>
          <label>סוג מזיק
            <select value={form.pest} onChange={e => setForm({ ...form, pest: e.target.value })}>
              <option>לא בטוח</option>
              {pests.map(p => <option key={p.name}>{p.name}</option>)}
            </select>
          </label>
          <label className="wide">מה ראיתם בבית?<textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="כתבו בקצרה איפה ראיתם את המזיק, כמה זמן זה קורה ואם יש תמונה לשליחה בוואטסאפ" /></label>
          <button className="btn primary wide" type="submit"><Send /> שליחה לוואטסאפ</button>
          
        </form>
      </section>

      <section className="section faq">
        <div className="section-head"><span className="tag">שאלות נפוצות</span><h2>לפני שמזמינים מדביר</h2></div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <button className={openFaq === index ? 'faq-item active' : 'faq-item'} key={faq.q} onClick={() => setOpenFaq(openFaq === index ? null : index)}>
              <span><b>{faq.q}</b><ChevronDown /></span>
              {openFaq === index && <p>{faq.a}</p>}
            </button>
          ))}
        </div>
      </section>

      <footer>
        <div>
          <b>{CONTACT.name}</b> — {CONTACT.title}<br />
          {CONTACT.license} • {CONTACT.warranty}
        </div>
        <div className="footer-links">
          <a href={`tel:${CONTACT.phoneDial}`}>טלפון</a>
          <a href={whatsappUrl('שלום משה, אשמח לעזרה בהדברה')} target="_blank">וואטסאפ</a>
          <a href="#home">למעלה</a>
        </div>
      </footer>

      <div className="mobile-dock">
        <a href={`tel:${CONTACT.phoneDial}`}><Phone /> שיחה</a>
        <a href={whatsappUrl('שלום משה, אני צריך הדברה')} target="_blank"><MessageCircle /> וואטסאפ</a>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
