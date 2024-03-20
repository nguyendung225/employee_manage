import React from "react";
import { Dialog, Button, DialogActions, DialogContent } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const ShowDialog = ({
  open,
  onConfirmDialogClose,
  text,
  title = "confirm",
  cancel = "hủy",
  onYesClick,
}) => {
  return (
    <Dialog fullWidth={true} open={open} onClose={onConfirmDialogClose}>
      <div className="pt-24 px-20 pb-8">
      <h4>{title}</h4>
      
       <DialogContent dividers>
       {text}
       </DialogContent>
        <DialogActions  className="flex flex-center">
          <Button
            variant="contained"
            color="secondary"
            onClick={onConfirmDialogClose}
          >
            {cancel}
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ShowDialog;
