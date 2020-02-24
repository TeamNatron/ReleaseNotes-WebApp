import React from "react";
import EditReleaseNoteForm from "../ReleaseNoteEditor/EditReleaseNoteForm";
import { Box } from "@material-ui/core";
import { useHistory } from "react-router";
import { putReleaseNote } from "../../actions/releaseNoteActions";

const EditReleaseNoteScreen = props => {
  const id = props.params.id;
  const history = useHistory();
  const dispatch = useDispatch();

  const note = state.items.findIndex(r => r.item.id === id);
  console.log(note)
  useEffect(() => {
    console.log("Note: " + note);
    if (!note) {
      dispatch(fetchReleaseNote(id));
    }
  }, []);

  const handleSave = objectToSave => {
    dispatch(putReleaseNote(objectToSave));
  };
  const handleCancel = () => {
    history.goBack();
  };
  return (
    <PageContainer>
        <EditReleaseNoteForm
          note={note}
          onSave={handleSave}
          onCancel={handleCancel}
        />
    </PageContainer>
  );
};

export default EditReleaseNoteScreen;
