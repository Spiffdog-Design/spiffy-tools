import { describe, expect, it } from 'vitest';
import { build, find, findAncestors, findByPath, has } from '.';

describe('Tree Utility Functions', () => {
  const flatList = [
    { id: 1, name: 'root' },
    { id: 2, name: 'child1', parentId: 1 },
    { id: 3, name: 'child2', parentId: 1 },
    { id: 4, name: 'grandchild1', parentId: 2 },
  ];

  describe('build', () => {
    it('should build a tree from a flat list', () => {
      const tree = build(flatList);
      expect(tree).toHaveLength(1);
      expect(tree[0].name).toBe('root');
      expect(tree[0].children).toHaveLength(2);
      expect(tree[0].children[0].name).toBe('child1');
      expect(tree[0].children[0].children).toHaveLength(1);
      expect(tree[0].children[0].children[0].name).toBe('grandchild1');
    });

    it('should handle custom keys', () => {
      const customList = [
        { key: 1, label: 'root' },
        { key: 2, label: 'child1', parentKey: 1 },
      ];
      const tree = build(customList, {
        key: 'key',
        parentKey: 'parentKey',
        childrenKey: 'offspring',
      });
      expect(tree[0].offspring).toHaveLength(1);
      expect(tree[0].offspring[0].label).toBe('child1');
    });
  });

  describe('find', () => {
    const tree = build(flatList);

    it('should find a node by field and value', () => {
      const node = find(tree, 'name', 'child1');
      expect(node).not.toBeNull();
      expect(node?.name).toBe('child1');
    });

    it('should return null if node is not found', () => {
      const node = find(tree, 'name', 'nonexistent');
      expect(node).toBeNull();
    });
  });

  describe('findAncestors', () => {
    const tree = build(flatList);

    it('should find ancestors of a node', () => {
      const ancestors = findAncestors(tree, 'name', 'grandchild1');
      expect(ancestors).not.toBeNull();
      expect(ancestors).toHaveLength(3);
      expect(ancestors?.map((node) => node.name)).toEqual(['root', 'child1', 'grandchild1']);
    });

    it('should return null if node is not found', () => {
      const ancestors = findAncestors(tree, 'name', 'nonexistent');
      expect(ancestors).toBeNull();
    });
  });

  describe('has', () => {
    const tree = build(flatList);

    it('should return true if node exists', () => {
      expect(has(tree, 'name', 'child1')).toBe(true);
    });

    it('should return false if node does not exist', () => {
      expect(has(tree, 'name', 'nonexistent')).toBe(false);
    });
  });

  describe('findByPath', () => {
    const tree = build(flatList);

    //console.log('>>> TREE: ', JSON.stringify(tree, null, 4));

    it('should find a node by path', () => {
      const node = findByPath(tree, 'root.child1.grandchild1', 'name');
      expect(node).not.toBeNull();
      expect(node?.name).toBe('grandchild1');
    });

    it('should return null if path is invalid', () => {
      const node = findByPath(tree, 'root.child1.nonexistent', 'name');
      expect(node).toBeNull();
    });

    it('should handle custom separators', () => {
      const node = findByPath(tree, 'root/child1/grandchild1', 'name', { separator: '/' });
      expect(node).not.toBeNull();
      expect(node?.name).toBe('grandchild1');
    });

    it('should find a node by path when the target node has children', () => {
      const listWithChildren = [
        { id: 1, name: 'root' },
        { id: 2, name: 'parent', parentId: 1 },
        { id: 3, name: 'child', parentId: 2 },
      ];
      const treeWithChildren = build(listWithChildren);
      const node = findByPath(treeWithChildren, 'root.parent', 'name');
      expect(node).not.toBeNull();
      expect(node?.name).toBe('parent');
      expect(node?.children).toHaveLength(1);
    });
  });
});
