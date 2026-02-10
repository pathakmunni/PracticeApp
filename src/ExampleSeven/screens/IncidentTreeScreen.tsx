// ==================================================
// 📁 src/screens/IncidentTreeScreen.tsx
// ==================================================
import React, { useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTree } from '../redux/treeSlice';
import { RootState } from '../redux/store';
import TreeNode from '../components/TreeNode';

const IncidentTreeScreen = () => {
  const dispatch = useDispatch<any>();

  const { token } = useSelector((state: RootState) => state.auth);
  const { data, loading, error } = useSelector(
    (state: RootState) => state.tree,
  );

  useEffect(() => {
    if (token) {
      dispatch(fetchTree(token));
    }
  }, [token]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data && <TreeNode node={data} />}
    </ScrollView>
  );
};

export default IncidentTreeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loader: {
    marginTop: 40,
  },
  error: {
    padding: 16,
    color: 'red',
  },
});


// import React, { useEffect } from 'react';
// import {
//   View,
//   Text,
//   ActivityIndicator,
//   ScrollView,
//   StyleSheet,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchTree } from '../redux/treeSlice';
// import { RootState } from '../redux/store';
// import TreeNode from '../components/TreeNode';

// const IncidentTreeScreen = () => {
//   const dispatch = useDispatch<any>();

//   const { token } = useSelector((state: RootState) => state.auth);
//   const { data, loading, error } = useSelector(
//     (state: RootState) => state.tree,
//   );

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchTree(token));
//     }
//   }, [token]);

//   if (loading) {
//     return <ActivityIndicator style={styles.loader} />;
//   }

//   if (error) {
//     return <Text style={styles.error}>{error}</Text>;
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {data && <TreeNode node={data} />}
//     </ScrollView>
//   );
// };

// export default IncidentTreeScreen;

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   loader: {
//     marginTop: 40,
//   },
//   error: {
//     padding: 16,
//     color: 'red',
//   },
// });