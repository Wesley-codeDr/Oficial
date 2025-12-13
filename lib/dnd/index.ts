/**
 * @dnd-kit Apple HIG Integration
 *
 * This module provides Apple Human Interface Guidelines-compliant
 * drag and drop functionality built on top of @dnd-kit.
 *
 * @example
 * ```tsx
 * import {
 *   AppleDndProvider,
 *   useSortable,
 *   useDragState,
 *   dragOverlayStyles
 * } from '@/lib/dnd';
 *
 * function MyList({ items }) {
 *   return (
 *     <AppleDndProvider onDragEnd={handleDragEnd}>
 *       <SortableContext items={items}>
 *         {items.map(item => <SortableItem key={item.id} {...item} />)}
 *       </SortableContext>
 *     </AppleDndProvider>
 *   );
 * }
 * ```
 */

// Context and Provider
export {
  AppleDndProvider,
  useDragState,
  useSortableList,
  useKanbanBoard,
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  rectSortingStrategy,
  collisionStrategies,
} from './context';

// Sensors
export {
  useAppleSensors,
  useSimpleSensors,
  ApplePointerSensor,
  AppleTouchSensor,
  ACTIVATION_DELAY_MS,
  ACTIVATION_DISTANCE_PX,
} from './sensors';

// Modifiers
export {
  restrictToHorizontalAxis,
  restrictToVerticalAxis,
  magneticSnap,
  liftOnDrag,
  rubberBandBoundaries,
  createRestrictToContainer,
  combineModifiers,
} from './modifiers';

// Animations
export {
  APPLE_SPRING,
  BOUNCY_SPRING,
  GENTLE_SPRING,
  APPLE_TRANSITION,
  dropAnimationConfig,
  dragOverlayStyles,
  placeholderStyles,
  dropZoneStyles,
  dragStateClasses,
  getSortableItemStyles,
  dropImpactKeyframes,
  DROP_IMPACT_ANIMATION,
} from './animations';

// Re-export core @dnd-kit hooks for convenience
export {
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';

export {
  useSortable,
  SortableContext as SortableContextComponent,
} from '@dnd-kit/sortable';

// Re-export types
export type {
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  DragCancelEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';
