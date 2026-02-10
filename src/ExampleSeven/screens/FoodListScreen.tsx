// // src/ExampleSeven/screens/FoodListScreen.tsx
// import React from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRoute, useNavigation } from '@react-navigation/native';
// // @ts-ignore: no declaration file for react-native-vector-icons/MaterialCommunityIcons
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { addToCart } from '../redux/CartSlice';
// import { RootState } from '../redux/store';


// const allFoods = [
//   { id: '1', name: 'Cheese Pizza', price: 250, category: 'Pizza', image: 'https://cdn-icons-png.flaticon.com/512/1404/1404945.png' },
//   { id: '2', name: 'Veggie Burger', price: 180, category: 'Burger', image: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png' },
//   { id: '3', name: 'Coke', price: 80, category: 'Drinks', image: 'https://cdn-icons-png.flaticon.com/512/1046/1046781.png' },
//   { id: '4', name: 'Cupcake', price: 120, category: 'Sweets', image: 'https://cdn-icons-png.flaticon.com/512/1046/1046787.png' },
// ];

// const FoodListScreen = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const { category }: any = route.params || {};
//   const cart = useSelector((state: RootState) => state.cart.items);

//   const filteredFoods = category
//     ? allFoods.filter(f => f.category === category)
//     : allFoods;

//   const handleAdd = (item: any) => {
//     dispatch(addToCart(item));
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-left" size={26} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.title}>{category || 'All Foods'}</Text>

//         <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
//           <Icon name="cart" size={28} color="#4A6CF7" />
//           {cart.length > 0 && (
//             <View style={styles.badge}>
//               <Text style={styles.badgeText}>{cart.length}</Text>
//             </View>
//           )}
//         </TouchableOpacity>
//       </View>

//       {/* Food list */}
//       <FlatList
//         data={filteredFoods}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Image source={{ uri: item.image }} style={styles.image} />
//             <View style={{ flex: 1 }}>
//               <Text style={styles.foodName}>{item.name}</Text>
//               <Text style={styles.price}>₹{item.price}</Text>
//             </View>
//             <TouchableOpacity
//               style={styles.addBtn}
//               onPress={() => handleAdd(item)}>
//               <Text style={styles.addText}>Add</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//         contentContainerStyle={{ paddingBottom: 50 }}
//       />
//     </View>
//   );
// };

// export default FoodListScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F6F7FB',
//     paddingHorizontal: 18,
//     paddingTop: 60,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#333',
//   },
//   badge: {
//     position: 'absolute',
//     right: -8,
//     top: -5,
//     backgroundColor: '#FF4B55',
//     borderRadius: 10,
//     paddingHorizontal: 5,
//   },
//   badgeText: {
//     color: '#fff',
//     fontSize: 10,
//     fontWeight: '700',
//   },
//   card: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderRadius: 18,
//     padding: 15,
//     marginTop: 15,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 3,
//     alignItems: 'center',
//   },
//   image: {
//     width: 65,
//     height: 65,
//     marginRight: 15,
//   },
//   foodName: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   price: {
//     color: '#4A6CF7',
//     marginTop: 4,
//   },
//   addBtn: {
//     backgroundColor: '#4A6CF7',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 10,
//   },
//   addText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
// });

//=================================================================================

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
// @ts-ignore: no declaration file for react-native-vector-icons/MaterialCommunityIcons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/CartSlice';
import { RootState, AppDispatch } from '../redux/store';

interface FoodItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image?: string;
}

const MOCK_FOODS: FoodItem[] = [
  { id: '1', name: 'Cheese Burst Pizza', category: 'Pizza', price: 299, image: 'https://cdn-icons-png.flaticon.com/512/1404/1404945.png' },
  { id: '2', name: 'Chicken Burger', category: 'Burger', price: 199, image: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png' },
  { id: '3', name: 'Chocolate Shake', category: 'Drinks', price: 149, image: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png' },
  { id: '4', name: 'Gulab Jamun', category: 'Sweets', price: 99, image: 'https://cdn-icons-png.flaticon.com/512/6646/6646525.png' },
  { id: '5', name: 'Veg Pizza', category: 'Pizza', price: 249, image: 'https://cdn-icons-png.flaticon.com/512/3595/3595455.png' },
];

const FoodListScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { category } = (route.params || {}) as { category?: string };

  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart?.items || []);

  useEffect(() => {
    // emulate API fetch & filter by category param
    setLoading(true);
    const fetchAndFilter = () => {
      let list = MOCK_FOODS;
      if (category) {
        list = MOCK_FOODS.filter(f => f.category === category);
      }
      setFoods(list);
      setLoading(false);
    };
    fetchAndFilter();
  }, [category]);

  const handleAdd = (item: FoodItem) => {
    dispatch(addToCart({
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      image: item.image,
    }));
  };

  const cartCount = cartItems.reduce((sum, i) => sum + (i.quantity || 0), 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>{category ? category : 'Food Menu'}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart' as never)} style={styles.cartWrap}>
          <Icon name="cart" size={26} color="#fff" />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4A6CF7" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={foods}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.foodImage} />
              <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.foodCategory}>{item.category}</Text>
                <Text style={styles.foodPrice}>₹{item.price}</Text>
              </View>
              <TouchableOpacity style={styles.addBtn} onPress={() => handleAdd(item)}>
                <Icon name="plus" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default FoodListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F7FB', paddingHorizontal: 18, paddingTop: 18 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  title: { fontSize: 20, fontWeight: '700', color: '#333' },
  cartWrap: { backgroundColor: '#4A6CF7', padding: 8, borderRadius: 10 },
  badge: { position: 'absolute', right: -6, top: -6, backgroundColor: '#FF4B55', width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  foodImage: { width: 70, height: 70, borderRadius: 10 },
  foodName: { fontSize: 16, fontWeight: '700', color: '#333' },
  foodCategory: { fontSize: 13, color: '#777', marginTop: 4 },
  foodPrice: { fontSize: 15, fontWeight: '700', color: '#4A6CF7', marginTop: 6 },

  addBtn: { backgroundColor: '#4A6CF7', padding: 10, borderRadius: 10 },
});


// import React, { useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../redux/CartSlice';
// import { RootState } from '../redux/store';
// import { useNavigation } from '@react-navigation/native';

// interface FoodItem {
//   id: string;
//   name: string;
//   price: number;
// }

// const FoodListScreen = () => {
//   const [foods] = useState<FoodItem[]>([
//     { id: '1', name: 'Burger', price: 120 },
//     { id: '2', name: 'Pizza', price: 250 },
//     { id: '3', name: 'Pasta', price: 180 },
//   ]);

//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const cart = useSelector((state: RootState) => state.cart?.items || []);

//   const handleAddToCart = (item: FoodItem) => {
//     dispatch(addToCart(item));
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Food Menu</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Cart' as never)}>
//           <Text style={styles.cart}>🛒 {cart.length}</Text>
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={foods}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.item}>
//             <Text>{item.name}</Text>
//             <Text>₹{item.price}</Text>
//             <TouchableOpacity
//               style={styles.addButton}
//               onPress={() => handleAddToCart(item)}
//             >
//               <Text style={styles.addText}>Add</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//   },
//   title: { fontSize: 22, fontWeight: '600' },
//   cart: { fontSize: 18 },
//   item: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 12,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },
//   addButton: {
//     backgroundColor: '#007bff',
//     padding: 8,
//     borderRadius: 6,
//   },
//   addText: { color: '#fff' },
// });

// export default FoodListScreen;



// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// // @ts-ignore: no declaration file for react-native-vector-icons/MaterialCommunityIcons
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

// const mockData: FoodItem[] = [
//   {
//     id: '1',
//     name: 'Cheese Burst Pizza',
//     category: 'Pizza',
//     price: 299,
//     image: 'https://cdn-icons-png.flaticon.com/512/1404/1404945.png',
//   },
//   {
//     id: '2',
//     name: 'Chicken Burger',
//     category: 'Burger',
//     price: 199,
//     image: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
//   },
//   {
//     id: '3',
//     name: 'Chocolate Shake',
//     category: 'Drinks',
//     price: 149,
//     image: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png',
//   },
//   {
//     id: '4',
//     name: 'Gulab Jamun',
//     category: 'Sweets',
//     price: 99,
//     image: 'https://cdn-icons-png.flaticon.com/512/6646/6646525.png',
//   },
//   {
//     id: '5',
//     name: 'Veg Pizza',
//     category: 'Pizza',
//     price: 249,
//     image: 'https://cdn-icons-png.flaticon.com/512/3595/3595455.png',
//   },
// ];

// const categories = ['All', 'Pizza', 'Burger', 'Drinks', 'Sweets'];

// const FoodListScreen = () => {
//   const [foods, setFoods] = useState<FoodItem[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [cart, setCart] = useState<FoodItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   const navigation = useNavigation<NativeStackNavigationProp<any>>();

//   const route = useRoute();
//   const { category } = route.params as { category?: string };

//   useEffect(() => {
//     if (category) setSelectedCategory(category);
//   }, [category]);

//   useEffect(() => {
//     // simulate API fetch
//     const fetchData = async () => {
//       setLoading(true);
//       setTimeout(() => {
//         setFoods(mockData);
//         setLoading(false);
//       }, 1000);
//     };
//     fetchData();
//   }, []);

//   const filteredFoods =
//     selectedCategory === 'All'
//       ? foods
//       : foods.filter(f => f.category === selectedCategory);

// //   const handleAddToCart = (item: FoodItem) => {
// //     setCart(prev => [...prev, item]);
// //   };

//   const handleAddToCart = (item: FoodItem) => {
//   const uniqueItem = { ...item, cartId: Date.now().toString() + Math.random() };
//   setCart(prev => [...prev, uniqueItem]);
// };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-left" size={26} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.title}>Food Menu 🍕</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Cart', { cart })}>
//           <Icon name="cart" size={26} color="#4A6CF7" />
//           {cart.length > 0 && (
//             <View style={styles.cartBadge}>
//               <Text style={styles.badgeText}>{cart.length}</Text>
//             </View>
//           )}
//         </TouchableOpacity>
//       </View>

//       {/* Category Filter */}
//       <FlatList
//         data={categories}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() => setSelectedCategory(item)}
//             style={[
//               styles.categoryBtn,
//               selectedCategory === item && styles.categoryBtnActive,
//             ]}
//           >
//             <Text
//               style={[
//                 styles.categoryText,
//                 selectedCategory === item && styles.categoryTextActive,
//               ]}
//             >
//               {item}
//             </Text>
//           </TouchableOpacity>
//         )}
//         keyExtractor={item => item}
//         style={{ marginVertical: 15 }}
//       />

//       {/* Food List */}
//       {loading ? (
//         <ActivityIndicator
//           size="large"
//           color="#4A6CF7"
//           style={{ marginTop: 50 }}
//         />
//       ) : (
//         <FlatList
//           data={filteredFoods}
//           keyExtractor={item => item.id}
//           showsVerticalScrollIndicator={false}
//           renderItem={({ item }) => (
//             <View style={styles.foodCard}>
//               <Image source={{ uri: item.image }} style={styles.foodImage} />
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.foodName}>{item.name}</Text>
//                 <Text style={styles.foodCategory}>{item.category}</Text>
//                 <Text style={styles.foodPrice}>₹{item.price}</Text>
//               </View>
//               <TouchableOpacity
//                 onPress={() => handleAddToCart(item)}
//                 style={styles.addBtn}
//               >
//                 <Icon name="plus" size={18} color="#fff" />
//               </TouchableOpacity>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// export default FoodListScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F6F7FB',
//     paddingHorizontal: 18,
//     paddingTop: 50,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#333',
//   },
//   cartBadge: {
//     position: 'absolute',
//     top: -5,
//     right: -10,
//     backgroundColor: '#FF4B55',
//     borderRadius: 10,
//     paddingHorizontal: 6,
//     paddingVertical: 1,
//   },
//   badgeText: {
//     color: '#fff',
//     fontSize: 10,
//     fontWeight: '700',
//   },
//   categoryBtn: {
//     backgroundColor: '#fff',
//     paddingHorizontal: 18,
//     paddingVertical: 10,
//     borderRadius: 25,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     height: 50,
//     alignItems: 'center',
//   },
//   categoryBtnActive: {
//     backgroundColor: '#4A6CF7',
//     height: 50,
//     alignItems: 'center',
//   },
//   categoryText: {
//     color: '#555',
//     fontWeight: '600',
//   },
//   categoryTextActive: {
//     color: '#fff',
//   },
//   foodCard: {
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   foodImage: {
//     width: 70,
//     height: 70,
//     marginRight: 15,
//   },
//   foodName: {
//     fontSize: 16,
//     fontWeight: '700',
//   },
//   foodCategory: {
//     color: '#777',
//     fontSize: 13,
//     marginVertical: 2,
//   },
//   foodPrice: {
//     color: '#4A6CF7',
//     fontWeight: '700',
//   },
//   addBtn: {
//     backgroundColor: '#4A6CF7',
//     padding: 8,
//     borderRadius: 10,
//   },
// });
