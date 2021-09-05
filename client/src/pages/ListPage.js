import {useState} from 'react';
import { useParams } from 'react-router-dom';
import withAuth from '../hoc/withAuth'
import ShoppingList from '../components/ShoppingList';
import ProfileLayout from '../components/ProfileLayout';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';


const ListPage = () => {
  const { username } = useParams();


  return (
    <ProfileLayout username={username}>
      <ShoppingList/>
    </ProfileLayout>
  );
}


export default withAuth(ListPage);