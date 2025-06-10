# DaxwellOrderApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

ASSESSMENT NOTES:
Instructions to Run the Angular Application (from GitHub Zip)

1. Extract Project: Unzip the downloaded project file to a desired location on your computer.
2. Open Terminal: Navigate your terminal or command prompt into the extracted project directory (where package.json is located).
3. Install Prerequisites:
   • Ensure Node.js and npm are installed. (Verify with node -v and npm -v).
   • Install Angular CLI (version 16) globally: npm install -g @angular/cli@16.0.0
4. Install Dependencies: In the project directory, run: npm install
5. Start Application: After dependencies are installed, run: ng serve
6. Access App: Open your web browser and go to http://localhost:4200/ (or the address shown in the terminal).

modularization approach for Create and View Pages:

• Refactored CreateComponent: The existing CreateComponent (CreateComponent – name can be altered for better understanding) is the central component for both creation and viewing/editing.
• Dynamic Mode Control: Implemented an @Input() readonly: boolean property to switch the component between editable (for creating/editing) and read-only (for viewing) modes.
• Integrated Data Fetching: The CreateComponent(common component) now utilizes ActivatedRoute to get an orderNumber from the URL and fetches corresponding order data via OrderService to pre-populate the form for viewing/editing.
• Conditional UI Rendering: HTML templates use \*ngIf directives to show/hide elements (e.g., titles, action buttons) based on the readonly mode, ensuring a tailored user interface.
• Streamlined Routing: Updated the Angular routing module to direct both /orders/create and /orders/:id/view to the single CreateComponent.
