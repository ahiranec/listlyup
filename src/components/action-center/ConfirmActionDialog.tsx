/**
 * ConfirmActionDialog Component
 * Generic confirmation dialog - reutilizable para múltiples acciones
 * 
 * Features:
 * - Variantes: destructive (rojo), success (verde), warning (amarillo), info (azul)
 * - Confirmación visual clara
 * - Muestra detalles opcionales
 * - Explicación de consecuencias
 * - Diseño consistente con TradeOfferConfirmDialog
 */

import { CheckCircle, XCircle, AlertTriangle, Info, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '../ui/alert-dialog';

type ConfirmVariant = 'destructive' | 'success' | 'warning' | 'info';

export interface ConfirmActionDialogData {
  variant?: ConfirmVariant;
  icon?: 'check' | 'x' | 'alert' | 'info' | 'trash';
  title: string;
  description: string;
  details?: Array<{
    label: string;
    value: string;
    highlight?: boolean;
  }>;
  consequences?: {
    title: string;
    items: string[];
  };
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
}

interface ConfirmActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // Support both old API (individual props) and new API (data object)
  data?: ConfirmActionDialogData;
  // Old API (deprecated, kept for backward compatibility)
  variant?: ConfirmVariant;
  icon?: 'check' | 'x' | 'alert' | 'info' | 'trash';
  title?: string;
  description?: string;
  details?: Array<{
    label: string;
    value: string;
    highlight?: boolean;
  }>;
  consequences?: {
    title: string;
    items: string[];
  };
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
}

const variantConfig = {
  destructive: {
    headerBg: 'bg-red-50 dark:bg-red-950/30',
    iconBg: 'bg-red-100 dark:bg-red-900',
    iconColor: 'text-red-600 dark:text-red-500',
    buttonClass: 'bg-red-600 hover:bg-red-700',
    alertBg: 'bg-red-50 dark:bg-red-950/20',
    alertBorder: 'border-red-200 dark:border-red-900',
    alertColor: 'text-red-600 dark:text-red-500',
    alertTextTitle: 'text-red-900 dark:text-red-100',
    alertTextBody: 'text-red-700 dark:text-red-300',
  },
  success: {
    headerBg: 'bg-green-50 dark:bg-green-950/30',
    iconBg: 'bg-green-100 dark:bg-green-900',
    iconColor: 'text-green-600 dark:text-green-500',
    buttonClass: 'bg-green-600 hover:bg-green-700',
    alertBg: 'bg-green-50 dark:bg-green-950/20',
    alertBorder: 'border-green-200 dark:border-green-900',
    alertColor: 'text-green-600 dark:text-green-500',
    alertTextTitle: 'text-green-900 dark:text-green-100',
    alertTextBody: 'text-green-700 dark:text-green-300',
  },
  warning: {
    headerBg: 'bg-amber-50 dark:bg-amber-950/30',
    iconBg: 'bg-amber-100 dark:bg-amber-900',
    iconColor: 'text-amber-600 dark:text-amber-500',
    buttonClass: 'bg-amber-600 hover:bg-amber-700',
    alertBg: 'bg-amber-50 dark:bg-amber-950/20',
    alertBorder: 'border-amber-200 dark:border-amber-900',
    alertColor: 'text-amber-600 dark:text-amber-500',
    alertTextTitle: 'text-amber-900 dark:text-amber-100',
    alertTextBody: 'text-amber-700 dark:text-amber-300',
  },
  info: {
    headerBg: 'bg-blue-50 dark:bg-blue-950/30',
    iconBg: 'bg-blue-100 dark:bg-blue-900',
    iconColor: 'text-blue-600 dark:text-blue-500',
    buttonClass: 'bg-blue-600 hover:bg-blue-700',
    alertBg: 'bg-blue-50 dark:bg-blue-950/20',
    alertBorder: 'border-blue-200 dark:border-blue-900',
    alertColor: 'text-blue-600 dark:text-blue-500',
    alertTextTitle: 'text-blue-900 dark:text-blue-100',
    alertTextBody: 'text-blue-700 dark:text-blue-300',
  },
};

const iconMap = {
  check: CheckCircle,
  x: XCircle,
  alert: AlertTriangle,
  info: Info,
  trash: Trash2,
};

export function ConfirmActionDialog({ 
  open, 
  onOpenChange,
  data,
  // Old API props
  variant: variantProp = 'info',
  icon: iconProp = 'alert',
  title: titleProp,
  description: descriptionProp,
  details: detailsProp,
  consequences: consequencesProp,
  confirmLabel: confirmLabelProp = 'Confirm',
  cancelLabel: cancelLabelProp = 'Cancel',
  onConfirm: onConfirmProp
}: ConfirmActionDialogProps) {
  if (!open) return null;

  // Use data object if provided, otherwise fall back to individual props
  const variant = data?.variant ?? variantProp;
  const icon = data?.icon ?? iconProp;
  const title = data?.title ?? titleProp ?? '';
  const description = data?.description ?? descriptionProp ?? '';
  const details = data?.details ?? detailsProp;
  const consequences = data?.consequences ?? consequencesProp;
  const confirmLabel = data?.confirmLabel ?? confirmLabelProp;
  const cancelLabel = data?.cancelLabel ?? cancelLabelProp;
  const onConfirm = data?.onConfirm ?? onConfirmProp ?? (() => {});

  const config = variantConfig[variant];
  const IconComponent = iconMap[icon];

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md p-0 overflow-hidden">
        {/* Header */}
        <div className={`p-6 rounded-t-2xl ${config.headerBg}`}>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full ${config.iconBg} flex items-center justify-center`}>
              <IconComponent className={`w-6 h-6 ${config.iconColor}`} />
            </div>
            <AlertDialogHeader className="text-left">
              <AlertDialogTitle className="text-lg font-semibold">
                {title}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-muted-foreground">
                {description}
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Details */}
          {details && details.length > 0 && (
            <div className="p-4 rounded-lg bg-muted/50 border border-border space-y-2">
              {details.map((detail, idx) => (
                <div key={idx} className="flex items-start justify-between text-sm">
                  <span className="text-muted-foreground">{detail.label}:</span>
                  <span className={`font-medium text-right ${
                    detail.highlight ? 'text-primary' : ''
                  }`}>
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Consequences */}
          {consequences && (
            <div className={`flex gap-3 p-3 rounded-lg ${config.alertBg} border ${config.alertBorder}`}>
              <AlertTriangle className={`w-5 h-5 ${config.alertColor} shrink-0 mt-0.5`} />
              <div className="text-sm">
                <p className={`font-medium mb-1 ${config.alertTextTitle}`}>{consequences.title}</p>
                <ul className={`space-y-1 text-xs ${config.alertTextBody}`}>
                  {consequences.items.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <AlertDialogFooter className="px-6 pb-6 flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            {cancelLabel}
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className={`flex-1 ${config.buttonClass}`}
          >
            {confirmLabel}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}