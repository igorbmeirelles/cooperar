import { DialogFooter } from "@/components/ui/dialog";
import { CloseAction } from "./close";
import { SubmitAction } from "./submit";

export function DialogActions() {
  return (
    <DialogFooter>
      <CloseAction />
      <SubmitAction />
    </DialogFooter>
  );
}
