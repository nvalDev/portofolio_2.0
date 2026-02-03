import { GlitchText } from "../components/GlitchText";
import { SectionWrapper } from "../components/MotionWrappers";
import { motion } from "framer-motion";
import CyberCard from "../components/CyberCard";
import { useLanguage } from "../context/LanguageContext";
import { RunnableText } from "../components/text/RunnableText";
import "../css/about.css";

const About = () => {
    const { t } = useLanguage();
    const skills = [
        "React.js", "Node.js", "Express", "MongoDB",
        "Three.js", "Framer Motion", "TypeSys", "UI Architecture"
    ];

  return (
    <SectionWrapper className="about-section" id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="row align-items-center">
            
          {/* Main Info Card */}
          <div className="col-lg-6">
            <CyberCard className="about-content p-3 p-lg-4 interactive-card">
              <h1 className="section-title mb-3 mb-md-4">
                <GlitchText text={t("about.title")} speed={40} />
              </h1>
              <p className="about-text lead text-danger">
                <GlitchText text={t("about.operative")} speed={20} />
                <RunnableText text={t("about.role")} />
              </p>
              <p className="about-text">
                <RunnableText text={t("about.description")} />
              </p>
              
              <div className="skills-section mt-3 mt-lg-4">
                <h3 className="section-title" style={{fontSize: '1rem', border: 'none', background: 'transparent', padding:0, marginBottom: '1rem'}}>
                    <span style={{color: 'var(--color-primary)'}}>{">"}</span> <RunnableText text={t("about.skillsTitle")} />
                </h3>
                <motion.ul 
                    className="skills-list"
                    style={{padding: 0, listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                >
                  {skills.map((skill, index) => (
                    <motion.li 
                        key={index}
                        variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 }
                        }}
                        whileHover={{ scale: 1.1, backgroundColor: "var(--color-primary)", color: "black", boxShadow: "0 0 10px var(--color-primary)" }}
                        style={{ cursor: 'crosshair', padding: '5px 10px',  border: '1px solid #333', background: 'rgba(0,0,0,0.5)' }}
                    >
                        {skill}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </CyberCard>
          </div>

          {/* Image/Profile Card */}
          <div className="col-lg-6 mt-4 mt-lg-0">
            <CyberCard delay={0.3} className="interactive-card">
              <div className="position-relative" style={{ overflow: 'hidden' }}>
                  <img
                    src="/hacker.jpeg"
                    alt="Profile"
                    className="img-fluid"
                    style={{width: '100%', filter: 'grayscale(100%) contrast(1.2)'}}
                  />
                  {/* Image Glitch Overlay */}
                  <div style={{
                      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                      background: 'linear-gradient(rgba(255, 0, 51, 0.1), transparent)',
                      pointerEvents: 'none'
                  }}></div>
              </div>
            </CyberCard>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
