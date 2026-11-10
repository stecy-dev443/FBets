"use client";

import { useMemo, useState } from "react";
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, Check,
  ChevronDown, CircleHelp, Clock3, Flame, Menu, Minus, Plus, Search,
  ShieldCheck, Sparkles, Ticket, Trophy, Wallet, X
} from "lucide-react";

type Match = {
  id: number; league: string; time: string; home: string; away: string;
  homeCode: string; awayCode: string; homeColor: string; awayColor: string;
  score?: string; status: "LIVE" | "UPCOMING"; markets: [string, string, string];
  odds: [string, string, string]; trend: "up" | "down" | "steady";
};

const matches: Match[] = [
  { id: 1, league: "ENGLISH PREMIER LEAGUE", time: "LIVE · 64′", home: "Arsenal", away: "Chelsea", homeCode: "ARS", awayCode: "CHE", homeColor: "#e84b43", awayColor: "#2867b2", score: "2 : 1", status: "LIVE", markets: ["Arsenal", "Draw", "Chelsea"], odds: ["1.74", "3.65", "4.80"], trend: "up" },
  { id: 2, league: "UEFA CHAMPIONS LEAGUE", time: "Today · 20:00", home: "Real Madrid", away: "Bayern Munich", homeCode: "RMA", awayCode: "FCB", homeColor: "#e6e5df", awayColor: "#d94a43", status: "UPCOMING", markets: ["Real Madrid", "Draw", "Bayern"], odds: ["2.15", "3.40", "3.05"], trend: "steady" },
  { id: 3, league: "ENGLISH PREMIER LEAGUE", time: "Today · 21:00", home: "Liverpool", away: "Man City", homeCode: "LIV", awayCode: "MCI", homeColor: "#d73d42", awayColor: "#5a9bd8", status: "UPCOMING", markets: ["Liverpool", "Draw", "Man City"], odds: ["2.65", "3.50", "2.48"], trend: "down" },
  { id: 4, league: "LA LIGA", time: "Tomorrow · 18:30", home: "Barcelona", away: "Atletico Madrid", homeCode: "BAR", awayCode: "ATM", homeColor: "#3976b9", awayColor: "#d34d4d", status: "UPCOMING", markets: ["Barcelona", "Draw", "Atletico"], odds: ["1.92", "3.55", "3.90"], trend: "up" }
];

const sports = ["For you", "Football", "Basketball", "Tennis", "Cricket"];

export default function Home() {
  const [sport, setSport] = useState("For you");
  const [activeTab, setActiveTab] = useState("Featured");
  const [slip, setSlip] = useState<{ match: Match; pick: number }[]>([]);
  const [stake, setStake] = useState("100");
  const [mobileSlip, setMobileSlip] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const potential = useMemo(() => {
    const total = slip.reduce((acc, item) => acc * Number(item.match.odds[item.pick]), 1);
    return slip.length ? (total * Math.max(0, Number(stake) || 0)).toFixed(2) : "0.00";
  }, [slip, stake]);

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
          {["Home", "Live", "Sports", "Promotions"].map((item, i) => <button key={item} className={i === 0 ? "nav-link selected" : "nav-link"}>{item}{item === "Live" && <b className="live-dot" />}</button>)}
        </nav>
        <div className="top-actions">
          <button className="icon-button search-trigger" aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}><Search size={18} /></button>
          <button className="icon-button" aria-label="Notifications"><Bell size={18} /></button>
          <button className="wallet-button"><Wallet size={16} /><span>Demo wallet</span><strong> KSh 2,500</strong></button>
          <button className="avatar">S</button>
          <button className="mobile-menu" aria-label="Menu"><Menu /></button>
        </div>
      </header>

      {searchOpen && <div className="search-panel"><Search size={17} /><input autoFocus placeholder="Search teams, leagues and matches…" /><button onClick={() => setSearchOpen(false)}><X size={17}/></button></div>}

      <div className="page-wrap">
        <aside className="sidebar">
          <div className="side-label">DISCOVER</div>
          <button className="side-item active"><Sparkles size={17}/> For you</button>
          <button className="side-item"><Activity size={17}/> Live matches <span className="side-count">12</span></button>
          <button className="side-item"><Trophy size={17}/> Competitions</button>
          <div className="side-divider" />
          <div className="side-label">SPORTS</div>
          {["Football", "Basketball", "Tennis", "Cricket", "Rugby"].map((s, i) => <button key={s} className="side-item"><span className="sport-icon">{["⚽","🏀","🎾","🏏","🏉"][i]}</span>{s}</button>)}
          <div className="side-card"><div className="side-card-icon"><ShieldCheck size={18}/></div><strong>Play smart.</strong><p>Keep your experience balanced. Set limits and take breaks.</p><a href="#responsible">Responsible play <ArrowRight size={13}/></a></div>
          <div className="side-foot">FBETS v1.0 <span>·</span> DEMO</div>
        </aside>

        <section className="content">
          <div className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-line"/> YOUR MATCHDAY STARTS HERE</div><h1>Every moment.<br/><em>Every possibility.</em></h1><p className="welcome-copy">The action is better when you're in the moment.</p></div><div className="hero-orbit"><div className="orbit-ring ring-one"/><div className="orbit-ring ring-two"/><div className="orbit-ball">⚽</div><span className="orbit-tag">MATCHDAY<br/><b>IS ON</b></span></div></div>

          <div className="sport-tabs">{sports.map(s => <button key={s} onClick={() => setSport(s)} className={sport === s ? "sport-tab active" : "sport-tab"}>{s}</button>)}</div>

          <div className="section-heading"><div><div className="eyebrow"><span className="live-dot"/> THE ACTION</div><h2>{activeTab === "Featured" ? "Featured matches" : activeTab}</h2></div><button className="view-all">View all <ArrowRight size={15}/></button></div>
          <div className="match-filter">{["Featured", "Top leagues", "All matches"].map(t => <button key={t} onClick={() => setActiveTab(t)} className={activeTab === t ? "filter-active" : ""}>{t}</button>)}<span className="filter-spacer"/><span className="demo-odds"><span/> DEMO ODDS</span></div>

          <div className="match-list">
            {matches.map(match => <article className="match-card" key={match.id}>
              <div className="match-meta"><span>{match.league}</span><span className={match.status === "LIVE" ? "match-live" : "match-time"}>{match.status === "LIVE" && <i/>}{match.time}</span></div>
              <div className="match-main">
                <div className="teams">
                  <div className="team"><span className="team-badge" style={{"--team":match.homeColor} as React.CSSProperties}>{match.homeCode.slice(0,1)}</span><strong>{match.home}</strong></div>
                  <div className="team"><span className="team-badge" style={{"--team":match.awayColor} as React.CSSProperties}>{match.awayCode.slice(0,1)}</span><strong>{match.away}</strong></div>
                </div>
                <div className="score-block">{match.score ? <><strong>{match.score}</strong><span>HALF TIME</span></> : <><strong className="versus">VS</strong><span>{match.time.split("·")[0].trim()}</span></>}</div>
                <div className="odds-grid">{match.odds.map((odd, i) => {
                  const chosen = slip.some(x => x.match.id === match.id && x.pick === i);
                  return <button key={i} onClick={() => togglePick(match, i)} className={chosen ? "odd selected-odd" : "odd"}><span>{match.markets[i]}</span><strong>{odd}</strong>{chosen && <Check size={12}/>}</button>;
                })}</div>
              </div>
              <div className="match-bottom"><span><Activity size={13}/> Match insights</span><span>+ 18 markets <ArrowRight size={12}/></span></div>
            </article>)}
          </div>
          <div className="insight-strip"><div className="insight-icon"><Flame size={19}/></div><div><strong>Stay close to the action</strong><p>Explore match insights, form and head-to-head stats.</p></div><ArrowUpRight size={17}/></div>
          <footer id="responsible"><div className="footer-brand">FBETS<span>.</span></div><p>Entertainment-style sports demo. All fixtures and odds are illustrative.</p><div><ShieldCheck size={14}/> Play responsibly · Virtual stakes only</div></footer>
        </section>

        <aside className="slip-column">
          <div className="slip-card">
            <div className="slip-head"><div><Ticket size={18}/><strong>Bet slip</strong><span className="slip-count">{slip.length}</span></div><button onClick={() => setSlip([])} disabled={!slip.length}>Clear all</button></div>
            <div className="slip-tabs"><span className="slip-tab-active">Single / Combo</span><span>System</span></div>
            {slip.length === 0 ? <div className="empty-slip"><div className="empty-ticket"><Ticket size={24}/></div><strong>Your slip is waiting</strong><p>Tap any odds to add a selection and build your demo combo.</p><span className="empty-hint"><Plus size={13}/> SELECT AN OUTCOME</span></div> : <div className="slip-selections">{slip.map(({match,pick}) => <div className="selection" key={match.id}><div><strong>{match.home} vs {match.away}</strong><span>{match.markets[pick]} · Match result</span></div><b>{match.odds[pick]}</b><button aria-label="Remove selection" onClick={() => setSlip(s => s.filter(x => x.match.id !== match.id))}><X size={14}/></button></div>)}</div>}
            <div className="slip-summary"><div className="summary-row"><span>Selections</span><strong>{slip.length}</strong></div><div className="summary-row"><span>Combined odds</span><strong>{slip.reduce((a,x)=>a*Number(x.match.odds[x.pick]),1).toFixed(2)}</strong></div><label htmlFor="stake">Virtual stake <span>KSh</span></label><div className="stake-input"><span>KSh</span><input id="stake" inputMode="decimal" value={stake} onChange={e => setStake(e.target.value.replace(/[^0-9.]/g,""))}/><button onClick={() => setStake(String(Math.max(0, Number(stake)||0)/2))}><Minus size={13}/></button><button onClick={() => setStake(String((Number(stake)||0)+100))}><Plus size={13}/></button></div><div className="return-row"><span>Potential return</span><strong>KSh {Number(potential).toLocaleString("en-KE")}</strong></div><button className="place-button" disabled={!slip.length || Number(stake)<=0} onClick={() => alert("Demo only: no bet has been placed and no money is involved.")}>Review demo slip <ArrowRight size={16}/></button><p className="slip-disclaimer">Demo simulation only. No bet is placed and no money is taken.</p></div>
          </div>
          <div className="quick-note"><CircleHelp size={16}/><span>How does the demo work?</span><ChevronDown size={15}/></div>
          <div className="mini-promo"><div className="promo-spark"><Sparkles size={17}/></div><span>THE FBETS EXPERIENCE</span><strong>Made for the<br/><em>love of the game.</em></strong><div className="promo-lines"/></div>
        </aside>
      </div>
      <button className="mobile-slip" onClick={() => setMobileSlip(!mobileSlip)}><Ticket size={17}/> Bet slip <b>{slip.length}</b><span>Open <ArrowUpRight size={14}/></span></button>
      {mobileSlip && <div className="mobile-slip-drawer"><div className="drawer-head"><strong>Bet slip · {slip.length}</strong><button onClick={() => setMobileSlip(false)}><X/></button></div><p>Selections are stored locally for this demo. Use the slip panel on desktop to review the potential return.</p>{slip.map(x=><div className="drawer-pick" key={x.match.id}>{x.match.home} vs {x.match.away} — {x.match.markets[x.pick]} <b>{x.match.odds[x.pick]}</b></div>)}</div>}
    </main>
  );
}
