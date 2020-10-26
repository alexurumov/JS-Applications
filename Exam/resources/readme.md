-1) Using Firebase Cloud Firestore, but for some unknown reason, from time to time, <FirebaseError: Missing or insufficient permissions.> appeared, so I had to change the DB rules to: 

<!-- service cloud.firestore { -->
  <!-- match /databases/{database}/documents { -->
    <!-- match /{document=**} { -->
      <!-- allow read, write; -->
    <!-- } -->
  <!-- } -->
<!-- } -->

-2) Added value attributes to Edit form, so I can fulfil the current article data properties; 

