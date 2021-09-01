import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from "./components/login"
import Board from "./components/board"
import Categories from "./components/categories"
import Popular from "./components/popular"
import Favourite from "./components/favourite"
import Home from "./components/home"

Vue.use(Router);


export default new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginPage,
        },
        {
            path: '/',
            name: 'board',
            component: Board,
            children: [
                {
                    path: 'categories',
                    name: 'categories',
                    component: Categories
                },
                {
                    path: 'popular',
                    name: 'popular',
                    component: Popular
                },
                {
                    path: 'favourite',
                    name: 'favourite',
                    component: Favourite
                },
                {
                    path: 'home',
                    name: 'home',
                    component: Home
                }
            ]
        }

    ],

})
