/**
 * Medical Components - Healthcare-specific UI components
 *
 * Componentes especializados para contexto médico/healthcare
 * com animações, estados e comportamentos específicos.
 */

export { MedicalAlert } from './MedicalAlert'
export type { MedicalAlertProps, MedicalAlertVariant } from './MedicalAlert'

export { StatusIndicator, StatusDot } from './StatusIndicator'
export type { StatusIndicatorProps, StatusIndicatorStatus } from './StatusIndicator'

export {
  PatientCard,
  PatientCardHeader,
  PatientCardAvatar,
  PatientCardInfo,
  PatientCardMetadata,
  PatientCardBadge,
  PatientCardTimeAgo,
  PatientCardExpandableContent,
  PatientCardActions,
} from './PatientCard'
export type {
  PatientCardProps,
  PatientCardHeaderProps,
  PatientCardAvatarProps,
  PatientCardInfoProps,
  PatientCardMetadataProps,
  PatientCardBadgeProps,
  PatientCardTimeAgoProps,
  PatientCardExpandableContentProps,
  PatientCardActionsProps,
} from './PatientCard'
