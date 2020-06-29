const parseDate = (date) => {
  if (date) {
      return new Date(date.replace('T', ' '));
  }
  return new Date();
};

export default parseDate;
