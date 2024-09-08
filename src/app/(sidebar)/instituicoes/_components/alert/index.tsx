import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface IProps {
  title: string;
  description: string;
  onChange: () => void;
  open: boolean;
}

export function Alert({ title, description, onChange, open }: IProps) {
  return (
    <AlertDialog open={open} onOpenChange={onChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle data-cy="institutions-create-alert-title">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription data-cy="institutions-create-alert-message">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction data-cy="institutions-create-alert-close">Ok</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
