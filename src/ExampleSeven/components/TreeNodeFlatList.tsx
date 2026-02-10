import React, { memo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

const TreeNodeFlatList = ({ node, level = 0 }: any) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node?.children?.length > 0;

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.row,
          { paddingLeft: level * 18 + 16 },
        ]}
        onPress={() => hasChildren && setExpanded(!expanded)}
        activeOpacity={0.8}
      >
        <Text style={styles.icon}>
          {hasChildren ? (expanded ? '▼' : '▶') : '•'}
        </Text>

        <View>
          <Text style={styles.title}>{node.title}</Text>
          <Text style={styles.subtitle}>{node.type}</Text>
        </View>
      </TouchableOpacity>

      {hasChildren && expanded && (
        <FlatList
          data={node.children}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TreeNodeFlatList node={item} level={level + 1} />
          )}
        />
      )}
    </View>
  );
};

export default memo(TreeNodeFlatList);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginVertical: 6,
    marginRight: 12,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 3,
  },
  icon: {
    width: 20,
    textAlign: 'center',
    marginRight: 8,
    fontSize: 12,
    color: '#444',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 12,
    color: '#777',
  },
});



// import React, { memo, useState, useMemo } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
// } from 'react-native';

// interface TreeNodeProps {
//   node: any;
//   level?: number;
// }

// const TreeNodeFlatList = ({ node, level = 0 }: TreeNodeProps) => {
//   const [expanded, setExpanded] = useState(true);
//   const hasChildren = node?.children?.length > 0;

//   const visibleChildren = useMemo(() => {
//     return expanded ? node.children : [];
//   }, [expanded, node.children]);

//   return (
//     <View>
//       {/* NODE ROW */}
//       <TouchableOpacity
//         style={[styles.row, { paddingLeft: level * 16 + 12 }]}
//         onPress={() => hasChildren && setExpanded(!expanded)}
//         activeOpacity={0.7}
//       >
//         <Text style={styles.arrow}>
//           {hasChildren ? (expanded ? '▼' : '▶') : '•'}
//         </Text>

//         <View>
//           <Text style={styles.title}>{node.name}</Text>
//           <Text style={styles.type}>{node.type}</Text>
//         </View>
//       </TouchableOpacity>

//       {/* CHILDREN */}
//       {hasChildren && expanded && (
//         <FlatList
//           data={visibleChildren}
//           keyExtractor={item => item.id}
//           renderItem={({ item }) => (
//             <TreeNodeFlatList node={item} level={level + 1} />
//           )}
//           removeClippedSubviews
//           initialNumToRender={6}
//           maxToRenderPerBatch={8}
//           windowSize={10}
//         />
//       )}
//     </View>
//   );
// };

// export default memo(TreeNodeFlatList);

// //
// // ✅ STYLES (THIS WAS MISSING)
// //
// const styles = StyleSheet.create({
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     paddingRight: 12,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     marginVertical: 4,
//     marginRight: 8,
//     elevation: 2, // Android shadow
//   },
//   arrow: {
//     width: 18,
//     fontSize: 12,
//     marginRight: 6,
//     color: '#333',
//   },
//   title: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#111',
//   },
//   type: {
//     fontSize: 11,
//     color: '#777',
//   },
// });
