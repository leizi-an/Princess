 import {Routes, Route, Navigate} from 'react-router-dom';
 
 export default function SubRoutes(props) {
     const {routes} = props;
 
     return (
         <Routes>
             {
                 routes.map(route => {
                     const {match: {path}} = props;
                     const {path: subPath = '', component, exact = true, subRoutes = [], redirect, slot} = route;
 
                     const key = joinPath(path, subPath);
 
                     if (redirect) {
                         return <Redirect key={key} to={redirect} />;
                     }
 
                     const Component = component && (
                         typeof component === 'string'
                             ? loadable(
                                 () => import(
                                     `~/page/${component}`
                                 ),
                                 {fallback: <Loading />}
                             )
                             : component
                     );
 
                     if (subRoutes.length) {
                         const render = props => {
                             if (!Component) {
                                 return <SubRoutes {...props} routes={subRoutes} />;
                             }
 
                             if (slot) {
                                 return (
                                     <Component {...props} routeConfig={route}>
                                         <SubRoutes {...props} routes={subRoutes} />
                                     </Component>
                                 );
                             }
 
                             return [
                                 <Component {...props} key="parent" routeConfig={route} />,
                                 <SubRoutes {...props} key="children" routes={subRoutes} />
                             ];
                         };
 
                         return (
                             <Route
                                 {...props}
                                 exact={exact}
                                 key={key}
                                 path={key}
                                 render={render}
                             />
                         );
                     }
 
                     const render = props => <Component {...props} routeConfig={route} />;
 
                     return (
                         <Route {...props} exact={exact} key={key} path={key} render={render} />
                     );
 
                 })
             }
         </Routes>
     );
 }