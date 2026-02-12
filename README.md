# Widget Store

A Vue 3 shopping basket application built with TypeScript, Tailwind CSS, and Vite.

## Getting Started

```bash
npm install
npm run dev
```

| Script       | Description                          |
| ------------ | ------------------------------------ |
| `npm run dev`    | Start the Vite dev server        |
| `npm run build`  | Type-check and build for production |
| `npm run lint`   | Run ESLint with auto-fix         |
| `npm run format` | Run Prettier on `src/`           |

## How It Works

### Product Catalogue

The store sells three widgets, each identified by a unique `ProductCode` (`R01`, `G01`, `B01`). The catalogue, promotions, and shipping rules are all fetched from async API functions that currently return hardcoded data — designed to be swapped out for real endpoints later.

All API data is loaded once on mount via the `useApi` shared composable and made available to any component that needs it.

### Basket

Basket state lives in the `useBasket` shared composable (powered by `createSharedComposable` from VueUse) so it is a singleton shared across all components. It exposes:

- **`addToBasket(product)`** — Adds a product or increments its quantity if already present.
- **`removeFromBasket(code)`** — Decrements quantity by one, removing the item entirely when it reaches zero.
- **`deleteFromBasket(code)`** — Removes all of that product from the basket in one action.
- **Computed values** — `basketItemCount`, `basketSubtotal`, `basketDiscount`, `basketDelivery`, `basketDeliveryHint`, and `basketTotal` are all derived reactively.

### Promotions

Promotions are evaluated asynchronously whenever the basket contents change (via a deep watcher). The current promotion:

- **Buy one Red Widget, get the second half price** — When the basket contains 2 or more Red Widgets, a discount of half the Red Widget price is applied. The discount value is rounded up using `Math.ceil`.

### Shipping

Shipping costs are determined by tiered rules based on the order value (subtotal minus discount):

| Order Value      | Shipping Cost | Hint                                         |
| ---------------- | ------------- | -------------------------------------------- |
| Under $50        | $4.95         | Spend over $50 to reduce delivery to $2.95   |
| $50 – $89.99     | $2.95         | Spend over $90 for free delivery!            |
| $90 and above    | Free          | —                                            |

Each tier includes a `minimumOrderValue` and `maximumOrderValue` for range matching, and an optional `hint` string displayed in the basket summary.

### Prices

All prices are stored as **integers in cents** (e.g. `3295` = $32.95) to avoid floating-point precision issues. The `formatPrice` utility divides by 100 and formats using `Intl.NumberFormat` with the `en-US` locale and `USD` currency.

## Project Structure

```
src/
├── api/                    # Data layer (simulated async API)
│   ├── data.ts             # Product codes and prices
│   ├── types.ts            # Shared TypeScript interfaces
│   ├── catalogue.ts        # Get catalogue data
│   ├── promotions.ts       # Get promotions data, calculate promotions
│   └── shipping.ts         # Get shipping costs
├── composables/            # Shared reactive state
│   ├── useApi.ts           # Fetches and shares all API data
│   └── useBasket.ts        # Basket state, actions, and derived totals
├── components/             # UI components
│   ├── ProductCatalogue.vue
│   ├── BasketSidebar.vue
│   └── utils.ts            # Color helpers and price formatting
├── pages/
│   └── Basket.vue          # Page layout shell
└── App.vue                 # Root component
```

### Path Aliases

| Alias           | Maps to             |
| --------------- | -------------------- |
| `@api/*`        | `src/api/*`          |
| `@components/*` | `src/components/*`   |
| `@composables/*`| `src/composables/*`  |

Configured in both `vite.config.ts` and `tsconfig.app.json`.

## Assumptions

1. **Prices are integers in cents** — All monetary values (product prices, shipping costs, discounts) are stored as whole numbers representing cents to avoid floating-point rounding errors.
2. **The Red Widget promotion applies once** — The "buy one get one half price" discount applies a single fixed discount when 2 or more Red Widgets are in the basket. It does not scale for additional pairs (e.g. 4 Red Widgets still only receives one half-price discount).
3. **Discount is rounded up** — `Math.ceil` is used on the discount calculation so the customer always receives at least the expected discount amount.
4. **Shipping is based on the discounted subtotal** — The order value used to determine the shipping tier is `subtotal − discount`, not the raw subtotal.
5. **API functions are async stubs** — All data-fetching functions are `async` and return hardcoded data. This is intentional so they can be replaced with real HTTP calls without changing the consuming code.
6. **Single-currency store** — The store assumes a single currency (USD). The formatter, shipping hints, and all prices are denominated in the same currency.
7. **No persistence** — Basket state is held in memory and resets on page refresh. This should be stored in the database so no point using LocalStorage for now.
8. **Product codes are a closed set** — The `ProductCode` type is a union of string literals (`'R01' | 'G01' | 'B01'`), meaning adding a new product requires updating the type and associated colour map. This type should be generated by the API eventually.
