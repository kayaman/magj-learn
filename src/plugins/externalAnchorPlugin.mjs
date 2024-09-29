import { visit } from 'unist-util-visit';

const site = "https://learning.magj.dev";

export default function externalAnchorPlugin() {
    return function (tree, file) {
        visit(tree, 'link', (node) => {
            if (/^(https?):\/\/[^\s/$.?#].[^\s]*$/i.test(node.url) && !node.url.includes(site)) {
                node.data ??= {};
                node.data.hProperties ??= {};
                node.data.hProperties.target = '_blank';
            }
        });
    }
}