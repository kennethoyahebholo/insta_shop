import React, { useEffect, useState } from "react";

import CancelIcon from "../../../public/assets/svgs/CancelIcon";
import BreadCrumbs from "../../../public/assets/svgs/BreadCrumbs";

export interface IMultiValueInventoryInput {
  field: string;
  handleVariationChange: (field: string, tags: string[]) => void;
  tagsToBeUpdated?: string[];
  placeholder: string;
  label: string;
  type: string;
  error: string | boolean | string[] | undefined;
}

const MultiValueInventoryInput = ({
  field,
  handleVariationChange,
  tagsToBeUpdated,
  label,
  type,
  placeholder,
  error,
}: IMultiValueInventoryInput) => {
  const [tags, setTags] = useState<string[]>([]);

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
      }
    }
  };

  return (
    <div className="relative border-[0.5px] border-[#00000033] rounded-[12px] text-[14px] w-full min-h-[122px] bg-transparent z-[1] outline-none box-border">
      <div className="w-full pl-[4px]">
        <div className="py-[10px] pl-[16px] pr-[20px] flex items-center text-[10px] left-[1px] justify-between  border-b-[0.5px] border-[#00000033]">
          <div className="">
            <p className="mb-[1px] text-[10px] leading-[13.02px] tracking-[0.5%] text-[#00000099]">
              {label}
            </p>
            <h6 className="font-medium text-[#000000E5] text-[14px] leading-[18.23px] tracking-[0.5%]">
              {type}
            </h6>
          </div>
          <div>
            <BreadCrumbs className="rotate-90" />
          </div>
        </div>
      </div>

      <div className="w-full px-4 py-2">
        <ul className="flex flex-wrap p-0 gap-2 mb-2">
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
          className="w-full bg-transparent z-[1] relative font-medium outline-none border-none placeholder-[#00000099] placeholder:font-medium"
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
        />
      </div>

      {error && (
        <p className="text-[red] text-[10px] bottom-[-12px] absolute">
          {error}
        </p>
      )}
    </div>
  );
};

export default MultiValueInventoryInput;
