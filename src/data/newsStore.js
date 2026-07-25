const getNews = () => {
  return JSON.parse(localStorage.getItem("news")) || [];
};

const saveNews = (news) => {
  localStorage.setItem("news", JSON.stringify(news));
};

export { getNews, saveNews };