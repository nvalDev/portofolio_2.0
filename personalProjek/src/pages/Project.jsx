import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import VanillaTilt from 'vanilla-tilt';
import { SectionWrapper } from "../components/MotionWrappers";
import { motion } from "framer-motion";
import { GlitchText } from "../components/GlitchText";
import { useLanguage } from "../context/LanguageContext";
import { RunnableText } from "../components/text/RunnableText";
import "../css/project.css";
 import project1Img from "../assets/project-1.png";

// Tilt Wrapper Component
const TiltCard = ({ children, options, className }) => {
  const tiltRef = React.useRef(null);
  React.useEffect(() => {
    VanillaTilt.init(tiltRef.current, options || { max: 5, speed: 400, scale: 1.02, glare: true, "max-glare": 0.2 });
  }, [options]);
  return <div ref={tiltRef} className={className}>{children}</div>;
};

const Project = () => {
    const { t } = useLanguage();
    const tiltOptions = {
        max: 5,
        speed: 400,
        glare: true,
        "max-glare": 0.2, // Reduced glare for subtler effect
        scale: 1.01
    };

    const projects = [
        {
            id: "M_01",
            title: "nvalTravel",
            description: "Web travel mini yang visual nya keren dan simpel",
            status: "COMPLETE",
            tags: ["PHP", "Bootstrap", "JS"],
            image: project1Img,
            link: "https://example.com/project-zero"
        },
        {
            id: "M_02",
            title: "CYBER_COMMERCE",
            description: "High-speed tactical e-commerce platform with automated logistics tracking.",
            status: "IN_PROGRESS",
            tags: ["Next.js", "Redis", "Stripe"],
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop", 
            link: "https://example.com/op-commerce"
        },
        {
            id: "M_03",
            title: "ARCHIVE_SYS",
            description: "Personal personnel file and mission archive system. Optimized for data retrieval.",
            status: "ONLINE",
            tags: ["React", "Three.js", "Framer"],
            image: "https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=1000&auto=format&fit=crop",
            link: "https://example.com/archive"
        }
    ];

    // SVG Placeholder Generator
    const getPlaceholder = (id) => `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Crect width='100%25' height='100%25' fill='%23050505'/%3E%3Cpath d='M0 0h600v400H0z' fill='none' stroke='%23333' stroke-width='2' stroke-dasharray='10 5'/%3E%3Ctext x='50%25' y='50%25' font-family='monospace' font-size='40' fill='%23333' text-anchor='middle' dominant-baseline='middle'%3E${id}%3C/text%3E%3Cpath d='M0 0 L50 0 L0 50 Z' fill='%23ff0033' opacity='0.5'/%3E%3C/svg%3E`;

    const [searchQuery, setSearchQuery] = useState("");

    const filteredProjects = projects.filter(project => 
        project.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <SectionWrapper className="project-section" id="project">
            <Container>
                {/* Header Block */}
                <Row className="mb-5 align-items-end">
                    <Col md={6}>
                        <div className="section-header-wrapper" style={{borderLeft: '4px solid #ff0033', paddingLeft: '20px'}}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h6 className="text-danger monospace mb-0"><RunnableText text={t("project.header")} /></h6>
                                <h2 className="section-title text-start mb-0">
                                    <GlitchText text={t("project.title")} />
                                </h2>
                            </motion.div>
                        </div>
                    </Col>
                    
                    {/* Search Input */}
                    <Col md={6} className="text-end mt-4 mt-md-0">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            style={{ position: 'relative', maxWidth: '300px', marginLeft: 'auto' }}
                        >
                            <input 
                                type="text" 
                                placeholder={t("project.searchPlaceholder")}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    background: 'rgba(0,0,0,0.3)',
                                    border: '1px solid var(--color-primary)',
                                    color: 'var(--color-text-main)',
                                    padding: '10px 15px',
                                    fontFamily: 'var(--font-mono)',
                                    textTransform: 'uppercase',
                                    outline: 'none',
                                    clipPath: 'polygon(0 0, 100% 0, 100% 80%, 95% 100%, 0 100%)'
                                }}
                            />
                            <div style={{
                                position: 'absolute', top: 0, right: 0, bottom: 0, width: '30px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none'
                            }}>
                                {/* Futuristic Search Icon SVG */}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="11" cy="11" r="7" stroke="var(--color-primary)" strokeWidth="2"/>
                                    <path d="M20 20L17 17" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round"/>
                                    {/* Scanning Animation Line inside lens */}
                                    <motion.path 
                                        d="M7 11H15" 
                                        stroke="var(--color-primary)" 
                                        strokeWidth="1" 
                                        strokeOpacity="0.5"
                                        animate={{ y: [-3, 3, -3] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    />
                                </svg>
                            </div>
                        </motion.div>
                    </Col>
                </Row>

                {/* Projects Grid */}
                <Row>
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project, index) => (
                            <Col lg={4} md={6} className="mb-5" key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                >
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                        <TiltCard options={tiltOptions} className="h-100 robotic-card">
                                            {/* Card Header ID */}
                                            <div className="card-header-act">
                                                <span className="monospace text-xs">{project.id}</span>
                                                <div className="d-flex align-items-center gap-2">
                                                    <span className="monospace text-xs" style={{opacity: 0.7}}><RunnableText text={t("project.preview")} /></span>
                                                    <span className={`status-dot ${project.status === 'ONLINE' ? 'blink' : ''}`}></span>
                                                </div>
                                            </div>

                                            {/* Image Container with Overlay */}
                                            <div className="card-img-container">
                                                <img 
                                                    src={project.image || getPlaceholder(project.title)} 
                                                    alt={project.title} 
                                                    className="w-100" 
                                                    onError={(e) => { e.target.onerror = null; e.target.src = getPlaceholder(project.title) }}
                                                />
                                                <div className="img-overlay">
                                                    <div className="overlay-content text-center">
                                                        <span className="view-btn mb-2 d-inline-block"><RunnableText text={t("project.viewBtn")} /></span>
                                                        <div className="scan-line-anim"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card-body-robotic">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <h3 className="project-title mb-0">{project.title}</h3>
                                                    <span className="status-badge">
                                                        <RunnableText text={t(`project.status.${project.status === 'IN_PROGRESS' ? 'inProgress' : project.status.toLowerCase()}`)} />
                                                    </span>
                                                </div>
                                                
                                                <p className="project-desc mb-4">{project.description}</p>
                                                
                                                <div className="tech-stack">
                                                    {project.tags.map((tag, i) => (
                                                        <span key={i} className="tech-tag">[{tag}]</span>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            {/* Decorative Corner */}
                                            <div className="corner-decor"></div>
                                        </TiltCard>
                                    </a>
                                </motion.div>
                            </Col>
                        ))
                    ) : (
                        <Col className="text-center py-5">
                                <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }}
                                className="monospace"
                                style={{ color: 'var(--color-text-muted)' }}
                            >
                                <RunnableText text={t("project.notFound")} />
                            </motion.div>
                        </Col>
                    )}
                </Row>
            </Container>
        </SectionWrapper>
    );
};

export default Project;
