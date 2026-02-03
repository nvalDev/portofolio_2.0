import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// HOF for Sections
export const SectionWrapper = ({ children, className, id }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
        visible: { 
          opacity: [0, 1, 0, 1],
          y: 0,
          filter: ["blur(10px)", "blur(0px)"],
          skewX: [0, 5, -5, 0],
          x: [0, 10, -10, 0],
          transition: { 
            duration: 0.8, 
            times: [0, 0.4, 0.5, 0.6, 1],
            ease: "circOut" 
          }
        }
      }}
      className={className}
      id={id}
    >
      {children}
    </motion.section>
  );
};

export const RevealText = ({ text, className }) => {
  return (
    <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
            visible: { transition: { staggerChildren: 0.05 } },
            hidden: {}
        }}
    >
        {text.split("").map((char, index) => (
             <motion.span
                key={index}
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                }}
             >
                {char}
             </motion.span>
        ))}
    </motion.div>
  );
};
