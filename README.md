# my_crawler
A Crawler to find a text content in the web page

## Prerequisite
- Node and npm to be installed in the machine
- User should have admin or elivated access to install the module

## Installation

1. Install the related packages.
```bash
npm install
```
2. Install the module globally
```bash
npm install -g
```

## Unistallation
```bash
npm uninstall my_crawler
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

|Name |Option  | Description|Default |Type |Example |
|--- | --- | --- |--- |--- | ---|
|**Depth**| `--depth`|The depth to which the links from the original page will be crawled.|Default is 1|`number`|`my_crawler website_url search_term --depth=2`|
|**Ignore Case**| `--ignoreCase`|Ignores the character case of the search term.|Default is false|`boolean`|`my_crawler website_url search_term --ignoreCase` or `my_crawler website_url search_term --ignoreCase="true"` |
|**Show Failed URL**| `--showFailedURL`|Shows the list of links that were unable to reach.|Default is false|`boolean`|`my_crawler website_url search_term --showFailedURL` or `my_crawler website_url search_term --showFailedURL="true"` |
|**Show Result**| `--showResult`|Displays the list of string that matched the search term.|Default is true|`boolean`|`my_crawler website_url search_term --showResult="false"` |


---
## Known Issue 
1. If the crawler encounters any css link with import in the body, it fails to parse.
1. A loader **[user is not provided with any feedback]** is not provided when the crawler is parsing or crawling.

