# treemind

#### Yet another simple to-do list application, this time with a twist!

treemind is a to-do list application that organizes tasks in tree structures, offering a unique way to visualize task relationships and priorities.

## Features

-   **Task Management**: Add, complete, and delete tasks.
-   **Tree-Based Visualization**: Tasks are displayed in interactive tree structures.
    -   **Heap View**: Visualizes tasks based on a max-heap structure, prioritizing tasks by a calculated score (considering deadline and estimated time).
    -   **BST View (ID-based)**: Organizes tasks in a Binary Search Tree based on their unique ID.
    -   **Title BST View (Title-based)**: Organizes tasks in a Binary Search Tree based on their title, facilitating alphabetical searching.
-   **Search Functionality**: Quickly find tasks by title.
-   **Persistent Storage**: Tasks are saved in the browser's local storage.
-   **Responsive Design**: Adapts to different screen sizes.

## Technologies Used

-   **Frontend**: HTML, CSS (Tailwind CSS), JavaScript
-   **Visualization**: Cytoscape.js
-   **Build Tool**: Vite
-   **Modules**: `uuid` for generating unique task IDs.

## Getting Started

### Prerequisites

-   Node.js and npm (or yarn) installed on your machine.

### Installation & Running

1.  **Clone the repository (or download the source code):**

    ```bash
    git clone <repository-url>
    cd treemind
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

    or if you use yarn:

    ```bash
    yarn install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    This will start the Vite development server, and you can view the application in your browser, usually at `http://localhost:5173`.

4.  **Build for production:**
    ```bash
    npm run build
    ```
    This command bundles the application into the `dist` directory for deployment.

## Project Structure

-   `index.html`: The main HTML file.
-   `src/`: Contains the JavaScript source code.
    -   `main.js`: Main application logic, task handling, and initialization of data structures.
    -   `search.js`: Handles search functionality.
    -   `structures/`: Contains implementations of data structures (BST, MaxHeap, TitleBST).
    -   `tasks/`: Contains task-related logic (Task class, task list creation).
    -   `visualization/`: Contains logic for visualizing the tree structures using Cytoscape.js.
-   `public/`: Static assets like icons.
-   `package.json`: Project metadata and dependencies.
-   `vite.config.js`: Vite configuration file.
-   `tailwind.config.js`: Tailwind CSS configuration file.

## How It Works

treemind utilizes three main data structures to manage and display tasks:

1.  **Max Heap**: Prioritizes tasks based on a score calculated from their deadline and estimated completion time. The task with the highest priority (closest deadline, least slack time) is at the root.
2.  **Binary Search Tree (BST by ID)**: Organizes tasks by their unique ID. This allows for efficient searching and deletion by ID.
3.  **Binary Search Tree (BST by Title)**: Organizes tasks alphabetically by their title. This is used for the search functionality, providing quick suggestions as the user types.

When a task is added, it's inserted into all three structures. When a task is completed or deleted, it's removed from all structures. The application uses `localStorage` to persist tasks between sessions. Cytoscape.js is used to render interactive visualizations of these tree structures.
