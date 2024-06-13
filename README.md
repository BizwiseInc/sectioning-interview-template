## Bizwise Technical Interview Round 2

At Bizwise we often get customers who want to move to being hosted by us and have an existing website hosted elsewhere.

Your team is building a system to parse and categorize the HTML for that customer site into data that is usable by our CMS to speed up creation of their new website under us.

***

### Sections
Small Business websites are often categorized into rows of content which we call "Sections". In our CMS there are various types of sections, each which support specific types of content.



<table>
  <th colspan="2">Examples of Sections -> Extracted Data</th>
  <tr>
    <td>
<img width="1098" alt="Screenshot 2024-06-11 at 9 24 23 AM" src="https://github.com/BizwiseInc/sectioning-interview-template/assets/6236424/eaa9c5a1-860d-4a4e-b621-caeb4bd4069a">
    </td>
    <td> <code>{ type: 'Text', title: 'Improve Your Game...', body: 'Want to...', backgroundImage: '...', buttons: [...] }</code>    </th>
  </tr>
  <tr>
    <td>
<img width="986" alt="Screenshot 2024-06-11 at 9 24 03 AM" src="https://github.com/BizwiseInc/sectioning-interview-template/assets/6236424/77f6cb0f-06cb-462d-8811-567d05e37bed">
    </td>
    <td><code>{ type: 'Services', title: '', items: [ { title: '...', body: '...', button: { ... } }, ... ] }</code></th>
  </tr>
  <tr>
    <td>
<img width="945" alt="Screenshot 2024-06-11 at 9 23 58 AM" src="https://github.com/BizwiseInc/sectioning-interview-template/assets/6236424/67448479-7f9e-4df1-b422-7ebd86542223">
    </td>
    <td><code>{ type: 'Image & Text', title: '...', body: '...', button: { ... }, imageUrl: 'https://.../img.png' }</code></th>
  </tr>
</table>

***

### JSON Representation of the DOM
Your team already built a system to convert HTML from sections of the original webpage into a simplified JSON representation of the DOM tree with just the information we care about:
```typescript
type DOMNode = {
  tag: 'div' | 'span' | 'img' | 'h1' | 'h2' | 'h3';
  src?: string;
  text?: string;
  children: DOMNode[];
};
```

For example for the following section

<img width="640" alt="Screenshot 2024-06-11 at 9 23 58 AM" src="https://github.com/BizwiseInc/sectioning-interview-questions/assets/6236424/cf1b9572-3671-4943-92db-d37e81a62906">

Its representation could look like
```typescript
 {
  tag: 'div',
  children: [
    {
      tag: 'div',
      children: [
        {
          tag: 'div',
          children: [
            {
              tag: 'h1',
              text: 'We Have Everything You Need To Get Your Game To Par',
              children: [],
            },
            {
              tag: 'span',
              text: 'The Clubmaker is ...',
              children: [],
            },
          ],
        },
      ],
    },
    {
      tag: 'div',
      children: [
        {
          tag: 'img',
          src: 'https://.../image.jpg',
          children: [],
        },
      ],
    }
  ]
}
```

***

## Your Task

You are to complete the next two steps of the Website -> Parsed Data pipeline as two distinct functions
1. `getSectionType(html: DOMNode): SectionType` - Given the section HTML, determine which SectionType matches it
2. `parseSection(html: DOMNode, sectionType: SectionType): SectionConfig` - Given the specific section type, create the appropriate config for it

The section types to handle will start off simple and increase in complexity in each part.

You may use any tools you wish to complete the task.

To get started, clone this repository and `npm install`.
```bash
git clone https://github.com/BizwiseInc/sectioning-interview-template.git
cd sectioning-interview-template
npm install
```

You will be running `npm test` to verify that your code is working for the current part.  `npm start` works to run the `index.ts` file for your convenience.


### Part 1

Have `getSectionType` differentiate between two types of sections:
- `Banner` which is a section with just one node with text in it and no images
- `Single Image` which is a section with just one node with an image in it and no text

Then have `parseSection` generate the appropriate Config for each of them with the required information in it
```typescript
type BannerSection = {
  type: 'Banner'; 
  body: string;
}

type SingleImageSection = {
  type: 'Single Image';
  imageUrl: string;
}
```

You can find the test cases that will be ran in `tests/part-1.test.ts`.  Treat your solution as if you would were writing it on the job, hardcoding test cases will not be accepted and code quality is a factor in evaluation.

### Evaluation
Candidate success is measured by:
1. How many parts are successfully completed with all tests passing.
2. If equal progress, a notable difference in code quality will be considered
3. If equal progress and similar code quality, the time taken to complete the tasks will be considered
