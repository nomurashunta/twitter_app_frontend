import Vue from 'vue';
import { IArticlePayload, IArticle } from '@/interfaces/api/Article';
import { ENDPOINTS } from '@/constants/api/endpoints';

export interface IState {
  articles: IArticle[];
}

export const state = (): IState => ({
  articles: [],
});

export const getters = {
  getArticle: (state: IState) => (id: string): IArticle | undefined => {
    return state.articles.find((article) => article._id === id);
  },
};

export const mutations = {
  saveArticles(state: IState, articles: IArticle[]) {
    state.articles = articles;
  },
};

export const actions = {
  async fetchArticles(this: Vue, { commit }: any): Promise<void> {
    const Articles = await this.$axios.$get(ENDPOINTS.ARTICLES);
    commit('saveArticles', Articles);
  },

  // async postArticle(this: Vue, _: any, payload: IArticlePayload) {
  //   await this.$axios.$post('https://crudcrud.com/api/356f8bc5acb84ae584ae5642b7ba23ba/sasa', payload);
  // },

  async postArticle222(this: Vue, _: any, payload: IArticlePayload) {
    console.log(ENDPOINTS.ARTICLES);
    await this.$axios.$post(ENDPOINTS.ARTICLES, payload);
  },

  async getData() {
    try {
      const data = await this.$axios.get('https://crudcrud.com/api/356f8bc5acb84ae584ae5642b7ba23ba');
      console.log(data);
      console.log('deta!!!!');
      return { json: data };
    } catch (err) {
      console.error(err);
    }
  },

  async doSome(this: Vue) {
    console.log('aaaaaaa');
  },
};
