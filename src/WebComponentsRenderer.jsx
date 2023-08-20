import { createElement } from "react";

import { HelloWorldSample } from "./components/HelloWorldSample";
import "./ui/WebComponentsRenderer.css";

export function WebComponentsRenderer({
    webComponentTag,
    webComponentsAttributes,
    webComponentsList,
    listAttribute1,
    listAttribute2,
    ListName
}) {
    return (
        <HelloWorldSample
            webComponentTag={webComponentTag}
            webComponentsAttributes={webComponentsAttributes}
            webComponentsList={webComponentsList}
            listAttribute1={listAttribute1}
            listAttribute2={listAttribute2}
            ListName={ListName}
        />
    );
}
