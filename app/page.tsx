"use client";

import { useMemo, useState } from "react";
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, Check,
  ChevronDown, CircleHelp, Clock3, Flame, Menu, Minus, Plus, Search,
  ShieldCheck, Sparkles, Ticket, Trophy, Wallet, X, Dices, Gamepad2, Spade, CircleDollarSign, UserRound
} from "lucide-react";

function blackjackTotal(cards: number[]) {
  let total = 0; let aces = 0;
  for (const card of cards) { if (card === 1) { total += 11; aces += 1; } else total += Math.min(card, 10); }
  while (total > 21 && aces > 0) { total -= 10; aces -= 1; }
  return total;
}

type Match = {
  id: number; sport: string; league: string; time: string; home: string; away: string;
  homeCode: string; awayCode: string; homeColor: string; awayColor: string;
  score?: string; status: "LIVE" | "UPCOMING"; markets: [string, string, string];
  odds: [string, string, string]; trend: "up" | "down" | "steady";
};

const matches: Match[] = [
  { id: 1, sport: "Football", league: "ENGLISH PREMIER LEAGUE", time: "LIVE · 64′", home: "Arsenal", away: "Chelsea", homeCode: "ARS", awayCode: "CHE", homeColor: "#e84b43", awayColor: "#2867b2", score: "2 : 1", status: "LIVE", markets: ["Arsenal", "Draw", "Chelsea"], odds: ["1.74", "3.65", "4.80"], trend: "up" },
  { id: 2, sport: "Football", league: "UEFA CHAMPIONS LEAGUE", time: "Today · 20:00", home: "Real Madrid", away: "Bayern Munich", homeCode: "RMA", awayCode: "FCB", homeColor: "#e6e5df", awayColor: "#d94a43", status: "UPCOMING", markets: ["Real Madrid", "Draw", "Bayern"], odds: ["2.15", "3.40", "3.05"], trend: "steady" },
  { id: 3, sport: "Football", league: "ENGLISH PREMIER LEAGUE", time: "Today · 21:00", home: "Liverpool", away: "Man City", homeCode: "LIV", awayCode: "MCI", homeColor: "#d73d42", awayColor: "#5a9bd8", status: "UPCOMING", markets: ["Liverpool", "Draw", "Man City"], odds: ["2.65", "3.50", "2.48"], trend: "down" },
  { id: 4, sport: "Football", league: "LA LIGA", time: "Tomorrow · 18:30", home: "Barcelona", away: "Atletico Madrid", homeCode: "BAR", awayCode: "ATM", homeColor: "#3976b9", awayColor: "#d34d4d", status: "UPCOMING", markets: ["Barcelona", "Draw", "Atletico"], odds: ["1.92", "3.55", "3.90"], trend: "up" }
  ,{ id: 5, sport: "Basketball", league: "NBA · DEMO FIXTURE", time: "Today · 19:30", home: "Boston", away: "New York", homeCode: "BOS", awayCode: "NYK", homeColor: "#2876bd", awayColor: "#e87835", status: "UPCOMING", markets: ["Boston", "Draw", "New York"], odds: ["1.68", "—", "2.20"], trend: "steady" }
  ,{ id: 6, sport: "Basketball", league: "EUROLEAGUE · DEMO FIXTURE", time: "Tomorrow · 20:00", home: "Real Madrid", away: "Barcelona", homeCode: "RMA", awayCode: "BAR", homeColor: "#e6e5df", awayColor: "#3976b9", status: "UPCOMING", markets: ["Real Madrid", "Draw", "Barcelona"], odds: ["1.82", "—", "2.02"], trend: "up" }
  ,{ id: 7, sport: "Cricket", league: "T20 · DEMO FIXTURE", time: "Today · 18:00", home: "India", away: "Australia", homeCode: "IND", awayCode: "AUS", homeColor: "#3184c8", awayColor: "#d9bd45", status: "UPCOMING", markets: ["India", "Tie", "Australia"], odds: ["1.85", "15.00", "1.95"], trend: "steady" }
  ,{ id: 8, sport: "Cricket", league: "ODI · DEMO FIXTURE", time: "Tomorrow · 14:00", home: "England", away: "South Africa", homeCode: "ENG", awayCode: "RSA", homeColor: "#3976b9", awayColor: "#d6b66b", status: "UPCOMING", markets: ["England", "Tie", "S. Africa"], odds: ["2.05", "18.00", "1.78"], trend: "down" }
  ,{ id: 9, sport: "Tennis", league: "ATP · DEMO FIXTURE", time: "Today · 16:00", home: "Player A", away: "Player B", homeCode: "A", awayCode: "B", homeColor: "#b5c65b", awayColor: "#5a9bd8", status: "UPCOMING", markets: ["Player A", "Draw", "Player B"], odds: ["1.72", "—", "2.12"], trend: "up" }
  ,{ id: 10, sport: "Tennis", league: "WTA · DEMO FIXTURE", time: "Tomorrow · 17:30", home: "Player C", away: "Player D", homeCode: "C", awayCode: "D", homeColor: "#e87875", awayColor: "#8c74c8", status: "UPCOMING", markets: ["Player C", "Draw", "Player D"], odds: ["1.90", "—", "1.90"], trend: "steady" }
  ,{ id: 11, sport: "Rugby", league: "INTERNATIONAL · DEMO FIXTURE", time: "Tomorrow · 15:00", home: "Kenya", away: "Uganda", homeCode: "KEN", awayCode: "UGA", homeColor: "#d34d4d", awayColor: "#e6c34e", status: "UPCOMING", markets: ["Kenya", "Draw", "Uganda"], odds: ["1.95", "17.00", "1.85"], trend: "steady" }
];

const sports = ["For you", "Football", "Basketball", "Tennis", "Cricket"];

export default function Home() {
  const [sport, setSport] = useState("For you");
  const [activeTab, setActiveTab] = useState("Featured");
  const [slip, setSlip] = useState<{ match: Match; pick: number }[]>([]);
  const [stake, setStake] = useState("100");
  const [mobileSlip, setMobileSlip] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("sports");
  const [demoBalance, setDemoBalance] = useState(2500);
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [slotResult, setSlotResult] = useState<string[]>(["🍒", "⭐", "🍋"]);
  const [slotMessage, setSlotMessage] = useState("Spin the reels using virtual credits.");
  const [slotBusy, setSlotBusy] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profile, setProfile] = useState<{name:string;email:string}|null>(null);
  const [roulettePick,setRoulettePick]=useState("red");
  const [rouletteStake,setRouletteStake]=useState(50);
  const [rouletteResult,setRouletteResult]=useState("");
  const [wheelResult,setWheelResult]=useState("");
  const [blackjack,setBlackjack]=useState<{player:number[];dealer:number[];over:boolean;message:string}|null>(null);
  const [casinoBusy,setCasinoBusy]=useState(false);

  const potential = useMemo(() => {
    const total = slip.reduce((acc, item) => acc * Number(item.match.odds[item.pick]), 1);
    return slip.length ? (total * Math.max(0, Number(stake) || 0)).toFixed(2) : "0.00";
  }, [slip, stake]);

  function spinSlots() {
    const cost = 50;
    if (demoBalance < cost || slotBusy) { setSlotMessage("Not enough demo credits for another spin."); return; }
    setDemoBalance(value => value - cost);
    setSlotBusy(true);
    setSlotMessage("The reels are spinning…");
    window.setTimeout(() => {
      const symbols = ["🍒", "🍋", "⭐", "🔔", "💎", "7️⃣"];
      const result = Array.from({length: 3}, () => symbols[Math.floor(Math.random() * symbols.length)]);
      setSlotResult(result);
      if (result.every(x => x === result[0])) { setDemoBalance(value => value + 500); setSlotMessage("JACKPOT! +KSh 500 demo credits"); }
      else if (result[0] === result[1] || result[1] === result[2] || result[0] === result[2]) { setDemoBalance(value => value + 100); setSlotMessage("Nice match! +KSh 100 demo credits"); }
      else setSlotMessage("No match this time. Try another demo spin.");
      setSlotBusy(false);
    }, 650);
  }

  function togglePick(match: Match, pick: number) {
    setSlip(current => current.some(x => x.match.id === match.id && x.pick === pick)
      ? current.filter(x => x.match.id !== match.id)
      : [...current.filter(x => x.match.id !== match.id), { match, pick }]);
  }

  return (
    <main className="app-shell">
      <div className="demo-banner"><ShieldCheck size={13} /> DEMO EXPERIENCE <span>·</span> Virtual stakes only. No real-money betting.</div>
      <header className="topbar">
        <a className="brand" href="#" aria-label="FBets home"><span className="brand-mark">F</span><span>F<span className="brand-light">BETS</span></span><i>.</i></a>
        <nav className="main-nav">
          {["Home", "Live", "Sports", "Competitions", "Casino", "Promotions"].map(item => <button key={item} onClick={() => { if (item === "Home") setSport("For you"); setActiveSection(item.toLowerCase() === "home" ? "sports" : item.toLowerCase()); setMobileSlip(false); }} className={((item === "Home" || item === "Sports") ? activeSection === "sports" : activeSection === item.toLowerCase()) ? "nav-link selected" : "nav-link"}>{item}{item === "Live" && <b className="live-dot" />}</button>)}
        </nav>
        <div className="top-actions">
          <button className="icon-button search-trigger" aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}><Search size={18} /></button>
          <button className="icon-button" aria-label="Notifications" onClick={() => setNotificationsOpen(v => !v)}><Bell size={18} /></button>
          <button className="wallet-button"><Wallet size={16} /><span>Demo wallet</span><strong> KSh {demoBalance.toLocaleString("en-KE")}</strong></button>
          <button className="avatar" aria-label="Open profile" onClick={() => setAccountOpen(true)}>{profile?.name?.slice(0,1).toUpperCase() || "S"}</button>
          <button className="mobile-menu" aria-label="Menu" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(v => !v)}><Menu /></button>
        </div>
      </header>

      {searchOpen && <div className="search-panel"><Search size={17} /><input autoFocus placeholder="Search teams, leagues and matches…" /><button onClick={() => setSearchOpen(false)}><X size={17}/></button></div>}
      {mobileMenuOpen && <><button className="mobile-menu-scrim" aria-label="Close navigation menu" onClick={() => setMobileMenuOpen(false)} /><div className="mobile-nav-panel"><div className="drawer-head"><strong>Explore FBets</strong><button aria-label="Close menu" onClick={() => setMobileMenuOpen(false)}><X/></button></div>{["Home","Live","Sports","Competitions","Casino","Promotions"].map(item=><button key={item} onClick={()=>{if(item==="Home")setSport("For you");setActiveSection(item.toLowerCase()==="home"?"sports":item.toLowerCase());setMobileMenuOpen(false);setMobileSlip(false);}}>{item}<ArrowRight size={15}/></button>)}<button onClick={()=>{setNotificationsOpen(true);setMobileMenuOpen(false);}}>Notifications <Bell size={15}/></button><button className="mobile-account-link" onClick={()=>{setAccountOpen(true);setMobileMenuOpen(false);}}>My account <UserRound size={15}/></button></div></>}
      {notificationsOpen && <div className="notification-panel"><div className="drawer-head"><strong>Notifications</strong><button aria-label="Close notifications" onClick={()=>setNotificationsOpen(false)}><X/></button></div><div className="notification-item"><Bell size={16}/><div><strong>Welcome to FBets</strong><p>Your demo experience is ready. Explore sports, competitions and the arcade.</p><small>Just now</small></div></div><div className="notification-item"><ShieldCheck size={16}/><div><strong>Demo mode is active</strong><p>All balances, fixtures and odds are illustrative only.</p><small>Account notice</small></div></div></div>}
      {accountOpen && <div className="game-modal-backdrop" onClick={()=>setAccountOpen(false)}><div className="game-modal account-modal" onClick={e=>e.stopPropagation()}><div className="drawer-head"><div><span className="eyebrow">FBETS ACCOUNT</span><h2>{profile ? "Your profile" : "Create your account"}</h2></div><button aria-label="Close account" onClick={()=>setAccountOpen(false)}><X/></button></div>{profile ? <div className="account-profile"><div className="profile-avatar">{profile.name.slice(0,1).toUpperCase()}</div><strong>{profile.name}</strong><span>{profile.email}</span><p>Demo profile for this browser session. Secure account registration is not connected yet.</p><button className="place-button" onClick={()=>setProfile(null)}>Sign out of demo profile</button></div> : <form className="account-form" onSubmit={e=>{e.preventDefault();const fd=new FormData(e.currentTarget);const name=String(fd.get("name")||"").trim();const email=String(fd.get("email")||"").trim();if(name&&email)setProfile({name,email});}}><label>Full name<input name="name" required minLength={2} placeholder="Your name"/></label><label>Email address<input name="email" type="email" required placeholder="you@example.com"/></label><label>Password<input name="password" type="password" minLength={8} required placeholder="At least 8 characters"/></label><button className="place-button" type="submit">Create demo profile <ArrowRight size={15}/></button><p className="slip-disclaimer">Demo profile only. Password is not saved or sent anywhere. Real authentication must be configured before launch.</p></form>}</div></div>}

      <div className="page-wrap">
        <aside className="sidebar">
          <div className="side-label">DISCOVER</div>
          <button onClick={() => { setSport("For you"); setActiveSection("sports"); }} className={activeSection === "sports" && sport === "For you" ? "side-item active" : "side-item"}><Sparkles size={17}/> For you</button>
          <button onClick={() => setActiveSection("casino")} className={activeSection === "casino" ? "side-item active" : "side-item"}><Dices size={17}/> Casino</button>
          <button onClick={() => setActiveSection("live")} className={activeSection === "live" ? "side-item active" : "side-item"}><Activity size={17}/> Live matches <span className="side-count">1</span></button>
          <button onClick={() => setActiveSection("competitions")} className={activeSection === "competitions" ? "side-item active" : "side-item"}><Trophy size={17}/> Competitions</button>
          <div className="side-divider" />
          <div className="side-label">SPORTS</div>
          {["Football", "Basketball", "Tennis", "Cricket", "Rugby"].map((s, i) => <button key={s} onClick={() => { setSport(s); setActiveSection("sports"); }} className={sport === s ? "side-item active" : "side-item"}><span className="sport-icon">{["⚽","🏀","🎾","🏏","🏉"][i]}</span>{s}</button>)}
          <div className="side-card"><div className="side-card-icon"><ShieldCheck size={18}/></div><strong>Play smart.</strong><p>Keep your experience balanced. Set limits and take breaks.</p><a href="#responsible">Responsible play <ArrowRight size={13}/></a></div>
          <div className="side-foot">FBETS v1.0 <span>·</span> DEMO</div>
        </aside>

        <section className="content">
          {activeSection === "casino" && <>
            <div className="casino-hero"><div><div className="eyebrow">FBETS DEMO ARCADE</div><h1>Step into the<br/><em>Casino Lounge.</em></h1><p className="welcome-copy">Explore arcade games with virtual credits only.</p><div className="casino-balance"><Wallet size={15}/><span>DEMO CREDITS</span><strong>KSh {demoBalance.toLocaleString("en-KE")}</strong></div></div><div className="casino-hero-art">🎰</div></div>
            <div className="section-heading"><div><div className="eyebrow">THE ARCADE</div><h2>Explore games</h2></div></div>
            <div className="casino-grid">
              <button className="casino-game" onClick={() => setActiveGame("Lucky Sevens")}><div className="game-art slots-art"><span>7️⃣</span><span>💎</span><span>🍒</span></div><div className="game-info"><div><strong>Lucky Sevens</strong><small>Playable slot demo</small></div><b>PLAY NOW</b></div></button>
              <button className="casino-game" onClick={() => setActiveGame("Roulette Lounge")}><div className="game-art roulette-art"><span>🎡</span></div><div className="game-info"><div><strong>Roulette Lounge</strong><small>Interactive roulette table</small></div><b>PLAY NOW</b></div></button>
              <button className="casino-game" onClick={() => setActiveGame("Blackjack 21")}><div className="game-art blackjack-art"><span>♠</span><span>♥</span><span>21</span></div><div className="game-info"><div><strong>Blackjack 21</strong><small>Interactive blackjack table</small></div><b>PLAY NOW</b></div></button>
              <button className="casino-game" onClick={() => setActiveGame("Treasure Wheel")}><div className="game-art wheel-art"><span>🎯</span></div><div className="game-info"><div><strong>Treasure Wheel</strong><small>Interactive prize wheel</small></div><b>PLAY NOW</b></div></button>
            </div>
            <div className="casino-note"><ShieldCheck size={18}/><div><strong>Demo arcade only</strong><p>Virtual credits have no cash value. No real-money play or prizes.</p></div></div>
          </>}
          {activeSection === "live" && <>
            <div className="section-heading"><div><div className="eyebrow"><span className="live-dot"/> LIVE CENTRE</div><h2>Live matches</h2><p className="welcome-copy">Illustrative demo data only. A real-time sports feed is not connected yet.</p></div></div>
            <div className="match-list">{matches.filter(m=>m.status==="LIVE").map(m=><article className="match-card" key={m.id}><div className="match-meta"><span>{m.league}</span><span className="match-live">{m.time}</span></div><div className="match-main"><div className="teams"><div className="team"><strong>{m.home}</strong></div><div className="team"><strong>{m.away}</strong></div></div><div className="score-block"><strong>{m.score}</strong><span>DEMO SCORE</span></div><div className="odds-grid">{m.odds.map((o,i)=><button className="odd" key={i} onClick={()=>togglePick(m,i)}><span>{m.markets[i]}</span><strong>{o}</strong></button>)}</div></div></article>)}</div>
            <div className="section-heading"><div><div className="eyebrow">UPCOMING</div><h2>More matches</h2></div></div>
            <div className="match-list">{matches.filter(m=>m.status==="UPCOMING").map(m=><article className="match-card" key={m.id}><div className="match-meta"><span>{m.league}</span><span className="match-time">{m.time}</span></div><div className="match-main"><div className="teams"><div className="team"><strong>{m.home}</strong></div><div className="team"><strong>{m.away}</strong></div></div><div className="score-block"><strong className="versus">VS</strong><span>UPCOMING</span></div><div className="odds-grid">{m.odds.map((o,i)=><button className="odd" key={i} disabled={o==="—"} onClick={()=>togglePick(m,i)}><span>{m.markets[i]}</span><strong>{o}</strong></button>)}</div></div></article>)}</div>
            <div className="casino-note"><Activity size={18}/><div><strong>Live feed not connected</strong><p>Connect a sports-data provider for real-time scores, clocks and live odds.</p></div></div>
          </>}
          {activeSection === "competitions" && <>
            <div className="section-heading"><div><div className="eyebrow">TOURNAMENT HUB</div><h2>Competitions</h2><p className="welcome-copy">Competitions represented in the demo fixtures.</p></div></div>
            <div className="match-list">{Array.from(new Map(matches.map(m=>[m.league,m])).values()).map(m=><button key={m.league} className="match-card competition-row" onClick={()=>{setSport(m.sport);setActiveSection("sports");}}><div className="match-meta"><span>{m.sport.toUpperCase()}</span><span>DEMO</span></div><div className="competition-title"><Trophy size={20}/><strong>{m.league}</strong><ArrowRight size={16}/></div></button>)}</div>
          </>}
          {activeSection === "promotions" && <>
            <div className="casino-hero"><div><div className="eyebrow">FBETS REWARDS</div><h1>Promotions &<br/><em>special offers.</em></h1><p className="welcome-copy">Featured campaigns for the FBets demo experience.</p></div><div className="casino-hero-art">🎁</div></div>
            <div className="section-heading"><div><div className="eyebrow">FEATURED</div><h2>Current promotions</h2></div></div>
            <div className="casino-grid"><article className="casino-game"><div className="game-art slots-art"><span>🎉</span><span>✨</span></div><div className="game-info"><div><strong>Welcome to FBets</strong><small>Explore the demo experience</small></div><b>DEMO</b></div></article><article className="casino-game"><div className="game-art roulette-art"><span>🏆</span></div><div className="game-info"><div><strong>Matchday spotlight</strong><small>Discover sample competitions</small></div><b>DEMO</b></div></article></div>
            <div className="casino-note"><ShieldCheck size={18}/><div><strong>No real-money promotions</strong><p>These are informational tiles only. No bonus or cash reward is offered.</p></div></div>
          </>}
          {activeSection === "sports" && <>
          <div className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-line"/> YOUR MATCHDAY STARTS HERE</div><h1>Every moment.<br/><em>Every possibility.</em></h1><p className="welcome-copy">The action is better when you're in the moment.</p></div><div className="hero-orbit"><div className="orbit-ring ring-one"/><div className="orbit-ring ring-two"/><div className="orbit-ball">⚽</div><span className="orbit-tag">MATCHDAY<br/><b>IS ON</b></span></div></div>

          <div className="sport-tabs" aria-label="Choose a sport">{sports.map(s => <button key={s} type="button" onClick={() => { setSport(s); setActiveSection("sports"); }} aria-pressed={sport === s} className={sport === s ? "sport-tab active" : "sport-tab"}>{s}</button>)}</div>

          <div className="section-heading"><div><div className="eyebrow"><span className="live-dot"/> THE ACTION</div><h2>{sport === "For you" ? (activeTab === "Featured" ? "Featured matches" : activeTab) : `${sport} matches`}</h2></div><button className="view-all">View all <ArrowRight size={15}/></button></div>
          <div className="match-filter">{["Featured", "Top leagues", "All matches"].map(t => <button key={t} onClick={() => setActiveTab(t)} className={activeTab === t ? "filter-active" : ""}>{t}</button>)}<span className="filter-spacer"/><span className="demo-odds"><span/> DEMO ODDS</span></div>

          <div className="match-list">
            {matches.filter(match => sport === "For you" || match.sport === sport).map(match => <article className="match-card" key={match.id}>
              <div className="match-meta"><span>{match.league}</span><span className={match.status === "LIVE" ? "match-live" : "match-time"}>{match.status === "LIVE" && <i/>}{match.time}</span></div>
              <div className="match-main">
                <div className="teams">
                  <div className="team"><span className="team-badge" style={{"--team":match.homeColor} as React.CSSProperties}>{match.homeCode.slice(0,1)}</span><strong>{match.home}</strong></div>
                  <div className="team"><span className="team-badge" style={{"--team":match.awayColor} as React.CSSProperties}>{match.awayCode.slice(0,1)}</span><strong>{match.away}</strong></div>
                </div>
                <div className="score-block">{match.score ? <><strong>{match.score}</strong><span>HALF TIME</span></> : <><strong className="versus">VS</strong><span>{match.time.split("·")[0].trim()}</span></>}</div>
                <div className="odds-grid">{match.odds.map((odd, i) => {
                  const chosen = slip.some(x => x.match.id === match.id && x.pick === i);
                  return <button key={i} disabled={odd === "—"} aria-label={odd === "—" ? `${match.markets[i]} not offered for this demo match` : `${match.markets[i]} odds ${odd}`} onClick={() => togglePick(match, i)} className={chosen ? "odd selected-odd" : "odd"}><span>{match.markets[i]}</span><strong>{odd}</strong>{chosen && <Check size={12}/>}</button>;
                })}</div>
              </div>
              <div className="match-bottom"><span><Activity size={13}/> Match insights</span><span>+ 18 markets <ArrowRight size={12}/></span></div>
            </article>)}
            {matches.filter(match => sport === "For you" || match.sport === sport).length === 0 && <div className="empty-slip"><strong>No {sport} demo fixtures yet</strong><p>Choose another sport to browse available demo match cards.</p></div>}
          </div>
          <div className="insight-strip"><div className="insight-icon"><Flame size={19}/></div><div><strong>Stay close to the action</strong><p>Explore match insights, form and head-to-head stats.</p></div><ArrowUpRight size={17}/></div>
          <footer id="responsible"><div className="footer-brand">FBETS<span>.</span></div><p>Entertainment-style sports demo. All fixtures and odds are illustrative.</p><div><ShieldCheck size={14}/> Play responsibly · Virtual stakes only</div></footer>
          </>}
        </section>

        {activeSection === "sports" && <aside className="slip-column">
          <div className="slip-card">
            <div className="slip-head"><div><Ticket size={18}/><strong>Bet slip</strong><span className="slip-count">{slip.length}</span></div><button onClick={() => setSlip([])} disabled={!slip.length}>Clear all</button></div>
            <div className="slip-tabs"><span className="slip-tab-active">Single / Combo</span><span>System</span></div>
            {slip.length === 0 ? <div className="empty-slip"><div className="empty-ticket"><Ticket size={24}/></div><strong>Your slip is waiting</strong><p>Tap any odds to add a selection and build your demo combo.</p><span className="empty-hint"><Plus size={13}/> SELECT AN OUTCOME</span></div> : <div className="slip-selections">{slip.map(({match,pick}) => <div className="selection" key={match.id}><div><strong>{match.home} vs {match.away}</strong><span>{match.markets[pick]} · Match result</span></div><b>{match.odds[pick]}</b><button aria-label="Remove selection" onClick={() => setSlip(s => s.filter(x => x.match.id !== match.id))}><X size={14}/></button></div>)}</div>}
            <div className="slip-summary"><div className="summary-row"><span>Selections</span><strong>{slip.length}</strong></div><div className="summary-row"><span>Combined odds</span><strong>{slip.reduce((a,x)=>a*Number(x.match.odds[x.pick]),1).toFixed(2)}</strong></div><label htmlFor="stake">Virtual stake <span>KSh</span></label><div className="stake-input"><span>KSh</span><input id="stake" inputMode="decimal" value={stake} onChange={e => setStake(e.target.value.replace(/[^0-9.]/g,""))}/><button onClick={() => setStake(String(Math.max(0, Number(stake)||0)/2))}><Minus size={13}/></button><button onClick={() => setStake(String((Number(stake)||0)+100))}><Plus size={13}/></button></div><div className="return-row"><span>Potential return</span><strong>KSh {Number(potential).toLocaleString("en-KE")}</strong></div><button className="place-button" disabled={!slip.length || Number(stake)<=0} onClick={() => alert("Demo only: no bet has been placed and no money is involved.")}>Review demo slip <ArrowRight size={16}/></button><p className="slip-disclaimer">Demo simulation only. No bet is placed and no money is taken.</p></div>
          </div>
          <div className="quick-note"><CircleHelp size={16}/><span>How does the demo work?</span><ChevronDown size={15}/></div>
          <div className="mini-promo"><div className="promo-spark"><Sparkles size={17}/></div><span>THE FBETS EXPERIENCE</span><strong>Made for the<br/><em>love of the game.</em></strong><div className="promo-lines"/></div>
        </aside>}
      </div>
      {activeGame && <div className="game-modal-backdrop game-fullscreen-backdrop" onClick={() => setActiveGame(null)}><section className="game-modal game-fullscreen" role="dialog" aria-modal="true" aria-label={activeGame} onClick={e => e.stopPropagation()}><header className="fullscreen-game-header"><a className="brand" href="#" onClick={e=>e.preventDefault()}><span className="brand-mark">F</span><span>F<span className="brand-light">BETS</span></span><i>.</i></a><div className="fullscreen-game-title"><span className="eyebrow">FBETS DEMO ARCADE</span><h2>{activeGame}</h2></div><div className="fullscreen-game-actions"><div className="fullscreen-credit"><Wallet size={16}/><span>KSh {demoBalance.toLocaleString("en-KE")}</span></div><button className="fullscreen-exit" onClick={() => setActiveGame(null)} aria-label="Exit game"><X size={21}/><span>EXIT</span></button></div></header><div className="fullscreen-game-content">{activeGame === "Lucky Sevens" && <><div className="fullscreen-game-intro"><span className="eyebrow">3D SLOT MACHINE</span><h3>Lucky <em>Sevens</em></h3><p>Match symbols to win demo credits.</p></div><div className="slot-machine-stage three-d-stage"><div className="slot-machine-top">LUCKY SEVENS ★ ★ ★</div><div className={slotBusy?"slot-reels fullscreen-reels reels-spinning":"slot-reels fullscreen-reels"}>{slotResult.map((symbol,i)=><span key={i}>{symbol}</span>)}</div><p className="slot-message">{slotMessage}</p><button className="place-button fullscreen-spin" disabled={slotBusy||demoBalance<50} onClick={spinSlots}>{slotBusy?"SPINNING…":"SPIN · 50 CREDITS"}</button></div></>}{activeGame === "Roulette Lounge" && <><div className="fullscreen-game-intro"><span className="eyebrow">3D ROULETTE TABLE</span><h3>Roulette <em>Lounge</em></h3><p>Choose a colour and chip value, then spin the wheel.</p></div><div className="roulette-table-3d"><div className={casinoBusy?"roulette-wheel-3d wheel-turning":"roulette-wheel-3d"}><div className="roulette-wheel-inner"><span>0</span><span>17</span><span>8</span><span>26</span><span>3</span><span>11</span><span>22</span><span>5</span></div><div className="roulette-hub">FB</div></div></div><div className="casino-controls"><div className="casino-choice-row">{["red","black","green"].map(c=><button key={c} className={roulettePick===c?"casino-choice selected "+c:"casino-choice "+c} onClick={()=>setRoulettePick(c)}>{c.toUpperCase()}</button>)}</div><div className="chip-selector" aria-label="Choose virtual chip value">{[25,50,100,250].map(v=><button key={v} className={rouletteStake===v?"chip selected-chip":"chip"} onClick={()=>setRouletteStake(v)}>{v}</button>)}</div><p className="roulette-result">{rouletteResult||"PLACE YOUR BET"}</p><button className="place-button casino-action" disabled={casinoBusy||demoBalance<rouletteStake} onClick={()=>{setDemoBalance(v=>v-rouletteStake);setCasinoBusy(true);setRouletteResult("");window.setTimeout(()=>{const n=Math.floor(Math.random()*37),color=n===0?"green":n%2===0?"black":"red";setRouletteResult("Result "+n+" · "+color.toUpperCase()+(color===roulettePick?" — YOU WIN!":" — NO WIN"));if(color===roulettePick)setDemoBalance(v=>v+(color==="green"?rouletteStake*18:rouletteStake*2));setCasinoBusy(false);},1600);}}>{casinoBusy?"WHEEL SPINNING…":"SPIN ROULETTE · "+rouletteStake+" CREDITS"}</button></div></>}{activeGame === "Blackjack 21" && <><div className="fullscreen-game-intro"><span className="eyebrow">3D BLACKJACK TABLE</span><h3>Blackjack <em>21</em></h3><p>Beat the dealer. A round costs 50 demo credits.</p></div><div className="blackjack-table-3d"><div className="blackjack-hand"><small>DEALER · {blackjack?(blackjack.over?blackjackTotal(blackjack.dealer):"?"):"—"}</small><div className="playing-cards">{(blackjack?(blackjack.over?blackjack.dealer:[blackjack.dealer[0]]):[]).map((c,i)=><div className="playing-card" key={i}>{c===1?"A":c>10?({11:"J",12:"Q",13:"K"} as Record<number,string>)[c]:c}</div>)}</div></div><div className="blackjack-table-label">BLACKJACK 21</div><div className="blackjack-hand"><small>YOUR HAND · {blackjack?blackjackTotal(blackjack.player):"—"}</small><div className="playing-cards">{(blackjack?.player||[]).map((c,i)=><div className="playing-card" key={i}>{c===1?"A":c>10?({11:"J",12:"Q",13:"K"} as Record<number,string>)[c]:c}</div>)}</div></div></div><p className="slot-message">{blackjack?.message||"Start a round to play."}</p><div className="casino-controls blackjack-controls"><button className="place-button" disabled={!blackjack||blackjack.over} onClick={()=>{if(!blackjack||blackjack.over)return;const player=[...blackjack.player,Math.ceil(Math.random()*13)],total=blackjackTotal(player);setBlackjack({...blackjack,player,over:total>21,message:total>21?"Bust! Dealer wins.":"Card drawn — hit or stand."});}}>HIT</button><button className="place-button" disabled={!blackjack||blackjack.over} onClick={()=>{if(!blackjack||blackjack.over)return;const dealer=[...blackjack.dealer];while(blackjackTotal(dealer)<17)dealer.push(Math.ceil(Math.random()*13));const p=blackjackTotal(blackjack.player),d=blackjackTotal(dealer);if(d>21||p>d)setDemoBalance(v=>v+100);else if(p===d)setDemoBalance(v=>v+50);setBlackjack({...blackjack,dealer,over:true,message:d>21||p>d?"You win 100 demo credits!":p===d?"Push — credits returned.":"Dealer wins."});}}>STAND</button><button className="place-button secondary-game-action" disabled={!!blackjack&&!blackjack.over||demoBalance<50} onClick={()=>{setDemoBalance(v=>v-50);setBlackjack({player:[Math.ceil(Math.random()*11),Math.ceil(Math.random()*11)],dealer:[Math.ceil(Math.random()*11),Math.ceil(Math.random()*11)],over:false,message:"Your turn — hit or stand."});}}>NEW ROUND · 50 CREDITS</button></div></>}{activeGame === "Treasure Wheel" && <><div className="fullscreen-game-intro"><span className="eyebrow">3D PRIZE WHEEL</span><h3>Treasure <em>Wheel</em></h3><p>Spin for a chance to win demo credits.</p></div><div className="treasure-wheel-stage"><div className="wheel-pointer">▼</div><div className={casinoBusy?"treasure-wheel-3d wheel-turning":"treasure-wheel-3d"}><div className="wheel-face"><span>TRY AGAIN</span><span>50</span><span>100</span><span>200</span><span>JACKPOT</span><span>25</span></div><div className="treasure-hub">FB</div></div></div><p className="roulette-result">{wheelResult||"YOUR PRIZE AWAITS"}</p><button className="place-button casino-action" disabled={casinoBusy||demoBalance<50} onClick={()=>{setDemoBalance(v=>v-50);setCasinoBusy(true);setWheelResult("");window.setTimeout(()=>{const prizes=[["TRY AGAIN",0],["50 CREDITS",50],["100 CREDITS",100],["200 CREDITS",200],["JACKPOT",500],["25 CREDITS",25]] as [string,number][],prize=prizes[Math.floor(Math.random()*prizes.length)];setWheelResult(prize[0]+" · +"+prize[1]+" CREDITS");if(prize[1])setDemoBalance(v=>v+prize[1]);setCasinoBusy(false);},1800);}}>{casinoBusy?"WHEEL SPINNING…":"SPIN WHEEL · 50 CREDITS"}</button></>}<div className="fullscreen-demo-note"><ShieldCheck size={15}/> Demo arcade only · Virtual credits have no cash value</div></div></section></div>}
      <button className="mobile-slip" onClick={() => setMobileSlip(!mobileSlip)}><Ticket size={17}/> Bet slip <b>{slip.length}</b><span>Open <ArrowUpRight size={14}/></span></button>
      {mobileSlip && <div className="mobile-slip-drawer"><div className="drawer-head"><strong>Bet slip · {slip.length}</strong><button onClick={() => setMobileSlip(false)}><X/></button></div><p>Selections are stored locally for this demo. Use the slip panel on desktop to review the potential return.</p>{slip.map(x=><div className="drawer-pick" key={x.match.id}>{x.match.home} vs {x.match.away} — {x.match.markets[x.pick]} <b>{x.match.odds[x.pick]}</b></div>)}</div>}
    </main>
  );
}
