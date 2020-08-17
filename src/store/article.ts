import Vue from 'vue';
import { IArticlePayload, IArticle, IToken } from '@/interfaces/api/Article';
import { ENDPOINTS } from '@/constants/api/endpoints';

export interface IState {
  articles: IArticle[];
  token: IToken;
  aaa: string;
}

export const state = (): IState => ({
  articles: [],
  token: { token: '', tokenSecret: '' },
  aaa: 'koreja!!!!',
});

export const getters = {
  getArticle: (state: IState) => (id: string): IArticle | undefined => {
    return state.articles.find((article) => article._id === id);
  },
  // getTk: (state: IState) => (): {} | undefined => {
  //   return state.tk;
  // },
  getA: (state: IState) => (): string | undefined => {
    return state.aaa;
  },
  getToken: (state: IState) => (): IToken | undefined => {
    return state.token;
  },
};

export const mutations = {
  saveArticles(state: IState, articles: IArticle[]) {
    state.articles = articles;
  },
  // setTk(state: IState, data: {}) {
  //   state.tk = data;
  // },
  setToken(state: IState, token: IToken) {
    state.token = token;
  },
  // setA(state: IState, text: string) {
  //   state.aaa = text;
  // },
};

export const actions = {
  async fetchArticles(this: Vue, { commit }: any): D {
    const Articles = await this.$axios.$get(ENDPOINTS.ARTICLES);
    commit('saveArticles', Articles);
  },

  // async saveData(this: Vue, { commit }: any, data: {}): Promise<void> {
  //   commit('setTk', data);
  // },

  async saveToken(this: Vue, { commit }: any, data: IToken): Promise<void> {
    commit('setToken', data);
  },

  async getAccessToken(this: Vue, { commit, getters, state }: any, _data): Promise<void>{

    // const aa = getters['article/getToken']();
    // const abbba = getters['article/getA']();
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log(_data);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
    // console.log(state.token);
    // console.log("!!!!!!!!");
    // try {
    //   const pa = {
    //     oauthToken: _data.oauth_token,
    //     oauthVerifier: _data.oauth_verifier,
    //     token: this.$store.getters['article/getA']()
    //     tokenSecret: this.$store.getters['article/getA']()
    //   };
    //   console.log(pa);
    //   const data = await this.$axios.get('/callback3', { params: pa });
    //   console.log(data);
    // } catch (e) {
    //   console.log('errrrrrrrrrrrrrr');
    //   console.log(e);
    // }
  },

  // async getUrl() {
  //   try {
  //     console.log('urltoru!!');
  //     const data = await this.$axios.get('/getCallBackUrl');
  //     console.log(data);
  //   } catch (e) {}
  // },

  // async getData() {
  //   try {
  //     const data = await this.$axios.get('https://crudcrud.com/api/356f8bc5acb84ae584ae5642b7ba23ba');
  //     console.log(data);
  //     console.log('deta!!!!');
  //     return { json: data };
  //   } catch (err) {
  //     console.error(err);
  //   }
  // },

  // async doSome(this: Vue) {
  //   console.log('aaaaaaa');
  // },
};
