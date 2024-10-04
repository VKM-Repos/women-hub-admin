import { useLocation } from 'react-router-dom';

const findRouteName = (routes: any, path: any): string => {
  for (let route of routes) {
    // Check if the path matches
    if (route.path === path) {
      return route.name;
    }

    // If the route has nested routes, search within them recursively
    if (route.routes) {
      const nestedName = findRouteName(route.routes, path);
      if (nestedName) {
        return nestedName;
      }
    }
  }

  return ''; // Return undefined if no match is found
};

const useRouteName = (routes: any) => {
  const location = useLocation();
  const routeName = findRouteName(routes, location.pathname);
  console.log(routeName);

  return routeName;
};

export default useRouteName;
