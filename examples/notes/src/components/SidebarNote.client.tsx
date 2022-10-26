"use client";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createEffect, createSignal, Show, useTransition } from "solid-js";
import { A, useLocation } from "solid-start";

export default function SidebarNote(props) {
  const location = useLocation();
  const [isPending, startTransition] = useTransition();
  const [isExpanded, setIsExpanded] = createSignal(false);
  const isActive = () => `/notes/${props.id}` === location.pathname;
  let itemRef;

  // // Animate after title is edited.
  // const itemRef = useRef(null);
  // const prevTitleRef = useRef(title);
  // useEffect(() => {
  //   if (title !== prevTitleRef.current) {
  //     prevTitleRef.current = title;
  //     itemRef.current.classList.add("flash");
  //   }
  // }, [title]);
  let title = props.title;
  createEffect(() => {
    if (props.title !== title) {
      title = props.title;
      itemRef.classList.add("flash");
    }
  });

  return (
    <div
      ref={itemRef}
      onAnimationEnd={() => {
        itemRef.classList.remove("flash");
      }}
      class={["sidebar-note-list-item", isExpanded() ? "note-expanded" : ""].join(" ")}
    >
      {props.children}
      <A
        href={`/notes/${props.id}`}
        class="sidebar-note-open"
        style={{
          "background-color": isPending()
            ? "var(--gray-80)"
            : isActive()
            ? "var(--tertiary-blue)"
            : "",
          border: isActive() ? "1px solid var(--primary-border)" : "1px solid transparent"
        }}
      >
        Open note for preview
      </A>
      {/*
      <button
        class="sidebar-note-toggle-expand"
        onClick={e => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
      >
        {isExpanded ? (
          <img src="chevron-down.svg" width="10px" height="10px" alt="Collapse" />
        ) : (
          <img src="chevron-up.svg" width="10px" height="10px" alt="Expand" />
        )}
        </button>*/}

      <button
        class="sidebar-note-toggle-expand"
        onClick={e => {
          e.stopPropagation();
          setIsExpanded(isExpanded => !isExpanded);
        }}
      >
        <Show
          when={isExpanded()}
          fallback={<img src="/chevron-down.svg" width="10px" height="10px" alt="Collapse" />}
        >
          <img src="/chevron-up.svg" width="10px" height="10px" alt="Expand" />
        </Show>
      </button>
      <div
        style={{
          display: isExpanded() ? "block" : "none"
        }}
      >
        {props.expandedChildren}
      </div>
    </div>
  );
}