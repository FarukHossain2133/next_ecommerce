import React from 'react';
import {parseCookies} from 'nookies';
import Profile from 'components/account/profile';
import OrdersList from 'components/account/OrdersList';
import UserRoles from 'components/account/userRole';
import baseUrl from 'helpers/baseUrl';

const Account = ({orders, error}) => {
    if(error) return <p style={{textAlign: 'center', color: "red"}}>{error}</p>
    return (
        <div style={{margin:"0 auto"}}>
           <Profile/>
           <br/>
           <OrdersList orders={orders}/>
           <br/>
           <UserRoles/>
        </div>
    )
}

export async function getServerSideProps(ctx){
   const {token} = parseCookies(ctx);
   if(!token){
       const {res} = ctx;
       res.writeHead(302, {location: '/login'});
       res.end();
   }

  const res = await fetch(`${baseUrl}/api/orders`, {
    headers: {
        "Authorization": "Bearer " + token
    },
  });
  const res2 = await res.json();
  console.log(res2);
  if(res2.error) return {props: {error: res2.error}}

   return {
       props: {orders: res2.orders}
   }
}

export default Account;
