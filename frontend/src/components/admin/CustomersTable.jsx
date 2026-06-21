export default function CustomersTable({ customers = [] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>WhatsApp</th>
            <th>E-mail</th>
            <th>Pedidos</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>
                <b>{customer.name}</b>
              </td>
              <td>{customer.phone}</td>
              <td>{customer.email || '—'}</td>
              <td>{customer._count?.orders || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
