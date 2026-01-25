/**
 * Unified Icon Exports - Apple Liquid Glass 2026
 *
 * Central export point for all icon-related components and utilities.
 * Import from this file for consistent icon usage across the application.
 *
 * @example
 * ```tsx
 * import {
 *   GlassIcon,
 *   GlassIconButton,
 *   StatusIcon,
 *   LiquidGlassIcon,
 *   iconSizes,
 *   semanticIcons,
 * } from '@/components/ui/icons'
 * ```
 */

// Main icon components
export {
  GlassIcon,
  InlineIcon,
  FeatureIcon,
  type GlassIconProps,
} from '../GlassIcon'

export {
  GlassIconButton,
  CompactIconButton,
  LargeIconButton,
  type GlassIconButtonProps,
} from '../GlassIconButton'

export {
  StatusIcon,
  StatusText,
  StatusBadge,
  type StatusIconProps,
  type StatusTextProps,
  type StatusBadgeProps,
} from '../StatusIcon'

export {
  LiquidGlassIcon,
  AnimatedLiquidGlassIcon,
  type LiquidGlassIconProps,
} from '../LiquidGlassIcon'

// Icon system configuration
export {
  // Sizes
  iconSizes,
  iconSizeClasses,
  iconContainerSizes,
  type IconSize,

  // Stroke weights
  iconStrokeWidth,
  type IconStrokeWeight,

  // Semantic mappings
  semanticIcons,

  // Colors
  iconColors,
  type IconColor,

  // Animations
  iconAnimations,

  // Glass styles
  glassIconContainerStyles,
  iconContainerRadius,

  // Utilities
  getIconSizeClass,
  getIconContainerClasses,
  getStrokeWidth,
  getIconColorClass,
  composeIconClasses,

  // Types
  type StandardIconProps,
  type IconButtonProps,
} from '@/lib/design-system/icon-system'

// Liquid Glass icon colors (for sidebar/navigation)
export {
  liquidGlassColors,
  sidebarItemColorMap,
  getIconColors,
  tailwindGradientClasses,
  tailwindIconClasses,
  type IconColorKey,
  type IconColorConfig,
} from '@/lib/design-system/liquidGlassColors'

/**
 * Re-export commonly used Lucide icons for convenience
 * These are the most frequently used icons in the application
 */
export {
  // Navigation
  LayoutGrid,
  FileText,
  Zap,
  MessageCircle,
  FileSignature,
  FolderClock,
  BookOpen,
  Settings,
  Eye,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,

  // Actions
  Plus,
  Minus,
  Trash2,
  Pencil,
  Save,
  Copy,
  Check,
  RefreshCw,
  Search,
  Filter,
  ArrowUpDown,
  Pin,
  Share2,
  Download,
  Upload,
  Printer,
  FileDown,
  FileUp,

  // Status
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  Loader2,
  Clock,
  CheckCircle,
  Circle,
  AlertOctagon,

  // Medical
  Heart,
  HeartPulse,
  Activity,
  Stethoscope,
  Pill,
  Thermometer,
  Brain,
  Users,
  User,
  Scale,
  Calculator,
  ClipboardCheck,
  Shield,
  ShieldAlert,
  Wind,

  // Data
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  BarChart,
  Table,
  Grid3X3,

  // Time
  Calendar,
  CalendarDays,
  History,
  Timer,
  AlarmClock,

  // Communication
  Bell,
  BellOff,
  Mail,
  MessageSquare,
  Phone,
  Video,
  Mic,
  MicOff,

  // UI
  Sun,
  Moon,
  Star,
  Sparkles,
  Flame,
  Droplet,
  Cloud,
  CloudOff,
  Wifi,
  WifiOff,
  Lock,
  Unlock,
  Key,
  EyeOff,
  MoreHorizontal,
  MoreVertical,
  GripVertical,
  Quote,
  Tag,
  Folder,
  Image,
  Layout,
  Layers,
  LogOut,
  LogIn,
} from 'lucide-react'
