# codev-javascript

Welcome to your shiny new Codespace running React! We've got everything fired up and running for you to explore React.

You've got a blank canvas to work on from a git perspective as well. There's a single initial commit with the what you're seeing right now - where you go from here is up to you!

Everything you do here is contained within this one codespace. There is no repository on GitHub yet. If and when you’re ready you can click "Publish Branch" and we’ll create your repository and push up your project. If you were just exploring then and have no further need for this code then you can simply delete your codespace and it's gone forever.

This project was bootstrapped for you with [Vite](https://vitejs.dev/).

## Available Scripts

In the project directory, you can run:

### `npm start`

We've already run this for you in the `Codespaces: server` terminal window below. If you need to stop the server for any reason you can just run `npm start` again to bring it back online.

Runs the app in the development mode.\
Open [http://localhost:3000/](http://localhost:3000/) in the built-in Simple Browser (`Cmd/Ctrl + Shift + P > Simple Browser: Show`) to view your running application.

The page will reload automatically when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

# GitHub Codespaces ♥️ React

Welcome to your shiny new Codespace running React! We've got everything fired up and running for you to explore React.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Vite documentation](https://vitejs.dev/guide/).

To learn Vitest, a Vite-native testing framework, go to [Vitest documentation](https://vitest.dev/guide/)

### Code Splitting

This section has moved here: [https://sambitsahoo.com/blog/vite-code-splitting-that-works.html](https://sambitsahoo.com/blog/vite-code-splitting-that-works.html)

### Analyzing the Bundle Size

This section has moved here: [https://github.com/btd/rollup-plugin-visualizer#rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer#rollup-plugin-visualizer)

### Making a Progressive Web App

This section has moved here: [https://vitejs.dev/guide/build.html#advanced-base-options](https://vitejs.dev/guide/build.html#advanced-base-options)

### Deployment

This section has moved here: [https://vitejs.dev/guide/build.html](https://vitejs.dev/guide/build.html)

### Troubleshooting

This section has moved here: [https://vitejs.dev/guide/troubleshooting.html](https://vitejs.dev/guide/troubleshooting.html)

---

## TypeScript Task: Dynamic Side Menu

**test**

1. the outermost. tag of the component is a div with a class of menu-wrapper. Initially it will contain nothing, and your task is to create the code that will display the side menu there.
2. the component will receive a property named menuConfig which will contain the configuration of the side menu data:

	 ```ts
	 const menuConfig = [
		 {
			 title: 'Home',
		 },
		 {
			 title: 'Services',
			 subItems: ['Cooking', 'Cleaning'],
		 },
		 {
			 title: 'Contact',
			 subItems: ['Phone', 'Mail'],
		 },
	 ];
	 ```

	 The type of menuConfig is MenuConfig. Both MenuItem and MenuConfig are defined at the beginning of the file and appear as follows:

	 ```ts
	 type MenuItem = {
		 title: string,
		 subItems?: Array<string>
	 }

	 type MenuConfig = Array<MenuItem>
	 ```

1. Every menu item should be displayed inside a separate corresponding div. This div should have a dynamically created attribute, data-test-id, in the form: first-level-{lowercase-title-name-here}. So, for example, if some MenuItem contained a title named Home, the div should have a data-test-id containing first-level-home.
2. Every div from the previous point should contain within it:

	 - title. For example for a MenuItem with the title Home, the text Home should appear in this div.
	 - button with a dynamic data-test-id in the form: button-{lowercase-title-name-here} (for example, button-home). The button should only be displayed when there are subItems for the given menu item. When clicking button, the submenu with subItems {the ul list described in the next point} should appear (be added to the DOM) if it is hidden, and should disappear (be removed from the DOM) if it is expanded. The text inside the button should be Expand when the given menu is not expanded, and Hide if the menu is already been expanded.
	 - ul list. The ul tag should have a data-test-id in the form: ul-{lowercase-title-here}, so if we had a list for the Home title, the data-test-id should be ul-home.
	 - li tags inside the aforementioned ul tag. Each li should have a data-test-id in the form: li-{lowercase-title-name-here}-{lowercase-subitem-name-here}. SO, for example, for the HOme title and subitems Main and Services, the li data-test-ids should be li-home-main and li-home-services. Inside every li tag there should be a subItem name (taken from the array subItems) from the corresponding MenuItem). The display state of these submenu lists is controlled by the aforementioned corresponding buttons.

1. Only one submenu should be in the expanded state at any time. If one of the submenus is open and then some other menu item button is clicked, the previously expanded submenu should be hidden and the new one should appear.
2. of no subItems are available for some MenuItem (undefined subItems property for Menu Item or an empty array), then no ul list should be available, and also no Expand button should be available.
3. Tests will follow elements by their data-test-id, so invisible elements should not be rendered. Do not control elements’visibilit using CSS properties.

Assumptions

- Design/styling is not assessed and will not affect your score. You should focus only on implementing the requirements.
- Initially, no submenu items should be visible; in otherwords, no menu item should be expanded when it contains some subItems (there should be no ul in the DOM).
- Every title in menuConfig will be unique, so you do not have to worry about duplicate Ids in the code.
- No title or potential subtitle can have an empty value.
- Every title and subtitle contains only letters and consists of just one word.
- You can use console.log for debugging purposes via your browsers developer tools.
- Only imports from the react module are allowed.

The initial file content was:

```tsx
import React, { ReactElement } from 'react';

type MenuItem = {
	title: string;
	subItems?: Array<string>;
};

type MenuConfig = Array<MenuItem>;

function Solution({ menuConfig }: { menuConfig: MenuConfig }): ReactElement {
	return <div className="menu-wrapper">Implement your solution here</div>;
}

export default Solution;
```

---

## JavaScript Task: Debounced Autocomplete

1. In order to fetch items based on the current query, you should send a GET request to the mocked https://example.com/api/items endpoint. The endpoint requires a query parameter q that is meant to hold the query's value. The endpoint will fail if the q query parameter is not provided.
2. The component should render a div element that has the class name wrapper and two child elements:

	 - A div element with the class name control
	 - A div element with the class name list

	 The div element with class name control should contain an input element with the class name input, and this is the input in which the user enters a query.
3. Once a response comes from the API, all strings from the response should be displayed inside the div element with class name list, each one inside a separate a element with the class name list-item.

	 - The strings should be displayed in the same order as they arrived from the API.

4. You should avoid sending too many requests to the API; in particular, do not send requests on every single keypress. You are expected to properly debounce the requests. The debounce time-out should be 500 milliseconds.
5. When items are being fetched, a class name is-loading should be added to the input's wrapper (the element with class name control).
6. When items are being fetched, no request has been sent or the endpoint has returned zero items, the div element with class name list should not be rendered.
7. The component accepts the prop onSelectItem: (item: string) => void, which should be called with an item when the user clicks on it.

	 - Clicking on an item does not have any effect apart from calling the callback.

8. The component should be the default export and can be either a function component or a class component.

Assumptions

- https://example.com is a mocked service and can be accessed only in the Codility UI.
- The mocked endpoint https://example.com/api/items returns an array of strings. The array's length is at most 10.
- Assume that a request sent to the mocked endpoint https://example.com/api/items never fails when provided a q query parameter.
- The "Preview" tab will display your component. You can use it for testing purposes. In preview mode, the API is mocked up, and will always return a random valid result. Also, the preview page imports a CSS stylesheet from Bulma (v0.7.5) to give neat styling.
- Design/styling is not assessed and will not affect your score. You should focus only on implementing the requirements.
- Use console.log and console.error for debugging purposes via your browser's developer tools.
- When using Axios you are expected to use params argument and not build the URL by hand.

Additional examples

Example 1

Let's consider the following sequence of actions:

- The user types "q" into the input.
- After 50 ms the user presses "u", and then again, after every 50 ms, a new character is inserted until the input value is "query".
- Only one request to the API is sent, exactly 500 ms after "y" is input.
- During this period (from pressing "y" until the response comes in), the class name is-loading is added to the input's wrapper.

Example 2

If the response from the API endpoint is:

```json
["Italy", "Spain", "Portugal", "Macedonia"]
```

then the list section, which is rendered as follows:

```html
<div class="list">
	<a class="list-item">Italy</a>
	<a class="list-item">Spain</a>
	<a class="list-item">Portugal</a>
	<a class="list-item">Macedonia</a>
</div>
```

Available packages/libraries

- Node.js (v26)
- react (v19.3.0)
- classnames (v2.5.1)
- Lodash (v4.18.1)
- axios (v1.20.0)

The provided starter code was:

```jsx
import React from 'react';
import classnames from 'classnames';
// you should import `lodash` as a whole module
import lodash from 'lodash';
import axios from 'axios';

const ITEMS_API_URL = 'https://example.com/api/items';
const DEBOUNCE_DELAY = 500;

// the exported component can be either a function or a class

export default function Autocomplete() {
	return (
		<div className="wrapper">
			<div className="control">
				<input type="text" className="input" />
			</div>
			<div className="list is-hoverable" />
		</div>
	);
}
```
