<template>
  <div>
    <v-container fluid transparent class="ma-0 pa-0" style="height:50px;">
      <v-row no-gutters>
        <v-col v-for="item in headerItems" :key="item.title">
          <v-card class="pa-0" outlined tile>
            <v-btn tile block @click="onClick(item.method)" :style="item.style">{{item.title}}</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
export default {
  props: {
    // isLogin: VueTypes.bool
  },
  data() {
    return {
      items: [
        { title: 'ホーム', method: 'goHome', style: 'height:45px;' },
        { title: 'ログイン', method: 'login', style: 'height:45px;' },
        { title: '投稿', method: 'goPost', style: 'height:45px;' }
      ],
      items2: [
        { title: 'ホーム', method: 'goHome', style: 'height:45px;' },
        { title: 'ログアウト', method: 'logout', style: 'height:45px;' },
        { title: '投稿', method: 'goPost', style: 'height:45px;' }
      ]
    };
  },
  computed: {
    headerItems: function() {
      if (this.$userId) {
        console.log('loginsiteru');
        return this.$data.items2;
      } else {
        console.log('lsitesa');
        return this.$data.items;
      }
    }
  },
  mounted() {
    console.log(this.$userId);
  },
  methods: {
    onClick(method) {
      switch (method) {
        case 'goHome':
          window.location.href = '/home';
          break;
        case 'goPost':
          window.location.href = '/post';
          break;
        case 'login':
          window.location.href = '/login';
          break;
        case 'logout':
          window.location.href = '/logout';
          break;
      }
    }
  }
};
</script>>
