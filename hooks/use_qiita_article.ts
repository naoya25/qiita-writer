import { useState } from "react";
import { QiitaArticle } from "@/models/qiita_article";
import { postQiita } from "@/features/qiita";
import { showAlertModal } from "@/components/alert_modal_manager";

export const useQiitaArticle = () => {
  const [article, setArticle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [qiitaArticle, setQiitaArticle] = useState<QiitaArticle | null>(null);
  const [qiitaUrl, setQiitaUrl] = useState<string | null>(null);
  const [qiitaToken, setQiitaToken] = useState<string>("");

  const postOpenAIStream = async (input: string) => {
    if (!input.trim() || isLoading) return;
    setIsLoading(true);
    setArticle("");
    setQiitaArticle(null);
    setQiitaUrl(null);

    try {
      const response = await fetch("/api/openai-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) throw new Error(await response.text());

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "",
        completeText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        lines.forEach((line) => {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data !== "[DONE]") {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0].delta.content;
              if (content) {
                completeText += content;
                setArticle((prev) => prev + content);
              }
            }
          }
        });
      }
      setQiitaArticle(QiitaArticle.fromJSON(completeText));
    } catch (error) {
      console.error("Error:", error);
      setArticle("エラーが発生しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostQiita = async () => {
    if (!qiitaArticle) return;
    setIsLoading(true);

    try {
      const url = await postQiita(qiitaArticle, qiitaToken);
      setQiitaUrl(url);
      setArticle("");
      setQiitaArticle(null);
    } catch (error) {
      console.error("Error:", error);
      showAlertModal({
        title: "エラー",
        message: "Qiitaへの投稿に失敗しました。",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    article,
    isLoading,
    qiitaArticle,
    qiitaUrl,
    qiitaToken,
    setQiitaToken,
    postOpenAIStream,
    handlePostQiita,
  };
};
