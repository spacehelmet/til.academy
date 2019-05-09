---
title: Setting up a blog
date: "2019-04-28T22:40:32.169Z"
author: "tterian"
description: Setting up a blog with Gatsby and Netlify.
---

Alright, here we go! If you have decided to create a new blog and don't know where to start then this guide is just for you. It will walk you through creating and hosting your own blog.

## You don't need to be a developer to create your own blog.

Thanks to awesome technologies available nowadays, you don't need to write a single line of code to create and host your own blog. In our case we will use Gatsby as a fast and seemless blog generator and Netlify as a deployment and hosting tool. By the way, this is an example of a [JAMStack](https://jamstack.org/).

![jamstack](https://cdn-images-1.medium.com/max/1600/1*r7CGZP27jtJxZDkJ-f0VjA.jpeg "JAMStack")


### Into the woods!

We start from grabbing a blog temlpate from an open source starter temaplate [Gatsby Starter Template](https://github.com/gatsbyjs/gatsby-starter-blog). It uses couple of cool tech, such as

* [typography.js](https://kyleamathews.github.io/typography.js/)
* [prism.js](https://prismjs.com/)
* [React Helmet](https://github.com/nfl/react-helmet)

Next, we need to build and deploy our blog. Netlify is a great tool that we can use. Once you have signed into the service you can simply [grab](https://app.netlify.com/start) your github repo from the main dashboard and it will take it from there.
The service will randomly generate a subdomain under netlify namespace and deploy it there.

### Enjoy your new blog!

*Reminder:* Please open a PR if you have any feedback/question/comment on this blog post.