import { View, Text, StyleSheet } from 'react-native';

export default function ContentRenderer({ item }: any) {
  if (!item) return null;

  /* ---------- PARAGRAPH ---------- */
  if (item.type === 'paragraph') {
    return <Text style={styles.paragraph}>{item.text}</Text>;
  }

  /* ---------- LIST ---------- */
  if (item.type === 'list' && Array.isArray(item.items)) {
    return (
      <View style={styles.bulletContainer}>
        {item.items.map((bullet: string, i: number) => (
          <Text key={i} style={styles.bullet}>
            • {bullet}
          </Text>
        ))}
      </View>
    );
  }

  if (item.type === 'subtitle') {
    return <Text style={styles.subtitle}>{item.text}</Text>;
  }

  if (item.type === 'warning') {
    return (
      <View style={styles.warningBox}>
        <Text style={styles.warningText}>{item.text}</Text>
      </View>
    );
  }

  /* ---------- FALLBACK ---------- */
  return null;
  // if (item.type === 'paragraph') {
  //   return <Text>{item.text}</Text>;
  // }

  // if (item.type === 'list') {
  //   return (
  //     <View>
  //       {item.title && <Text>{item.title}</Text>}
  //       {item.items.map((i: string, idx: number) => (
  //         <Text key={idx}>• {i}</Text>
  //       ))}
  //     </View>
  //   );
  // }

  //  switch (item.type) {
  //     case 'paragraph':
  //       return (
  //         <Text style={styles.paragraph}>
  //           {item.text}
  //         </Text>
  //       );

  //     case 'subtitle':
  //       return (
  //         <Text style={styles.subtitle}>
  //           {item.text}
  //         </Text>
  //       );

  //     case 'list':
  //       return (
  //         <View style={styles.bulletContainer}>
  //           {item.items.map((bullet: string, i: number) => (
  //             <Text key={i} style={styles.bullet}>
  //               • {bullet}
  //             </Text>
  //           ))}
  //         </View>
  //       );

  //     case 'warning':
  //       return (
  //         <View  style={styles.warningBox}>
  //           <Text style={styles.warningText}>{item.text}</Text>
  //         </View>
  //       );

  //     default:
  //       return null;
  //   }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 14,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  bulletContainer: {
    marginLeft: 10,
    marginBottom: 16,
  },
  bullet: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  warningBox: {
    backgroundColor: '#FFF3CD',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#FFA000',
  },
  warningText: {
    fontSize: 15,
    color: '#7A4F01',
    fontWeight: '500',
  },
});
