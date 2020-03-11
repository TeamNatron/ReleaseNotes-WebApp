import React from "react";
import { classifyReleaseNote } from "../../utils/releaseNoteUtil";
import styled from "styled-components";
import HtmlWrapper from "../releaseView/HtmlWrapper";
const ReleaseNotePreview = React.memo(function MemoizedNote(props) {
  const type = classifyReleaseNote(props.note);
  const renderedNote = type => {
    switch (type) {
      case "DENSE":
        return <HtmlWrapper html={props.note.description} />;
      case "FULL":
        return (
          <React.Fragment>
            <Header>{props.note.title}</Header>
            <Ingress>{props.note.ingress}</Ingress>
          </React.Fragment>
        );
      default:
        break;
    }
  };
  return <React.Fragment>{renderedNote(type)}</React.Fragment>;
});

export default ReleaseNotePreview;

const Header = styled.div`
  padding-bottom: 0.8rem;
  font-size: 1.2rem;
`;
const Ingress = styled.div``;
