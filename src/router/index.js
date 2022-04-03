import { createRouter, createWebHistory } from 'vue-router'
import ContactView from '../views/ContactView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import LogoutView from '../views/SignupView.vue'
import GiftView from '../views/GifsView.vue'
import ArticlesView from '../views/ArticlesView.vue'
import DepartmentsView from '../views/DepartmentsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: LogoutView
  },
  {
    path: '/share-gifs',
    name: 'share-gifs',
    component: GiftView
  },
  {
    path: '/share-articles',
    name: 'share-articles',
    component: ArticlesView
  },
  {
    path: '/add-department',
    name: 'add-department',
    component: DepartmentsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
