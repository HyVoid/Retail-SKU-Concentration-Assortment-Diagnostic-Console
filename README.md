# English | [简体中文](README.zh-CN.md)

# Optimize Retail SKU Assortment Decisions with Dynamic Sales Contribution Analysis

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%7C%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support-orange.svg)

**Identify the smallest set of SKUs driving 60%/80%/90% of sales, expose hidden long-tail inventory costs, and support SKU rationalization decisions — using a free browser tool or Excel workbook, with no installation or signup required.**

> ## **No signup. No installation. Free.**
>
> 🌐 **Open in Browser** → *HTML Live Demo (coming soon)*
>
> 📥 **Download Excel** → *GitHub Release / Gumroad Download (coming soon)*

---

## Screenshots

### Browser Version

<!-- screenshot: browser version -->

*Interactive Pareto analysis dashboard showing SKU concentration, cumulative sales contribution curves, and long-tail inventory exposure.*

### Excel Version

<!-- screenshot: excel version -->

*Excel-based diagnostic sandbox enabling category managers to simulate SKU elimination scenarios and analyze assortment efficiency.*

---

## What It Helps You Track

* Number of active SKUs required to achieve 60%, 80%, and 90% of category sales.
* Product categories where excessive SKU variety creates inventory drag.
* Dead inventory items with stock holdings but zero sales contribution.
* Differences in SKU concentration across stores, categories, and price bands.
* Assortment efficiency ratios that reveal category health deterioration.
* Candidate SKU elimination lists before markdown or clearance decisions.

---

# Why I Built This

Most retail organizations already know that sales typically follow an 80/20 distribution. The problem is that very few teams can accurately calculate what that means operationally at the store and category level.

In practice, category managers often receive monthly BI reports showing total sales by category, inventory turnover, or SKU counts. These reports answer what happened but rarely explain why assortment efficiency is deteriorating.

A typical failure scenario looks like this:

| Observation                       | Conclusion                                |
| --------------------------------- | ----------------------------------------- |
| Category contains 150 active SKUs | Assortment appears healthy                |
| Inventory turnover declining      | Assume demand weakness                    |
| Several new SKUs launched         | Assume assortment expansion is beneficial |

However, after reconstructing the actual cumulative sales contribution curve, the picture often changes:

| Actual Finding                               | Operational Implication            |
| -------------------------------------------- | ---------------------------------- |
| 18 SKUs generate 80% of sales                | Core assortment already exists     |
| 76 SKUs contribute less than 5%              | Shelf space is being wasted        |
| 24 SKUs have inventory but no sales          | Working capital is trapped         |
| Long-tail products span multiple price bands | Pricing strategy requires redesign |

I built this tool because traditional BI systems optimize reporting, not diagnosis. The goal was not to create another dashboard, but to productize a repeatable reasoning framework for answering one operational question:

> **"How many products do we actually need to achieve most of our sales?"**

The result is a lightweight decision-support sandbox that transforms SKU rationalization from intuition into measurable evidence.

---

## Common Retail Assortment Problems This Solves

| Problem                        | Without This Tool                                                          | With This Tool                                                 |
| ------------------------------ | -------------------------------------------------------------------------- | -------------------------------------------------------------- |
| SKU proliferation              | Product counts increase without visibility into contribution concentration | Exact SKU count required for 60%/80%/90% sales becomes visible |
| Dead inventory accumulation    | Inventory remains hidden within aggregate reports                          | Zero-sales but stocked SKUs are isolated automatically         |
| Poor assortment decisions      | SKU elimination relies on intuition                                        | SKU removal decisions become evidence-based                    |
| Price-band distortion          | High-price products obscure assortment efficiency                          | Concentration analysis becomes price-band specific             |
| Store assortment inconsistency | Stores use different SKU mixes without measurement                         | Store-level assortment efficiency becomes comparable           |
| Slow category reviews          | Manual sorting and cumulative calculations take hours                      | Analysis refreshes automatically after data import             |

---

## Who This Is For

This tool is designed for:

* Retail category managers responsible for assortment optimization.
* Merchandise planners analyzing SKU productivity.
* Store operations teams reviewing inventory efficiency.
* Retail analysts performing Pareto and long-tail analysis.
* Consultants conducting assortment rationalization projects.
* Power BI users needing a local diagnostic sandbox.

This tool is **not** designed for:

* Enterprise-scale data warehousing.
* Full retail ERP replacement.
* Continuous real-time reporting systems.
* Multi-billion row historical analytics.

No spreadsheet expertise is required. Open the browser version or paste exported data into Excel and begin analysis immediately.

---

## About

I build lightweight decision-support tools for situations where there are too many moving parts to hold in your head at once.

The central question behind these tools is always:

> **"What information needs to exist in one place to make the next decision confidently?"**

This SKU concentration analysis tool is one example of that approach: transforming a recurring business analysis problem into a reusable operational decision framework rather than another static report.

---

## Technical Details

<details>
<summary>For technical reviewers, Excel practitioners, and collaborators</summary>

## ### Workbook Architecture

```text
Raw Sales Data
        │
        ▼
Inventory Data Integration
        │
        ▼
Availability Validation
(Sell >0 OR Stock >0)
        │
        ▼
Price Band Classification
        │
        ▼
Dynamic Filtering Engine
(Store + Week + Category + Price Band)
        │
        ▼
Descending SKU Ranking
        │
        ▼
Running Contribution Calculation
        │
        ▼
60% / 80% / 90% Threshold Detection
        │
        ▼
Dashboard + Decision Lists
```

| Worksheet          | Purpose                             |
| ------------------ | ----------------------------------- |
| Readme & Config    | Parameters, thresholds, price bands |
| Raw_Data_Paste     | User input data                     |
| Calculation_Engine | Dynamic calculation layer           |
| Dashboard          | Interactive decision interface      |

---

## ### Three Traps That Catch Even Experienced Category Managers

### Trap 1: Counting All SKUs Instead of Active SKUs

**Decision made:**
A category with 120 SKUs is considered over-assorted.

**Hidden error:**
Inactive SKUs were included in the denominator.

| Metric            | Incorrect | Correct |
| ----------------- | --------- | ------- |
| Total SKU count   | 120       | 73      |
| Active SKU count  | ignored   | 73      |
| SKU concentration | 15%       | 25%     |

**Why the reasoning fails:**
Products with zero sales and zero inventory have no operational relevance.

**Correct approach:**
Only classify SKUs as active when:

```text
Sales > 0 OR Inventory > 0
```

<details>
<summary>Formula reference</summary>

```excel
=IF(OR(Sell_Qty>0,Stock_Qty>0),1,0)
```

</details>

---

### Trap 2: Measuring Category Performance Without Sorting Contribution

**Decision made:**
All SKUs contribute equally to assortment value.

**Hidden error:**
No cumulative contribution analysis was performed.

| SKU    | Sales | Cumulative % |
| ------ | ----- | ------------ |
| SKU-01 | 30000 | 32%          |
| SKU-02 | 18000 | 51%          |
| SKU-03 | 14000 | 66%          |
| SKU-04 | 12000 | 79%          |

**Why the reasoning fails:**
Sales concentration is nonlinear.

**Correct approach:**
Sort descending before cumulative calculation.

<details>
<summary>Formula reference</summary>

```excel
=SORT(Data,Sales_Column,-1)

=SCAN(
   0,
   Sorted_Sales,
   LAMBDA(a,b,a+b)
)
```

</details>

---

### Trap 3: Removing Long-Tail Products Without Inventory Analysis

**Decision made:**
All low-selling products should be removed.

**Hidden error:**
Inventory exposure was ignored.

| SKU | Sales | Inventory | Recommendation |
| --- | ----- | --------- | -------------- |
| A   | 0     | 250       | Clearance      |
| B   | 0     | 0         | Remove         |
| C   | 12    | 420       | Promotion      |
| D   | 4     | 0         | Observe        |

**Why the reasoning fails:**
Inventory cost determines action priority.

**Correct approach:**
Combine contribution analysis with stock exposure.

<details>
<summary>Formula reference</summary>

```excel
=IF(
 AND(Sales=0,Inventory>0),
 "Clearance Candidate",
 ""
)
```

</details>

---

## ### Example Scenario

A retail chain operates:

* 300 stores
* 800 product categories
* 4 price bands
* Approximately 16,000 active SKUs

One store's personal care category contains:

| Metric          | Value    |
| --------------- | -------- |
| Available SKUs  | 84       |
| Weekly sales    | $52,400  |
| Inventory value | $137,000 |

After ranking all SKUs by sales contribution:

| Threshold  | Required SKU Count |
| ---------- | ------------------ |
| 60% sales  | 7                  |
| 80% sales  | 15                 |
| 90% sales  | 26                 |
| 100% sales | 84                 |

Further analysis identifies:

* 21 SKUs with inventory but zero sales.
* 33 SKUs contributing less than 2% combined revenue.
* Premium price bands accounting for only 8% of sales but 34% of inventory investment.

Recommendation:

1. Remove 21 dead-stock SKUs.
2. Consolidate 18 long-tail variants.
3. Reallocate shelf space to top-performing products.
4. Redesign premium assortment strategy.

Expected impact:

* Reduced working capital requirements.
* Improved inventory turnover.
* Increased shelf productivity.
* Faster category review cycles.

---

## ### Formula Reference

<details>
<summary>Availability Validation</summary>

```excel
=IF(OR(Sell_Qty>0,Stock_Qty>0),1,0)
```

</details>

<details>
<summary>Dynamic Filtering</summary>

```excel
=FILTER(
 Raw_Data,
 (Store=Selected_Store)*
 (Category=Selected_Category)*
 (Price_Band=Selected_Band)*
 (Available=1)
)
```

</details>

<details>
<summary>Sorting</summary>

```excel
=SORT(Data,Sales_Column,-1)
```

</details>

<details>
<summary>Cumulative Contribution</summary>

```excel
=SCAN(
 0,
 SortedSales,
 LAMBDA(a,b,a+b)
)
```

</details>

<details>
<summary>Threshold Detection</summary>

```excel
=MATCH(
 TRUE,
 CumulativePct>=0.8,
 0
)
```

</details>

---

## ### Validation Rules

| Field        | Rule                 | Error Behavior           |
| ------------ | -------------------- | ------------------------ |
| Week         | Required             | Reject calculation       |
| Store_ID     | Required             | Exclude row              |
| Group_ID     | Required             | Exclude row              |
| SKU_ID       | Required             | Exclude row              |
| Price        | >=0                  | Validation warning       |
| Sell_Qty     | >=0                  | Validation warning       |
| Stock_Qty    | >=0                  | Validation warning       |
| Price Band   | Must exist in Config | Classification error     |
| Availability | Sell>0 OR Stock>0    | Exclude from denominator |

</details>

---

## Other Tools in This Series

* **Inventory Planning & Replenishment Sandbox** — optimize reorder timing and inventory investment.
* **DTC Fashion Inventory Governance Console** — manage long-tail assortment risk across channels.
* **Cross-Border VAT Compliance Dashboard** — standardize monthly VAT calculation workflows.
* **Marketing Attribution Audit Framework** — identify misleading ROI measurement assumptions.

More tools: *GitHub profile / Gumroad collection*

---

## License

This project is licensed under the **Apache License 2.0**.

See the LICENSE file for details.
