# Grimoire — local finance tracker

A personal, no-paywall expense & savings companion. **Phases 1 + 2** of
`PRD-expense-tracker.md`. One self-contained file, no accounts, no server, no
tracking — your data never leaves your device.

## Opening it

- **Desktop:** double-click `index.html`.
- **Phone (recommended):** serve the folder (below), open it in the browser, then
  **Share → Add to Home Screen**. It then opens full-screen like an app and works
  offline.

### Serving it (needed for install + offline caching)

From this folder:

```
python -m http.server 8000
```

Then open `http://localhost:8000` (or `http://<your-computer-ip>:8000` from the
phone on the same Wi-Fi). Opening straight from `file://` also works — you just
don't get the installable/offline service worker.

## Navigation

Tap the **☰ button, top-left** to slide out the page menu. Tap a page, the dimmed
area, the button again, or press Esc to close it. Pages: **Log, Credits, Charts,
Objectives, Accounts, Setup**.

The **Log** page is styled like a log book and the **Credits** page like a rolled
credit sheet (its menu icon is a little scroll — a nod to credit sheets being the
first form of borrowed money on paper). Everything is designed mobile-first.

## The one rule: money is never counted twice

| Number | Meaning |
|---|---|
| **Spending (by category)** | Every purchase at full value on the day it happened, under its category — regardless of how it was paid. |
| **Cash out** | Money that actually left an account = income − (cash/debit expenses + credit-card payments). |

A **credit-card purchase moves no account balance** until you pay the statement.
Registering a card payment settles purchases already counted — it is never added
again as spending. Balances reconcile off "Cash out" only.

### Credit cards — cierre, due date, MSI

- Each card has a **cierre (cutover) day**, a **due day**, and a **due month**:
  *same month / month after / two months after* the cierre. Default is *month
  after* (cierre Aug 15 → due Sep 5).
- The Credits page separates **"Statement to pay"** (a closed statement still
  owing, shown with its due date and an overdue flag) from **"Current period"**
  (charges still accumulating toward the next cierre). Looking at the wrong one
  is what makes a due date look "a month off".
- **Per-statement override:** the pencil on any statement lets you set that one
  statement's due date by hand or mark it *settled* (to absorb a small
  remainder). "Reset to automatic" clears the override and the app recalculates
  from the card's rules.
- **MSI (meses sin intereses):** logged once at full value under its category on
  the purchase date; each following statement shows one installment as the real
  cash outflow. $12,000 × 6 bought Aug 3 → whole $12,000 in August's category
  chart; $2,000 in each of the next 6 statements.

## Logging

- On the **Log** page an entry is either an **Expense** (down arrow) or **Income**
  (up arrow). Expenses are filed under **Type → Use → Detail** (the three category
  levels); the last two are optional.
- The **Debit** payment option is marked with a paper-check glyph.
- **Recurring income:** an income entry can repeat **weekly / fortnightly /
  monthly / yearly**. The Log page then shows a **Recurring income** panel with
  the next expected date for each series. That date is computed from the previous
  occurrence, and if it falls on a Saturday or Sunday it rolls **back** to the
  preceding weekday (Friday). Tapping ✓ records that payment and advances the
  series — nothing is posted automatically.

## Default account

On the **Accounts** page, the star on a row marks that account as the default. It
is then pre-selected in every **"From account"** field — new cash/debit expenses
and card payments alike. Tap the star again to clear it.

## Charts

Spending vs Cash out vs Income vs Net cash for a month, change vs last month,
and a **drill-down** category breakdown: tap a bar to go into its subcategories,
then its sub-subcategories; the breadcrumb walks back out. Plus a 6-month trend.

## Objectives & buckets

- **Savings goal:** target amount + date. Shows the required monthly rate, months
  left, and flags when the rate is above your recent monthly surplus.
- **Recurring reserve:** weekly / monthly / quarterly / yearly / one-time /
  *X times per month* / *X times per year*, with an amount — the app converts it
  to a monthly reserved figure.
- **Buckets** group objectives (Travel, Home, Treats…). Add contributions with
  the **＋** on an objective to track progress; contributions are progress
  tracking only and do **not** move account balances.
- **Priority** (1–5) orders objectives within a bucket.

## Accounts

Cash / debit / savings balances, net worth, and manual **⚖ adjustments** for when
the real balance drifts from what's logged.

## Icons & palette

All icons are a hand-drawn line set — pick one per category, account, card,
bucket and objective from the icon grid. Setup also has the four seasonal
palettes (Spring / Summer / Autumn / Winter), manual or auto-by-date.

## Backups

All data lives in this browser's `localStorage`. **Setup → Export JSON**
regularly. Import replaces everything from a backup file. Old (Phase 1) backups
import fine — emoji icons are converted automatically.

## Not built yet (later phases)

The priority-weighted **raffle** and its customizable 5-level priority labels;
recurring-subscription templates; shared / multi-user access.
