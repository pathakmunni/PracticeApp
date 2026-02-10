// ==================================================
// 🚀 LARGE TREE + FLATLIST (PERFORMANCE VERSION)
// ==================================================

// 📁 src/utils/generateLargeTree.ts
export const generateLargeTree = (
  depth = 6,
  breadth = 7,
  prefix = 'node',
): any => {
  const createNode = (level: number, index: number): any => {
    const id = `${prefix}-${level}-${index}`;
    if (level === depth) {
      return {
        id,
        name: `Leaf ${id}`,
        type: 'Event Details',
        endNode: true,
        children: [],
      };
    }

    return {
      id,
      name: `Node ${id}`,
      type: `Level ${level}`,
      endNode: false,
      children: Array.from({ length: breadth }).map((_, i) =>
        createNode(level + 1, i),
      ),
    };
  };

  return createNode(0, 0);
};
