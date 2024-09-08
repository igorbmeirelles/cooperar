import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

import React, { forwardRef } from "react";

export const CloseActions = forwardRef<HTMLButtonElement>((props, ref) => {
  return (
    <DialogClose asChild>
      <Button
        ref={ref}
        data-cy="farming-dialog-cancel"
        type="button"
        {...props}
      >
        Fechar
      </Button>
    </DialogClose>
  );
});

CloseActions.displayName = "CloseActions";
