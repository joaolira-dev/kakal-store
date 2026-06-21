import { Navigate } from 'react-router-dom';
export default function PrivateRoute({ children }) {
  return localStorage.getItem('kakal_admin_token') ? (
    children
  ) : (
    <Navigate to="/admin/login" replace />
  );
}
