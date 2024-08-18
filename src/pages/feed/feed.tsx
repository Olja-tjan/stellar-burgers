import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedThunk, selectLoadFeed, selectOrdersFeed } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectOrdersFeed);
  const feedRequest = useSelector(selectLoadFeed)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedThunk());
  }, []);

  if (!orders.length || feedRequest === true) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeedThunk())
      }}
    />
  );
};
