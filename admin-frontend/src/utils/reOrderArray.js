const reOrderFunc = (result) => {
  const reorder = (list, startIndex, endIndex) => {
    const resultArray = [...list];
    const [removed] = resultArray.splice(startIndex, 1);
    resultArray.splice(endIndex, 0, removed);

    return resultArray;
  };

  const reorderArray = array => reorder(
    array,
    result.source.index,
    result.destination.index,
  );

  const newArray = array => [...reorderArray(array)];

  return newArray;
};

export default reOrderFunc;
