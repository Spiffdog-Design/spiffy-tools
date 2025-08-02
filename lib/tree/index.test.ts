import { describe, it, expect } from 'vitest';
import {
  build,
  find,
  findAncestors,
  has,
  findByPath,
  TreeNode,
} from './';

interface Item {
  id: number;
  parentId: number | null;
  name: string;
}

const flatData: Item[] = [
  { id: 1, parentId: null, name: 'Root A' },
  { id: 2, parentId: 1, name: 'Child A1' },
  { id: 3, parentId: 1, name: 'Child A2' },
  { id: 4, parentId: 2, name: 'Child A1.1' },
  { id: 5, parentId: null, name: 'Root B' },
  { id: 6, parentId: 5, name: 'Child B1' },
];

describe('tree tests', () => {
  // Use default childrenKey = 'children'
  const tree = build<Item>(flatData);

  it('build constructs a tree from flat data', () => {
    expect(tree.length).toBe(2); // Root A and Root B

    // TypeScript knows tree nodes have children array
    expect(tree[0].name).toBe('Root A');
    expect(tree[0].children[0].name).toBe('Child A1');
    expect(tree[0].children[0].children[0].name).toBe('Child A1.1');
    expect(tree[1].name).toBe('Root B');
    expect(tree[1].children[0].name).toBe('Child B1');
  });

  it('find locates a node by field and value', () => {
    const node = find(tree, 'name', 'Child A2');
    expect(node).not.toBeNull();
    expect(node?.id).toBe(3);
  });

  it('find returns null if node not found', () => {
    const node = find(tree, 'name', 'Nonexistent');
    expect(node).toBeNull();
  });

  it('findAncestors returns correct ancestor path', () => {
    const path = findAncestors(tree, 'id', 4);
    expect(path?.map(n => n.name)).toEqual(['Root A', 'Child A1', 'Child A1.1']);
  });

  it('findAncestors returns null if not found', () => {
    const path = findAncestors(tree, 'name', 'Unknown');
    expect(path).toBeNull();
  });

  it('has returns true if node exists', () => {
    expect(has(tree, 'name', 'Child A1')).toBe(true);
  });

  it('has returns false if node does not exist', () => {
    expect(has(tree, 'name', 'Ghost')).toBe(false);
  });

  it('findByPath locates a node by dotted path string', () => {
    const node = findByPath(tree, 'Root A.Child A1.Child A1.1', 'name');
    expect(node?.id).toBe(4);
  });

  it('findByPath returns null for invalid path', () => {
    const node = findByPath(tree, 'Root A.Unknown.Child', 'name');
    expect(node).toBeNull();
  });

  it('findByPath works for second root node', () => {
    const node = findByPath(tree, 'Root B.Child B1', 'name');
    expect(node?.id).toBe(6);
  });

  // Test with custom childrenKey = 'nodes'
  describe('with custom childrenKey "nodes"', () => {
    type C
