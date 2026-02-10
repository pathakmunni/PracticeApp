// ==================================================
// 📁 src/components/TreeNode.tsx
// ==================================================
import React, { memo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  StyleSheet,
} from 'react-native';

interface TreeNodeProps {
  node: any;
}

const TreeNode = ({ node }: TreeNodeProps) => {
  const [expanded, setExpanded] = useState(true);

  const hasChildren = node?.children?.length > 0;

  const onToggle = () => {
    if (!hasChildren) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.row} onPress={onToggle}>
        <Text style={styles.arrow}>
          {hasChildren ? (expanded ? '▼' : '▶') : '•'}
        </Text>
        <View>
          <Text style={styles.title}>{node.name}</Text>
          <Text style={styles.subTitle}>{node.type}</Text>
        </View>
      </TouchableOpacity>

      {expanded && hasChildren && (
        <View style={styles.childrenWrapper}>
          {node.children.map((child: any) => (
            <MemoizedTreeNode key={child.id} node={child} />
          ))}
        </View>
      )}
    </View>
  );
};

const MemoizedTreeNode = memo(TreeNode);
export default MemoizedTreeNode;

const styles = StyleSheet.create({
  container: {
    marginLeft: 12,
    marginTop: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2,
  },
  arrow: {
    width: 20,
    fontSize: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  subTitle: {
    fontSize: 11,
    color: '#777',
  },
  childrenWrapper: {
    marginLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: '#E0E0E0',
  },
});

// import React, { memo, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   LayoutAnimation,
//   StyleSheet,
// } from 'react-native';

// interface TreeNodeProps {
//   node: any;
// }

// const TreeNode = ({ node }: TreeNodeProps) => {
//   const [expanded, setExpanded] = useState(true);

//   const hasChildren = node?.children?.length > 0;

//   const onToggle = () => {
//     if (!hasChildren) return;
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setExpanded(!expanded);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.row} onPress={onToggle}>
//         <Text style={styles.arrow}>
//           {hasChildren ? (expanded ? '▼' : '▶') : '•'}
//         </Text>
//         <View>
//           <Text style={styles.title}>{node.name}</Text>
//           <Text style={styles.subTitle}>{node.type}</Text>
//         </View>
//       </TouchableOpacity>

//       {expanded && hasChildren && (
//         <View style={styles.childrenWrapper}>
//           {node.children.map((child: any) => (
//             <MemoizedTreeNode key={child.id} node={child} />
//           ))}
//         </View>
//       )}
//     </View>
//   );
// };

// const MemoizedTreeNode = memo(TreeNode);
// export default MemoizedTreeNode;

// const styles = StyleSheet.create({
//   container: {
//     marginLeft: 12,
//     marginTop: 6,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     elevation: 2,
//   },
//   arrow: {
//     width: 20,
//     fontSize: 12,
//   },
//   title: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   subTitle: {
//     fontSize: 11,
//     color: '#777',
//   },
//   childrenWrapper: {
//     marginLeft: 12,
//     borderLeftWidth: 1,
//     borderLeftColor: '#E0E0E0',
//   },
// });