"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { contactSchema, type ContactErrors, type ContactField } from "@/lib/contact";
import "./contact.css";

type ContactProps = { enabled?: boolean; publicEmail?: string; socialLinks?: readonly { label: string; href: string }[] };
type SubmissionState = "idle" | "sending" | "success" | "error";

const fieldOrder: ContactField[] = ["name", "email", "organization", "message"];

export function Contact({ enabled = false, publicEmail, socialLinks = [] }: ContactProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [state, setState] = useState<SubmissionState>("idle");
  const [feedback, setFeedback] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || state === "sending") return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const result = contactSchema.safeParse(values);

    if (!result.success) {
      const nextErrors: ContactErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as ContactField;
        if (fieldOrder.includes(field)) nextErrors[field] ??= issue.message;
      }
      setErrors(nextErrors);
      setState("error");
      setFeedback("Please check the highlighted fields.");
      const firstInvalid = fieldOrder.find((field) => nextErrors[field]);
      if (firstInvalid) form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setErrors({});
    setState("sending");
    setFeedback("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const data = await response.json() as { message?: string; fields?: ContactErrors };
      if (!response.ok) {
        setErrors(data.fields ?? {});
        setState("error");
        setFeedback(data.message ?? "Your message could not be sent. Please try again.");
        const firstInvalid = fieldOrder.find((field) => data.fields?.[field]);
        if (firstInvalid) form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
        return;
      }
      formRef.current?.reset();
      setState("success");
      setFeedback(data.message ?? "Your message is on its way. Thanks for reaching out.");
    } catch {
      setState("error");
      setFeedback("We couldn’t reach the email service. Please try again in a moment.");
    }
  }

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="contact-inner">
        <div className="contact-intro">
          <p className="contact-eyebrow"><span>04 /</span> GET IN TOUCH</p>
          <h2 id="contact-heading">Have something<br />in mind?<br /><span>Let’s build it.</span></h2>
          <p className="contact-description">A project, a problem, a possibility.<br />Good things start with a conversation.</p>
          {(publicEmail || socialLinks.length > 0) && <div className="contact-profile-links">
            {publicEmail && <a href={`mailto:${publicEmail}`}>{publicEmail}<ArrowUpRight size={15} aria-hidden="true" /></a>}
            {socialLinks.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label}<ArrowUpRight size={15} aria-hidden="true" /></a>)}
          </div>}
          <div className="contact-signal" aria-hidden="true">
            <span className="contact-signal-mark">↗</span>
            <span>THE NEXT CHAPTER<br />STARTS HERE.</span>
          </div>
        </div>

        <form className="contact-form" ref={formRef} action="/api/contact" method="post" onSubmit={submit} noValidate aria-describedby={!enabled ? "contact-unconfigured" : undefined} aria-busy={state === "sending"}>
          <div className="contact-field-row">
            <div className="contact-field">
              <label htmlFor="contact-name">Your name <span aria-hidden="true">*</span></label>
              <input id="contact-name" name="name" autoComplete="name" required maxLength={100} placeholder="First and last name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />
              {errors.name && <p className="contact-field-error" id="contact-name-error">{errors.name}</p>}
            </div>
            <div className="contact-field">
              <label htmlFor="contact-email">Email address <span aria-hidden="true">*</span></label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} />
              {errors.email && <p className="contact-field-error" id="contact-email-error">{errors.email}</p>}
            </div>
          </div>
          <div className="contact-field">
            <label htmlFor="contact-organization">Organization <span className="contact-optional">(optional)</span></label>
            <input id="contact-organization" name="organization" autoComplete="organization" maxLength={120} placeholder="Where you’re building" aria-invalid={Boolean(errors.organization)} aria-describedby={errors.organization ? "contact-organization-error" : undefined} />
            {errors.organization && <p className="contact-field-error" id="contact-organization-error">{errors.organization}</p>}
          </div>
          <div className="contact-field contact-message-field">
            <label htmlFor="contact-message">What are you thinking? <span aria-hidden="true">*</span></label>
            <textarea id="contact-message" name="message" rows={3} required minLength={20} maxLength={4000} placeholder="Tell me a little about your idea…" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} />
            {errors.message && <p className="contact-field-error" id="contact-message-error">{errors.message}</p>}
          </div>
          <div className="contact-trap" aria-hidden="true">
            <label htmlFor="contact-website">Leave this field empty</label>
            <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="contact-submit-row">
            <button className="contact-submit" type="submit" disabled={!enabled || state === "sending"}>
              <span>{state === "sending" ? "Sending message…" : "Send a message"}</span>
              <ArrowUpRight size={21} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <span className="contact-required-note">* Required fields</span>
          </div>
          {!enabled && <p className="contact-unconfigured" id="contact-unconfigured"><span aria-hidden="true" />Email delivery is not connected yet. This form isn’t accepting messages.</p>}
          <p className={`contact-feedback${state === "error" ? " is-error" : ""}`} role="status" aria-live="polite" aria-atomic="true">{feedback}</p>
          <noscript><style>{".contact-form .contact-submit { display: none; }"}</style><p className="contact-unconfigured">Please enable JavaScript to use this contact form.</p></noscript>
        </form>
      </div>
    </section>
  );
}
