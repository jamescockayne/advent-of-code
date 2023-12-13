# usage - python3 day12.py < input12.txt

from functools import cache

input = [x.strip() for x in list(open(0))]

@cache
def backtrack(string, groupNumber, numberOfHashes, groups):
    if len(string) == 0:
        return 1 if groupNumber == len(groups) - 1 and numberOfHashes == groups[groupNumber] or (groupNumber == len(groups)) else 0
    elif string[0] == '.':
        if numberOfHashes > 0:
            if numberOfHashes != groups[groupNumber]:
                return 0
            groupNumber, numberOfHashes = groupNumber + 1, 0
        return backtrack(string[1:], groupNumber, numberOfHashes, groups)
    elif string[0] == '#':
        return 0 if groupNumber >= len(groups) or numberOfHashes >= groups[groupNumber] else backtrack(string[1:], groupNumber, numberOfHashes + 1, groups)
    elif string[0] == '?':
        return backtrack('#' + string[1:], groupNumber, numberOfHashes, groups) + backtrack('.' + string[1:], groupNumber, numberOfHashes, groups)

def part1():
    res = 0
    for line in input:
        line, groups = line.split()
        groups = [int(x) for x in groups.split(',')]
        res += backtrack(line, 0, 0, tuple(groups))
    print(res)
    
def part2():
    res = 0
    for line in input:
        line, groups = line.split()
        groups = [int(x) for x in groups.split(',')]
        line = line + '?' + line + '?' + line + '?' + line + '?' + line
        groups = groups + groups + groups + groups + groups
        res += backtrack(line, 0, 0, tuple(groups))
    print(res)

part1()
part2()