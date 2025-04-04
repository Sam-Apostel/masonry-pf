export function registerMasonry(gridContainer: HTMLElement | null) {
  if (!gridContainer) return noop;

  const style = getComputedStyle(gridContainer);

  // exit if masonry is supported
  if (style.gridTemplateRows === 'masonry') return noop;
  if (style.gridTemplateColumns === 'masonry') return noop;

  const resizeObserver = new ResizeObserver(() =>
    requestAnimationFrame(() => adjustGridItems(gridContainer)),
  );

  resizeObserver.observe(gridContainer);

  return () => resizeObserver.disconnect();
}

function adjustGridItems(grid: HTMLElement) {
  const items = Array.from(grid.childNodes).filter(isHTMLElement);

  items.forEach(({ style }) => {
    style.removeProperty('margin-top');
    style.removeProperty('margin-left');
  });

  const style = getComputedStyle(grid);
  const columns = style.gridTemplateColumns.split(' ').length;
  const rows = style.gridTemplateRows.split(' ').length;

  if (columns > 1 && rows > 1) return; // not a masonry layout.
  if (columns <= 1 && rows <= 1) return; // not a masonry layout.

  if (columns > 1) {
    if (items.length <= columns) return;

    const gap = parseFloat(style.rowGap);

    items.slice(columns).forEach((item, index) => {
      const { bottom: prevBottom } = items[index]!.getBoundingClientRect();
      const { top } = item.getBoundingClientRect();

      item.style.setProperty('margin-top', `${prevBottom + gap - top}px`);
    });
  } else {
    if (items.length <= rows) return;

    const gap = parseFloat(style.columnGap);

    items.slice(rows).forEach((item, index) => {
      const { right: prevRight } = items[index]!.getBoundingClientRect();
      const { left } = item.getBoundingClientRect();

      item.style.setProperty('margin-left', `${prevRight + gap - left}px`);
    });
  }
}

function noop() {}

function isHTMLElement(element: ChildNode): element is HTMLElement {
  return element.nodeType === 1;
}
