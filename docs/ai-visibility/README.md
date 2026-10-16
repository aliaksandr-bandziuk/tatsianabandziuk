# How the AI-visibility measurement works and how to repeat it

The site is written to be quoted by assistants, so the thing worth tracking is not
only the search position but whether an assistant repeats our answer and names the
source. This folder holds the fixed question set, every measurement run, and the
rules for reading the numbers.

## What the files contain

| File | What is in it |
|---|---|
| `questions.csv` | 36 control questions, 12 per language. Fixed - do not reword them, or the runs stop comparing. |
| `results-<date>.csv` | One run. One row per question, same ids as the question set. |

`questions.csv` columns: `id`, `lang`, `family`, `question`, `target_page`
(the page that should win it), `win_condition`.

## What the three families of questions measure

- **name** - does the assistant know who she is and get the role right. Two per language.
- **hire** - someone describes a job and asks who can do it. Four per language. This is
  where a mention is a lead.
- **method** - a definition, a formula or a procedure. Six per language. A one-month-old
  domain will not be recommended as a supplier yet, but it can be cited as a source,
  so this is the family that can move first.

## How a run is recorded

Columns in `results-<date>.csv`:

- `aio_shown` - did Google show an AI Overview for the question at all. Without one
  there is nothing to be cited in, and the row only measures the organic result.
- `in_aio` - is our domain cited inside the AI answer. This is the number that matters.
  Verified by checking that the link sits above the organic block in the page, not by
  eye.
- `host_rank` - where our domain falls among the distinct domains linked on the page.
  A proxy for the organic position, not the organic position itself. Empty means the
  domain does not appear on the page at all.
- `top_hosts` - who is cited instead of us. The most useful column in the file: it names
  the pages to beat, and the sites worth getting a mention on.

## How to repeat the measurement

1. Open each question in Google with the market of its language: `hl=en&gl=gb`,
   `hl=pl&gl=pl`, `hl=ru&gl=pl`. The Russian version is measured in the Polish market
   on purpose - Russia is not a market she sells to.
2. Record the four columns above. Rate-limit yourself: a burst of automated queries
   gets the browser a captcha, and the run has to stop there.
3. Save as `results-<date>.csv` and compare row by row with the previous run.
4. ChatGPT, Perplexity and Copilot need a signed-in session, so those runs are done by
   hand, in the same order, and get their own files.

## What the first run (15 October 2026) showed

- Cited inside an AI Overview: 2 questions of 36 - the English brand question and the
  English article on DAX measures.
- On the page at all: 10 questions of 36.
- Google showed an AI Overview on 28 of 36 questions, so the opportunity exists almost
  everywhere; the citation does not.
- Polish is the strongest language (five questions with the site on the page, three of
  them in first place), English is second, Russian has nothing but a name clash.
- No `hire` question in any language returns an individual consultant in the AI answer:
  they return agencies, software vendors and freelance marketplaces. Getting named there
  needs third-party mentions, not another page on our own site.
