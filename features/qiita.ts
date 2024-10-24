import { QiitaArticle } from "@/models/qiita_article";

export const postQiita = async (article: QiitaArticle, token: string) => {
  const url = "https://qiita.com/api/v2/items";

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

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(qiita_args),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    throw new Error(`Error posting to Qiita: ${error}`);
  }
};
