<p align="center">
  <a href="https://gofiber.io">
  
  <picture>
    <source height="125" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/gofiber/docs/master/static/img/logo-dark.svg">
    <img height="125" alt="Fiber" src="https://raw.githubusercontent.com/gofiber/docs/master/static/img/logo.svg">
  </picture>
  
  </a>
  <br>
  <a href="https://github.com/gofiber/fiber/blob/master/.github/README_ru.md">
    <img height="20px" src="https://img.shields.io/badge/RU-flag.svg?color=555555&style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NTAgMzAwIj4NCjxwYXRoIGZpbGw9IiNmZmYiIGQ9Im0wLDBoNDUwdjEwMGgtNDUweiIvPg0KPHBhdGggZmlsbD0iIzAwZiIgZD0ibTAsMTAwaDQ1MHYxMDBoLTQ1MHoiLz4NCjxwYXRoIGZpbGw9IiNmMDAiIGQ9Im0wLDIwMGg0NTB2MTAwaC00NTB6Ii8+DQo8L3N2Zz4NCg==">
  </a>
  <br>
  <a href="https://pkg.go.dev/github.com/gofiber/fiber/v2#pkg-overview">
    <img src="https://img.shields.io/badge/%F0%9F%93%9A%20godoc-pkg-00ACD7.svg?color=00ACD7&style=flat-square">
  </a>
  <a href="https://goreportcard.com/report/github.com/gofiber/fiber/v2">
    <img src="https://img.shields.io/badge/%F0%9F%93%9D%20goreport-A%2B-75C46B?style=flat-square">
  </a>
  <a href="https://gocover.io/github.com/gofiber/fiber">
    <img src="https://img.shields.io/badge/%F0%9F%94%8E%20gocover-97.8%25-75C46B.svg?style=flat-square">
  </a>
  <a href="https://github.com/gofiber/fiber/actions?query=workflow%3ASecurity">
    <img src="https://img.shields.io/github/actions/workflow/status/gofiber/fiber/security.yml?branch=master&label=%F0%9F%94%91%20gosec&style=flat-square&color=75C46B">
  </a>
  <a href="https://github.com/gofiber/fiber/actions?query=workflow%3ATest">
    <img src="https://img.shields.io/github/actions/workflow/status/gofiber/fiber/test.yml?branch=master&label=%F0%9F%A7%AA%20tests&style=flat-square&color=75C46B">
  </a>
    <a href="https://docs.gofiber.io">
    <img src="https://img.shields.io/badge/%F0%9F%92%A1%20fiber-docs-00ACD7.svg?style=flat-square">
  </a>
  <a href="https://gofiber.io/discord">
    <img src="https://img.shields.io/discord/704680098577514527?style=flat-square&label=%F0%9F%92%AC%20discord&color=00ACD7">
  </a>

</p>
<p align="center">
  <b>Fiber</b> is an <a href="https://github.com/expressjs/express">Express</a> inspired <b>web framework</b> built on top of <a href="https://github.com/valyala/fasthttp">Fasthttp</a>, the <b>fastest</b> HTTP engine for <a href="https://go.dev/doc/">Go</a>. Designed to <b>ease</b> things up for <b>fast</b> development with <b>zero memory allocation</b> and <b>performance</b> in mind.
</p>

## ⚡️ Quickstart

```go
package main

import "github.com/gofiber/fiber/v2"

func main() {
    app := fiber.New()

    app.Get("/", func(c *fiber.Ctx) error {
        return c.SendString("Hello, World 👋!")
    })

    app.Listen(":3000")
}
```

## 🤖 Benchmarks

These tests are performed by [TechEmpower](https://www.techempower.com/benchmarks/#section=data-r19&hw=ph&test=plaintext) and [Go Web](https://github.com/smallnest/go-web-framework-benchmark). If you want to see all the results, please visit our [Wiki](https://docs.gofiber.io/extra/benchmarks).

<p float="left" align="middle">
  <img src="https://raw.githubusercontent.com/gofiber/docs/master/static/img/benchmark-pipeline.png" width="49%">
  <img src="https://raw.githubusercontent.com/gofiber/docs/master/static/img/benchmark_alloc.png" width="49%">
</p>

## ⚙️ Installation

Make sure you have Go installed ([download](https://go.dev/dl/)). Version `1.17` or higher is required.

Initialize your project by creating a folder and then running `go mod init github.com/your/repo` ([learn more](https://go.dev/blog/using-go-modules)) inside the folder. Then install Fiber with the [`go get`](https://pkg.go.dev/cmd/go/#hdr-Add_dependencies_to_current_module_and_install_them) command:

```bash
go get -u github.com/gofiber/fiber/v2
```

## 🎯 Features

- Robust [routing](https://docs.gofiber.io/guide/routing)
- Serve [static files](https://docs.gofiber.io/api/app#static)
- Extreme [performance](https://docs.gofiber.io/extra/benchmarks)
- [Low memory](https://docs.gofiber.io/extra/benchmarks) footprint
- [API endpoints](https://docs.gofiber.io/api/ctx)
- [Middleware](https://docs.gofiber.io/category/-middleware) & [Next](https://docs.gofiber.io/api/ctx#next) support
- [Rapid](https://dev.to/koddr/welcome-to-fiber-an-express-js-styled-fastest-web-framework-written-with-on-golang-497) server-side programming
- [Template engines](https://github.com/gofiber/template)
- [WebSocket support](https://github.com/gofiber/websocket)
- [Server-Sent events](https://github.com/gofiber/recipes/tree/master/sse)
- [Rate Limiter](https://docs.gofiber.io/api/middleware/limiter)
- Translated in [18 languages](https://docs.gofiber.io/)
- And much more, [explore Fiber](https://docs.gofiber.io/)

## 💡 Philosophy

New gophers that make the switch from [Node.js](https://nodejs.org/en/about/) to [Go](https://go.dev/doc/) are dealing with a learning curve before they can start building their web applications or microservices. Fiber, as a **web framework**, was created with the idea of **minimalism** and follows the **UNIX way**, so that new gophers can quickly enter the world of Go with a warm and trusted welcome.

Fiber is **inspired** by Express, the most popular web framework on the Internet. We combined the **ease** of Express and **raw performance** of Go. If you have ever implemented a web application in Node.js (_using Express or similar_), then many methods and principles will seem **very common** to you.

We **listen** to our users in [issues](https://github.com/gofiber/fiber/issues), Discord [channel](https://gofiber.io/discord) _and all over the Internet_ to create a **fast**, **flexible** and **friendly** Go web framework for **any** task, **deadline** and developer **skill**! Just like Express does in the JavaScript world.
