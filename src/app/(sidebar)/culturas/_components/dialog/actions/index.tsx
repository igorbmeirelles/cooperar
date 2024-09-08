import { DialogFooter } from "@/components/ui/dialog";
import { CloseActions } from "./close-action";
import { SubmitAction } from "./submit";

export function Actions() {
  return (
    <DialogFooter>
      <CloseActions />
      <SubmitAction />
    </DialogFooter>
  );
}
