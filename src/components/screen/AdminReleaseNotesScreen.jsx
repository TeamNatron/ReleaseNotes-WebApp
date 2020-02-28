import React from "react";
import PageContainer from "../shared/PageContainer";
import ScreenTitle from "../shared/ScreenTitle";
import Ingress from "../shared/Ingress";
import SpacedDivider from "../shared/SpacedDivider";
import {
  IconButton,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableHead,
} from "@material-ui/core";
import { Edit, Block, Check } from "@material-ui/icons";
import styled from "styled-components";
import { green, red } from "@material-ui/core/colors";
import { useHistory } from "react-router";

const AdminReleaseNotesScreenModal = () => {
  //const releaseNotes = useSelector(state => state.releaseNotes.items);
  // dummy data
  const releaseNotes = [
    {
      workItemTitle: "Release Note 5",
      ingress:
        "In this release note we wrote everything we did to make things better",
      id: "4"
    },
    {
      workItemTitle: "Release Note 6",
      ingress:
        "In this release note we wrote everything we did to make things better",
      id: "1"
    },
    {
      workItemTitle: "Release Note 7",
      ingress:
        "In this release note we wrote everything we did to make things better",
      id: "2"
    },
    {
      workItemTitle: "Release Note 8",
      ingress:
        "In this release note we wrote everything we did to make things better",
      id: "3"
    }
  ];

  const columns = [
    { id: "ready", label: "Klar" },
    { id: "name", label: "Name", align: "left" },
    {
      id: "button",
      label: "",
      minWidth: 170,
      align: "right",
      format: value => value.toFixed(2)
    }
  ];

  const history = useHistory();
  const handleEditReleaseNote = id => {
    history.push("/admin/releasenotes/" + id);
  };

  return (
    <PageContainer>
      <ScreenTitle>ADMINPANEL</ScreenTitle>
      <Ingress gutterBottom>Rediger release notes.</Ingress>
      <SpacedDivider />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {releaseNotes.map(note => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={note.workItemTitle}
                >
                  {columns.map(column => {
                    if (column.id === "button") {
                      return (
                        <StyledTableCell>
                          <IconButton
                            onClick={() => handleEditReleaseNote(note.id)}
                          >
                            <EditButton fontSize="small" />
                          </IconButton>
                        </StyledTableCell>
                      );
                    } else if (column.id === "name") {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {note.workItemTitle}
                        </TableCell>
                      );
                    } else if (column.id === "ready") {
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {note.ready ? (
                            <Check style={{ color: green[500] }} />
                          ) : (
                            <Block style={{ color: red[200] }} />
                          )}
                        </StyledTableCell>
                      );
                    }
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </PageContainer>
  );
};
export default AdminReleaseNotesScreenModal;

const StyledTableCell = styled(TableCell)`
  width: 0;
`;

const EditButton = styled(Edit)`
  margin-left: auto;
`;
