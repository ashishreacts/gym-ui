import { AppNotification, useNotificationStore } from "@/stores/notifications";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Snackbar } from "@mui/material";
import React from "react";

type NotificationPopupArgs = {
  notification: AppNotification;
  dismissNotification: (id: string) => void;
};

const NotificationPopup: React.FC<NotificationPopupArgs> = ({
  notification,
  dismissNotification,
}) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dismissNotification(notification.id);
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={notification.message}
      action={action}
    />
  );
};

export const Notifications = () => {
  const { notifications, dismissNotification } = useNotificationStore();

  return (
    <>
      {notifications.map((notification) => (
        <NotificationPopup
          key={notification.id}
          notification={notification}
          dismissNotification={dismissNotification}
        />
      ))}
    </>
  );
};
