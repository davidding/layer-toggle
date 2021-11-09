(function() {
  const STORAGE_KEY = "layer-enabled-0301314611"; // must be unique to extension and match background.js
  const LAYER_ID = "layer-toggle-9694466260"; // must be unique to extension
  const LAYER_CSS = `position: fixed !important;
    inset: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
    z-index: 2147483647 !important;
    transform: none !important;
    pointer-events: none;
    border: 0.25rem solid green;
    color: green;
  `;

  /**
   * @returns {HTMLElement}
   */
  const createLayer = () => {
    const layer = document.createElement("div");
    layer.id = LAYER_ID;
    layer.style.cssText = LAYER_CSS;
    layer.innerHTML = "<h2 style=\"display: inline-block; margin: 1rem; background: white;\">Layer Added</h2>"
    return layer;
  };

  /**
   * @returns {HTMLElement}
   */
  const getLayer = () => {
    return document.getElementById(LAYER_ID) || createLayer();
  }

  /**
   *
   * @param {HTMLElement} layer
   * @returns {boolean}
   */
  const isLayerActive = (layer) => {
    return document.body.contains(layer);
  };

  /**
   * @param {HTMLElement} layer
   * @param {boolean=} active
   * @returns {void}
   */
  const toggleLayer = (layer, active) => {
    const currentlyActive = isLayerActive(layer);

    let shouldActivateLayer = !currentlyActive;

    if (typeof active === "boolean") {
      shouldActivateLayer = active;
    }

    if (shouldActivateLayer === currentlyActive) return;

    if (shouldActivateLayer) {
      document.body.append(layer);
    } else {
      layer.remove();
    }
  };

  chrome.storage.local.get(STORAGE_KEY, (result) => {
    const layer = getLayer();
    toggleLayer(layer, result[STORAGE_KEY]);
  });
}());
