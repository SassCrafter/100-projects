const updateWeatherType = (el, currentType) => {
  const newType = currentType === "c" ? "f" : "c";
  el.dataset.degreeType = newType;
  el.textContent = newType.toUpperCase();
};

export const switchDegreesType = (degreeElId, typeElId) => {
  const degreeEl = document.getElementById(degreeElId);
  const typeEl = document.getElementById(typeElId);
  const currentType = typeEl.dataset.degreeType;
  updateWeatherType(typeEl, currentType);
  const newTemp =
    currentType === "c"
      ? (+degreeEl.textContent * 9) / 5 + 32
      : ((+degreeEl.textContent - 32) * 5) / 9;
  degreeEl.textContent = Math.round(newTemp);
};
