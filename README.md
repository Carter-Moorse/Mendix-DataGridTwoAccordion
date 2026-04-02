<img src="/assets/icon.svg" height="64px" />

# Data Grid 2 Accordion - Mendix Pluggable Widget
Add show/hide accordion Data Grid 2 rows.

<img src="/assets/example.png" />

See [Demo](https://datagridtwoaccordiondemo-sandbox.mxapps.io/).

## Features
 - Trigger using row select, or trigger (button, link or custom)
 - Maintains HTML structure of Data Grid 2
 - Customisable styling

## Usage
> [!Warning]
> Requires Mendix Studio Pro 10.24 or later

 1. Add the widget to your project.
 2. Place the widget inside a Data Grid 2 **Custom Content** column.
 3. Set the widget's **Type** to **Observer**.
 4. Choose how the observer should open or close a row:
     - **Trigger** — the row opens/closes when another Accordion widget (set to Trigger mode) activates it.
     - **On row select** — the row opens/closes based on the Data Grid 2 row selection.
       (Note: Data Grid 2 **Selection** must be set to **Single** or **Multi**.)
 5. **If using Trigger mode:**
    Add a second Accordion widget (set to Trigger) to another **Custom Content** column within the same Data Grid 2. This widget will act as the button/link/custom trigger for toggling the row state.

## Issues, suggestions and feature requests
Please report any issues to [Mendix-DataGridTwoAccordion/issues](https://github.com/Carter-Moorse/Mendix-DataGridTwoAccordion/issues)

## Development and contribution

1. Install NPM package dependencies by using: `npm install`. If you use NPM v7.x.x, which can be checked by executing `npm -v`, execute: `npm install --legacy-peer-deps`.
1. Run `npm start` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.
