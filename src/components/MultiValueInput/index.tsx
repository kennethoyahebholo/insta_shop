import React, { useEffect, useState } from "react";

import CancelIcon from "../../../public/assets/svgs/CancelIcon";

export interface IMultiValueInput {
  field: string;
  handleVariationChange: (field: string, tags: string[]) => void;
  tagsToBeUpdated?: string[];
  placeholder: string;
  label: string;
  error: string | boolean | string[] | undefined;
  hidePlaceholderAnimation?: boolean;
}

const MultiValueInput = ({
  field,
  handleVariationChange,
  tagsToBeUpdated,
  label,
  error,
  hidePlaceholderAnimation,
}: IMultiValueInput) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (tagsToBeUpdated?.length) {
      setTags(tagsToBeUpdated);
    }
  }, [tagsToBeUpdated]);

  const removeTags = (indexToRemove: number): void => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);

    setTags(updatedTags);

    handleVariationChange(field, updatedTags);
  };

  const addTags = (newTag: string): void => {
    const trimmedTag = newTag.trim();

    if (trimmedTag !== "") {
      const updatedTags = [...tags, trimmedTag];

      setTags(updatedTags);

      handleVariationChange(field, updatedTags);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();

      const input = event.currentTarget;

      const newTag = input.value.replace(",", "").trim();

      if (newTag) {
        input.value = "";
        addTags(newTag);
        setInputValue("");
      }
    }
  };

  return (
    <div className="relative">
      {label && (
        <div
          className={`absolute left-[18px] top-1/2 -translate-y-1/2 text-[#00000099] transition-transform duration-200 ease-in leading-[18.23px] tracking-[0.005em] text-left ${
            tags.length > 0 || inputValue || hidePlaceholderAnimation
              ? "top-[5px] left-[1px] text-[10px] bg-transparent py-0 px-[15px] z-[1] translate-y-0"
              : "text-[14px]"
          }`}
        >
          {label}
        </div>
      )}

      <div
        className={`border-[0.5px] border-[#00000033] rounded-[12px] py-[20px] px-4 text-[14px] w-full min-h-[78px] bg-transparent z-[1] relative font-medium text-[#000000e5] outline-none box-border`}
      >
        <ul className="flex flex-wrap p-0 gap-2 mb-1">
          {tags.map((tag, index) => (
            <li
              key={tag + index}
              className="bg-[#00000008] w-auto h-[25px] flex items-center justify-center gap-[6px] text-[#191919] py-[3px] pl-[10px] pr-[4px] text-[12px] leading-[15.62px] tracking-[0.5%] rounded-[90px] list-none"
            >
              <span>{tag}</span>

              <span
                className="block text-center text-[18px] text-[#959595] cursor-pointer"
                onClick={() => removeTags(index)}
              >
                <CancelIcon />
              </span>
            </li>
          ))}
        </ul>
        <input
          className="w-full bg-transparent z-[1] relative font-medium outline-none border-none"
          type="text"
          placeholder={""}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      {(tags.length > 0 || inputValue || hidePlaceholderAnimation) && (
        <div
          className={`text-[12px] font-medium leading-[15.62px] absolute left-[18px] top-[86%] -translate-y-1/2 text-[#00000099] transition-transform duration-200 ease-in tracking-[0.005em] text-left`}
        >
          Search or create collection
        </div>
      )}

      {error && (
        <p className="text-[red] text-[10px] bottom-[-12px] absolute">
          {error}
        </p>
      )}
    </div>
  );
};

export default MultiValueInput;
