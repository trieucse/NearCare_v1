import { OutputData } from "@editorjs/editorjs";
import React, { useState } from "react";
import { createReactEditorJS } from "react-editor-js";
import { setData } from "../app/editor/editor";
import { useAppDispatch } from "../app/hooks";
import { EDITOR_JS_TOOLS } from "../utils/tools";

const ReactEditorJS = createReactEditorJS();

export const Editor = () => {
  const blocks: any = {};
  const dispatch = useAppDispatch();
  const editorCore = React.useRef<any>(null);
  const handleInitialize = React.useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  const handleSave = React.useCallback(async () => {
    const description = await editorCore.current.save();
    dispatch(setData(description));
  }, []);
  return (
    <div>
      <ReactEditorJS
        defaultValue={blocks}
        tools={EDITOR_JS_TOOLS}
        onInitialize={handleInitialize}
        onChange={handleSave}
      />
    </div>
  );
};

export default Editor;
