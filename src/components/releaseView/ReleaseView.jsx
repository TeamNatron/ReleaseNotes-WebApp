import React, { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import DenseReleaseNoteRow from "./DenseReleaseNoteRow";
import FullReleaseNote from "./FullReleaseNote";
import {
  TableBody,
  TableContainer,
  TableRow,
  Table,
  Typography,
  Paper,
  Box,
  Divider
} from "@material-ui/core";
import shortid from "shortid";
import styled from "styled-components";

/**
 * Takes a release with releasenotes and generates a full
 * release "article"
 * @param {*} props
 */
const ReleaseView = props => {
  const [fullNotes, setFullNotes] = useState([]);
  const [denseNotes, setDenseNotes] = useState([]);

  useMemo(() => {
    const formatNote = note => {
      const { title, ingress, description } = note;
      const [hasTitle, hasIngress, hasDescription] = [
        hasText(title),
        hasText(ingress),
        hasText(description)
      ];

      if (!hasDescription) return; // there should always be a description
      if (hasDescription && !hasIngress && !hasTitle) {
        setDenseNotes(d =>
          d.concat([<DenseReleaseNoteRow note={note} key={note.id} />])
        );
      } else
        setFullNotes(f =>
          f.concat([<FullReleaseNote note={note} key={note.id} />])
        );
    };
    props.release.releaseNotes.forEach(note => {
      formatNote(note);
    });
  }, [props]);

  return (
    <React.Fragment>
      <Typography variant="h1">
        {props.release.title}
      </Typography>

      <Box my={4}>{fullNotes}</Box>

      <Typography gutterBottom variant="h2">Andre endringer</Typography>

      <Box>
        <TablePaper elevation={0} variant="outlined">
          <Table size="small">
            <TableBody>
              {denseNotes.map(denseNote => (
                <React.Fragment>
                  <TableRow >{denseNote}</TableRow>
                </React.Fragment>
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

const StyledTableRow = styled(TableRow)``;

// empty html tag | empty string
const isEmptyRegEx = /<[^/][^>]*><\/[^>]+>|^$/;
const hasText = str => {
  return !(str ? isEmptyRegEx.test(str) : true);
};

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
    id: 101,
    productVersion: {
      id: 101,
      productId: 100,
      product: {
        id: 100,
        name: "Cordel Inne",
        isPublic: false
      },
      version: "3.1.1",
      isPublic: false
    },
    title: "Love Sosa",
    isPublic: false,
    releaseNotes: [
      {
        id: 3,
        title: "<h3>Nytt bestillingssytem</h3>",
        ingress:
          "<p>Du kan nå enkelt legge inn alle timene du har brukt for kjøring til oppdragssted</p>",
        description:
          "<p>For å benytte deg av denne funksjonen kan du gjøre som forklart her ... <br/> ... <br/> ... </p>",
        authorName: "Aung San Suu Kyi",
        authorEmail: "aungsansuukyi@natron.no",
        workItemDescriptionHtml: "<div>fix house-arrest bug</div>",
        workItemTitle: "Receive Nobel Price",
        workItemId: 21,
        closedDate: "2012-06-16T16:08:24.044",
        isPublic: true
      },
      {
        id: 4,
        title: "",
        ingress: "",
        description: "<p>Endelig har føkkings korona komt til Molde</p>",
        authorName: "Ronnay Voudrait",
        authorEmail: "ronnay@natron.no",
        workItemDescriptionHtml:
          '<div><div>Fixed the shangala bangala<br></div><div><img src="https://dev.azure.com/ReleaseNoteSystem/399f705f-cd58-45f2-becb-f890cb50f774/_apis/wit/attachments/9a3d3458-8831-4eb4-af7d-adf0269c8e32?fileName=image.png" alt=Image></div><div><br></div><div><ol><li>Lars Skriver Mye</li><li>Lars Skriver Mye</li><li>Lars Skriver Mye</li><li>Lars Skriver Mye</li><li>Lars Skriver Mye</li><li>Lars Skriver MyeLars <b>Skriver</b> MyeLars <i>Skriver Mye</i><br></li></ol></div><span>&#128521;</span><span>&#128515;</span></div><blockquote style="margin-top:0px;margin-bottom:0px;"><blockquote style="margin-top:0px;margin-bottom:0px;"><blockquote style="margin-top:0px;margin-bottom:0px;"><div>fafaas</div></blockquote></blockquote><div>Lars Skriver Mye</div></blockquote><div><br></div><div><br></div><div><h1>Lars Skriver Mye<br></h1></div><div><h2></h2></div>',
        workItemTitle: "Test item please ignore",
        workItemId: 20,
        closedDate: "2001-07-11T23:05:12.023",
        isPublic: false
      },
      {
        id: 2,
        title: null,
        ingress: null,
        description: "<p>unlucky, sier forskere</p>",
        authorName: "Liu chi",
        authorEmail: "luichi@natron.no",
        workItemDescriptionHtml: "<div>Eliminated all escapists</div>",
        workItemTitle: "Forbid escapism",
        workItemId: 22,
        closedDate: "2190-07-11T06:21:21.021",
        isPublic: false
      },
      {
        id: 1,
        title: "<h2>Trump bygger veggg mot Corona</h2>",
        ingress: "",
        description: "<p>Det hjelper fint lite, sier forskere</p>",
        authorName: "Ronnay Voudrait",
        authorEmail: "ronnay@natron.no",
        workItemDescriptionHtml: "<div>Whoa whoa hey hey hey</div>",
        workItemTitle: "Fix issues with the application",
        workItemId: 20,
        closedDate: "2005-07-11T14:00:59.004",
        isPublic: false
      },
      {
        id: 10,
        title: "",
        ingress: "",
        description: "",
        authorName: "Ronnay Voudrait",
        authorEmail: "ronnay@natron.no",
        workItemDescriptionHtml: "<div>Whoa whoa hey hey hey</div>",
        workItemTitle: "Fix issues with the application",
        workItemId: 20,
        closedDate: "2005-07-11T14:00:59.004",
        isPublic: false
      }
    ]
  }
};
