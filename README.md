## Chapter 1: Getting Started

- React's `'use client'` and '`use server'` directive which are used at the top level of a component's file.
- The reason to render client side components is for user-based interactions such as buttons and forms since user input does not happen on the server side.
- Learned about the some of the NextJS folder structure
  - `/app`
  - `/app/lib ` - contains reusable utility functions
  - `/app/ui` - contains reusable components (ie. Forms and Tables)
  - `/public` - contains static assets (ie. images)

## Chapter 2: CSS Styling

- Learned about the two ways of styling a Next application which are TailwindCSS and CSS modules
- CSS modules are located in the `app/ui/home.module.css` where styles are created by declaring a class with the name and an object containing the styles that you want to use.
  - To use the specified class import styles object from the home.module.css file. For example the class that you named is called shape, it is consumed using `styles.shape` inside the `className` attribute
- Additionally the `clsx` library can be used to conditionally add classes dependent on different states

## Chapter 3: Optimizing Fonts and Images

- The `app/ui/fonts.ts` are where fonts are declared.
- Each font is imported as an function from `next/font/..` , the returned function accepts an object containing options as an argument. The variable is immediately exported with the declaration
- The declared fonts are consumed by importing the exported font object from `app/ui/fonts.ts` the font object is consumed in the className attribute (ie. `Inter.className`)
- Instead of using the `<img>` html tag, the NextJS' `<Image>` component optimizes images better, which is imported from `next/image`.

## Chapter 4: Creating Layouts and Pages

Reserved Keywords:
app/layout.tsx/app/page.tsx - reserved keywords for the reused application layout and index page respectively. The app/layout is inherited throughout all the application.
Routes are created by creating a folder inside app representing the URI. Aside from the root app folder, the layout.tsx and page.tsx files are also used inside each folder of the routes.
Nested subroutes inherit the layout.tsx of the main route, when you navigate to the nested subroutes, only the nested parts are re-rendered (i.e. layout isn't re-rendered)

## Chapter 5: Navigating Between Pages

- The `<Link>` component which is imported from next/link is similar from the `<a>` tag but unlike the default behavior of refreshing a page, it only causes a partial re-render.
- The `usePathName()` hook alongside the `clsx` library is a common pattern to represent which is the currently active link for lists of links.
  - Since hooks turn the component into a client side component, the use client directive must be used.

## Chapter 6: Setting up the Database

- As practice, I deployed a NextJS project by importing an existing GitHub repository.
- Using the Vercel website, I have configured the `.env`, created a Postgres database, executed an SQL query, and seeded the database by visiting the `/seed` URI.
- I also ran the `pnpm i @vercel/postgres` command to install the Vercel Postgres SDK to interact with the created Postgres database in Vercel

## Chapter 7: Fetching Data

- Learned about fetching data in the database using NextJS.
- APIs, ORMs (only for relational databases like Postgres), and raw SQL can be used to fetch data.
  = You should only query your database in the server (ie. using server components or writing logic for API endpoints).
- The imported `sql` from `@vercel/postgres` can only be used in server components.
- When fetching data from the server, the component should be async so that we can await the query.
  Network waterfalls can impact performance as opposed to running them in parallel using the `Promise.all` method. - This can be desirable sometimes if we want to satisfy a condition before making another request (like an if statement). - A disadvantage of this behavior is when one request which can be expensive is blocking other requests.

## Chapter 8: Static and Dynamic Rendering

- Static rendering is the default behavior of server side components and it is typically used UI with no data/data that is shared across users
- Dynamic rendering is used for regularly updated data such as a dashboard
  When a network waterfall occurs, this can block render if the query takes a long time.

## Chapter 9: Streaming

- In NextJS, streaming is implemented by the `loading.tsx` and the React's `<Suspense>` component
  - The `loading.tsx` reserved keyword - streams content at the page level
    - It is a good place to add skeleton components which are used to indicate the loading state
    - Sub-routes inherit the main route's `loading.tsx` file
      - To override this behavior, create a route group denoted by creating a folder with a name enclosed in parenthesis and put the `loading.tsx` inside the route group
  - For streaming content at the component level, make the component async and wrap the component that will consumed the asynchronous content(i.e. inside variable using a fetch call) with the `<Suspense>` component where the skeleton component will be specified at the fallback prop.
    - When using the `<Suspense>` component and data fetching, it is good practice to move the fetch to the component that needs it
    - Suspense wrappers can be used to customize the time of when the component loads (ie. we want to load multiple components at the same time)

## Chapter 10: Partial Re-rendering

- By default, if you call a dynamic function within a route, the entire route becomes dynamic
- There is an experimental feature called partial re-rendering which can be implemented by adding the `ppr: 'incremental'` property in the experimental object inside `next.config.mjs` and adding the `export const experimental_ppr = true` inside the Layout component of the specified route where we want to implement partial re-rendering.

## Chapter 11: Adding Search and Pagination

- Search and Pagination functionality can be implemented using URL search params by using a combination of the `onChange` event of a search input, the `useSearchParams`, `usePathname`, and `useRouter` hooks, and the `URLSearchParams` object.
  - If state is used to manage the value of the search input, then the value attribute is used, otherwise use the `defaultValue` attribute (like in the above mentioned implementation).
  - `page.tsx` components accept a prop called `searchParams` (server side search) which is an object that contains the (ie. URL search params and the current page)
- Debouncing is a useful optimization to prevent a query on every keystroke.
  - The `useDebouncedCallback` of the `use-debounce` library accepts a callback function (ie. `handleChange`) and an integer representing the amount of ms to delay the callback. 
- As a security concern, database queries should only happen on server client components to prevent exposure of secrets. If a client component needs information, pass it down via props.

## Chapter 12: Mutating Data

- React Server Actions are code that runs in the server using the `use server` directive.
    - In React, the callback function passed inside the `<form>`'s `action` attribute recieves a `FormData` object which contains captured data.
    - Inside the callback function invoke the `use server` directive to create a server action. This makes the form work even if JavaScript is disabled since the code is invoked on the client.
    - The callback function usually contains logic regarding form validation, extracting the `FormData` object,
