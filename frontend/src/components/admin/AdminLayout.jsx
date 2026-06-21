import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
export default function AdminLayout({ children, title, action }) {
  return (
    <div className="admin-shell">
      <AdminSidebar />
      <main className="admin-main">
        <AdminHeader title={title} action={action} />
        {children}
      </main>
    </div>
  );
}
