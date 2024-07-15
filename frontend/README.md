# React Vite application

React + Vite template application

# Before installation:

## ShadCN

To remove _ShadCN_ component library remove:

- components.json
- src/components
- the relative dependency inside the package.json

## Routing

A simple React routing has been implemented. To create routes, see `src/routes.tsx`. Ignore the error inside `src/main.tsx` due to luck of routes inside the `src/routes.tsx` file.

⚠️ ⚠️ ⚠️ <br>
**_DO NOT USE `/` ROUTE INSIDE `src/routes.tsx` FILE, IT'S RESERVED FOR THE LAYOUT COMPONENT._** <br>
⚠️ ⚠️ ⚠️

## Layout

Inside `src/layout.tsx` you can find the `<Outlet />` React component. Replace `div` components with needed ones (e.g. _Navbar_, _Header_ _Footer_)

# Installation

```bash
# Install dependencies
npm install

# Run application
npm run dev
```
