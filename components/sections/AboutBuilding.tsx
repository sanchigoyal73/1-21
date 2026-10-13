"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './AboutBuilding.module.css';
import Link from 'next/link';
import { Train, TrainFront, MapPin, ShieldCheck, Zap, Maximize } from 'lucide-react';

// Custom hook for scroll animation
const useScrollReveal = () => {
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = document.querySelectorAll(`.${styles.animateOnScroll}, .${styles.cinematicIntro}, .${styles.comparisonSection}, .${styles.ideaSection}, .${styles.infraSection}`);

    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);
};

// Custom hook for counter animation
const useCounter = (targetId: string, targetNumber: number, prefix = '', suffix = '') => {
  useEffect(() => {
    const element = document.getElementById(targetId);
    if (!element) return;

    let hasAnimated = false;
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            // Ease out quad
            const easedProgress = 1 - (1 - progress) * (1 - progress);
            const currentNumber = Math.round(easedProgress * targetNumber);
            
            element.innerText = `${prefix}${currentNumber}${suffix}`;

            if (currentStep >= steps) {
              clearInterval(timer);
              element.innerText = `${prefix}${targetNumber}${suffix}`;
            }
          }, stepDuration);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, { threshold: 0.5 });
    observer.observe(element);

    return () => observer.disconnect();
  }, [targetId, targetNumber, prefix, suffix]);
};

export default function AboutBuilding() {
  useScrollReveal();
  
  useCounter('stat-rly', 250, '', 'M');
  useCounter('stat-metro', 200, '', 'M');
  useCounter('stat-chowk', 150, '', 'M');
  useCounter('stat-sqft', 2000, '', '+ SQ FT');

  return (
    <section id="about" className={styles.section}>
      
      {/* 1. Cinematic Intro */}
      <div className={styles.cinematicIntro}>
        <div className={styles.cinematicBg}>
          <Image src="/hpbakcground.png" alt="HP Market Background" fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div className={styles.cinematicOverlay} />
        
        <div className={styles.cinematicContent}>
          <h1 className={styles.cinematicHeadline}>
            THE HEART OF OLD DELHI.<br />
            REIMAGINED FOR BUSINESS.
          </h1>
          <p className={`${styles.cinematicSubhead} ${styles.animateOnScroll}`}>
            For generations, Old Delhi has been one of India's most powerful trading destinations. HP Market brings a new standard of infrastructure to that legacy.
          </p>
          <div className={`${styles.locationIndicator} ${styles.animateOnScroll} ${styles.delay1}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            ASAF ALI ROAD · CENTRAL DELHI
          </div>
        </div>

        <div className={styles.scrollIndicator}>
          SCROLL TO EXPLORE
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
        </div>
      </div>

      {/* 2. The Story */}
      <div className={styles.storySection}>
        <div className={styles.storyGrid}>
          <div>
            <h2 className={`${styles.headline} ${styles.animateOnScroll}`}>OLD DELHI HAS ALWAYS BEEN ABOUT BUSINESS.</h2>
            <p className={`${styles.subheadline} ${styles.animateOnScroll} ${styles.delay1}`}>
              From wholesale trading to retail and distribution, Old Delhi has been at the centre of commerce for generations. But as businesses evolved, the infrastructure around them needed to evolve too.
            </p>
          </div>
          <div className={styles.storyImages}>
            <div className={`${styles.storyImageWrap} ${styles.animateOnScroll}`}>
              <Image src="/images/challenge/chandni-chowk.jpg" alt="Traditional Old Delhi Market" fill />
            </div>
            <div className={`${styles.storyImageWrap} ${styles.animateOnScroll} ${styles.delay2}`}>
              <Image src="/hp_market_hero.jpg" alt="Modern HP Market" fill />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Old Way vs New Standard */}
      <div className={styles.comparisonSection}>
        <div className={styles.comparisonContainer}>
          <div className={styles.compCenter}>FROM CONGESTION &rarr; TO CLARITY</div>
          <div className={styles.comparisonGrid}>
            <div className={styles.compSide}>
              <div className={styles.compBg}>
                <Image src="/images/challenge/challenges.jpg" alt="Congestion" fill />
              </div>
              <div className={styles.compContent}>
                <h3 className={styles.compTitle}>THE OLD WAY</h3>
                <ul className={styles.compList}>
                  <li>Congestion</li>
                  <li>Parking challenges</li>
                  <li>Limited infrastructure</li>
                  <li>Difficult loading</li>
                  <li>Unorganized movement</li>
                </ul>
              </div>
            </div>
            
            <div className={styles.compSide}>
              <div className={styles.compBg}>
                <Image src="/hp_market_hero.jpg" alt="Clarity" fill />
              </div>
              <div className={styles.compContent}>
                <h3 className={styles.compTitle}>THE NEW STANDARD</h3>
                <ul className={styles.compList}>
                  <li>Dedicated loading infrastructure</li>
                  <li>Organized circulation</li>
                  <li>MCD parking</li>
                  <li>24/7 security</li>
                  <li>Air-conditioned environment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. The Idea */}
      <div className={styles.ideaSection}>
        <span className={`${styles.eyebrow} ${styles.animateOnScroll}`}>OUR VISION / 01</span>
        <h2 className={`${styles.headline} ${styles.animateOnScroll}`}>DON'T MOVE THE BUSINESS.<br />MOVE THE STANDARD FORWARD.</h2>
        <p className={`${styles.subheadline} ${styles.animateOnScroll} ${styles.delay1}`} style={{ margin: '0 auto' }}>
          The goal was never to move businesses away from Old Delhi, but to elevate how business is conducted right where it matters most.
        </p>
        
        <div className={`${styles.ideaImageWrap} ${styles.animateOnScroll} ${styles.delay2}`}>
          <Image src="/hpmarket.png" alt="HP Market Architecture" width={1000} height={600} style={{ width: '100%', height: 'auto' }} />
          <div className={`${styles.ideaLabel} ${styles.label1}`}>SECURITY</div>
          <div className={`${styles.ideaLabel} ${styles.label2}`}>LOGISTICS</div>
          <div className={`${styles.ideaLabel} ${styles.label3}`}>ACCESS</div>
          <div className={`${styles.ideaLabel} ${styles.label4}`}>COMFORT</div>
          <div className={`${styles.ideaLabel} ${styles.label5}`}>CONNECTIVITY</div>
        </div>
      </div>

      {/* 5. Built Around Business (Horizontal Scroll) */}
      <div className={styles.horizontalSection}>
        <div className={`${styles.horizontalHeader} ${styles.animateOnScroll}`}>
          <h2 className={styles.headline} style={{ marginBottom: 0 }}>BUILT AROUND<br />HOW BUSINESS WORKS.</h2>
        </div>
        
        <div className={`${styles.scrollContainer} ${styles.animateOnScroll} ${styles.delay1}`}>
          {[
            { num: '01', title: 'MOVE GOODS', desc: 'Dedicated infrastructure designed for everyday loading and movement.', img: '/ourdelivery.png' },
            { num: '02', title: 'MOVE PEOPLE', desc: 'High-speed, heavy-load elevators designed for commercial requirements.', img: '/images/gallery/lift.png' },
            { num: '03', title: 'STAY COMFORTABLE', desc: 'Central air conditioning across the commercial environment.', img: '/images/gallery/AC.png' },
            { num: '04', title: 'STAY SECURE', desc: '24/7 security and CCTV surveillance.', img: '/herosection2.png' },
            { num: '05', title: 'STAY CONNECTED', desc: 'Free Wi-Fi zones across common areas.', img: '/images/gallery/interior_corridor.jpg' },
          ].map((card, i) => (
            <div key={i} className={styles.scrollCard}>
              <div className={styles.cardBg}>
                <Image src={card.img} alt={card.title} fill />
              </div>
              <div className={styles.cardOverlay} />
              <div className={styles.cardContent}>
                <span className={styles.cardNumber}>{card.num}</span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDesc}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Infrastructure */}
      <div className={styles.infraSection}>
        <div className={`${styles.animateOnScroll}`} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className={styles.headline}>EVERY DETAIL HAS A PURPOSE.</h2>
        </div>
        
        <div className={styles.infraGrid}>
          {[
            { text: 'SPACE TO MOVE.', img: '/images/gallery/hall_e.png' },
            { text: 'COMFORT TO STAY.', img: '/images/gallery/interior_corridor.jpg' },
            { text: 'INFRASTRUCTURE TO SCALE.', img: '/ourdelivery.png' },
            { text: 'SECURITY TO OPERATE.', img: '/herosection2.png' },
            { text: 'ACCESS TO CONNECT.', img: '/images/gallery/lift.png' },
          ].map((item, i) => (
            <div key={i} className={styles.infraItem}>
              <Image src={item.img} alt={item.text} fill />
              <div className={styles.infraOverlay}>
                <span className={styles.infraText}>{item.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Stats */}
      <div className={styles.statsSection}>
        <div className={styles.statsContainer}>
          <div className={`${styles.statsHeader} ${styles.animateOnScroll}`}>
            <span className={styles.eyebrow}>BY THE NUMBERS</span>
            <h2 className={styles.headline} style={{ marginBottom: 0 }}>DESIGNED FOR SCALE</h2>
          </div>
          
          <div className={styles.statsGrid}>
            <div className={`${styles.statCard} ${styles.animateOnScroll}`}>
              <div className={styles.statIcon}><Train size={32} /></div>
              <div id="stat-rly" className={styles.statNumber}>0M</div>
              <div className={styles.statLabel}>NEW DELHI RAILWAY STATION</div>
            </div>
            <div className={`${styles.statCard} ${styles.animateOnScroll} ${styles.delay1}`}>
              <div className={styles.statIcon}><TrainFront size={32} /></div>
              <div id="stat-metro" className={styles.statNumber}>0M</div>
              <div className={styles.statLabel}>NEW DELHI METRO</div>
            </div>
            <div className={`${styles.statCard} ${styles.animateOnScroll} ${styles.delay2}`}>
              <div className={styles.statIcon}><MapPin size={32} /></div>
              <div id="stat-chowk" className={styles.statNumber}>0M</div>
              <div className={styles.statLabel}>AJMERI GATE CHOWK</div>
            </div>
            <div className={`${styles.statCard} ${styles.animateOnScroll}`}>
              <div className={styles.statIcon}><ShieldCheck size={32} /></div>
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>SECURITY & ACCESS</div>
            </div>
            <div className={`${styles.statCard} ${styles.animateOnScroll} ${styles.delay1}`}>
              <div className={styles.statIcon}><Zap size={32} /></div>
              <div className={styles.statNumber}>100%</div>
              <div className={styles.statLabel}>POWER BACKUP</div>
            </div>
            <div className={`${styles.statCard} ${styles.animateOnScroll} ${styles.delay2}`}>
              <div className={styles.statIcon}><Maximize size={32} /></div>
              <div id="stat-sqft" className={styles.statNumber}>0+ SQ FT</div>
              <div className={styles.statLabel}>AVAILABLE COMMERCIAL SPACES</div>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Location */}
      <div className={styles.locationSection}>
        <h2 className={`${styles.headline} ${styles.animateOnScroll}`}>IN THE CENTRE<br />OF EVERYTHING.</h2>
        <p className={`${styles.subheadline} ${styles.animateOnScroll} ${styles.delay1}`} style={{ margin: '0 auto' }}>
          1/21 Asaf Ali Road<br />Central Delhi
        </p>
        
        <div className={`${styles.locMapWrap} ${styles.animateOnScroll} ${styles.delay2}`}>
          <div className={styles.locPoints}>
            <div className={styles.locPoint}>
              <span className={styles.locDist}>250M</span>
              <span className={styles.locName}>New Delhi Railway</span>
            </div>
            <div className={styles.locPoint}>
              <span className={styles.locDist}>200M</span>
              <span className={styles.locName}>New Delhi Metro</span>
            </div>
            <div className={styles.locPoint}>
              <span className={styles.locDist}>0M</span>
              <span className={styles.locName}>MCD Parking</span>
            </div>
          </div>
          <Link href="#location" className={styles.btnPrimary} style={{ display: 'inline-block' }}>
            EXPLORE THE LOCATION &rarr;
          </Link>
        </div>
      </div>

      {/* 9. A Day at HP Market */}
      <div className={styles.timelineSection}>
        <div className={styles.timelineContainer}>
          <div className={styles.timelineLine}></div>
          
          {[
            { time: '08:00 AM', title: 'BUSINESS BEGINS', desc: 'The market awakens. Easy access and organized parking make the morning rush seamless.' },
            { time: '10:00 AM', title: 'CUSTOMERS ARRIVE', desc: 'Central AC ensures a comfortable environment as footfall increases throughout the morning.' },
            { time: '01:00 PM', title: 'TRADING IN FULL FLOW', desc: 'High-speed elevators and wide corridors handle peak capacity with ease.' },
            { time: '04:00 PM', title: 'LOGISTICS & DISPATCH', desc: 'Dedicated loading infrastructure ensures goods move efficiently without disrupting retail.' },
            { time: '08:00 PM', title: 'SECURE & OPERATING', desc: 'As the traditional market closes, HP Market remains secure and accessible for late operations.' },
            { time: '24/7', title: 'INFRASTRUCTURE THAT KEEPS UP', desc: 'Continuous power backup and round-the-clock security ensure business never stops.' },
          ].map((item, i) => (
            <div key={i} className={`${styles.timelineItem} ${styles.animateOnScroll}`}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timeLabel}>{item.time}</div>
              <h3 className={styles.timeTitle}>{item.title}</h3>
              <p className={styles.timeDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 10. Final Brand Statement */}
      <div className={styles.closingSection}>
        <div className={styles.closingBg}>
          <Image src="/hpbakcground.png" alt="HP Market" fill />
        </div>
        <div className={styles.closingContent}>
          <h2 className={`${styles.closingHeadline} ${styles.animateOnScroll}`}>
            NOT JUST A COMMERCIAL SPACE.<br />
            <span>A BETTER WAY TO DO BUSINESS.</span>
          </h2>
          <p className={`${styles.closingSubhead} ${styles.animateOnScroll} ${styles.delay1}`}>
            Prime location. Modern infrastructure. Purpose-built for the businesses shaping tomorrow.
          </p>
          <div className={`${styles.btnGroup} ${styles.animateOnScroll} ${styles.delay2}`}>
            <Link href="#spaces" className={styles.btnPrimary}>EXPLORE SPACES &rarr;</Link>
            <Link href="#contact" className={styles.btnOutline}>BOOK A SITE VISIT &rarr;</Link>
          </div>
        </div>
      </div>

    </section>
  );
}
