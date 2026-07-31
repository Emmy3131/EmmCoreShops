const STORAGE_KEY = "guestCart";

/* =========================================
   GET CART
========================================= */
export const getGuestCart = () => {
  try {
    const cart = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
};

/* =========================================
   SAVE CART
========================================= */
export const saveGuestCart = (cart) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));

  window.dispatchEvent(new Event("guest-cart-updated"));
};

/* =========================================
   ADD ITEM
========================================= */
export const addGuestItem = (product, quantity = 1) => {
  const cart = getGuestCart();

  const existing = cart.find(
    (item) => item.product._id === product._id
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      product,
      quantity,
    });
  }

  saveGuestCart(cart);
};

/* =========================================
   REMOVE ITEM
========================================= */
export const removeGuestItem = (productId) => {
  const cart = getGuestCart().filter(
    (item) => item.product._id !== productId
  );

  saveGuestCart(cart);
};

/* =========================================
   UPDATE QUANTITY
========================================= */
export const updateGuestQuantity = (
  productId,
  quantity
) => {
  const cart = getGuestCart();

  const item = cart.find(
    (i) => i.product._id === productId
  );

  if (!item) return;

  item.quantity = quantity;

  if (item.quantity <= 0) {
    removeGuestItem(productId);
    return;
  }

  saveGuestCart(cart);
};

/* =========================================
   CLEAR CART
========================================= */
export const clearGuestCart = () => {
  localStorage.removeItem(STORAGE_KEY);

  window.dispatchEvent(new Event("guest-cart-updated"));
};

/* =========================================
   TOTAL ITEMS
========================================= */
export const getGuestCartCount = () => {
  return getGuestCart().reduce(
    (sum, item) => sum + item.quantity,
    0
  );
};

/* =========================================
   TOTAL PRICE
========================================= */
export const getGuestCartTotal = () => {
  return getGuestCart().reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0
  );
};