export const getNode = (node: (HTMLElement | null), tag = 'DIV'): HTMLElement | null => {
  if (node === null) return null;

  if (node.tagName === tag) {
    return node;
  } else {
    return getNode(node.parentElement, tag);
  }

}