import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import '../css/footer.css';

const Footer = () => {
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();

  // 1. Check for Mobile Device on Mount & Resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992); // 992px breakpoint (Bootstrap lg)
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. Only Trigger Auto-Hide on Desktop
  useMotionValueEvent(scrollY, "change", (latest) => {
      if (isMobile) {
        setHidden(false); // Always show on mobile (static position)
        return; 
      }

      const previous = scrollY.getPrevious();
      if (latest > previous && latest > 150) {
          setHidden(true);
      } else {
          setHidden(false);
      }
  });

  return (
    <motion.footer 
        className="robotic-footer mt-auto"
        variants={{
            visible: { y: 0 },
            hidden: { y: "100%" }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
            position: isMobile ? 'relative' : 'fixed', // Static on Mobile, Fixed on Desktop
            zIndex: 100
        }}
    >
      <div className="footer-scanline"></div>
      <Container>
        <Row className="align-items-center py-4">
            
          {/* Identity Section */}
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0 d-flex align-items-center justify-content-center justify-content-md-start">
             <img 
                src="src/assets/LOGO-NVALDEVVVV.jpg" 
                alt="Logo" 
                className="footer-logo me-3"
             />
             <div className="footer-brand">
                <h5 className="mb-0 text-white tracking-widest">NVALDEV</h5>
                <small className="text-danger monospace">UNIT_ID: 2025</small>
             </div>
          </Col>

          {/* System Status (Decorative) */}
          <Col md={4} className="text-center mb-3 mb-md-0">
            <div className="system-status">
                <span className="status-dot"></span>
                <span className="scrolling-text monospace">SYSTEM STATUS: <span className="text-danger">ONLINE</span> // ALL SYSTEMS NOMINAL</span>
            </div>
          </Col>

          {/* Copyright */}
          <Col md={4} className="text-center text-md-end">
            <p className="mb-0 text-secondary monospace" style={{fontSize: '0.8rem'}}>
                &copy; 2025 <span className="text-white">NvalDev</span>. 
                <br/>
                <span className="text-danger">SECURE_CONNECTION</span>
            </p>
          </Col>
        </Row>
      </Container>
    </motion.footer>
  );
};

export default Footer;