# Mahjong Score Collector

This repository contains a system for automatically collecting Mahjong scores and transferring them to a spreadsheet.

## About

The Mahjong Score Collector is designed to automate the process of collecting Mahjong scores from [天鳳](https://tenhou.net/sc/raw/) and transferring them to a spreadsheet. 

## Features

- Automatically collects Mahjong scores.
- Transfers scores to a spreadsheet automatically.

## Prerequisite

1. You have to enable to use the sheets API
You can see how to do it below link
https://gist.github.com/AnalyzePlatypus/a486323a331c91f738f2245ff9a1c66f

2. Set the sheet & Header like this

You can set the first sheet for 3 players mode.
|ID|Date|Timestamp|PlayerA|PlayerB|PlayerC| ...more |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|

You can set the second sheet for 4 players mode.
|ID|Date|Timestamp|PlayerA|PlayerB|PlayerC|PlayerD|...more|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|

3. You create room and player name at least one.Once you create them, you set the value as env
```
TENHO_ROOM_NUMBER=LXXXX
MAIN_PLAYERS = PlayerA(,PlayerB,PlayerC)
```

ref: 

## Installation

To install the Mahjong Score Collector, follow these steps:

1. Create the google sheet [here](https://developers.google.com/sheets/api/quickstart/nodejs)
2. npm i (node >= 18)
3. npm run start

## Test

To run test:

1. npm run test

## Infrastructure
![](./doc/mahjong.drawio.png)