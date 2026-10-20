import type { ReactNode } from "react";
import type { Project } from "@/content/projects";
import "./project-artwork.css";

type ProjectArtworkProps = {
  project: Pick<Project, "id" | "title">;
  variant?: "cover" | "detail";
  className?: string;
  accessible?: boolean;
};

const captions: Record<string, string> = {
  "01": "LANGUAGE → INFORMATION", "02": "SOURCE → EXECUTION", "03": "COMPLEXITY → CLASSIFICATION",
  "04": "TEST DATA → INSIGHT", "05": "WORKFLOW → OPPORTUNITY", "06": "A LITTLE MORE CERTAINTY", "07": "PATTERNS → POSSIBILITIES",
};

function SearchNetwork() {
  const nodes = [[110, 154], [186, 96], [196, 244], [280, 180], [336, 93], [377, 273], [448, 154], [511, 249], [282, 327]];
  return <svg className="project-illustration" viewBox="0 0 640 450" fill="none">
    <path d="m110 154 76-58 94 84 56-87 112 61-71 119-97-93-84 64-86-90Zm86 90 86 83 95-54 134-24-63-95M186 96l10 148M336 93l41 180M282 327l-2-147" stroke="#a7a49a" strokeWidth="1.2" opacity=".55" />
    <path d="m110 154 170 26 168-26M280 180l97 93" stroke="#ffaa36" strokeWidth="2.5" />
    {nodes.map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r={i === 3 ? 39 : i === 6 ? 26 : 10} fill={i === 3 ? "#ffaa36" : "#252522"} stroke={i === 3 ? "#ffd69b" : "#77776c"} strokeWidth="1.2" /><circle cx={x} cy={y} r={i === 3 ? 8 : 3} fill={i === 3 ? "#171717" : "#e1e0d7"} /></g>)}
    <circle cx="280" cy="180" r="55" stroke="#ffaa36" strokeOpacity=".2" />
    <g transform="translate(356 311)"><rect width="198" height="57" rx="4" fill="#f0eee5" /><circle cx="25" cy="27" r="7" stroke="#262623" strokeWidth="1.5" /><path d="m30 33 5 5" stroke="#262623" strokeWidth="1.5" /><text x="48" y="32" fill="#262623" fontSize="13">find the connection_</text><path d="M16 45h165" stroke="#cfcec4" /></g>
    <text x="99" y="390" fill="#9d9c92" fontSize="10" letterSpacing="2">LEX / INDEX / RETRIEVE</text>
  </svg>;
}

function FigTerminal() {
  return <div className="project-fig-window">
    <div className="project-fig-bar"><span><i /><i /><i /></span><span>main.fg</span><span>FIG / RUST</span></div>
    <div className="project-fig-source"><span className="project-code-line"><i>01</i><em># an idea, made executable</em></span><span className="project-code-line"><i>02</i><b>fn</b> add(a, b) {"{"}</span><span className="project-code-line"><i>03</i>  <b>return</b> a + b;</span><span className="project-code-line"><i>04</i>{"}"}</span><span className="project-code-line"><i>05</i> </span><span className="project-code-line"><i>06</i><strong>print</strong>(add(<u>3</u>, <u>4</u>));</span></div>
    <div className="project-fig-terminal"><span>~ <b>fig run main.fg</b></span><span className="project-fig-result">7<span>▌</span></span></div>
    <div className="project-fig-pipeline"><span>LEXER</span><span>→</span><span>PARSER</span><span>→</span><span>EVALUATOR</span></div>
  </div>;
}

function FreightClassification() {
  return <svg className="project-illustration" viewBox="0 0 640 450" fill="none">
    <path d="m93 303 226 113 245-127-226-113Z" stroke="#77766c" strokeDasharray="4 7" />
    <g transform="translate(100 188)"><path d="m0 52 142-70 119 59-141 71Z" fill="#efede4" /><path d="m0 52 120 60v82L0 134Z" fill="#b4b3a6" /><path d="m120 112 141-71v83l-141 70Z" fill="#66665c" />{[18,38,58,78,98].map(x => <path key={x} d={`M${x} ${62+x/2}v58`} stroke="#86877a" strokeWidth="3" />)}{[139,159,179,199,219,239].map(x => <path key={x} d={`M${x} ${180-(x-120)/2}v-58`} stroke="#858577" strokeWidth="3" />)}</g>
    <g transform="translate(240 161)"><path d="m0 0 120-61 112 56-120 60Z" fill="#ffbf65" /><path d="m0 0 112 55v81L0 81Z" fill="#ffaa36" /><path d="m112 55 120-60v81l-120 60Z" fill="#b86e1b" />{[16,36,56,76,96].map(x => <path key={x} d={`M${x} ${10+x/2}v56`} stroke="#c68027" strokeWidth="3" />)}<text x="26" y="64" fill="#402c14" fontSize="17" transform="skewY(26)">HTS</text></g>
    <g transform="translate(404 61)"><rect width="135" height="155" rx="3" fill="#f1eee4" stroke="#d5d1c4" /><path d="M17 27h59M17 40h92" stroke="#77786a" strokeWidth="2" /><path d="M40 68v28h-15m15-12h57v25m-57-13v26" stroke="#8e9080" /><rect x="25" y="60" width="30" height="12" fill="#d6d8ca" /><rect x="11" y="97" width="28" height="12" fill="#d6d8ca" /><rect x="82" y="108" width="28" height="12" fill="#ffaa36" /><rect x="27" y="124" width="28" height="12" fill="#d6d8ca" /><circle cx="113" cy="23" r="5" fill="#ffaa36" /></g>
    <path d="M474 238v52h-44" stroke="#ffaa36" strokeWidth="1.5" /><circle cx="430" cy="290" r="4" fill="#ffaa36" />
  </svg>;
}

function BatteryAnalytics() {
  return <svg className="project-illustration" viewBox="0 0 640 450" fill="none">
    <path d="M90 351h463M108 84v267" stroke="#657080" strokeWidth=".7" /><path d="M108 149h420M108 216h420M108 284h420" stroke="#586477" strokeWidth=".6" strokeDasharray="3 7" />
    <g transform="translate(141 147) rotate(-12 117 98)">{[0, 73, 146].map((x, i) => <g key={x} transform={`translate(${x} ${-i*19})`}><rect x="19" y="-11" width="27" height="15" rx="3" fill="#cbd0ca" /><rect width="65" height="193" rx="15" fill={i === 1 ? "#e1e4d9" : "#8b9796"} /><rect x="9" y="10" width="7" height="166" rx="3" fill="#fff" opacity=".18" /><rect x="23" y="48" width="20" height="106" rx="2" fill={i === 1 ? "#ffaa36" : "#364b47"} /><path d="m36 80-10 27h11l-8 25 16-32H33Z" fill={i === 1 ? "#574223" : "#a2b8a7"} /></g>)}</g>
    <g transform="translate(368 180)"><rect width="192" height="153" rx="5" fill="#242e38" stroke="#718391" strokeOpacity=".6" /><text x="17" y="26" fill="#c3cfce" fontSize="10" letterSpacing="1.4">BATTERY ANALYSIS</text><path d="M17 53h158M17 84h158M17 115h158" stroke="#536575" strokeOpacity=".45" /><path d="m17 119 16-6 15 1 17-20 12 4 18-23 14 3 17-25 16 10 18-22 15 5" stroke="#ffaa36" strokeWidth="2.5" /><circle cx="175" cy="46" r="4" fill="#ffaa36" /><text x="17" y="140" fill="#8d9f9e" fontSize="9">ILLUSTRATIVE TEST SERIES</text></g>
    <text x="107" y="385" fill="#99a7ae" fontSize="10" letterSpacing="2">IMPORT / CALCULATE / ANALYZE</text>
  </svg>;
}

function WarehouseOperations() {
  return <svg className="project-illustration" viewBox="0 0 640 450" fill="none">
    <path d="m94 251 207-112 243 127-205 113Z" fill="#474b3f" stroke="#767e65" strokeWidth="1" />
    <path d="m137 273 164-89 200 105M190 301l165-89M243 329l164-89M296 357l164-90" stroke="#6d755e" strokeWidth=".7" />
    {[{x:151,y:151},{x:276,y:216}].map(({x,y},i)=><g key={i} transform={`translate(${x} ${y})`}><path d="M0 0v134m111-76v134M0 0l111 58M0 47l111 58M0 93l111 58M0 134l111 58" stroke="#d4d8c5" strokeWidth="5" /><path d="m2 45 65-35 111 58-65 35M2 91l65-35 111 58-65 35" fill="#949b7e" stroke="#c3c9ad" /><path d="M178 68V-20L67-78V10" stroke="#c3c9ad" strokeWidth="5" />{[0,1].map(n=><g key={n} transform={`translate(${20+n*49} ${21+n*25})`}><path d="m0 0 22-12 29 15-22 12Z" fill="#e4c9a4" /><path d="m0 0 29 15v26L0 26Z" fill="#bfa17e" /><path d="m29 15 22-12v26L29 41Z" fill="#967d5f" /></g>)}<path d="m34 71 28-15 36 19-28 15Z" fill="#ffbf65" /><path d="m34 71 36 19v26L34 97Z" fill="#ffaa36" /><path d="m70 90 28-15v26l-28 15Z" fill="#af6d1c" /></g>)}
    <path d="m147 302 45 24 50-27m152 47 42-23 42 22" stroke="#ffaa36" strokeWidth="3" strokeLinecap="round" /><path d="m230 297 12 2-3 11m227 32 12 3-4 11" stroke="#ffaa36" strokeWidth="3" />
  </svg>;
}

function MeetingPhone() {
  return <div className="project-stillon-scene"><div className="project-stillon-orbit" /><div className="project-stillon-note"><span>Less back-and-forth.</span><strong>More certainty.</strong><i>↗</i></div><div className="project-phone"><div className="project-phone-top"><span>9:41</span><span>••• ▰</span></div><div className="project-phone-island" /><div className="project-phone-content"><div className="project-phone-wordmark">Still On<span>●</span></div><p className="project-phone-intro">Good things happen<br />when we show up.</p><div className="project-phone-meeting"><span>UP NEXT / TODAY</span><h4>Let’s talk ideas.</h4><p>10:00 – 10:30 AM</p><div className="project-phone-avatars"><b>B</b><b>J</b><span>Both checked in</span></div><div className="project-phone-confirm">✓ &nbsp; We’re still on</div></div><div className="project-phone-schedule"><span>Need a different time?</span><b>Reschedule ↗</b></div></div><div className="project-phone-home" /></div><span className="project-stillon-caption">UI CONCEPT / NOT A LIVE INTERFACE</span></div>;
}

function TrafficNetwork() {
  return <svg className="project-illustration project-traffic" viewBox="0 0 640 450" fill="none">
    <path d="M264 59h112v139h166v104H376v106H264V302H98V198h166Z" fill="#62645c" />
    <path d="M274 59v149H98m444 0H366V59M98 292h176v116m92 0V292h176" stroke="#deded1" strokeWidth="2" />
    <path d="M319 59v116m0 152v81M98 250h143m158 0h143" stroke="#c1bb9e" strokeWidth="2" strokeDasharray="11 10" />
    {[0,1,2,3,4].map(i=><g key={i}><path d={`M${278+i*18} 181v10M${278+i*18} 309v10M247 ${209+i*18}h10M383 ${209+i*18}h10`} stroke="#f2efe2" strokeWidth="7" /></g>)}
    <path d="M294 88v143q0 42 43 42h158" stroke="#ffaa36" strokeWidth="3" /><path d="m482 266 14 7-14 7" stroke="#ffaa36" strokeWidth="2" />
    <rect x="294" y="119" width="14" height="27" rx="3" fill="#eceade" /><rect x="334" y="339" width="14" height="27" rx="3" fill="#b0b4aa" /><rect x="173" y="220" width="27" height="14" rx="3" fill="#aeb3a5" /><rect x="447" y="266" width="27" height="14" rx="3" fill="#ffbf65" />
    <g transform="translate(408 91)"><rect width="131" height="62" rx="3" fill="#272a24" stroke="#6c7461" /><text x="12" y="21" fill="#b9bfac" fontSize="9" letterSpacing="1.1">SIGNAL / TIMING</text><path d="M12 42h20V30h18v18h26V34h21v8h22" stroke="#ffaa36" strokeWidth="1.7" /></g>
    <circle cx="225" cy="166" r="7" fill="#ffaa36" /><circle cx="410" cy="325" r="7" fill="#8199a1" /><path d="M116 113h84m-84 8h48M426 371h94m-94 8h60" stroke="#6c7461" strokeWidth="2" />
  </svg>;
}

/** Original editorial illustrations. The UI, routes, and charts are concepts, never product screenshots or measured data. */
export function ProjectArtwork({ project, variant = "cover", className = "", accessible = false }: ProjectArtworkProps) {
  const illustrations: Record<string, ReactNode> = { "01": <SearchNetwork />, "02": <FigTerminal />, "03": <FreightClassification />, "04": <BatteryAnalytics />, "05": <WarehouseOperations />, "06": <MeetingPhone />, "07": <TrafficNetwork /> };
  return <div className={`project-artwork project-artwork-${variant} project-artwork-art${Number(project.id)} ${className}`} role={accessible ? "img" : undefined} aria-label={accessible ? `Concept illustration for ${project.title}; not a project screenshot or measured data` : undefined} aria-hidden={accessible ? undefined : true}>
    <div className="project-artwork-grid" />
    {illustrations[project.id]}
    <span className="project-artwork-marker">{project.id} / {project.id === "02" ? "FIG LANGUAGE" : "SELECTED WORK"}</span><span className="project-artwork-cross">+</span><span className="project-artwork-caption">{captions[project.id]}</span><span className="project-artwork-concept">CONCEPT ARTWORK</span>
  </div>;
}
