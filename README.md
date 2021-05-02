# my_crawler
A Crawler to find a text content in the web page

## Prerequisite
- Node and npm to be installed in the machine
- User should have admin or elivated access to install the module

## Installation
```bash
npm install -g
```

## Unistallation
```bash
npm uninstall -g my_crawler
```

## Usage

```bash
my_crawler website_url search_term
```

Examples : 
```bash
my_crawler https://www.apple.com Apple
```
```bash
my_crawler https://www.apple.com "Apple TV"
```


## Options
**--depth**: The depth to which the links from the original page will be crawled. **Default is 1**

```bash
my_crawler website_url search_term --depth=2
```
---
**--ignoreCase** : Ignores the character case of the search term. **Default is false**

```bash
my_crawler website_url search_term --ignoreCase
```
or
```bash
my_crawler website_url search_term --ignoreCase="true"
```
---
**--showFailedURL** : Shows the list of links that were unable to reach. **Default is false**

```bash
my_crawler website_url search_term --showFailedURL
```
or
```bash
my_crawler website_url search_term --showFailedURL="true"
```
---
**--showResult** : Displays the list of string that matched the search term. **Default is true**

```bash
my_crawler website_url search_term --showResult="false"
```
---
## Known Issue 
- If the crawler encounters any css link with import in the body, it fails to parse.
- A loader [user is not provided with any feedback] is not provided when the crawler is parsing or crawling.
