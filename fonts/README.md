# Pure Vista · 字体配置说明

## 字体选型

| 层级 | 英文 | 中文 | 用途 |
|---|---|---|---|
| Display | Plus Jakarta Sans | MiSans | 大标题、Logo 字标 |
| Body | Inter | MiSans | 正文、按钮、表单 |
| Mono | Geist Mono | — | 代码、数据、订单号 |

## Web 加载（推荐）

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
```

中文 MiSans 可通过 CDN 或本地托管：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Regular.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Medium.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Semibold.min.css">
```

## CSS 引用

```css
@import url("../design-tokens.css");

body { font-family: var(--pv-font-body); }
h1, h2, h3 { font-family: var(--pv-font-display); }
```

## 字距规范

| 场景 | letter-spacing |
|---|---|
| Display 大标题 | -0.02em |
| Wordmark "Pure Vista" | +0.08em |
| 中文品牌名「景纯设计」 | +0.1em ~ +0.12em |
| Overline 标签 | +0.1em（全大写） |
| 正文 | 0 |

## 授权说明

- **Plus Jakarta Sans** · SIL Open Font License 1.1
- **Inter** · SIL Open Font License 1.1
- **Geist Mono** · SIL Open Font License 1.1
- **MiSans** · 小米开源，免费商用

## Figma / 设计工具

在 Figma 中安装上述字体后，可直接使用 `design-tokens.json` 导入色板与间距令牌。
