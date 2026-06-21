import { Edit3, MoreHorizontal, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import { asset } from '../../data';
export default function ProductTable({ products, onDelete }) {
  return (
    <div className="table-wrap product-table">
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="product-name">
                <img src={asset('colecao-produtos.png')} />
                <b>{product.name}</b>
              </td>
              <td>{product.category?.name || '—'}</td>
              <td>R$ {(product.salePrice || product.price).toFixed(2).replace('.', ',')}</td>
              <td>
                <b className={product.stock <= product.minStock ? 'stock-low' : ''}>
                  {product.stock} un.
                </b>
              </td>
              <td>
                <Badge color={product.active !== false ? 'green' : 'gray'}>
                  {product.active !== false ? 'Ativo' : 'Inativo'}
                </Badge>
              </td>
              <td className="row-actions">
                <Link to={`/admin/produtos/${product.id}/editar`}>
                  <Edit3 />
                </Link>
                <button onClick={() => onDelete?.(product)}>
                  <Trash2 />
                </button>
                <button>
                  <MoreHorizontal />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
