import {useState} from 'react';
import { useParams } from 'react-router-dom';
import withAuth from '../hoc/withAuth'
import Wishlist from '../components/Wishlist';
import ProfileLayout from '../components/ProfileLayout';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';


const ListPage = () => {
  const { username } = useParams();


  return (
    <ProfileLayout username={username}>
      <Wishlist />
    </ProfileLayout>
  );
}


export default withAuth(ListPage);