import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import DenseReleaseNoteRow from "./DenseReleaseNoteRow";
import FullReleaseNote from "./FullReleaseNote";
import {
  TableBody,
  TableRow,
  Table,
  Typography,
  Paper,
  Box
} from "@material-ui/core";
import styled from "styled-components";
import ReleaseH1 from "../shared/ReleaseH1";
import ReleaseH2 from "../shared/ReleaseH2";
import { useEffect } from "react";
import { formatDate } from "../../utils/parser";
import { classifyReleaseNote } from "../../utils/releaseNoteUtil";

/**
 * Takes a release with releasenotes and generates a full
 * release "article"
 * @param {*} props
 */
const ReleaseView = props => {
  const [fullNotes, setFullNotes] = useState([]);
  const [denseNotes, setDenseNotes] = useState([]);
  const [formattedDate, setFormattedDate] = useState("");

  useMemo(() => {
    console.log("doing it");
    const newDenseNotes = [];
    const newFullNotes = [];
    props.release.releaseNotes.forEach(note => {
      const type = classifyReleaseNote(note);
      switch (type) {
        case "DENSE":
          newDenseNotes.push(<DenseReleaseNoteRow note={note} key={note.id} />);
          break;
        case "FULL":
          newFullNotes.push(<FullReleaseNote note={note} key={note.id} />);
          break;
        default:
          break;
      }
    });
    setDenseNotes(newDenseNotes);
    setFullNotes(newFullNotes);
  }, [props.release.releaseNotes]);

  useEffect(() => {
    if (props.release.date) {
      setFormattedDate(formatDate(props.release.date));
    }
  }, [props.release.date]);

  return (
    <React.Fragment>
      <Typography component={ReleaseH1}>{props.release.title}</Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {formattedDate}
      </Typography>
      <Box my={4}>{fullNotes}</Box>

      <Typography component={ReleaseH2}>Andre endringer</Typography>

      <Box mt={2}>
        <TablePaper elevation={0} variant="outlined">
          <Table size="small">
            <TableBody>
              {denseNotes.map(denseNote => (
                <TableRow key={denseNote.key}>{denseNote}</TableRow>
              ))}
            </TableBody>
          </Table>
        </TablePaper>
      </Box>
    </React.Fragment>
  );
};

export default ReleaseView;

const TablePaper = styled(Paper)`
  && {
    background-color: transparent;
  }
`;

ReleaseView.propTypes = {
  /*release: PropTypes.objectOf(
    (PropTypes.shape = {
      id: PropTypes.number,
      title: PropTypes.string,
      releaseNotes: PropTypes.array,
      productVersion: PropTypes.object
    })
  )*/
  release: PropTypes.object
};

ReleaseView.defaultProps = {
  release: {
    id: "",
    productVersion: {
      id: "",
      productId: "",
      product: {
        id: "",
        name: "",
        isPublic: false
      },
      version: "",
      isPublic: false
    },
    title: "",
    isPublic: false,
    releaseNotes: []
  }
};
