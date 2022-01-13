### Software prerequisites

Install the below tools/packages

| Serial No |   Software   |  Version   | Installation site                                                  |
| :-------: | :----------: | :--------: | :----------------------------------------------------------------- |
|     1     |   node.js    | >= 15.14.0 | [Install NodeJS](https://nodejs.org/en/download/)                  |
|     2     |     yarn     | >= 1.22.11 | [Install Yarn](https://classic.yarnpkg.com/lang/en/docs/install)   |
|     3     | react-native | >= 0.64.3  | [Install React-native](https://www.npmjs.com/package/react-native) |
|     4     |     expo     | >= 44.0.0  | [Install Expo](https://www.npmjs.com/package/exp)                  |

### Setup Instructions

#### System setup

1. Clone the repo with `git clone [REPO_URL]` command
2. Switch to the project's root directory in terminal
3. Install the dependencies by running `yarn install`
4. Make sure to run `yarn prepare` for one time after the clone
5. Once, 'yarn install' is completed, run `NODE_ENV=development yarn start` to start the expo and react-native server
6. If it shows a QR code on the terminal as a result of 'yarn start' command, then you are good to go!

you can write your env specific config variables on `.env-*` file and `app.config.ts` file and import them from `expo-constants` package as mentioned.

Ignore the first step on 'Mobile setup' instructions given below if you already have 'Expo' app installed on your phone.

#### Mobile setup

1. Install 'Expo' application on your android/iOS device. You can find the links to Android and iOS apps [here](https://expo.io/tools#client).
2. Scan the QR code shown on the terminal.
3. Once the QR code is successfully scanned, it will take few seconds to load and render the app.
