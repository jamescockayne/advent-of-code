# usage - python3 day7.py < input7.txt
from collections import defaultdict
from functools import cmp_to_key

input = [x.strip() for x in list(open(0))]
def cardToNum(card, lowJ=False):
    if card.isdigit():
        return int(card)
    if card == 'T':
        return 10
    if card == 'Q':
        return 12
    if card == 'K':
        return 13
    if card == 'A':
        return 14
    if card == 'J':
        if lowJ:
            return 1
        return 11

def getKindValue(map):
    if len(map) == 1:
        return 7
    if len(map) == 2:
        if 4 in map.values():
            return 6
        return 5
    if len(map) == 3:
        if 3 in map.values():
            return 4
        return 3
    if len(map) == 4:
        if 2 in map.values():
            return 2
    return 1

def getKind(hand, replaceJ=False):
    map = defaultdict(int)
    for char in hand:
        map[char] += 1
    if replaceJ:
        mostFrequentNonJ = max(map, key=lambda x: map[x] if x != 'J' else 0)
        if mostFrequentNonJ == 'J':
            return 7 # all Js, so five of a kind

        if map['J'] > 0:
            map[mostFrequentNonJ] += map['J']
            del map['J']

        mapWithoutJ = {}
        for k, v in map.items():
            if v > 0:
                mapWithoutJ[k] = v
        map = mapWithoutJ
    return getKindValue(map) 


def compareHands(hand1, hand2, lowJ=False):
    for i in range(len(hand1)):
        if cardToNum(hand1[i], lowJ) == cardToNum(hand2[i], lowJ):
            continue
        if cardToNum(hand1[i], lowJ) > cardToNum(hand2[i], lowJ):
            return 1
        else: 
            return -1

def sortFunc(hand1, hand2, lowJ=False):
    kindScore1, kindScore2 = hand1[0], hand2[0]
    if kindScore1 > kindScore2:
        return 1
    if kindScore1 < kindScore2:
        return -1
    return compareHands(hand1[1], hand2[1], lowJ)

def solve():
    res = [0, 0]
    array1, array2 = [], []
    for hand in input:
        cards, bid = [x for x in hand.split()]
        array1.append((getKind(cards), cards, bid))
        array2.append((getKind(cards, True), cards, bid))
    array1.sort(key=cmp_to_key(sortFunc))
    array2.sort(key=cmp_to_key(lambda x, y: sortFunc(x, y, True)))

    for i in range(len(array1)):
        res[0] += (i+1) * int(array1[i][2])
        res[1] += (i+1) * int(array2[i][2])
    

    print(res[0])
    print(res[1])

solve()