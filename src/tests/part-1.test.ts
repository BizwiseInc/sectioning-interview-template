import { getSectionType, parseSection } from "..";
import { DOMNode, SectionConfig } from "../types";

/*

Have `getSectionType` differentiate between two types of sections:
- `Banner` which is a section with just one span node with text in it and no images
- `Single Image` which is a section with just one node with an image in it and no text

type BannerSection = {
  type: 'Banner'; 
  body: string;
}

type SingleImageSection = {
  type: 'Single Image';
  imageUrl: string;
}

*/

describe("image-only elements", () => {
  it("Identifies and Parses a root-level image-only element", () => {
    const htmlNode: DOMNode = {
      tag: "img",
      src: "https://example.com/image.jpg",
      children: [],
    };

    const sectionType = getSectionType(htmlNode);
    expect(sectionType).toBe("Single Image");

    const config = parseSection(htmlNode, sectionType);
    expect(config).toEqual({
      type: "Single Image",
      imageUrl: "https://example.com/image.jpg",
    } satisfies SectionConfig);
  });

  it("Identifies an image-only element with nesting", () => {
    const htmlNode: DOMNode = {
      tag: "div",
      children: [
        {
          tag: "div",
          children: [{ tag: "div", children: [] }],
        },
        {
          tag: "div",
          children: [
            {
              tag: "div",
              children: [
                {
                  tag: "img",
                  src: "https://example.com/image.jpg",
                  children: [],
                },
              ],
            },
          ],
        },
        { tag: "div", children: [] },
      ],
    };

    const sectionType = getSectionType(htmlNode);
    expect(sectionType).toBe("Single Image");

    const config = parseSection(htmlNode, sectionType);
    expect(config).toEqual({
      type: "Single Image",
      imageUrl: "https://example.com/image.jpg",
    } satisfies SectionConfig);
  });
});

describe("text-only elements", () => {
  it("Identifies a root-level text-only element", () => {
    const htmlNode: DOMNode = {
      tag: "span",
      text: "Take Advantage of Our FREE Consultations",
      children: [],
    };
    const sectionType = getSectionType(htmlNode);
    expect(sectionType).toBe("Banner");

    const config = parseSection(htmlNode, sectionType);
    expect(config).toEqual({
      type: "Banner",
      body: "Take Advantage of Our FREE Consultations",
    } satisfies SectionConfig);
  });

  it("Identifies a text-only element with nesting", () => {
    const htmlNode: DOMNode = {
      tag: "div",
      children: [
        {
          tag: "div",
          children: [
            {
              tag: "div",
              children: [
                {
                  tag: "span",
                  text: "Take Advantage of Our FREE Consultations",
                  children: [],
                },
              ],
            },
          ],
        },
        { tag: "div", children: [] },
        {
          tag: "div",
          children: [{ tag: "div", children: [] }],
        },
      ],
    };

    const sectionType = getSectionType(htmlNode);
    expect(sectionType).toBe("Banner");

    const config = parseSection(htmlNode, sectionType);
    expect(config).toEqual({
      type: "Banner",
      body: "Take Advantage of Our FREE Consultations",
    } satisfies SectionConfig);
  });
});
