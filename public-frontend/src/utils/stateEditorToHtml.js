import { convertFromRaw, EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

const stateEditorToHtml = (state) => {
  if (state) {
    const rebuildedState = EditorState.createWithContent(convertFromRaw(JSON.parse(state))).getCurrentContent();
    return stateToHTML(rebuildedState);
  }

  return null;
};

export default stateEditorToHtml;
