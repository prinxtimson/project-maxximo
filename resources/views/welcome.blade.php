<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-73MF4W0827"></script>
  <script>
  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());

  gtag('config', 'G-73MF4W0827');
  </script>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>Elintx</title>

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{{asset('css/app.css')}}">
  <!-- Styles -->
  <style>
  html {
    height: 100%;
  }

  body {
    font-family: 'Nunito', sans-serif;
    min-height: 100%;
    display: flex !important;
    flex-direction: column;
  }

  #sidebarMenu {
    transition: all 0.3s;
    width: 260px
  }

  .active-tab {
    color: #00a7ad;
    background-color: #fff !important;
  }

  .active {
    margin-left: -260px;
  }

  .react-chatbot-kit-chat-container {
    height: 100%;
  }

  .react-chatbot-kit-chat-message-container {
    overflow: auto !important;
  }

  .brand-active {
    display: none;
  }

  @media (max-width: 1200px) {
    #sidebarMenu {
      margin-left: -260px;
    }

    #sidebarMenu.active {
      margin-left: 0;
    }

    #brand {
      display: block;
      transition: all 0.3s;
    }

    #brand.brand-active {
      display: none;
    }
  }
  </style>
</head>

<body class="antialiased" dir='ltr'>
  <div id="app" class='main flex-grow-1 d-flex'></div>

  <!-- Start of ChatBot (www.chatbot.com) code -->
  <script type="text/javascript">
  window.__be = window.__be || {};
  window.__be.id = "61640416d231420007501199";
  (function() {
    var be = document.createElement('script');
    be.type = 'text/javascript';
    be.async = true;
    be.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.chatbot.com/widget/plugin.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(be, s);
  })();
  </script>
  <!-- End of ChatBot code -->
  <script src="{{asset('js/app.js')}}"></script>
  <script src="https://kit.fontawesome.com/f1f8bd22d7.js" crossorigin="anonymous"></script>

  <script type="module">
  // Import the functions you need from the SDKs you need
  import {
    initializeApp
  } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
  import {
    getAnalytics
  } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-analytics.js";
  import {
    getMessaging,
    getToken
  } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-messaging.js";

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: env('GOOGLE_API_ID'),
    authDomain: env('GOOGLE_AUTH_DOMAIN'),
    projectId: env('GOOGLE_PROJECT_ID'),
    storageBucket: env('GOOGLE_STORAGE_BUCKET'),
    messagingSenderId: env('GOOGLE_MESSAGING_SENDER_ID'),
    appId: env('GOOGLE_API_ID'),
    measurementId: env('GOOGLE_MEASUREMENT_ID')
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const messaging = getMessaging();

  $(document).ready(function() {

    //$('#modalTigger')[0].click()
    $('#freeTrialModal').on('hidden.bs.modal', function() {
      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      } else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        messaging.onMessage(function(payload) {
          const title = payload.notification.title;
          const options = {
            body: payload.notification.body,
            icon: payload.notification.icon,
          };
          new Notification(title, options);
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function(permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            getToken(messaging).then((res) => {
              console.log(res)
              return window.axios.post('/store-token', {
                token: res
              })
            }).then(res => {
              console.log(res.data)
              messaging.onMessage(function(payload) {
                const title = payload.notification.title;
                const options = {
                  body: payload.notification.body,
                  icon: payload.notification.icon,
                };
                new Notification(title, options);
              });
            });
          }
        });
      }
    })
  })
  </script>
</body>

</html>