import React, { forwardRef, useEffect } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
import Refresh from "@material-ui/icons/Refresh";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRNSMappable,
  fetchAZDMappable,
  AZDTableFieldSelector,
  RNSTableFieldSelector,
  fetchRNSMappings,
  rnsMappingsTableFields,
} from "../../slices/mappingSlice";
import { useState } from "react";

const AzureMappingView = (props) => {
  const { authToken, project, org } = props;
  const rnsTableRef = React.createRef();
  const dispatch = useDispatch();

  // The state of the available AzureDevOps-fields.
  const [lookup, setLookup] = useState({
    0: "",
  });

  useEffect(() => {
    dispatch(fetchRNSMappable());
    dispatch(fetchRNSMappings());
  }, [dispatch]);

  useEffect(() => {
    if (authToken === "" || project === "" || org === "") return;
    dispatch(fetchAZDMappable(authToken, project, org, "task"));
  }, [authToken, dispatch, org, project]);

  const rnsFields = useSelector(RNSTableFieldSelector);
  const azdFields = useSelector(AZDTableFieldSelector);
  const rnsMappings = useSelector(rnsMappingsTableFields);

  // Updates the fields on selector change
  useEffect(() => {
    rnsTableRef.current && rnsTableRef.current.onQueryChange();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rnsFields]);

  useEffect(() => {
    if (Object.keys(azdFields).length === 0 && azdFields.constructor === Object)
      return;
    setLookup(azdFields);
  }, [azdFields, setLookup]);

  // TODO Debugger for column state
  // useEffect(() => {
  //   console.log("Printing lookup");
  //   console.log(lookup);
  // }, [lookup]);

  // TODO Debugger for rnsMappings
  useEffect(() => {
    console.log("Printing mappings");
    console.log(rnsMappings);
  }, [rnsMappings]);

  /**
   * Returns an array of rows to be used by the mapping-table
   * @param {*} arr
   */
  const createRows = (arr) => {
    var resultArr;
    resultArr = deepCopyArray(arr);
    return resultArr;
  };

  /**
   * Returns a deepcopy of an array
   * @param {Array of objects} arr
   */
  const deepCopyArray = (arr) => {
    if (arr.length === 0) return [];
    return arr.map((obj) => {
      // Getting a mutable copy of previous state
      var newObj = Object.create(obj);
      newObj.azdFieldName = 0;
      return newObj;
    });
  };

  const getEditable = () => {
    return {
      onRowUpdate: (newData, oldData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            // {
            //   const data = this.state.data;
            //   const index = data.indexOf(oldData);
            //   data[index] = newData;
            //   this.setState({ data }, () => resolve());
            // }
            resolve();
          }, 1000);
        }),
    };
  };

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Release Note Mapping</Typography>
      </ExpansionPanelSummary>
      <MaterialTable
        icons={tableIcons}
        tableRef={rnsTableRef}
        title={"Release Note System fields"}
        columns={[
          {
            title: "ReleaseNote-Felt",
            field: "rnsFieldName",
            editable: false,
            readOnly: true,
          },
          {
            title: "AzureDevOps-Felt",
            field: "azdFieldName",
            lookup: lookup,
          },
        ]}
        data={(query) =>
          new Promise((resolve, reject) => {
            // Creates a new array which clones each object it contains.
            // This was done to make the objects mutable.
            var newArray = createRows(rnsMappings);
            resolve({
              data: newArray,
              page: 0,
              totalCount: newArray.length,
            });
          })
        }
        editable={getEditable()}
        actions={actionsMappingTable(rnsTableRef)}
        options={optionsMappingTable}
        // components={getAzureDevOpsFieldSelector()}
      />
      {/* <Grid container spacing={2}>
        <Grid item xs={6}>
          <MaterialTable
            icons={tableIcons}
            tableRef={rnsTableRef}
            title={"Release Note System fields"}
            columns={columns}
            data={(query) =>
              new Promise((resolve, reject) => {
                // Creates a new array which clones each object it contains.
                // This was done to make the objects mutable.
                var newArray = deepCopyArray(rnsFields);
                resolve({
                  data: newArray,
                  page: 0,
                  totalCount: newArray.length,
                });
              })
            }
            actions={actionRefreshButton(rnsTableRef)}
            options={optionsReadOnlyTable}
          />
        </Grid>
        <Grid item xs={6}>
          <MaterialTable
            icons={tableIcons}
            tableRef={azdTableRef}
            title={"Azure DevOps fields"}
            columns={columns}
            data={(query) =>
              new Promise((resolve, reject) => {
                // Creates a new array which clones each object it contains.
                // This was done to make the objects mutable.
                var newArray = deepCopyArray(azdFields);
                resolve({
                  data: newArray,
                  page: 0,
                  totalCount: newArray.length,
                });
              })
            }
            actions={actionRefreshButton(azdTableRef)}
            options={optionsReadOnlyTable}
          />
        </Grid>
      </Grid> */}
    </ExpansionPanel>
  );
};

export default AzureMappingView;

const actionsMappingTable = (ref) => {
  return [
    {
      icon: () => <Refresh />,
      tooltip: "Refresh Data",
      isFreeAction: true,
      onClick: () => ref.current && ref.current.onQueryChange(),
    },
  ];
};

const optionsMappingTable = {
  search: false,
  paging: false,
  filtering: false,
  maxBodyHeight: 400,
  headerStyle: { position: "sticky", top: 0 },
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
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
