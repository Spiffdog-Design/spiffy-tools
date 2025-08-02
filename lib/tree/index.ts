/**
 * Generic TreeNode type representing a node of type T
 * extended with children under a customizable key.
 *
 * @template T - Base node type
 * @template C - Children property key name (default: 'children')
 */
export type TreeNode<T, C extends string = 'children'> = T & {
  [K in C]: TreeNode<T, C>[];
};

interface BuildOptions<C extends string = 'children'> {
  /**
   * Property name that identifies the unique key of a node.
   * @default 'id'
   */
  key?: string;

  /**
   * Property name that identifies the parent key of a node.
   * @default 'parentId'
   */
  parentKey?: string;

  /**
   * Property name under which children nodes will be nested.
   * @default 'children'
   */
  childrenKey?: C;
}

/**
 * Converts a flat list of nodes into a tree structure.
 *
 * @template T - Type of the input flat nodes.
 * @template C - Key to use for children array.
 * @param {T[]} list - Flat array of nodes.
 * @param {BuildOptions<C>} [options] - Optional keys customization.
 * @returns {TreeNode<T, C>[]} Tree of nodes with nested children.
 */
export function build<T extends Record<string, any>, C extends string = 'children'>(
  list: T[],
  options: BuildOptions<C> = {},
): TreeNode<T, C>[] {
  const { key = 'id', parentKey = 'parentId', childrenKey = 'children' as C } = options;

  const map = new Map<any, TreeNode<T, C>>();
  const roots: TreeNode<T, C>[] = [];

  for (const item of list) {
    map.set(item[key], { ...item, [childrenKey]: [] } as TreeNode<T, C>);
  }

  for (const item of list) {
    const node = map.get(item[key])!;
    const parentId = item[parentKey];

    if (parentId == null || !map.has(parentId)) {
      roots.push(node);
    } else {
      const parent = map.get(parentId)!;
      parent[childrenKey].push(node);
    }
  }

  return roots;
}

interface FindOptions<C extends string = 'children'> {
  /**
   * The property name under which children nodes are nested.
   * @default 'children'
   */
  childrenKey?: C;
}

/**
 * Finds a single node in a tree by matching a field's value.
 *
 * @template T - Node type.
 * @template C - Children property key.
 * @param {TreeNode<T, C>[]} tree - Tree to search.
 * @param {keyof T} field - Field name to match.
 * @param {*} value - Value to search for.
 * @param {FindOptions<C>} [options] - Optional childrenKey override.
 * @returns {TreeNode<T, C> | null} Matching node or null if not found.
 */
export function find<T extends Record<string, any>, C extends string = 'children'>(
  tree: TreeNode<T, C>[],
  field: keyof T,
  value: any,
  options: FindOptions<C> = {},
): TreeNode<T, C> | null {
  const childrenKey = options.childrenKey ?? ('children' as C);
  const stack = [...tree];

  while (stack.length) {
    const node = stack.pop()!;
    if (node[field] === value) return node;
    if (Array.isArray(node[childrenKey])) {
      stack.push(...node[childrenKey]);
    }
  }

  return null;
}

/**
 * Finds the path of ancestors from root to a node matching a field value.
 *
 * @template T - Node type.
 * @template C - Children property key.
 * @param {TreeNode<T, C>[]} tree - Tree to search.
 * @param {keyof T} field - Field name to match.
 * @param {*} value - Value to search for.
 * @param {FindOptions<C>} [options] - Optional childrenKey override.
 * @returns {TreeNode<T, C>[] | null} Array of nodes from root to found node, or null.
 */
export function findAncestors<T extends Record<string, any>, C extends string = 'children'>(
  tree: TreeNode<T, C>[],
  field: keyof T,
  value: any,
  options: FindOptions<C> = {},
): TreeNode<T, C>[] | null {
  const childrenKey = options.childrenKey ?? ('children' as C);
  const stack: { node: TreeNode<T, C>; path: TreeNode<T, C>[] }[] = tree.map((node) => ({
    node,
    path: [node],
  }));

  while (stack.length) {
    const { node, path } = stack.pop()!;
    if (node[field] === value) return path;
    const children = node[childrenKey];
    if (Array.isArray(children)) {
      for (const child of children) {
        stack.push({ node: child, path: [...path, child] });
      }
    }
  }

  return null;
}

/**
 * Checks whether a node with the specified field and value exists in the tree.
 *
 * @template T - Node type.
 * @template C - Children property key.
 * @param {TreeNode<T, C>[]} tree - Tree to check.
 * @param {keyof T} field - Field name to match.
 * @param {*} value - Value to search for.
 * @param {FindOptions<C>} [options] - Optional childrenKey override.
 * @returns {boolean} True if such node exists, false otherwise.
 */
export function has<T extends Record<string, any>, C extends string = 'children'>(
  tree: TreeNode<T, C>[],
  field: keyof T,
  value: any,
  options: FindOptions<C> = {},
): boolean {
  const childrenKey = options.childrenKey ?? ('children' as C);
  const stack = [...tree];

  while (stack.length) {
    const node = stack.pop()!;
    if (node[field] === value) return true;
    if (Array.isArray(node[childrenKey])) {
      stack.push(...node[childrenKey]);
    }
  }

  return false;
}

interface FindByPathOptions<C extends string = 'children'> extends FindOptions<C> {
  /**
   * Separator character for splitting the path string.
   * @default '.'
   */
  separator?: string;
}

/**
 * Finds a node by walking a dotted path string matching field values at each level.
 *
 * @template T - Node type.
 * @template C - Children property key.
 * @param {TreeNode<T, C>[]} tree - Tree to search.
 * @param {string} path - Dotted path string, e.g. 'root.child.grandchild'.
 * @param {keyof T} field - Field name to match at each level.
 * @param {FindByPathOptions<C>} [options] - Optional childrenKey and separator overrides.
 * @returns {TreeNode<T, C> | null} Node at the end of the path, or null if not found.
 */
export function findByPath<T extends Record<string, any>, C extends string = 'children'>(
  tree: TreeNode<T, C>[],
  path: string,
  field: keyof T,
  options: FindByPathOptions<C> = {},
): TreeNode<T, C> | null {
  const { childrenKey = 'children' as C, separator = '.' } = options;
  const segments = path.split(separator);
  let currentLevel = tree;

  for (const segment of segments) {
    const nextNode = currentLevel.find((node) => node[field] === segment);
    if (!nextNode) return null;
    currentLevel = nextNode[childrenKey];
  }

  return currentLevel.length === 0
    ? null
    : currentLevel.find((node) => node[field] === segments[segments.length - 1]) ?? null;
}
