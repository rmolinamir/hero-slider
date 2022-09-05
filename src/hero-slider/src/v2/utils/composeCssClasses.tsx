import React from 'react';

type CssClass = {
  className: React.HTMLAttributes<HTMLElement>['className'];
  useIf?: boolean;
};

export function composeCssClasses(
  ...classes: Array<string | CssClass>
): React.HTMLAttributes<HTMLElement>['className'] {
  return classes
    .filter((i) => {
      if (typeof i === 'string') return true;
      else if (typeof i.useIf === 'boolean') return i.useIf;
      else return true;
    })
    .map((i) => {
      if (typeof i === 'string') return i;
      else return i.className;
    })
    .join(' ');
}
