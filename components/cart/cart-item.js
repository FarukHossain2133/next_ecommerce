
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Card } from '@material-ui/core';
import Image from 'next/image';
import { parseCookies } from 'nookies';
import Toaster from 'components/ui/Tostify';


export default function InteractiveList({ product, setinitProduct }) {
    const { productId: { name, description, mediaUrl, price, _id }, quantity } = product;

    const { token } = parseCookies();

    const handleRemove = async () => {
        const res = await fetch("/api/cart", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                 productId: _id,
            })
        });

        const res2 = await res.json();
        if (res2.error) {
            // Error  toster
            Toaster({
                message: res2.error,
                type: 'error',
            })
        } else {
            // success toster
            Toaster({
                message: res2.message,
                type: 'success',
            })
            setinitProduct(res2.products)
        }

       }

    return (
        <Card style={{ marginBottom: "2px" }}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <Image
                            width={40}
                            height={40}
                            src={mediaUrl}
                            alt={name}
                        />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={name}
                    secondary={<span>{quantity} X {price} </span>}
                />
                <ListItemSecondaryAction>
                    <IconButton onClick={handleRemove} edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>

        </Card>
    );
}




// import React from 'react'

// const CartItem = ({ product }) => {
//     const { productId: { name, description, mediaUrl, price }, quantity, _id } = product;
//     return (
//         <div style={{
//             display: "flex", 
//             flexDirection: "row",
//              justifyContent: "flex-start", 
//              backgroundColor: "#eee",
//               marginBottom: "15px",
//               alignItems: 'flex-start'
//               }}>
//             <img
//                 src={mediaUrl}
//                 style={{width: "100px", height:"100px"}}
//             />
//             <div style={{marginLeft: '15px'}}>
//                 <h6>{name}</h6>
//                 <h6>{quantity} X {price}</h6>
//             </div>
//         </div>
//     )
// }

// export default CartItem
