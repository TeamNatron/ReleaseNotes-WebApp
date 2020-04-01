import React from "react";
import PropTypes from "prop-types";
import AdminExpansionPanelBase, {
  actions,
  basePropTypes
} from "./AdminExpansionPanelBase";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
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
  const handleAction = (action, rowData) => {
    const { id, isPublic } = rowData;
    console.log(rowData);
    switch (action) {
      case actions.CREATE:
        history.push(props.createContentRoute);
        break;

      case actions.EDIT:
        history.push(props.editContentRoute.replace(":id", id));
        break;
      case actions.UPDATE:
        dispatch(props.onUpdate(id, { isPublic }));
        break;
      case actions.DELETE:
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
const { onAction, expanded, ...exposedPropTypes } = basePropTypes;
AdminExpansionPanelRoute.propTypes = {
  ...exposedPropTypes,
  createContentRoute: PropTypes.string,
  editContentRoute: PropTypes.string,
  onUpdate: PropTypes.func
};
