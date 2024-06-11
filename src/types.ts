/*
   DO NOT EDIT, WILL BE OVERWRITTEN BY FUTURE PARTS
*/

export type DOMNode = {
  tag: "div" | "span" | "img" | "h1" | "h2" | "h3";
  src?: string;
  text?: string;
  children: DOMNode[];
};

export type BannerSection = {
  type: "Banner";
  body: string;
};

export type SingleImageSection = {
  type: "Single Image";
  imageUrl: string;
};

export type SectionConfig = BannerSection | SingleImageSection;
export type SectionType = SectionConfig["type"];
