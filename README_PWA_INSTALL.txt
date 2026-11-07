EDUVOICE AI PWA INSTALL PACKAGE
==============================

Deploy the entire folder contents to the same HTTPS origin as the EduVoice AI website.
Files required at site root:
- index.html
- manifest.webmanifest
- service-worker.js
- eduvoice-icon-192.png
- eduvoice-icon-512.png
(plus your existing server.js and package.json for the Node backend)

The page now includes a Download/Install App button. In supported Android Chrome, it opens the native install prompt.
If the browser doesn't expose that prompt, use Chrome menu ⋮ > Install app / Add to Home screen.

The class Add and Delete buttons have been overridden with reliable handlers including input validation, overlap detection, localStorage saving, and timetable refresh.
Important: this is a PWA install to the Android home screen, not a signed standalone APK. The site must be HTTPS. AI requests require the server and API account credits to be operational.
