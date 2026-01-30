<img src="/assets/icon.svg" height="64px" />

# Data Grid 2 Accordion - Mendix Pluggable Widget
Add show/hide accordion Data Grid 2 rows.

See [Demo](https://datagridtwoaccordiondemo-sandbox.mxapps.io/).

## Features
 - Trigger using row select, or trigger (button, link or custom)
 - Maintains HTML structure of Data Grid 2
 - Customisable styling

## Usage
> [!Warning]
> Requires Mendix Studio Pro 10.24 or later

 1. Add the widget to your project
 2. Drop the widget into a Data Grid 2 custom content column
 3. Configure the 'Type' to 'Observer'
 4. Configure the Observer 'Type' to set when it will open/close:
     - 'Trigger' - using another Data Grid 2 Accordion set to trigger
     - 'On row select' - using Data Grid 2 row selected (Data Grid 2 'Selection' needs to be 'Single' or 'Multi')
 5. If configured to 'Trigger': Drop another widget into the same Data Grid 2, on another custom content column

## Issues, suggestions and feature requests
Please report any issues to [Mendix-DataGridTwoAccordion/issues](https://github.com/Carter-Moorse/Mendix-DataGridTwoAccordion/issues)

## Development and contribution

1. Install NPM package dependencies by using: `npm install`. If you use NPM v7.x.x, which can be checked by executing `npm -v`, execute: `npm install --legacy-peer-deps`.
1. Run `npm start` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.
