import React, {ReactPropTypes} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loading from '@/components/Loading';
import {route, TypedComponentType} from './index.d';

export default function Layout(props: {routes: Array<route>}) {
    const { routes } = props;

    return (
        <Routes>
            {
                routes.map((route:route) => {
                    const { path = '', PageComponent, exact = true, redirect } = route;

                    if (redirect) {
                        return <Navigate replace={true} to={redirect} />;
                    }

                    const Component = PageComponent && (
                        typeof PageComponent === 'string'
                            ? <React.Suspense fallback={<Loading />}>
                                {
                                    React.lazy(
                                        () => import(`@/page/${PageComponent}`) 
                                    ) as TypedComponentType
                                }
                            </React.Suspense>
                            : PageComponent
                    );

                    const MyRender = ((props: ReactPropTypes) => <PageComponent {...props} />) as any;

                    return (
                        <Route {...props} path={path} element={<MyRender />} />
                    );

                })
            }
        </Routes>
    );
}