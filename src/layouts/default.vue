<template>
  <q-layout view="lHh Lpr lFf" style="height: 100%">
    <!--<q-layout-header>-->
      <!--<q-toolbar-->
        <!--color="primary"-->
        <!--:glossy="$q.theme === 'mat'"-->
        <!--:inverted="$q.theme === 'ios'"-->
      <!--&gt;-->
        <!--<q-btn-->
          <!--flat-->
          <!--dense-->
          <!--round-->
          <!--@click="leftDrawerOpen = !leftDrawerOpen"-->
          <!--aria-label="Menu"-->
        <!--&gt;-->
          <!--<q-icon name="menu" />-->
        <!--</q-btn>-->

        <!--<q-toolbar-title>-->
          <!--Quasar App-->
          <!--<div slot="subtitle">Running on Quasar v{{ $q.version }}</div>-->
        <!--</q-toolbar-title>-->
      <!--</q-toolbar>-->
    <!--</q-layout-header>-->

    <!--<q-layout-drawer-->
      <!--v-model="leftDrawerOpen"-->
      <!--:content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"-->
    <!--&gt;-->
      <!--<q-list-->
        <!--no-border-->
        <!--link-->
        <!--inset-delimiter-->
      <!--&gt;-->
        <!--<q-list-header>Essential Links</q-list-header>-->
        <!--<q-item @click.native="openURL('http://quasar-framework.org')">-->
          <!--<q-item-side icon="school" />-->
          <!--<q-item-main label="Docs" sublabel="quasar-framework.org" />-->
        <!--</q-item>-->
        <!--<q-item @click.native="openURL('https://github.com/quasarframework/')">-->
          <!--<q-item-side icon="code" />-->
          <!--<q-item-main label="GitHub" sublabel="github.com/quasarframework" />-->
        <!--</q-item>-->
        <!--<q-item @click.native="openURL('https://discord.gg/5TDhbDg')">-->
          <!--<q-item-side icon="chat" />-->
          <!--<q-item-main label="Discord Chat Channel" sublabel="https://discord.gg/5TDhbDg" />-->
        <!--</q-item>-->
        <!--<q-item @click.native="openURL('http://forum.quasar-framework.org')">-->
          <!--<q-item-side icon="record_voice_over" />-->
          <!--<q-item-main label="Forum" sublabel="forum.quasar-framework.org" />-->
        <!--</q-item>-->
        <!--<q-item @click.native="openURL('https://twitter.com/quasarframework')">-->
          <!--<q-item-side icon="rss feed" />-->
          <!--<q-item-main label="Twitter" sublabel="@quasarframework" />-->
        <!--</q-item>-->
      <!--</q-list>-->
    <!--</q-layout-drawer>-->

    <q-page-container style="height: 100%;">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      //leftDrawerOpen: this.$q.platform.is.desktop

      leftDrawerOpen:false
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
  main{
    height: 100%;
  }
</style>
