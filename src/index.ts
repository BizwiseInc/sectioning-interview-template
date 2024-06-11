import { DOMNode, SectionType, SectionConfig } from "./types";

export const getSectionType = (html: DOMNode): SectionType => {
  return "Single Image";
};

export const parseSection = (
  html: DOMNode,
  sectionType: SectionType,
): SectionConfig => {
  return {
    type: "Banner",
    body: "Hello World",
  };
};
