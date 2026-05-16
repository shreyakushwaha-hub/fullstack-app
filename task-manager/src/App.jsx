import { useState, useEffect, useRef } from "react";

// ─── Theme & Global Styles ───────────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0d0f1a;
      --surface: #141626;
      --surface2: #1c1f35;
      --surface3: #252847;
      --border: rgba(255,255,255,0.07);
      --border2: rgba(255,255,255,0.12);
      --accent: #7c6fff;
      --accent2: #a78bfa;
      --accent-glow: rgba(124,111,255,0.25);
      --green: #22d3a0;
      --green-dim: rgba(34,211,160,0.12);
      --orange: #f59e0b;
      --orange-dim: rgba(245,158,11,0.12);
      --red: #f43f5e;
      --red-dim: rgba(244,63,94,0.12);
      --blue: #38bdf8;
      --blue-dim: rgba(56,189,248,0.12);
      --text: #f0f0ff;
      --text2: #9b9ec8;
      --text3: #5a5d8a;
      --radius: 14px;
      --radius-sm: 8px;
      --shadow: 0 8px 32px rgba(0,0,0,0.4);
      --shadow-accent: 0 8px 32px rgba(124,111,255,0.2);
      --font-head: 'Syne', sans-serif;
      --font-body: 'DM Sans', sans-serif;
    }

    html, body, #root { height: 100%; }
    body {
      font-family: var(--font-body);
      background: var(--bg);
      color: var(--text);
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: var(--surface); }
    ::-webkit-scrollbar-thumb { background: var(--surface3); border-radius: 99px; }

    /* animations */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes pulse {
      0%,100% { opacity: 1; } 50% { opacity: .5; }
    }
    @keyframes spin {
      from { transform: rotate(0deg); } to { transform: rotate(360deg); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes slideIn {
      from { opacity:0; transform: translateX(-16px); }
      to   { opacity:1; transform: translateX(0); }
    }
    @keyframes scaleIn {
      from { opacity:0; transform: scale(0.95); }
      to   { opacity:1; transform: scale(1); }
    }

    .fade-up  { animation: fadeUp  .45s cubic-bezier(.22,1,.36,1) both; }
    .fade-in  { animation: fadeIn  .3s ease both; }
    .scale-in { animation: scaleIn .35s cubic-bezier(.22,1,.36,1) both; }

    input, select, textarea {
      font-family: var(--font-body);
      background: var(--surface2);
      border: 1.5px solid var(--border2);
      border-radius: var(--radius-sm);
      color: var(--text);
      padding: 11px 14px;
      width: 100%;
      font-size: 14px;
      transition: border-color .2s, box-shadow .2s;
      outline: none;
    }
    input:focus, select:focus, textarea:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px var(--accent-glow);
    }
    input::placeholder, textarea::placeholder { color: var(--text3); }

    select option { background: var(--surface2); }

    button { font-family: var(--font-body); cursor: pointer; border: none; outline: none; }

    .btn-primary {
      background: var(--accent);
      color: #fff;
      border-radius: var(--radius-sm);
      padding: 11px 22px;
      font-size: 14px;
      font-weight: 600;
      transition: all .2s;
      display: inline-flex;
      align-items: center;
      gap: 7px;
    }
    .btn-primary:hover { background: var(--accent2); transform: translateY(-1px); box-shadow: var(--shadow-accent); }
    .btn-primary:active { transform: translateY(0); }

    .btn-ghost {
      background: transparent;
      color: var(--text2);
      border: 1.5px solid var(--border2);
      border-radius: var(--radius-sm);
      padding: 10px 18px;
      font-size: 14px;
      font-weight: 500;
      transition: all .2s;
    }
    .btn-ghost:hover { background: var(--surface2); color: var(--text); border-color: var(--border2); }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 20px;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: 99px;
      letter-spacing: .4px;
      text-transform: uppercase;
    }
    .badge-green  { background: var(--green-dim);  color: var(--green);  }
    .badge-orange { background: var(--orange-dim); color: var(--orange); }
    .badge-red    { background: var(--red-dim);    color: var(--red);    }
    .badge-blue   { background: var(--blue-dim);   color: var(--blue);   }
    .badge-purple { background: var(--accent-glow); color: var(--accent2); }

    label { display: block; font-size: 13px; font-weight: 500; color: var(--text2); margin-bottom: 6px; }

    .avatar {
      width: 32px; height: 32px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 12px; font-weight: 700;
      flex-shrink: 0;
    }

    /* modal overlay */
    .modal-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,.6);
      backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center;
      z-index: 1000;
      animation: fadeIn .2s ease both;
    }
    .modal {
      background: var(--surface);
      border: 1px solid var(--border2);
      border-radius: var(--radius);
      padding: 28px;
      width: 480px;
      max-width: 95vw;
      max-height: 90vh;
      overflow-y: auto;
      animation: scaleIn .3s cubic-bezier(.22,1,.36,1) both;
    }

    /* sidebar */
    .sidebar {
      width: 220px; min-width: 220px;
      background: var(--surface);
      border-right: 1px solid var(--border);
      display: flex; flex-direction: column;
      padding: 24px 12px;
      gap: 4px;
    }
    .sidebar-logo {
      font-family: var(--font-head);
      font-size: 17px; font-weight: 800;
      color: var(--text);
      display: flex; align-items: center; gap: 10px;
      padding: 0 10px 20px;
      border-bottom: 1px solid var(--border);
      margin-bottom: 8px;
    }
    .sidebar-logo span { color: var(--accent2); }
    .nav-item {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 12px;
      border-radius: var(--radius-sm);
      font-size: 14px; font-weight: 500;
      color: var(--text2);
      cursor: pointer;
      transition: all .15s;
      text-decoration: none;
    }
    .nav-item:hover { background: var(--surface2); color: var(--text); }
    .nav-item.active { background: var(--accent-glow); color: var(--accent2); }
    .nav-item svg { flex-shrink: 0; }

    /* layout */
    .app-shell { display: flex; height: 100vh; overflow: hidden; }
    .main-content { flex: 1; overflow-y: auto; }
    .page-header {
      padding: 28px 32px 0;
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 28px;
    }
    .page-title {
      font-family: var(--font-head);
      font-size: 24px; font-weight: 700;
    }
    .page-body { padding: 0 32px 32px; }

    /* stat card */
    .stat-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 20px 24px;
      display: flex; flex-direction: column; gap: 6px;
    }
    .stat-num {
      font-family: var(--font-head);
      font-size: 32px; font-weight: 800;
    }
    .stat-label { font-size: 13px; color: var(--text2); }

    /* table */
    table { width: 100%; border-collapse: collapse; }
    th {
      text-align: left;
      font-size: 12px; font-weight: 600;
      color: var(--text3);
      padding: 10px 14px;
      border-bottom: 1px solid var(--border);
      letter-spacing: .5px;
      text-transform: uppercase;
    }
    td { padding: 13px 14px; font-size: 14px; border-bottom: 1px solid var(--border); }
    tr:last-child td { border-bottom: none; }
    tr:hover td { background: rgba(255,255,255,.02); }

    /* kanban */
    .kanban-col {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 16px;
      min-width: 280px;
      display: flex; flex-direction: column; gap: 10px;
    }
    .kanban-col-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 4px;
    }
    .task-card {
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 14px;
      cursor: pointer;
      transition: all .2s;
    }
    .task-card:hover { border-color: var(--accent); transform: translateY(-2px); box-shadow: var(--shadow); }

    /* progress bar */
    .progress-bar { background: var(--surface3); border-radius: 99px; height: 6px; overflow: hidden; }
    .progress-fill { height: 100%; border-radius: 99px; transition: width .5s ease; }

    /* donut chart placeholder */
    .donut { position: relative; display: inline-flex; align-items: center; justify-content: center; }

    /* auth pages */
    .auth-page {
      min-height: 100vh;
      display: flex; align-items: center; justify-content: center;
      background: var(--bg);
      position: relative;
      overflow: hidden;
    }
    .auth-page::before {
      content: '';
      position: absolute;
      width: 600px; height: 600px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(124,111,255,.12) 0%, transparent 70%);
      top: -200px; right: -100px;
      pointer-events: none;
    }
    .auth-page::after {
      content: '';
      position: absolute;
      width: 400px; height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(34,211,160,.07) 0%, transparent 70%);
      bottom: -100px; left: -100px;
      pointer-events: none;
    }
    .auth-card {
      width: 400px;
      background: var(--surface);
      border: 1px solid var(--border2);
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 32px 80px rgba(0,0,0,.5);
      animation: fadeUp .5s cubic-bezier(.22,1,.36,1) both;
    }
    .auth-logo {
      display: flex; align-items: center; gap: 10px; justify-content: center;
      font-family: var(--font-head); font-size: 18px; font-weight: 800;
      margin-bottom: 28px;
    }
    .auth-logo span { color: var(--accent2); }

    /* divider */
    .divider {
      height: 1px; background: var(--border);
      margin: 20px 0;
    }

    /* top bar */
    .topbar {
      padding: 16px 32px;
      border-bottom: 1px solid var(--border);
      display: flex; align-items: center; justify-content: flex-end;
      gap: 12px;
      background: var(--surface);
    }

    /* analytics chart area */
    .chart-area {
      height: 140px;
      display: flex; align-items: flex-end; gap: 6px;
      padding-top: 20px;
    }
    .bar {
      flex: 1;
      border-radius: 4px 4px 0 0;
      transition: all .4s ease;
      cursor: pointer;
      position: relative;
    }
    .bar:hover { filter: brightness(1.2); }

    /* tooltip */
    .tooltip {
      position: absolute;
      bottom: calc(100% + 6px);
      left: 50%; transform: translateX(-50%);
      background: var(--surface3);
      color: var(--text);
      font-size: 11px;
      padding: 4px 8px;
      border-radius: 6px;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity .15s;
    }
    .bar:hover .tooltip { opacity: 1; }

    /* line mini */
    .mini-line { display: flex; align-items: center; gap: 3px; }
    .mini-dot { width: 7px; height: 7px; border-radius: 50%; }

    @media (max-width: 768px) {
      .sidebar { display: none; }
      .page-header { padding: 20px 16px 0; }
      .page-body { padding: 0 16px 20px; }
      .topbar { padding: 12px 16px; }
    }
  `}</style>
);

// ─── Data / Seed ─────────────────────────────────────────────────────────────
const COLORS = ["#7c6fff","#22d3a0","#f59e0b","#f43f5e","#38bdf8","#a78bfa"];
const avatarColor = name => COLORS[name.charCodeAt(0) % COLORS.length];
const initials = name => name.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);

const SEED_USERS = [
  { id:1, name:"John Doe",    email:"john@example.com",  role:"Admin",  password:"admin123" },
  { id:2, name:"Jane Smith",  email:"jane@example.com",  role:"Member", password:"jane123"  },
  { id:3, name:"Alex Brown",  email:"alex@example.com",  role:"Member", password:"alex123"  },
  { id:4, name:"Sam Wilson",  email:"sam@example.com",   role:"Member", password:"sam123"   },
];

const SEED_PROJECTS = [
  { id:1, name:"Website Redesign",  desc:"Revamp the company website.",       members:[1,2,3], tasks:[1,2,3], progress:75 },
  { id:2, name:"Mobile App",         desc:"Build the iOS & Android app.",       members:[1,4],   tasks:[4,5],   progress:50 },
  { id:3, name:"Marketing Site",     desc:"Landing page for Q3 campaign.",      members:[2,3,4], tasks:[6],     progress:100},
  { id:4, name:"Internal Tool",      desc:"HR dashboard for operations team.",  members:[1,2],   tasks:[7,8],   progress:30 },
];

const SEED_TASKS = [
  { id:1, name:"Design Login Page",    desc:"Create Figma mockups for login.",     project:1, assignee:2, status:"In Progress", due:"2026-05-20" },
  { id:2, name:"Setup Backend API",    desc:"Express routes + Mongo models.",       project:1, assignee:1, status:"In Progress", due:"2026-05-25" },
  { id:3, name:"Database Integration", desc:"Connect MongoDB Atlas.",              project:1, assignee:3, status:"To Do",        due:"2026-06-01" },
  { id:4, name:"User Authentication",  desc:"JWT login & registration flow.",      project:1, assignee:1, status:"Done",         due:"2026-05-18" },
  { id:5, name:"Fix Dashboard Bugs",   desc:"Resolve chart rendering issues.",     project:2, assignee:4, status:"Overdue",      due:"2026-05-10" },
  { id:6, name:"Implement Login API",  desc:"Build login API with authentication.",project:2, assignee:3, status:"Done",         due:"2026-05-15" },
  { id:7, name:"Write Documentation",  desc:"README and API docs.",               project:3, assignee:2, status:"To Do",         due:"2026-06-05" },
  { id:8, name:"Setup CI/CD",          desc:"GitHub Actions pipeline.",           project:4, assignee:1, status:"In Progress",  due:"2026-05-30" },
];

const statusBadge = s => {
  const map = { "In Progress":"badge-blue","To Do":"badge-purple","Done":"badge-green","Overdue":"badge-red","In Review":"badge-orange" };
  return <span className={`badge ${map[s]||"badge-purple"}`}>{s}</span>;
};

// ─── Icons ───────────────────────────────────────────────────────────────────
const Icon = ({ d, size=18, stroke="currentColor", fill="none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {typeof d === "string" ? <path d={d}/> : d}
  </svg>
);
const Icons = {
  dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  projects:  <><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></>,
  tasks:     <><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></>,
  team:      <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
  profile:   <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
  analytics: <><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></>,
  logout:    <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
  plus:      <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
  edit:      <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
  trash:     <><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></>,
  eye:       <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
  x:         <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
  check:     <><polyline points="20 6 9 17 4 12"/></>,
  arrow:     <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
  camera:    <><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></>,
};
const NavIcon = ({ name }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{Icons[name]}</svg>;

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ name, size=32 }) => (
  <div className="avatar" style={{ width:size, height:size, fontSize:size*0.36, background: avatarColor(name)+"33", color: avatarColor(name), border:`2px solid ${avatarColor(name)}55` }}>
    {initials(name)}
  </div>
);

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const NAV = [
  { key:"dashboard", label:"Dashboard" },
  { key:"projects",  label:"Projects"  },
  { key:"tasks",     label:"Tasks"     },
  { key:"team",      label:"Team"      },
  { key:"analytics", label:"Analytics" },
  { key:"profile",   label:"Profile"   },
];

const Sidebar = ({ page, setPage, user, onLogout }) => (
  <div className="sidebar">
    <div className="sidebar-logo">
      <svg width="28" height="28" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#7c6fff"/><path d="M8 16l5 5 11-11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <div>Team<span>Task</span></div>
    </div>
    {NAV.map(n => (
      <div key={n.key} className={`nav-item ${page===n.key?"active":""}`} onClick={()=>setPage(n.key)}>
        <NavIcon name={n.key}/> {n.label}
      </div>
    ))}
    <div style={{flex:1}}/>
    <div className="divider"/>
    <div className="nav-item" style={{alignItems:"center",gap:10}}>
      <Avatar name={user.name} size={28}/>
      <div style={{minWidth:0}}>
        <div style={{fontSize:13,fontWeight:600,color:"var(--text)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user.name}</div>
        <div style={{fontSize:11,color:"var(--text3)"}}>{user.role}</div>
      </div>
    </div>
    <div className="nav-item" onClick={onLogout} style={{color:"var(--red)"}}>
      <NavIcon name="logout"/> Logout
    </div>
  </div>
);

// ─── Topbar ───────────────────────────────────────────────────────────────────
const Topbar = ({ user }) => (
  <div className="topbar">
    <div style={{fontSize:13,color:"var(--text2)"}}>Welcome back, <strong style={{color:"var(--text)"}}>{user.name.split(" ")[0]}</strong> 👋</div>
    <Avatar name={user.name} size={34}/>
  </div>
);

// ─── Donut Chart ─────────────────────────────────────────────────────────────
const DonutChart = ({ data, total, size=120 }) => {
  const r = 42; const cx=60; const cy=60;
  const circumference = 2*Math.PI*r;
  let offset = 0;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--surface3)" strokeWidth="14"/>
      {data.map((d,i)=>{
        const dash = (d.value/total)*circumference;
        const gap  = circumference - dash;
        const el = <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={d.color} strokeWidth="14"
          strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-offset} strokeLinecap="butt"
          style={{transform:"rotate(-90deg)",transformOrigin:"center"}}/>;
        offset += dash;
        return el;
      })}
      <text x={cx} y={cy-6} textAnchor="middle" fill="var(--text)" fontSize="20" fontWeight="800" fontFamily="Syne">{total}</text>
      <text x={cx} y={cy+12} textAnchor="middle" fill="var(--text3)" fontSize="10">Total</text>
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  PAGES
// ─────────────────────────────────────────────────────────────────────────────

// ── Login Page ────────────────────────────────────────────────────────────────
const LoginPage = ({ onLogin, goSignup }) => {
  const [form,setForm]=useState({email:"admin@example.com",password:"admin123"});
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);

  const handle = async () => {
    setErr(""); setLoading(true);
    await new Promise(r=>setTimeout(r,600));
    setLoading(false);
    const user = SEED_USERS.find(u=>u.email===form.email && u.password===form.password);
    if(user) onLogin(user);
    else setErr("Invalid email or password.");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <svg width="30" height="30" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#7c6fff"/><path d="M8 16l5 5 11-11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Team <span>Task Manager</span>
        </div>
        <h2 style={{fontFamily:"var(--font-head)",fontSize:26,fontWeight:700,textAlign:"center",marginBottom:6}}>Login</h2>
        <p style={{textAlign:"center",color:"var(--text2)",fontSize:14,marginBottom:28}}>Welcome back! Please login to your account.</p>
        {err && <div style={{background:"var(--red-dim)",color:"var(--red)",borderRadius:8,padding:"10px 14px",fontSize:13,marginBottom:16}}>{err}</div>}
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div><label>Email</label><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="admin@example.com" type="email"/></div>
          <div><label>Password</label><input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="••••••••" type="password"/></div>
          <div style={{textAlign:"right",marginTop:-8}}><span style={{fontSize:13,color:"var(--accent2)",cursor:"pointer"}}>Forgot password?</span></div>
          <button className="btn-primary" style={{width:"100%",justifyContent:"center",padding:13}} onClick={handle}>
            {loading ? <span style={{animation:"spin 1s linear infinite",display:"inline-block",width:16,height:16,border:"2px solid rgba(255,255,255,.3)",borderTop:"2px solid white",borderRadius:"50%"}}/> : "Login"}
          </button>
        </div>
        <div className="divider"/>
        <p style={{textAlign:"center",fontSize:13,color:"var(--text2)"}}>Don't have an account? <span style={{color:"var(--accent2)",cursor:"pointer",fontWeight:600}} onClick={goSignup}>Sign up</span></p>
        <div style={{marginTop:20,padding:12,background:"var(--surface2)",borderRadius:8,fontSize:12,color:"var(--text3)"}}>
          <strong style={{color:"var(--text2)"}}>Demo:</strong> admin@example.com / admin123
        </div>
      </div>
    </div>
  );
};

// ── Signup Page ───────────────────────────────────────────────────────────────
const SignupPage = ({ onLogin, goLogin }) => {
  const [form,setForm]=useState({name:"",email:"",password:"",role:"Member"});
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);

  const handle = async () => {
    setErr("");
    if(!form.name||!form.email||!form.password){ setErr("All fields required."); return; }
    if(form.password.length<6){ setErr("Password must be at least 6 characters."); return; }
    setLoading(true);
    await new Promise(r=>setTimeout(r,700));
    setLoading(false);
    const newUser = { id: Date.now(), name:form.name, email:form.email, role:form.role, password:form.password };
    SEED_USERS.push(newUser);
    onLogin(newUser);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <svg width="30" height="30" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#7c6fff"/><path d="M8 16l5 5 11-11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Team <span>Task Manager</span>
        </div>
        <h2 style={{fontFamily:"var(--font-head)",fontSize:26,fontWeight:700,textAlign:"center",marginBottom:6}}>Sign Up</h2>
        <p style={{textAlign:"center",color:"var(--text2)",fontSize:14,marginBottom:28}}>Create your account to get started.</p>
        {err && <div style={{background:"var(--red-dim)",color:"var(--red)",borderRadius:8,padding:"10px 14px",fontSize:13,marginBottom:16}}>{err}</div>}
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div><label>Name</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="John Doe"/></div>
          <div><label>Email</label><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="john@example.com" type="email"/></div>
          <div><label>Password</label><input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="••••••••" type="password"/></div>
          <div><label>Role</label>
            <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
              <option>Member</option><option>Admin</option>
            </select>
          </div>
          <button className="btn-primary" style={{width:"100%",justifyContent:"center",padding:13}} onClick={handle}>
            {loading ? <span style={{animation:"spin 1s linear infinite",display:"inline-block",width:16,height:16,border:"2px solid rgba(255,255,255,.3)",borderTop:"2px solid white",borderRadius:"50%"}}/> : "Sign Up"}
          </button>
        </div>
        <div className="divider"/>
        <p style={{textAlign:"center",fontSize:13,color:"var(--text2)"}}>Already have an account? <span style={{color:"var(--accent2)",cursor:"pointer",fontWeight:600}} onClick={goLogin}>Login</span></p>
      </div>
    </div>
  );
};

// ── Dashboard Page ────────────────────────────────────────────────────────────
const DashboardPage = ({ user, tasks, projects, setPage }) => {
  const myTasks = tasks.filter(t=>t.assignee===user.id||user.role==="Admin");
  const stats = {
    projects: projects.length,
    tasks: tasks.length,
    completed: tasks.filter(t=>t.status==="Done").length,
    overdue: tasks.filter(t=>t.status==="Overdue").length,
  };
  const donutData = [
    {value: tasks.filter(t=>t.status==="To Do").length,        color:"var(--accent)"},
    {value: tasks.filter(t=>t.status==="In Progress").length,  color:"var(--blue)"},
    {value: tasks.filter(t=>t.status==="In Review").length,    color:"var(--orange)"},
    {value: tasks.filter(t=>t.status==="Done").length,         color:"var(--green)"},
  ];
  const recent = [...tasks].slice(-5).reverse();

  return (
    <div>
      <Topbar user={user}/>
      <div className="page-header"><h1 className="page-title">Dashboard</h1></div>
      <div className="page-body">
        {/* Stats row */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:24}} className="fade-up">
          {[
            {label:"Projects",num:stats.projects,color:"var(--accent)"},
            {label:"Tasks",num:stats.tasks,color:"var(--blue)"},
            {label:"Completed",num:stats.completed,color:"var(--green)"},
            {label:"Overdue",num:stats.overdue,color:"var(--red)"},
          ].map(s=>(
            <div className="stat-card" key={s.label} style={{borderTop:`3px solid ${s.color}`}}>
              <div className="stat-num" style={{color:s.color}}>{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1.4fr",gap:20,marginBottom:24}}>
          {/* Donut */}
          <div className="card fade-up" style={{animationDelay:".05s"}}>
            <div style={{fontWeight:700,marginBottom:16}}>Tasks Overview</div>
            <div style={{display:"flex",alignItems:"center",gap:24}}>
              <DonutChart data={donutData} total={tasks.length} size={130}/>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {[{label:"To Do",color:"var(--accent)"},{label:"In Progress",color:"var(--blue)"},{label:"In Review",color:"var(--orange)"},{label:"Done",color:"var(--green)"}].map((l,i)=>(
                  <div key={l.label} style={{display:"flex",alignItems:"center",gap:8,fontSize:13}}>
                    <div style={{width:10,height:10,borderRadius:"50%",background:l.color,flexShrink:0}}/>
                    <span style={{color:"var(--text2)"}}>{l.label}</span>
                    <span style={{marginLeft:"auto",fontWeight:600}}>{donutData[i].value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Tasks */}
          <div className="card fade-up" style={{animationDelay:".1s"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
              <div style={{fontWeight:700}}>Recent Tasks</div>
              <span style={{fontSize:13,color:"var(--accent2)",cursor:"pointer"}} onClick={()=>setPage("tasks")}>View all →</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {recent.map(t=>(
                <div key={t.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
                  <div style={{fontSize:14,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.name}</div>
                  {statusBadge(t.status)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects summary */}
        <div className="card fade-up" style={{animationDelay:".15s"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <div style={{fontWeight:700}}>Projects</div>
            <span style={{fontSize:13,color:"var(--accent2)",cursor:"pointer"}} onClick={()=>setPage("projects")}>View all →</span>
          </div>
          <table>
            <thead><tr><th>Project</th><th>Tasks</th><th>Progress</th></tr></thead>
            <tbody>
              {projects.map(p=>(
                <tr key={p.id}>
                  <td style={{fontWeight:500}}>{p.name}</td>
                  <td style={{color:"var(--text2)"}}>{p.tasks.length}</td>
                  <td style={{minWidth:160}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div className="progress-bar" style={{flex:1}}>
                        <div className="progress-fill" style={{width:p.progress+"%",background: p.progress===100?"var(--green)":p.progress>50?"var(--accent)":"var(--orange)"}}/>
                      </div>
                      <span style={{fontSize:13,color:"var(--text2)",minWidth:32}}>{p.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ── Projects Page ─────────────────────────────────────────────────────────────
const ProjectsPage = ({ user, projects, setProjects, tasks, users, setPage, setActiveProject }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const [form, setForm] = useState({name:"",desc:"",members:[]});

  const create = () => {
    if(!form.name) return;
    const np = { id: Date.now(), name:form.name, desc:form.desc, members:form.members, tasks:[], progress:0 };
    setProjects([...projects, np]);
    setForm({name:"",desc:"",members:[]}); setShowCreate(false);
  };
  const del = id => setProjects(projects.filter(p=>p.id!==id));

  return (
    <div>
      <Topbar user={user}/>
      <div className="page-header">
        <h1 className="page-title">Projects</h1>
        {user.role==="Admin"&&<button className="btn-primary" onClick={()=>setShowCreate(true)}><Icon d={Icons.plus} size={16}/> New Project</button>}
      </div>
      <div className="page-body">
        <div className="card fade-up" style={{padding:0,overflow:"hidden"}}>
          <table>
            <thead><tr><th>Project Name</th><th>Team</th><th>Tasks</th><th>Progress</th><th>Action</th></tr></thead>
            <tbody>
              {projects.map(p=>(
                <tr key={p.id}>
                  <td>
                    <div style={{fontWeight:600}}>{p.name}</div>
                    <div style={{fontSize:12,color:"var(--text3)",marginTop:2}}>{p.desc}</div>
                  </td>
                  <td>
                    <div style={{display:"flex",gap:-6}}>
                      {p.members.map(mid=>{
                        const u=SEED_USERS.find(u=>u.id===mid);
                        return u?<div key={mid} style={{marginRight:-8}}><Avatar name={u.name} size={28}/></div>:null;
                      })}
                    </div>
                  </td>
                  <td style={{color:"var(--text2)"}}>{tasks.filter(t=>t.project===p.id).length}</td>
                  <td style={{minWidth:140}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div className="progress-bar" style={{flex:1}}>
                        <div className="progress-fill" style={{width:p.progress+"%",background:p.progress===100?"var(--green)":p.progress>50?"var(--accent)":"var(--orange)"}}/>
                      </div>
                      <span style={{fontSize:12,color:"var(--text2)"}}>{p.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <div style={{display:"flex",gap:6}}>
                      <button className="btn-ghost" style={{padding:"6px 10px",fontSize:12}} onClick={()=>setShowDetail(p)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      </button>
                      {user.role==="Admin"&&<button className="btn-ghost" style={{padding:"6px 10px",fontSize:12,color:"var(--red)",borderColor:"var(--red-dim)"}} onClick={()=>del(p.id)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                      </button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowCreate(false)}>
          <div className="modal">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
              <h3 style={{fontFamily:"var(--font-head)",fontWeight:700}}>Create New Project</h3>
              <button style={{background:"transparent",color:"var(--text2)",padding:4}} onClick={()=>setShowCreate(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <div><label>Project Name</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="CRM Dashboard"/></div>
              <div><label>Description</label><textarea value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} rows={3} placeholder="Customer relationship management tool." style={{resize:"none"}}/></div>
              <div><label>Team Members</label>
                <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:4}}>
                  {SEED_USERS.map(u=>(
                    <div key={u.id} style={{display:"flex",alignItems:"center",gap:6,padding:"6px 12px",borderRadius:99,fontSize:13,cursor:"pointer",border:`1.5px solid ${form.members.includes(u.id)?"var(--accent)":"var(--border2)"}`,background:form.members.includes(u.id)?"var(--accent-glow)":"transparent",color:form.members.includes(u.id)?"var(--accent2)":"var(--text2)",transition:"all .15s"}}
                      onClick={()=>setForm({...form,members:form.members.includes(u.id)?form.members.filter(m=>m!==u.id):[...form.members,u.id]})}>
                      <Avatar name={u.name} size={20}/>{u.name}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:8}}>
                <button className="btn-ghost" onClick={()=>setShowCreate(false)}>Cancel</button>
                <button className="btn-primary" onClick={create}>Create Project</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetail && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowDetail(null)}>
          <div className="modal" style={{width:540}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
              <div>
                <h3 style={{fontFamily:"var(--font-head)",fontWeight:700}}>{showDetail.name}</h3>
                <p style={{fontSize:13,color:"var(--text2)",marginTop:4}}>{showDetail.desc}</p>
              </div>
              <button style={{background:"transparent",color:"var(--text2)",padding:4}} onClick={()=>setShowDetail(null)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div style={{marginBottom:16}}>
              <label style={{marginBottom:8}}>Team Members</label>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                {showDetail.members.map(mid=>{
                  const u=SEED_USERS.find(u=>u.id===mid);
                  return u?<div key={mid} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 12px",borderRadius:99,background:"var(--surface2)",fontSize:13}}>
                    <Avatar name={u.name} size={22}/>{u.name} <span style={{color:"var(--text3)"}}>{u.role}</span>
                  </div>:null;
                })}
              </div>
            </div>
            <div style={{fontWeight:600,marginBottom:10}}>Tasks</div>
            <table>
              <thead><tr><th>Task</th><th>Assignee</th><th>Status</th><th>Due</th></tr></thead>
              <tbody>
                {tasks.filter(t=>t.project===showDetail.id).map(t=>{
                  const u=SEED_USERS.find(u=>u.id===t.assignee);
                  return <tr key={t.id}>
                    <td style={{fontSize:13}}>{t.name}</td>
                    <td>{u?<div style={{display:"flex",alignItems:"center",gap:6}}><Avatar name={u.name} size={22}/><span style={{fontSize:12}}>{u.name}</span></div>:"-"}</td>
                    <td>{statusBadge(t.status)}</td>
                    <td style={{fontSize:12,color:"var(--text3)"}}>{t.due}</td>
                  </tr>;
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Tasks Board (Kanban) ──────────────────────────────────────────────────────
const TasksPage = ({ user, tasks, setTasks, projects }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({name:"",desc:"",project:1,assignee:1,status:"To Do",due:""});

  const cols = ["To Do","In Progress","In Review","Done"];
  const create = () => {
    if(!form.name) return;
    const nt = { id: Date.now(), ...form, project:+form.project, assignee:+form.assignee };
    setTasks([...tasks, nt]);
    setForm({name:"",desc:"",project:1,assignee:1,status:"To Do",due:""});
    setShowCreate(false);
  };
  const del = id => setTasks(tasks.filter(t=>t.id!==id));
  const move = (id, status) => setTasks(tasks.map(t=>t.id===id?{...t,status}:t));

  const colColors = {"To Do":"var(--accent)","In Progress":"var(--blue)","In Review":"var(--orange)","Done":"var(--green)"};

  return (
    <div>
      <Topbar user={user}/>
      <div className="page-header">
        <h1 className="page-title">Tasks Board</h1>
        {user.role==="Admin"&&<button className="btn-primary" onClick={()=>setShowCreate(true)}><Icon d={Icons.plus} size={16}/> New Task</button>}
      </div>
      <div className="page-body">
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}} className="fade-up">
          {cols.map(col=>{
            const colTasks = tasks.filter(t=>t.status===col||(col==="To Do"&&t.status==="Overdue"&&false));
            const filtered = tasks.filter(t=>t.status===col);
            return (
              <div className="kanban-col" key={col}>
                <div className="kanban-col-header">
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:colColors[col]}}/>
                    <span style={{fontWeight:700,fontSize:14}}>{col}</span>
                  </div>
                  <span style={{fontSize:12,color:"var(--text3)",background:"var(--surface2)",padding:"2px 8px",borderRadius:99}}>{filtered.length}</span>
                </div>
                {filtered.map(t=>{
                  const u=SEED_USERS.find(u=>u.id===t.assignee);
                  const p=projects.find(p=>p.id===t.project);
                  return (
                    <div className="task-card" key={t.id} style={{animationDelay:`${t.id*0.03}s`}}>
                      <div style={{fontWeight:600,fontSize:14,marginBottom:6}}>{t.name}</div>
                      <div style={{fontSize:12,color:"var(--text3)",marginBottom:10,lineHeight:1.5}}>{t.desc}</div>
                      {p&&<div style={{fontSize:11,color:"var(--accent2)",marginBottom:8,display:"flex",alignItems:"center",gap:4}}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg> {p.name}
                      </div>}
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        {u?<div style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:"var(--text2)"}}>
                          <Avatar name={u.name} size={22}/>{u.name.split(" ")[0]}
                        </div>:<div/>}
                        <div style={{display:"flex",gap:4}}>
                          {cols.filter(c=>c!==col).slice(0,1).map(next=>(
                            <button key={next} style={{background:"var(--surface3)",border:"none",color:"var(--text2)",borderRadius:6,padding:"4px 8px",fontSize:11,cursor:"pointer"}} onClick={()=>move(t.id,next)}>→ {next.split(" ")[0]}</button>
                          ))}
                          {user.role==="Admin"&&<button style={{background:"var(--red-dim)",border:"none",color:"var(--red)",borderRadius:6,padding:"4px 7px",fontSize:11,cursor:"pointer"}} onClick={()=>del(t.id)}>✕</button>}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {filtered.length===0&&<div style={{textAlign:"center",color:"var(--text3)",fontSize:13,padding:"20px 0"}}>No tasks</div>}
              </div>
            );
          })}
        </div>
      </div>

      {showCreate && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowCreate(false)}>
          <div className="modal">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
              <h3 style={{fontFamily:"var(--font-head)",fontWeight:700}}>Create New Task</h3>
              <button style={{background:"transparent",color:"var(--text2)",padding:4}} onClick={()=>setShowCreate(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <div><label>Task Name</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Implement Login API"/></div>
              <div><label>Description</label><textarea value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} rows={2} placeholder="Build login API with authentication." style={{resize:"none"}}/></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div><label>Project</label>
                  <select value={form.project} onChange={e=>setForm({...form,project:+e.target.value})}>
                    {projects.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div><label>Assign To</label>
                  <select value={form.assignee} onChange={e=>setForm({...form,assignee:+e.target.value})}>
                    {SEED_USERS.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
                  </select>
                </div>
                <div><label>Status</label>
                  <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
                    {["To Do","In Progress","In Review","Done"].map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
                <div><label>Due Date</label><input type="date" value={form.due} onChange={e=>setForm({...form,due:e.target.value})} style={{colorScheme:"dark"}}/></div>
              </div>
              <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:8}}>
                <button className="btn-ghost" onClick={()=>setShowCreate(false)}>Cancel</button>
                <button className="btn-primary" onClick={create}>Create Task</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Team Page ─────────────────────────────────────────────────────────────────
const TeamPage = ({ user, tasks }) => {
  const [showInvite, setShowInvite] = useState(false);
  const [form, setForm] = useState({name:"",email:"",role:"Member"});
  const [members, setMembers] = useState([...SEED_USERS]);

  const invite = () => {
    if(!form.name||!form.email) return;
    const nm = { id: Date.now(), ...form, password:"temp123" };
    SEED_USERS.push(nm);
    setMembers([...SEED_USERS]);
    setForm({name:"",email:"",role:"Member"});
    setShowInvite(false);
  };

  return (
    <div>
      <Topbar user={user}/>
      <div className="page-header">
        <h1 className="page-title">Team Management</h1>
        {user.role==="Admin"&&<button className="btn-primary" onClick={()=>setShowInvite(true)}><Icon d={Icons.plus} size={16}/> Invite Member</button>}
      </div>
      <div className="page-body">
        <div className="card fade-up" style={{padding:0,overflow:"hidden"}}>
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Tasks</th><th>Action</th></tr></thead>
            <tbody>
              {members.map(m=>(
                <tr key={m.id}>
                  <td><div style={{display:"flex",alignItems:"center",gap:10}}><Avatar name={m.name}/><span style={{fontWeight:500}}>{m.name}</span></div></td>
                  <td style={{color:"var(--text2)",fontSize:13}}>{m.email}</td>
                  <td><span className={`badge ${m.role==="Admin"?"badge-purple":"badge-blue"}`}>{m.role}</span></td>
                  <td style={{color:"var(--text2)"}}>{tasks.filter(t=>t.assignee===m.id).length}</td>
                  <td>
                    {user.role==="Admin"&&m.id!==user.id&&(
                      <button className="btn-ghost" style={{padding:"5px 10px",fontSize:12,color:"var(--red)",borderColor:"var(--red-dim)"}}
                        onClick={()=>setMembers(members.filter(mm=>mm.id!==m.id))}>Remove</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showInvite && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowInvite(false)}>
          <div className="modal">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
              <h3 style={{fontFamily:"var(--font-head)",fontWeight:700}}>Invite Member</h3>
              <button style={{background:"transparent",color:"var(--text2)",padding:4}} onClick={()=>setShowInvite(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <div><label>Name</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Jane Doe"/></div>
              <div><label>Email</label><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="jane@example.com" type="email"/></div>
              <div><label>Role</label><select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}><option>Member</option><option>Admin</option></select></div>
              <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:8}}>
                <button className="btn-ghost" onClick={()=>setShowInvite(false)}>Cancel</button>
                <button className="btn-primary" onClick={invite}>+ Invite</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Profile Page ──────────────────────────────────────────────────────────────
const ProfilePage = ({ user, setUser, tasks }) => {
  const [form, setForm] = useState({name:user.name, email:user.email});
  const [saved, setSaved] = useState(false);
  const [pwForm, setPwForm] = useState({old:"",new:"",confirm:""});
  const [pwMsg, setPwMsg] = useState("");

  const save = () => {
    setUser({...user, ...form});
    setSaved(true);
    setTimeout(()=>setSaved(false), 2000);
  };
  const changePw = () => {
    if(pwForm.old!==user.password){ setPwMsg("Incorrect current password."); return; }
    if(pwForm.new!==pwForm.confirm){ setPwMsg("Passwords don't match."); return; }
    if(pwForm.new.length<6){ setPwMsg("Min 6 characters."); return; }
    setUser({...user, password:pwForm.new});
    setPwMsg("✓ Password changed!");
    setPwForm({old:"",new:"",confirm:""});
    setTimeout(()=>setPwMsg(""),2500);
  };

  const myTasks = tasks.filter(t=>t.assignee===user.id);

  return (
    <div>
      <Topbar user={user}/>
      <div className="page-header"><h1 className="page-title">Profile</h1></div>
      <div className="page-body">
        <div style={{display:"grid",gridTemplateColumns:"340px 1fr",gap:20}} className="fade-up">
          {/* Profile card */}
          <div>
            <div className="card" style={{textAlign:"center",marginBottom:16}}>
              <div style={{width:80,height:80,borderRadius:"50%",background:avatarColor(user.name)+"33",border:`3px solid ${avatarColor(user.name)}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:28,fontWeight:800,color:avatarColor(user.name),fontFamily:"var(--font-head)"}}>
                {initials(user.name)}
              </div>
              <div style={{fontFamily:"var(--font-head)",fontWeight:700,fontSize:18,marginBottom:4}}>{user.name}</div>
              <div style={{color:"var(--text2)",fontSize:14,marginBottom:8}}>{user.email}</div>
              <span className={`badge ${user.role==="Admin"?"badge-purple":"badge-blue"}`}>{user.role}</span>
              <div style={{marginTop:16}}>
                <button className="btn-ghost" style={{fontSize:12,padding:"6px 14px",width:"100%"}}>📷 Change Photo</button>
              </div>
            </div>
            <div className="card">
              <div style={{fontWeight:700,marginBottom:12}}>My Tasks</div>
              {myTasks.length===0?<div style={{color:"var(--text3)",fontSize:13}}>No tasks assigned.</div>:
              myTasks.map(t=>(
                <div key={t.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10,gap:8}}>
                  <div style={{fontSize:13,flex:1}}>{t.name}</div>
                  {statusBadge(t.status)}
                </div>
              ))}
            </div>
          </div>

          {/* Edit form */}
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <div className="card">
              <div style={{fontWeight:700,marginBottom:16}}>Personal Information</div>
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div><label>Full Name</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
                <div><label>Email</label><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} type="email"/></div>
                <div><label>Role</label><input value={user.role} disabled style={{opacity:.5}}/></div>
                <div style={{display:"flex",alignItems:"center",gap:12,marginTop:4}}>
                  <button className="btn-primary" onClick={save}>Save Changes</button>
                  {saved&&<span style={{color:"var(--green)",fontSize:13}}>✓ Saved!</span>}
                </div>
              </div>
            </div>

            <div className="card">
              <div style={{fontWeight:700,marginBottom:16}}>Change Password</div>
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div><label>Current Password</label><input value={pwForm.old} onChange={e=>setPwForm({...pwForm,old:e.target.value})} type="password" placeholder="••••••••"/></div>
                <div><label>New Password</label><input value={pwForm.new} onChange={e=>setPwForm({...pwForm,new:e.target.value})} type="password" placeholder="••••••••"/></div>
                <div><label>Confirm Password</label><input value={pwForm.confirm} onChange={e=>setPwForm({...pwForm,confirm:e.target.value})} type="password" placeholder="••••••••"/></div>
                {pwMsg&&<div style={{fontSize:13,color:pwMsg.startsWith("✓")?"var(--green)":"var(--red)"}}>{pwMsg}</div>}
                <div><button className="btn-primary" onClick={changePw}>Change Password</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Analytics Page ────────────────────────────────────────────────────────────
const AnalyticsPage = ({ user, tasks, projects }) => {
  const months = ["Jan","Feb","Mar","Apr","May","Jun"];
  const completed = [4,8,6,12,10,tasks.filter(t=>t.status==="Done").length];
  const overdue   = [1,2,3,1,4,tasks.filter(t=>t.status==="Overdue").length];
  const maxVal = Math.max(...completed,...overdue,1);

  const statusDist = [
    {label:"To Do",       val:tasks.filter(t=>t.status==="To Do").length,       color:"var(--accent)"},
    {label:"In Progress", val:tasks.filter(t=>t.status==="In Progress").length,  color:"var(--blue)"},
    {label:"In Review",   val:tasks.filter(t=>t.status==="In Review").length,    color:"var(--orange)"},
    {label:"Done",        val:tasks.filter(t=>t.status==="Done").length,         color:"var(--green)"},
    {label:"Overdue",     val:tasks.filter(t=>t.status==="Overdue").length,      color:"var(--red)"},
  ];

  return (
    <div>
      <Topbar user={user}/>
      <div className="page-header"><h1 className="page-title">Analytics & Reports</h1></div>
      <div className="page-body">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}} className="fade-up">
          {/* Tasks Completed chart */}
          <div className="card">
            <div style={{fontWeight:700,marginBottom:4}}>Tasks Completed</div>
            <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:16}}>
              <span style={{fontFamily:"var(--font-head)",fontSize:32,fontWeight:800,color:"var(--green)"}}>{tasks.filter(t=>t.status==="Done").length}</span>
              <span style={{fontSize:12,color:"var(--green)"}}>+40% from last month</span>
            </div>
            <div className="chart-area">
              {completed.map((v,i)=>(
                <div key={i} className="bar" style={{height:`${(v/maxVal)*100}%`,background:"var(--green)",opacity:.8+i*.03}}>
                  <div className="tooltip">{months[i]}: {v}</div>
                </div>
              ))}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
              {months.map(m=><div key={m} style={{flex:1,textAlign:"center",fontSize:10,color:"var(--text3)"}}>{m}</div>)}
            </div>
          </div>

          {/* Tasks Overdue chart */}
          <div className="card">
            <div style={{fontWeight:700,marginBottom:4}}>Tasks Overdue</div>
            <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:16}}>
              <span style={{fontFamily:"var(--font-head)",fontSize:32,fontWeight:800,color:"var(--red)"}}>{tasks.filter(t=>t.status==="Overdue").length}</span>
              <span style={{fontSize:12,color:"var(--red)"}}>-2% from last month</span>
            </div>
            <div className="chart-area">
              {overdue.map((v,i)=>(
                <div key={i} className="bar" style={{height:`${(v/maxVal)*100}%`,background:"var(--red)",opacity:.7+i*.05}}>
                  <div className="tooltip">{months[i]}: {v}</div>
                </div>
              ))}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
              {months.map(m=><div key={m} style={{flex:1,textAlign:"center",fontSize:10,color:"var(--text3)"}}>{m}</div>)}
            </div>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:20}}>
          {/* Project Progress */}
          <div className="card fade-up" style={{animationDelay:".1s"}}>
            <div style={{fontWeight:700,marginBottom:16}}>Project Progress</div>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {projects.map(p=>(
                <div key={p.id}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:14}}>
                    <span style={{fontWeight:500}}>{p.name}</span>
                    <span style={{color:"var(--text2)"}}>{p.progress}%</span>
                  </div>
                  <div className="progress-bar" style={{height:8}}>
                    <div className="progress-fill" style={{width:p.progress+"%",background:p.progress===100?"var(--green)":p.progress>50?"var(--accent)":"var(--orange)"}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Task Status donut */}
          <div className="card fade-up" style={{animationDelay:".15s"}}>
            <div style={{fontWeight:700,marginBottom:16}}>Task Status</div>
            <div style={{display:"flex",justifyContent:"center",marginBottom:16}}>
              <DonutChart data={statusDist.map(s=>({value:s.val,color:s.color}))} total={tasks.length} size={130}/>
            </div>
            {statusDist.map(s=>(
              <div key={s.label} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,fontSize:13}}>
                <div style={{width:10,height:10,borderRadius:"50%",background:s.color,flexShrink:0}}/>
                <span style={{flex:1,color:"var(--text2)"}}>{s.label}</span>
                <span style={{fontWeight:600}}>{s.val}</span>
                <span style={{color:"var(--text3)",fontSize:11}}>{tasks.length?Math.round(s.val/tasks.length*100):0}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── App Shell ────────────────────────────────────────────────────────────────
export default function App() {
  const [auth, setAuth] = useState(null); // null = not logged in
  const [authMode, setAuthMode] = useState("login"); // login | signup
  const [page, setPage] = useState("dashboard");
  const [projects, setProjects] = useState([...SEED_PROJECTS]);
  const [tasks, setTasks] = useState([...SEED_TASKS]);

  const login  = user => { setAuth(user); setPage("dashboard"); };
  const logout = () => { setAuth(null); setAuthMode("login"); };

  if(!auth) {
    if(authMode==="signup") return <><GlobalStyle/><SignupPage onLogin={login} goLogin={()=>setAuthMode("login")}/></>;
    return <><GlobalStyle/><LoginPage onLogin={login} goSignup={()=>setAuthMode("signup")}/></>;
  }

  const pageProps = { user:auth, setUser:setAuth, tasks, setTasks, projects, setProjects };

  return (
    <>
      <GlobalStyle/>
      <div className="app-shell">
        <Sidebar page={page} setPage={setPage} user={auth} onLogout={logout}/>
        <div className="main-content">
          {page==="dashboard" && <DashboardPage {...pageProps} setPage={setPage}/>}
          {page==="projects"  && <ProjectsPage  {...pageProps} setPage={setPage}/>}
          {page==="tasks"     && <TasksPage     {...pageProps}/>}
          {page==="team"      && <TeamPage      {...pageProps}/>}
          {page==="profile"   && <ProfilePage   {...pageProps}/>}
          {page==="analytics" && <AnalyticsPage {...pageProps}/>}
        </div>
      </div>
    </>
  );
}
