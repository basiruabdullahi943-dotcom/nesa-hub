export const getMaterials = () => {
  return (
    JSON.parse(localStorage.getItem("materials")) || []
  );
};

export const saveMaterials = (materials) => {
  localStorage.setItem(
    "materials",
    JSON.stringify(materials)
  );
};