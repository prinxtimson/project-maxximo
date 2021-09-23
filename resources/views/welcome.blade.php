<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
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
  body {
    font-family: 'Nunito', sans-serif;
    background-color: white;
  }

  #sidebarMenu {
    transition: all 0.3s;
    width: 280px
  }

  .active {
    margin-left: -280px;
  }

  @media (max-width: 990px) {
    #sidebarMenu {
      margin-left: -280px;
    }

    #sidebarMenu.active {
      margin-left: 0;
    }

  }
  </style>
</head>

<body class="antialiased">
  <div id="app"></div>
  <div class="modal fade" id="freeTrialModal" aria-hidden="true" aria-labelledby="freeTrialModalLabel" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">

        <button type="button" style="z-index: 2000" class="btn-close position-absolute top-0 end-0"
          data-bs-dismiss="modal" aria-label="Close"></button>

        <div class="modal-body py-5">
          Signup to our 14 days free trial <a href="/register">Now</a>
        </div>
      </div>
    </div>
  </div>

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
    apiKey: "AIzaSyCPO0O-IR2iA9o8UVOGfEXN6xkRuNdTD0s",
    authDomain: "maxximo-3c227.firebaseapp.com",
    projectId: "maxximo-3c227",
    storageBucket: "maxximo-3c227.appspot.com",
    messagingSenderId: "881684953750",
    appId: "1:881684953750:web:351c9ec27088f79bc2e0b7",
    measurementId: "G-F8SZXFSYSN"
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