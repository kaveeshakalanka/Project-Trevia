import { useState } from 'react';

const PaymentForm = ({ onSubmit }) => {
    const [cardDetails, setCardDetails] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: ''
    });
    const [cardType, setCardType] = useState('');

    // Detect card type from number
    const detectCardType = (number) => {
        const cleaned = number.replace(/\s/g, '');
        if (cleaned.startsWith('4')) return 'visa';
        if (cleaned.startsWith('5')) return 'mastercard';
        if (cleaned.startsWith('3')) return 'amex';
        return '';
    };

    // Format card number with spaces
    const formatCardNumber = (value) => {
        const cleaned = value.replace(/\s/g, '');
        const chunks = cleaned.match(/.{1,4}/g);
        return chunks ? chunks.join(' ') : cleaned;
    };

    // Format expiry with slash
    const formatExpiry = (value) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length >= 2) {
            return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
        }
        return cleaned;
    };

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === 'number') {
            value = value.replace(/\D/g, '').slice(0, 16);
            value = formatCardNumber(value);
            setCardType(detectCardType(value));
        }

        if (name === 'expiry') {
            value = formatExpiry(value.replace(/\D/g, '').slice(0, 4));
        }

        if (name === 'cvc') {
            value = value.replace(/\D/g, '').slice(0, 3);
        }

        setCardDetails({ ...cardDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(cardDetails);
    };

    return (
        <form onSubmit={handleSubmit} className="payment-form">
            <h3>Payment Details</h3>

            {/* Payment Method Icons */}
            <div className="payment-methods">
                <span className={`payment-icon ${cardType === 'visa' ? 'active' : ''}`}>💳 Visa</span>
                <span className={`payment-icon ${cardType === 'mastercard' ? 'active' : ''}`}>💳 Mastercard</span>
                <span className={`payment-icon ${cardType === 'amex' ? 'active' : ''}`}>💳 Amex</span>
            </div>

            <div className="form-group">
                <label>Cardholder Name *</label>
                <input
                    name="name"
                    value={cardDetails.name}
                    onChange={handleChange}
                    required
                    className="form-control"
                    placeholder="John Doe"
                />
            </div>

            <div className="form-group">
                <label>Card Number *</label>
                <input
                    name="number"
                    value={cardDetails.number}
                    onChange={handleChange}
                    required
                    className="form-control"
                    placeholder="0000 0000 0000 0000"
                />
                {cardType && <span className="card-type-indicator">{cardType.toUpperCase()} detected</span>}
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Expiry Date *</label>
                    <input
                        name="expiry"
                        value={cardDetails.expiry}
                        onChange={handleChange}
                        required
                        className="form-control"
                        placeholder="MM/YY"
                    />
                </div>
                <div className="form-group">
                    <label>CVC *</label>
                    <input
                        name="cvc"
                        value={cardDetails.cvc}
                        onChange={handleChange}
                        required
                        className="form-control"
                        placeholder="123"
                    />
                </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Complete Payment
            </button>
        </form>
    );
};

export default PaymentForm;
