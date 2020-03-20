import React from "react";
import PropTypes from "prop-types";
import AdminExpansionPanelBase from "./AdminExpansionPanelBase";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { putReleaseById } from "../../slices/releaseSlice";

const AdminExpansionPanelRoute = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    createContentRoute,
    editContentRoute,
    onUpdate,
    onDelete,
    ...baseProps
  } = props;
  const handleAction = (action, id, isPublic) => {
    switch (action) {
      case "CREATE":
        history.push(props.createContentRoute);
        break;

      case "EDIT":
        history.push(props.editContentRoute.replace(":id", id));
        break;

      case "UPDATE":
        dispatch(props.onUpdate(id, { isPublic }));
        break;
      case "DELETE":
        dispatch(props.onDelete(id));
        break;

      default:
        console.table(
          "Action not found.. please contact your local developer",
          action
        );
        break;
    }
  };

  return (
    <React.Fragment>
      <AdminExpansionPanelBase
        onAction={handleAction}
        edit={Boolean(editContentRoute)}
        delete={Boolean(onDelete)}
        isPublic={Boolean(onUpdate)}
        {...baseProps}
      />
    </React.Fragment>
  );
};

export default AdminExpansionPanelRoute;

AdminExpansionPanelRoute.propTypes = {
  label: PropTypes.string,
  rows: PropTypes.array,
  icon: PropTypes.element,
  createContentRoute: PropTypes.string,
  editContentRoute: PropTypes.string,
  onUpdate: PropTypes.func
};
