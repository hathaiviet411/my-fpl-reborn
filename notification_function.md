### Task: Implement End-to-End Notification System (Push & Local) with UX Permission Flow

**Environment Context:**
- Framework: Expo (~57) / React Native (0.86.2)
- Language: TypeScript / React Native

---

### Objective:
Implement a complete Push & Local Notification module using `expo-notifications`. The setup must configure native `app.json` settings, manage foreground/background notification handlers, create Android channels, and implement a **Just-In-Time UX permission flow** with token generation.

---

### Requirements & Implementation Steps:

#### Step 1: Install Dependencies
Run:
`npx expo install expo-notifications expo-device expo-constants`

#### Step 2: `app.json` Configuration
Update `app.json` under `expo.plugins` to configure notification icons, colors, and sound settings:
```json
{
  "expo": {
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./assets/notification-icon.png",
          "color": "#ffffff",
          "sounds": ["./assets/notification-sound.wav"]
        }
      ]
    ]
  }
}

Step 3: Notification Handler & Android Channel Setup (src/services/notificationService.ts)
Foreground Handler: Set up Notifications.setNotificationHandler so notifications trigger alert banners, badges, and sounds even when the app is actively open in the foreground.

Android Channel: Create a function setupAndroidNotificationChannel() using Notifications.setNotificationChannelAsync('default', ...) with Importance.MAX for Android 8.0+.

Step 4: UX Permission & Push Token Service (src/hooks/usePushNotifications.ts)
Implement a custom hook or service with the following logic:

Device Verification: Check Device.isDevice. If running on a Simulator/Emulator, gracefully log a warning and return null for the Expo Push Token.

Soft-Prompt Permission Flow:

Check existing status via Notifications.getPermissionsAsync().

Do NOT ask on initial app mount automatically. Provide a helper requestNotificationPermission() that can be triggered in-context (e.g., after an onboarding step, settings toggle, or bottom-sheet prompt).

If status is undetermined, call Notifications.requestPermissionsAsync().

If status is permanently denied, show an Alert offering a direct redirect to device settings (Linking.openSettings()).

Token Retrieval: If granted, call Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig?.extra?.eas?.projectId }) and handle potential errors gracefully.

Step 5: Listener Subscriptions
Add event listeners for:

Received notifications (Notifications.addNotificationReceivedListener)

User interaction / tapping a notification (Notifications.addNotificationResponseReceivedListener)
Ensure listeners clean up properly on component unmount.

Deliverables Expected:
Package installation & updated app.json.

Dedicated notificationService.ts and usePushNotifications.ts hook.

Example usage in root layout (app/_layout.tsx or App.tsx) showing how to initialize handlers and handle tap navigation.


---

<ElicitationsGroup message="Do you need help with backend push delivery or Expo EAS configuration?">
  <Elicitation label="Expo Server SDK for backend push delivery" query="How do I send push notifications from my Node.js backend using the Expo Server SDK?"/>
  <Elicitation label="EAS Build & FCM/APNs credential setup" query="How do I configure FCM (Android) and APNs (iOS) credentials in Expo EAS for production push notifications?"/>
</ElicitationsGroup>