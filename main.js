const { Plugin, MarkdownView } = require("obsidian");

const SPEED = 700; // pixels per second, tweak to taste

module.exports = class JKScroll extends Plugin {
    onload() {
        this.direction = 0;   // -1 = up, 1 = down, 0 = idle
        this.scroller = null;
        this.rafId = null;
        this.lastTime = 0;

        this.registerDomEvent(document, "keydown", (event) => {
            if (event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) return;
            if (event.key !== "j" && event.key !== "k") return;

            // don't interfere with typing/editing
            const active = document.activeElement;
            if (
                active &&
                (active.tagName === "INPUT" ||
                 active.tagName === "TEXTAREA" ||
                 active.isContentEditable)
            ) return;

            // only in the active note, and only in Reading View
            const view = this.app.workspace.getActiveViewOfType(MarkdownView);
            if (!view || view.getMode() !== "preview") return;

            const scroller = view.containerEl.querySelector(".markdown-preview-view");
            if (!scroller) return;

            event.preventDefault();

            // ignore OS key-repeat; the loop is already running
            if (event.repeat) return;

            this.scroller = scroller;
            this.direction = event.key === "j" ? 1 : -1;
            this.start();
        });

        this.registerDomEvent(document, "keyup", (event) => {
            if (event.key === "j" || event.key === "k") this.stop();
        });

        // stop if the window loses focus while a key is held
        this.registerDomEvent(window, "blur", () => this.stop());
    }

    start() {
        if (this.rafId !== null) return;
        this.lastTime = performance.now();

        const step = (now) => {
            const dt = (now - this.lastTime) / 1000;
            this.lastTime = now;

            if (this.scroller && this.direction !== 0) {
                this.scroller.scrollTop += this.direction * SPEED * dt;
                this.rafId = requestAnimationFrame(step);
            } else {
                this.rafId = null;
            }
        };

        this.rafId = requestAnimationFrame(step);
    }

    stop() {
        this.direction = 0;
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }

    onunload() {
        this.stop();
    }
};
