import Vue from "vue";
import Router, { RouteConfig, RawLocation } from "vue-router";
import Home from "./views/Home.vue";
import {GameTypes} from 'hive-api';

Vue.use(Router);

const breadcrumb: {
  [key: string]: {
    text: string,
    disabled?: boolean
    link?: boolean
    exact?: boolean
    to?: RawLocation
    href?: string
  }
} = {
  home: {
    text: 'Home',
    exact: true,
    to: { name: 'Home' }
  },
  leaderboard: {
    text: 'Leaderboards',
    exact: true,
    to: { name: 'Leaderboards' }
  }
}

const leaderboards: { title: string, id: string, propertyTitle: string, href: string }[] = [{
  title: 'Medal Leaderboard',
  id: 'medal',
  propertyTitle: 'Gold Medals',
  href: 'medals'
}, {
  title: 'Kill Leaderboard',
  id: 'totalkills',
  propertyTitle: 'Kills',
  href: 'kills'
}, {
  title: 'Point Leaderboard',
  id: 'totalpoints',
  propertyTitle: 'Points',
  href: 'points'
}, {
  title: 'Achievement Leaderboard',
  id: 'achievement',
  propertyTitle: 'Achievements',
  href: 'achievements'
}, {
  title: 'Token Leaderboard',
  id: 'token',
  propertyTitle: 'Tokens',
  href: 'tokens'
}, {
  title: 'Hide Block Level Leaderboard',
  id: 'hide_blocklevels',
  propertyTitle: 'Block Levels',
  href: 'hide'
}]

export const routeConfig: RouteConfig[] = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/team",
    name: "Team Changes",
    meta: {
      breadcrumbs: [
        breadcrumb.home
      ]
    },
    component: () => import(/* webpackChunkName: "teamChanges" */ "./views/TeamChanges.vue")
  },
  {
    path: "/maps",
    name: "Maps",
    component: Home,
    meta: {
      breadcrumbs: [
        breadcrumb.home
      ]
    },
  },
  {
    path: "/player/:uuid",
    name: "Player",
    children: GameTypes.list.map(type => ({
      name: type.id,
      path: type.id,
      props: (route) => ({
        game: type.id,
        ... route.params
      }),
      component: () => import(/* webpackChunkName: "playerGameInfo" */ "./views/PlayerGameInfo.vue"),
      meta: {
        breadcrumbs: (params: {uuid: string}) => [{
          text: type.name,
          exact: true,
          to: `/player/${params.uuid}/${type.id}`
        }]
      }
    })),
    props: {default: true},
    component: () => import(/* webpackChunkName: "player" */ "./views/Player.vue"),
    meta: {
      breadcrumbs: (params: {uuid: string}) => ([
        breadcrumb.home,
        {
          text: 'Player',
          disabled: true
        },
        {
          text: params.uuid,
          exact: true,
          to: { name: 'Player', params: {uuid: params.uuid}}
        }
      ])
    },
  },
  {
    path: "/leaderboard",
    name: "Leaderboards",
    meta: {
      breadcrumbs: [
        breadcrumb.home
      ]
    },
    component: () => import(/* webpackChunkName: "leaderboards" */ "./views/Leaderboards.vue")
  },
  ... leaderboards.map(leaderboard => ({
    path: `/leaderboard/${leaderboard.href}`,
    name: leaderboard.title,
    props: {
      title: leaderboard.title,
      id: leaderboard.id,
      propertyTitle: leaderboard.propertyTitle
    },
    meta: {
      breadcrumbs: [
        breadcrumb.home,
        breadcrumb.leaderboard
      ]
    },
    component: () => import(/* webpackChunkName: "leaderboard" */ "./views/Leaderboard.vue")
  })),
]

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routeConfig,
});
