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

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="section" style={{ padding: '140px 0', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        <div className="grid-12" style={{ alignItems: 'center', gap: '64px' }}>
          
          {/* Left: Image with Parallax */}
          <div style={{ gridColumn: 'span 6', position: 'relative', height: '700px', borderRadius: '12px', overflow: 'hidden' }} className="ba-image">
            <motion.div style={{ y, width: '100%', height: '120%', position: 'absolute', top: '-10%', left: 0 }}>
              <Image
                src="/images/building/hp-market-facade.jpg"
                alt="HP Market Commercial Building Facade"
                fill
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
          </div>

          {/* Right: Content */}
          <div style={{ gridColumn: 'span 6' }} className="ba-content">
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
          .ba-image { grid-column: span 12 !important; height: 400px !important; order: 2; }
          .ba-content { grid-column: span 12 !important; order: 1; }
        }
      `}} />
    </section>
  );
}
