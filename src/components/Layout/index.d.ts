import {ReactType} from "react";

export interface route {
    path: string;
    PageComponent: ReactType | React.ReactNode | React.Component | string;
    redirect?: string;
    exact?: boolean;
}

export type TypedComponentType = typeof TypedComponent;
