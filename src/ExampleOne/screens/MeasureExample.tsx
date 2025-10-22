import React, { useLayoutEffect, useRef, useState } from 'react';
import { View, Text, findNodeHandle, UIManager, StyleSheet } from 'react-native';

const MeasureExample: React.FC = () => {
  const boxRef = useRef<View>(null);
  const [boxWidth, setBoxWidth] = useState<number>(0);

  useLayoutEffect(() => {
    if (boxRef.current) {
      const handle = findNodeHandle(boxRef.current);
      if (handle) {
        UIManager.measure(handle, (x, y, width, height) => {
          setBoxWidth(width);
        });
      }
    }
  }, []);

  return (
    <View style={styles.container}>
      <View ref={boxRef} style={styles.box} />
      <Text>Box width: {boxWidth}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 200,
    height: 100,
    backgroundColor: 'skyblue',
    marginBottom: 20,
  },
});

export default MeasureExample;

// import React, { useLayoutEffect, useRef, useState } from 'react';
// import { View, Text } from 'react-native';

// const MeasureExample = () => {
//   const boxRef = useRef(null);
//   const [boxWidth, setBoxWidth] = useState(0);

//   useLayoutEffect(() => {
//     boxRef.current.measure((x, y, width, height) => {
//       setBoxWidth(width);
//     });
//   }, []);

//   return (
//     <View>
//       <View
//         ref={boxRef}
//         style={{ width: 200, height: 100, backgroundColor: 'skyblue', margin: 10 }}
//       />
//       <Text>Box width: {boxWidth}</Text>
//     </View>
//   );
// };

// export default MeasureExample;
