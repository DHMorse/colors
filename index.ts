/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

// Define color mappings
const colorMap: Record<string, string> = {
    "red": "#ff0000",
    "green": "#00ff00",
    "blue": "#0000ff",
    "yellow": "#ffff00",
    "purple": "#800080",
    "orange": "#ffa500",
    "pink": "#ffc0cb",
    "brown": "#a52a2a",
    "black": "#000000",
    "white": "#ffffff",
    "gray": "#808080",
    "grey": "#808080",
    "cyan": "#00ffff",
    "magenta": "#ff00ff",
    "lime": "#00ff00",
    "maroon": "#800000",
    "navy": "#000080",
    "olive": "#808000",
    "teal": "#008080",
    "silver": "#c0c0c0",
    "gold": "#ffd700",
    "violet": "#ee82ee",
    "indigo": "#4b0082",
    "coral": "#ff7f50",
    "turquoise": "#40e0d0",
    "beige": "#f5f5dc",
    "lavender": "#e6e6fa",
    "salmon": "#fa8072",
    "khaki": "#f0e68c",
    "plum": "#dda0dd",
    "azure": "#f0ffff",
    "mint": "#98ff98",
    "ivory": "#fffff0",
    "tan": "#d2b48c",
    "chocolate": "#d2691e",
    "crimson": "#dc143c",
    "fuchsia": "#ff00ff",
    "honeydew": "#f0fff0",
    "orchid": "#da70d6",
    "sienna": "#a0522d",
    "thistle": "#d8bfd8",
    "wheat": "#f5deb3",
    "bisque": "#ffe4c4",
    "darkblue": "#00008b",
    "darkcyan": "#008b8b",
    "darkgoldenrod": "#b8860b",
    "darkgray": "#a9a9a9",
    "darkgreen": "#006400",
    "darkgrey": "#a9a9a9",
    "darkkhaki": "#bdb76b",
    "darkmagenta": "#8b008b",
    "darkolivegreen": "#556b2f",
    "darkorange": "#ff8c00",
    "darkorchid": "#9932cc",
    "darkred": "#8b0000",
    "darksalmon": "#e9967a",
    "darkseagreen": "#8fbc8f",
    "darkslateblue": "#483d8b",
    "darkslategray": "#2f4f4f",
    "darkslategrey": "#2f4f4f",
    "darkturquoise": "#00ced1",
    "darkviolet": "#9400d3",
    "deeppink": "#ff1493",
    "deepskyblue": "#00bfff",
    "dimgray": "#696969",
    "dimgrey": "#696969",
    "dodgerblue": "#1e90ff",
    "firebrick": "#b22222",
    "floralwhite": "#fffaf0",
    "forestgreen": "#228b22",
    "gainsboro": "#dcdcdc",
    "ghostwhite": "#f8f8ff",
    "goldenrod": "#daa520",
    "greenyellow": "#adff2f",
    "hotpink": "#ff69b4",
    "indianred": "#cd5c5c",
    "lightblue": "#add8e6",
    "lightcoral": "#f08080",
    "lightcyan": "#e0ffff",
    "lightgoldenrodyellow": "#fafad2",
    "lightgray": "#d3d3d3",
    "lightgreen": "#90ee90",
    "lightgrey": "#d3d3d3",
    "lightpink": "#ffb6c1",
    "lightsalmon": "#ffa07a",
    "lightseagreen": "#20b2aa",
    "lightskyblue": "#87cefa",
    "lightslategray": "#778899",
    "lightslategrey": "#778899",
    "lightsteelblue": "#b0c4de",
    "lightyellow": "#ffffe0",
    "limegreen": "#32cd32",
    "linen": "#faf0e6",
    "mediumaquamarine": "#66cdaa",
    "mediumblue": "#0000cd",
    "mediumorchid": "#ba55d3",
    "mediumpurple": "#9370db",
    "mediumseagreen": "#3cb371",
    "mediumslateblue": "#7b68ee",
    "mediumspringgreen": "#00fa9a",
    "mediumturquoise": "#48d1cc",
    "mediumvioletred": "#c71585",
    "midnightblue": "#191970",
    "mintcream": "#f5fffa",
    "mistyrose": "#ffe4e1",
    "moccasin": "#ffe4b5",
    "navajowhite": "#ffdead",
    "oldlace": "#fdf5e6",
    "olivedrab": "#6b8e23",
    "orangered": "#ff4500",
    "palegoldenrod": "#eee8aa",
    "palegreen": "#98fb98",
    "paleturquoise": "#afeeee",
    "palevioletred": "#db7093",
    "papayawhip": "#ffefd5",
    "peachpuff": "#ffdab9",
    "peru": "#cd853f",
    "rosybrown": "#bc8f8f",
    "royalblue": "#4169e1",
    "saddlebrown": "#8b4513",
    "sandybrown": "#f4a460",
    "seagreen": "#2e8b57",
    "seashell": "#fff5ee",
    "skyblue": "#87ceeb",
    "slateblue": "#6a5acd",
    "slategray": "#708090",
    "slategrey": "#708090",
    "snow": "#fffafa",
    "springgreen": "#00ff7f",
    "steelblue": "#4682b4",
    "tomato": "#ff6347",
    "violetred": "#d02090",
    "whitesmoke": "#f5f5f5",
    "yellowgreen": "#9acd32"
};

// Create CSS for all color classes
const style = document.createElement("style");
let styleContent = `
/* Target Discord's message content directly */
.markup__75297 span:not([class^="vc-color-"]) {
    color: inherit;
}
`;

// Add CSS for each color
Object.entries(colorMap).forEach(([color, hex]) => {
    styleContent += `
.vc-color-${color} {
    color: ${hex} !important;
    font-weight: bold;
}
`;
});

style.textContent = styleContent;

export default definePlugin({
    name: "ColorWords",
    description: "Colors words based on their color names",
    authors: [Devs.Ven],

    start() {
        // Add the CSS to the document
        document.head.appendChild(style);

        // Set up the observer to watch for new messages
        this.setupObserver();

        // Process existing messages
        this.processExistingMessages();
    },

    stop() {
        // Remove the CSS from the document
        style.remove();

        // Disconnect the observer if it exists
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }

        // Revert changes to existing messages
        this.revertChanges();
    },

    observer: null as MutationObserver | null,

    setupObserver() {
        // Create a MutationObserver to watch for changes to the DOM
        const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                if (mutation.type === "childList") {
                    // Check for new message content elements
                    const messageContents = document.querySelectorAll(".markup__75297.messageContent_c19a55:not(.vc-color-processed)");

                    for (const messageContent of messageContents) {
                        this.processMessageContent(messageContent as HTMLElement);
                    }
                }
            }
        });

        // Start observing the document
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Store the observer so we can disconnect it later
        this.observer = observer;
    },

    processExistingMessages() {
        // Find all message content elements
        const messageContents = document.querySelectorAll(".markup__75297.messageContent_c19a55:not(.vc-color-processed)");

        for (const messageContent of messageContents) {
            this.processMessageContent(messageContent as HTMLElement);
        }
    },

    processMessageContent(element: HTMLElement) {
        // Mark this element as processed to avoid processing it again
        element.classList.add("vc-color-processed");

        // Get the HTML content
        const html = element.innerHTML;

        // Create a regex pattern for all color words
        const colorPattern = new RegExp(`\\b(${Object.keys(colorMap).join("|")})\\b`, "gi");

        // Replace instances of color words with styled spans
        const newHtml = html.replace(colorPattern, match => {
            const color = match.toLowerCase();
            return `<span class="vc-color-${color}">${match}</span>`;
        });

        // Only update if there was a change
        if (newHtml !== html) {
            element.innerHTML = newHtml;
        }
    },

    revertChanges() {
        // Find all processed message content elements
        const processedElements = document.querySelectorAll(".vc-color-processed");

        for (const element of processedElements) {
            // Remove the processed class
            element.classList.remove("vc-color-processed");

            // Find all color spans
            const colorSpans = element.querySelectorAll("[class^='vc-color-']");

            // Replace each span with its text content
            for (const span of colorSpans) {
                const text = span.textContent || "";
                const textNode = document.createTextNode(text);
                span.parentNode?.replaceChild(textNode, span);
            }
        }
    },

    // Patch the message content renderer to ensure we catch all messages
    patches: [
        {
            find: "#{intl::MESSAGE_EDITED}",
            replacement: {
                match: /(\)\("div",\{id:.+?children:\[)/,
                replace: "$1$self.patchMessageContent(arguments[0]),"
            }
        }
    ],

    // Function to ensure we process message content after it's rendered
    patchMessageContent(props: any) {
        if (!props || !props.message) return null;

        // Use setTimeout to ensure the message is rendered before we process it
        setTimeout(() => {
            const messageId = props.message.id;
            if (!messageId) return;

            const messageContent = document.querySelector(`#message-content-${messageId}`);
            if (messageContent && !messageContent.classList.contains("vc-color-processed")) {
                this.processMessageContent(messageContent as HTMLElement);
            }
        }, 0);

        return null;
    }
});
