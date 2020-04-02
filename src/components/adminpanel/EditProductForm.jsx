import React, { useMemo, forwardRef } from "react";
import PropTypes from "prop-types";
import { Box, Paper } from "@material-ui/core";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { postProductVersion } from "../../slices/productsSlice";
import { useDispatch } from "react-redux";

const EditProductForm = props => {
  const dispatch = useDispatch();
  const versionRows = useMemo(() => {
    console.log(props);
    return props.value.versions.map(version => {
      return {
        versionobj: version,
        version: version.version,
        fullName: version.fullName,
        isPublic: version.isPublic
      };
    });
  }, [props]);

  const [state, setState] = React.useState({
    columns: [
      { title: "Versjon", field: "version" },
      { title: "Publisert", field: "isPublic", type: "boolean" },
      { title: "Full navn", field: "fullName", readonly: true }
    ],
    data: versionRows
  });

  return (
    <React.Fragment>
      <Paper>
        <Box px={5} py={3}>
          <h2>{props.value.name}</h2>
          <h3>Editer produkt</h3>
          <MaterialTable
            icons={tableIcons}
            title={"Alle versjoner av " + props.value.name}
            columns={state.columns}
            data={state.data}
            options={{
              search: false,
              paging: false,
              filtering: false
            }}
            editable={{
              onRowAdd: newData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    dispatch(
                      postProductVersion(props.id, {
                        version: newData.version,
                        isPublic: newData.isPublic
                      })
                    );
                    setState(prevState => {
                      const data = [...prevState.data];
                      data.push(newData);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      setState(prevState => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                      });
                    }
                  }, 600);
                })
            }}
          />
        </Box>
      </Paper>
    </React.Fragment>
  );
};

// Material-table needs to know about every icon that we are going to use
// One way of achieving this is to specify each Icon.

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default EditProductForm;

EditProductForm.propTypes = {
  id: PropTypes.number,
  value: PropTypes.object
};
