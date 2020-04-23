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
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAZDMappable,
  AZDTableFieldSelector,
  fetchRNSMappings,
  rnsMappingsTableFields,
  putMapping,
} from "../../slices/mappingSlice";
import PropTypes from "prop-types";
import { useState } from "react";
import GeneralSelector from "../shared/GeneralSelector";

const AzureMappingView = (props) => {
  const { azureProps, selectedProject } = props;
  const rnsTableRef = React.createRef();
  const dispatch = useDispatch();

  // ------- STATES -------
  const [lookup, setLookup] = useState({
    0: "",
  });
  const [localMappings, setLocalMappings] = useState([{}]);
  const [workItemTypes] = useState(["task", "bug"]);
  const [selectedWorkItemType, setSelectedWorkItemType] = useState("task");

  // ------- DATA FETCHING -------
  useEffect(() => {
    dispatch(fetchRNSMappings(selectedWorkItemType));
  }, [dispatch, selectedWorkItemType]);

  useEffect(() => {
    const { authToken, organization } = azureProps;
    if (
      authToken === "" ||
      selectedProject === "" ||
      organization === "" ||
      selectedWorkItemType === ""
    )
      return;
    if (!authToken || !selectedProject || !organization) return;
    dispatch(
      fetchAZDMappable(
        authToken,
        selectedProject,
        organization,
        selectedWorkItemType
      )
    );
  }, [dispatch, azureProps, selectedProject, selectedWorkItemType]);

  const azdFields = useSelector(AZDTableFieldSelector);
  const rnsMappings = useSelector(rnsMappingsTableFields);

  // ------- UPDATE DATA -------
  useEffect(() => {
    if (!rnsMappings) return;
    if (!lookup || lookup[0] === "") {
      setLocalMappings(rnsMappings);
      return;
    }

    // To get the correct index of mappings, a comparison is made between strings
    rnsMappings.forEach((obj) => {
      if (obj.azureDevOpsField === "" || !obj.azureDevOpsField) return;

      // Find the id of this string
      for (const index in lookup) {
        // find matching string
        if (lookup[index] === obj.azureDevOpsField) {
          // return id
          obj.azdFieldName = index;
          break;
        }
      }
    });

    setLocalMappings(rnsMappings);
  }, [lookup, rnsMappings]);

  // Update local state with all the available fields from Azure
  useEffect(() => {
    // If there's no members in object, just return
    if (Object.keys(azdFields).length === 0 && azdFields.constructor === Object)
      return;
    setLookup(azdFields);
  }, [azdFields, setLookup]);

  const getEditable = () => {
    return {
      onRowUpdate: (newData, oldData) =>
        new Promise((resolve, reject) => {
          try {
            // Get the field name to set
            const newAzdField = lookup[newData.azdFieldName];

            // Get tableObject
            var index = localMappings.indexOf(oldData);
            var tableObject = localMappings[index];

            // Get id of mapping
            var mappingId = tableObject.id;

            dispatch(putMapping(mappingId, newAzdField, selectedWorkItemType));
          } catch {
            throw new Error("Couldn't find object");
          }
          resolve();
        }),
    };
  };

  const handleSelectedWorkItemType = (event) => {
    setSelectedWorkItemType(event.currentTarget.textContent);
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
      <GeneralSelector
        items={workItemTypes}
        selected={selectedWorkItemType}
        handleChange={handleSelectedWorkItemType}
        helperText="Velg en Work-Item Type"
        ml={25}
      />
      <MaterialTable
        icons={tableIcons}
        tableRef={rnsTableRef}
        title={"Release Note System fields"}
        columns={[
          {
            title: "ReleaseNote-Felt",
            field: "rnsFieldName",
            editable: "never",
            readOnly: true,
          },
          {
            title: "AzureDevOps-Felt",
            field: "azdFieldName",
            lookup: lookup,
          },
        ]}
        data={localMappings}
        editable={getEditable()}
        options={optionsMappingTable}
      />
    </ExpansionPanel>
  );
};

export default AzureMappingView;

AzureMappingView.propTypes = {
  azureProps: PropTypes.object.isRequired,
  selectedProject: PropTypes.string.isRequired,
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
