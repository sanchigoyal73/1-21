"use client";
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

export default function BusinessAdvantage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section ref={containerRef} className="section" style={{ padding: '140px 0', backgroundColor: '#FAFAF8', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)', position: 'relative' }}>
      <div style={{ maxWidth: '1560px', width: '100%', margin: '0 auto', padding: '0 40px' }}>
        <div className="ba-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.45fr) minmax(0, 1fr)', alignItems: 'center', gap: '64px' }}>
          
          {/* Left: Dominant Landmark Image covering major portion */}
          <div 
            style={{ 
              position: 'relative', 
              width: '100%',
              height: '560px',
              borderRadius: '20px', 
              overflow: 'hidden',
              boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.16), 0 0 0 1px rgba(15, 23, 42, 0.06)',
              backgroundColor: '#0f172a',
            }} 
            className="ba-image"
          >
            <motion.div style={{ y, width: '100%', height: '106%', position: 'absolute', top: '-3%', left: 0 }}>
              <Image
                src="/images/building/hp-market-facade.jpg"
                alt="HP Market Commercial Building Facade - 1/21 Asaf Ali Road"
                fill
                sizes="(max-width: 1024px) 100vw, 65vw"
                style={{ objectFit: 'cover', objectPosition: 'center 62%' }}
                priority
              />
            </motion.div>

            {/* Subtle Gradient Vignette at base */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(15, 23, 42, 0.45) 0%, rgba(15, 23, 42, 0) 35%)',
              pointerEvents: 'none',
              zIndex: 2,
            }} />

            {/* Premium Location Badge */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              padding: '10px 18px',
              background: 'rgba(15, 23, 42, 0.82)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '100px',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#FFFFFF',
              zIndex: 3,
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FF6A00', display: 'inline-block', boxShadow: '0 0 10px #FF6A00' }}></span>
              <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em' }}>1/21 Asaf Ali Road, Central Delhi</span>
            </div>
          </div>

          {/* Right: Original Bold Typography & Stats, framed within image height */}
          <div className="ba-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="label-text" 
              style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}
            >
              <span style={{ width: '32px', height: '1px', backgroundColor: 'var(--accent-primary)' }}></span>
              BUSINESS ADVANTAGE / 02
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="heading-text" 
              style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: 'clamp(2.25rem, 4vw, 3.75rem)', lineHeight: 1.08, letterSpacing: '-0.02em', fontWeight: 700 }}
            >
              BUILT FOR<br/>BUSINESS.
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="body-text-lg" 
              style={{ color: 'var(--text-secondary)', marginBottom: '44px', maxWidth: '500px', fontSize: '1.25rem', lineHeight: 1.6, fontWeight: 500 }}
            >
              "Every element of HP Market is designed to make everyday commercial operations more efficient, comfortable and reliable."
            </motion.p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px 28px' }}>
              {[
                { val: "100%", label: "POWER BACKUP" },
                { val: "24/7", label: "SECURITY" },
                { val: "CENTRAL", label: "AIR CONDITIONING" },
                { val: "HIGH-SPEED", label: "ELEVATORS" }
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                >
                  <div style={{ fontSize: 'clamp(2rem, 3vw, 2.75rem)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1, marginBottom: '8px' }}>
                    {stat.val}
                  </div>
                  <div className="label-text" style={{ color: 'var(--text-muted)' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          .ba-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .ba-image { 
            height: 420px !important; 
            order: 2; 
          }
          .ba-content { 
            order: 1; 
          }
        }
        @media (max-width: 640px) {
          .ba-image {
            height: 300px !important;
          }
        }
      `}} />
    </section>
  );
}
