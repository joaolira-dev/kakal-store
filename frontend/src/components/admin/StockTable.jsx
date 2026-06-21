import Badge from '../ui/Badge';
export default function StockTable({ products }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Estoque atual</th>
            <th>Estoque mínimo</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <b>{product.name}</b>
              </td>
              <td>{product.stock}</td>
              <td>{product.minStock || 4}</td>
              <td>
                <Badge color={product.stock <= (product.minStock || 4) ? 'yellow' : 'green'}>
                  {product.stock <= (product.minStock || 4) ? 'Estoque baixo' : 'Em estoque'}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
