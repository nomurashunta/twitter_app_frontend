/**
 * Article インターフェース
 */

/** 投稿のペイロード */
export interface IArticlePayload {
  title: string;
  body: string;
  timestamp: Date;
}

/** 投稿内容 */
export interface IArticle {
  _id: string;
  title: string;
  body: string;
  timestamp: string;
}

export interface IToken {
  token: string;
  tokenSecret: string;
}
