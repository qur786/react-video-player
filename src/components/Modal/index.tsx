import { XMarkIcon } from "@heroicons/react/16/solid";
import type { Dispatch, SetStateAction } from "react";
import { type PropsWithChildren, useEffect, useRef } from "react";

/**
 * Props for the Modal component.
 */
interface ModalProps extends PropsWithChildren {
  /**
   * Prop to open or close the modal.
   */
  open: boolean;
  /**
   * Function to set open state.
   */
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function Modal({ open, setOpen, children }: ModalProps): JSX.Element {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleCloseBtnClick = () => {
    if (dialogRef.current !== null) {
      dialogRef.current.close();
      setOpen(false);
    }
  };

  useEffect(() => {
    if (dialogRef.current !== null) {
      if (open) {
        dialogRef.current.showModal();
      }

      if (!open) {
        dialogRef.current.close();
      }
    }
  }, [open]);

  return (
    <dialog ref={dialogRef} className="z-20 rounded-2xl border-2 overflow-auto">
      <div>
        <button
          onClick={handleCloseBtnClick}
          className="absolute right-2 top-2"
        >
          <XMarkIcon className="h-6 text-red-700 hover:scale-110" />
        </button>
        {children}
      </div>
      <div className="h-full w-full backdrop-blur-3xl z-20"></div>
    </dialog>
  );
}
