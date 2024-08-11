import { Routes, Route, useLocation } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';

const App = () => {
  const location = useLocation();

  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile'>
          <Route index element={<Profile />} />
          <Route path='orders' element={<ProfileOrders />} />
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {backgroundLocation && (<Routes>
        <Route
          path='/feed/:number'
          element={
            <Modal title={''} onClose={() => { }}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title={''} onClose={() => { }}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <Modal title={''} onClose={() => { }}>
              <OrderInfo />
            </Modal>
          }
        />
      </Routes>
      )}
    </div>
  )
};

export default App;
