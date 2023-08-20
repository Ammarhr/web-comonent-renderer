import { createElement, useEffect } from "react";

export function HelloWorldSample({
    webComponentsAttributes,
    webComponentTag,
    webComponentsList,
    listAttribute1,
    listAttribute2,
    ListName
}) {
    useEffect(() => {
        if (webComponentsList) {
            if (webComponentsList.status === "available") {
                console.info(webComponentsList, "webComponentsList", ListName, "ListName");
                const sortInstrs = [[listAttribute1.id, "asc"]];
                webComponentsList.setSortOrder(sortInstrs);
                const attributeListValues = webComponentsList.items.map(item => {
                    const dateValue = { list1: listAttribute1.get(item).value, list2: listAttribute2.get(item).value };
                    return dateValue;
                });
                console.info(attributeListValues, "attributeListValues");
            }
        }
    }, [webComponentsAttributes, webComponentTag, webComponentsList, webComponentsList?.status]);
    if (webComponentsAttributes && webComponentsAttributes[0]) {
        if (webComponentsAttributes[0].attributeValue.status !== "loading") {
            const attributes = {};
            const attributesProps = webComponentsAttributes;
            for (let index = 0; index < attributesProps.length; index++) {
                console.info(attributesProps[index], "attributesProps[index]");
                const attr = attributesProps[index];
                attributes[attr.atrributeName] = attr.attributeValue.displayValue;
            }
            let Component = createElement(webComponentTag, {
                ...attributes
            });
            // console.info(attributes, "attributes");
            return Component;
        } else {
            return createElement("div", null);
        }
    } else {
        return createElement("div", null);
    }
}
