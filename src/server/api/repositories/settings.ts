// tslint:disable:max-line-length

import { ISetting } from './setting.repository'

export const SETTINGS: ISetting = {
  'host': 'localhost:8000',
  'og': {
    'title': 'Fusebox Angular Universal Starter',
    'description': 'Seed project for Angular Universal apps featuring Server-Side Rendering (SSR), FuseBox, dev/prod builds, Brotli/Gzip, SCSS, favicon generation, @types, unit testing w/ Jest, and sitemap generator. Created by Patrick Michalina',
    'image': 'https://d3anl5a3ibkrdg.cloudfront.net/assets/favicons/android-chrome-512x512.png',
    'type': 'website',
    'locale': 'en_US'
  },
  'firebase': {
    'appName': 'fuse-angular-universal-starter',
    'config': {
      'apiKey': 'AIzaSyDfE1owJZCbvasXieCKjMoGZddRhqcp7RM',
      'authDomain': 'fuse-angular-universal-s-67402.firebaseapp.com',
      'databaseURL': 'https://fuse-angular-universal-s-67402.firebaseio.com',
      'projectId': 'fuse-angular-universal-s-67402',
      'storageBucket': 'fuse-angular-universal-s-67402.appspot.com',
      'messagingSenderId': '883416191164'
    }
  },
  'assets': {
    'userAvatarImage': 'https://firebasestorage.googleapis.com/v0/b/fuse-angular-universal-s-67402.appspot.com/o/avatar.jpg?alt=media&token=9a153021-6e12-460b-9d87-40c2eed02c82'
  },
  'tokens': {
    'facebookAppId': '117309532219749'
  },
  'injections': [
    {
      'inHead': true,
      'element': 'link',
      'attributes': {
        'href': '/manifest.json',
        'rel': 'manifest'
      }
    },
    {
      'inHead': true,
      'element': 'meta',
      'attributes': {
        'name': 'theme-color',
        'content': '#2196F3'
      }
    },
    {
      'inHead': false,
      'element': 'link',
      'attributes': {
        'href': 'https://fonts.googleapis.com/css?family=Roboto',
        'rel': 'stylesheet',
        'type': 'text/css'
      }
    },
    {
      'inHead': false,
      'element': 'link',
      'attributes': {
        'href': 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        'rel': 'stylesheet',
        'type': 'text/css'
      }
    },
    {
      'inHead': true,
      'element': 'meta',
      'attributes': {
        'name': 'google-site-verification',
        'content': 'RW-hcjXEgPMoy2NF8pTl8IEzP8gnj3cEZ6aF1HDUiOc'
      }
    },
    {
      'inHead': false,
      'element': 'script',
      'value': "window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;ga('create', 'UA-107089312-2', 'auto');",
      'attributes': {
        'type': 'text/javascript'
      }
    },
    {
      'inHead': false,
      'element': 'script',
      'attributes': {
        'async': 'true',
        'type': 'text/javascript',
        'src': 'https://www.google-analytics.com/analytics.js'
      }
    }
  ],
  'i18n': {
    'en': {
      'about': {
        'title': 'About',
        'description': 'See contact information and details about the Angular Universal seed at angular.patrickmichalina.com'
      },
      'admin': {
        'title': 'Admin',
        'description': 'For application management'
      },
      'changelog': {
        'title': 'Changelog',
        'description': 'Version history of the application'
      },
      'home': {
        'title': 'Home',
        'description': 'A fullstack angular starter framework to quickly build mid-large scale web applications'
      },
      'login': {
        'title': 'Login',
        'description': 'Login to your account now.'
      },
      'logout': {
        'title': 'Logged Out',
        'description': 'Come back again!'
      },
      'search': {
        'title': 'Search',
        'description': 'Search for angular related projects on github, to showcase the flicker-free http state transfer of an Angular isomorphic application.'
      },
      'signup': {
        'title': 'Signup',
        'description': 'Sign up for an account with us. Create an account to start doing cool things with our application. It\'s easy to register'
      },
      'not-found': {
        'title': 'Not Found',
        'description': 'The page you requested can not be found.'
      }
    },
    'jp': {
      'home': {
        'title': 'こんにちは',
        'description': ''
      }
    }
  }
}
