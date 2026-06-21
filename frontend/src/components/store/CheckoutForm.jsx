import Input from '../ui/Input';
export default function CheckoutForm({ form, onChange }) {
  return (
    <div className="checkout-form">
      <h2>1. Identificação</h2>
      <div className="form-grid">
        <Input label="Nome completo" name="name" value={form.name} onChange={onChange} required />
        <Input label="WhatsApp" name="phone" value={form.phone} onChange={onChange} required />
        <Input label="E-mail" name="email" type="email" value={form.email} onChange={onChange} />
      </div>
      <h2>2. Endereço de entrega</h2>
      <div className="form-grid">
        <Input label="CEP" name="zip" value={form.zip} onChange={onChange} required />
        <Input
          label="Endereço completo"
          name="address"
          value={form.address}
          onChange={onChange}
          required
        />
      </div>
      <h2>3. Forma de pagamento</h2>
      <div className="payment-options">
        {['PIX', 'Cartão de crédito', 'Dinheiro'].map((payment) => (
          <label key={payment}>
            <input
              type="radio"
              name="payment"
              value={payment}
              checked={form.payment === payment}
              onChange={onChange}
            />
            {payment}
          </label>
        ))}
      </div>
    </div>
  );
}
