import {
  useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState,
} from 'react';
import { getConfig } from '@edx/frontend-platform';
import { PLUGIN_MOUNTED, PLUGIN_READY, PLUGIN_UNMOUNTED } from './constants';

export const usePluginSlot = (id) => {
  if (getConfig().plugins[id] !== undefined) {
    return getConfig().plugins[id];
  }
  return { keepDefault: true, plugins: [] };
};

export const useMessageEvent = (srcWindow, type, callback) => {
  useLayoutEffect(() => {
    const listener = (event) => {
      // Filter messages to those from our source window.
      if (event.source === srcWindow) {
        if (event.data.type === type) {
          callback({ type, payload: event.data.payload });
        }
      }
    };
    if (srcWindow !== null) {
      global.addEventListener('message', listener);
    }
    return () => {
      global.removeEventListener('message', listener);
    };
  }, [srcWindow, type, callback]);
};

export const useHostEvent = (type, callback) => {
  useMessageEvent(global.parent, type, callback);
};

export const usePluginEvent = (iframeElement, type, callback) => {
  const contentWindow = iframeElement ? iframeElement.contentWindow : null;
  useMessageEvent(contentWindow, type, callback);
};

export const dispatchMessageEvent = (targetWindow, message, targetOrigin) => {
  // Checking targetOrigin falsiness here since '', null or undefined would all be reasons not to
  // try to post a message to the origin.
  if (targetOrigin) {
    targetWindow.postMessage(message, targetOrigin);
  }
};

export const dispatchPluginEvent = (iframeElement, message, targetOrigin) => {
  dispatchMessageEvent(iframeElement.contentWindow, message, targetOrigin);
};

export const dispatchHostEvent = (message) => {
  dispatchMessageEvent(global.parent, message, global.document.referrer);
};

export const dispatchReadyEvent = () => {
  dispatchHostEvent({ type: PLUGIN_READY });
};

export const dispatchMountedEvent = () => {
  dispatchHostEvent({ type: PLUGIN_MOUNTED });
};

export const dispatchUnmountedEvent = () => {
  dispatchHostEvent({ type: PLUGIN_UNMOUNTED });
};

export const useElementSize = () => {
  const observerRef = useRef();

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [element, setElement] = useState(null);

  const measuredRef = useCallback(_element => {
    setElement(_element);
  }, []);

  useEffect(() => {
    observerRef.current = new ResizeObserver(() => {
      if (element) {
        setDimensions({
          width: element.clientWidth,
          height: element.clientHeight,
        });
        setOffset({
          x: element.offsetLeft,
          y: element.offsetTop,
        });
      }
    });
    if (element) {
      observerRef.current.observe(element);
    }
  }, [element]);

  return useMemo(
    () => ([measuredRef, element, dimensions.width, dimensions.height, offset.x, offset.y]),
    [measuredRef, element, dimensions, offset],
  );
};

export default {
  usePluginSlot,
  useMessageEvent,
  useHostEvent,
  usePluginEvent,
  dispatchMessageEvent,
  dispatchPluginEvent,
  dispatchHostEvent,
  dispatchReadyEvent,
  dispatchMountedEvent,
  dispatchUnmountedEvent,
  useElementSize,
};
