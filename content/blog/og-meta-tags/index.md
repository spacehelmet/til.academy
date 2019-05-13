---
title: Don't forget about Open Graph
date: "2019-05-09T22:40:32.169Z"
author: "tterian"
description: OG tags will help you drive more traffic to your website.
tags: ["open graph", "helmet"]
---

[Open Graph](http://ogp.me/) protocol is a web standard originally developed by Facebook that turns any webpage into a graph object with title, description, image and so on. Even though there is no direct correlation between OG meta tags and improved SEO rankings, it still drives more traffic to your webpage by making it more "attractive" in social networks (Facebook, Twitter, Linkedin, etc).

An example of a link shared in Twitter that has og:image and og:title
<img src="./og-example.png" alt="og-tags" title="OG tag example" />

## Adding OG (and not only) meta tags into your React app

Without further due let's jump into newly created React app with `create-react-app` and OG meta tags to `/public/index.html`. It should look like something like this:

```html
<!DOCTYPE html>
<html>
   <head>
      <meta charSet="utf-8"/>
      <meta http-equiv="x-ua-compatible" content="ie=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <link rel="alternate" type="application/rss+xml" href="/rss.xml"/>
      <title>Awesome App</title>
      <meta property="og:title" content="Awesome app - the best app ever" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://picsum.photos/id/52/1200/600" />
      <meta property="og:description" content="Describe stuff here." />
      <meta property="og:url" content="yourawesomeapp.com" />
   </head>
   <body>
      <noscript>This app works best with JavaScript enabled.</noscript>
      <div id="root"></div>
   </body>
</html>
```

## Dynamic tags

Now, what if I need to generate tags dynamically for every page? That's easy!

We'll use [React Helmet](https://github.com/nfl/react-helmet). So let's create a separate component for document head management, which will dynamically set title, description, image for the page.

```Javascript
import React from 'react';
import Helmet from 'react-helmet';

function SEO({ pageProps }) {
  return (
    <Helmet>
      <title>{pageProps.title}</title>
      <meta property="og:title" content={pageProps.title} />
      <meta property="og:image" content={pageProps.thumbnail} />
      <meta property="og:url" content={pageProps.url} />
    </Helmet>    
  )
}

export default SEO;
```

Wherever we want to set our meta tags, we'll just mount SEO component to necessary arguments just like

```Javascript
<SEO pageProps={
  title: "Yet another page",
  thumbnail="https://picsum.photos/id/52/1200/600",
  url="yetanotherawesomeapp.com" } />
```


*Reminder:* Please open a PR if you have any feedback/question/comment on this blog post. Thanks!