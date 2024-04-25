# WeRoad Tech Case (by Carlos Orbea)

## Required Tech Stack

- ✅ Vue 3 with composition API
- ✅ Nuxt3
- ✅ Typescript
- ✅ Tailwind

## Project description

Build a **travels and bookings management system** consisting of **2 pages**, one to manage travels and the other to manage bookings.

### Travels page

The travels should have some basic information like name of the travel, dates of departure and return, a picture, a description of the tour, a price for a single person and an average user rating.

Travels should be listed in a dedicated page with a table and some basic filters.

The user should be able to:
- Use a form to add a new travel
- Edit an existing travel
- Delete a travel

### Bookings page

The bookings view should display this info: the related travel, customer info, payment type and eventual internal notes.

Bookings should be listed in a dedicated page with a table. A booking can be created with a dedicated multi-step form (wizard):

- first step: search and select the related travel
- second step: fill the customer info in a dedicated form (name, email, phone number, age, gender)
- third step: select the payment type (Credit transfer, Paypal, Revolut) and optionally add some notes


## Notes about the solution provided

- 🔩 The solution provided is written in [TypeScript](https://www.typescriptlang.org/) and making use of Nuxt 3 and [Vue 3](https://vuejs.org/) with **Composition Api**.

- 🎨 For styling [Tailwind](https://tailwindcss.com/) has been used in combination with [PostCss](https://postcss.org/)

- [vueUse](https://vueuse.org/) has been used for some utility functions

- 🈸 Translations have been added to the project with [@nuxt/i18n](https://i18n.nuxtjs.org/)

- Also some basic forms validation with [@vee-validate/nuxt](https://vee-validate.logaretm.com/v4/integrations/nuxt/)

- There are some commit lint and commit guards in place thanks to [Husky](https://github.com/typicode/husky#readme) and `@commitlint`

- Although [Pinia](https://pinia.vuejs.org/) 🍍 is present in the `package.json` I ended up not using it ❌ as there wasn't a lot of data manipulation that required it to be stored and centralized in a single place. Also, as I wanted to display always the newest set of data in each view I ended up re-fetching it from the server, so pulling it from the store wouldn't have added any extra value.

- [Vuetify for Nuxt](https://nuxt.com/modules/vuetify) was used punctually to save time with some specific convoluted components, like data-tables. If those had needed to be done from scratch, they would have consumed way much more time.

- ❌🧪 The project does not present any testing due lack of time. Pending task for the future.

- **note about [json-server](https://github.com/typicode/json-server)**: any changes done into the DB will rewrite the file served. In many occasions, in order to reflect those changes live in the project the service needs to be restarted.

## 🚩 Installation and usage

1. Clone the repository in a folder and install it and its dependencies
  ```
  yarn
  ```
  or
  ```
  npm install
  ```
2. Start the mockup backend server run by [json-server](https://github.com/typicode/json-server) to enable backend endpoints with
  ```
  yarn run start:backend
  ```
4. Run the app with
  ```
  yarn dev
  ```
  or
  ```
  npm run dev
  ```