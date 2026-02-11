import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send to backend
        console.log("Contact Form Submitted:", formData);
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="container section">
            <h2 className="section-title">Get in Touch</h2>
            <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-light)' }}>
                    Have a question or feedback? We'd love to hear from you. Fill out the form below or reach us via our contact details.
                </p>
            </div>

            <div className="contact-wrapper grid grid-cols-2">
                {/* Contact Info */}
                <div className="contact-info-card">
                    <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem', color: 'var(--primary-color)' }}>Contact Information</h3>

                    <div className="contact-item">
                        <div className="contact-icon">
                            <FaPhone />
                        </div>
                        <div>
                            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>Phone</h4>
                            <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>+94 112 555 555
                                <br />
                                +94 112 555 611
                            </p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-icon">
                            <FaEnvelope />
                        </div>
                        <div>
                            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>Email</h4>
                            <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>support@trevia.com</p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-icon">
                            <FaMapMarkerAlt />
                        </div>
                        <div>
                            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>Location</h4>
                            <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>Main Branch - Colombo
                                <br />
                                Central Branch - Kandy
                                <br />
                                Southern Branch - Galle
                            </p>
                        </div>
                    </div>

                    {/* Separator Line */}
                    <hr style={{ border: 'none', borderTop: '2px solid #25D366', margin: '2rem 0', opacity: 0.6 }} />
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', color: 'var(--primary-color)' }}>Chat with Us</h3>
                    <a href="https://wa.me/94755234245" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="contact-item" style={{ cursor: 'pointer', transition: 'transform 0.2s ease' }}>
                            <div className="contact-icon" style={{ backgroundColor: 'rgba(37, 211, 102, 0.1)' }}>
                                <FaWhatsapp style={{ color: '#25D366' }} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>WhatsApp</h4>
                                <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>+94 75 523 4245</p>
                            </div>
                        </div>
                    </a>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="contact-form-card">
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your Name"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Your Email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Subject</label>
                        <input
                            type="text"
                            name="subject"
                            className="form-control"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder="Subject"
                        />
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea
                            name="message"
                            className="form-control"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="How can we help?"
                        ></textarea>
                    </div>
                    <button type="submit" className="btn" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        Send Message <FaPaperPlane style={{ fontSize: '0.9rem' }} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
