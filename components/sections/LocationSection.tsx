"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Navigation, 
  MapPin, 
  Train, 
  TrainFront, 
  Landmark, 
  ShoppingBag, 
  Copy, 
  Check, 
  ExternalLink,
  ArrowUpRight,
  Layers,
  RotateCcw
} from 'lucide-react';

interface TransitHub {
  id: string;
  name: string;
  category: string;
  dist: string;
  time: string;
  query: string;
  icon: string;
  mode?: 'w' | 'd';
}

const SITE_ADDRESS = "1/21+Asaf+Ali+Road,+New+Delhi,+Delhi+110002";

const TRANSIT_HUBS: TransitHub[] = [
  {
    id: 'hp',
    name: 'HP Market (Our Site)',
    category: 'Commercial Landmark',
    dist: '0M',
    time: 'On-Site',
    query: '1/21+Asaf+Ali+Road,+New+Delhi,+Delhi+110002',
    icon: 'pin',
  },
  {
    id: 'metro',
    name: 'New Delhi Metro Station',
    category: 'Yellow Line & Airport Express',
    dist: '200M',
    time: '3 min walk',
    query: 'New+Delhi+Metro+Station,+Ajmeri+Gate,+New+Delhi',
    icon: 'metro',
    mode: 'w',
  },
  {
    id: 'railway',
    name: 'New Delhi Railway Station (NDLS)',
    category: 'Intercity Rail Terminal',
    dist: '250M',
    time: '4 min walk',
    query: 'New+Delhi+Railway+Station,+Ajmeri+Gate,+New+Delhi',
    icon: 'train',
    mode: 'w',
  },
  {
    id: 'ajmeri',
    name: 'Ajmeri Gate Chowk',
    category: 'Historic Junction',
    dist: '150M',
    time: '2 min walk',
    query: 'Ajmeri+Gate,+Asaf+Ali+Road,+New+Delhi',
    icon: 'historic',
    mode: 'w',
  },
  {
    id: 'kamla',
    name: 'Kamla Market',
    category: 'Commercial Wholesale Market',
    dist: '50M',
    time: '1 min walk',
    query: 'Kamla+Market,+Asaf+Ali+Road,+New+Delhi',
    icon: 'market',
    mode: 'w',
  },
  {
    id: 'cp',
    name: 'Connaught Place (CP)',
    category: 'Central Business District',
    dist: '800M',
    time: '3 min drive',
    query: 'Connaught+Place,+New+Delhi,+Delhi',
    icon: 'cbd',
    mode: 'd',
  },
];

export default function LocationSection() {
  const [selectedHub, setSelectedHub] = useState<TransitHub>(TRANSIT_HUBS[1]); // Default to Metro route
  const [mapType, setMapType] = useState<'m' | 'k'>('m'); // 'm' = Roadmap, 'k' = Satellite
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("1/21 Asaf Ali Road, New Delhi 110002");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'metro': return <TrainFront size={18} />;
      case 'train': return <Train size={18} />;
      case 'historic': return <Landmark size={18} />;
      case 'market': return <ShoppingBag size={18} />;
      default: return <MapPin size={18} />;
    }
  };

  // Construct Google Maps path: from our main site (saddr) to the selected place (daddr)
  const embedUrl = selectedHub.id === 'hp'
    ? `https://maps.google.com/maps?q=${SITE_ADDRESS}&t=${mapType}&z=17&output=embed`
    : `https://maps.google.com/maps?saddr=${SITE_ADDRESS}&daddr=${selectedHub.query}&dirflg=${selectedHub.mode || 'w'}&t=${mapType}&output=embed`;

  return (
    <section 
      id="location" 
      className="section bg-dark-slate" 
      style={{ 
        padding: '140px 0', 
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Accent Glow */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '5%',
        width: '550px',
        height: '550px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 106, 0, 0.08) 0%, rgba(15, 23, 42, 0) 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1560px', padding: '0 40px' }}>
        <div 
          className="location-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.35fr)',
            gap: '56px',
            alignItems: 'center',
          }}
        >

          {/* Left Content Column: Institutional Architectural Transit Ledger */}
          <div className="location-content" style={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* Architectural Eyebrow */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                marginBottom: '1.5rem',
                fontSize: '11px', 
                fontWeight: 700, 
                letterSpacing: '0.18em', 
                textTransform: 'uppercase',
              }}
            >
              <span style={{ color: 'var(--accent-primary)' }}>LOCATION &amp; ACCESS</span>
              <span style={{ width: '28px', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.25)' }}></span>
              <span style={{ color: 'rgba(255, 255, 255, 0.45)' }}>CENTRAL DELHI • ASAF ALI ROAD</span>
            </motion.div>

            {/* Headline */}
            <motion.h2 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.1 }}
              className="heading-text" 
              style={{ 
                color: '#ffffff', 
                marginBottom: '1.25rem', 
                fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', 
                lineHeight: 1.08, 
                letterSpacing: '-0.025em', 
                fontWeight: 700 
              }}
            >
              RIGHT WHERE<br/>BUSINESS HAPPENS.
            </motion.h2>
            
            {/* Editorial Context */}
            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.15 }}
              style={{ 
                color: 'rgba(255, 255, 255, 0.68)', 
                marginBottom: '32px', 
                maxWidth: '520px', 
                fontSize: '1.05rem', 
                lineHeight: 1.65,
                fontWeight: 400,
              }}
            >
              Situated along Asaf Ali Road, HP Market anchors the high-volume commercial corridor where New Delhi’s national rail terminal, dual metro corridors, and Old Delhi’s multi-billion rupee trading hubs directly intersect.
            </motion.p>
            
            {/* Architectural Transit Ledger */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.2 }}
              style={{ marginBottom: '32px' }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '10px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
                marginBottom: '4px',
              }}>
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)' }}>
                  CONNECTIVITY MATRIX
                </span>
                <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)' }}>
                  DISTANCE • DOOR-TO-DESK
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {TRANSIT_HUBS.map((hub, idx) => {
                  const isActive = selectedHub.id === hub.id;
                  return (
                    <button
                      key={hub.id}
                      onClick={() => setSelectedHub(hub)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '13px 12px',
                        backgroundColor: isActive ? 'rgba(255, 106, 0, 0.08)' : 'transparent',
                        border: 'none',
                        borderLeft: isActive ? '3px solid #FF6A00' : '3px solid transparent',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                        width: '100%',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <span style={{ 
                          fontFamily: 'monospace', 
                          fontSize: '11px', 
                          fontWeight: 700, 
                          color: isActive ? '#FF6A00' : 'rgba(255, 255, 255, 0.35)',
                          letterSpacing: '0.05em'
                        }}>
                          0{idx + 1}
                        </span>
                        <div>
                          <div style={{ 
                            fontSize: '14px', 
                            fontWeight: isActive ? 700 : 600, 
                            color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.9)', 
                            letterSpacing: '-0.01em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}>
                            <span>{hub.name}</span>
                            {isActive && (
                              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FF6A00', display: 'inline-block' }} />
                            )}
                          </div>
                          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)', marginTop: '2px' }}>
                            {hub.category}
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: isActive ? '#FF6A00' : '#ffffff', letterSpacing: '-0.02em' }}>
                          {hub.dist}
                        </div>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '1px' }}>
                          {hub.time}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Property Specification Plaque */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.25 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                marginBottom: '28px',
              }}
            >
              <div>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent-primary)', marginBottom: '3px' }}>
                  REGISTERED ASSET ADDRESS
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>
                  1/21 Asaf Ali Road, New Delhi 110002
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.4)', marginTop: '2px' }}>
                  28.6423° N, 77.2322° E • Facing Kamla Market Radial
                </div>
              </div>

              <button
                onClick={handleCopyAddress}
                title="Copy Address"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  backgroundColor: copied ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                  border: copied ? '1px solid #22c55e' : '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  color: copied ? '#22c55e' : 'rgba(255, 255, 255, 0.8)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </motion.div>

            {/* Authoritative Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.3 }}
              style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}
            >
              <Link 
                href="https://www.google.com/maps/dir/?api=1&destination=1/21+Asaf+Ali+Road,+New+Delhi,+Delhi+110002" 
                target="_blank" 
                className="sm-btn sm-btn-primary" 
                style={{ 
                  padding: '0 28px', 
                  height: '52px', 
                  fontSize: '0.92rem',
                  letterSpacing: '0.04em',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Navigation size={16} />
                <span>OPEN IN GOOGLE MAPS</span>
                <ArrowUpRight size={16} />
              </Link>

              {selectedHub.id !== 'hp' && (
                <button
                  onClick={() => setSelectedHub(TRANSIT_HUBS[0])}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '0 16px',
                    height: '52px',
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '4px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#FF6A00';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                  }}
                >
                  <RotateCcw size={14} />
                  <span>RESET TO HP MARKET</span>
                </button>
              )}
            </motion.div>
          </div>

          {/* Right Map Column */}
          <div 
            className="location-map"
            style={{ 
              position: 'relative', 
              width: '100%', 
              height: '660px', 
              borderRadius: '24px', 
              overflow: 'hidden',
              boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              backgroundColor: '#1e293b',
            }}
          >
            {/* Top Right: Map / Satellite Mode Toggle */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              zIndex: 20,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px',
              backgroundColor: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
            }}>
              <button
                onClick={() => setMapType('m')}
                style={{
                  padding: '7px 14px',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  borderRadius: '9px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: mapType === 'm' ? '#FF6A00' : 'transparent',
                  color: mapType === 'm' ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                  boxShadow: mapType === 'm' ? '0 4px 12px rgba(255, 106, 0, 0.35)' : 'none',
                }}
              >
                Street Map
              </button>
              <button
                onClick={() => setMapType('k')}
                style={{
                  padding: '7px 14px',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  borderRadius: '9px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: mapType === 'k' ? '#FF6A00' : 'transparent',
                  color: mapType === 'k' ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                  boxShadow: mapType === 'k' ? '0 4px 12px rgba(255, 106, 0, 0.35)' : 'none',
                }}
              >
                Satellite View
              </button>
            </div>

            {/* Top Left: Verified Location Badge */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              zIndex: 20,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              backgroundColor: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '100px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 500,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 10px #22c55e', display: 'inline-block' }}></span>
              <span style={{ color: '#FF6A00', fontWeight: 700 }}>HP MARKET</span>
              <span style={{ opacity: 0.35 }}>|</span>
              <span>1/21 Asaf Ali Road</span>
            </div>

            {/* Bottom HUD: Selected Destination Details */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '20px',
              right: '20px',
              zIndex: 20,
              backgroundColor: 'rgba(15, 23, 42, 0.92)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '16px',
              padding: '16px 20px',
              border: '1px solid rgba(255, 106, 0, 0.3)',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 106, 0, 0.12)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', color: '#FF6A00', textTransform: 'uppercase' }}>
                  {selectedHub.id === 'hp' ? 'Property Location' : `Path from HP Market • ${selectedHub.category}`}
                </div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {selectedHub.id === 'hp' ? (
                    <span>HP Market (1/21 Asaf Ali Road)</span>
                  ) : (
                    <>
                      <span style={{ color: 'rgba(255,255,255,0.7)' }}>HP Market</span>
                      <span style={{ color: '#FF6A00' }}>➔</span>
                      <span>{selectedHub.name}</span>
                    </>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Distance</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
                    {selectedHub.dist}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Walk / Transit</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#22c55e' }}>
                    {selectedHub.time}
                  </div>
                </div>
                <a
                  href={
                    selectedHub.id === 'hp'
                      ? `https://www.google.com/maps/dir/?api=1&destination=${SITE_ADDRESS}`
                      : `https://www.google.com/maps/dir/?api=1&origin=${SITE_ADDRESS}&destination=${selectedHub.query}&travelmode=${selectedHub.mode === 'd' ? 'driving' : 'walking'}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#FF6A00',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(255,106,0,0.3)',
                  }}
                >
                  View Route <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Official Google Maps Live Embed */}
            <iframe 
              key={embedUrl}
              src={embedUrl}
              width="100%" 
              height="100%" 
              style={{ 
                border: 0, 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%',
                height: '100%',
              }} 
              allowFullScreen={true} 
              loading="eager" 
              referrerPolicy="no-referrer-when-downgrade"
              title="HP Market Google Map"
            />
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1080px) {
          .location-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .location-content {
            order: 1;
          }
          .location-map {
            order: 2;
            height: 520px !important;
          }
        }
        @media (max-width: 640px) {
          .location-map {
            height: 440px !important;
          }
        }
      `}} />
    </section>
  );
}
