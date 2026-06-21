import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import SettingsForm from '../../components/admin/SettingsForm';
import api from '../../services/api';
const fallback = {
  name: 'Kakal Kids Store',
  whatsapp: '5583999999999',
  instagram: '@kakalkidsstore',
  email: 'atendimento@kakalkids.com.br',
  address: 'João Pessoa - PB',
  primaryColor: '#ff3f6c',
  whatsappMessage: 'Olá! Como podemos ajudar?',
};
export default function AdminSettings() {
  const [settings, setSettings] = useState(fallback);
  useEffect(() => {
    api
      .get('/settings')
      .then(({ data }) => setSettings(data))
      .catch(() => {});
  }, []);
  async function save(form) {
    try {
      const { data } = await api.put('/settings', form);
      setSettings(data);
      alert('Configurações salvas com carinho!');
    } catch {
      alert('Inicie o backend para salvar as configurações.');
    }
  }
  return (
    <AdminLayout title="Configurações">
      <SettingsForm settings={settings} onSave={save} />
    </AdminLayout>
  );
}
