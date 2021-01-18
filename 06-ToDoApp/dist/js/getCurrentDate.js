const createDateString = (date) => {
  const dateArr = date.split(" ");
  const dayName = dateArr[0];
  const month = dateArr[1];
  const day = dateArr[2];
  const year = dateArr[3];
  return `${dayName}, ${month} ${day}, ${year}`;
};

export const setDate = () => {
  const dateEl = document.getElementById("date");
  const now = new Date();
  const dateString = createDateString(now.toString());
  dateEl.textContent = dateString;
};
