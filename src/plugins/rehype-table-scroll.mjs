import { visit } from 'unist-util-visit';

/**
 * Wraps every Markdown table in `<div class="table-scroll">` so wide tables
 * (the paint formulas, for one) scroll sideways instead of breaking the
 * layout on a phone.
 */
export function rehypeTableScroll() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'table' || !parent || index === null) return;
      if (parent.type === 'element' && parent.properties?.className?.includes?.('table-scroll')) return;

      parent.children[index] = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-scroll'] },
        children: [node],
      };
    });
  };
}
