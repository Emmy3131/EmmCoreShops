
const STORAGE_KEY = "guestCart";

/* =========================================
   PRODUCT ID HELPER
========================================= */
const getProductId = (product) => {
  if (!product) return null;

  return String(
    product._id ||
    product.id ||
    product.product?._id ||
    product.product?.id ||
    ""
  );
};

/* =========================================
   GET CART
========================================= */
export const getGuestCart = () => {
  try {
    const cart = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    return Array.isArray(cart) ? cart : [];
  } catch (error) {
    console.error("Unable to load guest cart:", error);
    return [];
  }
};

/* =========================================
   SAVE CART
========================================= */
export const saveGuestCart = (cart) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));

    window.dispatchEvent(new Event("guest-cart-updated"));

    return true;
  } catch (error) {
    console.error("Unable to save guest cart:", error);
    return false;
  }
};

/* =========================================
   ADD ITEM
========================================= */
export const addGuestItem = (product, quantity = 1) => {
  if (!product || !getProductId(product)) {
    console.error("Cannot add product without a valid ID.");
    return false;
  }

  const amount = Math.max(1, Number(quantity) || 1);
  const cart = getGuestCart();

  const productId = getProductId(product);

  const existing = cart.find(
    (item) => getProductId(item.product) === productId
  );

  if (existing) {
    existing.quantity =
      (Number(existing.quantity) || 0) + amount;
  } else {
    cart.push({
      product,
      quantity: amount,
    });
  }

  return saveGuestCart(cart);
};

/* =========================================
   REMOVE ITEM
========================================= */
export const removeGuestItem = (productId) => {
  const cart = getGuestCart().filter(
    (item) => getProductId(item.product) !== String(productId)
  );

  return saveGuestCart(cart);
};

/* =========================================
   UPDATE QUANTITY
========================================= */
export const updateGuestQuantity = (productId, quantity) => {
  const cart = getGuestCart();

  const item = cart.find(
    (item) => getProductId(item.product) === String(productId)
  );

  if (!item) return false;

  const newQuantity = Number(quantity);

  if (!Number.isFinite(newQuantity) || newQuantity <= 0) {
    return removeGuestItem(productId);
  }

  item.quantity = Math.floor(newQuantity);

  return saveGuestCart(cart);
};

/* =========================================
   CLEAR CART
========================================= */
export const clearGuestCart = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);

    window.dispatchEvent(new Event("guest-cart-updated"));

    return true;
  } catch (error) {
    console.error("Unable to clear guest cart:", error);
    return false;
  }
};

/* =========================================
   TOTAL ITEMS
========================================= */
export const getGuestCartCount = () => {
  return getGuestCart().reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0
  );
};

/* =========================================
   TOTAL PRICE
========================================= */
export const getGuestCartTotal = () => {
  return getGuestCart().reduce((sum, item) => {
    const price = Number(item.product?.price) || 0;
    const quantity = Number(item.quantity) || 0;

    return sum + price * quantity;
  }, 0);
};

/* =========================================
   GET CART ITEMS
========================================= */
export const getGuestCartItems = () => {
  return getGuestCart();
};
