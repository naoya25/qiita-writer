export const postQiita = async (article: QiitaArticle) => {
  const url = "https://qiita.com/api/v2/items";
  const token = process.env.NEXT_PUBLIC_QIITA_TOKEN;

  const qiita_args = {
    title: article.title,
    body: article.body,
    private: true,
    tags: article.tags.map((tag) => ({
      name: tag,
    })),
    tweet: false,
    organization_url_name: null,
    slide: false,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(qiita_args),
  });

  if (!response.ok) {
    console.error(`Error: ${response.status} ${response.statusText}`);
    return null;
  }

  const data = await response.json();
  console.log(data);
  return data;
};
