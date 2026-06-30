import React from "react";
import type { Components } from "react-markdown";

export const markdownComponents: Components = {
  strong({ children }) {
    const parts = React.Children.toArray(children);

    if (parts[0] === "<u>" && parts[parts.length - 1] === "</u>") {
      return (
        <strong>
          <u>{parts.slice(1, -1)}</u>
        </strong>
      );
    }

    if (parts.length === 1 && typeof parts[0] === "string") {
      const underline = parts[0].match(/^<u>(.*)<\/u>$/);
      if (underline) {
        return (
          <strong>
            <u>{underline[1]}</u>
          </strong>
        );
      }
    }

    return <strong>{children}</strong>;
  },
};
