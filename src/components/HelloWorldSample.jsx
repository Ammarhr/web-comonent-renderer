import { createElement, useEffect, useState } from "react";

export function HelloWorldSample({
    webComponentsAttributes,
    webComponentTag,
    webComponentsList,
    listAttribute1,
    listAttribute2,
    ListName
}) {
    const [objectList, setObjectList] = useState([]);
    useEffect(() => {
        if (webComponentsList) {
            if (webComponentsList.status === "available") {
                const sortInstrs = [[listAttribute1.id, "asc"]];
                // webComponentsList.setSortOrder(sortInstrs);
                const attributeListValues = webComponentsList.items.map(item => {
                    console.info(item, "item");
                    const dateValue = { list1: listAttribute1.get(item).value, list2: listAttribute2.get(item).value };
                    return dateValue;
                });
                setObjectList(attributeListValues);
            }
        }
    }, [webComponentsAttributes, webComponentTag, webComponentsList, webComponentsList?.status]);
    if (webComponentsAttributes && webComponentsAttributes[0]) {
        if (webComponentsAttributes[0].attributeValue.status !== "loading") {
            const attributes = {};
            const attributesProps = webComponentsAttributes;
            for (let index = 0; index < attributesProps.length; index++) {
                const attr = attributesProps[index];
                attributes[attr.atrributeName] = attr.attributeValue.displayValue;
            }
            if (objectList && objectList.length) {
                attributes["list"] = JSON.stringify(objectList);
            }

            let Component = createElement(webComponentTag, {
                ...attributes
            });
            return Component;
        } else {
            return createElement("div", null);
        }
    } else {
        return createElement("div", null);
    }
}
