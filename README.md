# SP500 Sustainability Scorer


This project is developed as part of the Shellhacks2023 hackathon.

## Problem Statement 

**Schonfeld Sustainability Challenge**

Help us visualize our stock picks through the lens of sustainability - we'd like to create a database/platform through which our investment teams can view the overall sustainability of companies on the S&P 500. How you do this is up to you, but we want to see creativity- particularly in how you develop your sustainability scales, what factors you see as important in contributing to an overall "score", and how you present your findings.

## Project description 

In this project we develop a sustainability indicator for the s&p500 companies. The sustainability of companies is assesesd by their impact on environment, society and future financial health of the company.To this end we gathered crucial sustainability parameters and use them to generate a weighted sustainability score for each company. This data is then displayed using a custom built web interface.

The dataset has the following columns:
* Ticker: 
* Name:
* ESG risk score:
* Environment risk score:
* Social risk score:
* Governance risk score:
* Controversy level:
* CDP (Carbon Disclosure Project) score:


## Methodology

* First  the list of s&p500 companies is prepared by scrapping the Wikipedia page. It is handled by script snp500_list.py.
  ```
  python snp500_list.py

  ```
* Then, all the parameters are gathered by scraping Google Finance and Yahoo Finance websites. All this data is then saved as CSV file for easy handling.The overall sustainability score is then calculated by aggregating the sum of normalized ESG, Controversies and CDP scores. It is handled by script sustainability_scorer.py.
  ```
  python sustainability_scorer.py
  ```

###### This is a Heading h6

## Emphasis

*This text will be italic*  
_This will also be italic_

**This text will be bold**  
__This will also be bold__

_You **can** combine them_

## Lists

### Unordered

* Item 1
* Item 2
* Item 2a
* Item 2b

### Ordered

1. Item 1
1. Item 2
1. Item 3
  1. Item 3a
  1. Item 3b

## Images

![This is an alt text.](/image/sample.png "This is a sample image.")

## Links

You may be using [Markdown Live Preview](https://markdownlivepreview.com/).

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
>
>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## Tables

| Left columns  | Right columns |
| ------------- |:-------------:|
| left foo      | right foo     |
| left bar      | right bar     |
| left baz      | right baz     |

## Blocks of code

```
let message = 'Hello world';
alert(message);
```

## Inline code

This web site is using `markedjs/marked`.
