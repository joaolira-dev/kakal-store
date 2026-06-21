import { Plus, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import CustomersTable from '../../components/admin/CustomersTable';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import api from '../../services/api';
export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]),
    [open, setOpen] = useState(false),
    [form, setForm] = useState({ name: '', phone: '', email: '' });
  const load = () =>
    api
      .get('/customers')
      .then(({ data }) => setCustomers(data))
      .catch(() =>
        setCustomers([
          {
            id: 1,
            name: 'Maria Eduarda',
            phone: '(83) 99999-0000',
            email: 'maria@exemplo.com',
            _count: { orders: 1 },
          },
        ])
      );
  useEffect(load, []);
  async function save(event) {
    event.preventDefault();
    try {
      await api.post('/customers', form);
      setOpen(false);
      load();
    } catch (error) {
      alert(error.response?.data?.message || 'Inicie o backend para salvar o cliente.');
    }
  }
  return (
    <AdminLayout
      title="Clientes"
      action={
        <button className="btn btn-primary admin-action" onClick={() => setOpen(true)}>
          <Plus /> Adicionar cliente
        </button>
      }
    >
      <section className="admin-card management">
        <div className="management-top">
          <div>
            <h2>Clientes queridos</h2>
            <p>Histórico de compras e contato sempre à mão.</p>
          </div>
          <span className="large-icon">
            <Users />
          </span>
        </div>
        <CustomersTable customers={customers} />
      </section>
      <Modal open={open} onClose={() => setOpen(false)} title="Novo cliente">
        <form className="stack-form" onSubmit={save}>
          <Input
            label="Nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="WhatsApp"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Input
            label="E-mail"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <button className="btn btn-primary">Salvar cliente</button>
        </form>
      </Modal>
    </AdminLayout>
  );
}
