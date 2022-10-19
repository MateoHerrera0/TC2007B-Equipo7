import * as React from "react";
import * as ReactDOM from "react-dom";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

export default function Popup(props) {

  const toggleDialog = () => {
    props.setVisible(!props.visible);
  };

  return (
    <div data-testid='popup'>
      {props.visible && (
        <Dialog title={props.popupTitle} onClose={toggleDialog}>
          <div
            style={{
              margin: "25px",
              textAlign: "center",
            }}
          >
            {props.popupBody}
          </div>
          <DialogActionsBar>
            <button
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              onClick={toggleDialog}
            >
              No
            </button>
            <button
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              onClick={props.okFunction}
            >
              Si
            </button>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  );
};