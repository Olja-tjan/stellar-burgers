import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { selectOrders } from '../../services/slices/ordersSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectOrders);

  return <ProfileOrdersUI orders={orders} />;
};
