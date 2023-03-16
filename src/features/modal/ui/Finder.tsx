import { FC } from "react";
import { Dialog } from "../layout/Dialog";
import { DialogProps } from "../modal.type";

interface FinderProps extends DialogProps {

}

export const Finder: FC<FinderProps> = (props) => {
  return (
    <Dialog {...props}>
      <span>
        Hello
      </span>
    </Dialog>
  )
}