### Task: Implement End-to-End QR Scanner Feature with UX-Compliant Permissions

**Environment Context:**
- Framework: Expo (~57) / React Native (0.86.2)
- Language: TypeScript / React Native

---

### Objective:
Implement a full-featured QR Code scanner in the app supporting both **live camera scanning** and **decoding QR codes from saved gallery images**. The implementation must strictly follow **Just-In-Time UX permission practices** (no immediate popups on app launch; proper handling when permission is permanently denied).

---

### Requirements & Execution Steps:

#### Step 1: Dependencies & `app.json` Configuration
1. Install required packages using Expo CLI:
   `npx expo install expo-camera expo-image-picker`
2. Update `app.json` to configure the native iOS usage descriptions and Android permissions under `expo.plugins`:
   ```json
   {
     "expo": {
       "plugins": [
         [
           "expo-camera",
           {
             "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera to scan QR codes."
           }
         ],
         [
           "expo-image-picker",
           {
             "photosPermission": "Allow $(PRODUCT_NAME) to access your photo library to scan QR codes from images."
           }
         ]
       ]
     }
   }

   Step 2: UX Permission Module (src/hooks/useQRScannerPermissions.ts or helper)
Build a helper hook or utility for managing Camera and Media Library permissions adhering to the following UX rules:

Never request permissions on initial app mount.

First-time trigger: When the user initiates a scan action (e.g., taps "Scan QR" or "Pick Image"), check permission state via useCameraPermissions / ImagePicker.useMediaLibraryPermissions.

If status is undetermined: Request permission using the official prompt.

If status is denied & canAskAgain === false (Permanently Denied): Do NOT attempt to show the native system dialog again. Instead, display an Alert explaining why access is required, with two buttons:

"Cancel"

"Open Settings" -> invokes Linking.openSettings().

Step 3: QR Scanner Component (src/components/QRScannerScreen.tsx)
Implement a production-grade QR scanning component:

Live Camera Scanning (expo-camera):

Use <CameraView> configured with barcodeScannerSettings={{ barcodeTypes: ['qr'] }}.

Implement a scan lock state (scanned: boolean) to prevent rapid duplicated callbacks while a QR code is in view.

Include a visual scanning overlay/target box with clear styling.

Gallery Scanning (expo-image-picker + Camera.scanFromURLAsync):

Add a button "Upload from Gallery".

Open image picker (ImagePicker.launchImageLibraryAsync).

Decode QR code from the local image URI using Camera.scanFromURLAsync(imageUri, ['qr']).

Show appropriate feedback if a QR code is detected or if no code is found in the selected photo.

Scan Reset: Provide a "Scan Again" action to reset the scanned state and resume live camera feed.

Deliverables Expected:
Package installation command execution.

Updated app.json with plugin permissions.

Clean, fully-typed TypeScript component and permission logic.

Clear instructions on how to test on iOS/Android Simulator and physical devices.