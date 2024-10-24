export class QiitaArticle {
  private constructor(
    private _title: string,
    private _body: string,
    private _tags: string[]
  ) {}

  get title(): string {
    return this._title;
  }

  get body(): string {
    return this._body;
  }

  get tags(): string[] {
    return [...this._tags];
  }

  static fromJSON(json_str: string): QiitaArticle | null {
    try {
      const parsedData = JSON.parse(json_str);

      if (
        !parsedData.title ||
        typeof parsedData.title !== "string" ||
        !parsedData.body ||
        typeof parsedData.body !== "string" ||
        !Array.isArray(parsedData.tags) ||
        !parsedData.tags.every((tag: any) => typeof tag === "string")
      ) {
        return null;
      }

      return new QiitaArticle(
        parsedData.title,
        parsedData.body,
        parsedData.tags
      );
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  }

  getTagsString(): string {
    return this._tags.join(", ");
  }

  toJSON(): string {
    return JSON.stringify({
      title: this._title,
      body: this._body,
      tags: this._tags,
    });
  }
}
