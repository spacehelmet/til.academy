---
title: Custom SVG markers for Google Map React
date: "2019-05-16T22:40:32.169Z"
author: "tterian"
description: Make your google map look fancy with custom markers
tags: ["google map", "markers"]
---

We'll assume [Google Map React](https://github.com/google-map-react/google-map-react) is already configured and setup in a react project. Now let's use custom SVGs to display markers on google map.

Alright, let's go ahead and import our SVG directly as React component. Inside marker component we will use it as an image source, just like this

```javascript
import React from 'react';
import marker from '../styles/marker.svg';

function Marker() {
  return (
    <img className="marker" src={marker} alt="marker" />
  )
};

export default Marker;
```

Also keep in mind that we still need to take care of marker origins. By default any map object (including markers) has its top left corner at latitude and longitude coordinates.

So we'll add a CSS to make sure our markers are being placed correctly.

```scss
.marker {
  cursor: pointer;
  position: absolute;
  transform: translate(-50%, -100%);
}
```

*Reminder:* Please open a PR if you have any feedback/question/comment on this blog post. Thanks!