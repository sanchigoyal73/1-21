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
    <section ref={containerRef} className="section" style={{ padding: '120px 0', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        <div className="grid-12" style={{ alignItems: 'center', gap: '48px' }}>
          
          {/* Left: Image with natural fit and subtle parallax */}
          <div 
            style={{ 
              gridColumn: 'span 7', 
              position: 'relative', 
              width: '100%',
              aspectRatio: '16 / 10.5',
              minHeight: '400px',
              borderRadius: '16px', 
              overflow: 'hidden',
              boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05)',
              backgroundColor: '#f8fafc',
            }} 
            className="ba-image"
          >
            <motion.div style={{ y, width: '100%', height: '106%', position: 'absolute', top: '-3%', left: 0 }}>
              <Image
                src="/images/building/hp-market-facade.jpg"
                alt="HP Market Commercial Building Facade - 1/21 Asaf Ali Road"
                fill
                sizes="(max-width: 960px) 100vw, 60vw"
                style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
                priority
              />
            </motion.div>
          </div>

          {/* Right: Content */}
          <div style={{ gridColumn: 'span 5' }} className="ba-content">
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
              style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}
            >
              BUILT FOR<br/>BUSINESS.
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="body-text-lg" 
              style={{ color: 'var(--text-secondary)', marginBottom: '48px', maxWidth: '500px' }}
            >
              "Every element of HP Market is designed to make everyday commercial operations more efficient, comfortable and reliable."
            </motion.p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px 24px' }}>
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
                  <div style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1, marginBottom: '8px' }}>
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
        @media (max-width: 900px) {
          .ba-image { 
            grid-column: span 12 !important; 
            aspect-ratio: 16 / 10 !important; 
            height: auto !important; 
            min-height: 260px !important;
            order: 2; 
          }
          .ba-content { 
            grid-column: span 12 !important; 
            order: 1; 
          }
        }
      `}} />
    </section>
  );
}
