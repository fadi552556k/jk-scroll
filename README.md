# JK Scroll for Obsidian

A lightweight Obsidian plugin that enables smooth, continuous vim-style **J** (down) and **K** (up) scrolling in **Reading View**. 

Designed to let you read long notes effortlessly without constantly tapping arrow keys or reaching for a mouse.

## Features

- **Smooth Continuous Scrolling:** Hold down `J` to scroll down or `K` to scroll up at a smooth, customizable velocity.
- **Reading View Integration:** Works exclusively within Reading View (`preview` mode) so it never interferes with typing or editing notes.
- **Smart Focus Detection:** Automatically disables itself when you are typing in inputs, textareas, or active code blocks.
- **Resource Efficient:** Built with `requestAnimationFrame` and delta-time calculations for silky-smooth performance without layout thrashing.

---

## Installation

### Manual Installation
1. Download the latest `main.js`, `manifest.json`, and `styles.css` (if applicable) from the [Releases page](../../releases).
2. Create a new folder named `jk-scroll` inside your vault's plugins directory: `<Your-Vault>/.obsidian/plugins/jk-scroll/`.
3. Place the downloaded files into that folder.
4. Open Obsidian, go to **Settings > Community plugins**, and enable **JK Scroll**.

---

## Usage

1. Open any note in **Reading View** (Preview mode).
2. Press and hold **`J`** to scroll down continuously.
3. Press and hold **`K`** to scroll up continuously.
4. Release the key to stop scrolling instantly.

---

## Customization

You can adjust the scrolling velocity directly in `main.js` by modifying the `SPEED` constant at the top of the file:

```javascript
const SPEED = 700; // pixels per second, tweak to taste
