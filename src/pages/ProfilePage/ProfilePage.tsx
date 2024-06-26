import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks/redux';
import * as styles from './ProfilePage.module.css';
import PersonalInfo from '../../components/ProfilePage/PersonalInfo';
import AddressesInfo from '../../components/ProfilePage/AddressesInfo';
import Password from '../../components/ProfilePage/Password';

function ProfilePage() {
  const { customer } = useAppSelector((state) => state.customerReducer);

  if (!customer) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.profile}>
      <PersonalInfo customer={customer} />
      <AddressesInfo customer={customer} />
      <Password customer={customer} />
    </div>
  );
}

export default ProfilePage;
