// Purpose: Import React state management for tracking the currently expanded submenu.
import { useState } from 'react';

// Task #2: Define the shape of each menu entry received through menuConfig.
type MenuItem = {
  // Purpose: Store the visible title and use it to derive the required test IDs.
  title: string;
  // Purpose: Allow menu entries to optionally provide submenu labels.
  subItems?: Array<string>;
};

// Purpose: Represent the complete collection of menu entries passed into Solution.
type MenuConfig = Array<MenuItem>;

// Task #2: Provide the requested menu data for the app when no menuConfig prop is supplied.
const menuConfig: MenuConfig = [
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

// Task #2: Accept menuConfig as the component input with its declared TypeScript type.
function Solution(
  { menuConfig: configuredMenu = menuConfig }: { menuConfig?: MenuConfig } = {},
) {
  // Task #5: Start with no expanded submenu; one title tracks the sole open submenu.
  const [expandedTitle, setExpandedTitle] = useState<string | null>(null);

  // Task #1: Render the menu inside the required outermost menu-wrapper div.
  return (
    <div className="menu-wrapper">
      {/* Task #3: Create one first-level div for every configured menu entry. */}
      {configuredMenu.map(({ title, subItems }) => {
        // Purpose: Convert the title to lowercase for the required data-test-id values.
        const titleId = title.toLowerCase();
        // Task #6: Treat missing or empty subItems as having no submenu controls or list.
        const hasSubItems = Boolean(subItems?.length);
        // Task #5: Determine whether this entry owns the currently expanded submenu.
        const isExpanded = expandedTitle === title;

        // Purpose: Return the markup for one configured menu entry.
        return (
          <div data-test-id={`first-level-${titleId}`} key={title}>
            {/* Task #4.1: Display the configured menu title in its corresponding div. */}
            {title}
            {/* Task #6: Omit the button and submenu entirely when there are no subitems. */}
            {hasSubItems && (
              <>
                {/* Task #4.2: Render the required button only for entries with subitems. */}
                <button
                  type="button"
                  data-test-id={`button-${titleId}`}
                  onClick={() => {
                    // Task #5: Close this submenu if open; otherwise open it and replace any other open submenu.
                    setExpandedTitle(isExpanded ? null : title);
                  }}
                >
                  {/* Task #4.2: Label the button according to this entry's expanded state. */}
                  {isExpanded ? 'Hide' : 'Expand'}
                </button>
                {/* Task #7: Keep a closed submenu out of the DOM rather than hiding it with CSS. */}
                {/* Task #4.3: Give the submenu list its required title-based test ID. */}
                {isExpanded && (
                  <ul data-test-id={`ul-${titleId}`}>
                    {/* Task #4.4: Render submenu entries in the configured order. */}
                    {subItems?.map((subItem) => (
                      <li
                        data-test-id={`li-${titleId}-${subItem.toLowerCase()}`}
                        key={subItem}
                      >
                        {/* Purpose: Display the original submenu label as the list item text. */}
                        {subItem}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Solution;
