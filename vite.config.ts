import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
import * as path from "path";

export default defineConfig({
	plugins: [
		wasm()
	],
});
