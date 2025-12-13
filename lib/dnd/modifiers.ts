/**
 * Apple HIG-style Modifiers
 * Custom modifiers for @dnd-kit with Apple design principles
 */

import type { Modifier } from '@dnd-kit/core';

/**
 * Restrict drag to horizontal axis only
 * Useful for reordering items in a row
 */
export const restrictToHorizontalAxis: Modifier = ({
  transform,
}) => {
  return {
    ...transform,
    y: 0,
  };
};

/**
 * Restrict drag to vertical axis only
 * Useful for reordering items in a column (like Kanban cards)
 */
export const restrictToVerticalAxis: Modifier = ({
  transform,
}) => {
  return {
    ...transform,
    x: 0,
  };
};

/**
 * Magnetic snap behavior
 * Applies resistance when approaching drop zones
 * Creates a "magnetic" feel when items get close to targets
 */
export const magneticSnap: Modifier = ({
  transform,
  over,
}) => {
  if (!over) {
    return transform;
  }

  // Apply slight "pull" toward drop zone center
  const magnetStrength = 0.15;

  return {
    ...transform,
    x: transform.x * (1 - magnetStrength),
    y: transform.y * (1 - magnetStrength),
  };
};

/**
 * Scale up the dragged item slightly
 * Apple HIG recommends items "lift" when being dragged
 */
export const liftOnDrag: Modifier = ({
  transform,
  activeNodeRect,
  draggingNodeRect,
}) => {
  if (!activeNodeRect || !draggingNodeRect) {
    return transform;
  }

  // Maintain visual lift effect through transform
  return {
    ...transform,
    scaleX: 1.02,
    scaleY: 1.02,
  };
};

/**
 * Restrict movement to parent container bounds
 */
export function createRestrictToContainer(
  containerId: string
): Modifier {
  return ({ transform, draggingNodeRect, scrollableAncestorRects }) => {
    const containerRect = scrollableAncestorRects?.[0];

    if (!draggingNodeRect || !containerRect) {
      return transform;
    }

    const clampedX = Math.max(
      containerRect.left - draggingNodeRect.left,
      Math.min(
        transform.x,
        containerRect.right - draggingNodeRect.right
      )
    );

    const clampedY = Math.max(
      containerRect.top - draggingNodeRect.top,
      Math.min(
        transform.y,
        containerRect.bottom - draggingNodeRect.bottom
      )
    );

    return {
      ...transform,
      x: clampedX,
      y: clampedY,
    };
  };
}

/**
 * Adds inertia-like effect at drag boundaries
 * Creates rubber-band resistance when hitting edges
 */
export const rubberBandBoundaries: Modifier = ({
  transform,
  containerNodeRect,
  draggingNodeRect,
}) => {
  if (!containerNodeRect || !draggingNodeRect) {
    return transform;
  }

  const resistance = 0.3; // 30% resistance at boundaries

  let adjustedX = transform.x;
  let adjustedY = transform.y;

  // Apply resistance when exceeding bounds
  const leftOverflow = containerNodeRect.left - (draggingNodeRect.left + transform.x);
  const rightOverflow = (draggingNodeRect.right + transform.x) - containerNodeRect.right;
  const topOverflow = containerNodeRect.top - (draggingNodeRect.top + transform.y);
  const bottomOverflow = (draggingNodeRect.bottom + transform.y) - containerNodeRect.bottom;

  if (leftOverflow > 0) {
    adjustedX = transform.x + leftOverflow * resistance;
  } else if (rightOverflow > 0) {
    adjustedX = transform.x - rightOverflow * resistance;
  }

  if (topOverflow > 0) {
    adjustedY = transform.y + topOverflow * resistance;
  } else if (bottomOverflow > 0) {
    adjustedY = transform.y - bottomOverflow * resistance;
  }

  return {
    ...transform,
    x: adjustedX,
    y: adjustedY,
  };
};

/**
 * Combine multiple modifiers
 */
export function combineModifiers(...modifiers: Modifier[]): Modifier {
  return (args) => {
    return modifiers.reduce((transform, modifier) => {
      const result = modifier({ ...args, transform });
      return {
        ...transform,
        ...result,
      };
    }, args.transform);
  };
}
