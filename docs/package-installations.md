# NPM Packages

## Components

### MUI and packages based on it
   
[MUI Installtion](https://mui.com/material-ui/getting-started/installation/)

```bash
yarn add @mui/material @emotion/react @emotion/styled
```

#### [MUI Icons](https://mui.com/material-ui/material-icons/) 

```bash
yarn add @mui/icons-material
```

#### [MUI Date Picker](https://mui.com/x/react-date-pickers/) 

```bash
yarn add @mui/x-date-pickers dayjs
```

Once done, refer [Setup your date library adapter](https://mui.com/x/react-date-pickers/getting-started/#setup-your-date-library-adapter)

```tsx
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App({ children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
  );
}
```

Sidenote - [Why you should choose Day.js instead of Moment.js?](https://medium.datadriveninvestor.com/https-medium-com-sabesan96-why-you-should-choose-day-js-instead-of-moment-js-9cf7bb274bbd)

#### [Material React Table](https://www.material-react-table.com/) 

```bash
yarn add material-react-table
```

NOTE: This library has the following packages as peer dependencies, it requires Material UI V5 packages as dependencies. Install all of them with

```bash
yarn add material-react-table @mui/material @mui/x-date-pickers @mui/icons-material @emotion/react @emotion/styled
```

## Forms & Form Validation
 
[react-hook-form](https://react-hook-form.com/get-started)

```bash
yarn add react-hook-form
```

[Validation resolvers](https://github.com/react-hook-form/resolvers) - used for form validation with react-hook-form

```bash
yarn add @hookform/resolvers
```

[yup](https://www.npmjs.com/package/yup)

```bash
yarn add yup
```

## API Integration

[axios](https://www.npmjs.com/package/axios)

```bash
yarn add axios
```

[TanStack Query](https://tanstack.com/query/latest)

```bash
yarn add @tanstack/react-query
```

react query devtools 

```bash
yarn add -D  @tanstack/react-query-devtools
```

in the app.tsx, load it like this 

```tsx
{process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
```

## State Management

```bash
yarn add zustand
```

## Utils

### UUID

```bash
yarn add uuid
yarn add -D @types/uuid
```
