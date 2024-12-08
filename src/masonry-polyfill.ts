export function registerMasonry(gridContainer: HTMLElement | null) {
  if (!gridContainer) return noop;
  if (getComputedStyle(gridContainer).gridTemplateRows === 'masonry')
    return noop;

  const resizeObserver = new ResizeObserver(() =>
    requestAnimationFrame(() => adjustGridItems(gridContainer)),
  );

  resizeObserver.observe(gridContainer);

  return () => resizeObserver.disconnect();
}

function adjustGridItems(grid: HTMLElement) {
  const items = Array.from(grid.childNodes).filter(isHTMLElement);

  items.forEach(({ style }) => style.removeProperty('margin-top'));

  const columns = getComputedStyle(grid).gridTemplateColumns.split(' ').length;

  if (columns <= 1) return;
  if (items.length <= columns) return;

  const gap = parseFloat(getComputedStyle(grid).rowGap);

  items.slice(columns).forEach((item, index) => {
    const { bottom: prevBottom } = items[index]!.getBoundingClientRect();
    const { top } = item.getBoundingClientRect();

    item.style.setProperty('margin-top', `${prevBottom + gap - top}px`);
  });
}

function noop() {}

function isHTMLElement(element: ChildNode): element is HTMLElement {
  return element.nodeType === 1;
}
