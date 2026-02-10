// src/ExampleSeven/screens/CartScreen.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/CartSlice';
import { RootState } from '../redux/store';
// @ts-ignore: no declaration file for react-native-vector-icons/MaterialCommunityIcons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={26} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>My Cart</Text>
        <View style={{ width: 30 }} />
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty 🛒</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>₹{item.price} × {item.quantity}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => dispatch(removeFromCart(item.id))}>
                  <Icon name="delete" size={24} color="#FF4B55" />
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
          <View style={styles.footer}>
            <Text style={styles.total}>Total: ₹{total}</Text>
            <TouchableOpacity
              onPress={() => dispatch(clearCart())}
              style={styles.checkoutBtn}>
              <Text style={styles.checkoutText}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
    paddingHorizontal: 18,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 18,
    marginTop: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    color: '#4A6CF7',
    marginTop: 4,
  },
  footer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 18,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  total: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  checkoutBtn: {
    backgroundColor: '#FF4B55',
    paddingVertical: 12,
    borderRadius: 10,
  },
  checkoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});




// import React from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { removeFromCart, clearCart } from '../redux/CartSlice';
// import { RootState } from '../redux/store';

// const CartScreen = () => {
//   const cart = useSelector((state: RootState) => state.cart?.items || []);
//   const dispatch = useDispatch();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🛒 Cart</Text>

//       {cart.length === 0 ? (
//         <Text style={styles.empty}>Your cart is empty</Text>
//       ) : (
//         <>
//           <FlatList
//             data={cart}
//             keyExtractor={item => item.id}
//             renderItem={({ item }) => (
//               <View style={styles.item}>
//                 <Text>{item.name}</Text>
//                 <Text>Qty: {item.quantity}</Text>
//                 <TouchableOpacity
//                   onPress={() => dispatch(removeFromCart(item.id))}
//                   style={styles.removeBtn}
//                 >
//                   <Text style={styles.removeText}>Remove</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           />

//           <TouchableOpacity
//             onPress={() => dispatch(clearCart())}
//             style={styles.clearBtn}
//           >
//             <Text style={styles.clearText}>Clear Cart</Text>
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
//   empty: { textAlign: 'center', marginTop: 50, fontSize: 18 },
//   item: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 12,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },
//   removeBtn: {
//     backgroundColor: '#dc3545',
//     padding: 8,
//     borderRadius: 6,
//   },
//   removeText: { color: '#fff' },
//   clearBtn: {
//     backgroundColor: '#333',
//     padding: 12,
//     borderRadius: 8,
//     marginTop: 20,
//   },
//   clearText: { color: '#fff', textAlign: 'center', fontSize: 16 },
// });

// export default CartScreen;



// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// // @ts-ignore
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { useNavigation, useRoute } from '@react-navigation/native';

// interface FoodItem {
//   id: string;
//   name: string;
//   category: string;
//   price: number;
//   image: string;
// }

// const CartScreen = () => {
//   const navigation = useNavigation<NativeStackNavigationProp<any>>();
//   const route = useRoute();
//   const { cart } = route.params as { cart: FoodItem[] };

//   const [cartItems, setCartItems] = useState<FoodItem[]>(cart || []);

//   const handleRemoveItem = (cartId: string) => {
//     setCartItems(prev => prev.filter(item => item.cartId !== cartId));
//   };

//   const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

//   const handleCheckout = () => {
//     if (cartItems.length === 0) {
//       Alert.alert('Empty Cart', 'Please add some items first.');
//       return;
//     }
//     Alert.alert('Order Placed ✅', 'Your delicious food is on the way!');
//     setCartItems([]);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-left" size={26} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.title}>My Cart 🛒</Text>
//         <View style={{ width: 26 }} /> {/* placeholder for spacing */}
//       </View>

//       {/* Cart List */}
//       {cartItems.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <Image
//             source={{
//               uri: 'https://cdn-icons-png.flaticon.com/512/2038/2038854.png',
//             }}
//             style={styles.emptyImage}
//           />
//           <Text style={styles.emptyText}>Your cart is empty</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={cartItems}
//           keyExtractor={item => item.id}
//           showsVerticalScrollIndicator={false}
//           renderItem={({ item }) => (
//             <View style={styles.cartCard}>
//               <Image source={{ uri: item.image }} style={styles.foodImage} />
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.foodName}>{item.name}</Text>
//                 <Text style={styles.foodCategory}>{item.category}</Text>
//                 <Text style={styles.foodPrice}>₹{item.price}</Text>
//               </View>

//               <TouchableOpacity
//                 onPress={() => handleRemoveItem(item.cartId)}
//                 style={styles.removeBtn}
//               >
//                 <Icon name="delete" size={20} color="#fff" />
//               </TouchableOpacity>
//             </View>
//           )}
//         />
//       )}

//       {/* Total & Checkout */}
//       {cartItems.length > 0 && (
//         <View style={styles.footer}>
//           <View style={styles.totalContainer}>
//             <Text style={styles.totalLabel}>Total:</Text>
//             <Text style={styles.totalAmount}>₹{totalPrice}</Text>
//           </View>
//           <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
//             <Text style={styles.checkoutText}>Checkout</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// export default CartScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF',
//     paddingHorizontal: 15,
//     paddingTop: 15,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#333',
//   },
//   cartCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F7F8FA',
//     padding: 12,
//     borderRadius: 12,
//     marginBottom: 10,
//     elevation: 2,
//   },
//   foodImage: {
//     width: 60,
//     height: 60,
//     marginRight: 10,
//   },
//   foodName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//   },
//   foodCategory: {
//     fontSize: 13,
//     color: '#666',
//     marginVertical: 3,
//   },
//   foodPrice: {
//     fontSize: 15,
//     fontWeight: '700',
//     color: '#4A6CF7',
//   },
//   removeBtn: {
//     backgroundColor: '#FF6B6B',
//     padding: 6,
//     borderRadius: 8,
//   },
//   footer: {
//     paddingVertical: 15,
//     borderTopWidth: 1,
//     borderColor: '#EEE',
//     backgroundColor: '#FFF',
//   },
//   totalContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     marginBottom: 10,
//   },
//   totalLabel: {
//     fontSize: 16,
//     color: '#333',
//     fontWeight: '600',
//   },
//   totalAmount: {
//     fontSize: 18,
//     color: '#4A6CF7',
//     fontWeight: '700',
//   },
//   checkoutBtn: {
//     backgroundColor: '#4A6CF7',
//     paddingVertical: 12,
//     marginHorizontal: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   checkoutText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: '700',
//   },
//   emptyContainer: {
//     alignItems: 'center',
//     marginTop: 100,
//   },
//   emptyImage: {
//     width: 120,
//     height: 120,
//     marginBottom: 10,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: '#666',
//   },
// });
