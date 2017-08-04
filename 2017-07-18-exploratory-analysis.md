---
title: Exploratory Analysis 
author: ~
date: '2017-07-18'
slug: exploratory-analysis
categories: []
tags: []
weight: 0
---



```r
library(rvest)
library(dplyr)
library(stringr)
library(ggplot2)

# Load environment
load("public/data/forbes_environment.RData")
```

```
## Warning in readChar(con, 5L, useBytes = TRUE): cannot open compressed file
## 'public/data/forbes_environment.RData', probable reason 'No such file or
## directory'
```

```
## Error in readChar(con, 5L, useBytes = TRUE): cannot open the connection
```



# Fortune's 500 companies of 2015

## Introduction and background

Google, Facebook, Apple, etc. These are some of the top companies that we frequently hear about. 

There are 497 other companies that Fortune describes as the world's 500 largest companies according to their well known ranking *Global 500*.

I wondered, what makes them the top companies? And how is the ranking constructed?




## Data source and details


In order to explore the previous question in further detail, I looked at the ranking for the year 2015 found at [Global 500 2015](http://fortune.com/global500/2015/)

The listing comprehends the following factors:


```
## [1] "company"       "ranking"       "num_employees" "assets"       
## [5] "profitchange"  "profits"       "revchange"
```


where,

- assets : a company's assets in millions (USD)
- profits: profits in millions (USD)
- profit change: a company's profit change between 2014 and 2015 (%)
- revchange:  a company's revenue change between 2014 and 2015 (%)

For this analysis, I have used the following libraries:


```r
library(rvest)
library(dplyr)
library(stringr)
library(ggplot2)
```

## Initial exploratory analysis 
<!--- Visualization --->



```r
# Employees --------------------------------------------------------------
# Few companies have + 50000 employees
ggplot(fortune2015.df, aes(x = num_employees, y = ranking)) + 
  geom_point(colour = "green", alpha = 0.5) 
```

![plot of chunk employees](figure/employees-1.png)

```r
# Analyze outliers: few, large #employees
ggplot(fortune2015.df, aes(x = ranking, y = num_employees)) + 
  geom_point(colour = "green", alpha = 0.5)
```

![plot of chunk employees](figure/employees-2.png)

There is not a clear relationship between the ranking of a company and its number of employees.
For most top companies, the number of employees oscillate between 179 (the minimum number of employees) and 500,000 employees. Some outliers stand out, with over 1,000,000 employees, particularly:


```
##                      company ranking num_employees
## 1   China National Petroleum       4       1636532
## 2 Hon Hai Precision Industry      31       1060000
## 3                    Walmart       1       2200000
```



```r
ggplot(fortune2015.df, aes(x = ranking, y = assets)) + geom_point(colour = "green", alpha = 0.5)
```

![plot of chunk assets](figure/assets-1.png)

```r
# All over the place!
```

Once again, there is not a clear relationship between ranking and assets of a company. Half of these companies' assets lie under 91,000 million USD i.e. 91 billion USD.

Among the outliers, with more than 500 billion USD in assets, 

```
##                              company ranking assets
## 11        Agricultural Bank of China      36 264500
## 42  Aviation Industry Corp. of China     159 235999
## 114         China National Petroleum       4  67151
## 120                 China Post Group     143 241600
## 145                    Compass Group     418 113678
## 146                    Compass Group     418 113678
## 235       Hon Hai Precision Industry      31 129021
## 435                    Sinopec Group       2  54742
## 449                       State Grid       7  98110
## 487              U.S. Postal Service     137  86986
## 508                       Volkswagen       8 109748
## 512                          Walmart       1 103594
```



```r
type_profit.df = fortune2015.df %>% mutate(type_profit = ifelse(fortune2015.df$profits > 0, "positive", "negative"))

ggplot(type_profit.df, aes(x = ranking, y = profits, color = type_profit)) + geom_point(alpha = 0.5)  + 
  ylim(c(-10000,40000)) + geom_smooth(aes(group = 1))
```

```
## `geom_smooth()` using method = 'loess'
```

```
## Warning: Removed 3 rows containing non-finite values (stat_smooth).
```

```
## Warning: Removed 3 rows containing missing values (geom_point).
```

![plot of chunk profits](figure/profits-1.png)

```r
# Lower the ranking, higher the profits
```



```r
# conglomeration near y axis
ggplot(fortune2015.df, aes(x = profitchange, y = ranking)) + geom_point(colour = "green", alpha = 0.5) + xlim(c(-500,500))
```

```
## Warning: Removed 82 rows containing missing values (geom_point).
```

![plot of chunk profit_change](figure/profit_change-1.png)

```r
# color by positive, negative
```

As seen from the graph, there is a clearer relationship between the ranking and the profits a company. Companies at the top of the list's ranking tend to have higher profits.
Another interesting finding is that there are companies on the list which have negative profits i.e. losses.



```r
type_revchange.df = fortune2015.df %>% mutate(type_revchange = ifelse(fortune2015.df$revchange > 0, "positive", "negative"))

ggplot(type_revchange.df, aes(x = ranking, y = revchange, color = type_revchange)) + geom_point(alpha = 0.5) 
```

```
## Warning: Removed 62 rows containing missing values (geom_point).
```

![plot of chunk revenue_change](figure/revenue_change-1.png)
Around half of the top companies had positive revenue change (%) between 2014 and 2015.

There were 3 companies with a significantly high revenue change (%):


```r
outliers_revchange = fortune2015.df[which(fortune2015.df$revchange >100),] %>% select(company, ranking, revchange)
rownames(outliers_revchange) = NULL
outliers_revchange
```

```
##              company ranking revchange
## 1    Gilead Sciences     478     122.2
## 2    Gilead Sciences     478     122.2
## 3 Manulife Financial     212     172.4
```

## Hypothesis

From the visualization results, I presumed the factor that plays the largest role in ranking is profit. 

I also suspect that a combination of factors could influence ranking e.g. high revenue change and high profits altogether may be a key indicator of a higher position in ranking.


## Experiment / Analysis

In order to train a classification model, I have splitted the ranking positions from 1-500 to ranking buckets 1-5, where:

| Position | Bucket |
|----------|--------|
| 1-100    | 1      |
| 101-200  | 2      |
| 201-300  | 3      |
| 301-400  | 4      |
| 401-500  | 5      |



## Results


