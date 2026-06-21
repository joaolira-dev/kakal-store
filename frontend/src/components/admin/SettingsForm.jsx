import { useState } from 'react';
import Input from '../ui/Input';
export default function SettingsForm({ settings = {}, onSave }) {
  const [form, setForm] = useState(settings);
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  return (
    <form
      className="settings-form admin-card"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(form);
      }}
    >
      <h2>Informações da loja</h2>
      <div className="form-grid">
        <Input label="Nome da loja" name="name" value={form.name || ''} onChange={change} />
        <Input label="WhatsApp" name="whatsapp" value={form.whatsapp || ''} onChange={change} />
        <Input label="Instagram" name="instagram" value={form.instagram || ''} onChange={change} />
        <Input label="E-mail" name="email" value={form.email || ''} onChange={change} />
        <Input label="Endereço" name="address" value={form.address || ''} onChange={change} />
        <Input
          label="Cor principal"
          name="primaryColor"
          value={form.primaryColor || ''}
          onChange={change}
        />
      </div>
      <label className="field">
        <span>Mensagem do WhatsApp</span>
        <textarea name="whatsappMessage" value={form.whatsappMessage || ''} onChange={change} />
      </label>
      <button className="btn btn-primary">Salvar configurações</button>
    </form>
  );
}
