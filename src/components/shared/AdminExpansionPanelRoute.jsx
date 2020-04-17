import React from "react";
import PropTypes from "prop-types";
import AdminExpansionPanelBase, { actions } from "./AdminExpansionPanelBase";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { basePropTypes } from "./AdminTableBase";
const AdminExpansionPanelRoute = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    createContentRoute,
    editContentRoute,
    onUpdate,
    onDelete,
    ...baseProps
  } = props;
  const handleAction = (action, rowData) => {
    switch (action) {
      case actions.CREATE:
        history.push(props.createContentRoute);
        break;
      case actions.EDIT:
        history.push(props.editContentRoute.replace(":id", rowData.id));
        break;
      case actions.UPDATE:
        dispatch(props.onUpdate(rowData.id, { isPublic: rowData.isPublic }));
        break;
      case actions.DELETE:
        dispatch(props.onDelete(rowData.id));
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
        createContentComponent={Boolean(createContentRoute)}
        edit={Boolean(editContentRoute)}
        delete={Boolean(onDelete)}
        isPublic={Boolean(onUpdate)}
        {...baseProps}
      />
    </React.Fragment>
  );
};

export default AdminExpansionPanelRoute;

const { onAction, ...exposedPropTypes } = basePropTypes;

AdminExpansionPanelRoute.propTypes = {
  ...exposedPropTypes,
  createContentRoute: PropTypes.string,
  editContentRoute: PropTypes.string,
  onUpdate: PropTypes.func,
};
