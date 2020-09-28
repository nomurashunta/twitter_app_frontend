<template>
  <div>
    <v-app>
      <v-navigation-drawer v-model="drawer" app>
        <h3>メニュー</h3>
        <v-btn text @click="logout">
          ログアウト
        </v-btn>
      </v-navigation-drawer>
      <v-app-bar app color="blue" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>Twitter App</v-toolbar-title>
        <!--      <v-spacer></v-spacer>-->
        <!--      <div>-->
        <!--        <span style="margin-right : 20px;">閲覧：{{getPassiveUserNum}}人</span>-->
        <!--        <span>入室：{{getActiveUserNum}}人</span>-->
        <!--      </div>-->
      </v-app-bar>
      <nuxt />
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({ drawer: null }),
  methods: {
    logout() {
      this.$store.dispatch('article/saveToken', {
        token: null,
        tokenSecret: null,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
