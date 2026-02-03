import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { SectionWrapper } from "../components/MotionWrappers";
import { motion, AnimatePresence } from "framer-motion";
import { GlitchText } from "../components/GlitchText";
import { useLanguage } from "../context/LanguageContext";
import { RunnableText } from "../components/text/RunnableText";
import "../css/contact.css";

// Reusable Input Component with sound effect/animation
const InteractiveInput = ({ label, type = "text", placeholder, as, rows, value, onChange, listening }) => {
    const [focused, setFocused] = useState(false);

    return (
        <Form.Group className="mb-4">
            <Form.Label className="monospace text-danger text-xs d-flex align-items-center">
                <RunnableText text={label} />
                {focused && <span className="ms-auto text-success" style={{fontSize: '10px'}}><RunnableText text={listening} /></span>}
            </Form.Label>
            <motion.div
                animate={focused ? { scale: 1.02 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <Form.Control 
                    as={as}
                    rows={rows}
                    type={type} 
                    // Placeholders MUST be strings. If t() returns Base|Reading, we strip Reading.
                    placeholder={placeholder.includes('|') ? placeholder.split('|')[0] : placeholder} 
                    className="robotic-input" 
                    required 
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    value={value}
                    onChange={onChange}
                />
            </motion.div>
        </Form.Group>
    );
};

const Contact = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
      // Simulate checking/validating sound could go here
      setFormData({...formData, [e.target.type === 'textarea' ? 'message' : e.target.type]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate complex transmission
    const btn = e.nativeEvent.submitter;
    if(btn) btn.innerHTML = "ENCRYPTING & SENDING...";
    
    setTimeout(() => {
        setSubmitted(true);
        // Reset after 4 seconds
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', message: '' });
            // For button text injection which is innerHTML, we should use base text only to avoid HTML issues or use ReactDOM.render
    // But since this is a simulation, let's just strip furigana for the button innerHTML update
    if(btn) {
        const sendText = t('contact.sendBtn');
        const cleanSendText = sendText.includes('|') ? sendText.split('|')[0] : sendText;
        btn.innerHTML = `${cleanSendText} <i class="bi bi-broadcast ms-2"></i>`;
    }
        }, 4000);
    }, 1500);
  };

  return (
    <SectionWrapper className="contact-section" id="contact" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container>
        <Row className="justify-content-center">
          {/* LEFT PANEL: TRANSMISSION FORM */}
          <Col lg={7}>
            <div className="mech-border p-5 h-100 position-relative" style={{background: 'rgba(5,5,5,0.9)', backdropFilter: 'blur(5px)'}}>
                {/* Decorative Tech Lines */}
                <div className="tech-line-top-left"></div>
                <div className="tech-line-bottom-right"></div>
                
                <motion.div 
                    className="mb-5"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="d-flex align-items-center mb-2">
                        <div className="status-blink me-2"></div>
                        <small className="text-danger monospace">
                            <RunnableText text={t('contact.uplinkReady')} /> 
                            {submitted ? <RunnableText text={t('contact.busy')} /> : ''}
                        </small>
                    </div>
                    <h2 className="section-title text-start mb-0">
                        <GlitchText text={t("contact.title")} />
                    </h2>
                    <p className="text-secondary monospace mt-2">
                        <RunnableText text={t("contact.subtitle")} />
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!submitted ? (
                        <motion.form 
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            onSubmit={handleSubmit}
                        >
                            <Row>
                                <Col md={6}>
                                    <InteractiveInput 
                                        label={t("contact.nameLabel")} 
                                        placeholder={t("contact.namePlace")}
                                        listening={t("contact.listening")} 
                                    />
                                </Col>
                                <Col md={6}>
                                    <InteractiveInput 
                                        label={t("contact.emailLabel")} 
                                        type="email"
                                        placeholder={t("contact.emailPlace")}
                                        listening={t("contact.listening")} 
                                    />
                                </Col>
                            </Row>

                            <InteractiveInput 
                                label={t("contact.msgLabel")}
                                as="textarea" 
                                rows={5}
                                placeholder={t("contact.msgPlace")}
                                listening={t("contact.listening")} 
                            />

                            <motion.button 
                                type="submit" 
                                className="robotic-btn w-100 mt-3"
                                whileHover={{ scale: 1.02, letterSpacing: "4px" }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <RunnableText text={t("contact.sendBtn")} /> <i className="bi bi-broadcast ms-2"></i>
                            </motion.button>
                        </motion.form>
                    ) : (
                       <motion.div 
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="success-transmission text-center"
                        >
                            <h3 className="monospace text-success mb-3"><RunnableText text={t("contact.successTitle")} /></h3>
                            <p className="monospace text-white mb-4">
                                <RunnableText text={t("contact.successMsg")} />
                            </p>
                            <div className="spinner-border text-success" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                       </motion.div> 
                    )}
                </AnimatePresence>
            </div>
          </Col>
        </Row>
      </Container>
    </SectionWrapper>
  );
};

export default Contact;
