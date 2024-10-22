export const postQiita = async () => {
  const url = "https://qiita.com/api/v2/items";
  const token = process.env.NEXT_PUBLIC_QIITA_TOKEN;

  const mock_data = {
    body: "# Example",
    private: true,
    tags: [
      {
        name: "Ruby",
        versions: ["0.0.1"],
      },
    ],
    title: "Example title",
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
    body: JSON.stringify(mock_data),
  });

  if (!response.ok) {
    console.error(`Error: ${response.status} ${response.statusText}`);
    return null;
  }

  const data = await response.json();
  console.log(data);
  return data;
};
