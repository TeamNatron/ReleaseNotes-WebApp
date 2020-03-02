import React from "react";
import PropTypes from "prop-types";
import AdminExpansionPanelBase from "./AdminExpansionPanelBase";
import { useHistory } from "react-router";

const AdminExpansionPanelRoute = props => {
  const history = useHistory();

  const handleAction = (action, id) => {
    switch (action) {
      case "CREATE":
        history.push(props.createContentRoute);
        break;

      case "EDIT":
        history.push(props.editContentRoute.replace(":id", id));
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
