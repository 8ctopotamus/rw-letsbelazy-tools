<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer
        fixed
        :mini-variant="miniVariant"
        :clipped="clipped"
        v-model="drawer"
        app
        class="indigo lighten-5"
      >
        <v-list>
          <v-list-tile
            router
            :to="item.to"
            :key="i"
            v-for="(item, i) in items"
            exact
          >
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-spacer />
          <v-list-tile class="miniVariantTile" @click.native.stop="miniVariant = !miniVariant">
            <v-list-tile-action>
              <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{miniVariant ? 'Expand Menu' : 'Collapse Menu'}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar fixed app :clipped-left="clipped" class="indigo darken-4" dark>
        <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
        <!-- <v-btn
          icon
          @click.native.stop="clipped = !clipped"
        >
          <v-icon>web</v-icon>
        </v-btn> -->
        <!-- <v-btn
          icon
          @click.native.stop="fixed = !fixed"
        >
          <v-icon>remove</v-icon>
        </v-btn> -->
        <v-toolbar-title v-text="title"></v-toolbar-title>
        <!-- <v-spacer></v-spacer>
        <v-btn
          icon
          @click.native.stop="rightDrawer = !rightDrawer"
        >
          <v-icon>menu</v-icon>
        </v-btn> -->
      </v-toolbar>
      <v-content class="indigo lighten-5">
        <v-container fluid ><!-- fill-height -->
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
        </v-container>
      </v-content>
      <!-- <v-navigation-drawer
        temporary
        fixed
        :right="right"
        v-model="rightDrawer"
        app
      >
        <v-list>
          <v-list-tile @click.native="right = !right">
            <v-list-tile-action>
              <v-icon light>compare_arrows</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer> -->
      <v-footer :fixed="fixed" app class="indigo lighten-4">
        <v-spacer></v-spacer>
        <span @click="$electron.shell.openExternal('https://zylocod.es/')" style="margin-right: 2%;">Created by Zylo, LLC</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'rw-letsbelazy-toolbelt',
    data: () => ({
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        { icon: 'apps', title: 'Welcome', to: '/' },
        { icon: 'camera_enhance', title: 'Web Screenshot', to: '/web-screenshot' },
        { icon: 'format_quote', title: 'Testimonials Generator', to: '/testimonials-generator' },
        { icon: 'share', title: 'Social Posts Generator', to: '/social-posts-generator' }
      ],
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: 'RW Let\'s Be Lazy Tools!'
    })
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
  .miniVariantTile:hover {cursor: pointer;}
</style>
