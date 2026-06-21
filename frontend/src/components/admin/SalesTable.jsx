import Badge from '../ui/Badge';
export default function SalesTable({ sales = [] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Venda</th>
            <th>Cliente</th>
            <th>Pagamento</th>
            <th>Valor</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {sales.length ? (
            sales.map((sale) => (
              <tr key={sale.id}>
                <td>
                  <b>#{sale.code}</b>
                </td>
                <td>{sale.customer?.name || 'Cliente avulso'}</td>
                <td>
                  <Badge color="blue">{sale.payment}</Badge>
                </td>
                <td>R$ {sale.total.toFixed(2).replace('.', ',')}</td>
                <td>{new Date(sale.createdAt).toLocaleDateString('pt-BR')}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Ainda não há vendas no balcão.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
