import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Bell, CalendarDays, Check, Clock3, FileText, ScanLine } from "lucide-react";
import hardware from "./hardware.json";

export const artPath = "/images/portfolio";
export const meeting = {
  name: "Design catch-up",
  time: "2:30 PM",
  proposedTime: "3:00 PM",
};
export const demoPhases = [
  { id: "reminder", label: "Reminder", description: `${meeting.name} starts at ${meeting.time}, in 15 minutes.` },
  { id: "check", label: "Check in", description: `After checking in, you can see who's confirmed for ${meeting.name}.` },
  { id: "reschedule", label: "New time", description: `Propose moving ${meeting.name} from ${meeting.time} to ${meeting.proposedTime}.` },
] as const;

type Hardware = keyof typeof hardware;

export function Device({ kind, children, eager = false }: { kind: Hardware; children: ReactNode; eager?: boolean }) {
  const { width, height, topLeft, topRight, bottomLeft } = hardware[kind];
  const screenWidth = topRight[0] - topLeft[0];
  const screenHeight = bottomLeft[1] - topLeft[1];
  const transform = `matrix(1, ${(topRight[1] - topLeft[1]) / screenWidth}, ${(bottomLeft[0] - topLeft[0]) / screenHeight}, 1, 0, 0)`;
  const placement: CSSProperties = {
    width: `${100 * screenWidth / width}%`,
    height: `${100 * screenHeight / height}%`,
    left: `${100 * topLeft[0] / width}%`,
    top: `${100 * topLeft[1] / height}%`,
    transform,
  };

  return (
    <div className={`device device--${kind}`} style={{ aspectRatio: `${width} / ${height}` }} aria-hidden="true">
      <Image className="device-shell" src={`${artPath}/${kind}.webp`} alt="" width={width} height={height} unoptimized loading={eager ? "eager" : "lazy"} />
      <div className="device-screen" style={placement}>{children}</div>
    </div>
  );
}

export function TariffDisplay() {
  return (
    <div className="tariff-display">
      <div className="tariff-display-bar">
        <div><ScanLine aria-hidden="true" /> <b>Tariff Ninja</b></div>
        <span>Classification</span>
      </div>
      <div className="tariff-display-body">
        <p className="screen-kicker">Product details</p>
        <div className="tariff-item">
          <FileText aria-hidden="true" />
          <div><strong>Vacuum-insulated steel bottle</strong><p>Stainless steel · Double-wall construction</p></div>
        </div>
        <div className="tariff-result">
          <p className="screen-kicker"><Check aria-hidden="true" /> Suggested heading</p>
          <strong>Insulated vacuum vessels</strong>
          <p>Ready for specialist review</p>
        </div>
        <p className="tariff-screen-note">Illustrative example</p>
      </div>
    </div>
  );
}

export function MeetingNotification() {
  return (
    <div className="monitor-notification">
      <span className="notification-icon"><Bell aria-hidden="true" /></span>
      <div><p>Still On · Meeting in 15 min.</p><strong>{meeting.name}</strong><span>{meeting.time}</span></div>
    </div>
  );
}

export function PhoneDisplay() {
  return (
    <div className="phone-display">
      <div className="phone-status"><span>2:15</span><span className="phone-battery" /></div>
      <div className="phone-app-bar"><strong>still<span>ON</span></strong><Bell aria-hidden="true" /></div>
      <div className="phone-app-body">
        <p className="screen-kicker">Today</p>
        <p className="phone-meeting-name">{meeting.name}</p>
        <p className="phone-meeting-time"><Clock3 aria-hidden="true" /> {meeting.time} <span>· 30 min</span></p>
        <div className="phone-phase phone-phase--reminder">
          <Bell aria-hidden="true" />
          <div><b>Meeting in 15 min.</b><p>Check in before the meeting.</p></div>
        </div>
        <div className="phone-phase phone-phase--check">
          <Check aria-hidden="true" />
          <div><b>You’re checked in</b><p>Two of three attending.</p></div>
        </div>
        <div className="phone-phase phone-phase--reschedule">
          <CalendarDays aria-hidden="true" />
          <div><b>Proposed time · {meeting.proposedTime}</b><p>Waiting for a response.</p></div>
        </div>
        <div className="phone-attendance">
          <p>Attendees</p>
          <div><span>BB</span><span>JT</span><span>MK</span><small>3 invited</small></div>
        </div>
      </div>
      <p className="phone-demo-label">Illustrative product demo</p>
    </div>
  );
}

export function CloudPoster({ priority = false }: { priority?: boolean }) {
  return <Image className="cloud-poster" alt="" width={880} height={710} src={`${artPath}/cloud.webp`} sizes="(min-width: 1440px) 820px, (min-width: 901px) 59vw, 96vw" preload={priority} />;
}
