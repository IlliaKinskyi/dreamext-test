import { useParams } from 'react-router-dom';
import ApiProduct from '../../components/modules/Product/ApiProduct';
import FormProduct from '../../components/modules/Product/FormProduct';

export default function ProductPage() {
  const { id } = useParams();

  return <div>{+id! < 1000000 ? <ApiProduct id={id} /> : <FormProduct id={id} />}</div>;
}
