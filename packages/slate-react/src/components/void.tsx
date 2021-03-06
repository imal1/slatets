import Debug from "debug";
import React from "react";
import SlateTypes from "@zykj/slate-prop-types";
import Types from "prop-types";

import Text from "./text";

/**
 * Debug.
 *
 * @type {Function}
 */

const debug = Debug("slate:void");

/**
 * Void.
 *
 * @type {Component}
 */

class Void extends React.Component<any, any> {
    /**
     * Property types.
     *
     * @type {Object}
     */

    static propTypes = {
        block: SlateTypes.block,
        children: Types.any.isRequired,
        editor: Types.object.isRequired,
        node: SlateTypes.node.isRequired,
        parent: SlateTypes.node.isRequired,
        readOnly: Types.bool.isRequired
    };

    /**
     * Debug.
     *
     * @param {String} message
     * @param {Mixed} ...args
     */

    debug = (message, ...args) => {
        const { node } = this.props;
        const { key, type } = node;
        const id = `${key} (${type})`;
        debug(message, `${id}`, ...args);
    };

    /**
     * Render.
     *
     * @return {Element}
     */

    render() {
        const { props } = this;
        const { children, node, readOnly } = props;
        const Tag = node.object == "block" ? "div" : "span";
        const style: any = {
            height: "0",
            color: "transparent",
            outline: "none",
            position: "absolute"
        };

        const spacer = (
            <Tag data-slate-spacer style={style}>
                {this.renderText()}
            </Tag>
        );

        const content = (
            <Tag contentEditable={readOnly ? void 0 : false}>{children}</Tag>
        );

        this.debug("render", { props });

        return (
            <Tag
                data-slate-void
                data-key={node.key}
                contentEditable={
                    readOnly || node.object == "block" ? void 0 : false
                }
            >
                {readOnly ? null : spacer}
                {content}
            </Tag>
        );
    }

    /**
     * Render the void node's text node, which will catch the cursor when it the
     * void node is navigated to with the arrow keys.
     *
     * Having this text node there means the browser continues to manage the
     * selection natively, so it keeps track of the right offset when moving
     * across the block.
     *
     * @return {Element}
     */

    renderText = () => {
        const { block, decorations, node, readOnly, editor } = this.props;
        const child = node.getFirstText();
        return (
            <Text
                block={node.object == "block" ? node : block}
                decorations={decorations}
                editor={editor}
                key={child.key}
                node={child}
                parent={node}
                readOnly={readOnly}
            />
        );
    };
}

/**
 * Export.
 *
 * @type {Component}
 */

export default Void;
