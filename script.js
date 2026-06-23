/* ===========================================================
   Lab list — add a new lab by adding one entry here.
   `file` is the path to the PDF, relative to index.html.
   =========================================================== */

const labs = [
  { title: "Fortinet VPN Lab", file: "assets/pdfs/fortinet-vpn-lab.pdf" },
  { title: "Fortinet Firewall AP Lab", file: "assets/pdfs/fortinet-firewall-ap-lab.pdf" },
  { title: "Fortinet SOHO Configuration Lab", file: "assets/pdfs/fortinet-soho-configuration-lab.pdf" },
  { title: "Palo Alto VPN Lab", file: "assets/pdfs/paloalto-vpn-lab.pdf" },
  { title: "URL Filtering Lab", file: "assets/pdfs/url-filtering-lab.pdf" },
  { title: "Palo Alto SOHO Configuration Lab", file: "assets/pdfs/paloalto-soho-configuration-lab.pdf" },
  { title: "Palo Alto PA-220 Initial Wipe / Password Reset Lab", file: "assets/pdfs/paloalto-pa220-initial-wipe-password-reset-lab.pdf" }
];

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

const grid = document.getElementById("lab-grid");
const overlay = document.getElementById("viewer-overlay");
const viewerFrame = document.getElementById("viewer-frame");
const viewerTitle = document.getElementById("viewer-title");
const viewerNewTab = document.getElementById("viewer-new-tab");
const closeBtn = document.getElementById("viewer-close");

function openViewer(lab) {
  viewerTitle.textContent = lab.title;
  viewerFrame.src = lab.file;
  viewerNewTab.href = lab.file;
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  closeBtn.focus();
}

function closeViewer() {
  overlay.classList.remove("open");
  viewerFrame.src = "";
  document.body.style.overflow = "";
}

closeBtn.addEventListener("click", closeViewer);

overlay.addEventListener("click", function (e) {
  if (e.target === overlay) closeViewer();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && overlay.classList.contains("open")) closeViewer();
});

labs.forEach(function (lab, index) {
  const card = document.createElement("button");
  card.className = "lab-card";
  card.setAttribute("type", "button");
  card.setAttribute("aria-label", "View " + lab.title);

  const thumbFrame = document.createElement("div");
  thumbFrame.className = "thumb-frame";
  thumbFrame.id = "thumb-" + index;
  thumbFrame.innerHTML = '<span class="thumb-loading">Loading preview…</span>';

  const labelWrap = document.createElement("div");
  labelWrap.className = "card-label";
  labelWrap.innerHTML =
    "<h3>" + lab.title + "</h3>" + (lab.date ? "<span>" + lab.date + "</span>" : "");

  card.appendChild(thumbFrame);
  card.appendChild(labelWrap);
  card.addEventListener("click", function () { openViewer(lab); });
  grid.appendChild(card);

  renderThumbnail(lab.file, thumbFrame);
});

function renderThumbnail(fileUrl, container) {
  pdfjsLib.getDocument(fileUrl).promise
    .then(function (pdf) { return pdf.getPage(1); })
    .then(function (page) {
      const targetWidth = container.clientWidth || 220;
      const baseViewport = page.getViewport({ scale: 1 });
      const scale = targetWidth / baseViewport.width;
      const viewport = page.getViewport({ scale: scale });

      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d");

      return page.render({ canvasContext: ctx, viewport: viewport }).promise
        .then(function () {
          container.innerHTML = "";
          container.appendChild(canvas);
        });
    })
    .catch(function (err) {
      container.innerHTML = '<span class="thumb-loading">Preview unavailable</span>';
      console.error("Thumbnail render failed for " + fileUrl, err);
    });
}
