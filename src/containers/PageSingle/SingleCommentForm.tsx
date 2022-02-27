import React, { FC } from "react";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonSecondary from "../../components/ButtonSecondary";
import Textarea from "../../components/Textarea";

export interface SingleCommentFormProps {
  className?: string;
  commentId?: number;
  onClickSubmit: (id?: number) => void;
  onClickCancel: (id?: number) => void;
  textareaRef?: React.MutableRefObject<null>;
  defaultValue?: string;
  rows?: number;
}

const SingleCommentForm: FC<SingleCommentFormProps> = ({
  className = "mt-5",
  commentId,
  onClickSubmit,
  onClickCancel,
  textareaRef,
  defaultValue = "",
  rows = 4,
}) => {
  return (
    <form action="#" className={`nc-SingleCommentForm ${className}`}>
      <Textarea
        placeholder="Add to discussion"
        ref={textareaRef}
        required={true}
        defaultValue={defaultValue}
        rows={rows}
      />
      <div className="mt-2 space-x-3">
        <ButtonPrimary onClick={() => onClickSubmit(commentId)} type="submit">
          Submit
        </ButtonPrimary>
        <ButtonSecondary type="button" onClick={() => onClickCancel(commentId)}>
          Cancel
        </ButtonSecondary>
      </div>
    </form>
  );
};

export default SingleCommentForm;
