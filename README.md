# YJ Movie App

Demo test app.

## Installation

Clone the repo

```bash
git clone <git url>
```

Use the package manager [npm](https://www.npmjs.com) to install.

```bash
npm install
```

Run the pod install command for iOS.

```bash
npx pod-install
# or
cd ios/ && pod install
```


## Run the app

For Android, open an emulator (mobile or TV) and run the command:

```bash
npx react-native run-android
```

For iOS, open Xcode `.xcworkspace` file:
- Select the scheme (eg: `*-tvOS` for AppleTV)
- Select a simulator (mobile or TV) and press play.


## Demo links

[Android app](https://drive.google.com/file/d/14gwErtfgOqJoaryfvG0Uii1gL-UV5ebj/view?usp=sharing)

[iOS app](https://drive.google.com/file/d/1YRr20Aj-pf6YfwoLJYSVB5Swiu4cCjww/view?usp=sharing)

[Android TV](https://drive.google.com/file/d/1s4aEctvskogfOh9qbrmS-gHsjU9cdXje/view?usp=sharing)

[Apple TV](https://drive.google.com/file/d/1qwwYWU9Va2jcEQhx41bVPRnnB4z-6WBr/view?usp=sharing)


## Note / Known issues

- Orientation on iOS device does not lock to landscape mode.
- Video url is hardcoded.
- For some unknown reason, the iOS/AppleTV simulators sometimes has a green theme applied on some native controllers (eg: video player).