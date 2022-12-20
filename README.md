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
3. Install the dependencies by running `yarn`
4. Once, 'yarn' is completed, run `yarn dev` to start the expo server
5. Scan the QR code displayed in the terminal in your mobile using the expo go app to run the application

you can write your env specific config variables on `.env-*` file and `app.config.ts` file and import them from `expo-constants` package as mentioned.
