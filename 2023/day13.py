# usage - python3 day13.py < input13.txt
# todo - come back and find a better way to solve this problem, i don't like this at all

from collections import defaultdict
input = [[x.strip() for x in x.split('\n')] for x in list(open(0).read().split('\n\n'))]

def getReflection(pattern, exclude=None):
    t, b, temp = 0, 1, 0
    while b < len(pattern):
        if pattern[t] != pattern[b]:
            t, b = t + 1, b + 1
        else:
            while pattern[t] == pattern[b]:
                t, b, temp = t - 1, b + 1, temp + 1
                if t < 0 or b >= len(pattern):
                    if exclude != b - temp:
                        return b - temp
                    else: break
            b, t, temp = b - temp + 1, t + temp + 1, 0
    return None

def transpose(pattern):
    res = []
    for i in range(len(pattern[0])):
        res.append(''.join([x[i] for x in pattern]))
    return res

refMap = defaultdict(int)

def part1():
    res, number = 0, 0
    for pattern in input:
        number += 1
        reflection = getReflection(pattern)
        if reflection is not None:
            res += 100 * reflection
            refMap[number] = str(reflection) + 'h'
        else:
            reflection = getReflection(transpose(pattern))
            if reflection is not None:
                res += reflection
                refMap[number] = str(reflection) + 'v'
    print(res)

def part2():
    res = 0
    number = 0
    for pattern in input:
        number += 1
        i = 0
        while i < len(pattern):
            j = 0
            while j < len(pattern[i]):
                newPattern = pattern.copy()
                newPattern[i] = newPattern[i][:j] + ('#' if newPattern[i][j] == '.' else '.') + newPattern[i][j+1:]
                reflection = getReflection(newPattern, int(refMap[number][:-1]) if refMap[number].endswith('h') else None)
                if reflection is not None and refMap[number] != str(reflection) + 'h':
                    res += 100 * reflection
                    i, j = len(pattern), len(pattern[i])
                    break
                reflection = getReflection(transpose(newPattern), int(refMap[number][:-1]) if refMap[number].endswith('v') else None)
                if reflection is not None and refMap[number] != str(reflection) + 'v':
                    res += reflection
                    i, j = len(pattern), len(pattern[i]) 
                    break
                j += 1
            i += 1
    print(res)

part1()
part2()