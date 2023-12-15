# usage - python3 day15.py < input15.txt

from collections import defaultdict

input = open(0).read().split(',')

def hash(word):
    res = 0
    for char in word:
        res = ((res + ord(char)) * 17) % 256
    return res

def part1():
    print(sum([hash(word) for word in input]))

def part2():
    map = defaultdict(list)
    for step in input:
        splitter = '=' if '=' in step else '-'
        label, focalLen = step.split(splitter)
        box = hash(label)

        if splitter == '-':
            for i, lens in enumerate(map[box]):
                l, _ = lens.split(' ')
                if l == label:
                    map[box] = map[box][:i] + map[box][i+1:]
                    break

        if splitter == '=':
            replaced = False
            for i, lens in enumerate(map[box]):
                l = lens.split(' ')[0]
                if l == label:
                    map[box][i] = l + ' ' + focalLen
                    replaced = True
                    break
            if not replaced:
                map[box].append(label + ' ' + focalLen)
    
    res = 0
    for boxNum, contents in map.items():
        for i, lens in enumerate(contents):
            label, focalLen = lens.split(' ')
            res += (boxNum + 1) * (i + 1) * int(focalLen)
    print(res)

part1()
part2()