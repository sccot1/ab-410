import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as cn } from "./router-BQQnFXN4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-NTxGHNCN.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ className, tone = "muted", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide", {
			muted: "bg-elevated text-muted border-border",
			accent: "bg-accent/15 text-accent border-accent/20",
			ok: "bg-ok/12 text-ok border-ok/20",
			warn: "bg-warn/12 text-warn border-warn/20",
			danger: "bg-danger/12 text-danger border-danger/20"
		}[tone], className),
		...props
	});
}
//#endregion
export { Badge as t };
