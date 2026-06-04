/* ----------------------------------------------------------------------------
 * LoudBar site configuration
 * ----------------------------------------------------------------------------
 * Set your Polar.sh checkout link below. This is the ONLY place you need to
 * change it — every "Buy" button on the site reads from here.
 *
 * HOW TO GET THIS LINK:
 *   1. In your Polar dashboard, open your LoudBar Product.
 *   2. Make sure the product has a "File Download" benefit attached with the
 *      LoudBar .dmg uploaded (this is what gates the download behind payment).
 *   3. Create / copy the product's Checkout Link.
 *   4. IMPORTANT: set the checkout's "Success URL" to:
 *          https://loudbar.xyz/thanks.html
 *      so buyers land on the thank-you page after paying.
 *   5. Paste the checkout link as checkoutUrl below.
 *
 * Example: "https://buy.polar.sh/polar_cl_xxxxxxxxxxxxxxxx"
 * -------------------------------------------------------------------------- */
window.LOUDBAR_CONFIG = {
  // Paste your Polar checkout link here:
  checkoutUrl: "https://buy.polar.sh/polar_cl_1GBD2dAHUA41mP5IJmCfTobE71YyJDD7Ka2sV2Y0gWr",

  // Polar customer portal (buyers use this to re-download later). Optional —
  // shown on the thank-you page if set. Usually: https://polar.sh/<org>/portal
  portalUrl: ""
};
