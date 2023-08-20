/**
 * @typedef Property
 * @type {object}
 * @property {string} key
 * @property {string} caption
 * @property {string} description
 * @property {string[]} objectHeaders
 * @property {ObjectProperties[]} objects
 * @property {Properties[]} properties
 */

/**
 * @typedef ObjectProperties
 * @type {object}
 * @property {PropertyGroup[]} properties
 * @property {string[]} captions
 */

/**
 * @typedef PropertyGroup
 * @type {object}
 * @property {string} caption
 * @property {PropertyGroup[]} propertyGroups
 * @property {Property[]} properties
 */

/**
 * @typedef Properties
 * @type {PropertyGroup}
 */

/**
 * @typedef Problem
 * @type {object}
 * @property {string} property
 * @property {("error" | "warning" | "deprecation")} severity
 * @property {string} message
 * @property {string} studioMessage
 * @property {string} url
 * @property {string} studioUrl
 */

/**
 * @param {object} values
 * @param {Properties} defaultProperties
 * @param {("web"|"desktop")} target
 * @returns {Properties}
 */


// /**
//  * @param {Object} values 
//  * @returns {Problem[]} returns a list of problems.
//  */
// export function check(values) {
//    /** @type {Problem[]} */
//    const errors = [];
//    // Add errors to the above array to throw errors in Studio and Studio Pro.
//    /* Example
//    if (values.myProperty !== "custom") {
//        errors.push({
//            property: `myProperty`,
//            message: `The value of 'myProperty' is different of 'custom'.`,
//            url: "https://github.com/myrepo/mywidget"
//        });
//    }
//    */
//    return errors;
// }

// /**
//  * @param {object} values 
//  * @param {boolean} isDarkMode 
//  * @param {number[]} version
//  * @returns {object}
//  */
// export function getPreview(values, isDarkMode, version) {
//     // Customize your pluggable widget appearance for Studio Pro.
//     return {
//         type: "Container",
//         children: []
//     };
// }

// /**
//  * @param {Object} values
//  * @param {("web"|"desktop")} platform
//  * @returns {string}
//  */
// export function getCustomCaption(values, platform) {
//     return "WebComponentsRenderer";
// }


export function getProperties(values, defaultProperties, target) {
    if (!values.doseItHasListAttribute) {
        hidePropertiesIn(defaultProperties, values, ["webComponentsList", "listAttribute2", "listAttribute1"]);
    }
    return defaultProperties;
}
function hidePropertiesIn(propertyGroups, _value, keys) {
    keys.forEach(key =>
        modifyProperty((_, index, container) => container.splice(index, 1), propertyGroups, key, undefined, undefined)
    );
}
function modifyProperty(modify, propertyGroups, key, nestedPropIndex, nestedPropKey) {
    propertyGroups.forEach(propGroup => {
        if (propGroup.propertyGroups) {
            modifyProperty(modify, propGroup.propertyGroups, key, nestedPropIndex, nestedPropKey);
        }
        propGroup.properties?.forEach((prop, index, array) => {
            if (prop.key === key) {
                if (nestedPropIndex === undefined || nestedPropKey === undefined) {
                    modify(prop, index, array);
                } else if (prop.objects) {
                    modifyProperty(modify, prop.objects[nestedPropIndex].properties, nestedPropKey);
                } else if (prop.properties) {
                    modifyProperty(modify, prop.properties[nestedPropIndex], nestedPropKey);
                }
            }
        });
    });
}