# Get Started with design.sparkpost.com

design.sparkpost.com is SparkPost's internal design documentation website <br />
design.sparkpost.com is built using [Next.js]<https://nextjs.org/> and [Sanity.io]<https://www.sanity.io/>

---

## 🛠️ Setup

Before running the site locally you will need to install the 

### Sanity
1. Install the [Sanity CLI]<https://www.sanity.io/docs/getting-started-with-sanity-cli> globally by running `npm install -g @sanity/cli`
2. `cd studio` and run `sanity install` in the `/studio` directory

### Next.js
1. `npm install` in the project root directory
2. Install husky `npm run husky:install`
3. Create a .env.local file containing the following:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=w7rshig9
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<API_TOKEN> // Request this from a User Experience Engineer
NEXT_PUBLIC_SANITY_PREVIEW_SECRET=MATCHBOX
```

## ⚡ Running The Apps

From the root directory run `npm start`
- Sanity studio will be running at `localhost:3333`
- The Nextjs app will be running at `localhost:3000`
  - If you want to change the ports either app run on you will have to update the CORS Origins in the studio settings ([manage.sanity.io]<https://manage.sanity.io>)
    - Settings -> API -> CORS Origins
  - You will need to ask a User Experience Engineer for access if you do not already have it

