# Grimoire — local finance tracker

A personal, no-paywall expense & savings companion. **Phase 1 (MVP)** of
`PRD-expense-tracker.md`. One self-contained file, no accounts, no server, no
tracking — your data never leaves your device.

## Opening it

- **Desktop:** double-click `index.html`.
- **Phone (recommended):** put this folder somewhere the phone can reach it, or
  serve it (see below), open `index.html` in the browser, then **Share → Add to
  Home Screen**. It then opens full-screen like an app and works offline.

### Serving it (needed for "install" + offline caching)

From this folder:

```
python -m http.server 8000
```

Then open `http://localhost:8000` (or `http://<your-computer-ip>:8000` from the
phone on the same Wi-Fi). Opening straight from `file://` also works — you just
don't get the installable/offline service worker.

## The one rule: money is never counted twice

The app keeps **two** separate spending numbers:

| Number | What it means |
|---|---|
| **Spending (by category)** | Every purchase counted at full value on the day it happened, under its category — no matter how it was paid. Answers *"what did I spend on Food this month?"* |
| **Cash out** | Money that actually left an account = income − (cash/debit expenses + credit-card payments). |

A **credit-card purchase moves no account balance** until you pay the statement.
Registering a card payment is a *settlement* of purchases already counted — it is
never added again as spending. Account balances reconcile off "Cash out" only.

### Credit-card cierre & MSI

- Each card has a **cierre (cutover) day** and a **payment due day**.
- A purchase dated **before** the cierre day lands in the statement closing this
  month; **on/after** the cierre day it lands in next month's statement.
- **MSI (meses sin intereses):** logged once at full value under its true
  category on the purchase date. Each future statement then shows just that
  month's installment as the real cash outflow. Example: $12,000 × 6 bought
  Aug 3 → the category chart shows the whole $12,000 in August; the card shows
  $2,000 in each of the next 6 statements.

## Tabs

- **Log** — quick-add expenses/income; 3-level category picker; *Backfill mode*
  keeps the date sticky so you can enter a whole past month fast. Any past entry
  stays editable forever.
- **Cards** — each card's current and past statements (purchases + MSI
  installments), due dates, and *Register payment*.
- **Charts** — Spending vs Cash out vs Income for a month, change vs last month,
  category breakdown (tap a bar to see subcategories), 6-month trend.
- **Accounts** — cash / debit / savings balances, net worth, and manual `±`
  adjustments for when the real balance drifts from what's logged.
- **Setup** — seasonal palette (Spring/Summer/Autumn/Winter, manual or
  auto-by-date), category tree (rename / re-parent anytime — old charts never
  break), cards, and **Export / Import JSON**.

## Backups

All data lives in this browser's `localStorage`. It survives restarts but is
erased if you clear site data or switch browsers. **Setup → Export JSON**
regularly. Import offers to replace everything from a backup file.

## Not in this build (later phases)

Savings objectives, recurrence rules and buckets; the priority-weighted raffle;
recurring-subscription templates; deeper chart drill-down; custom icon sets
beyond the emoji picker; shared/multi-user access.
