/**
 * RTL (Right-to-Left) Support Components
 * 
 * Apple HIG Right-to-Left Guidelines Implementation
 * @see https://developer.apple.com/design/human-interface-guidelines/right-to-left
 * 
 * This module exports all RTL-aware components and utilities following
 * Apple's Human Interface Guidelines for right-to-left language support.
 * 
 * Key Principles:
 * 1. Text alignment adjusts to match interface direction
 * 2. Controls flip to show progress in reading direction
 * 3. Interface icons adapt based on semantic meaning
 * 4. Numbers maintain their order (never reversed)
 * 5. Paragraphs align based on their language, not context
 */

// Direction Context and Hooks
export {
  DirectionProvider,
  useDirection,
  useDirectionalStyles,
  useDirectionalClasses,
  type TextDirection,
} from '@/lib/contexts/direction-context'

// Directional Icon Component
export {
  DirectionalIcon,
  BackIcon,
  ForwardIcon,
  ListMarkerIcon,
  useIconFlip,
  type IconSemantic,
} from './directional-icon'

// Progress Components
export {
  RTLProgress,
  RTLCircularProgress,
} from './rtl-progress'

// Rating Component
export {
  RTLRating,
  RatingDisplay,
} from './rtl-rating'

// Number Components
export {
  RTLNumber,
  PhoneNumber,
  CreditCardNumber,
  OrderNumber,
} from './rtl-number'

// Container Components
export {
  RTLContainer,
  LanguageText,
  RTLList,
  RTLImageGrid,
  SidebarContent,
  RTLBreadcrumb,
} from './rtl-container'



