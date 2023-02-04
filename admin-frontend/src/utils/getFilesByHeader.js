const filesByHeader = object => object.reduce(
  (obj,
    {
      id,
      name,
      url,
      createdAt,
      fileTopics: { header },
    }) => (
    {
      ...obj,
      [header]: [
        ...(obj[header] ? obj[header] : []),
        ...[{
          id,
          name,
          url,
          createdAt,
        }],
      ],
    }
  ),
  {},
);

export default filesByHeader;
