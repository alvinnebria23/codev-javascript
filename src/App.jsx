// Purpose: Import the React hooks needed to manage component state, refs, and side effects.
import { useEffect, useMemo, useRef, useState } from 'react';
// Purpose: Import the utility used to conditionally add CSS classes such as is-loading.
import classnames from 'classnames';
// Purpose: Import Lodash for debouncing the API calls to reduce unnecessary requests.
import lodash from 'lodash';
// Purpose: Import Axios to perform the GET request to the mocked items API.
import axios from 'axios';

// #1 Task: API endpoint and debounce configuration
// Purpose: Define the mocked API URL used for fetching search results.
const ITEMS_API_URL = 'https://example.com/api/items';
// Purpose: Set the debounce delay to 500ms so requests are sent only after the user pauses typing.
const DEBOUNCE_DELAY = 500;
// Purpose: Keep the loading state visible for a small minimum time to prevent flicker on fast responses.
const MIN_LOADING_DURATION = 100;

// #2 Task: component receives the optional onSelectItem callback
// Purpose: Export the autocomplete component so it can be used as the app's default component.
export default function Autocomplete({ onSelectItem }) {
  // #3 Task: local state for query, loading, and fetched items
  // Purpose: Store the current text typed by the user in the input field.
  const [query, setQuery] = useState('');
  // Purpose: Store the latest items returned from the API to render them in the list.
  const [items, setItems] = useState([]);
  // Purpose: Track whether the app is in a loading state so the UI can show a spinner/loading style.
  const [isLoading, setIsLoading] = useState(false);
  // Purpose: Keep the most recent query value so stale async responses are ignored when outdated requests resolve.
  const latestQuery = useRef('');

  // #4 Task: debounce the request so it does not fire on every keystroke
  // Purpose: Create a debounced async function that fetches results after a 500ms pause.
  const debouncedSearch = useMemo(
    () =>
      lodash.debounce(async (searchQuery) => {
        // Purpose: Ignore this request if the query has changed since it was scheduled.
        if (latestQuery.current !== searchQuery) {
          return;
        }

        // Purpose: Record when the request started so the loading state can remain visible for a minimum duration.
        const requestStartedAt = Date.now();
        // Purpose: Activate the loading state before sending the request.
        setIsLoading(true);
        try {
          // Purpose: Send the GET request with the q parameter matching the current search value.
          const response = await axios.get(ITEMS_API_URL, {
            params: { q: searchQuery },
          });

          // Purpose: Only update the result list if this is still the newest query.
          if (latestQuery.current === searchQuery) {
            setItems(response.data);
          }
        } catch (error) {
          // Purpose: If the request fails, clear the results for the current query while keeping it safe from stale responses.
          if (latestQuery.current === searchQuery) {
            console.error(error);
            setItems([]);
          }
        } finally {
          // Purpose: Keep the loading state active for at least a brief minimum time before clearing it.
          if (latestQuery.current === searchQuery) {
            const remainingLoadingTime =
              MIN_LOADING_DURATION - (Date.now() - requestStartedAt);

            if (remainingLoadingTime > 0) {
              window.setTimeout(() => {
                // Purpose: Ensure the loading state is cleared only for the matching latest query.
                if (latestQuery.current === searchQuery) {
                  setIsLoading(false);
                }
              }, remainingLoadingTime);
            } else {
              setIsLoading(false);
            }
          }
        }
      }, DEBOUNCE_DELAY),
    [],
  );

  // #5 Task: trigger the debounced request only when a non-empty query exists
  // Purpose: Run the debounced request whenever the query changes and skip empty searches.
  useEffect(() => {
    if (query.length === 0) {
      return;
    }

    // Purpose: Trigger the delayed request after the user has stopped typing briefly.
    debouncedSearch(query);
    // Purpose: Cancel any pending delayed request when the component is cleaned up or the query changes.
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch, query]);

  // #6 Task: update the query and keep the loading state aligned with the async request
  // Purpose: Handle text input changes and reset related state before the next debounced fetch.
  function handleQueryChange(value) {
    // Purpose: Store the newest query value so outdated requests can be ignored.
    latestQuery.current = value;
    // Purpose: Update the visible input value as the user types.
    setQuery(value);
    // Purpose: Clear previously fetched results to avoid showing stale suggestions.
    setItems([]);
    // Purpose: Reset the loading flag immediately so the is-loading class is not left on for stale output.
    setIsLoading(false);
  }

  // #7 Task: render the wrapper, control, input, and list structure
  // Purpose: Return the component markup for the autocomplete input and suggestion list.
  return (
    <div className="wrapper">
      {/* Purpose: Apply the loading class to the control container while the API request is active. */}
      <div className={classnames('control', { 'is-loading': isLoading })}>
        {/* Purpose: Render the text input where the user types search terms. */}
        <input
          type="text"
          className="input"
          value={query}
          onChange={(event) => handleQueryChange(event.target.value)}
        />
      </div>
      {/* Purpose: Only render the suggestion list when the app is not loading and there are results to show. */}
      {!isLoading && items.length > 0 && (
        <div className="list is-hoverable">
          {/* Purpose: Loop over each returned item and render it as a clickable suggestion. */}
          {items.map((item, index) => (
            <a
              className="list-item"
              href="#"
              key={`${item}-${index}`}
              onClick={(event) => {
                // Purpose: Prevent the default anchor navigation behavior.
                event.preventDefault();
                // Purpose: Notify the parent component of the selected item if a callback was provided.
                onSelectItem?.(item);
              }}
            >
              {/* Purpose: Display the item text exactly as it was returned by the API. */}
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}