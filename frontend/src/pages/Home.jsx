import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="hero" style={{ backgroundImage: 'url("https://res.cloudinary.com/djh4uce6p/image/upload/v1770573479/view-hawaiian-shirts-with-coffee-cup-hat_rng96t.jpg")' }}>
                <div className="hero-content">
                    <h1>SUMMER COLLECTION 2026</h1>
                    <p>Discover the latest trends in fashion. Elevate your style.</p>
                    <Link to="/shop" className="btn">Shop Now</Link>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="section container">
                <h2 className="section-title">Categories</h2>
                <div className="grid grid-cols-4">
                    {['Men', 'Women', 'Kids', 'Accessories'].map((cat) => (
                        <Link to={`/shop?category=${cat}`} key={cat} className="category-card">
                            <div
                                className="category-background"
                                style={{ backgroundImage: `url(https://res.cloudinary.com/djh4uce6p/image/upload/v1770573762/3734_l4etly.jpg)` }}
                            ></div>
                            <span className="category-label">{cat}</span>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
