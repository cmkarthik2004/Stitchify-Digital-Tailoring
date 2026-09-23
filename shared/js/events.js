/**
 * events.js — Stitchify In-Page Event Bus
 * =========================================
 * A lightweight publish/subscribe messaging system for
 * decoupled communication between components on the same page.
 *
 * Uses the browser's native CustomEvent API — no dependencies.
 *
 * Usage:
 *   AppEvents.on('order:accepted', (data) => console.log(data));
 *   AppEvents.emit('order:accepted', { orderId: 'ord_a01' });
 *   AppEvents.off('order:accepted', myHandler);
 *   AppEvents.once('profile:loaded', (data) => ...);
 *
 * Suggested event names (use colon-namespaced strings):
 *   'order:accepted'        – tailor accepts a new order
 *   'order:rejected'        – tailor rejects an order
 *   'order:step-updated'    – progress step changed
 *   'profile:updated'       – tailor profile saved
 *   'availability:changed'  – tailor toggled availability
 *   'portfolio:item-added'  – new portfolio item added
 *   'portfolio:item-removed'– portfolio item removed
 *   'schedule:event-added'  – schedule event created
 *   'schedule:event-deleted'– schedule event removed
 *   'chat:message-sent'     – message sent in chat
 *   'chat:unread-updated'   – unread count changed
 *   'nav:search'            – global search query changed
 *   'auth:logout'           – user logged out
 *   'auth:login'            – user successfully logged in
 *   'auth:role-changed'     – user role updated
 */

const AppEvents = (() => {
  // ─── Internal listener registry ──────────────────────────
  // Map<eventName, Set<handler>>
  const _registry = new Map();

  // Dispatch target — window gives us a safe global scope
  const _target = window;

  // ─── emit ─────────────────────────────────────────────────

  /**
   * Emit a named event, optionally with a data payload.
   * All handlers registered with AppEvents.on() for this
   * event name will be called synchronously in order.
   *
   * @param {string} name    – Event name (e.g. 'order:accepted')
   * @param {any}    [data]  – Any serialisable payload
   *
   * @example
   *   AppEvents.emit('order:accepted', { orderId: 'ord_a01', customer: 'Priya' });
   */
  function emit(name, data = null) {
    if (!name || typeof name !== 'string') {
      console.warn('[AppEvents] emit() requires a non-empty string event name.');
      return;
    }

    const event = new CustomEvent(`stitchify:${name}`, {
      detail:  data,
      bubbles: false
    });

    _target.dispatchEvent(event);
  }

  // ─── on ───────────────────────────────────────────────────

  /**
   * Register a handler for a named event.
   * The handler receives the event's data payload as its
   * first (and only) argument.
   *
   * @param {string}   name      – Event name to listen for
   * @param {Function} handler   – Called with (data) when event fires
   *
   * @example
   *   function handleAccept(data) {
   *     console.log('Order accepted:', data.orderId);
   *   }
   *   AppEvents.on('order:accepted', handleAccept);
   */
  function on(name, handler) {
    if (!name || typeof name !== 'string') {
      console.warn('[AppEvents] on() requires a non-empty string event name.');
      return;
    }
    if (typeof handler !== 'function') {
      console.warn('[AppEvents] on() handler must be a function.');
      return;
    }

    // Wrap the handler so we receive .detail cleanly,
    // but store the original for off() matching.
    const wrapper = (e) => handler(e.detail);

    // Keep track of wrapper → original mapping per event
    if (!_registry.has(name)) {
      _registry.set(name, new Map());
    }
    _registry.get(name).set(handler, wrapper);

    _target.addEventListener(`stitchify:${name}`, wrapper);
  }

  // ─── off ──────────────────────────────────────────────────

  /**
   * Remove a previously registered handler.
   * Pass the same function reference you used with on().
   *
   * @param {string}   name    – Event name
   * @param {Function} handler – The original handler to remove
   *
   * @example
   *   AppEvents.off('order:accepted', handleAccept);
   */
  function off(name, handler) {
    if (!_registry.has(name)) return;

    const handlers = _registry.get(name);
    const wrapper  = handlers.get(handler);

    if (wrapper) {
      _target.removeEventListener(`stitchify:${name}`, wrapper);
      handlers.delete(handler);
    }

    if (handlers.size === 0) {
      _registry.delete(name);
    }
  }

  // ─── once ─────────────────────────────────────────────────

  /**
   * Register a handler that fires exactly once, then auto-removes.
   *
   * @param {string}   name    – Event name
   * @param {Function} handler – Called once with (data), then removed
   *
   * @example
   *   AppEvents.once('profile:loaded', (data) => {
   *     renderProfile(data);
   *   });
   */
  function once(name, handler) {
    function _onceWrapper(data) {
      handler(data);
      off(name, _onceWrapper);
    }
    on(name, _onceWrapper);
  }

  // ─── clear ────────────────────────────────────────────────

  /**
   * Remove ALL handlers for a given event name.
   * Useful for cleanup on page teardown.
   *
   * @param {string} name – Event name to clear
   */
  function clear(name) {
    if (!_registry.has(name)) return;

    const handlers = _registry.get(name);
    handlers.forEach((wrapper) => {
      _target.removeEventListener(`stitchify:${name}`, wrapper);
    });
    _registry.delete(name);
  }

  /**
   * Remove ALL registered handlers for ALL events.
   * Nuclear option — use sparingly.
   */
  function clearAll() {
    _registry.forEach((_, name) => clear(name));
  }

  /**
   * Debug helper: list all currently registered event names.
   * @returns {string[]}
   */
  function listEvents() {
    return Array.from(_registry.keys());
  }

  // ─── Expose ──────────────────────────────────────────────
  return {
    emit,
    on,
    off,
    once,
    clear,
    clearAll,
    listEvents
  };
})();
