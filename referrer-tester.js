document.getElementById("current-url").textContent = location.href;

const buildBtn = document.getElementById("build-crafted");
if (buildBtn) {
  buildBtn.addEventListener("click", () => {
    const pathPayload = document.getElementById("path-payload").value;
    const queryPayload = document.getElementById("query-payload").value;
    const base = location.origin + location.pathname.replace(/index\.html$/, "");
    let crafted = base.replace(/\/$/, "") + "/" + pathPayload;
    if (queryPayload) crafted += "?" + queryPayload;
    document.getElementById("crafted-url").textContent = crafted;
  });
}

document.getElementById("generate").addEventListener("click", () => {
  const output = document.getElementById("output");
  output.innerHTML = "";

  let raw = document.getElementById("target-url").value.trim();
  if (!raw) return;
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(raw)) raw = "https://" + raw;

  let url;
  try {
    url = new URL(raw);
  } catch {
    output.textContent = "Invalid target URL.";
    return;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    output.textContent = "Only http/https targets allowed.";
    return;
  }

  const policy = document.getElementById("policy").value;
  const a = document.createElement("a");
  a.href = url.href;
  a.textContent = "Navigate to target \u2192 " + url.href;
  a.target = "_blank";
  a.rel = policy === "no-referrer" ? "noopener noreferrer" : "noopener";
  a.referrerPolicy = policy;
  output.appendChild(a);
});
