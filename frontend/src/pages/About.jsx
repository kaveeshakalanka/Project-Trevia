
const About = () => {
    return (
        <div className="container section">
            <h2 className="section-title">About Trevia</h2>

            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
                <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#555' }}>
                    Welcome to <strong>Trevia</strong>, your ultimate destination for premium fashion.
                    Defined by elegance and driven by quality, we curate collections that inspire confidence and style.
                </p>
                <div style={{ width: '100px', height: '4px', background: 'var(--accent-color)', margin: '0 auto' }}></div>
            </div>

            <div className="grid grid-cols-2" style={{ gap: '4rem', alignItems: 'center' }}>
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        alt="Our Store"
                        style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                    />
                </div>
                <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Our Story</h3>
                    <p style={{ marginBottom: '1rem', color: '#666' }}>
                        Founded in 2025, Trevia began with a simple mission: to make high-quality fashion accessible without compromising on style.
                        What started as a small boutique concept has grown into a global online store, serving customers who appreciate efficiency and elegance.
                    </p>
                    <p style={{ color: '#666' }}>
                        We believe that clothing is more than just fabric; it's an expression of identity.
                        That's why we meticulously select every piece in our collection to ensure it meets our high standards of design and durability.
                    </p>
                </div>
            </div>

            <div style={{ marginTop: '6rem' }}>
                <h3 className="section-title" style={{ fontSize: '1.5rem' }}>Why Choose Us?</h3>
                <div className="grid grid-cols-3" style={{ textAlign: 'center' }}>
                    <div style={{ padding: '2rem', background: '#f9f9f9', borderRadius: '8px' }}>
                        <h4 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Premium Quality</h4>
                        <p style={{ color: '#777' }}>Hand-picked fabrics and expert craftsmanship in every item.</p>
                    </div>
                    <div style={{ padding: '2rem', background: '#f9f9f9', borderRadius: '8px' }}>
                        <h4 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Fast Shipping</h4>
                        <p style={{ color: '#777' }}>Global delivery with detailed tracking for your peace of mind.</p>
                    </div>
                    <div style={{ padding: '2rem', background: '#f9f9f9', borderRadius: '8px' }}>
                        <h4 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>24/7 Support</h4>
                        <p style={{ color: '#777' }}>Our dedicated team is always here to assist you with any queries.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
