import React from "react";
import PropTypes from "prop-types";
import AdminExpansionPanelBase from "./AdminExpansionPanelBase";
import { useHistory } from "react-router";
import { updateIsPublic } from "../../slices/releaseSlice";
import { useDispatch } from "react-redux";

const AdminExpansionPanelRoute = props => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleAction = (action, id, isPublic) => {
    switch (action) {
      case "CREATE":
        history.push(props.createContentRoute);
        break;

      case "EDIT":
        history.push(props.editContentRoute.replace(":id", id));
        break;

      case "UPDATE":
        dispatch(updateIsPublic(id, isPublic));
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
        edit={Boolean(props.editContentRoute)}
        isPublic={true}
        {...props}
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
  editContentRoute: PropTypes.string
};
