# Text Essence

[![Build Status](https://travis-ci.org/soroushj/node-text-essence.svg?branch=master)](https://travis-ci.org/soroushj/node-text-essence)
[![codecov](https://codecov.io/gh/soroushj/node-text-essence/branch/master/graph/badge.svg)](https://codecov.io/gh/soroushj/node-text-essence)
[![npm version](https://badge.fury.io/js/text-essence.svg)](https://badge.fury.io/js/text-essence)

Remove non-alphanumeric characters from any Unicode string. Optionally, also remove [diacritical marks](https://en.wikipedia.org/wiki/Diacritic).

## Essence

Merriam-Webster [defines](https://www.merriam-webster.com/dictionary/essence) *essence* as:

> The properties or attributes by means of which something can be placed in its proper class or identified as being what it is.

`TextEssence.essence` gives you the essence of a string, i.e., only the alphanumerical characters, converted to lower case:

```javascript
const TextEssence = require('text-essence');
let city = TextEssence.essence('Saint-Étienne');
// 'saintétienne'
```

Optionally, you can also remove diacritical marks:

```javascript
const TextEssence = require('text-essence');
let aggressiveTextEssence = new TextEssence({ removeDiacriticalMarks: true });
let city = aggressiveTextEssence.essence('Saint-Étienne');
// 'saintetienne'
```

## Identical

Merriam-Webster [defines](https://www.merriam-webster.com/dictionary/identical) *identical* as:

> Having such close resemblance as to be essentially the same.

`TextEssence.identical` lets you check whether two strings are essentially the same:

```javascript
const TextEssence = require('text-essence');
let sadlyFalse = 'Saint-Étienne' === 'Saint–Étienne';
// false
let happilyTrue = TextEssence.identical('Saint-Étienne', 'Saint–Étienne');
// true
```

Of course, you have the option to ignore diacritical marks. This should increase [recall](https://en.wikipedia.org/wiki/Precision_and_recall), while probably harming [precision](https://en.wikipedia.org/wiki/Precision_and_recall):

```javascript
const TextEssence = require('text-essence');
let aggressiveTextEssence = new TextEssence({ removeDiacriticalMarks: true });
let sadlyFalse = 'Saint-Étienne' === 'Saint-Etienne';
// false
let happilyTrue = aggressiveTextEssence.identical('Saint-Étienne', 'Saint-Etienne');
// true
```

## Essential Hash

`TextEssence.essentialHash` gives you the hash of the essence of a string:

```javascript
const TextEssence = require('text-essence');
let hash = TextEssence.essentialHash('Saint-Étienne');
// 'bb35a91d6f2bd7ba807fdd240cc838bdd3b20fe1a6fdedba60d941fbe8d5c10f'
```

By default, it uses the `sha256` algorithm, but you can pick a different one:

```javascript
const TextEssence = require('text-essence');
let sha1TextEssence = new TextEssence({ hashAlgorithm: 'sha1' });
let hash = sha1TextEssence.essentialHash('Saint-Étienne');
// '03f938949514a56c863252d3559d0fd92d40720e'
```
