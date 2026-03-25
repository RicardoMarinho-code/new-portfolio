import type { AppLoadContext, EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import * as isbotModule from "isbot";
import * as ReactDOMServer from "react-dom/server";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext
) {
  let body;

  if (typeof ReactDOMServer.renderToReadableStream === "function") {
    body = await ReactDOMServer.renderToReadableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        signal: request.signal,
        onError(error: unknown) {
          // Log streaming rendering errors from inside the shell
          console.error(error);
          responseStatusCode = 500;
        },
      }
    );

    if (isBotRequest(request.headers.get("user-agent"))) {
      await body.allReady;
    }
  } else {
    // Fallback for Node.js environments (like Vercel or local Node server)
    // where renderToReadableStream is not available in react-dom/server.
    const html = ReactDOMServer.renderToString(
      <RemixServer context={remixContext} url={request.url} />
    );
    // React 18's renderToString does not automatically prepend the doctype
    body = "<!DOCTYPE html>" + html;
  }

  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}

// We have some Remix apps in the wild already running with isbot@3 so we need
// to maintain backwards compatibility even though we want new apps to use
// isbot@4.  That way, we can ship this as a minor Semver update to @remix-run/dev.
function isBotRequest(userAgent: string | null) {
  if (!userAgent) {
    return false;
  }

  // isbot >= 3.8.0, >4
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }

  // isbot < 3.8.0
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }

  return false;
}
