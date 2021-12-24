import { defineAsyncComponent } from 'vue';
import { createWebHistory } from 'vue-router';
import { createLangRouter } from 'vue-lang-router';

import translations from '../lang/translations';
import localizedURLs from '../lang/localized-urls';


const routes = [ 
    {
        path: '/',
        name: 'Home',
        component: () => import("../themes/" + import.meta.env.VITE_THEME + "/views/Home.vue"),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import("../themes/" + import.meta.env.VITE_THEME + "/views/About.vue"),
        //meta: { layout: "SpecialLayout" },
      },
      {
        path: '/contact',
        name: 'Contact',
        component:() => import("../themes/" + import.meta.env.VITE_THEME + "/views/Contact.vue"),
      },
      {
        path: '/auth',
        name: 'Auth',
        component:() => import("../themes/" + import.meta.env.VITE_THEME + "/views/Auth.vue"),
        children: [
          {
            path: 'login',
            name: 'Login',
            component:() => import("../themes/" + import.meta.env.VITE_THEME + "/views/auth/Login.vue"),
          },
          {
            path: 'register',
            name: 'Register',
            component:() => import("../themes/" + import.meta.env.VITE_THEME + "/views/auth/Register.vue"),
          },
          {
            path: 'profile',
            name: 'Profile',
            component:() => import("../themes/" + import.meta.env.VITE_THEME + "/views/auth/Profile.vue"),
          },
          {
            path: 'forgot',
            name: 'Forgot',
            component:() => import("../themes/" + import.meta.env.VITE_THEME + "/views/auth/Forgot.vue"),
          },
          {
            path: 'reset',
            name: 'Reset',
            component:() => import("../themes/" + import.meta.env.VITE_THEME + "/views/auth/Reset.vue"),
          },
        ]
      },
      
 ];

const langRouterOptions = {
	defaultLanguage: 'en',
	translations,
	localizedURLs,
};
const routerOptions = {
	routes,
	history: createWebHistory(),
};

const router = createLangRouter(langRouterOptions, routerOptions);

router.beforeEach((to, from, next) => {
  const publicPages = ['/auth/login', '/auth/register', '/auth/reset', '/auth/forgot'];
  let authRequired = true;
  if( to.name == 'Home') authRequired = false;
  publicPages.forEach(function(publicPage) {
    if(to.path.includes(publicPage)) authRequired = false;
  });
  //const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/auth/login');
  } else {
    next();
  }
});

export default router;