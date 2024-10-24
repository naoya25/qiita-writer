"use client";
import ArticleFormField from "./article_form_field";
import ContentDisplay from "./content_display";
import MarkdownDisplay from "./markdown_display";
import BlockButton from "./block_button";
import { useQiitaArticle } from "@/hooks/use_qiita_article";
import { AlertModalManager } from "./alert_modal_manager";

const OpenAIStreamDisplay: React.FC = () => {
  const {
    article,
    isLoading,
    qiitaArticle,
    qiitaUrl,
    qiitaToken,
    setQiitaToken,
    postOpenAIStream,
    handlePostQiita,
  } = useQiitaArticle();

  return (
    <>
      <AlertModalManager />

      {!qiitaArticle && (
        <ArticleFormField onSubmit={postOpenAIStream} isLoading={isLoading} />
      )}

      <ContentDisplay
        content={article}
        backgroundColor="lightgray"
        shouldDisplay={!!article.trim() && !qiitaArticle}
      />

      {qiitaArticle && (
        <>
          <ContentDisplay
            content={
              <h1 className="text-3xl font-bold">{qiitaArticle.title}</h1>
            }
            backgroundColor="white"
          />
          <ContentDisplay
            content={`Tags: ${qiitaArticle.getTagsString()}`}
            backgroundColor="white"
          />
          <MarkdownDisplay content={qiitaArticle.body} />
        </>
      )}

      {qiitaArticle && !qiitaUrl && (
        <div className="max-w-[80%] m-auto mt-4">
          <label
            htmlFor="qiita-token"
            className="block text-sm font-medium text-gray-700"
          >
            Qiita API Token
          </label>
          <input
            type="password"
            className="mt-1 mb-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => setQiitaToken(e.target.value)}
            value={qiitaToken}
            disabled={isLoading}
          />
          <BlockButton
            onClick={handlePostQiita}
            disabled={isLoading || !qiitaToken}
          >
            {isLoading ? "送信中..." : "Qiitaに限定公開する"}
          </BlockButton>
        </div>
      )}

      {qiitaUrl && (
        <div className="max-w-[80%] mx-auto mt-4 mb-16">
          <p>共有されました</p>
          <p>
            <a
              href={qiitaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {qiitaUrl}
            </a>
          </p>
        </div>
      )}
    </>
  );
};

export default OpenAIStreamDisplay;
