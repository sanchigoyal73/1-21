"use client";
import React, { useState, useEffect, useRef } from 'react';
import styles from './ContactSection.module.css';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface EnquiryForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  honeypot: string;
}

interface VisitForm {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  requirement: string;
}

interface FormErrors {
  [key: string]: string;
}

// ---------------------------------------------------------------------------
// Icons (inline SVG, zero deps)
// ---------------------------------------------------------------------------
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={styles.contactCardIcon} aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/>
    </svg>
  );
}
function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={styles.contactCardIcon} aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}
function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={styles.contactCardIcon} aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------
function validateEnquiry(form: EnquiryForm): FormErrors {
  const errors: FormErrors = {};
  if (!form.firstName.trim()) errors.firstName = 'First name is required.';
  if (!form.email.trim()) errors.email = 'Email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address.';
  if (!form.phone.trim()) errors.phone = 'Phone number is required.';
  else if (!/^[+]?[\d\s\-()]{10,15}$/.test(form.phone.trim())) errors.phone = 'Enter a valid 10-digit phone number.';
  if (!form.interest) errors.interest = 'Please select an option.';
  return errors;
}

function validateVisit(form: VisitForm): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!form.phone.trim()) errors.phone = 'Phone number is required.';
  else if (!/^[+\d\s\-()]{7,}$/.test(form.phone)) errors.phone = 'Enter a valid phone number.';
  if (!form.email.trim()) errors.email = 'Email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address.';
  return errors;
}

// ---------------------------------------------------------------------------
// Site Visit Modal
// ---------------------------------------------------------------------------
function SiteVisitModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<VisitForm>({ name: '', phone: '', email: '', date: '', time: '', requirement: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const set = (field: keyof VisitForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateVisit(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSuccess(true);
  };

  return (
    <div className={styles.modalBackdrop} role="dialog" aria-modal="true" aria-labelledby="modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.modal}>
        <button className={styles.modalClose} onClick={onClose} aria-label="Close modal"><CloseIcon /></button>
        <span className={styles.modalEyebrow}>Plan Your Visit</span>
        <h2 id="modal-title" className={styles.modalHeadline}>Schedule a Site Visit</h2>
        <p className={styles.modalSub}>Our team will confirm your visit and guide you through the property.</p>

        {success ? (
          <div className={styles.successBox}>
            <h3>Request Received</h3>
            <p>Your site visit request has been received. Our team will contact you shortly to confirm the details.</p>
          </div>
        ) : (
          <form className={styles.modalForm} onSubmit={handleSubmit} noValidate>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="visit-name">Full Name <span className={styles.required}>*</span></label>
              <input ref={firstInputRef} className={`${styles.input}${errors.name ? ' ' + styles.error : ''}`} type="text" id="visit-name" value={form.name} onChange={set('name')} placeholder="Your full name" autoComplete="name" />
              {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="visit-phone">Phone Number <span className={styles.required}>*</span></label>
              <input className={`${styles.input}${errors.phone ? ' ' + styles.error : ''}`} type="tel" id="visit-phone" value={form.phone} onChange={set('phone')} placeholder="+91 XXXXX XXXXX" autoComplete="tel" />
              {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="visit-email">Email Address <span className={styles.required}>*</span></label>
              <input className={`${styles.input}${errors.email ? ' ' + styles.error : ''}`} type="email" id="visit-email" value={form.email} onChange={set('email')} placeholder="you@example.com" autoComplete="email" />
              {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
            </div>
            <div className={styles.fieldRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="visit-date">Preferred Date</label>
                <input className={styles.input} type="date" id="visit-date" value={form.date} onChange={set('date')} min={new Date().toISOString().split('T')[0]} />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="visit-time">Preferred Time</label>
                <div className={styles.selectWrapper}>
                  <select className={styles.select} id="visit-time" value={form.time} onChange={set('time')}>
                    <option value="">Select time</option>
                    <option>10:00 AM – 12:00 PM</option>
                    <option>12:00 PM – 2:00 PM</option>
                    <option>2:00 PM – 4:00 PM</option>
                    <option>4:00 PM – 6:00 PM</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="visit-req">Your Requirement</label>
              <textarea className={styles.textarea} id="visit-req" value={form.requirement} onChange={set('requirement')} rows={3} placeholder="Tell us what kind of space you're looking for..." />
            </div>
            <p className={styles.privacy}>By submitting this form, you agree to be contacted regarding your enquiry. See our <a href="#">Privacy Policy</a>.</p>
            <button className={styles.submitBtn} type="submit" disabled={loading}>
              {loading ? 'Submitting…' : 'Request Site Visit'}
              {!loading && <ArrowRight />}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main ContactSection
// ---------------------------------------------------------------------------
export default function ContactSection() {
  const [enquiry, setEnquiry] = useState<EnquiryForm>({
    firstName: '', lastName: '', email: '', phone: '', interest: '', message: '', honeypot: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const setField = (field: keyof EnquiryForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setEnquiry(prev => ({ ...prev, [field]: e.target.value }));
      // Clear the error for this field as soon as user starts correcting it
      if (errors[field]) setErrors(prev => { const next = { ...prev }; delete next[field]; return next; });
    };

  const handleEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enquiry.honeypot) return; // spam
    const errs = validateEnquiry(enquiry);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
  };

  // WhatsApp pre-filled message
  const waMsg = encodeURIComponent("Hi, I'm interested in learning more about commercial spaces at HP Market.");
  const waUrl = `https://wa.me/919XXXXXXXXX?text=${waMsg}`; // ← replace 9XXXXXXXXX with real number

  return (
    <>
      {showModal && <SiteVisitModal onClose={() => setShowModal(false)} />}

      {/* ─── 01. HERO ─── */}
      <section className={styles.hero} aria-labelledby="contact-h1">
        <div className={`reveal-up ${styles.heroInner}`}>
          <span className={styles.heroEyebrow}>HP Market</span>
          <h1 id="contact-h1" className={styles.heroHeadline}>Contact Us</h1>
          <p className={styles.heroSub}>Let's help you find the right commercial space at HP Market.</p>
        </div>
      </section>

      {/* ─── 02. FORM + IMAGE ─── */}
      <section className={styles.formSection}>
        <div className={styles.formContainer}>

          {/* Form Column */}
          <div className={`reveal-up ${styles.formCol}`}>
            <span className={styles.formEyebrow}>Get in Touch</span>
            <h2 className={styles.formHeadline}>Tell Us What You're Looking For</h2>
            <p className={styles.formSubtext}>
              Whether you're exploring a commercial space, evaluating an investment opportunity, or planning a site visit, our team is here to help.
            </p>

            {success ? (
              <div className={styles.successBox}>
                <h3>Enquiry Received</h3>
                <p>Thank you. Our team will get back to you within one business day.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleEnquiry} noValidate aria-label="Enquiry form">
                {/* Honeypot */}
                <div className={styles.honeypot} aria-hidden="true">
                  <input tabIndex={-1} autoComplete="off" value={enquiry.honeypot} onChange={setField('honeypot')} />
                </div>

                {/* Name row */}
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="firstName">First Name <span className={styles.required}>*</span></label>
                    <input className={`${styles.input}${errors.firstName ? ' ' + styles.error : ''}`}
                      type="text" id="firstName" value={enquiry.firstName} onChange={setField('firstName')}
                      placeholder="First name" autoComplete="given-name" />
                    {errors.firstName && <span className={styles.errorMsg} role="alert">{errors.firstName}</span>}
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="lastName">Last Name</label>
                    <input className={styles.input} type="text" id="lastName" value={enquiry.lastName}
                      onChange={setField('lastName')} placeholder="Last name" autoComplete="family-name" />
                  </div>
                </div>

                {/* Email */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="email">Email Address <span className={styles.required}>*</span></label>
                  <input className={`${styles.input}${errors.email ? ' ' + styles.error : ''}`}
                    type="email" id="email" value={enquiry.email} onChange={setField('email')}
                    placeholder="you@example.com" autoComplete="email" />
                  {errors.email && <span className={styles.errorMsg} role="alert">{errors.email}</span>}
                </div>

                {/* Phone */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="phone">Phone Number <span className={styles.required}>*</span></label>
                  <input className={`${styles.input}${errors.phone ? ' ' + styles.error : ''}`}
                    type="tel" id="phone" value={enquiry.phone} onChange={setField('phone')}
                    placeholder="+91 XXXXX XXXXX" autoComplete="tel" />
                  {errors.phone && <span className={styles.errorMsg} role="alert">{errors.phone}</span>}
                </div>

                {/* Interest */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="interest">I'm Interested In <span className={styles.required}>*</span></label>
                  <div className={styles.selectWrapper}>
                    <select className={`${styles.select}${errors.interest ? ' ' + styles.error : ''}`}
                      id="interest" value={enquiry.interest} onChange={setField('interest')}>
                      <option value="">Select an option</option>
                      <option value="retail">Retail Space</option>
                      <option value="office">Office Space</option>
                      <option value="investment">Investment Opportunity</option>
                      <option value="visit">Site Visit</option>
                      <option value="general">General Enquiry</option>
                    </select>
                  </div>
                  {errors.interest && <span className={styles.errorMsg} role="alert">{errors.interest}</span>}
                </div>

                {/* Message */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="message">Message</label>
                  <textarea className={styles.textarea} id="message" value={enquiry.message}
                    onChange={setField('message')} rows={5}
                    placeholder="Tell us how we can help you..." />
                </div>

                <p className={styles.privacy}>
                  By submitting this form, you agree to be contacted regarding your enquiry. See our <a href="#">Privacy Policy</a>.
                </p>
                <button className={styles.submitBtn} type="submit" disabled={loading}>
                  {loading ? 'Sending…' : 'Send Enquiry'}
                  {!loading && <ArrowRight />}
                </button>
              </form>
            )}
          </div>

          {/* Image Column */}
          <div className={`reveal-up reveal-delay-1 ${styles.imageCol}`}>
            <div className={styles.propertyImageWrapper}>
              <img
                src="/herosection2.png"
                alt="HP Market exterior, a modern commercial property in Old Delhi"
                className={styles.propertyImage}
                loading="lazy"
              />
              <div className={styles.imageOverlay}>
                <span className={styles.overlayLabel}>HP Market</span>
                <p className={styles.overlayTitle}>Asaf Ali Road, New Delhi</p>
              </div>
            </div>

            {/* WhatsApp strip */}
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.whatsappStrip} aria-label="Chat with HP Market on WhatsApp">
              <div className={styles.whatsappIcon}>
                <WhatsAppIcon size={22} />
              </div>
              <div className={styles.whatsappText}>
                <strong>Chat on WhatsApp</strong>
                <span>Get quick answers from our team</span>
              </div>
            </a>
          </div>

        </div>
      </section>

      {/* ─── 03. DIRECT CONTACT ─── */}
      <section className={styles.contactInfoSection} aria-label="Contact information">
        <div className={styles.contactInfoContainer}>

          <div className={`reveal-up ${styles.contactCard}`}>
            <PhoneIcon />
            <span className={styles.contactCardLabel}>Call Us</span>
            <a href="tel:+919XXXXXXXXX" className={styles.contactCardValue}>+91 9X XXXX XXXX</a>
          </div>

          <div className={`reveal-up reveal-delay-1 ${styles.contactCard}`}>
            <div className={styles.contactCardIcon} style={{ color: '#25D366', display: 'flex', alignItems: 'center' }}>
              <WhatsAppIcon size={28} />
            </div>
            <span className={styles.contactCardLabel}>WhatsApp</span>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.contactCardValue}>+91 9X XXXX XXXX</a>
          </div>

          <div className={`reveal-up reveal-delay-2 ${styles.contactCard}`}>
            <EmailIcon />
            <span className={styles.contactCardLabel}>Email</span>
            <a href="mailto:info@hpmarket.in" className={styles.contactCardValue}>info@hpmarket.in</a>
          </div>

          <div className={`reveal-up reveal-delay-2 ${styles.contactCard}`}>
            <MapPinIcon />
            <span className={styles.contactCardLabel}>Visit Us</span>
            <a
              href="https://maps.google.com/?q=Asaf+Ali+Road,+New+Delhi"
              target="_blank" rel="noopener noreferrer"
              className={styles.contactCardValue}>
              Asaf Ali Road,<br />New Delhi – 110055
            </a>
          </div>

        </div>
      </section>

      {/* ─── 04. FINAL CTA ─── */}
      <section className={`reveal-up ${styles.finalCta}`} aria-labelledby="cta-heading">
        <div className={styles.ctaBg} aria-hidden="true" />
        <div className={styles.ctaOverlay} aria-hidden="true" />
        <div className={styles.ctaContent}>
          <span className={styles.ctaEyebrow}>Plan Your Visit</span>
          <h2 id="cta-heading" className={styles.ctaHeadline}>See HP Market for Yourself</h2>
          <p className={styles.ctaSub}>Explore the property, understand the spaces, and speak with our team in person.</p>
          <div className={styles.ctaButtons}>
            <button className={styles.ctaPrimary} onClick={() => setShowModal(true)}>
              Schedule a Site Visit <ArrowRight />
            </button>
            <a href="tel:+919XXXXXXXXX" className={styles.ctaSecondary}>
              <PhoneIcon /> Call Our Team
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
