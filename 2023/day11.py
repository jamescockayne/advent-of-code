# usage - python3 day11.py < input11.py
from functools import cache

input = [[x.strip() for x in x.strip()] for x in list(open(0))]

empty = {'rows': [], 'cols': []}
for l, line in enumerate(input):
    if all([x == '.' for x in line]):
        empty['rows'].append(l)
for c in range(len(input[0])):
    if all([line[c] == '.' for line in input]):
        empty['cols'].append(c)

locs = set([])
for l, line in enumerate(input):
    for c, char in enumerate(line):
        if char == '#':
            locs.add((l, c))

@cache
def getDist(l1, l2, c1, c2, expansionFactor):
    dl, dc = 0, 0
    for l in range(l1, l2):
        dl += expansionFactor if l in empty['rows'] else 1
    for c in range(c1, c2):
        dc += expansionFactor if c in empty['cols'] else 1
    return abs(dl) + abs(dc)

def solve(expansionFactor):
    res = 0
    for one in locs:
        for two in locs:
            l1, l2, c1, c2 = min(one[0], two[0]), max(one[0], two[0]), min(one[1], two[1]), max(one[1], two[1])
            res += getDist(l1, l2, c1, c2, expansionFactor)
    print(res//2)
  
solve(2)
solve(1000000)