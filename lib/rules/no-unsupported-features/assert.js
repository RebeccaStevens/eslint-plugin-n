/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { CALL, READ } = require("eslint-utils")
const defineUnsupportedModuleHandlers = require("../../util/define-unsupported-module-handlers")
const enumeratePropertyNames = require("../../util/enumerate-property-names")

const trackMap = {
    modules: {
        assert: {
            strict: {
                [READ]: { supported: "9.9.0" },
                doesNotReject: { [CALL]: { supported: "10.0.0" } },
                rejects: { [CALL]: { supported: "10.0.0" } },
            },
            deepStrictEqual: { [CALL]: { supported: "4.0.0" } },
            doesNotReject: { [CALL]: { supported: "10.0.0" } },
            notDeepStrictEqual: { [CALL]: { supported: "4.0.0" } },
            rejects: { [CALL]: { supported: "10.0.0" } },
        },
    },
}

module.exports = {
    meta: {
        docs: {
            description:
                "disallow unsupported `assert` APIs on the specified version",
            category: "Possible Errors",
            recommended: true,
            url:
                "https://github.com/mysticatea/eslint-plugin-node/blob/v6.0.1/docs/rules/no-unsupported-features/assert.md",
        },
        fixable: null,
        schema: [
            {
                type: "object",
                properties: {
                    version: {
                        type: "string",
                    },
                    ignores: {
                        type: "array",
                        items: {
                            enum: Array.from(
                                enumeratePropertyNames(trackMap.modules)
                            ),
                        },
                        uniqueItems: true,
                    },
                },
                additionalProperties: false,
            },
        ],
        messages: {
            unsupported:
                "The '{{name}}' is not supported until Node.js {{supported}}. The configured version range is '{{version}}'.",
        },
    },
    create(context) {
        return defineUnsupportedModuleHandlers(context, trackMap)
    },
}