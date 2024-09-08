import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertProps {
  isOpen: boolean;
  onChange: (isOpen: boolean) => void;
  title: string;
  description: string;
}

export function Alert({ isOpen, onChange, title, description }: AlertProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle data-cy="farming-alert-title">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription data-cy="farming-alert-message">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction data-cy="farming-alert-close">
            Ok
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
