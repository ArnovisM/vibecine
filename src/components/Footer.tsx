import React from 'react';
import { Film, Heart, Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="glass" style={{
            marginTop: 'auto',
            padding: '2rem 0',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    textAlign: 'center'
                }}>
                    {/* Main content */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.95rem',
                        color: 'var(--text-secondary)'
                    }}>
                        <span>Created with</span>
                        <Heart size={16} fill="var(--primary)" color="var(--primary)" />
                        <span>by</span>
                        <span style={{
                            color: 'var(--primary)',
                            fontWeight: 'bold'
                        }}>
                            Arnovis Montero
                        </span>
                    </div>

                    {/* Subtitle */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)'
                    }}>
                        <Film size={14} />
                        <span>Passionate developer and cinephile</span>
                    </div>

                    {/* Social Links */}
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        marginTop: '0.5rem'
                    }}>
                        <a
                            href="https://github.com/ArnovisM"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: 'var(--text-secondary)',
                                transition: 'color 0.2s ease, transform 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = 'var(--primary)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'var(--text-secondary)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/arnovis-montero-312223233"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: 'var(--text-secondary)',
                                transition: 'color 0.2s ease, transform 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = 'var(--primary)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'var(--text-secondary)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <Linkedin size={20} />
                        </a>
                    </div>

                    {/* Copyright */}
                    <div style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        marginTop: '0.5rem'
                    }}>
                        © {new Date().getFullYear()} MovieMood. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
