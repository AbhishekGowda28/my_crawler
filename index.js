#!/usr/bin/env node

const Crawler = require("js-crawler");
const jsdom = require("jsdom");
const jquery = require("jquery");

crawl();

function crawl() {
    const command_line_args = processArguments();
    webCrawler(command_line_args);
}

function webCrawler(options) {
    const crawlerResult = {
        totalPages: 0,
        pages: 0,
        result: 0,
        failedURL: [],
        content: {}
    };
    const spider = new Crawler().configure({ depth: options.depth });
    spider.crawl({
        url: options.url,
        success: (page) => {
            const pageResult = extractContent(page.content, options);
            crawlerResult.totalPages++;
            if (pageResult.counter > 0) {
                crawlerResult.result += pageResult.counter;
                crawlerResult.pages++;
                crawlerResult.content[page.url] = pageResult.contentData;
                if (options.showResult) {
                    console.log(`---${page.url}---`);
                    displaySearhContext(pageResult.contentData);
                    console.log("--------")
                }
            }

        },
        failure: (page) => {
            crawlerResult.failedURL.push(page.url);
        },
        finished: function displayResult() {
            if (options.showFailedURL) {
                displayFailedUrls(crawlerResult.failedURL);
            }
            console.log(`Crawled ${crawlerResult.totalPages} pages. Found ${crawlerResult.pages} pages with the term ${options.searchString}`);
        }
    });
}

function displaySearhContext(context) {
    context.forEach(terms => {
        console.log(terms);
    });
}

function displayFailedUrls(showFailedURL) {
    console.log("---Failed URL---");
    showFailedURL.forEach(url => {
        console.log(url);
    });
    console.log("------");
}

function extractContent(content, options) {
    const contentData = [];
    let counter = 0;
    const body_text = processHtmlContent(content);
    let searchString = options.searchString;
    const search_term_context_count = 15;
    body_text.forEach((text) => {
        let trimmedText = text.trim();
        const originalText = text.trim();
        if (options.ignoreCase) {
            trimmedText = trimmedText.toLowerCase();
            searchString = searchString.toLowerCase();
        }
        const index_search_string = trimmedText.indexOf(searchString);
        if (index_search_string !== -1) {
            const extract = originalText.substring(index_search_string - search_term_context_count, index_search_string + searchString.length + search_term_context_count + 1)
            contentData.push(extract);
            counter++;
        }
    });
    return { counter, contentData }
}

function processHtmlContent(content) {
    const regex_newLine = /[\n\r]{1,}/;
    const regex_whiteSpace = /^[\n\r\t\s]{1,}$/;

    const htmlContent = new jsdom.JSDOM(content);
    const $ = jquery(htmlContent.window);
    const bodyContent = $("body").text();
    const split_body_content = bodyContent.split(regex_newLine);
    const extracted_text = split_body_content.filter(text => regex_whiteSpace.test(text) === false);
    return extracted_text;
}

function processArguments() {
    const args = process.argv;
    if (args.length <= 3) {
        console.log("Invalid Input");
        process.exit(1);
    } else {
        const commandLine_arguments = {};
        const additionalArgs = validateAdditionArguments();
        Object.assign(commandLine_arguments, additionalArgs);
        commandLine_arguments["url"] = args[2];
        commandLine_arguments["searchString"] = args[3];
        return commandLine_arguments;
    }
}

function validateAdditionArguments() {
    const command_line_args = process.argv;
    const returnArguments = {};
    let depth = 1;
    let ignoreCase = false;
    let showFailedURL = false;
    let showResult = true;
    command_line_args.forEach(cla => {
        const splitArgv = cla.split("=");
        switch (splitArgv[0]) {
            case "--depth": {
                depth = parseInt(splitArgv[1], 10);
                break;
            }
            case "--ignoreCase": {
                ignoreCase = parseBoolean(splitArgv[1]);
                break
            }
            case "--showFailedURL": {
                showFailedURL = parseBoolean(splitArgv[1]);
                break;
            }
            case "--showResult": {
                showResult = parseBoolean(splitArgv[1]);
                break;
            }
        }
    });
    returnArguments["depth"] = depth;
    returnArguments["ignoreCase"] = ignoreCase;
    returnArguments["showFailedURL"] = showFailedURL;
    returnArguments["showResult"] = showResult;
    return returnArguments;
}

function parseBoolean(value) {
    return value === false || value === "false" ? false : true;
}