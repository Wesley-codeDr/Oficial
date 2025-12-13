/**
 * Apple HIG-style Sensors Configuration
 * @dnd-kit sensor setup for iOS-like drag interactions
 */

import {
  PointerSensor,
  KeyboardSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

/**
 * Apple HIG recommends a slight delay before drag starts
 * This prevents accidental drags during taps/clicks
 */
export const ACTIVATION_DELAY_MS = 150;

/**
 * Minimum distance to travel before drag activates
 * Apple HIG uses ~8-10px to distinguish tap from drag
 */
export const ACTIVATION_DISTANCE_PX = 8;

/**
 * Custom Pointer Sensor with Apple-style activation constraints
 * - Delay: 150ms to prevent accidental drags
 * - Distance: 8px minimum travel before drag starts
 */
export class ApplePointerSensor extends PointerSensor {
  static activators = [
    {
      eventName: 'onPointerDown' as const,
      handler: ({ nativeEvent: event }: { nativeEvent: PointerEvent }) => {
        // Ignore right-click and middle-click
        if (event.button !== 0) {
          return false;
        }
        // Allow drag if not on interactive elements
        const target = event.target as HTMLElement;
        if (
          target.closest('button') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('textarea') ||
          target.closest('[data-no-drag]')
        ) {
          return false;
        }
        return true;
      },
    },
  ];
}

/**
 * Custom Touch Sensor optimized for iOS
 * - Longer delay to allow scrolling
 * - Tolerance for finger movement
 */
export class AppleTouchSensor extends TouchSensor {
  static activators = [
    {
      eventName: 'onTouchStart' as const,
      handler: ({ nativeEvent: event }: { nativeEvent: TouchEvent }) => {
        const target = event.target as HTMLElement;
        // Don't start drag on interactive elements
        if (
          target.closest('button') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('textarea') ||
          target.closest('[data-no-drag]')
        ) {
          return false;
        }
        return true;
      },
    },
  ];
}

/**
 * Hook to get Apple-style sensors configuration
 * Use this in your DndContext wrapper
 */
export function useAppleSensors() {
  const pointerSensor = useSensor(ApplePointerSensor, {
    activationConstraint: {
      delay: ACTIVATION_DELAY_MS,
      tolerance: ACTIVATION_DISTANCE_PX,
    },
  });

  const touchSensor = useSensor(AppleTouchSensor, {
    activationConstraint: {
      delay: 200, // Slightly longer delay for touch
      tolerance: 10,
    },
  });

  const keyboardSensor = useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  });

  return useSensors(pointerSensor, touchSensor, keyboardSensor);
}

/**
 * Simpler sensor configuration for non-sortable contexts
 */
export function useSimpleSensors() {
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: ACTIVATION_DISTANCE_PX,
    },
  });

  const keyboardSensor = useSensor(KeyboardSensor);

  return useSensors(pointerSensor, keyboardSensor);
}
