import React from 'react';
import {parseCookies} from 'nookies';

const Account = () => {
    return (
        <div>
            Account page
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

   return {
       props: {}
   }
}

export default Account;
